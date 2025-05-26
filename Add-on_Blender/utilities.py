import bpy
import nodeitems_utils

def create_geometry_node_group(name):
    group  = bpy.data.node_groups.new(name, 'GeometryNodeTree')
    
    # Nodos basicos
    group_input = group.nodes.new('NodeGroupInput')
    group_output = group.nodes.new('NodeGroupOutput')

    # Personalizar segun el efecto
    if name == "VortexEffect":
        noise = group.nodes.new('GeometryNodeNoise')
        displacement = group.nodes.new('GeometryNodeDisplacement')
        group.links.new(noise.outputs['Value'], displacement.inputs['Height'])

    return group

  def apply_dynamic_drivers(obj, prop_name):
    driver = obj.driver_add(f'[prop_name]').driver
    var = driver.variables.new()
    var.name = 'time'
    var.type = 'SINGLE_PROP'
    var.targets[0].id = 'SCENE'
    var.targets[0].id = bpy.context.scene
    var.targets[0].data_path = 'frame_current'

    driver.expression = f"sin(time / 10) * {prop_name}_amplitude"



class MotionFX_OT_SavePreset(Operator):
    bl_idname = "motionfx.save_preset"
    bl_label = "Save MotionFX Preset"
    bl_description = "Save the current MotionFX settings as a preset"

    preset_name: StringProperty(
        name="Preset Name",
        description="Name of the preset to save",
        default="MyPreset"
    )

    def execute(self, context):
      obj = context.object
      preset = bpy.data.texts.get("MotionFX_Presets") or bpy.data.texts.new("MotionFX_Presets")

      preset_data = {
        "effect_type": obj.motionfx.effect_type,
        "parameters": {k: v for k, v in obj.items(),}
      }

      preset.write(f"{self.preset_name} = {str(preset_data)}\n")
      
      return {'FINISHED'}

class MotionFX_OT_LoadPreset(Operator):
    bl_idname = "motionfx.load_preset"
    bl_label = "Load MotionFX Preset"
    bl_description = "Load a MotionFX preset"

    preset_name: StringProperty(
        name="Preset Name",
        description="Name of the preset to load",
        default="MyPreset"
    )

    def execute(self, context):
        preset = bpy.data.texts.get("MotionFX_Presets")
        if not preset:
            self.report({'ERROR'}, "No presets found")
            return {'CANCELLED'}

        for line in preset.lines:
            if line.body.startswith(f"{self.preset_name} ="):
                preset_data = eval(line.body.split('=')[1].strip())
                obj = context.object
                obj.motionfx.effect_type = preset_data["effect_type"]
                for k, v in preset_data["parameters"].items():
                    setattr(obj, k, v)
                return {'FINISHED'}

        self.report({'ERROR'}, f"Preset '{self.preset_name}' not found")
        return {'CANCELLED'}