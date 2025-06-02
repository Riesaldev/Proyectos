import bpy

class MaterialEffects:
    def _ensure_material_nodes(self, obj, material_name):
        """Asegurar que el objeto tenga un material con nodos"""
        if not obj.data.materials:
            mat = bpy.data.materials.new(name=material_name)
            mat.use_nodes = True
            obj.data.materials.append(mat)
        else:
            mat = obj.data.materials[0]
            if not mat.use_nodes:
                mat.use_nodes = True
        
        # Asegurar que tiene nodos básicos
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        
        if not nodes.get("Principled BSDF"):
            # Limpiar y recrear estructura básica
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        
        return mat

    def add_glass_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Glass effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Glass_Material")
            nodes = mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            
            if principled:
                principled.inputs["Base Color"].default_value = (0.9, 0.9, 1.0, 1.0)
                principled.inputs["Metallic"].default_value = 0.0
                principled.inputs["Roughness"].default_value = 0.0
                principled.inputs["Transmission"].default_value = 1.0
                principled.inputs["IOR"].default_value = 1.5
                mat.blend_method = 'BLEND'
            
            print(f"Glass effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding glass effect: {e}")

    def add_metal_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Metal effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Metal_Material")
            nodes = mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            
            if principled:
                principled.inputs["Base Color"].default_value = (0.7, 0.7, 0.8, 1.0)
                principled.inputs["Metallic"].default_value = 1.0
                principled.inputs["Roughness"].default_value = 0.2
            
            print(f"Metal effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding metal effect: {e}")

    def add_hologram_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Hologram effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Hologram_Material")
            nodes = mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            
            if principled:
                principled.inputs["Base Color"].default_value = (0.0, 0.8, 1.0, 1.0)
                principled.inputs["Emission"].default_value = (0.0, 0.8, 1.0, 1.0)
                principled.inputs["Emission Strength"].default_value = 2.0
                principled.inputs["Alpha"].default_value = 0.7
                principled.inputs["Transmission"].default_value = 0.5
                mat.blend_method = 'BLEND'
            
            print(f"Hologram effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding hologram effect: {e}")

    def add_emission_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Emission effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Emission_Material")
            nodes = mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            
            if principled:
                principled.inputs["Emission"].default_value = (1.0, 0.5, 0.0, 1.0)
                principled.inputs["Emission Strength"].default_value = 5.0
            
            print(f"Emission effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding emission effect: {e}")

    def add_dissolve_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Dissolve effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Dissolve_Material")
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            principled = nodes.get("Principled BSDF")
            
            if principled:
                # Crear nodo de ruido para disolución
                noise_texture = nodes.new(type='ShaderNodeTexNoise')
                noise_texture.inputs['Scale'].default_value = 10.0
                
                # Conectar al alpha
                links.new(noise_texture.outputs['Color'], principled.inputs['Alpha'])
                mat.blend_method = 'BLEND'
                
                # Animar la disolución
                current_frame = bpy.context.scene.frame_current
                noise_texture.inputs['Detail'].default_value = 0.0
                noise_texture.inputs['Detail'].keyframe_insert(data_path="default_value", frame=current_frame)
                noise_texture.inputs['Detail'].default_value = 5.0
                noise_texture.inputs['Detail'].keyframe_insert(data_path="default_value", frame=current_frame + 60)
            
            print(f"Dissolve effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding dissolve effect: {e}")

    def add_fabric_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Fabric effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Fabric_Material")
            nodes = mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            
            if principled:
                principled.inputs["Base Color"].default_value = (0.8, 0.6, 0.4, 1.0)
                principled.inputs["Roughness"].default_value = 0.8
                principled.inputs["Subsurface"].default_value = 0.1
            
            print(f"Fabric effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fabric effect: {e}")

    def add_carbon_fiber_effect(self, obj):
        """Añade material de fibra de carbono realista"""
        try:
            if obj.type != 'MESH':
                print("Carbon fiber effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Carbon_Fiber_Material")
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            principled = nodes.get("Principled BSDF")
            
            if principled:
                # Crear texturas procedurales para fibra de carbono
                wave_texture_1 = nodes.new(type='ShaderNodeTexWave')
                wave_texture_2 = nodes.new(type='ShaderNodeTexWave')
                mix_rgb = nodes.new(type='ShaderNodeMixRGB')
                color_ramp = nodes.new(type='ShaderNodeValToRGB')
                mapping = nodes.new(type='ShaderNodeMapping')
                tex_coord = nodes.new(type='ShaderNodeTexCoord')
                
                # Configurar primera onda (fibras horizontales)
                wave_texture_1.wave_type = 'BANDS'
                wave_texture_1.bands_direction = 'X'
                wave_texture_1.inputs['Scale'].default_value = 100.0
                wave_texture_1.inputs['Distortion'].default_value = 0.0
                
                # Configurar segunda onda (fibras verticales)
                wave_texture_2.wave_type = 'BANDS'
                wave_texture_2.bands_direction = 'Y'
                wave_texture_2.inputs['Scale'].default_value = 100.0
                wave_texture_2.inputs['Distortion'].default_value = 0.0
                
                # Mezclar las ondas
                mix_rgb.blend_type = 'MULTIPLY'
                mix_rgb.inputs['Fac'].default_value = 0.5
                
                # Color ramp para contraste
                color_ramp.color_ramp.elements[0].color = (0.05, 0.05, 0.05, 1.0)
                color_ramp.color_ramp.elements[1].color = (0.15, 0.15, 0.15, 1.0)
                
                # Conectar nodos
                links.new(tex_coord.outputs['UV'], mapping.inputs['Vector'])
                links.new(mapping.outputs['Vector'], wave_texture_1.inputs['Vector'])
                links.new(mapping.outputs['Vector'], wave_texture_2.inputs['Vector'])
                links.new(wave_texture_1.outputs['Color'], mix_rgb.inputs['Color1'])
                links.new(wave_texture_2.outputs['Color'], mix_rgb.inputs['Color2'])
                links.new(mix_rgb.outputs['Color'], color_ramp.inputs['Fac'])
                links.new(color_ramp.outputs['Color'], principled.inputs['Base Color'])
                links.new(color_ramp.outputs['Color'], principled.inputs['Roughness'])
                
                # Configurar propiedades PBR
                principled.inputs["Metallic"].default_value = 0.2
                principled.inputs["Specular"].default_value = 0.8
                principled.inputs["Anisotropic"].default_value = 0.8
            
            print(f"Carbon fiber effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding carbon fiber effect: {e}")
    
    def add_liquid_metal_effect(self, obj):
        """Añade efecto de metal líquido con animación"""
        try:
            if obj.type != 'MESH':
                print("Liquid metal effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Liquid_Metal_Material")
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            principled = nodes.get("Principled BSDF")
            
            if principled:
                # Crear setup para metal líquido
                noise_texture_1 = nodes.new(type='ShaderNodeTexNoise')
                noise_texture_2 = nodes.new(type='ShaderNodeTexNoise')
                voronoi = nodes.new(type='ShaderNodeTexVoronoi')
                color_ramp_1 = nodes.new(type='ShaderNodeValToRGB')
                color_ramp_2 = nodes.new(type='ShaderNodeValToRGB')
                mix_rgb = nodes.new(type='ShaderNodeMixRGB')
                mapping = nodes.new(type='ShaderNodeMapping')
                tex_coord = nodes.new(type='ShaderNodeTexCoord')
                
                # Configurar texturas
                noise_texture_1.inputs['Scale'].default_value = 15.0
                noise_texture_1.inputs['Detail'].default_value = 10.0
                noise_texture_1.inputs['Roughness'].default_value = 0.3
                
                noise_texture_2.inputs['Scale'].default_value = 8.0
                noise_texture_2.inputs['Detail'].default_value = 5.0
                
                voronoi.inputs['Scale'].default_value = 25.0
                voronoi.feature = 'SMOOTH_F1'
                
                # Configurar color ramps
                color_ramp_1.color_ramp.elements[0].color = (0.3, 0.3, 0.4, 1.0)
                color_ramp_1.color_ramp.elements[1].color = (0.8, 0.8, 0.9, 1.0)
                
                color_ramp_2.color_ramp.elements[0].color = (0.0, 0.0, 0.0, 1.0)
                color_ramp_2.color_ramp.elements[1].color = (0.3, 0.3, 0.3, 1.0)
                
                # Conectar nodos
                links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
                links.new(mapping.outputs['Vector'], noise_texture_1.inputs['Vector'])
                links.new(mapping.outputs['Vector'], noise_texture_2.inputs['Vector'])
                links.new(mapping.outputs['Vector'], voronoi.inputs['Vector'])
                
                links.new(noise_texture_1.outputs['Color'], color_ramp_1.inputs['Fac'])
                links.new(voronoi.outputs['Distance'], color_ramp_2.inputs['Fac'])
                
                links.new(color_ramp_1.outputs['Color'], mix_rgb.inputs['Color1'])
                links.new(color_ramp_2.outputs['Color'], mix_rgb.inputs['Color2'])
                links.new(noise_texture_2.outputs['Color'], mix_rgb.inputs['Fac'])
                
                links.new(mix_rgb.outputs['Color'], principled.inputs['Base Color'])
                links.new(color_ramp_2.outputs['Color'], principled.inputs['Roughness'])
                
                # Configurar propiedades metálicas
                principled.inputs["Metallic"].default_value = 1.0
                principled.inputs["Specular"].default_value = 1.0
                
                # Animar el efecto líquido
                current_frame = bpy.context.scene.frame_current
                
                # Animar mapping para crear flujo
                mapping.inputs['Location'].default_value[0] = 0.0
                mapping.inputs['Location'].keyframe_insert(data_path="default_value", index=0, frame=current_frame)
                mapping.inputs['Location'].default_value[0] = 2.0
                mapping.inputs['Location'].keyframe_insert(data_path="default_value", index=0, frame=current_frame + 100)
                
                # Animar escala para ondulación
                noise_texture_1.inputs['Detail'].default_value = 5.0
                noise_texture_1.inputs['Detail'].keyframe_insert(data_path="default_value", frame=current_frame)
                noise_texture_1.inputs['Detail'].default_value = 15.0
                noise_texture_1.inputs['Detail'].keyframe_insert(data_path="default_value", frame=current_frame + 50)
            
            print(f"Liquid metal effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding liquid metal effect: {e}")
    
    def add_iridescent_effect(self, obj):
        """Añade efecto iridiscente como pompas de jabón"""
        try:
            if obj.type != 'MESH':
                print("Iridescent effect only works on mesh objects")
                return
            
            mat = self._ensure_material_nodes(obj, "Iridescent_Material")
            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            principled = nodes.get("Principled BSDF")
            
            if principled:
                # Crear setup iridiscente
                layer_weight = nodes.new(type='ShaderNodeLayerWeight')
                fresnel = nodes.new(type='ShaderNodeFresnel')
                color_ramp_1 = nodes.new(type='ShaderNodeValToRGB')
                color_ramp_2 = nodes.new(type='ShaderNodeValToRGB')
                mix_rgb_1 = nodes.new(type='ShaderNodeMixRGB')
                mix_rgb_2 = nodes.new(type='ShaderNodeMixRGB')
                
                # Configurar layer weight para efectos de ángulo
                layer_weight.inputs['Blend'].default_value = 0.3
                
                # Configurar color ramps para iridiscencia
                # Primer color ramp (colores primarios)
                color_ramp_1.color_ramp.elements[0].color = (1.0, 0.0, 0.5, 1.0)  # Magenta
                color_ramp_1.color_ramp.elements[1].color = (0.0, 1.0, 0.8, 1.0)  # Cyan-verde
                
                # Segundo color ramp (colores secundarios)  
                color_ramp_2.color_ramp.elements[0].color = (1.0, 0.8, 0.0, 1.0)  # Dorado
                color_ramp_2.color_ramp.elements[1].color = (0.5, 0.0, 1.0, 1.0)  # Púrpura
                
                # Conectar nodos
                links.new(layer_weight.outputs['Fresnel'], color_ramp_1.inputs['Fac'])
                links.new(fresnel.outputs['Fac'], color_ramp_2.inputs['Fac'])
                
                links.new(color_ramp_1.outputs['Color'], mix_rgb_1.inputs['Color1'])
                links.new(color_ramp_2.outputs['Color'], mix_rgb_1.inputs['Color2'])
                links.new(layer_weight.outputs['Facing'], mix_rgb_1.inputs['Fac'])
                
                links.new(mix_rgb_1.outputs['Color'], principled.inputs['Base Color'])
                links.new(layer_weight.outputs['Fresnel'], principled.inputs['Alpha'])
                
                # Configurar propiedades
                principled.inputs["Metallic"].default_value = 0.0
                principled.inputs["Roughness"].default_value = 0.0
                principled.inputs["Transmission"].default_value = 0.8
                principled.inputs["IOR"].default_value = 1.33
                
                mat.blend_method = 'BLEND'
                mat.use_backface_culling = False
            
            print(f"Iridescent effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding iridescent effect: {e}")

material_effects = MaterialEffects()

def register():
    print("MotionFX: Advanced material effects module loaded")

def unregister():
    print("MotionFX: Advanced material effects module unloaded")