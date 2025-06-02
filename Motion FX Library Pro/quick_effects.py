import bpy
from bpy.types import Panel, Operator

class MOTIONFX_OT_apply_effect(Operator):
    bl_idname = "motionfx.apply_effect"
    bl_label = "Apply Effect"
    bl_description = "Apply selected effect to active object"
    bl_options = {'REGISTER', 'UNDO'}
    
    effect_type: bpy.props.StringProperty(
        name="Effect Type",
        description="Type of effect to apply",
        default=""
    )
    
    def execute(self, context):
        if not self.effect_type:
            self.report({'ERROR'}, "No effect type specified")
            return {'CANCELLED'}
        
        obj = context.active_object
        if not obj:
            self.report({'ERROR'}, "No active object selected")
            return {'CANCELLED'}
        
        try:
            from .effects_operations import EffectsOperations
            EffectsOperations.initialize_effect_map()
            
            success = EffectsOperations.apply_effect(self.effect_type, obj)
            
            if success:
                self.report({'INFO'}, f"Effect '{self.effect_type}' applied successfully")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to apply effect '{self.effect_type}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error applying effect: {str(e)}")
            return {'CANCELLED'}

class MOTIONFX_PT_quick_effects(Panel):
    bl_label = "Quick Effects"
    bl_idname = "MOTIONFX_PT_quick_effects"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Motion FX"
    
    def draw(self, context):
        layout = self.layout
        
        layout.label(text="Quick Effects:", icon='MODIFIER')
        
        # Información de objetos seleccionados
        selected_count = len(context.selected_objects)
        if selected_count > 0:
            box = layout.box()
            box.label(text=f"📌 {selected_count} object(s) selected", icon='INFO')
        else:
            box = layout.box()
            box.label(text="⚠️ Select objects to apply effects", icon='ERROR')
        
        layout.separator()
        
        row = layout.row()
        row.scale_y = 1.2
        row.operator("motionfx.apply_all_showcase", text="✨ Showcase All Effects", icon='PLAY')
        
        layout.separator()
        
        # Animation Effects
        box = layout.box()
        box.label(text="🎬 Animation", icon='ANIM')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        anim_effects = [
            ('bounce', 'Bounce', 'MESH_MONKEY'),
            ('rotation', 'Rotate', 'ORIENTATION_GIMBAL'),
            ('scale', 'Scale', 'FULLSCREEN_ENTER'),
            ('fade', 'Fade', 'MOD_OPACITY'),
            ('wave', 'Wave', 'MOD_WAVE'),
            ('follow_path', 'Follow Path', 'CURVE_PATH'),
        ]
        
        for effect_id, label, icon in anim_effects:
            op = grid.operator("motionfx.apply_effect", text=label, icon=icon)
            op.effect_type = effect_id
        
        # Particle Effects
        box = layout.box()
        box.label(text="🔥 Particles", icon='PARTICLES')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        particle_effects = [
            ('fire', 'Fire', 'LIGHT_SUN'),
            ('explosion', 'Explosion', 'FORCE_TURBULENCE'),
            ('smoke', 'Smoke', 'MOD_FLUIDSIM'),
            ('sparks', 'Sparks', 'LIGHTPROBE_VOLUME'),
            ('blood', 'Blood', 'MATFLUID'),
        ]
        
        for effect_id, label, icon in particle_effects:
            op = grid.operator("motionfx.apply_effect", text=label, icon=icon)
            op.effect_type = effect_id
        
        # Material Effects
        box = layout.box()
        box.label(text="✨ Materials", icon='MATERIAL')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        material_effects = [
            ('glass', 'Glass', 'SHADING_RENDERED'),
            ('metal', 'Metal', 'MATERIAL'),
            ('neon', 'Neon', 'LIGHT_AREA'),
            ('hologram', 'Hologram', 'GHOST_ENABLED'),
            ('dissolve', 'Dissolve', 'MOD_OPACITY'),
            ('emission', 'Emission', 'LIGHT'),
            ('glassmorphism', 'Glassmorphism', 'NODE_MATERIAL'),
            ('cyberpunk_glow', 'Cyberpunk', 'LIGHT_AREA'),
        ]
        
        for effect_id, label, icon in material_effects:
            op = grid.operator("motionfx.apply_effect", text=label, icon=icon)
            op.effect_type = effect_id
        
        # Camera Effects
        box = layout.box()
        box.label(text="📹 Camera", icon='CAMERA_DATA')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        camera_effects = [
            ('camera_dolly', 'Dolly', 'CON_CAMERASOLVER'),
            ('camera_zoom', 'Zoom', 'ZOOM_IN'),
            ('depth_of_field', 'DOF', 'CAMERA_DATA'),
            ('camera_follow', 'Follow', 'CON_FOLLOWPATH'),
        ]
        
        for effect_id, label, icon in camera_effects:
            op = grid.operator("motionfx.apply_effect", text=label, icon=icon)
            op.effect_type = effect_id
        
        # Lighting Effects
        box = layout.box()
        box.label(text="💡 Lighting", icon='LIGHT')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        lighting_effects = [
            ('glow_light', 'Glow', 'LIGHT_HEMI'),
            ('flash', 'Flash', 'LIGHT_SPOT'),
            ('volumetric', 'Volumetric', 'VOLUME_DATA'),
            ('spotlight', 'Spotlight', 'LIGHT_AREA'),
        ]
        
        for effect_id, label, icon in lighting_effects:
            op = grid.operator("motionfx.apply_effect", text=label, icon=icon)
            op.effect_type = effect_id
        
        # Utilities Effects - Nueva sección
        box = layout.box()
        box.label(text="🛠️ Utilities Pro", icon='TOOL_SETTINGS')
        grid = box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        utility_effects = [
            ('slow_motion', 'Slow Mo', 'PREVIEW_RANGE'),
            ('fast_forward', 'Fast Forward', 'FF'),
            ('freeze_frame', 'Freeze', 'FREEZE'),
            ('reverse', 'Reverse', 'LOOP_BACK'),
            ('nft_showcase', 'NFT Show', 'SOLO_ON'),
            ('bio_organic_growth', 'Bio Growth', 'MODIFIER'),
        ]
        
        for effect_id, label, icon in utility_effects:
            op = grid.operator("motionfx.apply_effect", text=label, icon=icon)
            op.effect_type = effect_id

class MOTIONFX_OT_apply_all_showcase(bpy.types.Operator):
    bl_idname = "motionfx.apply_all_showcase"
    bl_label = "Showcase All Effects"
    bl_description = "Create a showcase scene with all effects applied to different objects"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        try:
            # Limpiar escena
            bpy.ops.object.select_all(action='SELECT')
            bpy.ops.object.delete(use_global=False)
            
            showcase_effects = [
                ('bounce', (0, 0, 0), 'Animation'),
                ('rotation', (3, 0, 0), 'Animation'),
                ('scale', (6, 0, 0), 'Animation'),
                ('fire', (0, 3, 0), 'Particles'),
                ('explosion', (3, 3, 0), 'Particles'),
                ('glass', (6, 3, 0), 'Materials'),
                ('metal', (0, 6, 0), 'Materials'),
                ('neon', (3, 6, 0), 'Lighting'),
                ('glow_light', (6, 6, 0), 'Lighting'),
                ('wave', (0, -3, 0), 'Animation'),
                ('hologram', (3, -3, 0), 'Materials'),
                ('volumetric', (6, -3, 0), 'Lighting'),
            ]
            
            from .effects_operations import EffectsOperations
            EffectsOperations.initialize_effect_map()
            
            created_objects = []
            
            for effect_type, location, category in showcase_effects:
                try:
                    # Crear cubo para cada efecto
                    bpy.ops.mesh.primitive_cube_add(location=location)
                    obj = bpy.context.active_object
                    obj.name = f"{effect_type.title()}_Demo"
                    
                    # Aplicar efecto
                    success = EffectsOperations.apply_effect(effect_type, obj)
                    if success:
                        created_objects.append(obj)
                        
                except Exception as e:
                    print(f"Error creating showcase for {effect_type}: {e}")
                    continue
            
            # Centrar vista en todos los objetos
            if created_objects:
                bpy.ops.object.select_all(action='DESELECT')
                for obj in created_objects:
                    obj.select_set(True)
                bpy.ops.view3d.view_selected()
            
            self.report({'INFO'}, f"Showcase created with {len(created_objects)} effects")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Error creating showcase: {str(e)}")
            return {'CANCELLED'}

classes = (
    MOTIONFX_OT_apply_effect,
    MOTIONFX_PT_quick_effects,
    MOTIONFX_OT_apply_all_showcase,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    print("MotionFX: Quick Effects module loaded")

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Quick Effects module unloaded")