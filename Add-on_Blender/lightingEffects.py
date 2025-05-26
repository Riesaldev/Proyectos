import bpy
import random

class LightingEffects:

  # Lighting effects

  def add_fireworks_light_effect(self, obj):
    # Add a point light with random color and high energy to simulate fireworks
    light_data = bpy.data.lights.new(name="Fireworks_Light", type='POINT')
    light_data.energy = 3000
    light_data.color = (random.random(), random.random(), random.random())
    light_obj = bpy.data.objects.new(name="Fireworks_Light", object_data=light_data)
    bpy.context.collection.objects.link(light_obj)
    light_obj.location = obj.location

  def add_flash_effect(self, obj):
    # Add a point light with very high energy for a flash effect
    light_data = bpy.data.lights.new(name="Flash_Light", type='POINT')
    light_data.energy = 5000
    light_data.color = (1, 1, 1)
    light_obj = bpy.data.objects.new(name="Flash_Light", object_data=light_data)
    bpy.context.collection.objects.link(light_obj)
    light_obj.location = obj.location

  def add_glowing_effect(self, obj):
    # Add emission material to make the object glow
    mat = bpy.data.materials.new(name="Glow_Material")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    emission = nodes.new(type='ShaderNodeEmission')
    emission.inputs['Strength'].default_value = 10.0
    output = nodes.get('Material Output')
    mat.node_tree.links.new(emission.outputs['Emission'], output.inputs['Surface'])
    if not obj.data.materials:
      obj.data.materials.append(mat)
    else:
      obj.active_material = mat

  def add_global_illumination_effect(self, obj):
    # Enable indirect lighting in the scene (Cycles only)
    bpy.context.scene.render.engine = 'CYCLES'
    bpy.context.scene.cycles.use_adaptive_sampling = True
    bpy.context.scene.world.use_nodes = True
    world_nodes = bpy.context.scene.world.node_tree.nodes
    bg = world_nodes.get('Background')
    if bg:
      bg.inputs['Strength'].default_value = 2.0

  def add_lens_flare_light_effect(self, obj):
    # Add a sun light and a glare compositor node for lens flare
    light_data = bpy.data.lights.new(name="LensFlare_Sun", type='SUN')
    light_data.energy = 10
    light_obj = bpy.data.objects.new(name="LensFlare_Sun", object_data=light_data)
    bpy.context.collection.objects.link(light_obj)
    light_obj.location = obj.location
    # Add glare node to compositor
    bpy.context.scene.use_nodes = True
    tree = bpy.context.scene.node_tree
    nodes = tree.nodes
    if not any(n.type == 'GLARE' for n in nodes):
      glare = nodes.new(type='CompositorNodeGlare')
      glare.glare_type = 'GHOSTS'

  def add_neon_effect(self, obj):
    # Add emission material with neon color
    mat = bpy.data.materials.new(name="Neon_Material")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    emission = nodes.new(type='ShaderNodeEmission')
    emission.inputs['Color'].default_value = (0.0, 1.0, 0.8, 1.0)
    emission.inputs['Strength'].default_value = 20.0
    output = nodes.get('Material Output')
    mat.node_tree.links.new(emission.outputs['Emission'], output.inputs['Surface'])
    if not obj.data.materials:
      obj.data.materials.append(mat)
    else:
      obj.active_material = mat

  def add_ray_tracing_effect(self, obj):
    # Enable ray tracing features in Cycles
    bpy.context.scene.render.engine = 'CYCLES'
    bpy.context.scene.cycles.max_bounces = 12
    bpy.context.scene.cycles.diffuse_bounces = 4
    bpy.context.scene.cycles.glossy_bounces = 4
    bpy.context.scene.cycles.transmission_bounces = 8

  def add_shadows_effect(self, obj):
    # Add a sun light with shadows enabled
    light_data = bpy.data.lights.new(name="Shadow_Sun", type='SUN')
    light_data.energy = 5
    light_data.use_shadow = True
    light_obj = bpy.data.objects.new(name="Shadow_Sun", object_data=light_data)
    bpy.context.collection.objects.link(light_obj)
    light_obj.location = obj.location

  def add_spotlight_effect(self, obj):
    # Add a spotlight
    light_data = bpy.data.lights.new(name="Spotlight", type='SPOT')
    light_data.energy = 1000
    light_data.spot_size = 0.7
    light_data.spot_blend = 0.5
    light_obj = bpy.data.objects.new(name="Spotlight", object_data=light_data)
    bpy.context.collection.objects.link(light_obj)
    light_obj.location = obj.location
