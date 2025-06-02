import bpy
import random

class LightingEffects:

    def add_fireworks_light_effect(self, obj):
        try:
            light_data = bpy.data.lights.new(name="Fireworks_Light", type='POINT')
            light_data.energy = 3000
            light_data.color = (random.random(), random.random(), random.random())
            light_obj = bpy.data.objects.new(name="Fireworks_Light", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            light_data.energy = 3000
            light_data.keyframe_insert(data_path="energy", frame=1)
            light_data.energy = 0
            light_data.keyframe_insert(data_path="energy", frame=5)
            light_data.energy = 3000
            light_data.keyframe_insert(data_path="energy", frame=10)
            
            print(f"Fireworks light effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fireworks light effect: {e}")

    def add_flash_effect(self, obj):
        try:
            light_data = bpy.data.lights.new(name="Flash_Light", type='POINT')
            light_data.energy = 5000
            light_data.color = (1, 1, 1)
            light_obj = bpy.data.objects.new(name="Flash_Light", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            light_data.energy = 0
            light_data.keyframe_insert(data_path="energy", frame=1)
            light_data.energy = 5000
            light_data.keyframe_insert(data_path="energy", frame=2)
            light_data.energy = 0
            light_data.keyframe_insert(data_path="energy", frame=4)
            
            print(f"Flash effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding flash effect: {e}")

    def add_glowing_effect(self, obj):
        try:
            if not obj.data.materials:
                mat = bpy.data.materials.new(name="Glow_Material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True

            nodes = mat.node_tree.nodes
            
            emission = nodes.get("Emission")
            material_output = nodes.get('Material Output')
            
            if not emission:
                emission = nodes.new(type='ShaderNodeEmission')
                emission.inputs['Strength'].default_value = 10.0
                emission.inputs['Color'].default_value = (1.0, 0.8, 0.3, 1.0)
            
            if not material_output:
                material_output = nodes.new(type='ShaderNodeOutputMaterial')
            
            mat.node_tree.links.new(emission.outputs['Emission'], material_output.inputs['Surface'])
            
            print(f"Glowing effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding glowing effect: {e}")

    def add_global_illumination_effect(self, obj):
        try:
            current_engine = bpy.context.scene.render.engine
            
            if current_engine != 'CYCLES':
                bpy.context.scene.render.engine = 'CYCLES'
            
            bpy.context.scene.cycles.use_adaptive_sampling = True
            bpy.context.scene.cycles.samples = 128
            
            bpy.context.scene.world.use_nodes = True
            world_nodes = bpy.context.scene.world.node_tree.nodes
            bg = world_nodes.get('Background')
            if bg:
                bg.inputs['Strength'].default_value = 2.0
                bg.inputs['Color'].default_value = (0.05, 0.1, 0.3, 1.0)
                
            print("Global Illumination enabled")
            
        except Exception as e:
            print(f"Error adding global illumination effect: {e}")

    def add_lens_flare_light_effect(self, obj):
        try:
            if obj.type != 'LIGHT':
                bpy.ops.object.light_add(type='SUN', location=obj.location)
                light_obj = bpy.context.active_object
            else:
                light_obj = obj
            
            light_obj.data.energy = 10.0
            light_obj.data.color = (1.0, 0.9, 0.8)
            
            print(f"Lens flare effect added to {light_obj.name}")
            
        except Exception as e:
            print(f"Error adding lens flare effect: {e}")

    def add_neon_effect(self, obj):
        try:
            if not obj.data.materials:
                mat = bpy.data.materials.new(name="Neon_Material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True

            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            
            emission = nodes.get("Emission")
            material_output = nodes.get('Material Output')
            
            if not emission:
                emission = nodes.new(type='ShaderNodeEmission')
            
            if not material_output:
                material_output = nodes.new(type='ShaderNodeOutputMaterial')
            
            emission.inputs['Color'].default_value = (0.0, 1.0, 0.8, 1.0)
            emission.inputs['Strength'].default_value = 20.0
            
            links.new(emission.outputs['Emission'], material_output.inputs['Surface'])
            
            mat.blend_method = 'BLEND'
            
            print(f"Neon effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding neon effect: {e}")

    def add_ray_tracing_effect(self, obj):
        try:
            current_engine = bpy.context.scene.render.engine
            
            if current_engine != 'CYCLES':
                bpy.context.scene.render.engine = 'CYCLES'
            
            cycles = bpy.context.scene.cycles
            cycles.max_bounces = 12
            cycles.diffuse_bounces = 4
            cycles.glossy_bounces = 4
            cycles.transmission_bounces = 8
            cycles.volume_bounces = 2
            cycles.transparent_max_bounces = 8
            
            cycles.samples = 256
            cycles.use_adaptive_sampling = True
            cycles.adaptive_threshold = 0.01
            
            print("Ray tracing enabled")
            
        except Exception as e:
            print(f"Error enabling ray tracing: {e}")

    def add_shadows_effect(self, obj):
        try:
            light_data = bpy.data.lights.new(name="Shadow_Sun", type='SUN')
            light_data.energy = 5
            light_data.angle = 0.00873
            light_obj = bpy.data.objects.new(name="Shadow_Sun", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            light_obj.rotation_euler = (0.785, 0, 0.524)
            
            if bpy.context.scene.render.engine == 'CYCLES':
                bpy.context.scene.cycles.use_adaptive_sampling = True
            elif bpy.context.scene.render.engine == 'BLENDER_EEVEE':
                eevee = bpy.context.scene.eevee
                eevee.use_soft_shadows = True
                eevee.shadow_cascade_size = '2048'
                
            print(f"Shadows effect added to {obj.name}")
                
        except Exception as e:
            print(f"Error adding shadows effect: {e}")

    def add_spotlight_effect(self, obj):
        try:
            light_data = bpy.data.lights.new(name="Spotlight", type='SPOT')
            light_data.energy = 1000
            light_data.spot_size = 0.7
            light_data.spot_blend = 0.5
            light_obj = bpy.data.objects.new(name="Spotlight", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            light_obj.location.z += 3
            light_obj.rotation_euler = (1.047, 0, 0)
            
            constraint = light_obj.constraints.new(type='TRACK_TO')
            constraint.target = obj
            constraint.track_axis = 'TRACK_NEGATIVE_Z'
            constraint.up_axis = 'UP_Y'
            
            print(f"Spotlight effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding spotlight effect: {e}")

    def add_volumetric_effect(self, obj):
        try:
            current_engine = bpy.context.scene.render.engine
            
            if current_engine == 'BLENDER_EEVEE':
                eevee = bpy.context.scene.eevee
                eevee.use_volumetric_lights = True
                eevee.use_volumetric_shadows = True
                eevee.volumetric_tile_size = '8'
                eevee.volumetric_samples = 64
                
                print("Volumetric lighting enabled")
                
            elif current_engine == 'CYCLES':
                print("Volumetric effects work automatically in Cycles")
            else:
                print(f"Volumetric effects require Eevee or Cycles")
                
        except Exception as e:
            print(f"Error adding volumetric effect: {e}")

lighting_effects = LightingEffects()

def register():
    print("MotionFX: Lighting effects module loaded")

def unregister():
    print("MotionFX: Lighting effects module unloaded")