import bpy

class MaterialEffects:
  # Material effects

  def add_anisotropic_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Anisotropic_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Anisotropic'].default_value = 1.0

  def add_ash_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Ash_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Base Color'].default_value = (0.8, 0.8, 0.8, 1.0)

  def add_carpaint_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="CarPaint_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Metallic'].default_value = 1.0
      principled.inputs['Clearcoat'].default_value = 1.0
      principled.inputs['Base Color'].default_value = (1.0, 0.0, 0.0, 1.0)

  def add_displacement_effect(self, obj):
    if obj.type == 'MESH':
      obj.modifiers.new(name="Displacement_Effect", type='DISPLACE')

  def add_emission_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Emission_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    if not any(n.type == 'EMISSION' for n in nodes):
      emission = nodes.new(type='ShaderNodeEmission')
      output = nodes.get('Material Output')
      tree.links.new(emission.outputs['Emission'], output.inputs['Surface'])
      emission.inputs['Strength'].default_value = 5.0

  def add_frost_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Frost_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Base Color'].default_value = (0.7, 0.9, 1.0, 1.0)
      principled.inputs['Roughness'].default_value = 0.8

  def add_ghost_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Ghost_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Alpha'].default_value = 0.2
      mat.blend_method = 'BLEND'

  def add_glass_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Glass_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    if not any(n.type == 'BSDF_GLASS' for n in nodes):
      glass = nodes.new(type='ShaderNodeBsdfGlass')
      output = nodes.get('Material Output')
      tree.links.new(glass.outputs['BSDF'], output.inputs['Surface'])

  def add_glitter_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Glitter_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    noise = nodes.new(type='ShaderNodeTexNoise')
    emission = nodes.new(type='ShaderNodeEmission')
    output = nodes.get('Material Output')
    tree.links.new(noise.outputs['Color'], emission.inputs['Color'])
    tree.links.new(emission.outputs['Emission'], output.inputs['Surface'])
    emission.inputs['Strength'].default_value = 10.0

  def add_glossy_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Glossy_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    if not any(n.type == 'BSDF_GLOSSY' for n in nodes):
      glossy = nodes.new(type='ShaderNodeBsdfGlossy')
      output = nodes.get('Material Output')
      tree.links.new(glossy.outputs['BSDF'], output.inputs['Surface'])

  def add_ice_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Ice_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Base Color'].default_value = (0.6, 0.8, 1.0, 1.0)
      principled.inputs['Transmission'].default_value = 1.0
      principled.inputs['Roughness'].default_value = 0.1

  def add_matte_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Matte_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Roughness'].default_value = 1.0

  def add_metallic_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Metallic_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Metallic'].default_value = 1.0
      principled.inputs['Roughness'].default_value = 0.2

  def add_mist_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Mist_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Base Color'].default_value = (1.0, 1.0, 1.0, 1.0)
      principled.inputs['Alpha'].default_value = 0.3
      mat.blend_method = 'BLEND'

  def add_material_effect(self, obj):
    obj["material"] = True

  def add_normal_map_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="NormalMap_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    normal_map = nodes.new(type='ShaderNodeNormalMap')
    principled = nodes.get("Principled BSDF")
    if principled:
      tree.links.new(normal_map.outputs['Normal'], principled.inputs['Normal'])

  def add_plastic_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Plastic_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Metallic'].default_value = 0.0
      principled.inputs['Roughness'].default_value = 0.3

  def add_reflection_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Reflection_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Metallic'].default_value = 1.0
      principled.inputs['Roughness'].default_value = 0.0

  def add_refraction_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Refraction_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Transmission'].default_value = 1.0
      principled.inputs['IOR'].default_value = 1.45

  def add_snow_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Snow_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Base Color'].default_value = (1.0, 1.0, 1.0, 1.0)
      principled.inputs['Roughness'].default_value = 0.9

  def add_stone_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Stone_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    noise = nodes.new(type='ShaderNodeTexNoise')
    principled = nodes.get("Principled BSDF")
    if principled:
      tree.links.new(noise.outputs['Color'], principled.inputs['Base Color'])
      principled.inputs['Roughness'].default_value = 0.7

  def add_subsurface_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Subsurface_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
      principled.inputs['Subsurface'].default_value = 0.5

  def add_texture_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Texture_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    tex = nodes.new(type='ShaderNodeTexChecker')
    principled = nodes.get("Principled BSDF")
    if principled:
      tree.links.new(tex.outputs['Color'], principled.inputs['Base Color'])

  def add_translucent_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Translucent_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    translucent = nodes.new(type='ShaderNodeBsdfTranslucent')
    output = nodes.get('Material Output')
    tree.links.new(translucent.outputs['BSDF'], output.inputs['Surface'])

  def add_transparent_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Transparent_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    transparent = nodes.new(type='ShaderNodeBsdfTransparent')
    output = nodes.get('Material Output')
    tree.links.new(transparent.outputs['BSDF'], output.inputs['Surface'])
    mat.blend_method = 'BLEND'

  def add_wood_effect(self, obj):
    if not obj.material_slots:
      mat = bpy.data.materials.new(name="Wood_Material")
      obj.data.materials.append(mat)
    mat = obj.active_material
    mat.use_nodes = True
    tree = mat.node_tree
    nodes = tree.nodes
    wave = nodes.new(type='ShaderNodeTexWave')
    principled = nodes.get("Principled BSDF")
    if principled:
      tree.links.new(wave.outputs['Color'], principled.inputs['Base Color'])
