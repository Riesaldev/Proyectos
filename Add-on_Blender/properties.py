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
        ],
        default='ANIMATION',
    )

    advanced_mode: BoolProperty(
        name="Advanced Controls",
        description="Enable advanced controls for more detailed effect customization",
        default=False,
    )

motionfx_settings_prop = PointerProperty(type=MotionFXSettings)

def register():
    bpy.utils.register_class(MotionFXSettings)
    bpy.types.Scene.motionfx_settings = motionfx_settings_prop

def unregister():
    del bpy.types.Scene.motionfx_settings
    bpy.utils.unregister_class(MotionFXSettings)

live_update = BoolProperty(
    name="Live Update",
    description="Enable live updates for effects",
    default=True,
    updates=lambda self, ctx: self.update_live_parameters(ctx)
)

def update_live_parameters(self, context):
    if self.live_update:
        # Update parameters in real-time
        pass
    else:
        # Disable live updates
        pass
def register_live_update():
    bpy.types.Scene.live_update = live_update
def unregister_live_update():
    del bpy.types.Scene.live_update
def register():
    register()
    register_live_update()
def unregister():
    unregister()
    unregister_live_update()

    bpy.ops.wm.save_userpref(type = 'DRAW_WIN_SWAP', iterations = 1)