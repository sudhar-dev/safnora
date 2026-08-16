#!/usr/bin/env python3
"""
SAFNORA Logo Conversion Script
Converts source logo in assets/images/logo into:
- assets/logo/512x512.png (512x512)
- assets/logo/1024x1024.png (1024x1024)
- assets/logo/logo.png (512x512)
- assets/images/icon.png (1024x1024)
- assets/images/splash-icon.png (512x512)
- assets/images/android-icon-foreground.png (512x512)
"""

import os
import sys
from PIL import Image

def convert_logo():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_dir = os.path.join(base_dir, "assets", "logo")
    images_dir = os.path.join(base_dir, "assets", "images")
    
    os.makedirs(logo_dir, exist_ok=True)
    os.makedirs(images_dir, exist_ok=True)

    # Search for source logo
    possible_sources = [
        os.path.join(base_dir, "assets", "images", "logo", "LogoPng.png"),
        os.path.join(base_dir, "assets", "images", "logo", "Logo.png"),
        os.path.join(base_dir, "assets", "images", "icon.png"),
    ]

    source_path = None
    for src in possible_sources:
        if os.path.exists(src):
            source_path = src
            break

    if not source_path:
        print("Error: No source logo found in assets/images/logo/", file=sys.stderr)
        sys.exit(1)

    print(f"Using source logo: {source_path}")
    img = Image.open(source_path)

    # Convert image to RGBA if not already
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    # Make square canvas if not square
    w, h = img.size
    size = max(w, h)
    
    # 512x512 version
    img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
    img_512.save(os.path.join(logo_dir, "512x512.png"), "PNG")
    img_512.save(os.path.join(logo_dir, "logo.png"), "PNG")
    img_512.save(os.path.join(images_dir, "splash-icon.png"), "PNG")
    img_512.save(os.path.join(images_dir, "android-icon-foreground.png"), "PNG")

    # 1024x1024 version
    img_1024 = img.resize((1024, 1024), Image.Resampling.LANCZOS)
    img_1024.save(os.path.join(logo_dir, "1024x1024.png"), "PNG")
    img_1024.save(os.path.join(images_dir, "icon.png"), "PNG")

    print("Logo conversion complete!")
    print(f"  - {os.path.join(logo_dir, '512x512.png')}")
    print(f"  - {os.path.join(logo_dir, '1024x1024.png')}")
    print(f"  - {os.path.join(logo_dir, 'logo.png')}")
    print(f"  - {os.path.join(images_dir, 'icon.png')}")
    print(f"  - {os.path.join(images_dir, 'splash-icon.png')}")

if __name__ == "__main__":
    convert_logo()
