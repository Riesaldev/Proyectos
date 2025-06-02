import bpy

class CameraEffects:
    def add_camera_dolly_effect(self, obj):
        try:
            if obj and hasattr(obj, "location"):
                current_frame = bpy.context.scene.frame_current
                
                # Insertar keyframe inicial
                obj.keyframe_insert(data_path="location", frame=current_frame)
                
                # Movimiento de dolly
                obj.location.y += 5
                obj.keyframe_insert(data_path="location", frame=current_frame + 60)
                
                # Keyframe final de retorno
                obj.location.y -= 5
                obj.keyframe_insert(data_path="location", frame=current_frame + 120)
                
                print(f"Camera dolly effect added to {obj.name}")
                return True
        except Exception as e:
            print(f"Error adding camera dolly effect: {e}")
            return False

    def add_camera_focus_pull_effect(self, obj):
        try:
            if obj and obj.type == 'CAMERA':
                current_frame = bpy.context.scene.frame_current
                
                # Habilitar depth of field
                obj.data.dof.use_dof = True
                obj.data.dof.focus_distance = 2.0
                obj.data.dof.keyframe_insert(data_path="focus_distance", frame=current_frame)
                
                # Cambio de foco
                obj.data.dof.focus_distance = 10.0
                obj.data.dof.keyframe_insert(data_path="focus_distance", frame=current_frame + 60)
                
                # Retorno al foco original
                obj.data.dof.focus_distance = 2.0
                obj.data.dof.keyframe_insert(data_path="focus_distance", frame=current_frame + 120)
                
                print(f"Focus pull effect added to {obj.name}")
                return True
        except Exception as e:
            print(f"Error adding focus pull effect: {e}")
            return False

    def add_camera_follow_effect(self, obj, target):
        try:
            if obj and target:
                if not any(c.type == 'TRACK_TO' and c.target == target for c in obj.constraints):
                    constraint = obj.constraints.new(type='TRACK_TO')
                    constraint.target = target
                    constraint.track_axis = 'TRACK_NEGATIVE_Z'
                    constraint.up_axis = 'UP_Y'
                    print(f"Camera follow effect added to {obj.name} -> {target.name}")
        except Exception as e:
            print(f"Error adding camera follow effect: {e}")

    def add_camera_tracking_effect(self, obj, target):
        self.add_camera_follow_effect(obj, target)

    def add_camera_zoom_effect(self, obj):
        try:
            if obj and obj.type == 'CAMERA':
                current_frame = bpy.context.scene.frame_current
                original_lens = obj.data.lens
                
                # Keyframe inicial
                obj.data.keyframe_insert(data_path="lens", frame=current_frame)
                
                # Zoom in
                obj.data.lens = original_lens + 30
                obj.data.keyframe_insert(data_path="lens", frame=current_frame + 30)
                
                # Zoom out de regreso
                obj.data.lens = original_lens
                obj.data.keyframe_insert(data_path="lens", frame=current_frame + 60)
                
                print(f"Camera zoom effect added to {obj.name}")
                return True
        except Exception as e:
            print(f"Error adding camera zoom effect: {e}")
            return False

    def add_depth_of_field_effect(self, obj):
        try:
            if obj and obj.type == 'CAMERA':
                obj.data.dof.use_dof = True
                obj.data.dof.focus_distance = 5
                print(f"Depth of field effect added to {obj.name}")
        except Exception as e:
            print(f"Error adding depth of field effect: {e}")

    def add_focus_effect(self, obj, focus_obj):
        try:
            if obj and obj.type == 'CAMERA' and focus_obj:
                obj.data.dof.use_dof = True
                obj.data.dof.focus_object = focus_obj
                print(f"Focus effect added to {obj.name} -> {focus_obj.name}")
        except Exception as e:
            print(f"Error adding focus effect: {e}")

    def add_lens_distortion_camera_effect(self, obj):
        try:
            scene = bpy.context.scene
            scene.use_nodes = True
            tree = scene.node_tree
            nodes = tree.nodes
            if not any(n.type == 'LENSDIST' for n in nodes):
                lens_dist = nodes.new(type='CompositorNodeLensdist')
                lens_dist.distort = 0.5
                print(f"Lens distortion effect added to scene")
        except Exception as e:
            print(f"Error adding lens distortion effect: {e}")
            
    def add_path_effect(self, obj, curve):
        try:
            if obj and curve and curve.type == 'CURVE':
                if not any(c.type == 'FOLLOW_PATH' for c in obj.constraints):
                    constraint = obj.constraints.new(type='FOLLOW_PATH')
                    constraint.target = curve
                    print(f"Path effect added to {obj.name} -> {curve.name}")
        except Exception as e:
            print(f"Error adding path effect: {e}")
                
    def add_track_effect(self, obj, target):
        try:
            if obj and target:
                if not any(c.type == 'TRACK_TO' for c in obj.constraints):
                    constraint = obj.constraints.new(type='TRACK_TO')
                    constraint.target = target
                    print(f"Track effect added to {obj.name} -> {target.name}")
        except Exception as e:
            print(f"Error adding track effect: {e}")


camera_effects = CameraEffects()

def register():
    print("MotionFX: Camera effects module loaded")

def unregister():
    print("MotionFX: Camera effects module unloaded")