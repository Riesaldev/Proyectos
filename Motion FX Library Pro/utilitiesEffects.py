import bpy

class UtilitiesEffects:
    def add_slow_motion_effect(self, context):
        """Añade efecto de cámara lenta"""
        try:
            scene = context.scene
            original_step = scene.frame_step
            
            # Configurar paso de frame para slow motion
            scene.frame_step = 2
            
            # Opcionalmente ajustar la velocidad de reproducción
            if hasattr(scene.render, 'fps'):
                original_fps = scene.render.fps
                scene.render.fps = max(12, original_fps // 2)
            
            print("Slow motion effect applied to scene")
            return True
            
        except Exception as e:
            print(f"Error adding slow motion effect: {e}")
            return False

    def add_fast_forward_effect(self, context):
        """Añade efecto de aceleración"""
        try:
            scene = context.scene
            
            # Configurar paso de frame para fast forward
            scene.frame_step = 0.5
            
            # Ajustar FPS para acelerar
            if hasattr(scene.render, 'fps'):
                original_fps = scene.render.fps
                scene.render.fps = min(60, original_fps * 2)
            
            print("Fast forward effect applied to scene")
            return True
            
        except Exception as e:
            print(f"Error adding fast forward effect: {e}")
            return False

    def add_freeze_frame_effect(self, context):
        """Añade efecto de congelación de frame"""
        try:
            scene = context.scene
            current_frame = scene.frame_current
            
            # Congelar en el frame actual
            scene.frame_start = current_frame
            scene.frame_end = current_frame
            
            print(f"Freeze frame effect applied at frame {current_frame}")
            return True
            
        except Exception as e:
            print(f"Error adding freeze frame effect: {e}")
            return False

    def add_reverse_effect(self, context):
        """Añade efecto de reproducción inversa"""
        try:
            scene = context.scene
            start_frame = scene.frame_start
            end_frame = scene.frame_end
            
            # Intercambiar frames de inicio y fin
            scene.frame_start = end_frame
            scene.frame_end = start_frame
            scene.frame_current = end_frame
            
            print("Reverse playback effect applied")
            return True
            
        except Exception as e:
            print(f"Error adding reverse effect: {e}")
            return False

    def add_time_remap_effect(self, obj, remap_type='EASE_IN_OUT'):
        """Añade efecto de remapeo temporal a las animaciones del objeto"""
        try:
            if not obj or not obj.animation_data or not obj.animation_data.action:
                print("Object has no animation data for time remapping")
                return False
            
            action = obj.animation_data.action
            
            for fcurve in action.fcurves:
                for keyframe in fcurve.keyframe_points:
                    if remap_type == 'EASE_IN_OUT':
                        keyframe.interpolation = 'BEZIER'
                        keyframe.handle_left_type = 'AUTO'
                        keyframe.handle_right_type = 'AUTO'
                    elif remap_type == 'LINEAR':
                        keyframe.interpolation = 'LINEAR'
                    elif remap_type == 'CONSTANT':
                        keyframe.interpolation = 'CONSTANT'
                    elif remap_type == 'BOUNCE':
                        keyframe.interpolation = 'BOUNCE'
                    elif remap_type == 'ELASTIC':
                        keyframe.interpolation = 'ELASTIC'
            
            print(f"Time remap ({remap_type}) applied to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding time remap effect: {e}")
            return False

    def add_frame_blending_effect(self, context, blend_factor=0.5):
        """Añade efecto de mezcla de frames para motion blur"""
        try:
            scene = context.scene
            
            # Habilitar motion blur si está disponible
            if hasattr(scene.render, 'use_motion_blur'):
                scene.render.use_motion_blur = True
                scene.render.motion_blur_shutter = blend_factor
            
            # Para EEVEE
            if scene.render.engine == 'BLENDER_EEVEE':
                scene.eevee.use_motion_blur = True
                scene.eevee.motion_blur_shutter = blend_factor
                scene.eevee.motion_blur_samples = 16
            
            print(f"Frame blending effect applied with factor {blend_factor}")
            return True
            
        except Exception as e:
            print(f"Error adding frame blending effect: {e}")
            return False

    def add_scene_scale_effect(self, scale_factor=2.0):
        """Escala toda la escena uniformemente"""
        try:
            # Seleccionar todos los objetos
            bpy.ops.object.select_all(action='SELECT')
            
            # Aplicar escala
            bpy.ops.transform.resize(value=(scale_factor, scale_factor, scale_factor))
            
            print(f"Scene scaled by factor {scale_factor}")
            return True
            
        except Exception as e:
            print(f"Error adding scene scale effect: {e}")
            return False

    def add_object_multiplier_effect(self, obj, count=5, offset=(2, 0, 0)):
        """Multiplica un objeto en el espacio"""
        try:
            if not obj:
                return False
            
            # Crear copias del objeto
            created_objects = []
            
            for i in range(1, count):
                # Duplicar objeto
                bpy.context.view_layer.objects.active = obj
                bpy.ops.object.duplicate()
                
                duplicate = bpy.context.active_object
                duplicate.name = f"{obj.name}_copy_{i}"
                
                # Posicionar copia
                duplicate.location = (
                    obj.location.x + offset[0] * i,
                    obj.location.y + offset[1] * i,
                    obj.location.z + offset[2] * i
                )
                
                created_objects.append(duplicate)
            
            print(f"Object multiplier created {len(created_objects)} copies of {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding object multiplier effect: {e}")
            return False

    def add_batch_transform_effect(self, objects_list, transform_type='RANDOM_POSITION'):
        """Aplica transformaciones en lote a múltiples objetos"""
        try:
            import random
            
            if not objects_list:
                return False
            
            for obj in objects_list:
                if not obj:
                    continue
                
                if transform_type == 'RANDOM_POSITION':
                    offset = (
                        (random.random() - 0.5) * 4,
                        (random.random() - 0.5) * 4,
                        (random.random() - 0.5) * 4
                    )
                    obj.location = (
                        obj.location.x + offset[0],
                        obj.location.y + offset[1],
                        obj.location.z + offset[2]
                    )
                
                elif transform_type == 'RANDOM_ROTATION':
                    obj.rotation_euler = (
                        random.random() * 6.28,
                        random.random() * 6.28,
                        random.random() * 6.28
                    )
                
                elif transform_type == 'RANDOM_SCALE':
                    scale = random.uniform(0.5, 2.0)
                    obj.scale = (scale, scale, scale)
            
            print(f"Batch transform ({transform_type}) applied to {len(objects_list)} objects")
            return True
            
        except Exception as e:
            print(f"Error adding batch transform effect: {e}")
            return False

utilities_effects = UtilitiesEffects()

def register():
    print("MotionFX: Utilities effects module loaded")

def unregister():
    print("MotionFX: Utilities effects module unloaded")