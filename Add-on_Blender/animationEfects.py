import bpy
import random

class AnimationEffects:
    # animation effects

    def add_bounce_effect(self, obj):
        if obj.type == 'MESH':
            mod = obj.modifiers.new(name="Bounce_Effect", type='WAVE')
            mod.use_normal = True
            mod.height = 1.0
            mod.width = 0.5
            mod.narrowness = 1.0

    def add_bounce_back_effect(self, obj):
        if obj.type == 'MESH':
            mod = obj.modifiers.new(name="Bounce_Back_Effect", type='WAVE')
            mod.use_normal = True
            mod.height = 1.0
            mod.width = 0.5
            mod.narrowness = 2.0

    def add_blink_effect(self, obj):
        obj.hide_viewport = False
        obj.keyframe_insert(data_path="hide_viewport", frame=bpy.context.scene.frame_current)
        obj.hide_viewport = True
        obj.keyframe_insert(data_path="hide_viewport", frame=bpy.context.scene.frame_current + 5)
        obj.hide_viewport = False
        obj.keyframe_insert(data_path="hide_viewport", frame=bpy.context.scene.frame_current + 10)

    def add_fade_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Fade_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs['Alpha'].default_value = 1.0
            principled.inputs['Alpha'].keyframe_insert(data_path="default_value", frame=bpy.context.scene.frame_current)
            principled.inputs['Alpha'].default_value = 0.0
            principled.inputs['Alpha'].keyframe_insert(data_path="default_value", frame=bpy.context.scene.frame_current + 20)
            mat.blend_method = 'BLEND'

    def add_follow_object_effect(self, obj):
        if bpy.context.selected_objects and len(bpy.context.selected_objects) > 1:
            target = [o for o in bpy.context.selected_objects if o != obj][0]
            con = obj.constraints.new(type='CHILD_OF')
            con.target = target

    def add_follow_path_effect(self, obj):
        curve = None
        for o in bpy.context.selected_objects:
            if o.type == 'CURVE':
                curve = o
                break
        if curve:
            con = obj.constraints.new(type='FOLLOW_PATH')
            con.target = curve

    def add_jelly_effect(self, obj):
        if obj.type == 'MESH':
            mod = obj.modifiers.new(name="Jelly_Effect", type='LAPLACIANDEFORM')
            mod.iterations = 20

    def add_pulse_effect(self, obj):
        obj.scale = (1, 1, 1)
        obj.keyframe_insert(data_path="scale", frame=bpy.context.scene.frame_current)
        obj.scale = (1.2, 1.2, 1.2)
        obj.keyframe_insert(data_path="scale", frame=bpy.context.scene.frame_current + 5)
        obj.scale = (1, 1, 1)
        obj.keyframe_insert(data_path="scale", frame=bpy.context.scene.frame_current + 10)

    def add_rotate_effect(self, obj):
        obj.rotation_euler = (0, 0, 0)
        obj.keyframe_insert(data_path="rotation_euler", frame=bpy.context.scene.frame_current)
        obj.rotation_euler = (0, 0, 6.28319)
        obj.keyframe_insert(data_path="rotation_euler", frame=bpy.context.scene.frame_current + 30)

    def add_shake_effect(self, obj):
        f0 = bpy.context.scene.frame_current
        for i in range(10):
            obj.location.x += random.uniform(-0.05, 0.05)
            obj.location.y += random.uniform(-0.05, 0.05)
            obj.keyframe_insert(data_path="location", frame=f0 + i)

    def add_sine_wave_effect(self, obj):
        if obj.type == 'MESH':
            mod = obj.modifiers.new(name="SineWave_Effect", type='WAVE')
            mod.height = 0.5
            mod.width = 1.0
            mod.speed = 0.25

    def add_spin_effect(self, obj):
        obj.rotation_euler = (0, 0, 0)
        obj.keyframe_insert(data_path="rotation_euler", frame=bpy.context.scene.frame_current)
        obj.rotation_euler = (0, 0, 12.5664)
        obj.keyframe_insert(data_path="rotation_euler", frame=bpy.context.scene.frame_current + 20)

    def add_spring_effect(self, obj):
        if obj.type == 'MESH':
            mod = obj.modifiers.new(name="Spring_Effect", type='SIMPLE_DEFORM')
            mod.deform_method = 'BEND'
            mod.angle = 1.0

    def add_squash_stretch_effect(self, obj):
        obj.scale = (1, 1, 1)
        obj.keyframe_insert(data_path="scale", frame=bpy.context.scene.frame_current)
        obj.scale = (1.2, 0.8, 1)
        obj.keyframe_insert(data_path="scale", frame=bpy.context.scene.frame_current + 5)
        obj.scale = (1, 1, 1)
        obj.keyframe_insert(data_path="scale", frame=bpy.context.scene.frame_current + 10)

    def add_twist_effect(self, obj):
        if obj.type == 'MESH':
            mod = obj.modifiers.new(name="Twist_Effect", type='SIMPLE_DEFORM')
            mod.deform_method = 'TWIST'
            mod.angle = 1.0

    def add_wave_effect(self, obj):
        if obj.type == 'MESH':
            mod = obj.modifiers.new(name="Wave_Effect", type='WAVE')
            mod.time_offset = bpy.context.scene.frame_current
            mod.start_position_x = 0.0
            mod.start_position_y = 0.0
            mod.start_position_z = 0.0
            mod.life_time = 100
            obj['wave_amplitude'] = 1.0

    def add_wiggle_effect(self, obj):
        f0 = bpy.context.scene.frame_current
        for i in range(10):
            obj.location.x += random.uniform(-0.02, 0.02)
            obj.location.y += random.uniform(-0.02, 0.02)
            obj.keyframe_insert(data_path="location", frame=f0 + i)

    def add_zoom_effect(self, obj):
        obj.scale = (1, 1, 1)
        obj.keyframe_insert(data_path="scale", frame=bpy.context.scene.frame_current)
        obj.scale = (2, 2, 2)
        obj.keyframe_insert(data_path="scale", frame=bpy.context.scene.frame_current + 10)