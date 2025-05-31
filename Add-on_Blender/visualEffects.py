import bpy

class VisualEffects:
    def add_glow_effect(self, obj):
        """Añade efecto de brillo al objeto"""
        try:
            # Crear material emisivo
            if not obj.data.materials:
                mat = bpy.data.materials.new(name=f"{obj.name}_glow_material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True
            
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            
            # Verificar nodos existentes
            principled = nodes.get("Principled BSDF")
            material_output = nodes.get('Material Output')
            
            if not principled:
                principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            if not material_output:
                material_output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Añadir nodo de emisión
            emission = nodes.new(type='ShaderNodeEmission')
            emission.inputs['Color'].default_value = (0.8, 0.3, 1.0, 1.0)  # Color púrpura
            emission.inputs['Strength'].default_value = 2.0
            
            # Conectar emisión a la salida
            links.new(emission.outputs['Emission'], material_output.inputs['Surface'])
            
            # Configurar el objeto para que aparezca en el compositor
            obj['glow_intensity'] = 2.0
            
        except Exception as e:
            print(f"Error adding glow effect: {e}")

    def add_glitch_effect(self, obj):
        """Añade efecto de glitch al material del objeto"""
        try:
            if not obj.data.materials:
                mat = bpy.data.materials.new(name=f"{obj.name}_glitch_material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True
            
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            
            principled = nodes.get("Principled BSDF")
            if not principled:
                principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            
            # Crear textura de ruido para el glitch
            noise_texture = nodes.new(type='ShaderNodeTexNoise')
            noise_texture.inputs['Scale'].default_value = 100.0
            noise_texture.inputs['Detail'].default_value = 15.0
            
            # Separar RGB para manipular canales
            separate_rgb = nodes.new(type='ShaderNodeSeparateRGB')
            combine_rgb = nodes.new(type='ShaderNodeCombineRGB')
            
            # Conectar el ruido
            links.new(noise_texture.outputs['Color'], separate_rgb.inputs['Image'])
            links.new(separate_rgb.outputs['R'], combine_rgb.inputs['R'])
            links.new(separate_rgb.outputs['G'], combine_rgb.inputs['G'])
            links.new(separate_rgb.outputs['B'], combine_rgb.inputs['B'])
            links.new(combine_rgb.outputs['Image'], principled.inputs['Base Color'])
            
            # Propiedades personalizadas para animar
            obj["glitch_intensity"] = 1.0
            obj["glitch_speed"] = 2.0
            
        except Exception as e:
            print(f"Error adding glitch effect: {e}")

    def add_hologram_effect(self, obj):
        """Añade efecto de holograma al objeto"""
        try:
            if not obj.data.materials:
                mat = bpy.data.materials.new(name=f"{obj.name}_hologram_material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True
            
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            
            principled = nodes.get("Principled BSDF")
            if not principled:
                principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            
            # Configurar material holográfico
            principled.inputs['Base Color'].default_value = (0.2, 0.8, 1.0, 1.0)  # Azul cian
            principled.inputs['Metallic'].default_value = 0.0
            principled.inputs['Roughness'].default_value = 0.1
            principled.inputs['Transmission'].default_value = 0.8
            principled.inputs['Alpha'].default_value = 0.3
            
            # Configurar transparencia
            mat.blend_method = 'BLEND'
            mat.show_transparent_back = False
            
            # Añadir textura de ondas para el efecto holográfico
            wave_texture = nodes.new(type='ShaderNodeTexWave')
            wave_texture.inputs['Scale'].default_value = 5.0
            wave_texture.inputs['Distortion'].default_value = 2.0
            
            # Mezclar con el color base
            mix_rgb = nodes.new(type='ShaderNodeMixRGB')
            mix_rgb.blend_type = 'ADD'
            mix_rgb.inputs['Fac'].default_value = 0.3
            
            links.new(wave_texture.outputs['Color'], mix_rgb.inputs['Color2'])
            links.new(mix_rgb.outputs['Color'], principled.inputs['Emission'])
            
        except Exception as e:
            print(f"Error adding hologram effect: {e}")

    def setup_compositor_for_post_effects(self):
        """Configura el compositor para efectos de post-procesamiento"""
        try:
            scene = bpy.context.scene
            scene.use_nodes = True
            tree = scene.node_tree
            
            # Limpiar nodos existentes
            tree.nodes.clear()
            
            # Crear nodos básicos
            render_layers = tree.nodes.new(type='CompositorNodeRLayers')
            composite = tree.nodes.new(type='CompositorNodeComposite')
            
            # Posicionar nodos
            render_layers.location = (0, 0)
            composite.location = (600, 0)
            
            # Conectar básico
            tree.links.new(render_layers.outputs['Image'], composite.inputs['Image'])
            
            return tree, render_layers, composite
            
        except Exception as e:
            print(f"Error setting up compositor: {e}")
            return None, None, None

    def add_bloom_effect_compositor(self):
        """Añade efecto bloom usando el compositor"""
        try:
            tree, render_layers, composite = self.setup_compositor_for_post_effects()
            if not tree:
                return
            
            # Añadir nodo Glare para bloom
            glare = tree.nodes.new(type='CompositorNodeGlare')
            glare.glare_type = 'FOG_GLOW'
            glare.quality = 'HIGH'
            glare.threshold = 1.0
            glare.location = (300, 0)
            
            # Conectar
            tree.links.new(render_layers.outputs['Image'], glare.inputs['Image'])
            tree.links.new(glare.outputs['Image'], composite.inputs['Image'])
            
        except Exception as e:
            print(f"Error adding bloom effect: {e}")

    def add_vignette_effect_compositor(self):
        """Añade efecto viñeta usando el compositor"""
        try:
            tree, render_layers, composite = self.setup_compositor_for_post_effects()
            if not tree:
                return
            
            # Crear máscara para viñeta
            ellipse_mask = tree.nodes.new(type='CompositorNodeEllipseMask')
            ellipse_mask.width = 0.8
            ellipse_mask.height = 0.8
            ellipse_mask.location = (150, -200)
            
            # Invertir máscara
            invert = tree.nodes.new(type='CompositorNodeInvert')
            invert.location = (300, -200)
            
            # Difuminar máscara
            blur = tree.nodes.new(type='CompositorNodeBlur')
            blur.size_x = 50
            blur.size_y = 50
            blur.location = (450, -200)
            
            # Mezclar con la imagen
            mix = tree.nodes.new(type='CompositorNodeMixRGB')
            mix.blend_type = 'MULTIPLY'
            mix.location = (450, 0)
            
            # Conectar
            tree.links.new(ellipse_mask.outputs['Mask'], invert.inputs['Color'])
            tree.links.new(invert.outputs['Color'], blur.inputs['Image'])
            tree.links.new(render_layers.outputs['Image'], mix.inputs['Image'])
            tree.links.new(blur.outputs['Image'], mix.inputs['Image2'])
            tree.links.new(mix.outputs['Image'], composite.inputs['Image'])
            
        except Exception as e:
            print(f"Error adding vignette effect: {e}")

    def add_lens_distortion_effect_compositor(self):
        """Añade efecto de distorsión de lente usando el compositor"""
        try:
            tree, render_layers, composite = self.setup_compositor_for_post_effects()
            if not tree:
                return
            
            # Añadir nodo de distorsión de lente
            lens_distort = tree.nodes.new(type='CompositorNodeLensdist')
            lens_distort.inputs['Distort'].default_value = 0.1
            lens_distort.inputs['Dispersion'].default_value = 0.05
            lens_distort.location = (300, 0)
            
            # Conectar
            tree.links.new(render_layers.outputs['Image'], lens_distort.inputs['Image'])
            tree.links.new(lens_distort.outputs['Image'], composite.inputs['Image'])
            
        except Exception as e:
            print(f"Error adding lens distortion effect: {e}")

# Instancia singleton
visual_effects = VisualEffects()

def register():
    pass

def unregister():
    pass