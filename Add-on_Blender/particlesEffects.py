import bpy

class ParticleEffects:
    def _ensure_domain_container(self, obj, effect_type="smoke"):
        """Crear un contenedor para efectos de fluidos si es necesario"""
        try:
            # Buscar si ya existe un dominio en la escena
            domain_obj = None
            for scene_obj in bpy.context.scene.objects:
                if scene_obj.type == 'MESH':
                    for mod in scene_obj.modifiers:
                        if mod.type == 'FLUID' and hasattr(mod, 'domain_settings'):
                            domain_obj = scene_obj
                            break
                    if domain_obj:
                        break
            
            # Crear dominio si no existe
            if not domain_obj:
                bpy.ops.mesh.primitive_cube_add(
                    size=10, 
                    location=(obj.location.x, obj.location.y, obj.location.z + 5)
                )
                domain_obj = bpy.context.active_object
                domain_obj.name = f"{effect_type.title()}_Domain"
                
                # Añadir modificador de fluido como dominio
                bpy.ops.object.modifier_add(type='FLUID')
                fluid_mod = domain_obj.modifiers[-1]
                fluid_mod.fluid_type = 'DOMAIN'
                
                if hasattr(fluid_mod, 'domain_settings'):
                    domain_settings = fluid_mod.domain_settings
                    domain_settings.domain_type = 'GAS'
                    domain_settings.use_adaptive_domain = True
                    domain_settings.resolution_max = 64
                    domain_settings.use_collision_border_front = False
                    domain_settings.use_collision_border_back = False
                    domain_settings.use_collision_border_right = False
                    domain_settings.use_collision_border_left = False
                    domain_settings.use_collision_border_top = False
                    domain_settings.use_collision_border_bottom = False
                
                print(f"Created {effect_type} domain: {domain_obj.name}")
            
            return domain_obj
            
        except Exception as e:
            print(f"Error creating domain container: {e}")
            return None

    def add_fire_effect(self, obj):
        try:
            if not obj or obj.type != 'MESH':
                print("Fire effect only works on mesh objects")
                return
            
            # Asegurar dominio
            domain = self._ensure_domain_container(obj, "fire")
            
            # Configurar objeto como emisor
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Verificar si ya tiene modificador fluid
            has_fluid = any(mod.type == 'FLUID' for mod in obj.modifiers)
            
            if not has_fluid:
                bpy.ops.object.modifier_add(type='FLUID')
                fluid_mod = obj.modifiers[-1]
                fluid_mod.fluid_type = 'FLOW'
                
                if hasattr(fluid_mod, 'flow_settings'):
                    flow_settings = fluid_mod.flow_settings
                    flow_settings.flow_type = 'FIRE'
                    flow_settings.fuel_amount = 1.0
                    flow_settings.temperature = 3.0
            
            # Crear material de fuego
            if not obj.data.materials:
                fire_mat = bpy.data.materials.new(name=f"Fire_Material_{obj.name}")
                fire_mat.use_nodes = True
                obj.data.materials.append(fire_mat)
                
                nodes = fire_mat.node_tree.nodes
                principled = nodes.get("Principled BSDF")
                if principled:
                    principled.inputs["Emission"].default_value = (1.0, 0.3, 0.0, 1.0)
                    principled.inputs["Emission Strength"].default_value = 5.0
            
            # Configurar el dominio para renderizado
            if domain:
                bpy.context.view_layer.objects.active = domain
                if not domain.data.materials:
                    domain_mat = bpy.data.materials.new(name="Fire_Domain_Material")
                    domain_mat.use_nodes = True
                    domain.data.materials.append(domain_mat)
                    
                    nodes = domain_mat.node_tree.nodes
                    links = domain_mat.node_tree.links
                    
                    # Limpiar nodos
                    for node in nodes:
                        if node.type != 'OUTPUT_MATERIAL':
                            nodes.remove(node)
                    
                    # Crear shader volumétrico
                    volume_principled = nodes.new(type='ShaderNodeVolumePrincipled')
                    output = nodes.get('Material Output')
                    if not output:
                        output = nodes.new(type='ShaderNodeOutputMaterial')
                    
                    links.new(volume_principled.outputs['Volume'], output.inputs['Volume'])
            
            print(f"Fire effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding fire effect: {e}")

    def add_smoke_effect(self, obj):
        try:
            if not obj or obj.type != 'MESH':
                print("Smoke effect only works on mesh objects")
                return
            
            # Asegurar dominio
            domain = self._ensure_domain_container(obj, "smoke")
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Verificar si ya tiene modificador fluid
            has_fluid = any(mod.type == 'FLUID' for mod in obj.modifiers)
            
            if not has_fluid:
                bpy.ops.object.modifier_add(type='FLUID')
                fluid_mod = obj.modifiers[-1]
                fluid_mod.fluid_type = 'FLOW'
                
                if hasattr(fluid_mod, 'flow_settings'):
                    flow_settings = fluid_mod.flow_settings
                    flow_settings.flow_type = 'SMOKE'
                    flow_settings.density = 2.0
                    flow_settings.velocity_factor = 1.0
            
            print(f"Smoke effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding smoke effect: {e}")

    def add_explosion_effect(self, obj):
        try:
            if not obj:
                print("No valid object for explosion effect")
                return
            
            # Asegurar que el objeto tenga un sistema de partículas
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            if not obj.particle_systems:
                bpy.ops.object.particle_system_add()
            
            particle_system = obj.particle_systems[-1]
            particle_system.name = "Explosion_Particles"
            settings = particle_system.settings
            
            # Configurar sistema de partículas para explosión
            settings.type = 'EMITTER'
            settings.count = 1000
            settings.frame_start = bpy.context.scene.frame_current
            settings.frame_end = bpy.context.scene.frame_current + 1
            settings.lifetime = 50
            settings.emit_from = 'VOLUME'
            settings.distribution = 'RAND'
            
            # Configurar física
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 10.0
            settings.factor_random = 2.0
            settings.angular_velocity_factor = 2.0
            
            # Configurar renderizado
            settings.render_type = 'OBJECT'
            
            # Crear objeto de partícula (pequeña esfera)
            if "Explosion_Particle_Object" not in bpy.data.objects:
                bpy.ops.mesh.primitive_ico_sphere_add(radius=0.02, location=(100, 100, 100))  # Fuera de vista
                particle_obj = bpy.context.active_object
                particle_obj.name = "Explosion_Particle_Object"
                
                # Material emisivo para las partículas
                if not particle_obj.data.materials:
                    part_mat = bpy.data.materials.new(name="Explosion_Particle_Material")
                    part_mat.use_nodes = True
                    particle_obj.data.materials.append(part_mat)
                    
                    nodes = part_mat.node_tree.nodes
                    principled = nodes.get("Principled BSDF")
                    if principled:
                        principled.inputs["Emission"].default_value = (1.0, 0.5, 0.0, 1.0)
                        principled.inputs["Emission Strength"].default_value = 3.0
            
            settings.instance_object = bpy.data.objects["Explosion_Particle_Object"]
            
            print(f"Explosion effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding explosion effect: {e}")

    def add_sparks_effect(self, obj):
        try:
            if not obj:
                print("No valid object for sparks effect")
                return
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            if not obj.particle_systems:
                bpy.ops.object.particle_system_add()
            
            particle_system = obj.particle_systems[-1]
            particle_system.name = "Sparks_Particles"
            settings = particle_system.settings
            
            # Configurar para chispas
            settings.type = 'EMITTER'
            settings.count = 500
            settings.frame_start = bpy.context.scene.frame_current
            settings.frame_end = bpy.context.scene.frame_current + 10
            settings.lifetime = 30
            settings.emit_from = 'VERT'
            settings.distribution = 'RAND'
            
            # Física para chispas
            settings.physics_type = 'NEWTON'
            settings.normal_factor = 3.0
            settings.factor_random = 1.5
            settings.particle_size = 0.01
            settings.size_random = 0.8
            
            # Gravedad para efecto realista
            settings.effector_weights.gravity = 0.5
            
            # Material para chispas
            settings.render_type = 'HALO'
            settings.material_slot = 'Sparks'
            
            print(f"Sparks effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding sparks effect: {e}")

    def add_blood_effect(self, obj):
        try:
            if not obj:
                print("No valid object for blood effect")
                return
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            if not obj.particle_systems:
                bpy.ops.object.particle_system_add()
            
            particle_system = obj.particle_systems[-1]
            particle_system.name = "Blood_Particles"
            settings = particle_system.settings
            
            # Configurar para sangre
            settings.type = 'EMITTER'
            settings.count = 200
            settings.frame_start = bpy.context.scene.frame_current
            settings.frame_end = bpy.context.scene.frame_current + 5
            settings.lifetime = 100
            settings.emit_from = 'VERT'
            settings.distribution = 'RAND'
            
            # Física líquida
            settings.physics_type = 'FLUID'
            settings.particle_size = 0.02
            settings.size_random = 0.5
            settings.mass = 1.0
            
            # Crear material de sangre si no existe
            blood_mat_name = "Blood_Material"
            if blood_mat_name not in bpy.data.materials:
                blood_mat = bpy.data.materials.new(name=blood_mat_name)
                blood_mat.use_nodes = True
                
                nodes = blood_mat.node_tree.nodes
                principled = nodes.get("Principled BSDF")
                if principled:
                    principled.inputs["Base Color"].default_value = (0.8, 0.1, 0.1, 1.0)
                    principled.inputs["Roughness"].default_value = 0.3
                    principled.inputs["Metallic"].default_value = 0.0
            
            # Asignar material
            if hasattr(settings, 'material'):
                settings.material = bpy.data.materials[blood_mat_name]
            
            print(f"Blood effect added to {obj.name}")
            
        except Exception as e:
            print(f"Error adding blood effect: {e}")

particle_effects = ParticleEffects()

def register():
    print("MotionFX: Particle effects module loaded")

def unregister():
    print("MotionFX: Particle effects module unloaded")