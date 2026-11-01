import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/icons", exist_ok=True)

def create_pwa_icon(size, output_path):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Rounded rectangle background with luxury purple-to-pink gradient
    radius = int(size * 0.22)
    # Generate vertical gradient
    for y in range(size):
        ratio = y / size
        # #7c3aed (124, 58, 237) -> #ec4899 (236, 72, 153)
        r = int(124 + (236 - 124) * ratio)
        g = int(58 + (72 - 58) * ratio)
        b = int(237 + (153 - 237) * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Mask to rounded rect
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (size, size)], radius=radius, fill=255)
    img.putalpha(mask)

    # Draw overlay elements
    draw = ImageDraw.Draw(img)

    # Subtle inner glow / border
    border_color = (255, 255, 255, 60)
    draw.rounded_rectangle([(2, 2), (size - 3, size - 3)], radius=radius - 2, outline=border_color, width=max(2, int(size * 0.015)))

    # Draw a stylized tooth silhouette in the center
    # Center coordinates
    cx, cy = size / 2, size / 2 - size * 0.02
    scale = size / 512.0

    # Tooth crown & roots polygon / bezier approximation
    tooth_pts = [
        (cx - 120 * scale, cy - 100 * scale),
        (cx - 100 * scale, cy - 140 * scale),
        (cx - 40 * scale, cy - 160 * scale),
        (cx, cy - 130 * scale),
        (cx + 40 * scale, cy - 160 * scale),
        (cx + 100 * scale, cy - 140 * scale),
        (cx + 120 * scale, cy - 100 * scale),
        (cx + 110 * scale, cy),
        (cx + 80 * scale, cy + 90 * scale),
        (cx + 60 * scale, cy + 160 * scale),
        (cx + 35 * scale, cy + 160 * scale),
        (cx + 25 * scale, cy + 70 * scale),
        (cx, cy + 50 * scale),
        (cx - 25 * scale, cy + 70 * scale),
        (cx - 35 * scale, cy + 160 * scale),
        (cx - 60 * scale, cy + 160 * scale),
        (cx - 80 * scale, cy + 90 * scale),
        (cx - 110 * scale, cy),
    ]

    # Draw tooth drop shadow
    shadow_pts = [(x + 4 * scale, y + 8 * scale) for x, y in tooth_pts]
    draw.polygon(shadow_pts, fill=(0, 0, 0, 70))

    # Draw tooth body (bright pearly white)
    draw.polygon(tooth_pts, fill=(255, 255, 255, 250))

    # Add soft enamel highlight curve
    draw.ellipse([
        cx - 80 * scale, cy - 130 * scale,
        cx - 20 * scale, cy - 80 * scale
    ], fill=(255, 255, 255, 120))

    # Draw small golden 4-point sparkle stars
    def draw_sparkle(sx, sy, rad):
        s_pts = [
            (sx, sy - rad),
            (sx + rad * 0.25, sy - rad * 0.25),
            (sx + rad, sy),
            (sx + rad * 0.25, sy + rad * 0.25),
            (sx, sy + rad),
            (sx - rad * 0.25, sy + rad * 0.25),
            (sx - rad, sy),
            (sx - rad * 0.25, sy - rad * 0.25),
        ]
        draw.polygon(s_pts, fill=(254, 240, 138, 240)) # Warm soft gold

    draw_sparkle(cx + 110 * scale, cy - 110 * scale, 35 * scale)
    draw_sparkle(cx - 115 * scale, cy - 60 * scale, 22 * scale)

    # Save PNG
    img.save(output_path, "PNG")
    print(f"Generated: {output_path} ({size}x{size})")

create_pwa_icon(180, "public/icons/apple-touch-icon.png")
create_pwa_icon(192, "public/icons/icon-192x192.png")
create_pwa_icon(512, "public/icons/icon-512x512.png")
create_pwa_icon(180, "public/icons/apple-touch-icon-180x180.png")
