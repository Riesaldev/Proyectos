import bpy
import ast
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
    try:
        presets_text_block_name = "MotionFX_Presets"
        presets_text = bpy.data.texts.get(presets_text_block_name)
        if not presets_text:
            presets_text = bpy.data.texts.new(presets_text_block_name)

        all_presets = {}
        if presets_text.as_string():
            try:
                all_presets = ast.literal_eval(presets_text.as_string())
                if not isinstance(all_presets, dict):
                    all_presets = {}
            except:
                all_presets = {}
        
        all_presets[preset_name] = preset_data
        
        presets_text.clear()
        presets_text.write(repr(all_presets))
        
        return True
    except Exception as e:
        print(f"Error saving preset data: {e}")
        return False

def load_preset_data(preset_name):
    try:
        presets_text_block_name = "MotionFX_Presets"
        presets_text = bpy.data.texts.get(presets_text_block_name)
        
        if not presets_text or not presets_text.as_string():
            return None

        all_presets = ast.literal_eval(presets_text.as_string())
        if isinstance(all_presets, dict) and preset_name in all_presets:
            return all_presets[preset_name]
        
        return None
    except Exception as e:
        print(f"Error loading preset data: {e}")
        return None

def get_available_presets():
    try:
        presets_text_block_name = "MotionFX_Presets"
        presets_text = bpy.data.texts.get(presets_text_block_name)
        
        if presets_text and presets_text.as_string():
            all_presets = ast.literal_eval(presets_text.as_string())
            if isinstance(all_presets, dict):
                return list(all_presets.keys())
        
        return []
    except Exception as e:
        print(f"Error getting available presets: {e}")
        return []

def register():
    print("MotionFX: Utilities module loaded")

def unregister():
    print("MotionFX: Utilities module unloaded")