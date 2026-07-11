# Generate a high-quality explosion effect sprite sheet using PIL with much more detail
# This will be a 4-frame horizontal strip on green screen, then chroma-keyed
from PIL import Image, ImageDraw, ImageFilter
import math, random, os

OUT = r'C:\Users\lenovo\Documents\Codex\2026-06-13\recycle-quest\assets\effects'
FRAME = 384
FRAMES = 4

def make_explosion():
    sheet = Image.new('RGBA', (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new('RGBA', (FRAME, FRAME), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        cx, cy = FRAME // 2, FRAME // 2
        progress = f / (FRAMES - 1)
        random.seed(100 + f)
        
        # Outer fireball - expanding
        outer_r = int(30 + progress * 130)
        for r in range(outer_r, 0, -2):
            t = r / outer_r
            if t > 0.7:
                # Outer smoke ring
                alpha = int(60 * (1 - progress * 0.5) * (1 - (t - 0.7) / 0.3))
                color = (80, 60, 50, alpha)
            elif t > 0.4:
                # Mid fire - orange
                alpha = int(200 * (1 - progress * 0.3) * (1 - abs(t - 0.55) / 0.3))
                color = (255, int(140 + (1-t) * 80), int(20 + (1-t) * 40), max(0, alpha))
            else:
                # Inner core - white/yellow
                alpha = int(255 * (1 - progress * 0.6) * (1 - t / 0.4))
                color = (255, 255, int(200 + (1-t) * 55), max(0, alpha))
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color)
        
        # Jagged burst rays
        num_rays = 12
        for i in range(num_rays):
            angle = (math.pi * 2 * i / num_rays) + random.uniform(-0.1, 0.1)
            ray_len = int(outer_r * (0.8 + random.uniform(0, 0.4)))
            x1 = cx + math.cos(angle) * outer_r * 0.3
            y1 = cy + math.sin(angle) * outer_r * 0.3
            x2 = cx + math.cos(angle) * ray_len
            y2 = cy + math.sin(angle) * ray_len
            ray_alpha = int(180 * (1 - progress * 0.5))
            # Thick ray
            for w in range(4, 0, -1):
                a = int(ray_alpha * (w / 4))
                draw.line([x1, y1, x2, y2], fill=(255, 220, 100, a), width=w)
        
        # Flying debris particles
        for _ in range(25):
            angle = random.uniform(0, math.pi * 2)
            dist = random.uniform(outer_r * 0.5, outer_r * 1.3)
            px = cx + math.cos(angle) * dist
            py = cy + math.sin(angle) * dist
            pr = random.randint(2, 6)
            a = int(200 * (1 - progress * 0.7))
            color = random.choice([(255, 200, 50, a), (255, 100, 30, a), (200, 80, 20, a)])
            draw.ellipse([px-pr, py-pr, px+pr, py+pr], fill=color)
        
        # Smoke puffs (later frames)
        if f >= 1:
            for _ in range(8):
                angle = random.uniform(0, math.pi * 2)
                dist = random.uniform(outer_r * 0.6, outer_r * 0.9)
                px = cx + math.cos(angle) * dist
                py = cy + math.sin(angle) * dist - progress * 20
                pr = random.randint(15, 30)
                for r in range(pr, 0, -3):
                    a = int(30 * (1 - progress * 0.4) * (r / pr))
                    draw.ellipse([px-r, py-r, px+r, py+r], fill=(60, 50, 45, a))
        
        # Flash overlay on frame 0
        if f == 0:
            for r in range(outer_r + 40, 0, -5):
                a = int(80 * (1 - r / (outer_r + 40)))
                draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(255, 255, 255, a))
        
        img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
        sheet.paste(img, (f * FRAME, 0), img)
    
    sheet.save(os.path.join(OUT, 'explosion_sheet.png'))
    print(f'explosion_sheet.png: {sheet.size}')

def make_hit_spark():
    sheet = Image.new('RGBA', (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new('RGBA', (FRAME, FRAME), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        cx, cy = FRAME // 2, FRAME // 2
        progress = f / (FRAMES - 1)
        random.seed(200 + f)
        
        # Central flash
        flash_r = int(15 + progress * 25)
        for r in range(flash_r, 0, -1):
            t = r / flash_r
            alpha = int(255 * (1 - progress * 0.5) * (1 - t))
            if t < 0.3:
                color = (255, 255, 255, alpha)
            elif t < 0.6:
                color = (255, 240, 150, alpha)
            else:
                color = (255, 200, 50, alpha)
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color)
        
        # Star-shaped spike rays
        num_spikes = 8
        for i in range(num_spikes):
            angle = (math.pi * 2 * i / num_spikes) + random.uniform(-0.05, 0.05)
            spike_len = int(40 + progress * 80 + random.uniform(0, 20))
            x1 = cx + math.cos(angle) * 5
            y1 = cy + math.sin(angle) * 5
            x2 = cx + math.cos(angle) * spike_len
            y2 = cy + math.sin(angle) * spike_len
            spike_alpha = int(220 * (1 - progress * 0.4))
            # Draw spike as triangle
            perp_angle = angle + math.pi / 2
            w = 3 + (1 - progress) * 4
            x1p = x1 + math.cos(perp_angle) * w
            y1p = y1 + math.sin(perp_angle) * w
            x1m = x1 - math.cos(perp_angle) * w
            y1m = y1 - math.sin(perp_angle) * w
            draw.polygon([(x1p, y1p), (x2, y2), (x1m, y1m)], fill=(255, 220, 80, spike_alpha))
            # Outer glow line
            draw.line([x1, y1, x2, y2], fill=(255, 255, 200, spike_alpha // 2), width=2)
        
        # Spark particles flying outward
        for _ in range(20):
            angle = random.uniform(0, math.pi * 2)
            dist = random.uniform(20, 100 + progress * 60)
            px = cx + math.cos(angle) * dist
            py = cy + math.sin(angle) * dist
            pr = random.randint(1, 4)
            a = int(200 * (1 - progress * 0.6))
            draw.ellipse([px-pr, py-pr, px+pr, py+pr], fill=(255, 230, 100, a))
        
        img = img.filter(ImageFilter.GaussianBlur(radius=0.8))
        sheet.paste(img, (f * FRAME, 0), img)
    
    sheet.save(os.path.join(OUT, 'hit_spark_sheet.png'))
    print(f'hit_spark_sheet.png: {sheet.size}')

def make_slash():
    sheet = Image.new('RGBA', (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new('RGBA', (FRAME, FRAME), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        cx, cy = FRAME // 2, FRAME // 2
        progress = f / (FRAMES - 1)
        
        # Crescent slash arc sweeping from left to right
        base_angle = -math.pi * 0.6 + progress * math.pi * 1.2
        arc_radius = 100
        arc_width = int(20 + progress * 15)
        
        # Draw crescent as series of arcs
        for w in range(arc_width, 0, -2):
            t = w / arc_width
            alpha = int(255 * (1 - progress * 0.4) * (1 - t * 0.5))
            if t < 0.3:
                color = (255, 255, 255, alpha)  # White core
            elif t < 0.6:
                color = (150, 240, 255, alpha)  # Cyan mid
            else:
                color = (50, 180, 220, alpha)  # Cyan outer
            # Draw arc segment
            start_angle = base_angle - 0.5 + t * 0.3
            end_angle = base_angle + 0.5 - t * 0.3
            bbox = [cx - arc_radius - w, cy - arc_radius - w, cx + arc_radius + w, cy + arc_radius + w]
            try:
                draw.arc(bbox, math.degrees(start_angle), math.degrees(end_angle), fill=color, width=max(1, w // 3))
            except:
                pass
        
        # Motion blur trailing particles
        random.seed(300 + f)
        for _ in range(15):
            angle = base_angle + random.uniform(-0.6, 0.6)
            dist = random.uniform(arc_radius * 0.7, arc_radius * 1.2)
            px = cx + math.cos(angle) * dist
            py = cy + math.sin(angle) * dist
            pr = random.randint(1, 3)
            a = int(180 * (1 - progress * 0.5))
            draw.ellipse([px-pr, py-pr, px+pr, py+pr], fill=(180, 240, 255, a))
        
        # Leading edge sparkle
        lead_x = cx + math.cos(base_angle) * arc_radius
        lead_y = cy + math.sin(base_angle) * arc_radius
        for r in range(12, 0, -2):
            a = int(200 * (1 - progress * 0.3) * (1 - r / 12))
            draw.ellipse([lead_x-r, lead_y-r, lead_x+r, lead_y+r], fill=(255, 255, 255, a))
        
        img = img.filter(ImageFilter.GaussianBlur(radius=1))
        sheet.paste(img, (f * FRAME, 0), img)
    
    sheet.save(os.path.join(OUT, 'slash_effect_sheet.png'))
    print(f'slash_effect_sheet.png: {sheet.size}')

make_explosion()
make_hit_spark()
make_slash()
print('Done!')
