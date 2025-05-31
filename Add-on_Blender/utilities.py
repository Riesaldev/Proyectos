import bpy
import ast
from bpy.props import StringProperty, EnumProperty
from bpy.types import Operator

def create_geometry_node_group(name):
    """Crea un grupo de nodos de geometría personalizado"""
    try:
        group = bpy.data.node_groups.new(name, 'GeometryNodeTree')
        
        # Nodos básicos
        group_input = group.nodes.new('NodeGroupInput')
        group_output = group.nodes.new('NodeGroupOutput')
        
        # Posicionar nodos
        group_input.location = (-300, 0)
        group_output.location = (300, 0)
        
        # Crear sockets de entrada y salida
        group.inputs.new('NodeSocketGeometry', 'Geometry')
        group.outputs.new('NodeSocketGeometry', 'Geometry')
        
        # Personalizar según el efecto
        if name == "VortexEffect":
            # Añadir nodos para efecto vórtice
            position = group.nodes.new('GeometryNodeInputPosition')
            noise = group.nodes.new('GeometryNodeNoiseTexture')
            set_position = group.nodes.new('GeometryNodeSetPosition')
            
            # Posicionar nodos
            position.location = (-150, 100)
            noise.location = (0, 100)
            set_position.location = (150, 0)
            
            # Conectar nodos básicos
            group.links.new(group_input.outputs['Geometry'], set_position.inputs['Geometry'])
            group.links.new(position.outputs['Position'], noise.inputs['Vector'])
            group.links.new(noise.outputs['Color'], set_position.inputs['Offset'])
            group.links.new(set_position.outputs['Geometry'], group_output.inputs['Geometry'])
            
        return group
    except Exception as e:
        print(f"Error creating geometry node group: {e}")
        return None

def apply_dynamic_drivers(obj, prop_name, amplitude_prop_name="amplitude"):
    """
    Aplica un driver dinámico a una propiedad del objeto.
    
    Args:
        obj: El objeto al que se aplica el driver
        prop_name: El data_path de la propiedad (ej: "location.x", '["custom_prop"]')
        amplitude_prop_name: Nombre de la propiedad personalizada que controla la amplitud
    """
    try:
        # Asegurarse de que la propiedad de amplitud exista
        if amplitude_prop_name not in obj:
            obj[amplitude_prop_name] = 1.0
        
        # Crear el driver
        driver = obj.driver_add(prop_name).driver
        driver.type = 'SCRIPTED'
        
        # Variable para el tiempo
        var_time = driver.variables.new()
        var_time.name = 'time'
        var_time.type = 'SINGLE_PROP'
        var_time.targets[0].id_type = 'SCENE'
        var_time.targets[0].id = bpy.context.scene
        var_time.targets[0].data_path = 'frame_current'
        
        # Variable para la amplitud
        var_amp = driver.variables.new()
        var_amp.name = 'amp'
        var_amp.type = 'SINGLE_PROP'
        var_amp.targets[0].id_type = 'OBJECT'
        var_amp.targets[0].id = obj
        var_amp.targets[0].data_path = f'["{amplitude_prop_name}"]'
        
        # Expresión del driver
        driver.expression = "sin(time * 0.1) * amp"
        
        print(f"Driver applied to {obj.name}.{prop_name}")
        
    except Exception as e:
        print(f"Error applying driver to {obj.name}.{prop_name}: {e}")

class MotionFX_OT_SavePreset(Operator):
    bl_idname = "motionfx.save_preset"
    bl_label = "Save MotionFX Preset"
    bl_description = "Save the current MotionFX settings as a preset"
    bl_options = {'REGISTER', 'UNDO'}

    preset_name: StringProperty(
        name="Preset Name",
        description="Name of the preset to save",
        default="MyPreset"
    )

    def execute(self, context):
        try:
            scene = context.scene
            if not hasattr(scene, "motionfx_settings"):
                self.report({'ERROR'}, "No MotionFX settings found in scene.")
                return {'CANCELLED'}

            settings = scene.motionfx_settings
            
            # Propiedades a guardar
            properties_to_save = ["effect_category", "advanced_mode", "live_update"]
            
            preset_data = {}
            for prop_name in properties_to_save:
                if hasattr(settings, prop_name):
                    preset_data[prop_name] = getattr(settings, prop_name)
            
            # Obtener o crear bloque de texto para presets
            presets_text_block_name = "MotionFX_Presets"
            presets_text = bpy.data.texts.get(presets_text_block_name)
            if not presets_text:
                presets_text = bpy.data.texts.new(presets_text_block_name)

            # Cargar presets existentes
            all_presets = {}
            if presets_text.as_string():
                try:
                    all_presets = ast.literal_eval(presets_text.as_string())
                    if not isinstance(all_presets, dict):
                        all_presets = {}
                except:
                    all_presets = {}
            
            # Añadir nuevo preset
            all_presets[self.preset_name] = preset_data
            
            # Guardar
            presets_text.clear()
            presets_text.write(repr(all_presets))
            
            self.report({'INFO'}, f"Preset '{self.preset_name}' saved successfully.")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Failed to save preset: {str(e)}")
            return {'CANCELLED'}

    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)

class MotionFX_OT_LoadPreset(Operator):
    bl_idname = "motionfx.load_preset"
    bl_label = "Load MotionFX Preset"
    bl_description = "Load a MotionFX preset"
    bl_options = {'REGISTER', 'UNDO'}

    def get_preset_items(self, context):
        """Obtiene los presets disponibles dinámicamente"""
        items = []
        presets_text_block_name = "MotionFX_Presets"
        presets_text = bpy.data.texts.get(presets_text_block_name)
        
        if presets_text and presets_text.as_string():
            try:
                all_presets = ast.literal_eval(presets_text.as_string())
                if isinstance(all_presets, dict):
                    for name in sorted(all_presets.keys()):
                        items.append((name, name, f"Load preset {name}"))
            except:
                pass
        
        if not items:
            items.append(("NONE", "No Presets Found", "No presets available to load"))
        
        return items

    preset_name: EnumProperty(
        name="Preset",
        description="Select the preset to load",
        items=get_preset_items
    )

    def execute(self, context):
        try:
            if self.preset_name == "NONE":
                self.report({'ERROR'}, "No preset selected or no presets available.")
                return {'CANCELLED'}

            scene = context.scene
            if not hasattr(scene, "motionfx_settings"):
                self.report({'ERROR'}, "No MotionFX settings found in scene.")
                return {'CANCELLED'}

            # Cargar presets
            presets_text_block_name = "MotionFX_Presets"
            presets_text = bpy.data.texts.get(presets_text_block_name)
            
            if not presets_text or not presets_text.as_string():
                self.report({'ERROR'}, "Presets file not found or empty.")
                return {'CANCELLED'}

            all_presets = ast.literal_eval(presets_text.as_string())
            if not isinstance(all_presets, dict) or self.preset_name not in all_presets:
                self.report({'ERROR'}, f"Preset '{self.preset_name}' not found.")
                return {'CANCELLED'}
            
            # Aplicar preset
            preset_data = all_presets[self.preset_name]
            settings = scene.motionfx_settings

            for key, value in preset_data.items():
                if hasattr(settings, key):
                    try:
                        setattr(settings, key, value)
                    except Exception as e:
                        print(f"Could not set property {key}: {e}")
                else:
                    print(f"Preset key '{key}' not found in settings.")

            self.report({'INFO'}, f"Preset '{self.preset_name}' loaded successfully.")
            
            # Forzar actualización de la UI
            if hasattr(context.area, 'tag_redraw'):
                context.area.tag_redraw()

            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Failed to load preset: {str(e)}")
            return {'CANCELLED'}

def generate_previews(self, context):
    """Genera previews para el EnumProperty de previews"""
    # Esta función se puede expandir para mostrar previews reales
    # Por ahora devuelve items básicos
    return [
        ("PREVIEW_BOUNCE", "Bounce", "Preview of bounce effect"),
        ("PREVIEW_FADE", "Fade", "Preview of fade effect"),
        ("PREVIEW_SCALE", "Scale", "Preview of scale effect"),
        ("PREVIEW_ROTATION", "Rotation", "Preview of rotation effect"),
    ]

classes = (
    MotionFX_OT_SavePreset,
    MotionFX_OT_LoadPreset,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)