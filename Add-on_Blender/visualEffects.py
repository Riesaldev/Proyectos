import bpy
import random

class VisualEffects:
    # Visual effects

    def add_black_white_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="BW_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        rgb2bw = nodes.new(type='ShaderNodeRGBToBW')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(rgb2bw.outputs['Val'], principled.inputs['Base Color'])

    def add_bloom_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Bloom_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        glare = nodes.new(type='ShaderNodeGlare')
        glare.inputs['Size'].default_value = 5.0
        glare.inputs['Threshold'].default_value = 1.0
        output = nodes.get('Material Output')
        tree.links.new(glare.outputs['Image'], output.inputs['Surface'])

    def add_blur_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Blur_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        blur = nodes.new(type='ShaderNodeTexNoise')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(blur.outputs['Color'], principled.inputs['Base Color'])

    def add_chromatic_aberration_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Chromatic_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        separate = nodes.new(type='ShaderNodeSeparateRGB')
        combine = nodes.new(type='ShaderNodeCombineRGB')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(separate.outputs['R'], combine.inputs['R'])
            tree.links.new(separate.outputs['G'], combine.inputs['G'])
            tree.links.new(separate.outputs['B'], combine.inputs['B'])
            tree.links.new(combine.outputs['Image'], principled.inputs['Base Color'])

    def add_colorize_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Colorize_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        mix = nodes.new(type='ShaderNodeMixRGB')
        mix.inputs['Fac'].default_value = 0.5
        mix.inputs['Color2'].default_value = (1.0, 0.5, 0.0, 1.0)
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(mix.outputs['Color'], principled.inputs['Base Color'])

    def add_fisheye_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Fisheye_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        fisheye = nodes.new(type='ShaderNodeTexFisheye')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(fisheye.outputs['Color'], principled.inputs['Base Color'])

    def add_glitch_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Glitch_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        text_coord = nodes.new(type='ShaderNodeTexCoord')
        noise = nodes.new(type='ShaderNodeTexNoise')
        displacement = nodes.new(type='ShaderNodeDisplacement')
        material_output = nodes.get('Material Output')
        links = mat.node_tree.links
        links.new(text_coord.outputs['UV'], noise.inputs['Vector'])
        links.new(noise.outputs['Color'], displacement.inputs['Height'])
        links.new(displacement.outputs['Displacement'], material_output.inputs['Displacement'])
        noise.inputs['Scale'].default_value = 5.0
        noise.inputs['Detail'].default_value = 16.0
        noise.inputs['Distortion'].keyframe_insert(data_path="default_value", frame=bpy.context.scene.frame_current)
        noise.inputs['Distortion'].default_value = 3.0
        noise.inputs['Distortion'].keyframe_insert(data_path="default_value", frame=bpy.context.scene.frame_current + 24)
        obj["glitch_intensity"] = 0.5
        obj["glitch_speed"] = 1.0

    def add_glow_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Glow_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        emission = nodes.new(type='ShaderNodeEmission')
        output = nodes.get('Material Output')
        tree.links.new(emission.outputs['Emission'], output.inputs['Surface'])
        emission.inputs['Strength'].default_value = 20.0

    def add_grain_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Grain_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        noise = nodes.new(type='ShaderNodeTexNoise')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(noise.outputs['Color'], principled.inputs['Base Color'])

    def add_hologram_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Hologram_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        emission = nodes.new(type='ShaderNodeEmission')
        wave = nodes.new(type='ShaderNodeTexWave')
        output = nodes.get('Material Output')
        tree.links.new(wave.outputs['Color'], emission.inputs['Color'])
        tree.links.new(emission.outputs['Emission'], output.inputs['Surface'])
        emission.inputs['Color'].default_value = (0.0, 1.0, 1.0, 1.0)
        emission.inputs['Strength'].default_value = 15.0

    def add_kirby_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Kirby_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs['Base Color'].default_value = (1.0, 0.6, 0.8, 1.0)
            principled.inputs['Subsurface'].default_value = 0.3

    def add_lens_distortion_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Lens_Distortion_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        lens_distortion = nodes.new(type='ShaderNodeLensDistortion')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(lens_distortion.outputs['Distorted'], principled.inputs['Base Color'])
        lens_distortion.inputs['Distortion'].default_value = 0.5

    def add_lens_flare_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Lens_Flare_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        glare = nodes.new(type='ShaderNodeGlare')
        glare.inputs['Size'].default_value = 10.0
        glare.inputs['Threshold'].default_value = 0.5
        output = nodes.get('Material Output')
        tree.links.new(glare.outputs['Image'], output.inputs['Surface'])

    def add_light_rays_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Light_Rays_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        light_rays = nodes.new(type='ShaderNodeLightRays')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(light_rays.outputs['Color'], principled.inputs['Base Color'])

    def add_noise_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Noise_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        noise = nodes.new(type='ShaderNodeTexNoise')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(noise.outputs['Color'], principled.inputs['Base Color'])

    def add_pixel_sort_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Pixel_Sort_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        pixel_sort = nodes.new(type='ShaderNodePixelSort')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(pixel_sort.outputs['Color'], principled.inputs['Base Color'])

    def add_pixelate_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Pixelate_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        brick = nodes.new(type='ShaderNodeTexBrick')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(brick.outputs['Color'], principled.inputs['Base Color'])

    def add_rainbow_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Rainbow_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        gradient = nodes.new(type='ShaderNodeTexGradient')
        color_ramp = nodes.new(type='ShaderNodeValToRGB')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(gradient.outputs['Color'], color_ramp.inputs['Fac'])
            tree.links.new(color_ramp.outputs['Color'], principled.inputs['Base Color'])

    def add_reflection_visual_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Reflection_Visual_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        mix = nodes.new(type='ShaderNodeMixShader')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(mix.outputs['Shader'], principled.inputs['Surface'])

    def add_sepia_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Sepia_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        mix = nodes.new(type='ShaderNodeMixRGB')
        mix.inputs['Fac'].default_value = 0.7
        mix.inputs['Color2'].default_value = (0.44, 0.26, 0.08, 1.0)
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(mix.outputs['Color'], principled.inputs['Base Color'])

    def add_shadow_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Shadow_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        mix = nodes.new(type='ShaderNodeMixRGB')
        mix.inputs['Fac'].default_value = 0.5
        mix.inputs['Color2'].default_value = (0.0, 0.0, 0.0, 1.0)
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(mix.outputs['Color'], principled.inputs['Base Color'])

    def add_sharpen_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Sharpen_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        sharpen = nodes.new(type='ShaderNodeTexBlur')
        sharpen.inputs['Size'].default_value = 0.1
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(sharpen.outputs['Color'], principled.inputs['Base Color'])

    def add_vignette_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Vignette_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        vignette = nodes.new(type='ShaderNodeVignette')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(vignette.outputs['Color'], principled.inputs['Base Color'])

    def add_wire_effect(self, obj):
        if not obj.material_slots:
            mat = bpy.data.materials.new(name="Wire_Material")
            obj.data.materials.append(mat)
        mat = obj.active_material
        mat.use_nodes = True
        tree = mat.node_tree
        nodes = tree.nodes
        wireframe = nodes.new(type='ShaderNodeWireframe')
        principled = nodes.get("Principled BSDF")
        if principled:
            tree.links.new(wireframe.outputs['Color'], principled.inputs['Base Color'])