import bpy
from bpy.types import Operator
from bpy.props import EnumProperty, StringProperty
from .utilities import save_preset_data, load_preset_data, get_available_presets

def get_effect_items(self, context):
    try:
        from .effects_operations import EffectsOperations
        return EffectsOperations.get_effect_items()
    except Exception as e:
        print(f"Error generating effect items: {e}")
        return [("NONE", "No Effects Available", "Error loading effects")]

class MOTIONFX_OT_apply_effect(bpy.types.Operator):
    bl_idname = "motionfx.apply_effect"
    bl_label = "Apply Motion FX Effect"
    bl_description = "Apply selected effect to active object"
    bl_options = {'REGISTER', 'UNDO'}

    effect_type: EnumProperty(
        name="Effect",
        description="Choose effect to apply",
        items=get_effect_items,
    )

    def execute(self, context):
        if self.effect_type == "NONE":
            self.report({'ERROR'}, "No valid effect selected")
            return {'CANCELLED'}
            
        obj = context.active_object
        if not obj:
            self.report({'ERROR'}, "No active object selected")
            return {'CANCELLED'}

        try:
            from .effects_operations import EffectsOperations
            EffectsOperations.initialize_effect_map()
            
            # Verificar si es un efecto de utilidades que requiere contexto
            utility_effects = [
                'slow_motion', 'fast_forward', 'freeze_frame', 'reverse',
                'time_remap', 'frame_blending', 'scene_scale', 'physics_time_scale',
                'glassmorphism', 'cyberpunk_glow', 'holographic_distortion',
                'bio_organic_growth', 'nft_showcase'
            ]
            
            if self.effect_type in utility_effects:
                success = EffectsOperations.apply_utility_effect(self.effect_type, context)
            else:
                success = EffectsOperations.apply_effect(self.effect_type, obj)
            
            if success:
                effect_name = self.effect_type.replace("_", " ").title()
                if self.effect_type in utility_effects:
                    self.report({'INFO'}, f"Utility effect '{effect_name}' applied to scene/selection")
                else:
                    self.report({'INFO'}, f"Effect '{effect_name}' applied to '{obj.name}'")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to apply effect '{self.effect_type}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error applying effect: {str(e)}")
            return {'CANCELLED'}

    def invoke(self, context, event):
        if not context.active_object:
            self.report({'ERROR'}, "No active object selected")
            return {'CANCELLED'}
            
        return context.window_manager.invoke_props_dialog(self)

    def draw(self, context):
        layout = self.layout
        layout.prop(self, "effect_type")
        
        if context.active_object:
            layout.label(text=f"Target: {context.active_object.name}")

class MOTIONFX_OT_save_preset(bpy.types.Operator):
    bl_idname = "motionfx.save_preset"
    bl_label = "Save Preset"
    bl_description = "Save current configuration as preset"
    bl_options = {'REGISTER', 'UNDO'}

    preset_name: StringProperty(
        name="Preset Name",
        description="Name for the preset",
        default="My Preset"
    )

    def execute(self, context):
        try:
            if not hasattr(context.scene, "motionfx_settings"):
                self.report({'ERROR'}, "MotionFX settings not found")
                return {'CANCELLED'}

            settings = context.scene.motionfx_settings
            
            preset_data = {
                'effect_category': settings.effect_category,
                'advanced_mode': settings.advanced_mode,
                'live_update': settings.live_update,
            }
            
            if save_preset_data(self.preset_name, preset_data):
                self.report({'INFO'}, f"Preset '{self.preset_name}' saved successfully")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Error saving preset '{self.preset_name}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error saving preset: {e}")
            return {'CANCELLED'}

    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)

class MOTIONFX_OT_load_preset(bpy.types.Operator):
    bl_idname = "motionfx.load_preset"
    bl_label = "Load Preset"
    bl_description = "Load saved preset"
    bl_options = {'REGISTER', 'UNDO'}

    def get_presets(self, context):
        items = []
        available_presets = get_available_presets()
        
        for preset_name in available_presets:
            items.append((preset_name, preset_name, f"Load preset {preset_name}"))
        
        if not items:
            items.append(("NONE", "No presets", "No presets found"))
        
        return items

    preset_choice: EnumProperty(
        name="Preset",
        description="Select preset to load",
        items=get_presets
    )

    def execute(self, context):
        if self.preset_choice == "NONE":
            self.report({'WARNING'}, "No presets available")
            return {'CANCELLED'}
        
        try:
            if not hasattr(context.scene, "motionfx_settings"):
                self.report({'ERROR'}, "MotionFX settings not found")
                return {'CANCELLED'}

            preset_data = load_preset_data(self.preset_choice)
            if not preset_data:
                self.report({'ERROR'}, f"Could not load preset '{self.preset_choice}'")
                return {'CANCELLED'}
            
            settings = context.scene.motionfx_settings
            
            for key, value in preset_data.items():
                if hasattr(settings, key):
                    try:
                        setattr(settings, key, value)
                    except Exception as e:
                        print(f"Could not set property {key}: {e}")
                else:
                    print(f"Preset key '{key}' not found in settings.")
            
            self.report({'INFO'}, f"Preset '{self.preset_choice}' loaded successfully")
            
            if hasattr(context.area, 'tag_redraw'):
                context.area.tag_redraw()

            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Error loading preset: {e}")
            return {'CANCELLED'}

    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)

classes = (
    MOTIONFX_OT_apply_effect,
    MOTIONFX_OT_save_preset,
    MOTIONFX_OT_load_preset,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    print("MotionFX: Operators module loaded")

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    print("MotionFX: Operators module unloaded")