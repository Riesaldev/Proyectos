import bpy

class MOTIONFX_OT_create_vector_field(bpy.types.Operator):
    bl_idname = "motionfx.create_vector_field"
    bl_label = "Create Vector Field"
    bl_description = "Create basic vector field"
    
    def execute(self, context):
        try:
            bpy.ops.mesh.primitive_plane_add(size=2, location=context.scene.cursor.location)
            obj = context.active_object
            obj.name = "Vector_Field"
            
            if obj.type == 'MESH':
                bpy.context.view_layer.objects.active = obj
                bpy.ops.object.modifier_add(type='WAVE')
                wave_mod = obj.modifiers[-1]
                wave_mod.name = "Vector_Field_Effect"
                wave_mod.use_z = True
                wave_mod.height = 0.2
                wave_mod.width = 2.0
                wave_mod.speed = 1.0
                
            self.report({'INFO'}, "Vector field created")
        except Exception as e:
            self.report({'ERROR'}, f"Error creating vector field: {e}")
        return {'FINISHED'}

class MOTIONFX_OT_create_mockup(bpy.types.Operator):
    bl_idname = "motionfx.create_mockup"
    bl_label = "Create Mockup"
    bl_description = "Create premium 3D mockup"
    
    mockup_type: bpy.props.EnumProperty(
        name="Mockup Type",
        items=[
            ('fluid_wave_abstract', "Fluid Wave", "Modern fluid wave form"),
            ('geometric_crystal', "Geometric Crystal", "Low-poly crystalline structure"),
            ('organic_blob', "Organic Blob", "Smooth organic form"),
            ('twisted_helix', "Twisted Helix", "DNA-inspired helix"),
            ('fractal_sphere', "Fractal Sphere", "Sphere with fractal displacement"),
            ('minimal_arch', "Minimal Arch", "Minimalist arch form"),
            ('liquid_drop', "Liquid Drop", "Realistic water drop"),
            ('parametric_tower', "Parametric Tower", "Twisted tower geometry"),
            ('holographic_panel', "Holographic Panel", "Sci-fi holographic interface"),
            ('neural_network', "Neural Network", "AI neural network visualization"),
            ('quantum_tunnel', "Quantum Tunnel", "Quantum physics tunnel effect"),
            ('biomechanical_wing', "Biomechanical Wing", "Organic wing with mechanics"),
            ('origami_fold', "Origami Fold", "Complex origami-inspired surface"),
            ('plasma_sphere', "Plasma Sphere", "Electric plasma energy sphere"),
            ('voronoi_structure', "Voronoi Structure", "Mathematical cellular structure"),
            ('flowing_ribbon', "Flowing Ribbon", "Elegant flowing ribbon form"),
            ('crystal_formation', "Crystal Formation", "Natural crystal growth"),
            ('spiral_galaxy', "Spiral Galaxy", "Cosmic spiral galaxy structure"),
            ('molecular_bond', "Molecular Bond", "Scientific molecular visualization"),
            ('infinity_loop', "Infinity Loop", "Mathematical infinity symbol 3D"),
        ]
    )
    
    def execute(self, context):
        try:
            from .mockups import mockups
            obj = mockups.create_mockup(self.mockup_type.replace('_', ' ').title())
            if obj:
                self.report({'INFO'}, f"Mockup '{self.mockup_type}' created")
            else:
                self.report({'ERROR'}, f"Failed to create mockup '{self.mockup_type}'")
        except Exception as e:
            self.report({'ERROR'}, f"Error creating mockup: {e}")
        return {'FINISHED'}
    
    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)

class VIEW3D_PT_motionfx_main(bpy.types.Panel):
    bl_label = "Motion FX Library Pro"
    bl_idname = "VIEW3D_PT_motionfx_main"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Motion FX"

    def draw(self, context):
        layout = self.layout
        
        layout.label(text="Motion FX Library Pro", icon='FORCE_TURBULENCE')
        layout.separator()
        
        if hasattr(context.scene, "motionfx_settings"):
            settings = context.scene.motionfx_settings
            layout.prop(settings, "effect_category")
            
            row = layout.row()
            row.prop(settings, "advanced_mode")
            row.prop(settings, "live_update")
            
            layout.separator()
        
        col = layout.column(align=True)
        col.operator("motionfx.apply_effect", text="Apply Effect", icon='PLAY')
        
        layout.separator()
        
        if hasattr(context.scene, "motionfx_settings"):
            category = context.scene.motionfx_settings.effect_category
            
            box = layout.box()
            box.label(text=f"{category.title()} Effects", icon='MODIFIER')
            
            if category == 'ANIMATION':
                col = box.column(align=True)
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Bounce")
                op.effect_type = 'bounce'
                op = row.operator("motionfx.apply_effect", text="Rotation")
                op.effect_type = 'rotation'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Scale")
                op.effect_type = 'scale'
                op = row.operator("motionfx.apply_effect", text="Wave")
                op.effect_type = 'wave'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Fade")
                op.effect_type = 'fade'
                op = row.operator("motionfx.apply_effect", text="Follow Path")
                op.effect_type = 'follow_path'
                
            elif category == 'PARTICLES':
                col = box.column(align=True)
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Fire")
                op.effect_type = 'fire'
                op = row.operator("motionfx.apply_effect", text="Smoke")
                op.effect_type = 'smoke'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Explosion")
                op.effect_type = 'explosion'
                op = row.operator("motionfx.apply_effect", text="Sparks")
                op.effect_type = 'sparks'
                
            elif category == 'LIGHTING':
                col = box.column(align=True)
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Spotlight")
                op.effect_type = 'spotlight'
                op = row.operator("motionfx.apply_effect", text="Volumetric")
                op.effect_type = 'volumetric'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Neon")
                op.effect_type = 'neon'
                op = row.operator("motionfx.apply_effect", text="Global Illum")
                op.effect_type = 'global_illumination'
                
            elif category == 'MATERIALS':
                col = box.column(align=True)
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Glass")
                op.effect_type = 'glass'
                op = row.operator("motionfx.apply_effect", text="Metal")
                op.effect_type = 'metal'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Hologram")
                op.effect_type = 'hologram'
                op = row.operator("motionfx.apply_effect", text="Emission")
                op.effect_type = 'emission'
                
            elif category == 'SIMULATION':
                col = box.column(align=True)
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Cloth")
                op.effect_type = 'cloth'
                op = row.operator("motionfx.apply_effect", text="Fluid")
                op.effect_type = 'fluid'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Rigid Body")
                op.effect_type = 'rigid_body'
                op = row.operator("motionfx.apply_effect", text="Ocean")
                op.effect_type = 'ocean'
                
            elif category == 'CAMERA':
                col = box.column(align=True)
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Dolly")
                op.effect_type = 'camera_dolly'
                op = row.operator("motionfx.apply_effect", text="Zoom")
                op.effect_type = 'camera_zoom'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="DOF")
                op.effect_type = 'depth_of_field'
                op = row.operator("motionfx.apply_effect", text="Focus Pull")
                op.effect_type = 'camera_focus_pull'
                
            elif category == 'UTILITIES':
                col = box.column(align=True)
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Slow Motion")
                op.effect_type = 'slow_motion'
                op = row.operator("motionfx.apply_effect", text="Fast Forward")
                op.effect_type = 'fast_forward'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Freeze Frame")
                op.effect_type = 'freeze_frame'
                op = row.operator("motionfx.apply_effect", text="Reverse")
                op.effect_type = 'reverse'
                
            elif category == 'VISUAL':
                col = box.column(align=True)
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Glow")
                op.effect_type = 'glow'
                op = row.operator("motionfx.apply_effect", text="Glitch")
                op.effect_type = 'glitch'
                
                row = col.row(align=True)
                op = row.operator("motionfx.apply_effect", text="Bloom")
                op.effect_type = 'bloom'
            
            else:
                box.label(text="Select a category above", icon='INFO')
        
        layout.separator()
        
        box = layout.box()
        box.label(text="Premium Assets", icon='ASSET_MANAGER')
        col = box.column(align=True)
        col.operator("motionfx.create_mockup", text="Create 3D Mockup", icon='MESH_ICOSPHERE')
        
        box = layout.box()
        box.label(text="Vector Fields", icon='FORCE_VORTEX')
        box.operator("motionfx.create_vector_field", text="Create Vector Field")
        
        layout.separator()
        
        box = layout.box()
        box.label(text="Presets", icon='PRESET')
        row = box.row()
        row.operator("motionfx.save_preset", text="Save")
        row.operator("motionfx.load_preset", text="Load")
        
        layout.separator()
        if context.active_object:
            layout.label(text=f"Active: {context.active_object.name}", icon='OBJECT_DATA')
        else:
            layout.label(text="Select an object", icon='INFO')

classes = (
    VIEW3D_PT_motionfx_main,
    MOTIONFX_OT_create_vector_field,
    MOTIONFX_OT_create_mockup,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    print("MotionFX: Panels module loaded")

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Panels module unloaded")