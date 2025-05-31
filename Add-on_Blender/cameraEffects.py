import bpy

class CameraEffects:
    def add_camera_dolly_effect(self, obj):
        if obj and hasattr(obj, "location"):
            obj.location.y += 5

    def add_camera_focus_pull_effect(self, obj):
        if obj and obj.type == 'CAMERA':
            obj.data.dof.use_dof = True
            obj.data.dof.focus_distance = 10

    def add_camera_follow_effect(self, obj, target):
        if obj and target:
            if not any(c.type == 'TRACK_TO' and c.target == target for c in obj.constraints):
                constraint = obj.constraints.new(type='TRACK_TO')
                constraint.target = target
                constraint.track_axis = 'TRACK_NEGATIVE_Z'
                constraint.up_axis = 'UP_Y'

    def add_camera_tracking_effect(self, obj, target):
        self.add_camera_follow_effect(obj, target)

    def add_camera_zoom_effect(self, obj):
        if obj and obj.type == 'CAMERA':
            obj.data.lens += 10

    def add_depth_of_field_effect(self, obj):
        if obj and obj.type == 'CAMERA':
            obj.data.dof.use_dof = True
            obj.data.dof.focus_distance = 5

    def add_focus_effect(self, obj, focus_obj):
        if obj and obj.type == 'CAMERA' and focus_obj:
            obj.data.dof.use_dof = True
            obj.data.dof.focus_object = focus_obj

    def add_lens_distortion_camera_effect(self, obj):
        scene = bpy.context.scene
        scene.use_nodes = True
        tree = scene.node_tree
        nodes = tree.nodes
        if not any(n.type == 'LENSDIST' for n in nodes):
            lens_dist = nodes.new(type='CompositorNodeLensdist')
            lens_dist.distort = 0.5
            
    def add_path_effect(self, obj, curve):
        if obj and curve and curve.type == 'CURVE':
            if not any(c.type == 'FOLLOW_PATH' for c in obj.constraints):
                constraint = obj.constraints.new(type='FOLLOW_PATH')
                constraint.target = curve
                
    def add_track_effect(self, obj, target):
        if obj and target:
            if not any(c.type == 'TRACK_TO' for c in obj.constraints):
                constraint = obj.constraints.new(type='TRACK_TO')
                constraint.target = target

# Instancia singleton para usar en todo el addon
camera_effects = CameraEffects()

# No es necesario registrar clases en este archivo
def register():
    pass

def unregister():
    pass