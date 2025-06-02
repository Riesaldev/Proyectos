import bpy
import mathutils

class AnimationEffects:
    def add_bounce_effect(self, obj):
        try:
            current_frame = bpy.context.scene.frame_current
            
            obj.location.z = 0
            obj.keyframe_insert(data_path="location", frame=current_frame)
            
            obj.location.z = 2
            obj.keyframe_insert(data_path="location", frame=current_frame + 10)
            
            obj.location.z = 0
            obj.keyframe_insert(data_path="location", frame=current_frame + 20)
            
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    for keyframe in fcurve.keyframe_points:
                        keyframe.interpolation = 'BEZIER'
            
            print(f"Bounce effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding bounce effect: {e}")

    def add_fade_effect(self, obj):
        try:
            if not obj.data.materials:
                mat = bpy.data.materials.new(name="Fade_Material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True
            
            mat.blend_method = 'BLEND'
            
            nodes = mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if principled:
                current_frame = bpy.context.scene.frame_current
                
                principled.inputs["Alpha"].default_value = 1.0
                principled.inputs["Alpha"].keyframe_insert(data_path="default_value", frame=current_frame)
                
                principled.inputs["Alpha"].default_value = 0.0
                principled.inputs["Alpha"].keyframe_insert(data_path="default_value", frame=current_frame + 30)
            
            print(f"Fade effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fade effect: {e}")

    def add_scale_effect(self, obj):
        try:
            current_frame = bpy.context.scene.frame_current
            
            obj.scale = (1, 1, 1)
            obj.keyframe_insert(data_path="scale", frame=current_frame)
            
            obj.scale = (2, 2, 2)
            obj.keyframe_insert(data_path="scale", frame=current_frame + 15)
            
            obj.scale = (1, 1, 1)
            obj.keyframe_insert(data_path="scale", frame=current_frame + 30)
            
            print(f"Scale effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding scale effect: {e}")

    def add_rotation_effect(self, obj):
        try:
            current_frame = bpy.context.scene.frame_current
            
            obj.rotation_euler.z = 0
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame)
            
            obj.rotation_euler.z = 6.28319
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame + 60)
            
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    if "rotation_euler" in fcurve.data_path:
                        for keyframe in fcurve.keyframe_points:
                            keyframe.interpolation = 'LINEAR'
            
            print(f"Rotation effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding rotation effect: {e}")

    def add_wave_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Wave effect only works on mesh objects")
                return
            
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.modifier_add(type='WAVE')
            
            wave_modifier = obj.modifiers[-1]
            wave_modifier.use_z = True
            wave_modifier.height = 0.5
            wave_modifier.width = 1.5
            wave_modifier.speed = 1.0
            
            print(f"Wave effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding wave effect: {e}")

    def add_follow_object_effect(self, obj):
        try:
            target = None
            for selected_obj in bpy.context.selected_objects:
                if selected_obj != obj:
                    target = selected_obj
                    break
            
            if not target:
                print("No target object found for follow effect")
                return
            
            constraint = obj.constraints.new(type='TRACK_TO')
            constraint.target = target
            constraint.track_axis = 'TRACK_NEGATIVE_Z'
            constraint.up_axis = 'UP_Y'
            
            print(f"Follow object effect added to {obj.name} -> {target.name}")
            
        except Exception as e:
            print(f"Error adding follow object effect: {e}")

    def add_follow_path_effect(self, obj):
        try:
            curve = None
            for selected_obj in bpy.context.selected_objects:
                if selected_obj.type == 'CURVE':
                    curve = selected_obj
                    break
            
            if not curve:
                print("No curve found for path following effect")
                return
            
            constraint = obj.constraints.new(type='FOLLOW_PATH')
            constraint.target = curve
            constraint.use_curve_follow = True
            
            print(f"Follow path effect added to {obj.name} -> {curve.name}")
            
        except Exception as e:
            print(f"Error adding follow path effect: {e}")

animation_effects = AnimationEffects()

def register():
    print("MotionFX: Animation effects module loaded")

def unregister():
    print("MotionFX: Animation effects module unloaded")