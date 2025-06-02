import bpy

class EffectsOperations:
    _effect_map = {}
    _initialized = False
    
    @classmethod
    def initialize_effect_map(cls):
        if cls._initialized:
            return
        
        cls._effect_map = {}
        
        try:
            from . import animationEffects
            cls._add_animation_effects(animationEffects.animation_effects)
        except ImportError as e:
            print(f"MotionFX: Could not load animationEffects: {e}")
        
        try:
            from . import cameraEffects  
            cls._add_camera_effects(cameraEffects.camera_effects)
        except ImportError as e:
            print(f"MotionFX: Could not load cameraEffects: {e}")
            
        try:
            from . import particlesEffects
            cls._add_particle_effects(particlesEffects.particle_effects)
        except ImportError as e:
            print(f"MotionFX: Could not load particlesEffects: {e}")
            
        try:
            from . import materialEffects
            cls._add_material_effects(materialEffects.material_effects)
        except ImportError as e:
            print(f"MotionFX: Could not load materialEffects: {e}")
            
        try:
            from . import lightingEffects
            cls._add_lighting_effects(lightingEffects.lighting_effects)
        except ImportError as e:
            print(f"MotionFX: Could not load lightingEffects: {e}")
            
        try:
            from . import simulationEffects
            cls._add_simulation_effects(simulationEffects.simulation_effects)
        except ImportError as e:
            print(f"MotionFX: Could not load simulationEffects: {e}")
            
        try:
            from . import utilitiesEffects
            cls._add_utilities_effects(utilitiesEffects.utilities_effects)
        except ImportError as e:
            print(f"MotionFX: Could not load utilitiesEffects: {e}")
            
        try:
            from . import visualEffects
            cls._add_visual_effects(visualEffects.visual_effects)
        except ImportError as e:
            print(f"MotionFX: Could not load visualEffects: {e}")
        
        if not cls._effect_map:
            cls._add_basic_effects()
        
        cls._initialized = True
        print(f"MotionFX: {len(cls._effect_map)} effects loaded successfully")
    
    @classmethod
    def _add_animation_effects(cls, animation_effects):
        cls._effect_map.update({
            'bounce': animation_effects.add_bounce_effect,
            'fade': animation_effects.add_fade_effect,
            'scale': animation_effects.add_scale_effect,
            'rotation': animation_effects.add_rotation_effect,
            'wave': animation_effects.add_wave_effect,
            'follow_object': animation_effects.add_follow_object_effect,
            'follow_path': animation_effects.add_follow_path_effect,
        })
    
    @classmethod
    def _add_camera_effects(cls, camera_effects):
        cls._effect_map.update({
            'camera_dolly': camera_effects.add_camera_dolly_effect,
            'camera_zoom': camera_effects.add_camera_zoom_effect,
            'camera_focus_pull': camera_effects.add_camera_focus_pull_effect,
            'depth_of_field': camera_effects.add_depth_of_field_effect,
            'lens_distortion': camera_effects.add_lens_distortion_camera_effect,
            'camera_follow': camera_effects.add_camera_follow_effect,
            'camera_tracking': camera_effects.add_camera_tracking_effect,
        })
        
    @classmethod
    def _add_particle_effects(cls, particle_effects):
        cls._effect_map.update({
            'fire': particle_effects.add_fire_effect,
            'smoke': particle_effects.add_smoke_effect,
            'explosion': particle_effects.add_explosion_effect,
            'sparks': particle_effects.add_sparks_effect,
            'blood': particle_effects.add_blood_effect,
        })
        
    @classmethod
    def _add_material_effects(cls, material_effects):
        cls._effect_map.update({
            'dissolve': material_effects.add_dissolve_effect,
            'hologram': material_effects.add_hologram_effect,
            'glass': material_effects.add_glass_effect,
            'metal': material_effects.add_metal_effect,
            'emission': material_effects.add_emission_effect,
            'fabric': material_effects.add_fabric_effect,
        })
        
    @classmethod
    def _add_lighting_effects(cls, lighting_effects):
        cls._effect_map.update({
            'fireworks_light': lighting_effects.add_fireworks_light_effect,
            'flash': lighting_effects.add_flash_effect,
            'glow_light': lighting_effects.add_glowing_effect,
            'global_illumination': lighting_effects.add_global_illumination_effect,
            'lens_flare_light': lighting_effects.add_lens_flare_light_effect,
            'neon': lighting_effects.add_neon_effect,
            'ray_tracing': lighting_effects.add_ray_tracing_effect,
            'shadows': lighting_effects.add_shadows_effect,
            'spotlight': lighting_effects.add_spotlight_effect,
            'volumetric': lighting_effects.add_volumetric_effect,
        })
        
    @classmethod
    def _add_simulation_effects(cls, simulation_effects):
        cls._effect_map.update({
            'cloth': simulation_effects.add_cloth_effect,
            'fluid': simulation_effects.add_fluid_effect,
            'rigid_body': simulation_effects.add_rigid_body_effect,
            'soft_body': simulation_effects.add_soft_body_effect,
            'ocean': simulation_effects.add_ocean_effect,
        })
        
    @classmethod
    def _add_utilities_effects(cls, utilities_effects):
        cls._effect_map.update({
            'slow_motion': utilities_effects.add_slow_motion_effect,
            'fast_forward': utilities_effects.add_fast_forward_effect,
            'freeze_frame': utilities_effects.add_freeze_frame_effect,
            'reverse': utilities_effects.add_reverse_effect,
        })
        
    @classmethod
    def _add_visual_effects(cls, visual_effects):
        cls._effect_map.update({
            'glow': visual_effects.add_glow_effect,
            'glitch': visual_effects.add_glitch_effect,
            'bloom': visual_effects.add_bloom_effect_compositor,
        })
    
    @classmethod
    def _add_basic_effects(cls):
        def basic_bounce(obj):
            try:
                current_frame = bpy.context.scene.frame_current
                obj.location.z = 0
                obj.keyframe_insert(data_path="location", frame=current_frame)
                obj.location.z = 2
                obj.keyframe_insert(data_path="location", frame=current_frame + 10)
                obj.location.z = 0
                obj.keyframe_insert(data_path="location", frame=current_frame + 20)
            except Exception as e:
                print(f"Error in basic bounce effect: {e}")
        
        def basic_rotation(obj):
            try:
                current_frame = bpy.context.scene.frame_current
                obj.rotation_euler.z = 0
                obj.keyframe_insert(data_path="rotation_euler", frame=current_frame)
                obj.rotation_euler.z = 6.28319
                obj.keyframe_insert(data_path="rotation_euler", frame=current_frame + 60)
            except Exception as e:
                print(f"Error in basic rotation effect: {e}")
        
        cls._effect_map = {
            'bounce': basic_bounce,
            'rotation': basic_rotation,
        }
    
    @classmethod
    def get_effect_items(cls):
        if not cls._initialized:
            cls.initialize_effect_map()
        
        if not cls._effect_map:
            return [("NONE", "No Effects Available", "Error loading effects")]
        
        items = []
        for effect_id, effect_func in cls._effect_map.items():
            display_name = effect_id.replace('_', ' ').title()
            items.append((effect_id, display_name, f"Apply {display_name} effect"))
        
        return sorted(items)
    
    @classmethod
    def apply_effect(cls, effect_id, obj):
        if not cls._initialized:
            cls.initialize_effect_map()
        
        if not cls._effect_map:
            print("MotionFX: Effect map not initialized")
            return False
        
        if effect_id not in cls._effect_map:
            print(f"MotionFX: Effect '{effect_id}' not found in effect map")
            available_effects = list(cls._effect_map.keys())
            print(f"MotionFX: Available effects: {available_effects}")
            return False
        
        if not obj:
            print("MotionFX: No valid object")
            return False
        
        try:
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            if hasattr(bpy.context.scene, 'motionfx_settings'):
                settings = bpy.context.scene.motionfx_settings
                if settings.auto_keyframe:
                    bpy.context.scene.tool_settings.use_keyframe_insert_auto = True
            
            effect_func = cls._effect_map[effect_id]
            effect_func(obj)
            
            obj['motionfx_last_effect'] = effect_id
            obj['motionfx_effect_applied'] = True
            
            bpy.context.view_layer.update()
            
            print(f"MotionFX: Effect '{effect_id}' applied to '{obj.name}'")
            return True
        except Exception as e:
            print(f"MotionFX: Error applying effect '{effect_id}': {e}")
            import traceback
            traceback.print_exc()
            return False

def register():
    print("MotionFX: Effects operations module loaded")

def unregister():
    print("MotionFX: Effects operations module unloaded")