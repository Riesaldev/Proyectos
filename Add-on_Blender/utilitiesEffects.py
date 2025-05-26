import bpy
import random  # Falta importar random para add_time_warp_effect

class UtilitiesEffects:
  # Utility effects

  def add_cinematic_effect(self, obj):
    # Adds a depth of field effect to the active camera
    if bpy.context.scene.camera:
      cam = bpy.context.scene.camera.data
      cam.dof.use_dof = True
      cam.dof.focus_object = obj

  def add_fast_forward_effect(self, obj):
    # Speeds up animation by scaling keyframes
    if obj.animation_data and obj.animation_data.action:
      for fcurve in obj.animation_data.action.fcurves:
        for keyframe in fcurve.keyframe_points:
          keyframe.co.x /= 2  # Halve the frame number (2x speed)

  def add_freeze_frame_effect(self, obj):
    # Holds the current frame for the rest of the timeline
    frame = bpy.context.scene.frame_current
    if obj.animation_data and obj.animation_data.action:
      for fcurve in obj.animation_data.action.fcurves:
        value = fcurve.evaluate(frame)
        fcurve.keyframe_points.clear()
        fcurve.keyframe_points.insert(frame, value)
        fcurve.keyframe_points.insert(frame + 1, value)

  def add_reverse_effect(self, obj):
    # Reverses the animation keyframes
    if obj.animation_data and obj.animation_data.action:
      action = obj.animation_data.action
      frame_start = int(action.frame_range[0])
      frame_end = int(action.frame_range[1])
      for fcurve in action.fcurves:
        for keyframe in fcurve.keyframe_points:
          keyframe.co.x = frame_end - (keyframe.co.x - frame_start)

  def add_slow_motion_effect(self, obj):
    # Slows down animation by scaling keyframes
    if obj.animation_data and obj.animation_data.action:
      for fcurve in obj.animation_data.action.fcurves:
        for keyframe in fcurve.keyframe_points:
          keyframe.co.x *= 2  # Double the frame number (0.5x speed)

  def add_time_warp_effect(self, obj):
    # Randomly offsets keyframes for a time-warp effect
    if obj.animation_data and obj.animation_data.action:
      for fcurve in obj.animation_data.action.fcurves:
        for keyframe in fcurve.keyframe_points:
          keyframe.co.x += random.uniform(-5, 5)