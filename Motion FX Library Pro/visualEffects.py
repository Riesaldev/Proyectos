import bpy
import random
import mathutils

class VisualEffects:
    def add_glow_effect(self, obj):
        """Añade efecto de resplandor moderno con múltiples capas"""
        try:
            if not obj or obj.type != 'MESH':
                print("Glow effect only works on mesh objects")
                return False
            
            # Crear material con nodos avanzados
            if not obj.data.materials:
                glow_mat = bpy.data.materials.new(name="Advanced_Glow_Material")
                glow_mat.use_nodes = True
                obj.data.materials.append(glow_mat)
            else:
                glow_mat = obj.data.materials[0]
                if not glow_mat.use_nodes:
                    glow_mat.use_nodes = True
            
            nodes = glow_mat.node_tree.nodes
            links = glow_mat.node_tree.links
            
            # Limpiar nodos existentes excepto output
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear nodos avanzados
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            emission = nodes.new(type='ShaderNodeEmission')
            mix_shader = nodes.new(type='ShaderNodeMixShader')
            fresnel = nodes.new(type='ShaderNodeFresnel')
            color_ramp = nodes.new(type='ShaderNodeValToRGB')
            noise_texture = nodes.new(type='ShaderNodeTexNoise')
            mapping = nodes.new(type='ShaderNodeMapping')
            tex_coord = nodes.new(type='ShaderNodeTexCoord')
            
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Configurar conexiones avanzadas
            links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
            links.new(mapping.outputs['Vector'], noise_texture.inputs['Vector'])
            links.new(noise_texture.outputs['Color'], color_ramp.inputs['Fac'])
            links.new(fresnel.outputs['Fac'], mix_shader.inputs['Fac'])
            links.new(principled.outputs['BSDF'], mix_shader.inputs[1])
            links.new(emission.outputs['Emission'], mix_shader.inputs[2])
            links.new(mix_shader.outputs['Shader'], output.inputs['Surface'])
            
            # Configurar propiedades modernas
            principled.inputs["Base Color"].default_value = (0.1, 0.3, 1.0, 1.0)
            principled.inputs["Metallic"].default_value = 0.8
            principled.inputs["Roughness"].default_value = 0.2
            
            emission.inputs["Color"].default_value = (0.2, 0.6, 1.0, 1.0)
            emission.inputs["Strength"].default_value = 8.0
            
            # Configurar color ramp para efectos dinámicos
            color_ramp.color_ramp.elements[0].color = (0.0, 0.1, 0.5, 1.0)
            color_ramp.color_ramp.elements[1].color = (0.8, 1.0, 1.0, 1.0)
            
            # Configurar ruido para variación
            noise_texture.inputs['Scale'].default_value = 5.0
            noise_texture.inputs['Detail'].default_value = 15.0
            noise_texture.inputs['Roughness'].default_value = 0.5
            
            # Animar intensidad del glow
            current_frame = bpy.context.scene.frame_current
            emission.inputs["Strength"].default_value = 3.0
            emission.inputs["Strength"].keyframe_insert(data_path="default_value", frame=current_frame)
            emission.inputs["Strength"].default_value = 12.0
            emission.inputs["Strength"].keyframe_insert(data_path="default_value", frame=current_frame + 30)
            emission.inputs["Strength"].default_value = 3.0
            emission.inputs["Strength"].keyframe_insert(data_path="default_value", frame=current_frame + 60)
            
            print(f"Advanced glow effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding glow effect: {e}")
            return False

    def add_glitch_effect(self, obj):
        """Añade efecto de interferencia digital moderno"""
        try:
            if not obj or not hasattr(obj, 'location'):
                print("Object invalid for glitch effect")
                return False
            
            import random
            import mathutils
            
            current_frame = bpy.context.scene.frame_current
            original_loc = obj.location.copy()
            original_rot = obj.rotation_euler.copy()
            original_scale = obj.scale.copy()
            
            # Crear keyframes de interferencia más sofisticados
            glitch_frames = [0, 3, 6, 8, 12, 15, 18, 22, 25, 30]
            
            for i, frame_offset in enumerate(glitch_frames):
                frame = current_frame + frame_offset
                
                # Interferencia en posición
                if i % 3 == 0:  # Solo en algunos frames
                    glitch_intensity = random.uniform(0.1, 0.8)
                    offset = (
                        (random.random() - 0.5) * glitch_intensity,
                        (random.random() - 0.5) * glitch_intensity,
                        (random.random() - 0.5) * glitch_intensity * 0.5
                    )
                    obj.location = original_loc + mathutils.Vector(offset)
                    
                    # Interferencia en rotación
                    rot_glitch = (
                        original_rot.x + (random.random() - 0.5) * 0.3,
                        original_rot.y + (random.random() - 0.5) * 0.3,
                        original_rot.z + (random.random() - 0.5) * 0.2
                    )
                    obj.rotation_euler = rot_glitch
                    
                    # Interferencia en escala
                    scale_glitch = (
                        original_scale.x * random.uniform(0.95, 1.05),
                        original_scale.y * random.uniform(0.95, 1.05),
                        original_scale.z * random.uniform(0.98, 1.02)
                    )
                    obj.scale = scale_glitch
                else:
                    # Frames normales
                    obj.location = original_loc
                    obj.rotation_euler = original_rot
                    obj.scale = original_scale
                
                obj.keyframe_insert(data_path="location", frame=frame)
                obj.keyframe_insert(data_path="rotation_euler", frame=frame)
                obj.keyframe_insert(data_path="scale", frame=frame)
            
            # Volver a posición original al final
            obj.location = original_loc
            obj.rotation_euler = original_rot
            obj.scale = original_scale
            obj.keyframe_insert(data_path="location", frame=current_frame + 35)
            obj.keyframe_insert(data_path="rotation_euler", frame=current_frame + 35)
            obj.keyframe_insert(data_path="scale", frame=current_frame + 35)
            
            # Añadir material de interferencia si es mesh
            if obj.type == 'MESH':
                self._add_glitch_material(obj)
            
            print(f"Advanced glitch effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding glitch effect: {e}")
            return False
    
    def _add_glitch_material(self, obj):
        """Añade material de interferencia digital"""
        try:
            glitch_mat = bpy.data.materials.new(name="Glitch_Material")
            glitch_mat.use_nodes = True
            
            if not obj.data.materials:
                obj.data.materials.append(glitch_mat)
            else:
                obj.data.materials[0] = glitch_mat
            
            nodes = glitch_mat.node_tree.nodes
            links = glitch_mat.node_tree.links
            
            # Limpiar nodos
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear setup de glitch
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            voronoi = nodes.new(type='ShaderNodeTexVoronoi')
            color_ramp = nodes.new(type='ShaderNodeValToRGB')
            mapping = nodes.new(type='ShaderNodeMapping')
            tex_coord = nodes.new(type='ShaderNodeTexCoord')
            
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Conectar nodos
            links.new(tex_coord.outputs['UV'], mapping.inputs['Vector'])
            links.new(mapping.outputs['Vector'], voronoi.inputs['Vector'])
            links.new(voronoi.outputs['Distance'], color_ramp.inputs['Fac'])
            links.new(color_ramp.outputs['Color'], principled.inputs['Base Color'])
            links.new(color_ramp.outputs['Color'], principled.inputs['Emission'])
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
            
            # Configurar glitch colors
            color_ramp.color_ramp.elements[0].color = (1.0, 0.0, 0.5, 1.0)  # Magenta
            color_ramp.color_ramp.elements[1].color = (0.0, 1.0, 0.5, 1.0)  # Cyan
            
            principled.inputs["Emission Strength"].default_value = 2.0
            principled.inputs["Metallic"].default_value = 0.9
            principled.inputs["Roughness"].default_value = 0.1
            
            # Animar escala de voronoi para efecto de interferencia
            current_frame = bpy.context.scene.frame_current
            voronoi.inputs['Scale'].default_value = 10.0
            voronoi.inputs['Scale'].keyframe_insert(data_path="default_value", frame=current_frame)
            voronoi.inputs['Scale'].default_value = 50.0
            voronoi.inputs['Scale'].keyframe_insert(data_path="default_value", frame=current_frame + 20)
            
        except Exception as e:
            print(f"Error adding glitch material: {e}")

    def add_bloom_effect_compositor(self, obj):
        """Añade efecto bloom avanzado usando compositor"""
        try:
            # Habilitar compositor
            bpy.context.scene.use_nodes = True
            tree = bpy.context.scene.node_tree
            nodes = tree.nodes
            links = tree.links
            
            # Limpiar nodos existentes
            for node in nodes:
                nodes.remove(node)
            
            # Crear nodos avanzados
            render_layer = nodes.new(type='CompositorNodeRLayers')
            
            # Separar canales brillantes
            glare_1 = nodes.new(type='CompositorNodeGlare')
            glare_1.glare_type = 'FOG_GLOW'
            glare_1.quality = 'HIGH'
            glare_1.threshold = 0.6
            glare_1.size = 8
            
            # Segundo paso de bloom
            glare_2 = nodes.new(type='CompositorNodeGlare')
            glare_2.glare_type = 'STREAKS'
            glare_2.quality = 'HIGH'
            glare_2.streaks = 4
            glare_2.threshold = 0.8
            
            # Mezclar efectos
            mix_1 = nodes.new(type='CompositorNodeMixRGB')
            mix_1.blend_type = 'ADD'
            mix_1.inputs['Fac'].default_value = 0.7
            
            mix_2 = nodes.new(type='CompositorNodeMixRGB')
            mix_2.blend_type = 'SCREEN'
            mix_2.inputs['Fac'].default_value = 0.5
            
            # Corrección de color
            color_balance = nodes.new(type='CompositorNodeColorBalance')
            color_balance.correction_method = 'LIFT_GAMMA_GAIN'
            color_balance.gain = (1.1, 1.0, 0.9)
            
            # Saturación
            hue_sat = nodes.new(type='CompositorNodeHueSat')
            hue_sat.inputs['Saturation'].default_value = 1.3
            
            composite = nodes.new(type='CompositorNodeComposite')
            
            # Conectar nodos
            links.new(render_layer.outputs['Image'], glare_1.inputs['Image'])
            links.new(render_layer.outputs['Image'], glare_2.inputs['Image'])
            links.new(glare_1.outputs['Image'], mix_1.inputs['Image1'])
            links.new(glare_2.outputs['Image'], mix_1.inputs['Image2'])
            links.new(render_layer.outputs['Image'], mix_2.inputs['Image1'])
            links.new(mix_1.outputs['Image'], mix_2.inputs['Image2'])
            links.new(mix_2.outputs['Image'], color_balance.inputs['Image'])
            links.new(color_balance.outputs['Image'], hue_sat.inputs['Image'])
            links.new(hue_sat.outputs['Image'], composite.inputs['Image'])
            
            print(f"Advanced bloom effect added to compositor")
            return True
            
        except Exception as e:
            print(f"Error adding bloom effect: {e}")
            return False
    
    def add_chromatic_aberration_effect(self, obj):
        """Añade aberración cromática moderna"""
        try:
            bpy.context.scene.use_nodes = True
            tree = bpy.context.scene.node_tree
            nodes = tree.nodes
            links = tree.links
            
            # Buscar nodos existentes
            render_layer = None
            composite = None
            for node in nodes:
                if node.type == 'R_LAYERS':
                    render_layer = node
                elif node.type == 'COMPOSITE':
                    composite = node
            
            if not render_layer:
                render_layer = nodes.new(type='CompositorNodeRLayers')
            if not composite:
                composite = nodes.new(type='CompositorNodeComposite')
            
            # Crear separación RGB
            separate_rgb = nodes.new(type='CompositorNodeSeparateColor')
            combine_rgb = nodes.new(type='CompositorNodeCombineColor')
            
            # Transformaciones para cada canal
            transform_r = nodes.new(type='CompositorNodeTransform')
            transform_g = nodes.new(type='CompositorNodeTransform')
            transform_b = nodes.new(type='CompositorNodeTransform')
            
            # Configurar desplazamientos
            transform_r.inputs['X'].default_value = 2
            transform_r.inputs['Y'].default_value = 1
            transform_g.inputs['X'].default_value = 0
            transform_g.inputs['Y'].default_value = 0
            transform_b.inputs['X'].default_value = -2
            transform_b.inputs['Y'].default_value = -1
            
            # Conectar
            links.new(render_layer.outputs['Image'], separate_rgb.inputs['Image'])
            links.new(separate_rgb.outputs['Red'], transform_r.inputs['Image'])
            links.new(separate_rgb.outputs['Green'], transform_g.inputs['Image'])
            links.new(separate_rgb.outputs['Blue'], transform_b.inputs['Image'])
            links.new(transform_r.outputs['Image'], combine_rgb.inputs['Red'])
            links.new(transform_g.outputs['Image'], combine_rgb.inputs['Green'])
            links.new(transform_b.outputs['Image'], combine_rgb.inputs['Blue'])
            links.new(combine_rgb.outputs['Image'], composite.inputs['Image'])
            
            print(f"Chromatic aberration effect added")
            return True
            
        except Exception as e:
            print(f"Error adding chromatic aberration: {e}")
            return False
    
    def add_holographic_effect(self, obj):
        """Añade efecto holográfico moderno"""
        try:
            if not obj or obj.type != 'MESH':
                print("Holographic effect only works on mesh objects")
                return False
            
            # Crear material holográfico avanzado
            holo_mat = bpy.data.materials.new(name="Advanced_Holographic")
            holo_mat.use_nodes = True
            holo_mat.blend_method = 'BLEND'
            
            nodes = holo_mat.node_tree.nodes
            links = holo_mat.node_tree.links
            
            # Limpiar nodos
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear setup holográfico
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            emission = nodes.new(type='ShaderNodeEmission')
            transparent = nodes.new(type='ShaderNodeBsdfTransparent')
            mix_1 = nodes.new(type='ShaderNodeMixShader')
            mix_2 = nodes.new(type='ShaderNodeMixShader')
            fresnel = nodes.new(type='ShaderNodeFresnel')
            wave_texture = nodes.new(type='ShaderNodeTexWave')
            color_ramp = nodes.new(type='ShaderNodeValToRGB')
            mapping = nodes.new(type='ShaderNodeMapping')
            tex_coord = nodes.new(type='ShaderNodeTexCoord')
            
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Configurar wave texture para patrones holográficos
            wave_texture.wave_type = 'RINGS'
            wave_texture.rings_direction = 'Z'
            wave_texture.inputs['Scale'].default_value = 20.0
            wave_texture.inputs['Distortion'].default_value = 5.0
            
            # Configurar color ramp
            color_ramp.color_ramp.elements[0].color = (0.0, 0.8, 1.0, 1.0)
            color_ramp.color_ramp.elements[1].color = (1.0, 0.2, 0.8, 1.0)
            
            # Conectar nodos
            links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
            links.new(mapping.outputs['Vector'], wave_texture.inputs['Vector'])
            links.new(wave_texture.outputs['Color'], color_ramp.inputs['Fac'])
            links.new(color_ramp.outputs['Color'], emission.inputs['Color'])
            links.new(color_ramp.outputs['Color'], principled.inputs['Base Color'])
            
            links.new(fresnel.outputs['Fac'], mix_1.inputs['Fac'])
            links.new(transparent.outputs['BSDF'], mix_1.inputs[1])
            links.new(principled.outputs['BSDF'], mix_1.inputs[2])
            
            links.new(wave_texture.outputs['Color'], mix_2.inputs['Fac'])
            links.new(mix_1.outputs['Shader'], mix_2.inputs[1])
            links.new(emission.outputs['Emission'], mix_2.inputs[2])
            
            links.new(mix_2.outputs['Shader'], output.inputs['Surface'])
            
            # Configurar propiedades
            principled.inputs["Transmission"].default_value = 0.9
            principled.inputs["Alpha"].default_value = 0.3
            emission.inputs["Strength"].default_value = 3.0
            fresnel.inputs["IOR"].default_value = 1.8
            
            # Aplicar material
            if not obj.data.materials:
                obj.data.materials.append(holo_mat)
            else:
                obj.data.materials[0] = holo_mat
            
            # Animar distorsión para efecto dinámico
            current_frame = bpy.context.scene.frame_current
            wave_texture.inputs['Distortion'].default_value = 0.0
            wave_texture.inputs['Distortion'].keyframe_insert(data_path="default_value", frame=current_frame)
            wave_texture.inputs['Distortion'].default_value = 10.0
            wave_texture.inputs['Distortion'].keyframe_insert(data_path="default_value", frame=current_frame + 60)
            
            print(f"Advanced holographic effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding holographic effect: {e}")
            return False
    
    def add_cyberpunk_effect(self, obj):
        """Añade efecto cyberpunk moderno con elementos neón y glitch"""
        try:
            if not obj or obj.type != 'MESH':
                print("Cyberpunk effect only works on mesh objects")
                return False
            
            # Crear material cyberpunk avanzado
            cyber_mat = bpy.data.materials.new(name="Cyberpunk_Material")
            cyber_mat.use_nodes = True
            cyber_mat.blend_method = 'BLEND'
            
            nodes = cyber_mat.node_tree.nodes
            links = cyber_mat.node_tree.links
            
            # Limpiar nodos
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear setup cyberpunk complejo
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            emission = nodes.new(type='ShaderNodeEmission')
            mix_shader = nodes.new(type='ShaderNodeMixShader')
            
            # Texturas procedurales
            voronoi = nodes.new(type='ShaderNodeTexVoronoi')
            noise = nodes.new(type='ShaderNodeTexNoise')
            color_ramp_1 = nodes.new(type='ShaderNodeValToRGB')
            color_ramp_2 = nodes.new(type='ShaderNodeValToRGB')
            
            # Coordenadas y transformaciones
            tex_coord = nodes.new(type='ShaderNodeTexCoord')
            mapping = nodes.new(type='ShaderNodeMapping')
            
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Configurar colores cyberpunk
            color_ramp_1.color_ramp.elements[0].color = (1.0, 0.0, 1.0, 1.0)  # Magenta
            color_ramp_1.color_ramp.elements[1].color = (0.0, 1.0, 1.0, 1.0)  # Cyan
            
            color_ramp_2.color_ramp.elements[0].color = (0.0, 0.0, 0.0, 1.0)  # Negro
            color_ramp_2.color_ramp.elements[1].color = (0.0, 0.8, 1.0, 1.0)  # Azul brillante
            
            # Conectar nodos
            links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
            links.new(mapping.outputs['Vector'], voronoi.inputs['Vector'])
            links.new(mapping.outputs['Vector'], noise.inputs['Vector'])
            links.new(voronoi.outputs['Distance'], color_ramp_1.inputs['Fac'])
            links.new(noise.outputs['Color'], color_ramp_2.inputs['Fac'])
            
            links.new(color_ramp_1.outputs['Color'], principled.inputs['Base Color'])
            links.new(color_ramp_2.outputs['Color'], emission.inputs['Color'])
            links.new(color_ramp_1.outputs['Color'], mix_shader.inputs['Fac'])
            
            links.new(principled.outputs['BSDF'], mix_shader.inputs[1])
            links.new(emission.outputs['Emission'], mix_shader.inputs[2])
            links.new(mix_shader.outputs['Shader'], output.inputs['Surface'])
            
            # Configurar propiedades
            principled.inputs["Metallic"].default_value = 0.9
            principled.inputs["Roughness"].default_value = 0.1
            principled.inputs["Transmission"].default_value = 0.3
            
            emission.inputs["Strength"].default_value = 5.0
            
            voronoi.inputs['Scale'].default_value = 20.0
            noise.inputs['Scale'].default_value = 15.0
            noise.inputs['Detail'].default_value = 10.0
            
            # Aplicar material
            if not obj.data.materials:
                obj.data.materials.append(cyber_mat)
            else:
                obj.data.materials[0] = cyber_mat
            
            # Animar efectos
            current_frame = bpy.context.scene.frame_current
            voronoi.inputs['Scale'].keyframe_insert(data_path="default_value", frame=current_frame)
            voronoi.inputs['Scale'].default_value = 50.0
            voronoi.inputs['Scale'].keyframe_insert(data_path="default_value", frame=current_frame + 120)
            
            print(f"Advanced cyberpunk effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding cyberpunk effect: {e}")
            return False
    
    def add_volumetric_fog_effect(self, obj):
        """Añade niebla volumétrica avanzada"""
        try:
            # Crear objeto para volumen
            bpy.ops.mesh.primitive_cube_add(size=10, location=obj.location)
            fog_obj = bpy.context.active_object
            fog_obj.name = f"Volumetric_Fog_{obj.name}"
            
            # Crear material volumétrico
            fog_mat = bpy.data.materials.new(name="Volumetric_Fog")
            fog_mat.use_nodes = True
            
            nodes = fog_mat.node_tree.nodes
            links = fog_mat.node_tree.links
            
            # Limpiar nodos
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear shader volumétrico
            volume_scatter = nodes.new(type='ShaderNodeVolumeScatter')
            volume_absorption = nodes.new(type='ShaderNodeVolumeAbsorption')
            mix_volume = nodes.new(type='ShaderNodeMixShader')
            
            # Texturas para variación
            noise_texture = nodes.new(type='ShaderNodeTexNoise')
            color_ramp = nodes.new(type='ShaderNodeValToRGB')
            tex_coord = nodes.new(type='ShaderNodeTexCoord')
            
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Conectar nodos
            links.new(tex_coord.outputs['Generated'], noise_texture.inputs['Vector'])
            links.new(noise_texture.outputs['Color'], color_ramp.inputs['Fac'])
            links.new(color_ramp.outputs['Color'], volume_scatter.inputs['Density'])
            links.new(color_ramp.outputs['Color'], volume_absorption.inputs['Density'])
            
            links.new(volume_scatter.outputs['Volume'], mix_volume.inputs[1])
            links.new(volume_absorption.outputs['Volume'], mix_volume.inputs[2])
            links.new(mix_volume.outputs['Shader'], output.inputs['Volume'])
            
            # Configurar propiedades
            volume_scatter.inputs["Color"].default_value = (0.8, 0.9, 1.0, 1.0)
            volume_scatter.inputs["Anisotropy"].default_value = 0.2
            
            volume_absorption.inputs["Color"].default_value = (0.5, 0.7, 1.0, 1.0)
            
            noise_texture.inputs['Scale'].default_value = 3.0
            noise_texture.inputs['Detail'].default_value = 8.0
            
            color_ramp.color_ramp.elements[0].color = (0.0, 0.0, 0.0, 1.0)
            color_ramp.color_ramp.elements[1].color = (0.5, 0.5, 0.5, 1.0)
            
            # Aplicar material
            fog_obj.data.materials.append(fog_mat)
            
            print(f"Volumetric fog effect added near {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding volumetric fog effect: {e}")
            return False
    
    def add_energy_shield_effect(self, obj):
        """Añade efecto de escudo de energía futurista"""
        try:
            if not obj or obj.type != 'MESH':
                print("Energy shield effect only works on mesh objects")
                return False
            
            # Duplicar objeto para crear escudo
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            bpy.ops.object.duplicate()
            shield_obj = bpy.context.active_object
            shield_obj.name = f"Energy_Shield_{obj.name}"
            
            # Escalar ligeramente el escudo
            shield_obj.scale = (1.1, 1.1, 1.1)
            
            # Crear material de escudo
            shield_mat = bpy.data.materials.new(name="Energy_Shield")
            shield_mat.use_nodes = True
            shield_mat.blend_method = 'BLEND'
            
            nodes = shield_mat.node_tree.nodes
            links = shield_mat.node_tree.links
            
            # Limpiar nodos
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear setup de escudo energético
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            emission = nodes.new(type='ShaderNodeEmission')
            transparent = nodes.new(type='ShaderNodeBsdfTransparent')
            mix_1 = nodes.new(type='ShaderNodeMixShader')
            mix_2 = nodes.new(type='ShaderNodeMixShader')
            
            # Efectos procedurales
            fresnel = nodes.new(type='ShaderNodeFresnel')
            layer_weight = nodes.new(type='ShaderNodeLayerWeight')
            noise_texture = nodes.new(type='ShaderNodeTexNoise')
            voronoi = nodes.new(type='ShaderNodeTexVoronoi')
            color_ramp = nodes.new(type='ShaderNodeValToRGB')
            
            tex_coord = nodes.new(type='ShaderNodeTexCoord')
            mapping = nodes.new(type='ShaderNodeMapping')
            
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Configurar texturas
            noise_texture.inputs['Scale'].default_value = 25.0
            voronoi.inputs['Scale'].default_value = 15.0
            voronoi.voronoi_dimensions = '4D'
            
            # Configurar color ramp para energía
            color_ramp.color_ramp.elements[0].color = (0.0, 0.3, 1.0, 1.0)
            color_ramp.color_ramp.elements[1].color = (0.8, 1.0, 1.0, 1.0)
            
            # Conectar nodos
            links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
            links.new(mapping.outputs['Vector'], noise_texture.inputs['Vector'])
            links.new(mapping.outputs['Vector'], voronoi.inputs['Vector'])
            
            links.new(voronoi.outputs['Distance'], color_ramp.inputs['Fac'])
            links.new(color_ramp.outputs['Color'], emission.inputs['Color'])
            links.new(color_ramp.outputs['Color'], principled.inputs['Base Color'])
            
            links.new(fresnel.outputs['Fac'], mix_1.inputs['Fac'])
            links.new(transparent.outputs['BSDF'], mix_1.inputs[1])
            links.new(principled.outputs['BSDF'], mix_1.inputs[2])
            
            links.new(layer_weight.outputs['Fresnel'], mix_2.inputs['Fac'])
            links.new(mix_1.outputs['Shader'], mix_2.inputs[1])
            links.new(emission.outputs['Emission'], mix_2.inputs[2])
            
            links.new(mix_2.outputs['Shader'], output.inputs['Surface'])
            
            # Configurar propiedades
            principled.inputs["Transmission"].default_value = 0.9
            principled.inputs["Alpha"].default_value = 0.3
            principled.inputs["IOR"].default_value = 1.45
            
            emission.inputs["Strength"].default_value = 8.0
            fresnel.inputs["IOR"].default_value = 1.45
            layer_weight.inputs["Blend"].default_value = 0.5
            
            # Aplicar material
            shield_obj.data.materials.clear()
            shield_obj.data.materials.append(shield_mat)
            
            # Animar efectos del escudo
            current_frame = bpy.context.scene.frame_current
            
            # Animación de la textura
            mapping.inputs['Location'].default_value[2] = 0.0
            mapping.inputs['Location'].keyframe_insert(data_path="default_value", index=2, frame=current_frame)
            mapping.inputs['Location'].default_value[2] = 5.0
            mapping.inputs['Location'].keyframe_insert(data_path="default_value", index=2, frame=current_frame + 100)
            
            # Pulsación de energía
            emission.inputs["Strength"].default_value = 5.0
            emission.inputs["Strength"].keyframe_insert(data_path="default_value", frame=current_frame)
            emission.inputs["Strength"].default_value = 15.0
            emission.inputs["Strength"].keyframe_insert(data_path="default_value", frame=current_frame + 25)
            emission.inputs["Strength"].default_value = 5.0
            emission.inputs["Strength"].keyframe_insert(data_path="default_value", frame=current_frame + 50)
            
            print(f"Energy shield effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding energy shield effect: {e}")
            return False

visual_effects = VisualEffects()

def register():
    print("MotionFX: Advanced visual effects module loaded")

def unregister():
    print("MotionFX: Advanced visual effects module unloaded")