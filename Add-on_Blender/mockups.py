# Mockups 3D drag and drop preestablecidas para Blender
import bpy
from bpy.props import StringProperty, BoolProperty

class Mockups:
#TODO: Implementar un sistema de mockups que permita arrastrar y soltar modelos 3D preestablecidos en la escena de Blender.
    def __init__(self):
        self.mockups = []

    def add_mockup(self, name, filepath):
        mockup = {
            'name': name,
            'filepath': filepath
        }
        self.mockups.append(mockup)

    def get_mockups(self):
        return self.mockups
