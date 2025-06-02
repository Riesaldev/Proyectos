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

material_effects = MaterialEffects()

def register():
    print("MotionFX: Material effects module loaded")

def unregister():
    print("MotionFX: Material effects module unloaded")