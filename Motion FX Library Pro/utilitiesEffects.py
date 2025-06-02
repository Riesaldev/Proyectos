import bpy
import random
import mathutils

class UtilitiesEffects:
    def add_slow_motion_effect(self, context):
        """Añade efecto de cámara lenta con control de interpolación"""
        try:
            scene = context.scene
            
            # Configurar time remapping más sofisticado
            if not scene.sequence_editor:
                scene.sequence_editor_create()
            
            # Ajustar velocidad de reproducción
            scene.frame_step = 1  # Mantener paso normal
            
            # Crear curva de tiempo personalizada para objetos seleccionados
            for obj in context.selected_objects:
                if obj.animation_data and obj.animation_data.action:
                    action = obj.animation_data.action
                    
                    # Remapear keyframes existentes
                    for fcurve in action.fcurves:
                        new_keyframes = []
                        for kf in fcurve.keyframe_points:
                            # Estirar tiempo x2 para slow motion
                            new_frame = kf.co[0] * 2
                            new_value = kf.co[1]
                            new_keyframes.append((new_frame, new_value))
                            
                            # Añadir interpolación suave
                            kf.interpolation = 'BEZIER'
                            kf.handle_left_type = 'AUTO_CLAMPED'
                            kf.handle_right_type = 'AUTO_CLAMPED'
                        
                        # Actualizar keyframes
                        for i, (frame, value) in enumerate(new_keyframes):
                            if i < len(fcurve.keyframe_points):
                                fcurve.keyframe_points[i].co = (frame, value)
            
            # Configurar motion blur para mayor realismo
            if scene.render.engine == 'BLENDER_EEVEE':
                scene.eevee.use_motion_blur = True
                scene.eevee.motion_blur_shutter = 0.8
                scene.eevee.motion_blur_samples = 32
            elif scene.render.engine == 'CYCLES':
                scene.render.use_motion_blur = True
                scene.render.motion_blur_shutter = 0.8
            
            print("Advanced slow motion effect applied")
            return True
            
        except Exception as e:
            print(f"Error adding slow motion effect: {e}")
            return False

    def add_fast_forward_effect(self, context):
        """Añade efecto de aceleración con control de interpolación"""
        try:
            scene = context.scene
            
            # Configurar aceleración
            for obj in context.selected_objects:
                if obj.animation_data and obj.animation_data.action:
                    action = obj.animation_data.action
                    
                    # Comprimir keyframes para fast forward
                    for fcurve in action.fcurves:
                        for kf in fcurve.keyframe_points:
                            # Comprimir tiempo /2 para aceleración
                            new_frame = kf.co[0] / 2
                            kf.co = (new_frame, kf.co[1])
                            
                            # Interpolación más agresiva
                            kf.interpolation = 'LINEAR'
            
            # Reducir motion blur para efecto más nítido
            if scene.render.engine == 'BLENDER_EEVEE':
                scene.eevee.use_motion_blur = True
                scene.eevee.motion_blur_shutter = 0.2
                scene.eevee.motion_blur_samples = 16
            
            print("Advanced fast forward effect applied")
            return True
            
        except Exception as e:
            print(f"Error adding fast forward effect: {e}")
            return False

    def add_freeze_frame_effect(self, context):
        """Añade efecto de congelación con transición suave"""
        try:
            scene = context.scene
            current_frame = scene.frame_current
            
            # Congelar animaciones de objetos seleccionados
            for obj in context.selected_objects:
                if obj.animation_data and obj.animation_data.action:
                    action = obj.animation_data.action
                    
                    # Obtener valores actuales
                    current_location = obj.location.copy()
                    current_rotation = obj.rotation_euler.copy()
                    current_scale = obj.scale.copy()
                    
                    # Crear transición suave hacia el freeze
                    freeze_duration = 30  # frames
                    
                    # Keyframes antes del freeze (transición)
                    obj.keyframe_insert(data_path="location", frame=current_frame - 5)
                    obj.keyframe_insert(data_path="rotation_euler", frame=current_frame - 5)
                    obj.keyframe_insert(data_path="scale", frame=current_frame - 5)
                    
                    # Freeze keyframes
                    for frame_offset in range(freeze_duration):
                        freeze_frame = current_frame + frame_offset
                        obj.location = current_location
                        obj.rotation_euler = current_rotation
                        obj.scale = current_scale
                        obj.keyframe_insert(data_path="location", frame=freeze_frame)
                        obj.keyframe_insert(data_path="rotation_euler", frame=freeze_frame)
                        obj.keyframe_insert(data_path="scale", frame=freeze_frame)
                    
                    # Configurar interpolación
                    if obj.animation_data and obj.animation_data.action:
                        for fcurve in obj.animation_data.action.fcurves:
                            for kf in fcurve.keyframe_points:
                                if kf.co[0] >= current_frame:
                                    kf.interpolation = 'CONSTANT'
            
            print(f"Advanced freeze frame effect applied at frame {current_frame}")
            return True
            
        except Exception as e:
            print(f"Error adding freeze frame effect: {e}")
            return False

    def add_reverse_effect(self, context):
        """Añade efecto de reproducción inversa mejorado"""
        try:
            scene = context.scene
            
            # Invertir animaciones de objetos seleccionados
            for obj in context.selected_objects:
                if obj.animation_data and obj.animation_data.action:
                    action = obj.animation_data.action
                    
                    # Obtener rango de keyframes
                    min_frame = float('inf')
                    max_frame = float('-inf')
                    
                    for fcurve in action.fcurves:
                        for kf in fcurve.keyframe_points:
                            min_frame = min(min_frame, kf.co[0])
                            max_frame = max(max_frame, kf.co[0])
                    
                    # Invertir keyframes
                    for fcurve in action.fcurves:
                        keyframe_data = []
                        for kf in fcurve.keyframe_points:
                            # Calcular nueva posición temporal
                            new_frame = max_frame - (kf.co[0] - min_frame)
                            keyframe_data.append((new_frame, kf.co[1]))
                        
                        # Actualizar keyframes
                        for i, (frame, value) in enumerate(keyframe_data):
                            if i < len(fcurve.keyframe_points):
                                fcurve.keyframe_points[i].co = (frame, value)
                                fcurve.keyframe_points[i].interpolation = 'BEZIER'
            
            print("Advanced reverse playback effect applied")
            return True
            
        except Exception as e:
            print(f"Error adding reverse effect: {e}")
            return False

    def add_time_remap_effect(self, obj, remap_type='EASE_IN_OUT'):
        """Añade efecto de remapeo temporal avanzado"""
        try:
            if not obj or not obj.animation_data or not obj.animation_data.action:
                print("Object has no animation data for time remapping")
                return False
            
            action = obj.animation_data.action
            
            for fcurve in action.fcurves:
                # Aplicar diferentes tipos de remapeo
                for keyframe in fcurve.keyframe_points:
                    if remap_type == 'EASE_IN_OUT':
                        keyframe.interpolation = 'BEZIER'
                        keyframe.handle_left_type = 'AUTO_CLAMPED'
                        keyframe.handle_right_type = 'AUTO_CLAMPED'
                        keyframe.easing = 'EASE_IN_OUT'
                    elif remap_type == 'ELASTIC':
                        keyframe.interpolation = 'BEZIER'
                        keyframe.handle_left_type = 'FREE'
                        keyframe.handle_right_type = 'FREE'
                        # Crear handles para efecto elástico
                        keyframe.handle_left = (keyframe.co[0] - 10, keyframe.co[1] - 2)
                        keyframe.handle_right = (keyframe.co[0] + 10, keyframe.co[1] + 2)
                    elif remap_type == 'BOUNCE':
                        keyframe.interpolation = 'BOUNCE'
                    elif remap_type == 'BACK':
                        keyframe.interpolation = 'BACK'
                    elif remap_type == 'EXPO':
                        keyframe.interpolation = 'EXPO'
                    elif remap_type == 'CIRC':
                        keyframe.interpolation = 'CIRC'
                    elif remap_type == 'SINE':
                        keyframe.interpolation = 'SINE'
                    elif remap_type == 'QUINT':
                        keyframe.interpolation = 'QUINT'
                    elif remap_type == 'QUART':
                        keyframe.interpolation = 'QUART'
                    elif remap_type == 'QUAD':
                        keyframe.interpolation = 'QUAD'
            
            print(f"Advanced time remap ({remap_type}) applied to {obj.name}")
            return True
            
        except Exception as e:
            print(f"Error adding time remap effect: {e}")
            return False

    def add_frame_blending_effect(self, context, blend_factor=0.5):
        """Añade efecto de mezcla de frames mejorado"""
        try:
            scene = context.scene
            
            # Configurar motion blur avanzado
            if scene.render.engine == 'BLENDER_EEVEE':
                scene.eevee.use_motion_blur = True
                scene.eevee.motion_blur_shutter = blend_factor
                scene.eevee.motion_blur_samples = 32
                scene.eevee.motion_blur_steps = 2
            elif scene.render.engine == 'CYCLES':
                scene.render.use_motion_blur = True
                scene.render.motion_blur_shutter = blend_factor
                scene.cycles.motion_blur_position = 'CENTER'
            
            # Configurar frame blending en compositor
            scene.use_nodes = True
            tree = scene.node_tree
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
            
            if render_layer and composite:
                # Añadir nodo de vector blur
                vector_blur = nodes.new(type='CompositorNodeVecBlur')
                vector_blur.factor = blend_factor
                vector_blur.samples = 32
                
                # Reconectar
                for link in links:
                    if link.from_node == render_layer and link.to_node == composite:
                        links.remove(link)
                
                links.new(render_layer.outputs['Image'], vector_blur.inputs['Image'])
                links.new(render_layer.outputs['Vector'], vector_blur.inputs['Z'])
                links.new(vector_blur.outputs['Image'], composite.inputs['Image'])
            
            print(f"Advanced frame blending effect applied with factor {blend_factor}")
            return True
            
        except Exception as e:
            print(f"Error adding frame blending effect: {e}")
            return False

    def add_scene_scale_effect(self, scale_factor=2.0):
        """Escala toda la escena con mejor control"""
        try:
            # Obtener todos los objetos seleccionados o visibles
            objects_to_scale = bpy.context.selected_objects if bpy.context.selected_objects else bpy.context.visible_objects
            
            # Encontrar centro de masa de los objetos
            center = mathutils.Vector((0, 0, 0))
            count = 0
            
            for obj in objects_to_scale:
                if obj.type in ['MESH', 'CURVE', 'SURFACE', 'META', 'FONT']:
                    center += obj.location
                    count += 1
            
            if count > 0:
                center /= count
            
            # Escalar objetos desde el centro de masa
            current_frame = bpy.context.scene.frame_current
            
            for obj in objects_to_scale:
                if obj.type in ['MESH', 'CURVE', 'SURFACE', 'META', 'FONT']:
                    # Calcular nueva posición
                    offset = obj.location - center
                    new_location = center + (offset * scale_factor)
                    
                    # Keyframe inicial
                    obj.keyframe_insert(data_path="location", frame=current_frame)
                    obj.keyframe_insert(data_path="scale", frame=current_frame)
                    
                    # Aplicar escala y nueva posición
                    obj.location = new_location
                    obj.scale = obj.scale * scale_factor
                    
                    # Keyframe final
                    obj.keyframe_insert(data_path="location", frame=current_frame + 60)
                    obj.keyframe_insert(data_path="scale", frame=current_frame + 60)
                    
                    # Configurar interpolación suave
                    if obj.animation_data and obj.animation_data.action:
                        for fcurve in obj.animation_data.action.fcurves:
                            for kf in fcurve.keyframe_points:
                                kf.interpolation = 'BEZIER'
                                kf.handle_left_type = 'AUTO'
                                kf.handle_right_type = 'AUTO'
            
            print(f"Advanced scene scale effect applied with factor {scale_factor}")
            return True
            
        except Exception as e:
            print(f"Error adding scene scale effect: {e}")
            return False
    
    def add_physics_time_scale_effect(self, time_scale=0.5):
        """Añade escalado de tiempo para simulaciones físicas"""
        try:
            scene = bpy.context.scene
            
            # Ajustar velocidad de simulaciones
            if hasattr(scene, 'rigidbody_world') and scene.rigidbody_world:
                scene.rigidbody_world.time_scale = time_scale
            
            # Ajustar sistemas de partículas
            for obj in bpy.context.selected_objects:
                for modifier in obj.modifiers:
                    if modifier.type == 'PARTICLE_SYSTEM':
                        settings = modifier.particle_system.settings
                        settings.timestep = 0.04 / time_scale
                        settings.subframes = int(5 * time_scale)
            
            # Ajustar simulaciones de fluidos
            for obj in bpy.context.selected_objects:
                for modifier in obj.modifiers:
                    if modifier.type == 'FLUID':
                        if hasattr(modifier.fluid_settings, 'simulation_method'):
                            modifier.fluid_settings.timestep = 0.1 / time_scale
            
            print(f"Physics time scale effect applied: {time_scale}")
            return True
            
        except Exception as e:
            print(f"Error adding physics time scale effect: {e}")
            return False

    def add_glassmorphism_effect(self, context):
        """Añade efecto glassmorfismo a objetos seleccionados"""
        try:
            for obj in context.selected_objects:
                if obj.type == 'MESH':
                    # Material glassmorfismo
                    mat = bpy.data.materials.new(name=f"Glassmorphism_{obj.name}")
                    mat.use_nodes = True
                    mat.blend_method = 'BLEND'
                    
                    nodes = mat.node_tree.nodes
                    links = mat.node_tree.links
                    nodes.clear()
                    
                    # Nodos principales
                    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
                    output = nodes.new(type='ShaderNodeOutputMaterial')
                    
                    # Configuración glassmorfismo
                    principled.inputs["Base Color"].default_value = (0.95, 0.95, 1.0, 0.1)
                    principled.inputs["Transmission"].default_value = 0.9
                    principled.inputs["Roughness"].default_value = 0.1
                    principled.inputs["IOR"].default_value = 1.33
                    principled.inputs["Alpha"].default_value = 0.1
                    
                    # Ruido para efecto frosted
                    noise = nodes.new(type='ShaderNodeTexNoise')
                    noise.inputs['Scale'].default_value = 100
                    
                    # Mezclar ruido con roughness
                    mix = nodes.new(type='ShaderNodeMixRGB')
                    mix.blend_type = 'MIX'
                    mix.inputs['Fac'].default_value = 0.3
                    
                    links.new(principled.outputs['BSDF'], output.inputs['Surface'])
                    links.new(noise.outputs['Fac'], mix.inputs['Color2'])
                    links.new(mix.outputs['Color'], principled.inputs['Roughness'])
                    
                    obj.data.materials.append(mat)
            
            print("Glassmorphism effect applied to selected objects")
            return True
            
        except Exception as e:
            print(f"Error adding glassmorphism effect: {e}")
            return False

    def add_cyberpunk_glow_effect(self, context, glow_strength=5.0):
        """Añade efecto de brillo cyberpunk neón"""
        try:
            for obj in context.selected_objects:
                if obj.type == 'MESH':
                    # Material neón
                    mat = bpy.data.materials.new(name=f"CyberpunkGlow_{obj.name}")
                    mat.use_nodes = True
                    
                    nodes = mat.node_tree.nodes
                    links = mat.node_tree.links
                    nodes.clear()
                    
                    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
                    output = nodes.new(type='ShaderNodeOutputMaterial')
                    
                    # Colores neón cyberpunk
                    neon_colors = [
                        (1.0, 0.0, 1.0, 1.0),  # Magenta
                        (0.0, 1.0, 1.0, 1.0),  # Cian
                        (1.0, 0.2, 0.8, 1.0),  # Rosa neón
                        (0.2, 1.0, 0.2, 1.0)   # Verde neón
                    ]
                    
                    color = random.choice(neon_colors)
                    
                    principled.inputs["Base Color"].default_value = color
                    principled.inputs["Emission"].default_value = color
                    principled.inputs["Emission Strength"].default_value = glow_strength
                    principled.inputs["Metallic"].default_value = 0.8
                    principled.inputs["Roughness"].default_value = 0.1
                    
                    links.new(principled.outputs['BSDF'], output.inputs['Surface'])
                    obj.data.materials.append(mat)
            
            print(f"Cyberpunk glow effect applied with strength {glow_strength}")
            return True
            
        except Exception as e:
            print(f"Error adding cyberpunk glow effect: {e}")
            return False

    def add_holographic_distortion_effect(self, context):
        """Añade efecto de distorsión holográfica"""
        try:
            for obj in context.selected_objects:
                if obj.type == 'MESH':
                    # Modificador Wave para distorsión
                    wave1 = obj.modifiers.new(name="Hologram_Wave1", type='WAVE')
                    wave1.height = 0.1
                    wave1.width = 2.0
                    wave1.speed = 2.0
                    wave1.use_z = True
                    
                    wave2 = obj.modifiers.new(name="Hologram_Wave2", type='WAVE')
                    wave2.height = 0.05
                    wave2.width = 1.5
                    wave2.speed = -1.5
                    wave2.use_x = True
                    wave2.offset = 1.57
                    
                    # Material holográfico
                    mat = bpy.data.materials.new(name=f"Hologram_{obj.name}")
                    mat.use_nodes = True
                    mat.blend_method = 'BLEND'
                    
                    nodes = mat.node_tree.nodes
                    principled = nodes.get("Principled BSDF")
                    if principled:
                        principled.inputs["Base Color"].default_value = (0.5, 0.8, 1.0, 0.6)
                        principled.inputs["Emission"].default_value = (0.3, 0.6, 1.0, 1.0)
                        principled.inputs["Emission Strength"].default_value = 2.0
                        principled.inputs["Alpha"].default_value = 0.6
                        principled.inputs["Transmission"].default_value = 0.4
                    
                    obj.data.materials.append(mat)
                    
                    # Animación de interferencia
                    current_frame = bpy.context.scene.frame_current
                    wave1.offset = 0
                    wave1.keyframe_insert(data_path="offset", frame=current_frame)
                    wave1.offset = 6.28
                    wave1.keyframe_insert(data_path="offset", frame=current_frame + 60)
            
            print("Holographic distortion effect applied")
            return True
            
        except Exception as e:
            print(f"Error adding holographic distortion effect: {e}")
            return False

    def add_parametric_deformation_effect(self, context, complexity=5):
        """Añade deformación paramétrica avanzada"""
        try:
            for obj in context.selected_objects:
                if obj.type == 'MESH':
                    # Múltiples modificadores para complejidad
                    for i in range(complexity):
                        # Simple Deform con diferentes ejes
                        deform = obj.modifiers.new(name=f"Parametric_{i}", type='SIMPLE_DEFORM')
                        deform_types = ['TWIST', 'BEND', 'TAPER', 'STRETCH']
                        deform.deform_method = random.choice(deform_types)
                        deform.angle = random.uniform(-1.0, 1.0)
                        deform.factor = random.uniform(0.5, 1.5)
                        
                        # Animar factor
                        current_frame = bpy.context.scene.frame_current
                        deform.factor = 0
                        deform.keyframe_insert(data_path="factor", frame=current_frame)
                        deform.factor = random.uniform(0.5, 1.5)
                        deform.keyframe_insert(data_path="factor", frame=current_frame + 60)
            
            print(f"Parametric deformation effect applied with complexity {complexity}")
            return True
            
        except Exception as e:
            print(f"Error adding parametric deformation effect: {e}")
            return False

    def add_bio_organic_growth_effect(self, context):
        """Añade efecto de crecimiento orgánico"""
        try:
            for obj in context.selected_objects:
                if obj.type == 'MESH':
                    # Subdivisión para más geometría
                    subsurf = obj.modifiers.new(name="Bio_Subdivision", type='SUBSURF')
                    subsurf.levels = 2
                    
                    # Desplazamiento orgánico
                    displace = obj.modifiers.new(name="Bio_Displace", type='DISPLACE')
                    displace.strength = 0.5
                    displace.mid_level = 0.5
                    
                    # Animación de crecimiento
                    current_frame = bpy.context.scene.frame_current
                    
                    # Escala inicial pequeña
                    obj.scale = (0.1, 0.1, 0.1)
                    obj.keyframe_insert(data_path="scale", frame=current_frame)
                    
                    # Crecimiento gradual
                    obj.scale = (1.0, 1.0, 1.0)
                    obj.keyframe_insert(data_path="scale", frame=current_frame + 80)
                    
                    # Configurar interpolación orgánica
                    if obj.animation_data and obj.animation_data.action:
                        for fcurve in obj.animation_data.action.fcurves:
                            for kf in fcurve.keyframe_points:
                                kf.interpolation = 'BEZIER'
                                kf.handle_left_type = 'AUTO_CLAMPED'
                                kf.handle_right_type = 'AUTO_CLAMPED'
            
            print("Bio organic growth effect applied")
            return True
            
        except Exception as e:
            print(f"Error adding bio organic growth effect: {e}")
            return False

    def add_nft_showcase_effect(self, context):
        """Añade efecto de showcase NFT con rotación y brillo"""
        try:
            for obj in context.selected_objects:
                if obj.type == 'MESH':
                    # Material premium NFT
                    mat = bpy.data.materials.new(name=f"NFT_Showcase_{obj.name}")
                    mat.use_nodes = True
                    
                    nodes = mat.node_tree.nodes
                    principled = nodes.get("Principled BSDF")
                    if principled:
                        # Colores premium
                        principled.inputs["Base Color"].default_value = (1.0, 0.8, 0.0, 1.0)
                        principled.inputs["Metallic"].default_value = 1.0
                        principled.inputs["Roughness"].default_value = 0.05
                        principled.inputs["Emission"].default_value = (1.0, 0.8, 0.0, 1.0)
                        principled.inputs["Emission Strength"].default_value = 1.0
                    
                    obj.data.materials.append(mat)
                    
                    # Rotación de showcase
                    current_frame = bpy.context.scene.frame_current
                    obj.rotation_euler = (0, 0, 0)
                    obj.keyframe_insert(data_path="rotation_euler", frame=current_frame)
                    obj.rotation_euler = (0.2, 6.28, 0)
                    obj.keyframe_insert(data_path="rotation_euler", frame=current_frame + 240)
                    
                    # Flotación sutil
                    original_z = obj.location[2]
                    obj.location[2] = original_z
                    obj.keyframe_insert(data_path="location", frame=current_frame)
                    obj.location[2] = original_z + 0.5
                    obj.keyframe_insert(data_path="location", frame=current_frame + 120)
                    obj.location[2] = original_z
                    obj.keyframe_insert(data_path="location", frame=current_frame + 240)
            
            print("NFT showcase effect applied")
            return True
            
        except Exception as e:
            print(f"Error adding NFT showcase effect: {e}")
            return False

utilities_effects = UtilitiesEffects()

def register():
    print("MotionFX: Advanced contemporary utilities effects module loaded")

def unregister():
    print("MotionFX: Advanced contemporary utilities effects module unloaded")