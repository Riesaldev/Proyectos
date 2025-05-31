import bpy

class UtilitiesEffects:

    def add_cinematic_effect(self, obj):
        """Añade efecto cinemático configurando la cámara"""
        try:
            scene = bpy.context.scene
            if not scene.camera:
                print("WARNING: No active camera found in scene. Creating one...")
                # Crear cámara si no existe
                bpy.ops.object.camera_add(location=(7, -7, 5))
                camera = bpy.context.active_object
                scene.camera = camera
            else:
                camera = scene.camera
            
            # Configurar propiedades cinemáticas
            camera.data.lens = 35  # Lente gran angular
            camera.data.dof.use_dof = True
            camera.data.dof.aperture_fstop = 2.8  # f-stop bajo para DOF
            camera.data.dof.focus_distance = 10.0
            
            # Configurar seguimiento del objeto
            if not any(c.type == 'TRACK_TO' for c in camera.constraints):
                constraint = camera.constraints.new(type='TRACK_TO')
                constraint.target = obj
                constraint.track_axis = 'TRACK_NEGATIVE_Z'
                constraint.up_axis = 'UP_Y'
            
            print(f"Cinematic effect applied with camera tracking {obj.name}")
            
        except Exception as e:
            print(f"Error adding cinematic effect: {e}")

    def add_fast_forward_effect(self, obj):
        """Acelera la animación del objeto"""
        try:
            if not obj.animation_data or not obj.animation_data.action:
                print("No animation data found on object")
                return
            
            action = obj.animation_data.action
            speed_factor = 2.0  # Duplicar velocidad
            
            for fcurve in action.fcurves:
                keyframe_points = fcurve.keyframe_points
                for keyframe in keyframe_points:
                    # Reducir el tiempo de cada keyframe para acelerar
                    keyframe.co[0] /= speed_factor
                    keyframe.handle_left[0] /= speed_factor
                    keyframe.handle_right[0] /= speed_factor
                
                # Importante: Actualizar la curva después de modificar
                fcurve.update()
            
            print(f"Fast forward effect applied to {obj.name} (speed x{speed_factor})")
            
        except Exception as e:
            print(f"Error adding fast forward effect: {e}")

    def add_freeze_frame_effect(self, obj):
        """Congela la animación en el frame actual"""
        try:
            if not obj.animation_data or not obj.animation_data.action:
                print("No animation data found on object")
                return
            
            current_frame = bpy.context.scene.frame_current
            action = obj.animation_data.action
            
            for fcurve in action.fcurves:
                # Evaluar el valor actual
                current_value = fcurve.evaluate(current_frame)
                
                # Limpiar keyframes existentes después del frame actual
                keyframes_to_remove = []
                for i, keyframe in enumerate(fcurve.keyframe_points):
                    if keyframe.co[0] > current_frame:
                        keyframes_to_remove.append(i)
                
                # Remover keyframes en orden inverso para mantener índices
                for i in reversed(keyframes_to_remove):
                    fcurve.keyframe_points.remove(fcurve.keyframe_points[i])
                
                # Añadir keyframe de congelación
                fcurve.keyframe_points.insert(current_frame + 1, current_value)
                fcurve.keyframe_points.insert(current_frame + 60, current_value)  # Mantener por 60 frames
                
                # Configurar interpolación constante
                for keyframe in fcurve.keyframe_points:
                    if keyframe.co[0] >= current_frame:
                        keyframe.interpolation = 'CONSTANT'
                
                # Actualizar la curva
                fcurve.update()
            
            print(f"Freeze frame effect applied to {obj.name} at frame {current_frame}")
            
        except Exception as e:
            print(f"Error adding freeze frame effect: {e}")

    def add_reverse_effect(self, obj):
        """Invierte la dirección de la animación"""
        try:
            if not obj.animation_data or not obj.animation_data.action:
                print("No animation data found on object")
                return
            
            action = obj.animation_data.action
            
            # Encontrar el rango de frames
            min_frame = float('inf')
            max_frame = float('-inf')
            
            for fcurve in action.fcurves:
                for keyframe in fcurve.keyframe_points:
                    min_frame = min(min_frame, keyframe.co[0])
                    max_frame = max(max_frame, keyframe.co[0])
            
            if min_frame == float('inf'):
                print("No keyframes found")
                return
            
            # Invertir cada curva
            for fcurve in action.fcurves:
                keyframe_data = []
                
                # Recopilar datos de keyframes
                for keyframe in fcurve.keyframe_points:
                    frame_time = keyframe.co[0]
                    value = keyframe.co[1]
                    interpolation = keyframe.interpolation
                    
                    # Calcular nuevo tiempo invertido
                    new_time = max_frame - (frame_time - min_frame)
                    keyframe_data.append((new_time, value, interpolation))
                
                # Limpiar keyframes existentes
                fcurve.keyframe_points.clear()
                
                # Añadir keyframes invertidos
                for new_time, value, interpolation in keyframe_data:
                    keyframe = fcurve.keyframe_points.insert(new_time, value)
                    keyframe.interpolation = interpolation
                
                # Actualizar la curva
                fcurve.update()
            
            print(f"Reverse effect applied to {obj.name}")
            
        except Exception as e:
            print(f"Error adding reverse effect: {e}")

    def add_slow_motion_effect(self, obj):
        """Ralentiza la animación del objeto"""
        try:
            if not obj.animation_data or not obj.animation_data.action:
                print("No animation data found on object")
                return
            
            action = obj.animation_data.action
            slow_factor = 0.5  # Reducir velocidad a la mitad
            
            for fcurve in action.fcurves:
                keyframe_points = fcurve.keyframe_points
                for keyframe in keyframe_points:
                    # Aumentar el tiempo de cada keyframe para ralentizar
                    keyframe.co[0] /= slow_factor
                    keyframe.handle_left[0] /= slow_factor
                    keyframe.handle_right[0] /= slow_factor
                
                # Actualizar la curva
                fcurve.update()
            
            print(f"Slow motion effect applied to {obj.name} (speed x{slow_factor})")
            
        except Exception as e:
            print(f"Error adding slow motion effect: {e}")

    def add_time_warp_effect(self, obj):
        """Añade un efecto de distorsión temporal variable"""
        try:
            if not obj.animation_data or not obj.animation_data.action:
                print("No animation data found on object")
                return
            
            action = obj.animation_data.action
            
            for fcurve in action.fcurves:
                keyframe_points = list(fcurve.keyframe_points)
                
                # Limpiar keyframes existentes
                fcurve.keyframe_points.clear()
                
                # Recrear con distorsión temporal
                for i, keyframe in enumerate(keyframe_points):
                    original_time = keyframe.co[0]
                    value = keyframe.co[1]
                    
                    # Aplicar función de distorsión temporal (sinusoidal)
                    import math
                    distortion = math.sin(original_time * 0.1) * 10  # Oscilación temporal
                    new_time = original_time + distortion
                    
                    # Asegurar que el tiempo no sea negativo
                    new_time = max(1, new_time)
                    
                    new_keyframe = fcurve.keyframe_points.insert(new_time, value)
                    new_keyframe.interpolation = keyframe.interpolation
                
                # Actualizar la curva
                fcurve.update()
            
            print(f"Time warp effect applied to {obj.name}")
            
        except Exception as e:
            print(f"Error adding time warp effect: {e}")

    def add_scale_oscillation_effect(self, obj):
        """Añade oscilación de escala con keyframes"""
        try:
            current_frame = bpy.context.scene.frame_current
            
            # Crear keyframes de oscilación
            frames = [current_frame, current_frame + 10, current_frame + 20, current_frame + 30]
            scales = [(1.0, 1.0, 1.0), (1.5, 1.5, 1.5), (1.0, 1.0, 1.0), (0.5, 0.5, 0.5)]
            
            for frame, scale in zip(frames, scales):
                obj.scale = scale
                obj.keyframe_insert(data_path="scale", frame=frame)
            
            # Configurar interpolación y actualizar curvas
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if fcurve.data_path == "scale":
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'BEZIER'
                        # Actualizar la curva
                        fcurve.update()
            
            print(f"Scale oscillation effect applied to {obj.name}")
            
        except Exception as e:
            print(f"Error adding scale oscillation effect: {e}")

    def add_rotation_oscillation_effect(self, obj):
        """Añade oscilación de rotación con keyframes"""
        try:
            import math
            current_frame = bpy.context.scene.frame_current
            
            # Crear keyframes de oscilación rotacional
            frames = [current_frame + i * 5 for i in range(8)]  # 8 keyframes cada 5 frames
            
            for i, frame in enumerate(frames):
                # Oscilación sinusoidal en el eje Z
                angle = math.sin(i * math.pi / 4) * math.radians(45)  # Oscila ±45 grados
                obj.rotation_euler[2] = angle
                obj.keyframe_insert(data_path="rotation_euler", index=2, frame=frame)
            
            # Configurar interpolación y actualizar curvas
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if fcurve.data_path == "rotation_euler" and fcurve.array_index == 2:
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'BEZIER'
                        # Actualizar la curva
                        fcurve.update()
            
            print(f"Rotation oscillation effect applied to {obj.name}")
            
        except Exception as e:
            print(f"Error adding rotation oscillation effect: {e}")

    def add_position_shake_effect(self, obj):
        """Añade efecto de temblor en la posición"""
        try:
            import random
            current_frame = bpy.context.scene.frame_current
            original_location = obj.location.copy()
            
            # Crear keyframes de temblor
            shake_intensity = 0.1
            shake_duration = 30  # frames
            
            for i in range(0, shake_duration, 2):  # Keyframe cada 2 frames
                frame = current_frame + i
                
                # Generar desplazamiento aleatorio
                shake_x = random.uniform(-shake_intensity, shake_intensity)
                shake_y = random.uniform(-shake_intensity, shake_intensity)
                shake_z = random.uniform(-shake_intensity * 0.5, shake_intensity * 0.5)  # Menos movimiento en Z
                
                obj.location = (
                    original_location[0] + shake_x,
                    original_location[1] + shake_y,
                    original_location[2] + shake_z
                )
                obj.keyframe_insert(data_path="location", frame=frame)
            
            # Volver a la posición original al final
            obj.location = original_location
            obj.keyframe_insert(data_path="location", frame=current_frame + shake_duration)
            
            # Configurar interpolación y actualizar curvas
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if fcurve.data_path == "location":
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'LINEAR'
                        # Actualizar la curva
                        fcurve.update()
            
            print(f"Position shake effect applied to {obj.name}")
            
        except Exception as e:
            print(f"Error adding position shake effect: {e}")

# Instancia singleton
utilities_effects = UtilitiesEffects()

def register():
    pass

def unregister():
    pass