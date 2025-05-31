import bpy
from bpy.types import Operator
from bpy.props import EnumProperty
from .effects_operations import EffectsOperations

def get_effect_items(self, context):
    """Función que genera los items del enum dinámicamente"""
    try:
        # Asegurar que el mapa de efectos esté inicializado
        if not hasattr(EffectsOperations, '_effect_map') or not EffectsOperations._effect_map:
            EffectsOperations.initialize_effect_map()
        
        return EffectsOperations.get_effect_items()
    except Exception as e:
        print(f"Error generating effect items: {e}")
        return [("NONE", "No Effects Available", "Error loading effects")]

class MotionFX_OT_ApplyEffect(Operator):
    bl_idname = "motionfx.apply_effect"
    bl_label = "Apply Motion FX Effect"
    bl_description = "Apply the selected motion effect to the active object"
    bl_options = {'REGISTER', 'UNDO'}

    effect_type: EnumProperty(
        name="Effect",
        description="Choose the effect to apply",
        items=get_effect_items,
    )

    def execute(self, context):
        # Validaciones de contexto
        if self.effect_type == "NONE":
            self.report({'ERROR'}, "No valid effect selected")
            return {'CANCELLED'}
            
        obj = context.active_object
        if not obj:
            self.report({'ERROR'}, "No active object selected. Please select an object first.")
            return {'CANCELLED'}

        # Validación específica por tipo de objeto
        mesh_only_effects = ["cloth", "fluid", "rigid_body", "soft_body", "ocean", "wave", 
                           "fire", "smoke", "explosion", "sparks", "blood"]
        
        if self.effect_type in mesh_only_effects and obj.type != 'MESH':
            self.report({'ERROR'}, f"Effect '{self.effect_type}' only works on mesh objects. Selected object type: {obj.type}")
            return {'CANCELLED'}

        try:
            # Asegurar que EffectsOperations esté inicializado
            if not hasattr(EffectsOperations, '_effect_map') or not EffectsOperations._effect_map:
                EffectsOperations.initialize_effect_map()
            
            # Aplicar el efecto seleccionado
            success = EffectsOperations.apply_effect(self.effect_type, obj)
            
            if success:
                # Formatear nombre del efecto para mostrar
                effect_name = self.effect_type.replace("_", " ").title()
                self.report({'INFO'}, f"Applied '{effect_name}' effect to '{obj.name}'")
                
                # Forzar actualización de la vista
                if context.area:
                    context.area.tag_redraw()
                    
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to apply effect '{self.effect_type}' to '{obj.name}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error applying effect: {str(e)}")
            print(f"Detailed error: {e}")
            return {'CANCELLED'}

    def invoke(self, context, event):
        # Validar contexto antes de mostrar el diálogo
        if not context.active_object:
            self.report({'ERROR'}, "No active object selected")
            return {'CANCELLED'}
            
        return context.window_manager.invoke_props_dialog(self)

    def draw(self, context):
        layout = self.layout
        layout.prop(self, "effect_type")
        
        # Mostrar información del objeto activo
        if context.active_object:
            layout.label(text=f"Target: {context.active_object.name} ({context.active_object.type})")

class MotionFX_OT_QuickApply(Operator):
    """Operador para aplicación rápida sin diálogo"""
    bl_idname = "motionfx.quick_apply"
    bl_label = "Quick Apply Effect"
    bl_description = "Quickly apply an effect without dialog"
    bl_options = {'REGISTER', 'UNDO'}
    
    effect_type: bpy.props.StringProperty()
    
    def execute(self, context):
        if not self.effect_type:
            self.report({'ERROR'}, "No effect type specified")
            return {'CANCELLED'}
            
        obj = context.active_object
        if not obj:
            self.report({'ERROR'}, "No active object selected")
            return {'CANCELLED'}
        
        try:
            success = EffectsOperations.apply_effect(self.effect_type, obj)
            
            if success:
                effect_name = self.effect_type.replace("_", " ").title()
                self.report({'INFO'}, f"Applied '{effect_name}' to '{obj.name}'")
                return {'FINISHED'}
            else:
                self.report({'ERROR'}, f"Failed to apply effect '{self.effect_type}'")
                return {'CANCELLED'}
                
        except Exception as e:
            self.report({'ERROR'}, f"Error: {str(e)}")
            return {'CANCELLED'}

classes = (
    MotionFX_OT_ApplyEffect,
    MotionFX_OT_QuickApply,
)

def register():
    # Inicializar el mapa de efectos antes del registro
    try:
        EffectsOperations.initialize_effect_map()
        print("MotionFX: Effects map initialized successfully")
    except Exception as e:
        print(f"MotionFX: Error initializing effects map: {e}")
    
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)