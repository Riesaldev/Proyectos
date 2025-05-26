import bpy
import random

class CameraEffects:
  # Camera effects

  def add_camera_dolly_effect(self, obj):
    # Mueve la cámara hacia adelante en el eje Y
    if obj and hasattr(obj, "location"):
      obj.location.y += 5

  def add_camera_focus_pull_effect(self, obj):
    # Cambia el enfoque de la cámara (Depth of Field)
    if obj and obj.type == 'CAMERA':
      obj.data.dof.use_dof = True
      obj.data.dof.focus_distance = 10

  def add_camera_follow_effect(self, obj, target):
    # Hace que la cámara siga a un objeto
    if obj and target:
      if not any(c.type == 'TRACK_TO' and c.target == target for c in obj.constraints):
        constraint = obj.constraints.new(type='TRACK_TO')
        constraint.target = target
        constraint.track_axis = 'TRACK_NEGATIVE_Z'
        constraint.up_axis = 'UP_Y'

  def add_camera_lens_flare_effect(self, obj):
    # Añade un nodo de glare para simular lens flare
    scene = bpy.context.scene
    scene.use_nodes = True
    tree = scene.node_tree
    nodes = tree.nodes
    if not any(n.type == 'GLARE' for n in nodes):
      glare = nodes.new(type='CompositorNodeGlare')
      glare.glare_type = 'GHOSTS'

  def add_camera_pan_effect(self, obj):
    # Anima la rotación en Z (pan)
    if obj and hasattr(obj, "rotation_euler"):
      obj.rotation_euler[2] += 0.5

  def add_camera_rotate_effect(self, obj):
    # Anima la rotación en Y (rotate)
    if obj and hasattr(obj, "rotation_euler"):
      obj.rotation_euler[1] += 0.5

  def add_camera_shake_effect(self, obj):
    # Simula un pequeño movimiento aleatorio (shake)
    if obj and hasattr(obj, "location"):
      obj.location.x += random.uniform(-0.1, 0.1)
      obj.location.y += random.uniform(-0.1, 0.1)
      obj.location.z += random.uniform(-0.1, 0.1)

  def add_camera_stabilization_effect(self, obj):
    # Quita constraints de tipo LIMIT_LOCATION (simplificado)
    if obj:
      for c in [c for c in obj.constraints if c.type == 'LIMIT_LOCATION']:
        obj.constraints.remove(c)

  def add_camera_tilt_effect(self, obj):
    # Anima la rotación en X (tilt)
    if obj and hasattr(obj, "rotation_euler"):
      obj.rotation_euler[0] += 0.5

  def add_camera_tracking_effect(self, obj, target):
    # Hace que la cámara apunte a un objeto
    self.add_camera_follow_effect(obj, target)

  def add_camera_zoom_effect(self, obj):
    # Cambia la distancia focal (zoom)
    if obj and obj.type == 'CAMERA':
      obj.data.lens += 10

  def add_depth_of_field_effect(self, obj):
    # Activa el depth of field
    if obj and obj.type == 'CAMERA':
      obj.data.dof.use_dof = True
      obj.data.dof.focus_distance = 5

  def add_focus_effect(self, obj, focus_obj):
    # Enfoca la cámara en un objeto
    if obj and obj.type == 'CAMERA' and focus_obj:
      obj.data.dof.use_dof = True
      obj.data.dof.focus_object = focus_obj

  def add_lens_distortion_camera_effect(self, obj):
    # Añade un nodo de distorsión de lente
    scene = bpy.context.scene
    scene.use_nodes = True
    tree = scene.node_tree
    nodes = tree.nodes
    if not any(n.type == 'LENSDIST' for n in nodes):
      lens_dist = nodes.new(type='CompositorNodeLensdist')
      lens_dist.distort = 0.5

  def add_path_effect(self, obj, curve):
    # Hace que la cámara siga una curva
    if obj and curve:
      if not any(c.type == 'FOLLOW_PATH' and c.target == curve for c in obj.constraints):
        constraint = obj.constraints.new(type='FOLLOW_PATH')
        constraint.target = curve

  def add_track_effect(self, obj, target):
    # Hace que la cámara siga a un objeto (track)
    self.add_camera_follow_effect(obj, target)
