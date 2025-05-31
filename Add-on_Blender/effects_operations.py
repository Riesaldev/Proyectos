import bpy
import random

# CORREGIR ESTOS IMPORTS:
from .animationEffects import AnimationEffects  # era animationEfects
from .visualEffects import VisualEffects
from .materialEffects import MaterialEffects
from .lightingEffects import LightingEffects 
from .cameraEffects import CameraEffects 
from .utilitiesEffects import UtilitiesEffects
from .simulationEffects import SimulationEffects
from .particlesEffects import ParticleEffects  # era ParticleEffect

class EffectsOperations:
    animation = AnimationEffects()
    visual = VisualEffects()
    material = MaterialEffects()
    lighting = LightingEffects()
    camera = CameraEffects()
    utilities = UtilitiesEffects()
    simulation = SimulationEffects()
    particles = ParticleEffects()  # Corregido

    _effect_map = {}  # Añadir underscore para indicar privado

    @classmethod
    def initialize_effect_map(cls):
        if cls._effect_map:  # Evitar reinicialización
            return
            
        cls._effect_map = {
            # Animation Effects
            "bounce": cls.animation.add_bounce_effect,
            "fade": cls.animation.add_fade_effect,
            "scale": cls.animation.add_scale_effect,
            "rotation": cls.animation.add_rotation_effect,
            "wave": cls.animation.add_wave_effect,
            "follow_path": cls.animation.add_follow_path_effect,
            "follow_object": cls.animation.add_follow_object_effect,
            
            # Visual Effects
            "glow": cls.visual.add_glow_effect,
            "glitch": cls.visual.add_glitch_effect,
            "hologram": cls.visual.add_hologram_effect,
            "bloom": cls.visual.add_bloom_effect_compositor,
            "vignette": cls.visual.add_vignette_effect_compositor,
            "lens_distortion": cls.visual.add_lens_distortion_effect_compositor,
            
            # Material Effects
            "dissolve": cls.material.add_dissolve_effect,
            "glass": cls.material.add_glass_effect,
            "metal": cls.material.add_metal_effect,
            "emission": cls.material.add_emission_effect,
            "fabric": cls.material.add_fabric_effect,
            
            # Lighting Effects
            "fireworks_light": cls.lighting.add_fireworks_light_effect,
            "flash": cls.lighting.add_flash_effect,
            "glowing": cls.lighting.add_glowing_effect,
            "global_illumination": cls.lighting.add_global_illumination_effect,
            "lens_flare_light": cls.lighting.add_lens_flare_light_effect,
            "neon": cls.lighting.add_neon_effect,
            "ray_tracing": cls.lighting.add_ray_tracing_effect,
            "shadows": cls.lighting.add_shadows_effect,
            "spotlight": cls.lighting.add_spotlight_effect,
            "volumetric": cls.lighting.add_volumetric_effect,
            
            # Camera Effects
            "camera_dolly": cls.camera.add_camera_dolly_effect,
            "camera_focus_pull": cls.camera.add_camera_focus_pull_effect,
            "camera_follow": cls.camera.add_camera_follow_effect,
            "camera_tracking": cls.camera.add_camera_tracking_effect,
            "camera_zoom": cls.camera.add_camera_zoom_effect,
            "depth_of_field": cls.camera.add_depth_of_field_effect,
            "focus": cls.camera.add_focus_effect,
            "lens_distortion_camera": cls.camera.add_lens_distortion_camera_effect,
            "path": cls.camera.add_path_effect,
            "track": cls.camera.add_track_effect,
            
            # Utility Effects
            "cinematic": cls.utilities.add_cinematic_effect,
            "fast_forward": cls.utilities.add_fast_forward_effect,
            "freeze_frame": cls.utilities.add_freeze_frame_effect,
            "reverse": cls.utilities.add_reverse_effect,
            "slow_motion": cls.utilities.add_slow_motion_effect,
            "time_warp": cls.utilities.add_time_warp_effect,
            "scale_oscillation": cls.utilities.add_scale_oscillation_effect,
            "rotation_oscillation": cls.utilities.add_rotation_oscillation_effect,
            "position_shake": cls.utilities.add_position_shake_effect,
            
            # Simulation Effects
            "cloth": cls.simulation.add_cloth_effect,
            "fluid": cls.simulation.add_fluid_effect,
            "rigid_body": cls.simulation.add_rigid_body_effect,
            "soft_body": cls.simulation.add_soft_body_effect,
            "ocean": cls.simulation.add_ocean_effect,
            
            # Particle Effects
            "fire": cls.particles.add_fire_effect,
            "smoke": cls.particles.add_smoke_effect,
            "explosion": cls.particles.add_explosion_effect,
            "sparks": cls.particles.add_sparks_effect,
            "blood": cls.particles.add_blood_effect,
        }

    @classmethod
    def get_effect_items(cls):
        """Devuelve items para EnumProperty"""
        if not cls._effect_map:
            cls.initialize_effect_map()
        
        items = []
        for effect_id, effect_func in cls._effect_map.items():
            # Crear nombre legible
            display_name = effect_id.replace("_", " ").title()
            items.append((effect_id, display_name, f"Apply {display_name} effect"))
        
        return sorted(items, key=lambda x: x[1])

    @classmethod
    def apply_effect(cls, effect_type, obj):
        """Aplica el efecto especificado al objeto"""
        if not cls._effect_map:
            cls.initialize_effect_map()
        
        if effect_type in cls._effect_map:
            try:
                cls._effect_map[effect_type](obj)
                return True
            except Exception as e:
                print(f"Error applying effect {effect_type}: {e}")
                return False
        else:
            print(f"Effect type '{effect_type}' not found")
            return False