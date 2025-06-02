import bpy

class MOTIONFX_OT_create_vector_field(bpy.types.Operator):
    bl_idname = "motionfx.create_vector_field"
    bl_label = "Create Vector Field"
    bl_description = "Create a vector field for particle effects"
    bl_options = {'REGISTER', 'UNDO'}
    
    field_type: bpy.props.EnumProperty(
        name="Field Type",
        description="Type of vector field to create",
        items=[
            ('TURBULENCE', "Turbulence", "Create turbulence field"),
            ('VORTEX', "Vortex", "Create vortex field"),
            ('WIND', "Wind", "Create wind field"),
            ('FORCE', "Force", "Create force field"),
        ],
        default='TURBULENCE'
    )
    
    def execute(self, context):
        try:
            from . import vector_fields
            
            location = context.scene.cursor.location
            
            if self.field_type == 'TURBULENCE':
                field_obj = vector_fields.vector_fields.create_turbulence_field(location)
            elif self.field_type == 'VORTEX':
                field_obj = vector_fields.vector_fields.create_vortex_field(location)
            elif self.field_type == 'WIND':
                field_obj = vector_fields.vector_fields.create_wind_field(location)
            elif self.field_type == 'FORCE':
                field_obj = vector_fields.vector_fields.create_force_field(location)
            
            if field_obj:
                self.report({'INFO'}, f"{self.field_type.title()} field created")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to create {self.field_type} field")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error creating vector field: {str(e)}")
            return {'CANCELLED'}
    
    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)

class MOTIONFX_OT_create_mockup(bpy.types.Operator):
    bl_idname = "motionfx.create_mockup"
    bl_label = "Create Mockup"
    bl_description = "Create a 3D mockup"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        try:
            settings = context.scene.motionfx_settings
            mockup_name = settings.selected_mockup if hasattr(settings, 'selected_mockup') else 'none'
            
            if mockup_name == 'none':
                self.report({'WARNING'}, "Please select a mockup to create")
                return {'CANCELLED'}
            
            from . import mockups
            
            # Intentar crear el mockup
            created_obj = mockups.mockups.create_mockup(mockup_name)
            
            if created_obj:
                self.report({'INFO'}, f"Mockup '{mockup_name.replace('_', ' ').title()}' created successfully")
                return {'FINISHED'}
            else:
                # Si falla, intentar crear un mockup básico por defecto
                self.report({'WARNING'}, f"Creating fallback mockup for '{mockup_name}'")
                fallback_obj = self.create_fallback_mockup(mockup_name)
                if fallback_obj:
                    self.report({'INFO'}, f"Fallback mockup created for '{mockup_name}'")
                    return {'FINISHED'}
                else:
                    self.report({'ERROR'}, f"Failed to create mockup '{mockup_name}'")
                    return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error creating mockup: {str(e)}")
            print(f"Mockup creation error: {e}")
            import traceback
            traceback.print_exc()
            return {'CANCELLED'}
    
    def create_fallback_mockup(self, mockup_name):
        """Crear un mockup básico como fallback"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Crear objeto básico según el nombre
            if 'fluid' in mockup_name or 'wave' in mockup_name:
                bpy.ops.mesh.primitive_plane_add(size=4, location=(0, 0, 0))
                obj = bpy.context.active_object
                wave_mod = obj.modifiers.new(name="Wave", type='WAVE')
                wave_mod.height = 1.0
                wave_mod.width = 2.0
            elif 'crystal' in mockup_name or 'geometric' in mockup_name:
                bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, location=(0, 0, 0))
                obj = bpy.context.active_object
                wireframe = obj.modifiers.new(name="Wireframe", type='WIREFRAME')
                wireframe.thickness = 0.02
            elif 'organic' in mockup_name or 'blob' in mockup_name:
                bpy.ops.mesh.primitive_uv_sphere_add(radius=2, location=(0, 0, 0))
                obj = bpy.context.active_object
                displace = obj.modifiers.new(name="Displace", type='DISPLACE')
                displace.strength = 0.5
            else:
                # Mockup genérico
                bpy.ops.mesh.primitive_monkey_add(location=(0, 0, 0))
                obj = bpy.context.active_object
            
            obj.name = f"Fallback_{mockup_name.replace('_', ' ').title()}"
            obj['motionfx_mockup'] = f"Fallback: {mockup_name}"
            
            return obj
            
        except Exception as e:
            print(f"Error creating fallback mockup: {e}")
            return None

class MOTIONFX_OT_load_preset(bpy.types.Operator):
    bl_idname = "motionfx.load_preset"
    bl_label = "Load Preset"
    bl_description = "Load selected preset configuration"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        try:
            settings = context.scene.motionfx_settings
            preset_name = settings.selected_preset if hasattr(settings, 'selected_preset') else 'none'
            
            if preset_name == 'none':
                self.report({'WARNING'}, "No preset selected")
                return {'CANCELLED'}
            
            from .utilities import load_preset_data
            
            preset_data = load_preset_data(preset_name)
            if preset_data:
                # Aplicar configuraciones del preset
                for key, value in preset_data.items():
                    if hasattr(settings, key):
                        setattr(settings, key, value)
                
                self.report({'INFO'}, f"Preset '{preset_name}' loaded successfully")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to load preset '{preset_name}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error loading preset: {str(e)}")
            return {'CANCELLED'}

class MOTIONFX_OT_save_preset(bpy.types.Operator):
    bl_idname = "motionfx.save_preset"
    bl_label = "Save Preset"
    bl_description = "Save current configuration as preset"
    bl_options = {'REGISTER', 'UNDO'}
    
    preset_name: bpy.props.StringProperty(
        name="Preset Name",
        description="Name for the new preset",
        default="New Preset"
    )
    
    def execute(self, context):
        try:
            settings = context.scene.motionfx_settings
            
            preset_data = {
                'effect_category': settings.effect_category,
                'advanced_mode': settings.advanced_mode,
                'live_update': settings.live_update,
            }
            
            from .utilities import save_preset_data
            
            if save_preset_data(self.preset_name, preset_data):
                self.report({'INFO'}, f"Preset '{self.preset_name}' saved successfully")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to save preset '{self.preset_name}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error saving preset: {str(e)}")
            return {'CANCELLED'}
    
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
        
        # Panel de presets mejorado
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
            
            # Verificar compatibilidad del objeto
            if obj.type == 'MESH':
                compat_row = status_box.row()
                compat_row.label(text="✅ Compatible con todos los efectos", icon='CHECKMARK')
            elif obj.type == 'CAMERA':
                compat_row = status_box.row()
                compat_row.label(text="📹 Compatible con efectos de cámara", icon='CAMERA_DATA')
            else:
                compat_row = status_box.row()
                compat_row.label(text="⚠️ Compatibilidad limitada", icon='ERROR')
            
            # Botón de aplicación rápida
            quick_row = status_box.row(align=True)
            quick_row.scale_y = 1.2
            op = quick_row.operator("motionfx.apply_effect", text="🚀 Aplicar Efecto", icon='PLAY')
            op.effect_type = "bounce"  # Efecto por defecto
            
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
        """Dibuja el panel de efectos organizados por categorías con validación"""
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
        
        # Efectos organizados en grid con validación
        self.draw_category_effects(effects_box, category, context)
    
    def draw_category_effects(self, layout, category, context):
        """Dibuja los efectos de una categoría específica con validación de compatibilidad"""
        
        # Efectos verificados y funcionando correctamente
        verified_effects = {
            'ANIMATION': [
                ('bounce', 'Bounce', 'MESH_MONKEY', 'Efecto de rebote suave', True),
                ('rotation', 'Rotate', 'ORIENTATION_GIMBAL', 'Rotación continua', True),
                ('scale', 'Scale', 'FULLSCREEN_ENTER', 'Escalado animado', True),
                ('fade', 'Fade', 'MOD_OPACITY', 'Desvanecimiento gradual', True),
                ('wave', 'Wave', 'MOD_WAVE', 'Ondulación de superficie', True),
                ('follow_path', 'Path', 'CURVE_PATH', 'Seguir trayectoria', False)  # Requiere curva
            ],
            'PARTICLES': [
                ('fire', 'Fire', 'LIGHT_SUN', 'Simulación de fuego', True),
                ('smoke', 'Smoke', 'MOD_FLUIDSIM', 'Humo realista', True),
                ('explosion', 'Explosion', 'FORCE_TURBULENCE', 'Explosión con partículas', True),
                ('sparks', 'Sparks', 'LIGHTPROBE_VOLUME', 'Chispas eléctricas', True),
                ('blood', 'Blood', 'MATFLUID', 'Efecto de sangre', False)  # En desarrollo
            ],
            'LIGHTING': [
                ('spotlight', 'Spotlight', 'LIGHT_SPOT', 'Foco direccional', True),
                ('volumetric', 'Volumetric', 'VOLUME_DATA', 'Iluminación volumétrica', True),
                ('neon', 'Neon', 'LIGHT_AREA', 'Efecto neón brillante', True),
                ('global_illumination', 'GI', 'WORLD', 'Iluminación global', False),  # Pesado
                ('flash', 'Flash', 'LIGHT_HEMI', 'Destello instantáneo', True),
                ('glow_light', 'Glow', 'LIGHT', 'Resplandor suave', True)
            ],
            'MATERIALS': [
                ('glass', 'Glass', 'SHADING_RENDERED', 'Material cristalino', True),
                ('metal', 'Metal', 'METALLIC', 'Superficie metálica', True),
                ('hologram', 'Hologram', 'GHOST_ENABLED', 'Efecto holográfico', True),
                ('emission', 'Emission', 'LIGHT', 'Material emisivo', True),
                ('dissolve', 'Dissolve', 'MOD_OPACITY', 'Disolución gradual', True),
                ('fabric', 'Fabric', 'TEXTURE', 'Textura de tela', False),  # Requiere UV mapping
                ('glassmorphism', 'Glassmorphism', 'NODE_MATERIAL', 'Efecto vidrio esmerilado moderno', True),
                ('cyberpunk_glow', 'Cyberpunk', 'LIGHT_AREA', 'Brillo neón cyberpunk', True),
                ('holographic_distortion', 'Holo Distort', 'GHOST_ENABLED', 'Distorsión holográfica', True)
            ],
            'SIMULATION': [
                ('cloth', 'Cloth', 'MOD_CLOTH', 'Simulación de tela', True),
                ('fluid', 'Fluid', 'MOD_FLUIDSIM', 'Dinámica de fluidos', True),
                ('rigid_body', 'Physics', 'PHYSICS', 'Física de cuerpos rígidos', True),
                ('soft_body', 'Soft Body', 'MOD_SOFT', 'Cuerpo blando', True),
                ('ocean', 'Ocean', 'MOD_OCEAN', 'Simulación oceánica', True),
                ('bio_organic_growth', 'Bio Growth', 'MODIFIER', 'Crecimiento orgánico', True),
                ('parametric_deformation', 'Param Deform', 'MOD_WAVE', 'Deformación paramétrica', True)
            ],
            'CAMERA': [
                ('camera_dolly', 'Dolly', 'CON_CAMERASOLVER', 'Movimiento de cámara', True),
                ('camera_zoom', 'Zoom', 'ZOOM_IN', 'Zoom cinematográfico', True),
                ('depth_of_field', 'DOF', 'CAMERA_DATA', 'Profundidad de campo', True),
                ('camera_focus_pull', 'Focus', 'CON_FOLLOWPATH', 'Cambio de foco', True),
                ('camera_follow', 'Follow', 'CON_TRACKTO', 'Seguimiento de objeto', True),
                ('lens_distortion', 'Distortion', 'MESH_GRID', 'Distorsión de lente', False)  # Requiere compositor
            ],
            'UTILITIES': [
                ('slow_motion', 'Slow Mo', 'PREVIEW_RANGE', 'Cámara lenta avanzada', True),
                ('fast_forward', 'Fast', 'FF', 'Aceleración temporal', True),
                ('freeze_frame', 'Freeze', 'FREEZE', 'Congelación de cuadro', True),
                ('reverse', 'Reverse', 'LOOP_BACK', 'Reproducción inversa', True),
                ('time_remap', 'Time Remap', 'TIME', 'Remapeo temporal avanzado', True),
                ('frame_blending', 'Frame Blend', 'RENDER_ANIMATION', 'Mezcla de frames', True),
                ('scene_scale', 'Scene Scale', 'FULLSCREEN_ENTER', 'Escala de escena', True),
                ('physics_time_scale', 'Physics Time', 'PHYSICS', 'Escala tiempo físicas', True)
            ],
            'VISUAL': [
                ('glow', 'Glow', 'LIGHT_HEMI', 'Resplandor suave', True),
                ('glitch', 'Glitch', 'ERROR', 'Efecto de interferencia', True),
                ('bloom', 'Bloom', 'LIGHT_SUN', 'Florecimiento luminoso', True),
                ('nft_showcase', 'NFT Showcase', 'SOLO_ON', 'Showcase NFT premium', True)
            ]
        }
        
        effects = verified_effects.get(category, [])
        
        if not effects:
            layout.label(text="🔍 No hay efectos en esta categoría", icon='INFO')
            return
        
        # Verificar compatibilidad con objeto activo
        obj = context.active_object
        obj_compatible = obj and obj.type in ['MESH', 'CAMERA', 'LIGHT', 'CURVE']
        
        # Crear grid de efectos
        grid = layout.grid_flow(row_major=True, columns=2, even_columns=True, align=True)
        
        for effect_id, label, icon, description, is_working in effects:
            col = grid.column(align=True)
            
            # Determinar si el efecto está disponible
            is_available = is_working and obj_compatible
            
            # Botón principal del efecto
            if is_available:
                op = col.operator("motionfx.apply_effect", text=label, icon=icon)
                op.effect_type = effect_id
            else:
                # Botón deshabilitado con información
                disabled_row = col.row()
                disabled_row.enabled = False
                disabled_row.operator("motionfx.apply_effect", text=f"{label} ⚠️", icon=icon)
                
                # Mostrar razón de deshabilitación
                if not is_working:
                    reason_row = col.row()
                    reason_row.scale_y = 0.6
                    reason_row.label(text="En desarrollo", icon='EXPERIMENTAL')
                elif not obj_compatible:
                    reason_row = col.row()
                    reason_row.scale_y = 0.6
                    reason_row.label(text="Objeto incompatible", icon='ERROR')
            
            # Descripción
            if context.scene.motionfx_settings.advanced_mode:
                desc_row = col.row()
                desc_row.scale_y = 0.7
                desc_row.label(text=description)
    
    def draw_advanced_tools(self, layout, context):
        """Dibuja herramientas avanzadas con menú de mockups"""
        tools_box = layout.box()
        tools_box.label(text="🚀 Herramientas Pro", icon='TOOL_SETTINGS')
        
        # Mockups 3D con selector
        mockup_section = tools_box.box()
        mockup_section.label(text="🎨 Mockups 3D", icon='MESH_ICOSPHERE')
        
        if hasattr(context.scene, "motionfx_settings"):
            settings = context.scene.motionfx_settings
            
            # Verificar que las propiedades existan
            if hasattr(settings, 'mockup_category'):
                # Selector de categoría de mockup
                cat_row = mockup_section.row()
                cat_row.prop(settings, "mockup_category", text="Categoría")
            
            if hasattr(settings, 'selected_mockup'):
                # Selector de mockup específico
                mockup_row = mockup_section.row()
                mockup_row.prop(settings, "selected_mockup", text="Tipo")
            
            # Botón para crear mockup
            create_row = mockup_section.row(align=True)
            create_row.scale_y = 1.1
            create_row.operator("motionfx.create_mockup", text="Crear Mockup", icon='ADD')
        else:
            # Fallback si no hay settings
            mockup_section.label(text="⚠️ Settings no disponibles", icon='ERROR')
        
        # Vector Fields
        vector_row = tools_box.row(align=True)
        vector_row.scale_y = 1.1
        vector_row.operator("motionfx.create_vector_field", text="🌀 Campo Vectorial", icon='FORCE_VORTEX')
        
        # Quick Effects Showcase
        if hasattr(context.scene, 'motionfx_settings') and context.scene.motionfx_settings.advanced_mode:
            showcase_row = tools_box.row(align=True)
            showcase_row.scale_y = 1.1
            showcase_row.operator("motionfx.apply_all_showcase", text="✨ Demo Completa", icon='PLAY')
    
    def draw_presets_panel(self, layout, context):
        """Dibuja el panel de presets mejorado con selector"""
        presets_box = layout.box()
        presets_box.label(text="💾 Presets", icon='PRESET')
        
        if hasattr(context.scene, "motionfx_settings"):
            settings = context.scene.motionfx_settings
            
            # Selector de preset por categoría
            preset_cat_row = presets_box.row()
            preset_cat_row.prop(settings, "preset_category", text="Categoría")
            
            # Lista de presets disponibles
            preset_list_row = presets_box.row()
            preset_list_row.prop(settings, "selected_preset", text="Preset")
            
            # Botones de acción
            actions_row = presets_box.row(align=True)
            actions_row.operator("motionfx.load_preset", text="📂 Cargar", icon='FILE_FOLDER')
            actions_row.operator("motionfx.save_preset", text="💾 Guardar", icon='FILE_NEW')
            
            # Información del preset seleccionado
            if hasattr(settings, 'selected_preset') and settings.selected_preset != 'none':
                info_row = presets_box.row()
                info_row.scale_y = 0.8
                info_row.label(text=f"Preset: {settings.selected_preset.replace('_', ' ').title()}", icon='INFO')

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
    MOTIONFX_OT_load_preset,
    MOTIONFX_OT_save_preset,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    print("MotionFX: Enhanced panels module loaded")

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Enhanced panels module unloaded")