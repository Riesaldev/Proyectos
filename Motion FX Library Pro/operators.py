import bpy
from bpy.types import Operator
from .effects_operations import EffectsOperations

class MOTIONFX_OT_apply_effect(Operator):
    bl_idname = "motionfx.apply_effect"
    bl_label = "Apply Motion FX Effect"
    bl_description = "Apply selected effect to active object"
    bl_options = {'REGISTER', 'UNDO'}
    
    effect_type: bpy.props.StringProperty(
        name="Effect Type",
        description="Type of effect to apply",
        default=""
    )
    
    def execute(self, context):
        if not self.effect_type:
            self.report({'ERROR'}, "No effect type specified")
            return {'CANCELLED'}
        
        obj = context.active_object
        if not obj:
            self.report({'ERROR'}, "No active object selected")
            return {'CANCELLED'}
        
        try:
            # Check if it's a utility effect that needs context
            utility_effects = ['slow_motion', 'fast_forward', 'freeze_frame', 'reverse', 
                             'glassmorphism', 'cyberpunk_glow', 'holographic_distortion',
                             'bio_organic_growth', 'nft_showcase', 'parametric_deformation',
                             'frame_blending', 'scene_scale', 'physics_time_scale', 'time_remap']
            
            if self.effect_type in utility_effects:
                success = EffectsOperations.apply_utility_effect(self.effect_type, context)
            else:
                success = EffectsOperations.apply_effect(self.effect_type, obj)
            
            if success:
                obj['motionfx_last_effect'] = self.effect_type
                self.report({'INFO'}, f"Effect '{self.effect_type}' applied successfully")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to apply effect '{self.effect_type}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error applying effect: {str(e)}")
            return {'CANCELLED'}

class MOTIONFX_OT_apply_all_showcase(Operator):
    bl_idname = "motionfx.apply_all_showcase"
    bl_label = "Apply Complete Showcase"
    bl_description = "Apply multiple effects for demonstration"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        obj = context.active_object
        if not obj:
            self.report({'ERROR'}, "No active object selected")
            return {'CANCELLED'}
        
        try:
            effects_to_apply = ['bounce', 'rotation', 'glassmorphism']
            
            for effect in effects_to_apply:
                bpy.ops.motionfx.apply_effect(effect_type=effect)
            
            self.report({'INFO'}, "Complete showcase applied")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Error in showcase: {str(e)}")
            return {'CANCELLED'}

def register():
    bpy.utils.register_class(MOTIONFX_OT_apply_effect)
    bpy.utils.register_class(MOTIONFX_OT_apply_all_showcase)
    print("MotionFX: Main operators registered")

def unregister():
    bpy.utils.unregister_class(MOTIONFX_OT_apply_all_showcase)
    bpy.utils.unregister_class(MOTIONFX_OT_apply_effect)
    print("MotionFX: Main operators unregistered")