import bpy
import random
import mathutils
from . import materialEffects, cameraEffects, lightingEffects, animationEffects, particlesEffects, simulationEffects

class MOTIONFX_OT_apply_effect(bpy.types.Operator):
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
            success = self.apply_effect(obj, self.effect_type, context)
            if success:
                # Marcar último efecto aplicado
                obj['motionfx_last_effect'] = self.effect_type
                self.report({'INFO'}, f"Effect '{self.effect_type}' applied successfully")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to apply effect '{self.effect_type}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error applying effect: {str(e)}")
            return {'CANCELLED'}
    
    def apply_effect(self, obj, effect_type, context):
        """Aplica el efecto especificado al objeto"""
        try:
            # Efectos de animación
            if effect_type == 'bounce':
                return animationEffects.animation_effects.add_bounce_effect(obj)
            elif effect_type == 'rotation':
                return animationEffects.animation_effects.add_rotation_effect(obj)
            elif effect_type == 'scale':
                return animationEffects.animation_effects.add_scale_effect(obj)
            elif effect_type == 'fade':
                return animationEffects.animation_effects.add_fade_effect(obj)
            elif effect_type == 'wave':
                return animationEffects.animation_effects.add_wave_effect(obj)
            elif effect_type == 'follow_path':
                return animationEffects.animation_effects.add_follow_path_effect(obj)
            
            # Efectos de partículas
            elif effect_type == 'fire':
                return particlesEffects.particle_effects.add_fire_effect(obj)
            elif effect_type == 'smoke':
                return particlesEffects.particle_effects.add_smoke_effect(obj)
            elif effect_type == 'explosion':
                return particlesEffects.particle_effects.add_explosion_effect(obj)
            elif effect_type == 'sparks':
                return particlesEffects.particle_effects.add_sparks_effect(obj)
            
            # Efectos de iluminación
            elif effect_type == 'spotlight':
                return lightingEffects.lighting_effects.add_spotlight_effect(obj)
            elif effect_type == 'volumetric':
                return lightingEffects.lighting_effects.add_volumetric_effect(obj)
            elif effect_type == 'neon':
                return lightingEffects.lighting_effects.add_neon_effect(obj)
            elif effect_type == 'flash':
                return lightingEffects.lighting_effects.add_flash_effect(obj)
            elif effect_type == 'glow_light':
                return lightingEffects.lighting_effects.add_glow_effect(obj)
            
            # Efectos de materiales
            elif effect_type == 'glass':
                materialEffects.material_effects.add_glass_effect(obj)
                return True
            elif effect_type == 'metal':
                materialEffects.material_effects.add_metal_effect(obj)
                return True
            elif effect_type == 'hologram':
                materialEffects.material_effects.add_hologram_effect(obj)
                return True
            elif effect_type == 'emission':
                materialEffects.material_effects.add_emission_effect(obj)
                return True
            elif effect_type == 'dissolve':
                materialEffects.material_effects.add_dissolve_effect(obj)
                return True
            
            # Efectos de cámara
            elif effect_type == 'camera_dolly':
                cameraEffects.camera_effects.add_camera_dolly_effect(obj)
                return True
            elif effect_type == 'camera_zoom':
                cameraEffects.camera_effects.add_camera_zoom_effect(obj)
                return True
            elif effect_type == 'depth_of_field':
                cameraEffects.camera_effects.add_depth_of_field_effect(obj)
                return True
            elif effect_type == 'camera_focus_pull':
                cameraEffects.camera_effects.add_camera_focus_pull_effect(obj)
                return True
            elif effect_type == 'camera_follow':
                target = self.get_follow_target(context)
                if target:
                    cameraEffects.camera_effects.add_camera_follow_effect(obj, target)
                    return True
                return False
            
            # Efectos de simulación
            elif effect_type == 'cloth':
                return simulationEffects.simulation_effects.add_cloth_effect(obj)
            elif effect_type == 'fluid':
                return simulationEffects.simulation_effects.add_fluid_effect(obj)
            elif effect_type == 'rigid_body':
                return simulationEffects.simulation_effects.add_rigid_body_effect(obj)
            elif effect_type == 'soft_body':
                return simulationEffects.simulation_effects.add_soft_body_effect(obj)
            elif effect_type == 'ocean':
                return simulationEffects.simulation_effects.add_ocean_effect(obj)
            
            # Efectos visuales adicionales
            elif effect_type == 'glow':
                return lightingEffects.lighting_effects.add_glow_effect(obj)
            elif effect_type == 'glitch':
                return self.add_glitch_effect(obj)
            elif effect_type == 'bloom':
                return lightingEffects.lighting_effects.add_bloom_effect(obj)
            
            # Utilidades
            elif effect_type == 'slow_motion':
                return self.add_slow_motion_effect(context)
            elif effect_type == 'fast_forward':
                return self.add_fast_forward_effect(context)
            elif effect_type == 'freeze_frame':
                return self.add_freeze_frame_effect(context)
            elif effect_type == 'reverse':
                return self.add_reverse_effect(context)
            
            else:
                print(f"Unknown effect type: {effect_type}")
                return False
                
        except Exception as e:
            print(f"Error in apply_effect: {e}")
            return False
    
    def get_follow_target(self, context):
        """Obtiene un objeto target para efectos de seguimiento"""
        selected = [obj for obj in context.selected_objects if obj != context.active_object]
        return selected[0] if selected else None
    
    def add_glitch_effect(self, obj):
        """Efecto de interferencia/glitch"""
        try:
            if hasattr(obj, 'location'):
                current_frame = bpy.context.scene.frame_current
                original_loc = obj.location.copy()
                
                # Crear keyframes de vibración
                for i in range(10):
                    frame = current_frame + i * 2
                    offset = (
                        (random.random() - 0.5) * 0.1,
                        (random.random() - 0.5) * 0.1,
                        (random.random() - 0.5) * 0.1
                    )
                    obj.location = original_loc + mathutils.Vector(offset)
                    obj.keyframe_insert(data_path="location", frame=frame)
                
                obj.location = original_loc
                obj.keyframe_insert(data_path="location", frame=current_frame + 20)
                return True
        except Exception as e:
            print(f"Error in glitch effect: {e}")
            return False
    
    def add_slow_motion_effect(self, context):
        """Efecto de cámara lenta"""
        try:
            scene = context.scene
            scene.frame_step = 2
            return True
        except:
            return False
    
    def add_fast_forward_effect(self, context):
        """Efecto de aceleración"""
        try:
            scene = context.scene
            scene.frame_step = 0.5
            return True
        except:
            return False
    
    def add_freeze_frame_effect(self, context):
        """Efecto de congelación"""
        try:
            bpy.ops.screen.frame_jump(end=False)
            return True
        except:
            return False
    
    def add_reverse_effect(self, context):
        """Efecto de reproducción inversa"""
        try:
            scene = context.scene
            start = scene.frame_start
            end = scene.frame_end
            scene.frame_start = end
            scene.frame_end = start
            return True
        except:
            return False

class MOTIONFX_OT_apply_all_showcase(bpy.types.Operator):
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
            # Aplicar múltiples efectos
            effects_to_apply = ['bounce', 'glow', 'rotation']
            
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
    print("MotionFX: Main effects operator registered")

def unregister():
    bpy.utils.unregister_class(MOTIONFX_OT_apply_all_showcase)
    bpy.utils.unregister_class(MOTIONFX_OT_apply_effect)
    print("MotionFX: Main effects operator unregistered")
