import bpy

class AnimationEffects:
    def add_bounce_effect(self, obj):
        """Añade un efecto de rebote al objeto"""
        try:
            # Verificar que el objeto tiene animación
            if not obj.animation_data:
                obj.animation_data_create()
            
            # Configurar keyframes para el rebote
            obj.location[2] = 0
            obj.keyframe_insert(data_path="location", index=2, frame=1)
            
            obj.location[2] = 2
            obj.keyframe_insert(data_path="location", index=2, frame=10)
            
            obj.location[2] = 0
            obj.keyframe_insert(data_path="location", index=2, frame=20)
            
            # Configurar interpolación para que sea más rebotante
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if fcurve.data_path == "location" and fcurve.array_index == 2:
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'BOUNCE'
                        fcurve.update()
                        
        except Exception as e:
            print(f"Error adding bounce effect: {e}")

    def add_fade_effect(self, obj):
        """Añade un efecto de desvanecimiento al objeto"""
        try:
            # Crear material si no existe
            if not obj.data.materials:
                mat = bpy.data.materials.new(name=f"{obj.name}_fade_material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True
            
            # Verificar que existe el nodo Principled BSDF
            nodes = mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if not principled:
                principled = nodes.new(type='ShaderNodeBsdfPrincipled')
                # Conectar a Material Output si existe
                material_output = nodes.get('Material Output')
                if material_output:
                    mat.node_tree.links.new(principled.outputs['BSDF'], material_output.inputs['Surface'])
            
            # Animar la transparencia
            mat.blend_method = 'BLEND'
            principled.inputs["Alpha"].default_value = 1.0
            principled.inputs["Alpha"].keyframe_insert(data_path="default_value", frame=1)
            
            principled.inputs["Alpha"].default_value = 0.0
            principled.inputs["Alpha"].keyframe_insert(data_path="default_value", frame=30)
            
        except Exception as e:
            print(f"Error adding fade effect: {e}")

    def add_scale_effect(self, obj):
        """Añade un efecto de escalado al objeto"""
        try:
            obj.scale = (0.1, 0.1, 0.1)
            obj.keyframe_insert(data_path="scale", frame=1)
            
            obj.scale = (1.0, 1.0, 1.0)
            obj.keyframe_insert(data_path="scale", frame=20)
            
            # Configurar interpolación suave
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if fcurve.data_path == "scale":
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'BEZIER'
                        fcurve.update()
                        
        except Exception as e:
            print(f"Error adding scale effect: {e}")

    def add_rotation_effect(self, obj):
        """Añade un efecto de rotación al objeto"""
        try:
            import math
            obj.rotation_euler[2] = 0
            obj.keyframe_insert(data_path="rotation_euler", index=2, frame=1)
            
            obj.rotation_euler[2] = math.radians(360)
            obj.keyframe_insert(data_path="rotation_euler", index=2, frame=60)
            
            # Configurar interpolación lineal para rotación constante
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if fcurve.data_path == "rotation_euler" and fcurve.array_index == 2:
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'LINEAR'
                        fcurve.update()
                        
        except Exception as e:
            print(f"Error adding rotation effect: {e}")

    def add_follow_object_effect(self, obj, target=None):
        """Añade un efecto de seguimiento de objeto"""
        try:
            if not target:
                # Buscar un objeto target en la selección
                selected_objects = bpy.context.selected_objects
                for selected_obj in selected_objects:
                    if selected_obj != obj:
                        target = selected_obj
                        break
            
            if target:
                # Verificar si ya existe una restricción similar
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
                    
        except Exception as e:
            print(f"Error adding follow object effect: {e}")

    def add_follow_path_effect(self, obj, curve=None):
        """Añade un efecto de seguimiento de curva"""
        try:
            if not curve:
                # Buscar una curva en la selección
                selected_objects = bpy.context.selected_objects
                for selected_obj in selected_objects:
                    if selected_obj.type == 'CURVE' and selected_obj != obj:
                        curve = selected_obj
                        break
            
            if curve and curve.type == 'CURVE':
                # Verificar si ya existe una restricción similar
                existing_constraint = None
                for constraint in obj.constraints:
                    if constraint.type == 'FOLLOW_PATH' and constraint.target == curve:
                        existing_constraint = constraint
                        break
                
                if not existing_constraint:
                    constraint = obj.constraints.new(type='FOLLOW_PATH')
                    constraint.target = curve
                    constraint.use_curve_follow = True
                    
        except Exception as e:
            print(f"Error adding follow path effect: {e}")

    def add_wave_effect(self, obj):
        """Añade un efecto de onda al objeto"""
        try:
            # Verificar que es una malla
            if obj.type != 'MESH':
                print("Wave effect only works on mesh objects")
                return
            
            # Añadir modificador Wave
            wave_modifier = obj.modifiers.new(name="Wave", type='WAVE')
            wave_modifier.use_z = True
            wave_modifier.height = 0.5
            wave_modifier.width = 1.5
            wave_modifier.speed = 1.0
            
            # Crear propiedad personalizada para la amplitud
            obj['wave_amplitude'] = 1.0
            
            # Crear un driver para animar la altura de la onda
            try:
                from .utilities import apply_dynamic_drivers
                apply_dynamic_drivers(obj, f'modifiers["{wave_modifier.name}"].height', "wave_amplitude")
            except ImportError:
                print("Could not import apply_dynamic_drivers, wave will be static")
                
        except Exception as e:
            print(f"Error adding wave effect: {e}")

# Instancia singleton
animation_effects = AnimationEffects()

def register():
    pass

def unregister():
    pass