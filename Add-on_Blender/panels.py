import bpy
from bpy.types import Panel

class MotionFX_PT_Panel(Panel):
  bl_label = "Motion Effects Library"
  bl_idname = "MOTIONFX_PT_MainPanel"
  bl_space_type = 'VIEW_3D'
  bl_region_type = 'UI'
  bl_category = "MotionFX"

  def draw(self, context):
    layout = self.layout
    scene = context.scene
    settings = scene.motionfx_settings

    layout.prop(settings, "effect_category", expand=True)
    box = layout.box()

    if settings.effect_category == 'ANIMATION':
      self.draw_animation_effects(box)
    elif settings.effect_category == 'SIMULATION':
      self.draw_simulation_effects(box)
    elif settings.effect_category == 'PARTICLES':
      self.draw_particle_effects(box)
    elif settings.effect_category == 'VISUAL':
      self.draw_visual_effects(box)
    elif settings.effect_category == 'MATERIALS':
      self.draw_material_effects(box)
    elif settings.effect_category == 'LIGHTING':
      self.draw_lighting_effects(box)
    elif settings.effect_category == 'CAMERA':
      self.draw_camera_effects(box)
    elif settings.effect_category == 'UTILITIES':
      self.draw_utilities_effects(box)

  def draw_animation_effects(self, layout):
    col = layout.column(align=True)
    col.operator("motionfx.apply_effect", text="Bounce").effect = "add_bounce_effect"
    col.operator("motionfx.apply_effect", text="Bounce Back").effect = "add_bounce_back_effect"
    col.operator("motionfx.apply_effect", text="Blink").effect = "add_blink_effect"
    col.operator("motionfx.apply_effect", text="Fade").effect = "add_fade_effect"
    col.operator("motionfx.apply_effect", text="Follow Object").effect = "add_follow_object_effect"
    col.operator("motionfx.apply_effect", text="Follow Path").effect = "add_follow_path_effect"
    col.operator("motionfx.apply_effect", text="Jelly").effect = "add_jelly_effect"
    col.operator("motionfx.apply_effect", text="Pulse").effect = "add_pulse_effect"
    col.operator("motionfx.apply_effect", text="Rotate").effect = "add_rotate_effect"
    col.operator("motionfx.apply_effect", text="Shake").effect = "add_shake_effect"
    col.operator("motionfx.apply_effect", text="Sine Wave").effect = "add_sine_wave_effect"
    col.operator("motionfx.apply_effect", text="Spin").effect = "add_spin_effect"
    col.operator("motionfx.apply_effect", text="Spring").effect = "add_spring_effect"
    col.operator("motionfx.apply_effect", text="Squash & Stretch").effect = "add_squash_stretch_effect"
    col.operator("motionfx.apply_effect", text="Twist").effect = "add_twist_effect"
    col.operator("motionfx.apply_effect", text="Wave").effect = "add_wave_effect"
    col.operator("motionfx.apply_effect", text="Wiggle").effect = "add_wiggle_effect"
    col.operator("motionfx.apply_effect", text="Zoom").effect = "add_zoom_effect"

  def draw_simulation_effects(self, layout):
    col = layout.column(align=True)
    col.operator("motionfx.apply_effect", text="Cloth").effect = "add_cloth_effect"
    col.operator("motionfx.apply_effect", text="Fluid").effect = "add_fluid_effect"
    col.operator("motionfx.apply_effect", text="Rigid Body").effect = "add_rigid_body_effect"
    col.operator("motionfx.apply_effect", text="Soft Body").effect = "add_soft_body_effect"
    col.operator("motionfx.apply_effect", text="Vortex").effect = "add_vortex_effect"

  def draw_particle_effects(self, layout):
    col = layout.column(align=True)
    col.operator("motionfx.apply_effect", text="Blood").effect = "add_blood_effect"
    col.operator("motionfx.apply_effect", text="Bubbles").effect = "add_bubbles_effect"
    col.operator("motionfx.apply_effect", text="Confetti").effect = "add_confetti_effect"
    col.operator("motionfx.apply_effect", text="Dust").effect = "add_dust_effect"
    col.operator("motionfx.apply_effect", text="Explosion").effect = "add_explosion_effect"
    col.operator("motionfx.apply_effect", text="Fire").effect = "add_fire_effect"
    col.operator("motionfx.apply_effect", text="Fireworks").effect = "add_fireworks_effect"
    col.operator("motionfx.apply_effect", text="Frost Particles").effect = "add_frost_particles_effect"
    col.operator("motionfx.apply_effect", text="Ghost Particles").effect = "add_ghost_particles_effect"
    col.operator("motionfx.apply_effect", text="Glitter Particles").effect = "add_glitter_particles_effect"
    col.operator("motionfx.apply_effect", text="Leaves").effect = "add_leaves_effect"
    col.operator("motionfx.apply_effect", text="Lightning").effect = "add_lightning_effect"
    col.operator("motionfx.apply_effect", text="Mist Particles").effect = "add_mist_particles_effect"
    col.operator("motionfx.apply_effect", text="Plasma").effect = "add_plasma_effect"
    col.operator("motionfx.apply_effect", text="Rain").effect = "add_rain_effect"
    col.operator("motionfx.apply_effect", text="Rainbow Particles").effect = "add_rainbow_particles_effect"
    col.operator("motionfx.apply_effect", text="Smoke").effect = "add_smoke_effect"
    col.operator("motionfx.apply_effect", text="Snow Particles").effect = "add_snow_particles_effect"
    col.operator("motionfx.apply_effect", text="Sparkles").effect = "add_sparkles_effect"
    col.operator("motionfx.apply_effect", text="Sparks").effect = "add_sparks_effect"
    col.operator("motionfx.apply_effect", text="Spider Web").effect = "add_spider_web_effect"

  def draw_visual_effects(self, layout):
    col = layout.column(align=True)
    col.operator("motionfx.apply_effect", text="Black & White").effect = "add_black_white_effect"
    col.operator("motionfx.apply_effect", text="Bloom").effect = "add_bloom_effect"
    col.operator("motionfx.apply_effect", text="Blur").effect = "add_blur_effect"
    col.operator("motionfx.apply_effect", text="Chromatic Aberration").effect = "add_chromatic_aberration_effect"
    col.operator("motionfx.apply_effect", text="Colorize").effect = "add_colorize_effect"
    col.operator("motionfx.apply_effect", text="Fisheye").effect = "add_fisheye_effect"
    col.operator("motionfx.apply_effect", text="Glitch").effect = "add_glitch_effect"
    col.operator("motionfx.apply_effect", text="Glow").effect = "add_glow_effect"
    col.operator("motionfx.apply_effect", text="Grain").effect = "add_grain_effect"
    col.operator("motionfx.apply_effect", text="Hologram").effect = "add_hologram_effect"
    col.operator("motionfx.apply_effect", text="Kirby").effect = "add_kirby_effect"
    col.operator("motionfx.apply_effect", text="Lens Distortion").effect = "add_lens_distortion_effect"
    col.operator("motionfx.apply_effect", text="Lens Flare").effect = "add_lens_flare_effect"
    col.operator("motionfx.apply_effect", text="Light Rays").effect = "add_light_rays_effect"
    col.operator("motionfx.apply_effect", text="Noise").effect = "add_noise_effect"
    col.operator("motionfx.apply_effect", text="Pixel Sort").effect = "add_pixel_sort_effect"
    col.operator("motionfx.apply_effect", text="Pixelate").effect = "add_pixelate_effect"
    col.operator("motionfx.apply_effect", text="Rainbow").effect = "add_rainbow_effect"
    col.operator("motionfx.apply_effect", text="Reflection Visual").effect = "add_reflection_visual_effect"
    col.operator("motionfx.apply_effect", text="Sepia").effect = "add_sepia_effect"
    col.operator("motionfx.apply_effect", text="Shadow").effect = "add_shadow_effect"
    col.operator("motionfx.apply_effect", text="Sharpen").effect = "add_sharpen_effect"
    col.operator("motionfx.apply_effect", text="Vignette").effect = "add_vignette_effect"
    col.operator("motionfx.apply_effect", text="Wire").effect = "add_wire_effect"

  def draw_material_effects(self, layout):
    col = layout.column(align=True)
    col.operator("motionfx.apply_effect", text="Anisotropic").effect = "add_anisotropic_effect"
    col.operator("motionfx.apply_effect", text="Ash").effect = "add_ash_effect"
    col.operator("motionfx.apply_effect", text="Carpaint").effect = "add_carpaint_effect"
    col.operator("motionfx.apply_effect", text="Displacement").effect = "add_displacement_effect"
    col.operator("motionfx.apply_effect", text="Emission").effect = "add_emission_effect"
    col.operator("motionfx.apply_effect", text="Frost").effect = "add_frost_effect"
    col.operator("motionfx.apply_effect", text="Ghost").effect = "add_ghost_effect"
    col.operator("motionfx.apply_effect", text="Glass").effect = "add_glass_effect"
    col.operator("motionfx.apply_effect", text="Glitter").effect = "add_glitter_effect"
    col.operator("motionfx.apply_effect", text="Glossy").effect = "add_glossy_effect"
    col.operator("motionfx.apply_effect", text="Ice").effect = "add_ice_effect"
    col.operator("motionfx.apply_effect", text="Matte").effect = "add_matte_effect"
    col.operator("motionfx.apply_effect", text="Metallic").effect = "add_metallic_effect"
    col.operator("motionfx.apply_effect", text="Mist").effect = "add_mist_effect"
    col.operator("motionfx.apply_effect", text="Normal Map").effect = "add_normal_map_effect"
    col.operator("motionfx.apply_effect", text="Plastic").effect = "add_plastic_effect"
    col.operator("motionfx.apply_effect", text="Reflection").effect = "add_reflection_effect"
    col.operator("motionfx.apply_effect", text="Refraction").effect = "add_refraction_effect"
    col.operator("motionfx.apply_effect", text="Snow").effect = "add_snow_effect"
    col.operator("motionfx.apply_effect", text="Stone").effect = "add_stone_effect"
    col.operator("motionfx.apply_effect", text="Subsurface").effect = "add_subsurface_effect"
    col.operator("motionfx.apply_effect", text="Texture").effect = "add_texture_effect"
    col.operator("motionfx.apply_effect", text="Translucent").effect = "add_translucent_effect"
    col.operator("motionfx.apply_effect", text="Transparent").effect = "add_transparent_effect"
    col.operator("motionfx.apply_effect", text="Wood").effect = "add_wood_effect"

  def draw_lighting_effects(self, layout):
    col = layout.column(align=True)
    col.operator("motionfx.apply_effect", text="Fireworks Light").effect = "add_fireworks_light_effect"
    col.operator("motionfx.apply_effect", text="Flash").effect = "add_flash_effect"
    col.operator("motionfx.apply_effect", text="Glowing").effect = "add_glowing_effect"
    col.operator("motionfx.apply_effect", text="Global Illumination").effect = "add_global_illumination_effect"
    col.operator("motionfx.apply_effect", text="Lens Flare Light").effect = "add_lens_flare_light_effect"
    col.operator("motionfx.apply_effect", text="Neon").effect = "add_neon_effect"
    col.operator("motionfx.apply_effect", text="Ray Tracing").effect = "add_ray_tracing_effect"
    col.operator("motionfx.apply_effect", text="Shadows").effect = "add_shadows_effect"
    col.operator("motionfx.apply_effect", text="Spotlight").effect = "add_spotlight_effect"

  def draw_camera_effects(self, layout):
    col = layout.column(align=True)
    col.operator("motionfx.apply_effect", text="Camera Dolly").effect = "add_camera_dolly_effect"
    col.operator("motionfx.apply_effect", text="Camera Focus Pull").effect = "add_camera_focus_pull_effect"
    col.operator("motionfx.apply_effect", text="Camera Follow").effect = "add_camera_follow_effect"
    col.operator("motionfx.apply_effect", text="Camera Lens Flare").effect = "add_camera_lens_flare_effect"
    col.operator("motionfx.apply_effect", text="Camera Pan").effect = "add_camera_pan_effect"
    col.operator("motionfx.apply_effect", text="Camera Rotate").effect = "add_camera_rotate_effect"
    col.operator("motionfx.apply_effect", text="Camera Shake").effect = "add_camera_shake_effect"
    col.operator("motionfx.apply_effect", text="Camera Stabilization").effect = "add_camera_stabilization_effect"
    col.operator("motionfx.apply_effect", text="Camera Tilt").effect = "add_camera_tilt_effect"
    col.operator("motionfx.apply_effect", text="Camera Tracking").effect = "add_camera_tracking_effect"
    col.operator("motionfx.apply_effect", text="Camera Zoom").effect = "add_camera_zoom_effect"
    col.operator("motionfx.apply_effect", text="Depth of Field").effect = "add_depth_of_field_effect"
    col.operator("motionfx.apply_effect", text="Focus").effect = "add_focus_effect"
    col.operator("motionfx.apply_effect", text="Lens Distortion").effect = "add_lens_distortion_camera_effect"
    col.operator("motionfx.apply_effect", text="Path").effect = "add_path_effect"
    col.operator("motionfx.apply_effect", text="Track").effect = "add_track_effect"

  def draw_utilities_effects(self, layout):
    col = layout.column(align=True)
    col.operator("motionfx.apply_effect", text="Cinematic").effect = "add_cinematic_effect"
    col.operator("motionfx.apply_effect", text="Fast Forward").effect = "add_fast_forward_effect"
    col.operator("motionfx.apply_effect", text="Freeze Frame").effect = "add_freeze_frame_effect"
    col.operator("motionfx.apply_effect", text="Reverse").effect = "add_reverse_effect"
    col.operator("motionfx.apply_effect", text="Slow Motion").effect = "add_slow_motion_effect"
    col.operator("motionfx.apply_effect", text="Time Warp").effect = "add_time_warp_effect"

classes = (
  MotionFX_PT_Panel,
)

def register():
  for cls in classes:
    bpy.utils.register_class(cls)

def unregister():
  for cls in reversed(classes):
    bpy.utils.unregister_class(cls)
