import bpy
from bpy.props import EnumProperty, BoolProperty, PointerProperty

class MotionFXSettings(bpy.types.PropertyGroup):
    effect_category: EnumProperty(
        name="Category",
        description="Select the effect category",
        items=[
            ('ANIMATION', "Animation", "Animation effects"),
            ('SIMULATION', "Simulation", "Simulation effects"),
            ('PARTICLES', "Particles", "Particle effects"),
            ('LIGHTING', "Lighting", "Lighting effects"),
            ('MATERIALS', "Materials", "Material effects"),
            ('CAMERA', "Camera", "Camera effects"),
            ('UTILITIES', "Utilities", "Utility effects"),
            ('VISUAL', "Visual", "Visual effects"),
        ],
        default='ANIMATION',
    )

    advanced_mode: BoolProperty(
        name="Advanced Controls",
        description="Enable advanced controls for more detailed effect customization",
        default=False,
    )

    live_update: BoolProperty(
        name="Live Update",
        description="Enable live updates for effects",
        default=True,
        update=lambda self, ctx: update_live_parameters(self, ctx)
    )

def update_live_parameters(self, context):
    if self.live_update:
        # Actualiza los parámetros en tiempo real
        pass
    else:
        # Desactiva las actualizaciones en vivo
        pass

classes = [MotionFXSettings]

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    bpy.types.Scene.motionfx_settings = PointerProperty(type=MotionFXSettings)

def unregister():
    if hasattr(bpy.types.Scene, "motionfx_settings"):
        del bpy.types.Scene.motionfx_settings
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)