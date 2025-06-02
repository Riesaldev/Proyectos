import bpy
import traceback
from bpy.types import Panel

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
                self.report({'INFO'}, f"Vector field '{self.field_type}' created successfully")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to create vector field '{self.field_type}'")
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
                self.report({'WARNING'}, "Por favor selecciona un mockup")
                return {'CANCELLED'}
            
            from . import mockups
            
            # Intentar crear el mockup
            created_obj = mockups.mockups.create_mockup(mockup_name)
            
            if created_obj:
                self.report({'INFO'}, f"Mockup '{mockup_name}' creado exitosamente")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Error al crear mockup '{mockup_name}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error creating mockup: {str(e)}")
            print(f"Mockup creation error: {e}")
            traceback.print_exc()
            return {'CANCELLED'}
    
    def create_fallback_mockup(self, mockup_name):
        """Crear un mockup básico como fallback"""
        try:
            bpy.ops.object.select_all(action='DESELECT')
            
            # Crear objeto básico según el nombre
            if 'fluid' in mockup_name or 'wave' in mockup_name:
                bpy.ops.mesh.primitive_plane_add(size=4)
            elif 'crystal' in mockup_name or 'geometric' in mockup_name:
                bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2)
            elif 'organic' in mockup_name or 'blob' in mockup_name:
                bpy.ops.mesh.primitive_uv_sphere_add(subdivisions=3)
            else:
                bpy.ops.mesh.primitive_cube_add(size=2)
            
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
                self.report({'WARNING'}, "Por favor selecciona un preset")
                return {'CANCELLED'}
            
            from .utilities import load_preset_data
            
            preset_data = load_preset_data(preset_name)
            if preset_data:
                self.report({'INFO'}, f"Preset '{preset_name}' cargado exitosamente")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"No se pudo cargar el preset '{preset_name}'")
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
                'effect_intensity': settings.effect_intensity,
                'animation_length': settings.animation_length,
                'auto_keyframe': settings.auto_keyframe,
            }
            
            from .utilities import save_preset_data
            
            if save_preset_data(self.preset_name, preset_data):
                self.report({'INFO'}, f"Preset '{self.preset_name}' guardado exitosamente")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Error al guardar preset '{self.preset_name}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error saving preset: {str(e)}")
            return {'CANCELLED'}
    
    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)

class MOTIONFX_OT_refresh_mockup_list(bpy.types.Operator):
    """Operador para actualizar manualmente la lista de mockups"""
    bl_idname = "motionfx.refresh_mockup_list"
    bl_label = "Refresh Mockup List"
    bl_description = "Refresh the list of available mockups"
    bl_options = {'REGISTER'}
    
    def execute(self, context):
        try:
            if hasattr(context.scene, 'motionfx_settings'):
                settings = context.scene.motionfx_settings
                
                print(f"=== REFRESH MOCKUP LIST ===")
                print(f"Categoría actual: {settings.mockup_category}")
                print(f"Mockup seleccionado: {settings.selected_mockup}")
                
                # Forzar recarga del módulo mockups
                import importlib
                import sys
                if 'mockups' in sys.modules:
                    importlib.reload(sys.modules['mockups'])
                    print("Módulo mockups recargado")
                
                # Forzar actualización
                current_category = settings.mockup_category
                
                # Cambiar temporalmente la categoría para forzar update
                temp_categories = ['glassmorphism', 'cyberpunk', 'metaverse', 'parametric', 'bio_design']
                temp_cat = temp_categories[0] if current_category != temp_categories[0] else temp_categories[1]
                
                settings.mockup_category = temp_cat
                bpy.context.scene.frame_set(bpy.context.scene.frame_current)  # Forzar re-evaluación
                
                settings.mockup_category = current_category  # Restaurar
                bpy.context.scene.frame_set(bpy.context.scene.frame_current)  # Forzar re-evaluación
                
                # Resetear selección
                settings.selected_mockup = 'none'
                
                self.report({'INFO'}, f"Lista de mockups actualizada para categoría: {current_category}")
                
                # Debug: intentar obtener mockups directamente
                try:
                    from . import mockups
                    available = mockups.mockups.get_mockups()
                    categories = mockups.mockups.get_categories()
                    category_mockups = mockups.mockups.get_mockups_by_category(current_category)
                    
                    print(f"Total mockups disponibles: {len(available)}")
                    print(f"Categorías disponibles: {categories}")
                    print(f"Mockups en categoría '{current_category}': {len(category_mockups)}")
                    
                    if category_mockups:
                        for mockup in category_mockups:
                            print(f"  - {mockup['name']} ({mockup.get('display_name', 'Sin nombre')})")
                    
                except Exception as debug_e:
                    print(f"Error en debug directo: {debug_e}")
                
                print("=== FIN REFRESH ===")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, "Settings no disponibles")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error actualizando lista: {str(e)}")
            print(f"Error en refresh_mockup_list: {e}")
            import traceback
            traceback.print_exc()
            return {'CANCELLED'}

class MOTIONFX_OT_test_mockups_direct(bpy.types.Operator):
    """Operador de test para verificar mockups directamente"""
    bl_idname = "motionfx.test_mockups_direct"
    bl_label = "Test Mockups Direct"
    bl_description = "Test direct access to mockups"
    bl_options = {'REGISTER'}
    
    def execute(self, context):
        try:
            print("=== TEST MOCKUPS DIRECTO ===")
            
            # Test 1: Importar módulo
            from . import mockups
            print("✓ Módulo mockups importado")
            
            # Test 2: Acceso a instancia
            mockups_instance = mockups.mockups
            print("✓ Instancia mockups obtenida")
            
            # Test 3: Obtener lista
            available = mockups_instance.get_mockups()
            print(f"✓ Mockups disponibles: {len(available)}")
            
            # Test 4: Obtener categorías
            categories = mockups_instance.get_categories()
            print(f"✓ Categorías: {categories}")
            
            # Test 5: Mockups por categoría
            for cat in categories:
                cat_mockups = mockups_instance.get_mockups_by_category(cat)
                print(f"  - {cat}: {len(cat_mockups)} mockups")
                for mockup in cat_mockups[:2]:  # Solo los primeros 2
                    print(f"    * {mockup['name']} ({mockup.get('display_name', 'Sin nombre')})")
            
            # Test 6: Crear un mockup de prueba
            test_mockup = mockups_instance.create_mockup('glassmorphism_panel')
            if test_mockup:
                print("✓ Test mockup creado exitosamente")
                self.report({'INFO'}, "Test completado - Ver consola para detalles")
            else:
                print("✗ Error creando test mockup")
                self.report({'WARNING'}, "Test completado con warnings - Ver consola")
            
            print("=== FIN TEST ===")
            return {'FINISHED'}
            
        except Exception as e:
            print(f"✗ Error en test: {e}")
            import traceback
            traceback.print_exc()
            self.report({'ERROR'}, f"Test falló: {str(e)}")
            return {'CANCELLED'}

class MOTIONFX_PT_main_panel(Panel):
    bl_label = "Motion FX Library Pro"
    bl_idname = "MOTIONFX_PT_main_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Motion FX"
    
    def draw(self, context):
        layout = self.layout
        
        # Header info
        box = layout.box()
        box.label(text="🎬 Motion FX Library Pro v0.5.0", icon='MODIFIER')
        
        # Quick info
        if context.active_object:
            box.label(text=f"Active: {context.active_object.name}", icon='OBJECT_DATA')
            if 'motionfx_last_effect' in context.active_object:
                last_effect = context.active_object['motionfx_last_effect']
                box.label(text=f"Last Effect: {last_effect}", icon='CHECKMARK')
        
        layout.separator()
        
        # Settings
        if hasattr(context.scene, 'motionfx_settings'):
            settings = context.scene.motionfx_settings
            layout.prop(settings, "auto_keyframe")
            layout.prop(settings, "effect_strength")
            layout.prop(settings, "animation_duration")

classes = (
    VIEW3D_PT_motionfx_main,
    VIEW3D_PT_motionfx_quick_access,
    VIEW3D_PT_motionfx_help,
    MOTIONFX_OT_create_vector_field,
    MOTIONFX_OT_create_mockup,
    MOTIONFX_OT_load_preset,
    MOTIONFX_OT_save_preset,
    MOTIONFX_OT_refresh_mockup_list,
    MOTIONFX_OT_test_mockups_direct,
    MOTIONFX_PT_main_panel,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    print("MotionFX: Enhanced panels module loaded")

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Enhanced panels module unloaded")