import bpy
import ast
import json
import os
from bpy.props import StringProperty, EnumProperty
from bpy.types import Operator

def create_geometry_node_group(name):
    try:
        group = bpy.data.node_groups.new(name, 'GeometryNodeTree')
        
        group_input = group.nodes.new('NodeGroupInput')
        group_output = group.nodes.new('NodeGroupOutput')
        
        group_input.location = (-300, 0)
        group_output.location = (300, 0)
        
        group.inputs.new('NodeSocketGeometry', 'Geometry')
        group.outputs.new('NodeSocketGeometry', 'Geometry')
        
        if name == "VortexEffect":
            position = group.nodes.new('GeometryNodeInputPosition')
            noise = group.nodes.new('GeometryNodeNoiseTexture')
            set_position = group.nodes.new('GeometryNodeSetPosition')
            
            position.location = (-150, 100)
            noise.location = (0, 100)
            set_position.location = (150, 0)
            
            group.links.new(group_input.outputs['Geometry'], set_position.inputs['Geometry'])
            group.links.new(position.outputs['Position'], noise.inputs['Vector'])
            group.links.new(noise.outputs['Color'], set_position.inputs['Offset'])
            group.links.new(set_position.outputs['Geometry'], group_output.inputs['Geometry'])
            
        return group
    except Exception as e:
        print(f"Error creating geometry node group: {e}")
        return None

def apply_dynamic_drivers(obj, prop_name, amplitude_prop_name="amplitude"):
    try:
        if amplitude_prop_name not in obj:
            obj[amplitude_prop_name] = 1.0
        
        driver = obj.driver_add(prop_name).driver
        driver.type = 'SCRIPTED'
        
        var_time = driver.variables.new()
        var_time.name = 'time'
        var_time.type = 'SINGLE_PROP'
        var_time.targets[0].id_type = 'SCENE'
        var_time.targets[0].id = bpy.context.scene
        var_time.targets[0].data_path = 'frame_current'
        
        var_amp = driver.variables.new()
        var_amp.name = 'amp'
        var_amp.type = 'SINGLE_PROP'
        var_amp.targets[0].id_type = 'OBJECT'
        var_amp.targets[0].id = obj
        var_amp.targets[0].data_path = f'["{amplitude_prop_name}"]'
        
        driver.expression = "sin(time * 0.1) * amp"
        
        print(f"Driver applied to {obj.name}.{prop_name}")
        
    except Exception as e:
        print(f"Error applying driver to {obj.name}.{prop_name}: {e}")

def generate_previews(self, context):
    return [
        ("PREVIEW_BOUNCE", "Bounce", "Preview of bounce effect"),
        ("PREVIEW_FADE", "Fade", "Preview of fade effect"),
        ("PREVIEW_SCALE", "Scale", "Preview of scale effect"),
        ("PREVIEW_ROTATION", "Rotation", "Preview of rotation effect"),
    ]

def save_preset_data(preset_name, preset_data):
    """Guarda datos de preset en un Text Block de Blender"""
    try:
        # Crear o actualizar text block
        text_name = f"MotionFX_Preset_{preset_name}"
        
        if text_name in bpy.data.texts:
            text_block = bpy.data.texts[text_name]
            text_block.clear()
        else:
            text_block = bpy.data.texts.new(text_name)
        
        # Convertir datos a JSON
        json_data = json.dumps(preset_data, indent=2)
        text_block.write(json_data)
        
        print(f"Preset '{preset_name}' saved successfully")
        return True
        
    except Exception as e:
        print(f"Error saving preset: {e}")
        return False

def load_preset_data(preset_name):
    """Carga datos de preset desde un Text Block"""
    try:
        text_name = f"MotionFX_Preset_{preset_name}"
        
        if text_name not in bpy.data.texts:
            print(f"Preset '{preset_name}' not found")
            return None
        
        text_block = bpy.data.texts[text_name]
        json_data = text_block.as_string()
        
        if not json_data.strip():
            print(f"Preset '{preset_name}' is empty")
            return None
        
        preset_data = json.loads(json_data)
        print(f"Preset '{preset_name}' loaded successfully")
        return preset_data
        
    except Exception as e:
        print(f"Error loading preset: {e}")
        return None

def get_available_presets():
    """Obtiene lista de presets disponibles"""
    try:
        presets = []
        
        for text_block in bpy.data.texts:
            if text_block.name.startswith("MotionFX_Preset_"):
                preset_name = text_block.name.replace("MotionFX_Preset_", "")
                presets.append(preset_name)
        
        return sorted(presets)
        
    except Exception as e:
        print(f"Error getting available presets: {e}")
        return []

def delete_preset(preset_name):
    """Elimina un preset"""
    try:
        text_name = f"MotionFX_Preset_{preset_name}"
        
        if text_name in bpy.data.texts:
            bpy.data.texts.remove(bpy.data.texts[text_name])
            print(f"Preset '{preset_name}' deleted")
            return True
        else:
            print(f"Preset '{preset_name}' not found")
            return False
            
    except Exception as e:
        print(f"Error deleting preset: {e}")
        return False

def validate_object_compatibility(obj, effect_type):
    """Valida si un objeto es compatible con un tipo de efecto"""
    try:
        if not obj:
            return False, "No object provided"
        
        # Verificar que el objeto existe en la escena
        if obj.name not in bpy.data.objects:
            return False, "Object not found in scene"
        
        # Validaciones específicas por tipo de efecto
        mesh_only_effects = ['fire', 'smoke', 'cloth', 'wave', 'explosion', 'sparks', 'blood', 'glass', 'metal']
        camera_only_effects = ['camera_dolly', 'camera_zoom', 'depth_of_field', 'camera_focus_pull']
        light_compatible_effects = ['spotlight', 'flash', 'glow_light', 'volumetric']
        
        if effect_type in mesh_only_effects and obj.type != 'MESH':
            return False, f"Effect '{effect_type}' requires MESH object, got {obj.type}"
        
        if effect_type in camera_only_effects and obj.type != 'CAMERA':
            return False, f"Effect '{effect_type}' requires CAMERA object, got {obj.type}"
        
        if effect_type in light_compatible_effects and obj.type not in ['LIGHT', 'MESH']:
            return False, f"Effect '{effect_type}' requires LIGHT or MESH object, got {obj.type}"
        
        return True, "Compatible"
        
    except Exception as e:
        return False, f"Validation error: {str(e)}"

def safe_object_operation(operation_func, obj, *args, **kwargs):
    """Ejecuta una operación de objeto de forma segura"""
    try:
        # Guardar contexto actual
        original_active = bpy.context.view_layer.objects.active
        original_selected = [o for o in bpy.context.selected_objects]
        
        # Configurar objeto target
        bpy.ops.object.select_all(action='DESELECT')
        if obj and obj.name in bpy.data.objects:
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Ejecutar operación
            result = operation_func(obj, *args, **kwargs)
            
            # Restaurar contexto
            bpy.ops.object.select_all(action='DESELECT')
            if original_active and original_active.name in bpy.data.objects:
                bpy.context.view_layer.objects.active = original_active
            for o in original_selected:
                if o and o.name in bpy.data.objects:
                    o.select_set(True)
            
            return result
        else:
            return False
            
    except Exception as e:
        print(f"Error in safe object operation: {e}")
        return False

def get_addon_preferences():
    """Obtiene las preferencias del addon"""
    try:
        preferences = bpy.context.preferences
        addon_prefs = preferences.addons.get(__package__)
        
        if addon_prefs:
            return addon_prefs.preferences
        else:
            return None
            
    except Exception as e:
        print(f"Error getting addon preferences: {e}")
        return None

def create_custom_property(obj, prop_name, prop_value, prop_type='FLOAT'):
    """Crea una propiedad personalizada en un objeto"""
    try:
        if not obj:
            return False
        
        if prop_type == 'FLOAT':
            obj[prop_name] = float(prop_value)
        elif prop_type == 'INT':
            obj[prop_name] = int(prop_value)
        elif prop_type == 'STRING':
            obj[prop_name] = str(prop_value)
        elif prop_type == 'BOOL':
            obj[prop_name] = bool(prop_value)
        
        # Crear UI para la propiedad
        ui_data = obj.id_properties_ui(prop_name)
        ui_data.update(description=f"MotionFX property: {prop_name}")
        
        return True
        
    except Exception as e:
        print(f"Error creating custom property: {e}")
        return False

def cleanup_motionfx_data():
    """Limpia datos temporales de MotionFX"""
    try:
        # Limpiar propiedades temporales de objetos
        for obj in bpy.data.objects:
            props_to_remove = [key for key in obj.keys() if key.startswith('motionfx_temp_')]
            for prop in props_to_remove:
                del obj[prop]
        
        # Limpiar materiales temporales
        materials_to_remove = [mat for mat in bpy.data.materials if mat.name.startswith('MotionFX_Temp_')]
        for mat in materials_to_remove:
            bpy.data.materials.remove(mat)
        
        print("MotionFX temporary data cleaned up")
        return True
        
    except Exception as e:
        print(f"Error cleaning up MotionFX data: {e}")
        return False

def log_effect_application(obj, effect_type, success=True, details=""):
    """Registra la aplicación de un efecto"""
    try:
        # Crear log en custom property del objeto
        log_prop = 'motionfx_log'
        
        if log_prop not in obj:
            obj[log_prop] = []
        
        log_entry = {
            'effect': effect_type,
            'frame': bpy.context.scene.frame_current,
            'success': success,
            'details': details
        }
        
        # Convertir a string para almacenar
        if isinstance(obj[log_prop], list):
            current_log = obj[log_prop]
        else:
            current_log = []
        
        current_log.append(str(log_entry))
        obj[log_prop] = current_log[-10:]  # Mantener solo últimos 10 registros
        
        return True
        
    except Exception as e:
        print(f"Error logging effect application: {e}")
        return False

def register():
    print("MotionFX: Utilities module loaded")

def unregister():
    print("MotionFX: Utilities module unloaded")