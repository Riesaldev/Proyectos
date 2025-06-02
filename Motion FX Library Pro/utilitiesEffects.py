import bpy

class UtilitiesEffects:
    def add_slow_motion_effect(self, obj):
        try:
            scene = bpy.context.scene
            
            if 'slow_motion_factor' not in scene:
                scene['slow_motion_factor'] = 0.5
            
            if obj.animation_data and obj.animation_data.action:
                action = obj.animation_data.action
                for fcurve in action.fcurves:
                    for keyframe in fcurve.keyframe_points:
                        keyframe.co[0] *= 2.0
                    fcurve.update()
            
            print(f"Slow motion effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding slow motion effect: {e}")

    def add_fast_forward_effect(self, obj):
        try:
            if obj.animation_data and obj.animation_data.action:
                action = obj.animation_data.action
                for fcurve in action.fcurves:
                    for keyframe in fcurve.keyframe_points:
                        keyframe.co[0] *= 0.5
                    fcurve.update()
            
            print(f"Fast forward effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fast forward effect: {e}")

    def add_freeze_frame_effect(self, obj):
        try:
            current_frame = bpy.context.scene.frame_current
            
            location = obj.location.copy()
            rotation = obj.rotation_euler.copy()
            scale = obj.scale.copy()
            
            for i in range(current_frame, current_frame + 30):
                bpy.context.scene.frame_set(i)
                obj.location = location
                obj.rotation_euler = rotation
                obj.scale = scale
                obj.keyframe_insert(data_path="location")
                obj.keyframe_insert(data_path="rotation_euler")
                obj.keyframe_insert(data_path="scale")
            
            bpy.context.scene.frame_set(current_frame)
            print(f"Freeze frame effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding freeze frame effect: {e}")

    def add_reverse_effect(self, obj):
        try:
            if obj.animation_data and obj.animation_data.action:
                action = obj.animation_data.action
                
                all_keyframes = []
                for fcurve in action.fcurves:
                    for keyframe in fcurve.keyframe_points:
                        all_keyframes.append((fcurve, keyframe.co[0], keyframe.co[1]))
                
                if all_keyframes:
                    min_frame = min(kf[1] for kf in all_keyframes)
                    max_frame = max(kf[1] for kf in all_keyframes)
                    
                    for fcurve, frame, value in all_keyframes:
                        new_frame = max_frame - (frame - min_frame)
                        for keyframe in fcurve.keyframe_points:
                            if abs(keyframe.co[0] - frame) < 0.001:
                                keyframe.co[0] = new_frame
                                break
                        fcurve.update()
            
            print(f"Reverse effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding reverse effect: {e}")

utilities_effects = UtilitiesEffects()

def register():
    print("MotionFX: Utilities effects module loaded")

def unregister():
    print("MotionFX: Utilities effects module unloaded")