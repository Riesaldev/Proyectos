import bpy
import gpu
import blf
from bpy.types import Panel, Operator
from gpu_extras.batch import batch_for_shader

class MOTIONFX_OT_drag_effect(bpy.types.Operator):
    bl_idname = "motionfx.drag_effect"
    bl_label = "Drag Effect"
    bl_description = "Drag and drop effect onto objects"
    bl_options = {'REGISTER', 'UNDO'}
    
    effect_type: bpy.props.StringProperty()
    
    def __init__(self):
        self.mouse_pos = (0, 0)
        self.draw_handler = None
    
    def modal(self, context, event):
        context.area.tag_redraw()
        
        if event.type == 'MOUSEMOVE':
            self.mouse_pos = (event.mouse_region_x, event.mouse_region_y)
            return {'RUNNING_MODAL'}
        
        elif event.type == 'LEFTMOUSE' and event.value == 'RELEASE':
            self.finish(context)
            
            result = context.area.operator_context
            context.area.operator_context = 'INVOKE_DEFAULT'
            
            try:
                depsgraph = context.evaluated_depsgraph_get()
                region = context.region
                rv3d = context.region_data
                coord = (event.mouse_region_x, event.mouse_region_y)
                
                result = bpy.ops.view3d.select(extend=False, location=coord)
                
                if context.active_object:
                    from .effects_operations import EffectsOperations
                    success = EffectsOperations.apply_effect(self.effect_type, context.active_object)
                    if success:
                        context.active_object['motionfx_last_effect'] = self.effect_type
                        self.report({'INFO'}, f"Effect '{self.effect_type}' applied to {context.active_object.name}")
                    else:
                        self.report({'ERROR'}, "Failed to apply effect")
                else:
                    self.report({'WARNING'}, "No object selected")
            except Exception as e:
                self.report({'ERROR'}, f"Error: {str(e)}")
            
            return {'FINISHED'}
        
        elif event.type in {'RIGHTMOUSE', 'ESC'}:
            self.finish(context)
            return {'CANCELLED'}
        
        return {'RUNNING_MODAL'}
    
    def invoke(self, context, event):
        if context.area.type == 'VIEW_3D':
            self.mouse_pos = (event.mouse_region_x, event.mouse_region_y)
            
            args = (self, context)
            self.draw_handler = bpy.types.SpaceView3D.draw_handler_add(
                draw_callback_px, args, 'WINDOW', 'POST_PIXEL')
            
            context.window_manager.modal_handler_add(self)
            return {'RUNNING_MODAL'}
        else:
            self.report({'WARNING'}, "View3D not found, cannot run operator")
            return {'CANCELLED'}
    
    def finish(self, context):
        if self.draw_handler:
            bpy.types.SpaceView3D.draw_handler_remove(self.draw_handler, 'WINDOW')
            self.draw_handler = None

def draw_callback_px(self, context):
    font_id = 0
    blf.position(font_id, self.mouse_pos[0] + 20, self.mouse_pos[1] + 20, 0)
    blf.size(font_id, 16, 72)
    blf.color(font_id, 1.0, 1.0, 1.0, 0.8)
    effect_name = self.effect_type.replace('_', ' ').title()
    blf.draw(font_id, f"Drop: {effect_name}")

class MOTIONFX_PT_quick_effects(Panel):
    bl_label = "Quick Effects"
    bl_idname = "MOTIONFX_PT_quick_effects"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Motion FX"
    bl_parent_id = "VIEW3D_PT_motionfx_main"

    def draw(self, context):
        layout = self.layout
        
        layout.label(text="Drag & Drop Effects:", icon='HAND')
        layout.separator()
        
        row = layout.row()
        row.scale_y = 1.2
        row.operator("motionfx.apply_all_showcase", text="✨ Showcase All Effects", icon='PLAY')
        
        layout.separator()
        
        box = layout.box()
        box.label(text="🎬 Animation", icon='ANIM')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        anim_effects = [
            ('bounce', 'Bounce', 'MESH_MONKEY'),
            ('rotation', 'Rotate', 'ORIENTATION_GIMBAL'),
            ('scale', 'Scale', 'FULLSCREEN_ENTER'),
            ('fade', 'Fade', 'MOD_OPACITY'),
        ]
        
        for effect_id, label, icon in anim_effects:
            op = grid.operator("motionfx.drag_effect", text=label, icon=icon)
            op.effect_type = effect_id
        
        box = layout.box()
        box.label(text="🔥 Particles", icon='PARTICLES')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        particle_effects = [
            ('fire', 'Fire', 'LIGHT_SUN'),
            ('explosion', 'Explosion', 'FORCE_TURBULENCE'),
            ('smoke', 'Smoke', 'MOD_FLUIDSIM'),
            ('sparks', 'Sparks', 'LIGHTPROBE_VOLUME'),
        ]
        
        for effect_id, label, icon in particle_effects:
            op = grid.operator("motionfx.drag_effect", text=label, icon=icon)
            op.effect_type = effect_id
        
        box = layout.box()
        box.label(text="✨ Materials", icon='MATERIAL')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        material_effects = [
            ('glass', 'Glass', 'SHADING_RENDERED'),
            ('metal', 'Metal', 'METALLIC'),
            ('neon', 'Neon', 'LIGHT_AREA'),
            ('hologram', 'Hologram', 'GHOST_ENABLED'),
        ]
        
        for effect_id, label, icon in material_effects:
            op = grid.operator("motionfx.drag_effect", text=label, icon=icon)
            op.effect_type = effect_id

class MOTIONFX_OT_apply_all_showcase(bpy.types.Operator):
    bl_idname = "motionfx.apply_all_showcase"
    bl_label = "Showcase All Effects"
    bl_description = "Create a showcase scene with all effects applied to different objects"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        try:
            bpy.ops.object.select_all(action='SELECT')
            bpy.ops.object.delete(use_global=False)
            
            showcase_effects = [
                ('bounce', (0, 0, 0)),
                ('rotation', (3, 0, 0)),
                ('scale', (6, 0, 0)),
                ('fire', (0, 3, 0)),
                ('explosion', (3, 3, 0)),
                ('glass', (6, 3, 0)),
                ('metal', (0, 6, 0)),
                ('neon', (3, 6, 0)),
            ]
            
            from .effects_operations import EffectsOperations
            EffectsOperations.initialize_effect_map()
            
            for effect_type, location in showcase_effects:
                bpy.ops.mesh.primitive_cube_add(location=location)
                obj = context.active_object
                obj.name = f"Showcase_{effect_type.title()}"
                
                success = EffectsOperations.apply_effect(effect_type, obj)
                if success:
                    obj['motionfx_showcase'] = effect_type
            
            bpy.ops.view3d.view_all(center=False)
            
            self.report({'INFO'}, f"Showcase created with {len(showcase_effects)} effects")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Error creating showcase: {str(e)}")
            return {'CANCELLED'}

classes = (
    MOTIONFX_OT_drag_effect,
    MOTIONFX_PT_quick_effects,
    MOTIONFX_OT_apply_all_showcase,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    print("MotionFX: Drag & Drop module loaded")

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Drag & Drop module unloaded")
