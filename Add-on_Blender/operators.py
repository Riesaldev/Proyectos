import bpy
from bpy.types import Operator
from bpy.props import EnumProperty, StringProperty

from .effects_operations import EffectsOperations

def get_effect_items(self, context):
    return EffectsOperations.get_effect_items(context)

class MotionFX_OT_ApplyEffect(Operator):
    bl_idname = "motionfx.apply_effect"
    bl_label = "Apply Motion Effect"
    bl_description = "Apply a selected motion effect to the active object"
    bl_options = {'REGISTER', 'UNDO'}

    effect: EnumProperty(
        name="Effect",
        description="Select the motion effect to apply",
        items=get_effect_items
    )

    target: StringProperty(
        name="Target Object",
        description="Name of the target object (if required by the effect)",
        default=""
    )

    def execute(self, context):
        obj = context.active_object
        if obj is None:
            self.report({'ERROR'}, "No active object found")
            return {'CANCELLED'}

        # Efectos que requieren un objeto objetivo
        effects_with_target = {
            "add_camera_follow_effect",
            "add_camera_tracking_effect",
            "add_focus_effect",
            "add_path_effect",
            "add_track_effect"
        }

        if self.effect in effects_with_target:
            if not self.target:
                self.report({'ERROR'}, "Target object name required for this effect")
                return {'CANCELLED'}
            target_obj = bpy.data.objects.get(self.target)
            if not target_obj:
                self.report({'ERROR'}, f"Target object '{self.target}' not found")
                return {'CANCELLED'}
            result = EffectsOperations.apply_effect(self.effect, obj, target_obj)
        else:
            result = EffectsOperations.apply_effect(self.effect, obj)

        if result:
            self.report({'INFO'}, f"Effect '{self.effect}' applied.")
            return {'FINISHED'}
        else:
            self.report({'ERROR'}, f"Effect '{self.effect}' not found.")
            return {'CANCELLED'}

classes = (
    MotionFX_OT_ApplyEffect,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)