import bpy
import random

class VisualEffects:
    def add_glow_effect(self, obj):
        """Añade efecto de resplandor"""
        try:
            if not obj or obj.type != 'MESH':
                print("Glow effect only works on mesh objects")
                return False
            
            # Crear material con emisión
            if not obj.data.materials:
                glow_mat = bpy.data.materials.new(name="Glow_Material")
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
            
            # Crear nodos necesarios
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Conectar y configurar
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
            principled.inputs["Base Color"].default_value = (1.0, 0.8, 0.3, 1.0)
            principled.inputs["Emission"].default_value = (1.0, 0.8, 0.3, 1.0)
            principled.inputs["Emission Strength"].default_value = 5.0
            
            print(f"Glow effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding glow effect: {e}")
            return False

    def add_glitch_effect(self, obj):
        """Añade efecto de interferencia"""
        try:
            if not obj or not hasattr(obj, 'location'):
                print("Object invalid for glitch effect")
                return False
            
            import random
            import mathutils
            
            current_frame = bpy.context.scene.frame_current
            original_loc = obj.location.copy()
            
            # Crear keyframes de vibración
            for i in range(10):
                frame = current_frame + i * 2
                offset = (
                    (random.random() - 0.5) * 0.2,
                    (random.random() - 0.5) * 0.2,
                    (random.random() - 0.5) * 0.2
                )
                obj.location = original_loc + mathutils.Vector(offset)
                obj.keyframe_insert(data_path="location", frame=frame)
            
            # Volver a posición original
            obj.location = original_loc
            obj.keyframe_insert(data_path="location", frame=current_frame + 20)
            
            print(f"Glitch effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding glitch effect: {e}")
            return False

    def add_bloom_effect_compositor(self, obj):
        """Añade efecto bloom usando el compositor"""
        try:
            # Habilitar compositor
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
            
            # Crear nodo de bloom
            glare = nodes.new(type='CompositorNodeGlare')
            glare.glare_type = 'FOG_GLOW'
            glare.quality = 'HIGH'
            glare.threshold = 0.8
            glare.size = 6
            
            # Conectar nodos
            links.new(render_layer.outputs['Image'], glare.inputs['Image'])
            links.new(glare.outputs['Image'], composite.inputs['Image'])
            
            print("Bloom effect added to compositor")
            return True
            
        except Exception as e:
            print(f"Error adding bloom effect: {e}")
            return False

visual_effects = VisualEffects()

def register():
    print("MotionFX: Visual effects module loaded")

def unregister():
    print("MotionFX: Visual effects module unloaded")