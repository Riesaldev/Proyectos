import bpy
import random
import mathutils

class LightingEffects:

    def add_fireworks_light_effect(self, obj):
        try:
            light_data = bpy.data.lights.new(name="Fireworks_Light", type='POINT')
            light_data.energy = 3000
            light_data.color = (random.random(), random.random(), random.random())
            light_obj = bpy.data.objects.new(name="Fireworks_Light", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            light_data.energy = 3000
            light_data.keyframe_insert(data_path="energy", frame=1)
            light_data.energy = 0
            light_data.keyframe_insert(data_path="energy", frame=5)
            light_data.energy = 3000
            light_data.keyframe_insert(data_path="energy", frame=10)
            
            print(f"Fireworks light effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fireworks light effect: {e}")

    def add_flash_effect(self, obj):
        """Añade efecto de destello"""
        try:
            # Crear luz de destello
            bpy.ops.object.light_add(type='POINT', location=obj.location)
            flash_light = bpy.context.active_object
            flash_light.name = f"Flash_{obj.name}"
            
            # Configurar destello intenso
            flash_light.data.energy = 1000
            flash_light.data.color = (1.0, 1.0, 1.0)
            
            # Animar destello rápido
            current_frame = bpy.context.scene.frame_current
            flash_light.data.energy = 0
            flash_light.data.keyframe_insert(data_path="energy", frame=current_frame)
            flash_light.data.energy = 1000
            flash_light.data.keyframe_insert(data_path="energy", frame=current_frame + 2)
            flash_light.data.energy = 0
            flash_light.data.keyframe_insert(data_path="energy", frame=current_frame + 4)
            
            print(f"Flash effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding flash effect: {e}")
            return False

    def add_glowing_effect(self, obj):
        try:
            if not obj.data.materials:
                mat = bpy.data.materials.new(name="Glow_Material")
                mat.use_nodes = True
                obj.data.materials.append(mat)
            else:
                mat = obj.data.materials[0]
                if not mat.use_nodes:
                    mat.use_nodes = True

            nodes = mat.node_tree.nodes
            links = mat.node_tree.links
            
            # Limpiar nodos existentes excepto output
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear estructura básica
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Conectar y configurar emisión
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
            principled.inputs['Base Color'].default_value = (1.0, 0.8, 0.3, 1.0)
            principled.inputs['Emission'].default_value = (1.0, 0.8, 0.3, 1.0)
            principled.inputs['Emission Strength'].default_value = 10.0
            
            print(f"Glowing effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding glowing effect: {e}")
            return False

    def add_global_illumination_effect(self, obj):
        try:
            current_engine = bpy.context.scene.render.engine
            
            if current_engine != 'CYCLES':
                bpy.context.scene.render.engine = 'CYCLES'
            
            bpy.context.scene.cycles.use_adaptive_sampling = True
            bpy.context.scene.cycles.samples = 128
            
            bpy.context.scene.world.use_nodes = True
            world_nodes = bpy.context.scene.world.node_tree.nodes
            bg = world_nodes.get('Background')
            if bg:
                bg.inputs['Strength'].default_value = 2.0
                bg.inputs['Color'].default_value = (0.05, 0.1, 0.3, 1.0)
                
            print("Global Illumination enabled")
            
        except Exception as e:
            print(f"Error adding global illumination effect: {e}")

    def add_lens_flare_light_effect(self, obj):
        try:
            if obj.type != 'LIGHT':
                bpy.ops.object.light_add(type='SUN', location=obj.location)
                light_obj = bpy.context.active_object
            else:
                light_obj = obj
            
            light_obj.data.energy = 10.0
            light_obj.data.color = (1.0, 0.9, 0.8)
            
            print(f"Lens flare effect added to {light_obj.name}")
            
        except Exception as e:
            print(f"Error adding lens flare effect: {e}")

    def add_neon_effect(self, obj):
        """Añade efecto de neón brillante"""
        try:
            # Crear material neón si no existe
            if not obj.data.materials:
                neon_mat = bpy.data.materials.new(name="Neon_Material")
                neon_mat.use_nodes = True
                obj.data.materials.append(neon_mat)
            else:
                neon_mat = obj.active_material
                if not neon_mat.use_nodes:
                    neon_mat.use_nodes = True
            
            nodes = neon_mat.node_tree.nodes
            principled = nodes.get("Principled BSDF")
            if principled:
                # Configurar emisión brillante
                principled.inputs["Emission"].default_value = (0.0, 1.0, 1.0, 1.0)
                principled.inputs["Emission Strength"].default_value = 10.0
                principled.inputs["Base Color"].default_value = (0.0, 1.0, 1.0, 1.0)
                
                # Añadir luz de área para resplandor
                bpy.ops.object.light_add(type='AREA', location=obj.location)
                light_obj = bpy.context.active_object
                light_obj.name = f"Neon_Light_{obj.name}"
                light_obj.data.energy = 50
                light_obj.data.color = (0.0, 1.0, 1.0)
                light_obj.data.size = 2.0
                
                # Animar pulsación
                current_frame = bpy.context.scene.frame_current
                light_obj.data.energy = 50
                light_obj.data.keyframe_insert(data_path="energy", frame=current_frame)
                light_obj.data.energy = 100
                light_obj.data.keyframe_insert(data_path="energy", frame=current_frame + 30)
                light_obj.data.energy = 50
                light_obj.data.keyframe_insert(data_path="energy", frame=current_frame + 60)
            
            print(f"Neon effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding neon effect: {e}")
            return False

    def add_ray_tracing_effect(self, obj):
        try:
            current_engine = bpy.context.scene.render.engine
            
            if current_engine != 'CYCLES':
                bpy.context.scene.render.engine = 'CYCLES'
            
            cycles = bpy.context.scene.cycles
            cycles.max_bounces = 12
            cycles.diffuse_bounces = 4
            cycles.glossy_bounces = 4
            cycles.transmission_bounces = 8
            cycles.volume_bounces = 2
            cycles.transparent_max_bounces = 8
            
            cycles.samples = 256
            cycles.use_adaptive_sampling = True
            cycles.adaptive_threshold = 0.01
            
            print("Ray tracing enabled")
            
        except Exception as e:
            print(f"Error enabling ray tracing: {e}")

    def add_shadows_effect(self, obj):
        try:
            light_data = bpy.data.lights.new(name="Shadow_Sun", type='SUN')
            light_data.energy = 5
            light_data.angle = 0.00873
            light_obj = bpy.data.objects.new(name="Shadow_Sun", object_data=light_data)
            bpy.context.collection.objects.link(light_obj)
            light_obj.location = obj.location
            
            light_obj.rotation_euler = (0.785, 0, 0.524)
            
            if bpy.context.scene.render.engine == 'CYCLES':
                bpy.context.scene.cycles.use_adaptive_sampling = True
            elif bpy.context.scene.render.engine == 'BLENDER_EEVEE':
                eevee = bpy.context.scene.eevee
                eevee.use_soft_shadows = True
                eevee.shadow_cascade_size = '2048'
                
            print(f"Shadows effect added to {obj.name}")
                
        except Exception as e:
            print(f"Error adding shadows effect: {e}")

    def add_spotlight_effect(self, obj):
        """Añade un foco direccional"""
        try:
            # Crear nueva luz
            bpy.ops.object.light_add(type='SPOT', location=(obj.location.x, obj.location.y, obj.location.z + 3))
            light_obj = bpy.context.active_object
            light_obj.name = f"Spotlight_{obj.name}"
            
            # Configurar propiedades del foco
            light_obj.data.energy = 1000
            light_obj.data.spot_size = 0.785398  # 45 grados
            light_obj.data.spot_blend = 0.15
            light_obj.data.color = (1.0, 0.9, 0.8)
            
            # Apuntar hacia el objeto
            constraint = light_obj.constraints.new(type='TRACK_TO')
            constraint.target = obj
            constraint.track_axis = 'TRACK_NEGATIVE_Z'
            constraint.up_axis = 'UP_Y'
            
            print(f"Spotlight effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding spotlight effect: {e}")
            return False

    def add_volumetric_effect(self, obj):
        """Añade iluminación volumétrica"""
        try:
            # Asegurar que el objeto tenga material
            if not obj.data.materials:
                vol_mat = bpy.data.materials.new(name="Volumetric_Material")
                vol_mat.use_nodes = True
                obj.data.materials.append(vol_mat)
            else:
                vol_mat = obj.active_material
                if not vol_mat.use_nodes:
                    vol_mat.use_nodes = True
            
            # Configurar nodos para volumen
            nodes = vol_mat.node_tree.nodes
            links = vol_mat.node_tree.links
            
            # Crear shader de volumen
            volume_scatter = nodes.new(type='ShaderNodeVolumeScatter')
            volume_scatter.inputs["Density"].default_value = 0.1
            volume_scatter.inputs["Color"].default_value = (0.8, 0.9, 1.0, 1.0)
            
            output = nodes.get('Material Output')
            if output:
                links.new(volume_scatter.outputs['Volume'], output.inputs['Volume'])
            
            print(f"Volumetric effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding volumetric effect: {e}")
            return False

    def add_bloom_effect(self, obj):
        """Añade efecto de florecimiento luminoso"""
        try:
            # Habilitar compositor si no está activo
            bpy.context.scene.use_nodes = True
            tree = bpy.context.scene.node_tree
            nodes = tree.nodes
            links = tree.links
            
            # Buscar o crear nodos necesarios
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
            
            # Crear nodos de bloom
            glare = nodes.new(type='CompositorNodeGlare')
            glare.glare_type = 'FOG_GLOW'
            glare.quality = 'HIGH'
            glare.threshold = 0.8
            glare.size = 6
            
            # Conectar nodos
            links.new(render_layer.outputs['Image'], glare.inputs['Image'])
            links.new(glare.outputs['Image'], composite.inputs['Image'])
            
            print(f"Bloom effect added to scene")
            return True
            
        except Exception as e:
            print(f"Error adding bloom effect: {e}")
            return False

    def add_glow_effect(self, obj):
        """Añade efecto de resplandor usando el método de glowing_effect"""
        return self.add_glowing_effect(obj)

lighting_effects = LightingEffects()

def register():
    print("MotionFX: Lighting effects module loaded")

def unregister():
        print("MotionFX: Lighting effects module unloaded")