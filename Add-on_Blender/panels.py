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
        
        # Header con información del addon
        header_box = layout.box()
        row = header_box.row()
        row.label(text="Motion FX Library Pro", icon='FORCE_TURBULENCE')
        row.label(text="v1.0", icon='INFO')
        
        # Estado del objeto activo
        self.draw_object_status(layout, context)
        
        # Configuraciones principales
        if hasattr(context.scene, "motionfx_settings"):
            self.draw_main_settings(layout, context)
        
        # Panel de efectos por categorías
        self.draw_effects_panel(layout, context)
        
        # Panel de herramientas avanzadas
        self.draw_advanced_tools(layout, context)
        
        # Panel de presets
        self.draw_presets_panel(layout, context)
    
    def draw_object_status(self, layout, context):
        """Dibuja el estado del objeto activo con información contextual"""
        status_box = layout.box()
        
        if context.active_object:
            obj = context.active_object
            row = status_box.row()
            
            # Icono según tipo de objeto
            type_icons = {
                'MESH': 'MESH_DATA',
                'CAMERA': 'CAMERA_DATA',
                'LIGHT': 'LIGHT',
                'CURVE': 'CURVE_DATA',
                'EMPTY': 'EMPTY_DATA'
            }
            icon = type_icons.get(obj.type, 'OBJECT_DATA')
            
            row.label(text=f"🎯 {obj.name}", icon=icon)
            row.label(text=f"({obj.type})")
            
            # Información de efectos aplicados
            if 'motionfx_last_effect' in obj:
                effect_row = status_box.row()
                effect_row.label(text=f"✨ Último efecto: {obj['motionfx_last_effect'].replace('_', ' ').title()}", 
                               icon='CHECKMARK')
            
            # Botón de aplicación rápida
            quick_row = status_box.row(align=True)
            quick_row.scale_y = 1.2
            quick_row.operator("motionfx.apply_effect", text="🚀 Aplicar Efecto", icon='PLAY')
            
        else:
            status_box.label(text="⚠️ Selecciona un objeto para comenzar", icon='ERROR')
            status_box.label(text="Los efectos se aplicarán al objeto activo")
    
    def draw_main_settings(self, layout, context):
        """Dibuja las configuraciones principales"""
        settings = context.scene.motionfx_settings
        
        settings_box = layout.box()
        settings_box.label(text="⚙️ Configuración", icon='PREFERENCES')
        
        # Categoría principal
        cat_row = settings_box.row()
        cat_row.prop(settings, "effect_category", text="")
        
        # Controles adicionales
        controls_row = settings_box.row(align=True)
        controls_row.prop(settings, "advanced_mode", text="Avanzado", icon='SETTINGS')
        controls_row.prop(settings, "live_update", text="Live", icon='FILE_REFRESH')
        
        if settings.advanced_mode:
            advanced_box = settings_box.box()
            advanced_box.label(text="🔧 Controles Avanzados", icon='TOOL_SETTINGS')
            advanced_box.prop(settings, "effect_intensity", slider=True)
            advanced_box.prop(settings, "animation_length")
            advanced_box.prop(settings, "auto_keyframe", icon='KEYFRAME_HLT')
    
    def draw_effects_panel(self, layout, context):
        """Dibuja el panel de efectos organizado por categorías"""
        if not hasattr(context.scene, "motionfx_settings"):
            return
            
        category = context.scene.motionfx_settings.effect_category
        
        effects_box = layout.box()
        
        # Header de categoría con icono
        category_icons = {
            'ANIMATION': ('🎬', 'ANIM'),
            'PARTICLES': ('🔥', 'PARTICLES'),
            'LIGHTING': ('💡', 'LIGHT'),
            'MATERIALS': ('✨', 'MATERIAL'),
            'SIMULATION': ('🌊', 'PHYSICS'),
            'CAMERA': ('📹', 'CAMERA_DATA'),
            'UTILITIES': ('🛠️', 'TOOL_SETTINGS'),
            'VISUAL': ('🎨', 'BRUSHES_ALL')
        }
        
        emoji, icon = category_icons.get(category, ('🎯', 'MODIFIER'))
        header_row = effects_box.row()
        header_row.label(text=f"{emoji} {category.title()} Effects", icon=icon)
        
        # Efectos organizados en grid
        self.draw_category_effects(effects_box, category)
    
    def draw_category_effects(self, layout, category):
        """Dibuja los efectos de una categoría específica en formato grid"""
        
        # Definir efectos por categoría con íconos mejorados
        effects_data = {
            'ANIMATION': [
                ('bounce', 'Bounce', 'MESH_MONKEY', 'Efecto de rebote suave'),
                ('rotation', 'Rotate', 'ORIENTATION_GIMBAL', 'Rotación continua'),
                ('scale', 'Scale', 'FULLSCREEN_ENTER', 'Escalado animado'),
                ('fade', 'Fade', 'MOD_OPACITY', 'Desvanecimiento gradual'),
                ('wave', 'Wave', 'MOD_WAVE', 'Ondulación de superficie'),
                ('follow_path', 'Path', 'CURVE_PATH', 'Seguir trayectoria')
            ],
            'PARTICLES': [
                ('fire', 'Fire', 'LIGHT_SUN', 'Simulación de fuego'),
                ('smoke', 'Smoke', 'MOD_FLUIDSIM', 'Humo realista'),
                ('explosion', 'Explosion', 'FORCE_TURBULENCE', 'Explosión con partículas'),
                ('sparks', 'Sparks', 'LIGHTPROBE_VOLUME', 'Chispas eléctricas'),
                ('blood', 'Blood', 'MATFLUID', 'Efecto de sangre')
            ],
            'LIGHTING': [
                ('spotlight', 'Spotlight', 'LIGHT_SPOT', 'Foco direccional'),
                ('volumetric', 'Volumetric', 'VOLUME_DATA', 'Iluminación volumétrica'),
                ('neon', 'Neon', 'LIGHT_AREA', 'Efecto neón brillante'),
                ('global_illumination', 'GI', 'WORLD', 'Iluminación global'),
                ('flash', 'Flash', 'LIGHT_HEMI', 'Destello instantáneo'),
                ('glow_light', 'Glow', 'LIGHT', 'Resplandor suave')
            ],
            'MATERIALS': [
                ('glass', 'Glass', 'SHADING_RENDERED', 'Material cristalino'),
                ('metal', 'Metal', 'METALLIC', 'Superficie metálica'),
                ('hologram', 'Hologram', 'GHOST_ENABLED', 'Efecto holográfico'),
                ('emission', 'Emission', 'LIGHT', 'Material emisivo'),
                ('dissolve', 'Dissolve', 'MOD_OPACITY', 'Disolución gradual'),
                ('fabric', 'Fabric', 'TEXTURE', 'Textura de tela')
            ],
            'SIMULATION': [
                ('cloth', 'Cloth', 'MOD_CLOTH', 'Simulación de tela'),
                ('fluid', 'Fluid', 'MOD_FLUIDSIM', 'Dinámica de fluidos'),
                ('rigid_body', 'Physics', 'PHYSICS', 'Física de cuerpos rígidos'),
                ('soft_body', 'Soft Body', 'MOD_SOFT', 'Cuerpo blando'),
                ('ocean', 'Ocean', 'MOD_OCEAN', 'Simulación oceánica')
            ],
            'CAMERA': [
                ('camera_dolly', 'Dolly', 'CON_CAMERASOLVER', 'Movimiento de cámara'),
                ('camera_zoom', 'Zoom', 'ZOOM_IN', 'Zoom cinematográfico'),
                ('depth_of_field', 'DOF', 'CAMERA_DATA', 'Profundidad de campo'),
                ('camera_focus_pull', 'Focus', 'CON_FOLLOWPATH', 'Cambio de foco'),
                ('camera_follow', 'Follow', 'CON_TRACKTO', 'Seguimiento de objeto'),
                ('lens_distortion', 'Distortion', 'MESH_GRID', 'Distorsión de lente')
            ],
            'UTILITIES': [
                ('slow_motion', 'Slow Mo', 'PREVIEW_RANGE', 'Cámara lenta'),
                ('fast_forward', 'Fast', 'FF', 'Aceleración temporal'),
                ('freeze_frame', 'Freeze', 'FREEZE', 'Congelación de cuadro'),
                ('reverse', 'Reverse', 'LOOP_BACK', 'Reproducción inversa')
            ],
            'VISUAL': [
                ('glow', 'Glow', 'LIGHT_HEMI', 'Resplandor suave'),
                ('glitch', 'Glitch', 'ERROR', 'Efecto de interferencia'),
                ('bloom', 'Bloom', 'LIGHT_SUN', 'Florecimiento luminoso')
            ]
        }
        
        effects = effects_data.get(category, [])
        
        if not effects:
            layout.label(text="🔍 No hay efectos en esta categoría", icon='INFO')
            return
        
        # Crear grid de efectos
        grid = layout.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        for effect_id, label, icon, description in effects:
            col = grid.column(align=True)
            
            # Botón principal del efecto
            op = col.operator("motionfx.apply_effect", text=label, icon=icon)
            op.effect_type = effect_id
            
            # Descripción pequeña
            if context.scene.motionfx_settings.advanced_mode:
                desc_row = col.row()
                desc_row.scale_y = 0.7
                desc_row.label(text=description)
    
    def draw_advanced_tools(self, layout, context):
        """Dibuja herramientas avanzadas"""
        tools_box = layout.box()
        tools_box.label(text="🚀 Herramientas Pro", icon='TOOL_SETTINGS')
        
        # Mockups 3D
        mockup_row = tools_box.row(align=True)
        mockup_row.scale_y = 1.1
        mockup_row.operator("motionfx.create_mockup", text="🎨 Crear Mockup 3D", icon='MESH_ICOSPHERE')
        
        # Vector Fields
        vector_row = tools_box.row(align=True)
        vector_row.scale_y = 1.1
        vector_row.operator("motionfx.create_vector_field", text="🌀 Campo Vectorial", icon='FORCE_VORTEX')
        
        # Quick Effects Showcase
        if context.scene.motionfx_settings.advanced_mode:
            showcase_row = tools_box.row(align=True)
            showcase_row.scale_y = 1.1
            showcase_row.operator("motionfx.apply_all_showcase", text="✨ Demo Completa", icon='PLAY')
    
    def draw_presets_panel(self, layout, context):
        """Dibuja el panel de presets"""
        presets_box = layout.box()
        presets_box.label(text="💾 Presets", icon='PRESET')
        
        preset_row = presets_box.row(align=True)
        preset_row.operator("motionfx.save_preset", text="💾 Guardar", icon='FILE_NEW')
        preset_row.operator("motionfx.load_preset", text="📂 Cargar", icon='FILE_FOLDER')

class VIEW3D_PT_motionfx_quick_access(bpy.types.Panel):
    """Panel secundario para acceso rápido"""
    bl_label = "Acceso Rápido"
    bl_idname = "VIEW3D_PT_motionfx_quick_access"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Motion FX"
    bl_parent_id = "VIEW3D_PT_motionfx_main"
    bl_options = {'DEFAULT_CLOSED'}

    def draw(self, context):
        layout = self.layout
        
        # Efectos más populares
        popular_box = layout.box()
        popular_box.label(text="⭐ Efectos Populares", icon='SOLO_ON')
        
        popular_effects = [
            ('bounce', 'Bounce', 'MESH_MONKEY'),
            ('fire', 'Fire', 'LIGHT_SUN'),
            ('glass', 'Glass', 'SHADING_RENDERED'),
            ('camera_dolly', 'Dolly', 'CAMERA_DATA')
        ]
        
        grid = popular_box.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        for effect_id, label, icon in popular_effects:
            op = grid.operator("motionfx.apply_effect", text=label, icon=icon)
            op.effect_type = effect_id

class VIEW3D_PT_motionfx_help(bpy.types.Panel):
    """Panel de ayuda e información"""
    bl_label = "Ayuda & Info"
    bl_idname = "VIEW3D_PT_motionfx_help"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Motion FX"
    bl_parent_id = "VIEW3D_PT_motionfx_main"
    bl_options = {'DEFAULT_CLOSED'}

    def draw(self, context):
        layout = self.layout
        
        help_box = layout.box()
        help_box.label(text="📚 Guía Rápida", icon='HELP')
        
        tips = [
            "1. 🎯 Selecciona un objeto",
            "2. 🎨 Elige una categoría",
            "3. ✨ Aplica el efecto",
            "4. 🎬 ¡Reproduce la animación!"
        ]
        
        for tip in tips:
            help_box.label(text=tip)
        
        # Información del sistema
        system_box = layout.box()
        system_box.label(text="🔧 Estado del Sistema", icon='SYSTEM')
        
        if context.active_object:
            obj = context.active_object
            system_box.label(text=f"Objeto: {obj.name}")
            system_box.label(text=f"Tipo: {obj.type}")
            
            if hasattr(obj, 'modifiers') and obj.modifiers:
                system_box.label(text=f"Modificadores: {len(obj.modifiers)}")

classes = (
    VIEW3D_PT_motionfx_main,
    VIEW3D_PT_motionfx_quick_access,
    VIEW3D_PT_motionfx_help,
    MOTIONFX_OT_create_vector_field,
    MOTIONFX_OT_create_mockup,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    print("MotionFX: Enhanced panels module loaded")

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Enhanced panels module unloaded")