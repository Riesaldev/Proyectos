import bpy
import random

class ParticlesEffects:
    def add_fire_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Fire effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir sistema de partículas
            bpy.ops.object.particle_system_add()
            particle_system = obj.particle_systems[-1]
            
            # Configurar como fuego
            settings = particle_system.settings
            settings.type = 'EMITTER'
            settings.count = 1000
            settings.lifetime = 30
            settings.emit_from = 'FACE'
            settings.use_emit_random = True
            settings.factor_random = 0.5
            
            # Propiedades físicas para fuego
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 0.5
            settings.brownian_factor = 0.1
            
            # Velocidad
            settings.velocity_random = 0.5
            
            # Crear material emisivo para las partículas
            if not obj.data.materials:
                fire_mat = bpy.data.materials.new(name="Fire_Material")
                fire_mat.use_nodes = True
                obj.data.materials.append(fire_mat)
                
                nodes = fire_mat.node_tree.nodes
                links = fire_mat.node_tree.links
                
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
                principled.inputs["Base Color"].default_value = (1.0, 0.3, 0.0, 1.0)
                principled.inputs["Emission"].default_value = (1.0, 0.3, 0.0, 1.0)
                principled.inputs["Emission Strength"].default_value = 5.0
            
            print(f"Fire effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding fire effect: {e}")
            return False

    def add_smoke_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Smoke effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir sistema de partículas
            bpy.ops.object.particle_system_add()
            particle_system = obj.particle_systems[-1]
            
            # Configurar como humo
            settings = particle_system.settings
            settings.type = 'EMITTER'
            settings.count = 500
            settings.lifetime = 60
            settings.emit_from = 'VOLUME'
            
            # Propiedades físicas para humo
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 0.2
            settings.brownian_factor = 0.3
            settings.drag_factor = 0.1
            
            print(f"Smoke effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding smoke effect: {e}")
            return False

    def add_explosion_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Explosion effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir sistema de partículas
            bpy.ops.object.particle_system_add()
            particle_system = obj.particle_systems[-1]
            
            # Configurar como explosión
            settings = particle_system.settings
            settings.type = 'EMITTER'
            settings.count = 2000
            settings.lifetime = 20
            settings.emit_from = 'VOLUME'
            settings.frame_start = bpy.context.scene.frame_current
            settings.frame_end = bpy.context.scene.frame_current + 5
            
            # Propiedades físicas para explosión
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 2.0
            settings.factor_random = 1.0
            settings.velocity_random = 1.0
            
            print(f"Explosion effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding explosion effect: {e}")
            return False

    def add_sparks_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Sparks effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir sistema de partículas
            bpy.ops.object.particle_system_add()
            particle_system = obj.particle_systems[-1]
            
            # Configurar como chispas
            settings = particle_system.settings
            settings.type = 'EMITTER'
            settings.count = 200
            settings.lifetime = 40
            settings.emit_from = 'VERT'
            
            # Propiedades físicas para chispas
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 1.5
            settings.factor_random = 0.8
            settings.gravity = 0.5
            
            print(f"Sparks effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding sparks effect: {e}")
            return False

    def add_blood_effect(self, obj):
        try:
            if obj.type != 'MESH':
                print("Blood effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir sistema de partículas
            bpy.ops.object.particle_system_add()
            particle_system = obj.particle_systems[-1]
            
            # Configurar como sangre
            settings = particle_system.settings
            settings.type = 'EMITTER'
            settings.count = 100
            settings.lifetime = 30
            settings.emit_from = 'FACE'
            
            # Propiedades físicas para sangre
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 0.8
            settings.gravity = 1.0
            settings.size_random = 0.5
            
            print(f"Blood effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding blood effect: {e}")
            return False
    
    def add_magical_particles_effect(self, obj):
        """Añade partículas mágicas con comportamiento avanzado"""
        try:
            if obj.type != 'MESH':
                print("Magical particles effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir sistema de partículas
            bpy.ops.object.particle_system_add()
            particle_system = obj.particle_systems[-1]
            
            # Configurar como partículas mágicas
            settings = particle_system.settings
            settings.type = 'EMITTER'
            settings.count = 1500
            settings.lifetime = 120
            settings.emit_from = 'VOLUME'
            settings.distribution = 'RAND'
            
            # Propiedades físicas avanzadas
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 0.3
            settings.brownian_factor = 2.0
            settings.drag_factor = 0.05
            settings.damping = 0.8
            
            # Configuración de velocidad
            settings.velocity_random = 0.8
            settings.angular_velocity_mode = 'RAND'
            settings.angular_velocity_factor = 2.0
            
            # Configuración de tamaño y variación
            settings.particle_size = 0.05
            settings.size_random = 0.7
            
            # Configuración de rotación
            settings.rotation_mode = 'VEL'
            settings.rotation_factor_random = 1.0
            
            # Configuración de vida y fade
            settings.use_dynamic_rotation = True
            
            # Crear material para partículas mágicas
            magic_mat = bpy.data.materials.new(name="Magic_Particles")
            magic_mat.use_nodes = True
            
            nodes = magic_mat.node_tree.nodes
            links = magic_mat.node_tree.links
            
            # Limpiar nodos
            for node in nodes:
                if node.type != 'OUTPUT_MATERIAL':
                    nodes.remove(node)
            
            # Crear shader para partículas
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            emission = nodes.new(type='ShaderNodeEmission')
            mix_shader = nodes.new(type='ShaderNodeMixShader')
            particle_info = nodes.new(type='ShaderNodeParticleInfo')
            color_ramp = nodes.new(type='ShaderNodeValToRGB')
            
            output = nodes.get('Material Output')
            if not output:
                output = nodes.new(type='ShaderNodeOutputMaterial')
            
            # Configurar color gradient basado en tiempo de vida
            color_ramp.color_ramp.elements[0].color = (1.0, 0.8, 0.0, 1.0)  # Dorado
            color_ramp.color_ramp.elements[1].color = (0.8, 0.2, 1.0, 1.0)  # Púrpura
            
            # Conectar nodos
            links.new(particle_info.outputs['Age'], color_ramp.inputs['Fac'])
            links.new(color_ramp.outputs['Color'], emission.inputs['Color'])
            links.new(color_ramp.outputs['Color'], principled.inputs['Base Color'])
            links.new(particle_info.outputs['Lifetime'], mix_shader.inputs['Fac'])
            links.new(principled.outputs['BSDF'], mix_shader.inputs[1])
            links.new(emission.outputs['Emission'], mix_shader.inputs[2])
            links.new(mix_shader.outputs['Shader'], output.inputs['Surface'])
            
            # Configurar emisión
            emission.inputs["Strength"].default_value = 8.0
            
            # Aplicar material al objeto para las partículas
            if not obj.data.materials:
                obj.data.materials.append(magic_mat)
            
            print(f"Magical particles effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding magical particles effect: {e}")
            return False
    
    def add_rain_effect(self, obj):
        """Añade efecto de lluvia realista"""
        try:
            if obj.type != 'MESH':
                print("Rain effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir sistema de partículas
            bpy.ops.object.particle_system_add()
            particle_system = obj.particle_systems[-1]
            
            # Configurar como lluvia
            settings = particle_system.settings
            settings.type = 'EMITTER'
            settings.count = 5000
            settings.lifetime = 60
            settings.emit_from = 'FACE'
            settings.distribution = 'RAND'
            
            # Propiedades físicas de lluvia
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 0.0
            settings.gravity = 2.0
            settings.velocity_random = 0.1
            
            # Configuración de forma (gotas alargadas)
            settings.particle_size = 0.02
            settings.size_random = 0.3
            settings.render_type = 'LINE'
            settings.trail_count = 1
            
            # Dirección hacia abajo
            settings.object_align_factor[2] = 1.0  # Alineación Z
            
            print(f"Rain effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding rain effect: {e}")
            return False
    
    def add_energy_burst_effect(self, obj):
        """Añade explosión de energía con partículas"""
        try:
            if obj.type != 'MESH':
                print("Energy burst effect only works on mesh objects")
                return False
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Añadir sistema de partículas
            bpy.ops.object.particle_system_add()
            particle_system = obj.particle_systems[-1]
            
            # Configurar como explosión de energía
            settings = particle_system.settings
            settings.type = 'EMITTER'
            settings.count = 3000
            settings.lifetime = 40
            settings.emit_from = 'VOLUME'
            settings.frame_start = bpy.context.scene.frame_current
            settings.frame_end = bpy.context.scene.frame_current + 10
            
            # Propiedades físicas explosivas
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 3.0
            settings.factor_random = 2.0
            settings.velocity_random = 1.5
            settings.brownian_factor = 1.0
            
            # Configuración visual
            settings.particle_size = 0.08
            settings.size_random = 0.8
            
            # Configurar fuerza de campo para expansión
            bpy.ops.object.effector_add(type='FORCE', location=obj.location)
            force_field = bpy.context.active_object
            force_field.name = f"Energy_Force_{obj.name}"
            force_field.field.type = 'FORCE'
            force_field.field.strength = 50.0
            force_field.field.falloff_power = 2.0
            
            # Animar la fuerza
            current_frame = bpy.context.scene.frame_current
            force_field.field.strength = 100.0
            force_field.field.keyframe_insert(data_path="strength", frame=current_frame)
            force_field.field.strength = 0.0
            force_field.field.keyframe_insert(data_path="strength", frame=current_frame + 20)
            
            print(f"Energy burst effect added to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding energy burst effect: {e}")
            return False

particle_effects = ParticlesEffects()

def register():
    print("MotionFX: Advanced particles effects module loaded")

def unregister():
    print("MotionFX: Advanced particles effects module unloaded")