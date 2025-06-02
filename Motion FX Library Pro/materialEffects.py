import bpy

class MaterialEffects:
    def add_dissolve_effect(self, obj):
        try:
            if not obj.data.materials:
                dissolve_mat = bpy.data.materials.new(name="Dissolve_Material")
                dissolve_mat.use_nodes = True
                obj.data.materials.append(dissolve_mat)
            else:
                dissolve_mat = obj.active_material
                if not dissolve_mat.use_nodes:
                    dissolve_mat.use_nodes = True
            
            nodes = dissolve_mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if principled:
                noise_texture = nodes.new(type='ShaderNodeTexNoise')
                noise_texture.location = (-400, 0)
                
                dissolve_mat.blend_method = 'CLIP'
                principled.inputs["Alpha"].default_value = 0.5
                
            print(f"Dissolve effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding dissolve effect: {e}")

    def add_hologram_effect(self, obj):
        try:
            if not obj.data.materials:
                holo_mat = bpy.data.materials.new(name="Hologram_Material")
                holo_mat.use_nodes = True
                obj.data.materials.append(holo_mat)
            else:
                holo_mat = obj.active_material
                if not holo_mat.use_nodes:
                    holo_mat.use_nodes = True
            
            nodes = holo_mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if principled:
                holo_mat.blend_method = 'BLEND'
                principled.inputs["Base Color"].default_value = (0.0, 0.5, 1.0, 1.0)
                principled.inputs["Alpha"].default_value = 0.3
                principled.inputs["Emission"].default_value = (0.0, 0.5, 1.0, 1.0)
                principled.inputs["Emission Strength"].default_value = 2.0
                
            print(f"Hologram effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding hologram effect: {e}")

    def add_glass_effect(self, obj):
        try:
            if not obj.data.materials:
                glass_mat = bpy.data.materials.new(name="Glass_Material")
                glass_mat.use_nodes = True
                obj.data.materials.append(glass_mat)
            else:
                glass_mat = obj.active_material
                if not glass_mat.use_nodes:
                    glass_mat.use_nodes = True
            
            nodes = glass_mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if principled:
                glass_mat.blend_method = 'BLEND'
                principled.inputs["Transmission"].default_value = 1.0
                principled.inputs["Alpha"].default_value = 0.1
                principled.inputs["IOR"].default_value = 1.45
                principled.inputs["Roughness"].default_value = 0.0
                
            print(f"Glass effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding glass effect: {e}")

    def add_metal_effect(self, obj):
        try:
            if not obj.data.materials:
                metal_mat = bpy.data.materials.new(name="Metal_Material")
                metal_mat.use_nodes = True
                obj.data.materials.append(metal_mat)
            else:
                metal_mat = obj.active_material
                if not metal_mat.use_nodes:
                    metal_mat.use_nodes = True
            
            nodes = metal_mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if principled:
                principled.inputs["Metallic"].default_value = 1.0
                principled.inputs["Roughness"].default_value = 0.2
                principled.inputs["Base Color"].default_value = (0.8, 0.8, 0.9, 1.0)
                
            print(f"Metal effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding metal effect: {e}")

    def add_emission_effect(self, obj):
        try:
            if not obj.data.materials:
                emission_mat = bpy.data.materials.new(name="Emission_Material")
                emission_mat.use_nodes = True
                obj.data.materials.append(emission_mat)
            else:
                emission_mat = obj.active_material
                if not emission_mat.use_nodes:
                    emission_mat.use_nodes = True
            
            nodes = emission_mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if principled:
                principled.inputs["Emission"].default_value = (1.0, 1.0, 1.0, 1.0)
                principled.inputs["Emission Strength"].default_value = 5.0
                
            print(f"Emission effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding emission effect: {e}")

    def add_fabric_effect(self, obj):
        try:
            if not obj.data.materials:
                fabric_mat = bpy.data.materials.new(name="Fabric_Material")
                fabric_mat.use_nodes = True
                obj.data.materials.append(fabric_mat)
            else:
                fabric_mat = obj.active_material
                if not fabric_mat.use_nodes:
                    fabric_mat.use_nodes = True
            
            nodes = fabric_mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if principled:
                principled.inputs["Roughness"].default_value = 0.8
                principled.inputs["Sheen"].default_value = 1.0
                principled.inputs["Base Color"].default_value = (0.6, 0.4, 0.2, 1.0)
                
            print(f"Fabric effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fabric effect: {e}")

material_effects = MaterialEffects()

def register():
    print("MotionFX: Material effects module loaded")

def unregister():
    print("MotionFX: Material effects module unloaded")