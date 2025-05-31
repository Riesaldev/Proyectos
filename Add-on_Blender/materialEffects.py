import bpy

class MaterialEffects:

    def ensure_material_nodes(self, obj):
        """Asegura que el objeto tenga un material con nodos habilitados"""
        if not obj.data.materials:
            mat = bpy.data.materials.new(name=f"{obj.name}_Material")
            mat.use_nodes = True
            obj.data.materials.append(mat)
        else:
            mat = obj.active_material
            if not mat:
                mat = bpy.data.materials.new(name=f"{obj.name}_Material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
                obj.active_material = mat
            elif not mat.use_nodes:
                mat.use_nodes = True
        
        return mat

    def get_or_create_node(self, nodes, node_type, node_name=None):
        """Obtiene un nodo existente o crea uno nuevo"""
        if node_name:
            node = nodes.get(node_name)
            if node:
                return node
        
        # Buscar por tipo si no se encontró por nombre
        for node in nodes:
            if node.type == node_type.replace('ShaderNode', '').replace('Shader', '').upper():
                return node
        
        # Crear nuevo nodo si no existe
        return nodes.new(type=node_type)

    def add_dissolve_effect(self, obj):
        """Añade efecto de disolución al material"""
        try:
            mat = self.ensure_material_nodes(obj)
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links

            # Obtener o crear nodos necesarios
            principled = self.get_or_create_node(nodes, 'ShaderNodeBsdfPrincipled', 'Principled BSDF')
            material_output = self.get_or_create_node(nodes, 'ShaderNodeOutputMaterial', 'Material Output')
            
            # Crear textura de ruido para la disolución
            noise_texture = nodes.new(type='ShaderNodeTexNoise')
            noise_texture.inputs['Scale'].default_value = 10.0
            noise_texture.inputs['Detail'].default_value = 2.0
            
            # Crear nodo ColorRamp para controlar el threshold
            colorramp = nodes.new(type='ShaderNodeValToRGB')
            colorramp.color_ramp.elements[0].position = 0.3
            colorramp.color_ramp.elements[1].position = 0.7
            
            # Conectar nodos
            links.new(noise_texture.outputs['Fac'], colorramp.inputs['Fac'])
            links.new(colorramp.outputs['Color'], principled.inputs['Alpha'])
            links.new(principled.outputs['BSDF'], material_output.inputs['Surface'])
            
            # Configurar transparencia
            mat.blend_method = 'CLIP'
            mat.alpha_threshold = 0.5
            
            # Añadir propiedad personalizada para animar
            obj['dissolve_threshold'] = 0.5
            
        except Exception as e:
            print(f"Error adding dissolve effect: {e}")

    def add_hologram_effect(self, obj):
        """Añade efecto de holograma al material"""
        try:
            mat = self.ensure_material_nodes(obj)
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links

            # Obtener o crear nodos necesarios
            principled = self.get_or_create_node(nodes, 'ShaderNodeBsdfPrincipled', 'Principled BSDF')
            material_output = self.get_or_create_node(nodes, 'ShaderNodeOutputMaterial', 'Material Output')
            
            # Configurar material base holográfico
            principled.inputs['Base Color'].default_value = (0.2, 0.8, 1.0, 1.0)
            principled.inputs['Metallic'].default_value = 0.0
            principled.inputs['Roughness'].default_value = 0.1
            principled.inputs['Transmission'].default_value = 0.8
            principled.inputs['Alpha'].default_value = 0.3
            
            # Crear textura de ondas para el efecto
            wave_texture = nodes.new(type='ShaderNodeTexWave')
            wave_texture.inputs['Scale'].default_value = 5.0
            wave_texture.inputs['Distortion'].default_value = 2.0
            wave_texture.inputs['Detail'].default_value = 2.0
            
            # Crear nodo de emisión para el brillo
            emission = nodes.new(type='ShaderNodeEmission')
            emission.inputs['Color'].default_value = (0.3, 0.9, 1.0, 1.0)
            emission.inputs['Strength'].default_value = 2.0
            
            # Mezclar emisión con el color base
            mix_shader = nodes.new(type='ShaderNodeMixShader')
            mix_shader.inputs['Fac'].default_value = 0.3
            
            # Conectar nodos
            links.new(wave_texture.outputs['Color'], emission.inputs['Color'])
            links.new(principled.outputs['BSDF'], mix_shader.inputs[1])
            links.new(emission.outputs['Emission'], mix_shader.inputs[2])
            links.new(mix_shader.outputs['Shader'], material_output.inputs['Surface'])
            
            # Configurar transparencia
            mat.blend_method = 'BLEND'
            mat.show_transparent_back = False
            
        except Exception as e:
            print(f"Error adding hologram effect: {e}")

    def add_glass_effect(self, obj):
        """Añade efecto de vidrio al material"""
        try:
            mat = self.ensure_material_nodes(obj)
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links

            # Obtener o crear nodos necesarios
            principled = self.get_or_create_node(nodes, 'ShaderNodeBsdfPrincipled', 'Principled BSDF')
            material_output = self.get_or_create_node(nodes, 'ShaderNodeOutputMaterial', 'Material Output')
            
            # Configurar propiedades de vidrio
            principled.inputs['Base Color'].default_value = (1.0, 1.0, 1.0, 1.0)
            principled.inputs['Metallic'].default_value = 0.0
            principled.inputs['Roughness'].default_value = 0.0
            principled.inputs['Transmission'].default_value = 1.0
            principled.inputs['IOR'].default_value = 1.45  # Índice de refracción del vidrio
            principled.inputs['Alpha'].default_value = 0.1
            
            # Añadir textura de ruido sutil para realismo
            noise_texture = nodes.new(type='ShaderNodeTexNoise')
            noise_texture.inputs['Scale'].default_value = 100.0
            noise_texture.inputs['Detail'].default_value = 0.0
            noise_texture.inputs['Roughness'].default_value = 0.0
            
            # Crear ColorRamp para controlar la intensidad del ruido
            colorramp = nodes.new(type='ShaderNodeValToRGB')
            colorramp.color_ramp.elements[0].position = 0.45
            colorramp.color_ramp.elements[1].position = 0.55
            
            # Conectar el ruido a la rugosidad para variación sutil
            links.new(noise_texture.outputs['Fac'], colorramp.inputs['Fac'])
            links.new(colorramp.outputs['Color'], principled.inputs['Roughness'])
            links.new(principled.outputs['BSDF'], material_output.inputs['Surface'])
            
            # Configurar transparencia
            mat.blend_method = 'BLEND'
            mat.use_screen_refraction = True  # Para Eevee
            
        except Exception as e:
            print(f"Error adding glass effect: {e}")

    def add_metal_effect(self, obj):
        """Añade efecto metálico al material"""
        try:
            mat = self.ensure_material_nodes(obj)
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links

            # Obtener o crear nodos necesarios
            principled = self.get_or_create_node(nodes, 'ShaderNodeBsdfPrincipled', 'Principled BSDF')
            material_output = self.get_or_create_node(nodes, 'ShaderNodeOutputMaterial', 'Material Output')
            
            # Configurar propiedades metálicas
            principled.inputs['Base Color'].default_value = (0.8, 0.8, 0.9, 1.0)  # Color metálico
            principled.inputs['Metallic'].default_value = 1.0
            principled.inputs['Roughness'].default_value = 0.2
            
            # Añadir textura de ruido para variación de rugosidad
            noise_texture = nodes.new(type='ShaderNodeTexNoise')
            noise_texture.inputs['Scale'].default_value = 50.0
            noise_texture.inputs['Detail'].default_value = 2.0
            
            # Crear Math node para combinar rugosidad base con variación
            math_add = nodes.new(type='ShaderNodeMath')
            math_add.operation = 'ADD'
            math_add.inputs[0].default_value = 0.1  # Rugosidad base
            
            # Crear ColorRamp para controlar la variación
            colorramp = nodes.new(type='ShaderNodeValToRGB')
            colorramp.color_ramp.elements[0].position = 0.4
            colorramp.color_ramp.elements[1].position = 0.6
            
            # Conectar nodos
            links.new(noise_texture.outputs['Fac'], colorramp.inputs['Fac'])
            links.new(colorramp.outputs['Color'], math_add.inputs[1])
            links.new(math_add.outputs['Value'], principled.inputs['Roughness'])
            links.new(principled.outputs['BSDF'], material_output.inputs['Surface'])
            
        except Exception as e:
            print(f"Error adding metal effect: {e}")

    def add_emission_effect(self, obj):
        """Añade efecto de emisión al material"""
        try:
            mat = self.ensure_material_nodes(obj)
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links

            # Obtener o crear nodos necesarios
            principled = self.get_or_create_node(nodes, 'ShaderNodeBsdfPrincipled', 'Principled BSDF')
            material_output = self.get_or_create_node(nodes, 'ShaderNodeOutputMaterial', 'Material Output')
            
            # Configurar emisión
            principled.inputs['Emission'].default_value = (1.0, 0.5, 0.2, 1.0)  # Color naranja cálido
            principled.inputs['Emission Strength'].default_value = 5.0
            
            # Añadir textura para variación de emisión
            noise_texture = nodes.new(type='ShaderNodeTexNoise')
            noise_texture.inputs['Scale'].default_value = 5.0
            noise_texture.inputs['Detail'].default_value = 2.0
            
            # Crear Math node para modular la intensidad
            math_multiply = nodes.new(type='ShaderNodeMath')
            math_multiply.operation = 'MULTIPLY'
            math_multiply.inputs[0].default_value = 3.0  # Intensidad base
            
            # Conectar variación a la fuerza de emisión
            links.new(noise_texture.outputs['Fac'], math_multiply.inputs[1])
            links.new(math_multiply.outputs['Value'], principled.inputs['Emission Strength'])
            links.new(principled.outputs['BSDF'], material_output.inputs['Surface'])
            
            # Propiedad personalizada para animación
            obj['emission_strength'] = 5.0
            
        except Exception as e:
            print(f"Error adding emission effect: {e}")

    def add_fabric_effect(self, obj):
        """Añade efecto de tela al material"""
        try:
            mat = self.ensure_material_nodes(obj)
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links

            # Obtener o crear nodos necesarios
            principled = self.get_or_create_node(nodes, 'ShaderNodeBsdfPrincipled', 'Principled BSDF')
            material_output = self.get_or_create_node(nodes, 'ShaderNodeOutputMaterial', 'Material Output')
            
            # Configurar propiedades de tela
            principled.inputs['Base Color'].default_value = (0.6, 0.4, 0.3, 1.0)  # Color tela
            principled.inputs['Roughness'].default_value = 0.8
            principled.inputs['Subsurface'].default_value = 0.1  # Subsurface scattering sutil
            
            # Crear textura de ondas para simular la trama
            wave_texture1 = nodes.new(type='ShaderNodeTexWave')
            wave_texture1.inputs['Scale'].default_value = 20.0
            wave_texture1.wave_type = 'BANDS'
            
            wave_texture2 = nodes.new(type='ShaderNodeTexWave')
            wave_texture2.inputs['Scale'].default_value = 20.0
            wave_texture2.inputs['Distortion'].default_value = 1.0
            wave_texture2.wave_type = 'RINGS'
            
            # Combinar las texturas
            mix_node = nodes.new(type='ShaderNodeMixRGB')
            mix_node.blend_type = 'MULTIPLY'
            mix_node.inputs['Fac'].default_value = 0.5
            
            # Conectar al bump para dar textura
            bump_node = nodes.new(type='ShaderNodeBump')
            bump_node.inputs['Strength'].default_value = 0.1
            
            # Conectar nodos
            links.new(wave_texture1.outputs['Color'], mix_node.inputs['Color1'])
            links.new(wave_texture2.outputs['Color'], mix_node.inputs['Color2'])
            links.new(mix_node.outputs['Color'], bump_node.inputs['Height'])
            links.new(bump_node.outputs['Normal'], principled.inputs['Normal'])
            links.new(principled.outputs['BSDF'], material_output.inputs['Surface'])
            
        except Exception as e:
            print(f"Error adding fabric effect: {e}")

# Instancia singleton
material_effects = MaterialEffects()

def register():
    pass

def unregister():
    pass