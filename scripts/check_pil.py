import sys
try:
    from PIL import Image, ImageDraw, ImageFont
    print("PIL is installed!")
except ImportError:
    print("PIL not installed, installing or using alternative...")
