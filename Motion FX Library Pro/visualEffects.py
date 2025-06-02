import bpy
import random
import mathutils

class VisualEffects:
    def add_glow_effect(self, obj):
        """Añade efecto de resplandor visual"""
        try:
            # Delegar al efecto de lighting
            from .lightingEffects import lighting_effects
            return lighting_effects.add_glowing_effect(obj)
        except Exception as e:
            print(f"Error adding glow effect: {e}")
            return False
    
    def add_glitch_effect(self, obj):
        """Añade efecto de interferencia digital"""
        try:
            if not obj or not hasattr(obj, 'location'):
                return False
                
            current_frame = bpy.context.scene.frame_current
            original_loc = obj.location.copy()
            
            # Crear keyframes de vibración
            for i in range(10):
                frame = current_frame + i * 2
                offset = mathutils.Vector((
                    (random.random() - 0.5) * 0.1,
                    (random.random() - 0.5) * 0.1,
                    (random.random() - 0.5) * 0.1
                ))
                obj.location = original_loc + offset
                obj.keyframe_insert(data_path="location", frame=frame)
            
            obj.location = original_loc
            obj.keyframe_insert(data_path="location", frame=current_frame + 20)
            
            print(f"Glitch effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding glitch effect: {e}")
            return False
    
    def add_bloom_effect_compositor(self, obj):
        """Añade efecto bloom usando compositor"""
        try:
            # Delegar al efecto de lighting
            from .lightingEffects import lighting_effects
            return lighting_effects.add_bloom_effect(obj)
        except Exception as e:
            print(f"Error adding bloom effect: {e}")
            return False

# Crear instancia global
visual_effects = VisualEffects()

def register():
    print("MotionFX: Visual effects module loaded")

def unregister():
    print("MotionFX: Visual effects module unloaded")