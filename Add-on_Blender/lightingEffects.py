import bpy
import random

class LightingEffects:

    def add_fireworks_light_effect(self, obj):
        """Añade una luz de fuegos artificiales con color aleatorio"""
        try:
            light_data = bpy.data.lights.new(name="Fireworks_Light", type='POINT')
            light_data.energy = 3000
            light_data.color = (random.random(), random.random(), random.random())
            light_obj = bpy.data.objects.new(name="Fireworks_Light", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            # Añadir animación de parpadeo
            light_data.energy = 3000
            light_data.keyframe_insert(data_path="energy", frame=1)
            light_data.energy = 0
            light_data.keyframe_insert(data_path="energy", frame=5)
            light_data.energy = 3000
            light_data.keyframe_insert(data_path="energy", frame=10)
            
        except Exception as e:
            print(f"Error adding fireworks light effect: {e}")

    def add_flash_effect(self, obj):
        """Añade un efecto de flash con luz muy brillante"""
        try:
            light_data = bpy.data.lights.new(name="Flash_Light", type='POINT')
            light_data.energy = 5000
            light_data.color = (1, 1, 1)
            light_obj = bpy.data.objects.new(name="Flash_Light", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            # Animación de flash rápido
            light_data.energy = 0
            light_data.keyframe_insert(data_path="energy", frame=1)
            light_data.energy = 5000
            light_data.keyframe_insert(data_path="energy", frame=2)
            light_data.energy = 0
            light_data.keyframe_insert(data_path="energy", frame=4)
            
        except Exception as e:
            print(f"Error adding flash effect: {e}")

    def add_glowing_effect(self, obj):
        """Añade material emisivo para hacer que el objeto brille"""
        try:
            if not obj.data.materials:
                mat = bpy.data.materials.new(name="Glow_Material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True

            nodes = mat.node_tree.nodes
            
            # Verificar nodos existentes
            emission = nodes.get("Emission")
            material_output = nodes.get('Material Output')
            
            if not emission:
                emission = nodes.new(type='ShaderNodeEmission')
                emission.inputs['Strength'].default_value = 10.0
                emission.inputs['Color'].default_value = (1.0, 0.8, 0.3, 1.0)  # Color cálido
            
            if not material_output:
                material_output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Conectar nodos
            mat.node_tree.links.new(emission.outputs['Emission'], material_output.inputs['Surface'])
            
        except Exception as e:
            print(f"Error adding glowing effect: {e}")

    def add_global_illumination_effect(self, obj):
        """Habilita iluminación global en la escena (requiere Cycles)"""
        try:
            current_engine = bpy.context.scene.render.engine
            
            # Advertir al usuario si no está usando Cycles
            if current_engine != 'CYCLES':
                print(f"WARNING: Changing render engine from {current_engine} to CYCLES for Global Illumination")
                print("This may affect your current render settings and materials.")
                
                # En un add-on real, podrías mostrar un popup de confirmación
                # Por ahora, cambiaremos automáticamente pero con advertencia
                bpy.context.scene.render.engine = 'CYCLES'
            
            # Configurar iluminación global
            bpy.context.scene.cycles.use_adaptive_sampling = True
            bpy.context.scene.cycles.samples = 128  # Muestras para calidad decente
            
            # Configurar mundo
            bpy.context.scene.world.use_nodes = True
            world_nodes = bpy.context.scene.world.node_tree.nodes
            bg = world_nodes.get('Background')
            if bg:
                bg.inputs['Strength'].default_value = 2.0
                bg.inputs['Color'].default_value = (0.05, 0.1, 0.3, 1.0)  # Azul suave
                
            print("Global Illumination enabled with enhanced ambient lighting")
            
        except Exception as e:
            print(f"Error adding global illumination effect: {e}")

    def add_lens_flare_light_effect(self, obj):
        """Añade una luz solar y configura el compositor para lens flare"""
        try:
            # Crear luz solar
            light_data = bpy.data.lights.new(name="LensFlare_Sun", type='SUN')
            light_data.energy = 10
            light_data.angle = 0.0175  # Ángulo pequeño para sol definido
            light_obj = bpy.data.objects.new(name="LensFlare_Sun", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            # Rotar la luz para que apunte hacia abajo
            light_obj.rotation_euler = (0.3, 0, 0.785)  # 45 grados en Z
            
            # Configurar compositor para lens flare
            bpy.context.scene.use_nodes = True
            tree = bpy.context.scene.node_tree
            nodes = tree.nodes
            
            # Verificar si ya existe un nodo Glare
            existing_glare = None
            for node in nodes:
                if node.type == 'GLARE':
                    existing_glare = node
                    break
            
            if not existing_glare:
                # Limpiar nodos existentes si es necesario
                if len(nodes) <= 2:  # Solo Render Layers y Composite
                    render_layers = None
                    composite = None
                    for node in nodes:
                        if node.type == 'R_LAYERS':
                            render_layers = node
                        elif node.type == 'COMPOSITE':
                            composite = node
                    
                    if render_layers and composite:
                        # Añadir nodo Glare
                        glare = nodes.new(type='CompositorNodeGlare')
                        glare.glare_type = 'GHOSTS'
                        glare.quality = 'HIGH'
                        glare.threshold = 1.0
                        glare.location = (300, 0)
                        
                        # Conectar nodos
                        tree.links.new(render_layers.outputs['Image'], glare.inputs['Image'])
                        tree.links.new(glare.outputs['Image'], composite.inputs['Image'])
                        
                        print("Lens flare effect added to compositor")
            
        except Exception as e:
            print(f"Error adding lens flare effect: {e}")

    def add_neon_effect(self, obj):
        """Añade material neón emisivo"""
        try:
            if not obj.data.materials:
                mat = bpy.data.materials.new(name="Neon_Material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.active_material
                if not mat.use_nodes:
                    mat.use_nodes = True

            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            
            # Verificar nodos existentes
            emission = nodes.get("Emission")
            material_output = nodes.get('Material Output')
            
            if not emission:
                emission = nodes.new(type='ShaderNodeEmission')
            
            if not material_output:
                material_output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Configurar material neón
            emission.inputs['Color'].default_value = (0.0, 1.0, 0.8, 1.0)  # Cian neón
            emission.inputs['Strength'].default_value = 20.0
            
            # Conectar
            links.new(emission.outputs['Emission'], material_output.inputs['Surface'])
            
            # Configurar transparencia si es necesario
            mat.blend_method = 'BLEND'
            
        except Exception as e:
            print(f"Error adding neon effect: {e}")

    def add_ray_tracing_effect(self, obj):
        """Habilita características avanzadas de ray tracing en Cycles"""
        try:
            current_engine = bpy.context.scene.render.engine
            
            # Advertir al usuario si no está usando Cycles
            if current_engine != 'CYCLES':
                print(f"WARNING: Changing render engine from {current_engine} to CYCLES for Ray Tracing")
                print("This will enable advanced ray tracing features but may significantly increase render times.")
                bpy.context.scene.render.engine = 'CYCLES'
            
            # Configurar ray tracing avanzado
            cycles = bpy.context.scene.cycles
            cycles.max_bounces = 12
            cycles.diffuse_bounces = 4
            cycles.glossy_bounces = 4
            cycles.transmission_bounces = 8
            cycles.volume_bounces = 2
            cycles.transparent_max_bounces = 8
            
            # Mejorar calidad de sampling
            cycles.samples = 256  # Más muestras para mejor calidad
            cycles.use_adaptive_sampling = True
            cycles.adaptive_threshold = 0.01
            
            print("Advanced ray tracing enabled - render times may be significantly longer")
            
        except Exception as e:
            print(f"Error enabling ray tracing: {e}")

    def add_shadows_effect(self, obj):
        """Añade una luz solar con sombras mejoradas"""
        try:
            light_data = bpy.data.lights.new(name="Shadow_Sun", type='SUN')
            light_data.energy = 5
            light_data.angle = 0.00873  # Ángulo muy pequeño para sombras definidas
            light_obj = bpy.data.objects.new(name="Shadow_Sun", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            # Posicionar la luz en ángulo para mejores sombras
            light_obj.rotation_euler = (0.785, 0, 0.524)  # 45° en X, 30° en Z
            
            # Si estamos en Cycles, mejorar la calidad de las sombras
            if bpy.context.scene.render.engine == 'CYCLES':
                bpy.context.scene.cycles.use_adaptive_sampling = True
            elif bpy.context.scene.render.engine == 'BLENDER_EEVEE':
                # Configurar sombras en Eevee
                eevee = bpy.context.scene.eevee
                eevee.use_soft_shadows = True
                eevee.shadow_cascade_size = '2048'
                
        except Exception as e:
            print(f"Error adding shadows effect: {e}")

    def add_spotlight_effect(self, obj):
        """Añade un foco con configuraciones mejoradas"""
        try:
            light_data = bpy.data.lights.new(name="Spotlight", type='SPOT')
            light_data.energy = 1000
            light_data.spot_size = 0.7  # 40 grados aproximadamente
            light_data.spot_blend = 0.5  # Transición suave en los bordes
            light_obj = bpy.data.objects.new(name="Spotlight", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            # Elevar y rotar el foco para mejor iluminación
            light_obj.location.z += 3
            light_obj.rotation_euler = (1.047, 0, 0)  # 60 grados hacia abajo
            
            # Añadir seguimiento del objeto si se desea
            constraint = light_obj.constraints.new(type='TRACK_TO')
            constraint.target = obj
            constraint.track_axis = 'TRACK_NEGATIVE_Z'
            constraint.up_axis = 'UP_Y'
            
        except Exception as e:
            print(f"Error adding spotlight effect: {e}")

    def add_volumetric_effect(self, obj):
        """Añade iluminación volumétrica a la escena"""
        try:
            current_engine = bpy.context.scene.render.engine
            
            if current_engine == 'BLENDER_EEVEE':
                # Habilitar volumétrica en Eevee
                eevee = bpy.context.scene.eevee
                eevee.use_volumetric_lights = True
                eevee.use_volumetric_shadows = True
                eevee.volumetric_tile_size = '8'  # Mejor calidad
                eevee.volumetric_samples = 64
                
                print("Volumetric lighting enabled in Eevee")
                
            elif current_engine == 'CYCLES':
                print("Volumetric effects work automatically in Cycles with appropriate materials")
            else:
                print(f"WARNING: Volumetric effects require Eevee or Cycles. Current engine: {current_engine}")
                
        except Exception as e:
            print(f"Error adding volumetric effect: {e}")

# Instancia singleton
lighting_effects = LightingEffects()

def register():
    pass

def unregister():
    pass