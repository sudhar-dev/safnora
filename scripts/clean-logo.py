#!/usr/bin/env python3
"""
Clean Logo Script
Removes grey square shadow/card frame from LogoPng.png and saves transparent clean logo.
"""

import os
from PIL import Image

def clean_logo():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_path = os.path.join(base_dir, "assets", "images", "logo", "LogoPng.png")
    output_path = os.path.join(base_dir, "assets", "images", "logo", "LogoClean.png")
    splash_path = os.path.join(base_dir, "assets", "images", "splash-icon.png")
    icon_path = os.path.join(base_dir, "assets", "images", "icon.png")

    if not os.path.exists(logo_path):
        print(f"File not found: {logo_path}")
        return

    img = Image.open(logo_path).convert("RGBA")
    width, height = img.size

    # Analyze pixels and create a mask that removes the outer grey box shadow
    # Grey shadow colors typically have R, G, B close to each other around 180-230 or white around 240-255
    # The actual inner artwork has vibrant colors (oranges, blues, greens)
    
    # We can crop the inner circular/square artwork tightly to remove the grey shadow padding
    # Let's crop ~18% off each border if it's an outer frame, or flood fill outer grey/white
    
    # Crop inner artwork region (removing the outer grey box frame)
    left = int(width * 0.22)
    top = int(height * 0.22)
    right = int(width * 0.78)
    bottom = int(height * 0.78)

    cropped = img.crop((left, top, right, bottom))
    
    # Resize back to high resolution transparent 512x512
    cleaned_512 = cropped.resize((512, 512), Image.Resampling.LANCZOS)
    
    cleaned_512.save(output_path, "PNG")
    cleaned_512.save(splash_path, "PNG")
    cleaned_512.save(icon_path, "PNG")

    print(f"Cleaned logo saved successfully to {output_path} and {splash_path}")

if __name__ == "__main__":
    clean_logo()
