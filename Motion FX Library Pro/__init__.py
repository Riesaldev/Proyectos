bl_info = {
    "name": "Motion FX Library Pro",
    "author": "RiesalDev",
    "version": (1, 5, 0),
    "blender": (3, 6, 0),
    "location": "View3D > Sidebar > Motion FX",
    "description": "Professional VFX library with advanced animation and special effects tools",
    "category": "Animation",
    "doc_url": "",
    "tracker_url": "",
}

import bpy
import importlib
import sys

basic_modules = [
    'properties',
    'utilities',
]

effect_modules = [
    'animationEffects',
    'particlesEffects', 
    'materialEffects',
    'cameraEffects',
    'lightingEffects',
    'simulationEffects',
    'utilitiesEffects',
    'visualEffects',
    'vector_fields',
    'mockups'
]

main_modules = [
    'effects_operations',
    'operators', 
    'panels',
    'quick_effects',  # Renombrado de 'drag_drop'
]

def safe_import_module(module_name, package=__name__, optional=False):
    try:
        if package:
            full_name = f"{package}.{module_name}"
        else:
            full_name = module_name
            
        if full_name in sys.modules:
            return importlib.reload(sys.modules[full_name])
        else:
            return importlib.import_module(f".{module_name}", package)
    except Exception as e:
        if not optional:
            print(f"MotionFX: Error importing module {module_name}: {e}")
        return None

def register():
    print("MotionFX: Starting add-on registration...")
    
    imported_modules = {}
    registration_order = basic_modules + effect_modules + main_modules
    
    for module_name in registration_order:
        module = safe_import_module(module_name)
        if module:
            imported_modules[module_name] = module
            if hasattr(module, "register"):
                try:
                    module.register()
                except Exception as e:
                    print(f"MotionFX: Error registering {module_name}: {e}")
    
    global _imported_modules
    _imported_modules = imported_modules
    
    print(f"Motion FX Library Pro: Add-on registered successfully ({len(imported_modules)} modules)")

def unregister():
    print("MotionFX: Starting add-on unregistration...")
    
    global _imported_modules
    if '_imported_modules' in globals():
        all_modules = list(_imported_modules.values())
        
        for module in reversed(all_modules):
            if hasattr(module, "unregister"):
                try:
                    module.unregister()
                except Exception as e:
                    print(f"MotionFX: Error unregistering {module.__name__}: {e}")
    
    print("Motion FX Library Pro: Add-on unregistered successfully")

_imported_modules = {}

if __name__ == "__main__":
    register()