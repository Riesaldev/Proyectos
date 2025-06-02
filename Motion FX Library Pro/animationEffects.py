import bpy
import mathutils

class AnimationEffects:
    def add_bounce_effect(self, obj):
        try:
            if not obj or not hasattr(obj, 'location'):
                print("Object invalid for bounce effect")
                return
                
            current_frame = bpy.context.scene.frame_current
            
            # Guardar posición original
            original_z = obj.location.z
            
            obj.location.z = original_z
            obj.keyframe_insert(data_path="location", frame=current_frame)
            
            obj.location.z = original_z + 2
            obj.keyframe_insert(data_path="location", frame=current_frame + 10)
            
            obj.location.z = original_z
            obj.keyframe_insert(data_path="location", frame=current_frame + 20)
            
            # Aplicar interpolación suave
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if "location" in fcurve.data_path:
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'BEZIER'
                            keyframe.handle_left_type = 'AUTO'
                            keyframe.handle_right_type = 'AUTO'
            
            print(f"Bounce effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding bounce effect: {e}")

    def add_fade_effect(self, obj):
        try:
            if not obj or not hasattr(obj, 'data') or not hasattr(obj.data, 'materials'):
                print("Object invalid for fade effect")
                return
                
            # Asegurar que el objeto tenga material
            if not obj.data.materials:
                mat = bpy.data.materials.new(name=f"Fade_Material_{obj.name}")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.data.materials[0]
                if not mat.use_nodes:
                    mat.use_nodes = True
            
            mat.blend_method = 'BLEND'
            mat.use_backface_culling = False
            
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            
            # Limpiar nodos existentes excepto el output
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear nodos necesarios
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Conectar nodos
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
            
            current_frame = bpy.context.scene.frame_current
            
            # Animar alpha
            principled.inputs["Alpha"].default_value = 1.0
            principled.inputs["Alpha"].keyframe_insert(data_path="default_value", frame=current_frame)
            
            principled.inputs["Alpha"].default_value = 0.0
            principled.inputs["Alpha"].keyframe_insert(data_path="default_value", frame=current_frame + 30)
            
            print(f"Fade effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fade effect: {e}")

    def add_scale_effect(self, obj):
        try:
            if not obj or not hasattr(obj, 'scale'):
                print("Object invalid for scale effect")
                return
                
            current_frame = bpy.context.scene.frame_current
            
            # Guardar escala original
            original_scale = obj.scale.copy()
            
            obj.scale = original_scale
            obj.keyframe_insert(data_path="scale", frame=current_frame)
            
            obj.scale = (original_scale.x * 1.5, original_scale.y * 1.5, original_scale.z * 1.5)
            obj.keyframe_insert(data_path="scale", frame=current_frame + 15)
            
            obj.scale = original_scale
            obj.keyframe_insert(data_path="scale", frame=current_frame + 30)
            
            # Aplicar interpolación suave
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if "scale" in fcurve.data_path:
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'BEZIER'
            
            print(f"Scale effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding scale effect: {e}")

    def add_rotation_effect(self, obj):
        try:
            if not obj or not hasattr(obj, 'rotation_euler'):
                print("Object invalid for rotation effect")
                return
                
            current_frame = bpy.context.scene.frame_current
            
            # Guardar rotación original
            original_rotation = obj.rotation_euler.copy()
            
            obj.rotation_euler = original_rotation
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame)
            
            obj.rotation_euler.z = original_rotation.z + 6.28319  # Una vuelta completa
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame + 60)
            
            # Aplicar interpolación linear para rotación suave
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if "rotation_euler" in fcurve.data_path and fcurve.array_index == 2:  # Solo eje Z
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'LINEAR'
            
            print(f"Rotation effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding rotation effect: {e}")

    def add_wave_effect(self, obj):
        try:
            if not obj or obj.type != 'MESH':
                print("Wave effect only works on mesh objects")
                return
            
            # Asegurar que el objeto esté activo
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Verificar si ya tiene modificador wave
            wave_modifier = None
            for mod in obj.modifiers:
                if mod.type == 'WAVE':
                    wave_modifier = mod
                    break
            
            if not wave_modifier:
                bpy.ops.object.modifier_add(type='WAVE')
                wave_modifier = obj.modifiers[-1]
            
            # Configurar el modificador
            wave_modifier.use_z = True
            wave_modifier.height = 0.5
            wave_modifier.width = 1.5
            wave_modifier.speed = 1.0
            wave_modifier.start_position_object = obj
            
            # Animar el offset para crear movimiento
            current_frame = bpy.context.scene.frame_current
            wave_modifier.offset = 0
            wave_modifier.keyframe_insert(data_path="offset", frame=current_frame)
            wave_modifier.offset = 6.28
            wave_modifier.keyframe_insert(data_path="offset", frame=current_frame + 60)
            
            print(f"Wave effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding wave effect: {e}")

    def add_follow_object_effect(self, obj):
        try:
            if not obj:
                print("No valid object for follow effect")
                return
                
            # Buscar objeto objetivo
            target = None
            for selected_obj in bpy.context.selected_objects:
                if selected_obj != obj and selected_obj.type in ['MESH', 'CAMERA', 'LIGHT', 'EMPTY']:
                    target = selected_obj
                    break
            
            if not target:
                # Crear un Empty como objetivo si no hay ninguno
                bpy.ops.object.empty_add(location=(obj.location.x + 3, obj.location.y, obj.location.z))
                target = bpy.context.active_object
                target.name = f"Target_for_{obj.name}"
                print(f"Created target object: {target.name}")
            
            # Verificar si ya tiene constraint
            existing_constraint = None
            for constraint in obj.constraints:
                if constraint.type == 'TRACK_TO' and constraint.target == target:
                    existing_constraint = constraint
                    break
            
            if not existing_constraint:
                constraint = obj.constraints.new(type='TRACK_TO')
                constraint.target = target
                constraint.track_axis = 'TRACK_NEGATIVE_Z'
                constraint.up_axis = 'UP_Y'
            
            print(f"Follow object effect added to {obj.name} -> {target.name}")
            
        except Exception as e:
            print(f"Error adding follow object effect: {e}")

    def add_follow_path_effect(self, obj):
        try:
            if not obj:
                print("No valid object for path effect")
                return
                
            # Buscar curva existente
            curve = None
            for selected_obj in bpy.context.selected_objects:
                if selected_obj.type == 'CURVE':
                    curve = selected_obj
                    break
            
            if not curve:
                # Crear una curva si no existe
                bpy.ops.curve.primitive_bezier_curve_add(location=(0, 0, 0))
                curve = bpy.context.active_object
                curve.name = f"Path_for_{obj.name}"
                
                # Modificar la curva para que sea más interesante
                if curve.data.splines:
                    spline = curve.data.splines[0]
                    if len(spline.bezier_points) >= 2:
                        spline.bezier_points[0].co = (0, 0, 0)
                        spline.bezier_points[1].co = (5, 5, 2)
                print(f"Created path curve: {curve.name}")
            
            # Verificar si ya tiene constraint
            existing_constraint = None
            for constraint in obj.constraints:
                if constraint.type == 'FOLLOW_PATH' and constraint.target == curve:
                    existing_constraint = constraint
                    break
            
            if not existing_constraint:
                constraint = obj.constraints.new(type='FOLLOW_PATH')
                constraint.target = curve
                constraint.use_curve_follow = True
                
                # Animar el offset para movimiento a lo largo del path
                current_frame = bpy.context.scene.frame_current
                constraint.offset = 0
                constraint.keyframe_insert(data_path="offset", frame=current_frame)
                constraint.offset = 100
                constraint.keyframe_insert(data_path="offset", frame=current_frame + 120)
            
            print(f"Follow path effect added to {obj.name} -> {curve.name}")
            
        except Exception as e:
            print(f"Error adding follow path effect: {e}")

animation_effects = AnimationEffects()

def register():
    print("MotionFX: Animation effects module loaded")

def unregister():
    print("MotionFX: Animation effects module unloaded")