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
            'time_remap': utilities_effects.add_time_remap_effect,
            'frame_blending': utilities_effects.add_frame_blending_effect,
            'scene_scale': utilities_effects.add_scene_scale_effect,
            'physics_time_scale': utilities_effects.add_physics_time_scale_effect,
            'glassmorphism': utilities_effects.add_glassmorphism_effect,
            'cyberpunk_glow': utilities_effects.add_cyberpunk_glow_effect,
            'holographic_distortion': utilities_effects.add_holographic_distortion_effect,
            'bio_organic_growth': utilities_effects.add_bio_organic_growth_effect,
            'nft_showcase': utilities_effects.add_nft_showcase_effect,
            'parametric_deformation': utilities_effects.add_parametric_deformation_effect,
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
            # Guardar objeto activo anterior
            previous_active = bpy.context.view_layer.objects.active
            previous_selected = [o for o in bpy.context.selected_objects]
            
            # Limpiar selección y configurar objeto
            bpy.ops.object.select_all(action='DESELECT')
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Validar objeto según tipo de efecto
            if not cls._validate_object_for_effect(effect_id, obj):
                # Restaurar selección anterior
                bpy.ops.object.select_all(action='DESELECT')
                if previous_active:
                    bpy.context.view_layer.objects.active = previous_active
                for o in previous_selected:
                    o.select_set(True)
                return False
            
            # Configurar auto-keyframe si está disponible
            if hasattr(bpy.context.scene, 'motionfx_settings'):
                settings = bpy.context.scene.motionfx_settings
                if hasattr(settings, 'auto_keyframe') and settings.auto_keyframe:
                    bpy.context.scene.tool_settings.use_keyframe_insert_auto = True
            
            # Aplicar el efecto
            effect_func = cls._effect_map[effect_id]
            effect_func(obj)
            
            # Marcar objeto con propiedades del efecto
            obj['motionfx_last_effect'] = effect_id
            obj['motionfx_effect_applied'] = True
            obj['motionfx_effect_frame'] = bpy.context.scene.frame_current
            
            # Actualizar vista
            bpy.context.view_layer.update()
            
            # Forzar actualización de viewport
            for area in bpy.context.screen.areas:
                if area.type == 'VIEW_3D':
                    area.tag_redraw()
            
            # Restaurar selección anterior pero mantener el objeto modificado seleccionado
            bpy.ops.object.select_all(action='DESELECT')
            obj.select_set(True)
            if previous_active and previous_active != obj:
                previous_active.select_set(True)
                bpy.context.view_layer.objects.active = previous_active
            else:
                bpy.context.view_layer.objects.active = obj
            
            print(f"MotionFX: Effect '{effect_id}' applied to '{obj.name}'")
            return True
            
        except Exception as e:
            print(f"MotionFX: Error applying effect '{effect_id}': {e}")
            import traceback
            traceback.print_exc()
            
            # Restaurar selección en caso de error
            try:
                bpy.ops.object.select_all(action='DESELECT')
                if previous_active:
                    bpy.context.view_layer.objects.active = previous_active
                for o in previous_selected:
                    if o and o.name in bpy.data.objects:
                        o.select_set(True)
            except:
                pass
            
            return False
    
    @classmethod
    def apply_utility_effect(cls, effect_id, context):
        """Aplicar efectos de utilidades que requieren contexto"""
        if not cls._initialized:
            cls.initialize_effect_map()
        
        try:
            from .utilitiesEffects import utilities_effects
            
            if effect_id == 'slow_motion':
                return utilities_effects.add_slow_motion_effect(context)
            elif effect_id == 'fast_forward':
                return utilities_effects.add_fast_forward_effect(context)
            elif effect_id == 'freeze_frame':
                return utilities_effects.add_freeze_frame_effect(context)
            elif effect_id == 'reverse':
                return utilities_effects.add_reverse_effect(context)
            elif effect_id == 'glassmorphism':
                return utilities_effects.add_glassmorphism_effect(context)
            elif effect_id == 'cyberpunk_glow':
                return utilities_effects.add_cyberpunk_glow_effect(context)
            elif effect_id == 'holographic_distortion':
                return utilities_effects.add_holographic_distortion_effect(context)
            elif effect_id == 'bio_organic_growth':
                return utilities_effects.add_bio_organic_growth_effect(context)
            elif effect_id == 'nft_showcase':
                return utilities_effects.add_nft_showcase_effect(context)
            elif effect_id == 'parametric_deformation':
                return utilities_effects.add_parametric_deformation_effect(context)
            elif effect_id == 'frame_blending':
                return utilities_effects.add_frame_blending_effect(context)
            elif effect_id == 'scene_scale':
                return utilities_effects.add_scene_scale_effect()
            elif effect_id == 'physics_time_scale':
                return utilities_effects.add_physics_time_scale_effect()
            elif effect_id == 'time_remap' and context.active_object:
                return utilities_effects.add_time_remap_effect(context.active_object, 'EASE_IN_OUT')
            else:
                print(f"Unknown utility effect: {effect_id}")
                return False
                
        except Exception as e:
            print(f"Error applying utility effect {effect_id}: {e}")
            return False
    
    @classmethod
    def _validate_object_for_effect(cls, effect_id, obj):
        """Validar si el objeto es compatible con el efecto"""
        try:
            # Verificar que el objeto existe en la escena
            if obj.name not in bpy.data.objects:
                print(f"Object {obj.name} not found in scene")
                return False
            
            # Validaciones específicas por tipo de efecto
            if effect_id in ['fire', 'smoke', 'cloth', 'wave', 'explosion', 'sparks', 'blood']:
                if obj.type != 'MESH':
                    print(f"Effect '{effect_id}' requires MESH object, got {obj.type}")
                    return False
            
            elif effect_id in ['camera_dolly', 'camera_zoom', 'depth_of_field', 'camera_focus_pull', 'camera_follow', 'camera_tracking']:
                if obj.type != 'CAMERA':
                    print(f"Effect '{effect_id}' requires CAMERA object, got {obj.type}")
                    return False
            
            elif effect_id in ['spotlight', 'flash', 'glow_light', 'volumetric', 'fireworks_light', 'lens_flare_light']:
                if obj.type not in ['LIGHT', 'MESH']:
                    print(f"Effect '{effect_id}' requires LIGHT or MESH object, got {obj.type}")
                    return False
            
            # Validaciones generales para objetos con transformaciones
            if effect_id in ['bounce', 'rotation', 'scale', 'fade', 'follow_object', 'follow_path']:
                if not hasattr(obj, 'location'):
                    print(f"Object {obj.name} has no location attribute")
                    return False
            
            # Validaciones para efectos de material
            if effect_id in ['glass', 'metal', 'hologram', 'dissolve', 'emission', 'neon']:
                if obj.type != 'MESH':
                    print(f"Material effect '{effect_id}' requires MESH object, got {obj.type}")
                    return False
            
            return True
            
        except Exception as e:
            print(f"Error validating object for effect {effect_id}: {e}")
            return False

def register():
    print("MotionFX: Effects operations module loaded")

def unregister():
    print("MotionFX: Effects operations module unloaded")