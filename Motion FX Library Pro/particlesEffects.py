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

particle_effects = ParticlesEffects()

def register():
    print("MotionFX: Particles effects module loaded")

def unregister():
    print("MotionFX: Particles effects module unloaded")