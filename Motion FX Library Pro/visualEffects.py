import bpy

class VisualEffects:
    def add_glow_effect(self, obj):
        try:
            scene = bpy.context.scene
            scene.use_nodes = True
            
            tree = scene.node_tree
            nodes = tree.nodes
            
            if not any(n.type == 'GLARE' for n in nodes):
                glare = nodes.new(type='CompositorNodeGlare')
                glare.glare_type = 'GLOW'
                glare.threshold = 0.5
                
                render_layers = nodes.get('Render Layers')
                composite = nodes.get('Composite')
                
                if render_layers and composite:
                    existing_links = []
                    for link in tree.links:
                        if link.to_node == composite:
                            existing_links.append((link.from_socket, link.to_socket))
                    
                    for from_socket, to_socket in existing_links:
                        tree.links.remove(tree.links.get((from_socket, to_socket)))
                        tree.links.new(from_socket, glare.inputs['Image'])
                        tree.links.new(glare.outputs['Image'], to_socket)
            
            print(f"Glow effect added for {obj.name}")
            
        except Exception as e:
            print(f"Error adding glow effect: {e}")

    def add_glitch_effect(self, obj):
        try:
            scene = bpy.context.scene
            scene.use_nodes = True
            
            tree = scene.node_tree
            nodes = tree.nodes
            
            if not any(n.type == 'DISPLACE' for n in nodes):
                displace = nodes.new(type='CompositorNodeDisplace')
                displace.inputs['X Scale'].default_value = 10
                displace.inputs['Y Scale'].default_value = 5
            
            print(f"Glitch effect added for {obj.name}")
            
        except Exception as e:
            print(f"Error adding glitch effect: {e}")

    def add_bloom_effect_compositor(self, obj):
        try:
            scene = bpy.context.scene
            scene.use_nodes = True
            
            tree = scene.node_tree
            nodes = tree.nodes
            
            if not any(n.type == 'GLARE' for n in nodes):
                bloom = nodes.new(type='CompositorNodeGlare')
                bloom.glare_type = 'BLOOM'
                bloom.threshold = 1.0
                bloom.size = 6
            
            print(f"Bloom effect added for {obj.name}")
            
        except Exception as e:
            print(f"Error adding bloom effect: {e}")

visual_effects = VisualEffects()

def register():
    print("MotionFX: Visual effects module loaded")

def unregister():
    print("MotionFX: Visual effects module unloaded")