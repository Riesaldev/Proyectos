import bpy
from bpy.props import EnumProperty, BoolProperty, PointerProperty, FloatProperty, IntProperty

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
    
    effect_intensity: FloatProperty(
        name="Intensity",
        description="Global effect intensity multiplier",
        default=1.0,
        min=0.0,
        max=5.0,
    )
    
    animation_length: IntProperty(
        name="Animation Length",
        description="Default animation length in frames",
        default=60,
        min=1,
        max=1000,
    )
    
    auto_keyframe: BoolProperty(
        name="Auto Keyframe",
        description="Automatically set keyframes when applying effects",
        default=True,
    )

def update_live_parameters(self, context):
    if self.live_update and context.active_object:
        try:
            from .effects_operations import EffectsOperations
            if hasattr(context.active_object, 'motionfx_last_effect'):
                EffectsOperations.apply_effect(
                    context.active_object.motionfx_last_effect, 
                    context.active_object
                )
        except:
            pass

classes = [MotionFXSettings]

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    bpy.types.Scene.motionfx_settings = PointerProperty(type=MotionFXSettings)
    print("MotionFX: Properties module loaded")

def unregister():
    if hasattr(bpy.types.Scene, "motionfx_settings"):
        del bpy.types.Scene.motionfx_settings
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Properties module unloaded")