from PIL import Image, ImageDraw, ImageFilter
import math, random, os

OUT = r'C:\Users\lenovo\Documents\Codex\2026-06-13\recycle-quest\assets\effects'
FRAME = 384
FRAMES = 4

def make_ice_freeze():
    sheet = Image.new('RGBA', (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new('RGBA', (FRAME, FRAME), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        cx, cy = FRAME // 2, FRAME // 2
        progress = f / (FRAMES - 1)
        random.seed(400 + f)

        # Ice crystal formation - growing crystalline shards
        num_shards = 6
        for i in range(num_shards):
            angle = (math.pi * 2 * i / num_shards) + random.uniform(-0.2, 0.2)
            shard_len = int(30 + progress * 80 + random.uniform(0, 20))
            shard_w = int(8 + progress * 6)
            tip_x = cx + math.cos(angle) * shard_len
            tip_y = cy + math.sin(angle) * shard_len
            perp = angle + math.pi / 2
            base_x = cx + math.cos(angle) * 10
            base_y = cy + math.sin(angle) * 10
            x1 = base_x + math.cos(perp) * shard_w
            y1 = base_y + math.sin(perp) * shard_w
            x2 = base_x - math.cos(perp) * shard_w
            y2 = base_y - math.sin(perp) * shard_w
            alpha = int(200 * (1 - progress * 0.3))
            # Outer ice (light blue)
            draw.polygon([(x1, y1), (tip_x, tip_y), (x2, y2)], fill=(100, 200, 255, alpha))
            # Inner ice (white)
            inner_len = shard_len * 0.6
            ix = cx + math.cos(angle) * inner_len
            iy = cy + math.sin(angle) * inner_len
            ix1 = base_x + math.cos(perp) * (shard_w * 0.5)
            iy1 = base_y + math.sin(perp) * (shard_w * 0.5)
            ix2 = base_x - math.cos(perp) * (shard_w * 0.5)
            iy2 = base_y - math.sin(perp) * (shard_w * 0.5)
            draw.polygon([(ix1, iy1), (ix, iy), (ix2, iy2)], fill=(200, 240, 255, alpha))

        # Central ice burst
        burst_r = int(15 + progress * 20)
        for r in range(burst_r, 0, -1):
            t = r / burst_r
            alpha = int(220 * (1 - progress * 0.4) * (1 - t * 0.5))
            if t < 0.4:
                color = (240, 250, 255, alpha)
            else:
                color = (120, 210, 255, alpha)
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color)

        # Frost particles
        for _ in range(20):
            angle = random.uniform(0, math.pi * 2)
            dist = random.uniform(20, 120 + progress * 60)
            px = cx + math.cos(angle) * dist
            py = cy + math.sin(angle) * dist
            pr = random.randint(1, 4)
            a = int(180 * (1 - progress * 0.5))
            draw.ellipse([px-pr, py-pr, px+pr, py+pr], fill=(180, 230, 255, a))

        # Ice ring
        ring_r = int(30 + progress * 50)
        ring_a = int(150 * (1 - progress * 0.4))
        draw.ellipse([cx-ring_r, cy-ring_r, cx+ring_r, cy+ring_r], outline=(150, 220, 255, ring_a), width=2)

        img = img.filter(ImageFilter.GaussianBlur(radius=0.8))
        sheet.paste(img, (f * FRAME, 0), img)
    sheet.save(os.path.join(OUT, 'ice_freeze_sheet.png'))
    print(f'ice_freeze_sheet.png: {sheet.size}')

def make_electric_arc():
    sheet = Image.new('RGBA', (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new('RGBA', (FRAME, FRAME), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        cx, cy = FRAME // 2, FRAME // 2
        progress = f / (FRAMES - 1)
        random.seed(500 + f)

        # Jagged lightning bolts radiating from center
        num_bolts = 5
        for i in range(num_bolts):
            angle = (math.pi * 2 * i / num_bolts) + progress * 0.5 + random.uniform(-0.2, 0.2)
            bolt_len = int(40 + progress * 100 + random.uniform(0, 30))
            # Generate jagged path
            segments = 6
            points = [(cx, cy)]
            for j in range(1, segments + 1):
                t = j / segments
                base_x = cx + math.cos(angle) * bolt_len * t
                base_y = cy + math.sin(angle) * bolt_len * t
                jitter = 15 * (1 - t * 0.3)
                px = base_x + random.uniform(-jitter, jitter)
                py = base_y + random.uniform(-jitter, jitter)
                points.append((px, py))

            # Draw bolt with glow
            bolt_alpha = int(220 * (1 - progress * 0.3))
            # Outer glow (wider, dimmer)
            for w in [6, 4, 2]:
                a = int(bolt_alpha * (w / 6) * 0.6)
                color = (100, 180, 255, a) if w > 2 else (200, 230, 255, bolt_alpha)
                for j in range(len(points) - 1):
                    draw.line([points[j], points[j+1]], fill=color, width=w)

        # Central electric ball
        ball_r = int(12 + progress * 15)
        for r in range(ball_r, 0, -1):
            t = r / ball_r
            alpha = int(255 * (1 - progress * 0.3) * (1 - t * 0.4))
            if t < 0.3:
                color = (255, 255, 255, alpha)
            else:
                color = (100, 200, 255, alpha)
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color)

        # Electric spark particles
        for _ in range(15):
            angle = random.uniform(0, math.pi * 2)
            dist = random.uniform(15, 80 + progress * 40)
            px = cx + math.cos(angle) * dist
            py = cy + math.sin(angle) * dist
            pr = random.randint(1, 3)
            a = int(200 * (1 - progress * 0.4))
            draw.ellipse([px-pr, py-pr, px+pr, py+pr], fill=(150, 220, 255, a))

        img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
        sheet.paste(img, (f * FRAME, 0), img)
    sheet.save(os.path.join(OUT, 'electric_arc_sheet.png'))
    print(f'electric_arc_sheet.png: {sheet.size}')

def make_muzzle_flash():
    sheet = Image.new('RGBA', (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new('RGBA', (FRAME, FRAME), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        cx, cy = FRAME // 2, FRAME // 2
        progress = f / (FRAMES - 1)
        random.seed(600 + f)

        # Central flash burst
        flash_r = int(20 + progress * 30)
        for r in range(flash_r, 0, -1):
            t = r / flash_r
            alpha = int(255 * (1 - progress * 0.6) * (1 - t * 0.3))
            if t < 0.3:
                color = (255, 255, 255, alpha)
            elif t < 0.6:
                color = (255, 240, 150, alpha)
            else:
                color = (255, 180, 50, alpha)
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color)

        # Forward cone (muzzle direction = right)
        cone_len = int(50 + progress * 60)
        for i in range(8):
            angle = random.uniform(-0.4, 0.4)
            x1 = cx
            y1 = cy
            x2 = cx + cone_len * math.cos(angle)
            y2 = cy + cone_len * math.sin(angle)
            a = int(200 * (1 - progress * 0.5))
            draw.line([x1, y1, x2, y2], fill=(255, 220, 100, a), width=random.randint(2, 5))

        # Muzzle star spikes
        num_spikes = 6
        for i in range(num_spikes):
            angle = (math.pi * 2 * i / num_spikes) + random.uniform(-0.1, 0.1)
            spike_len = int(30 + progress * 40 + random.uniform(0, 15))
            x2 = cx + math.cos(angle) * spike_len
            y2 = cy + math.sin(angle) * spike_len
            spike_a = int(180 * (1 - progress * 0.5))
            draw.line([cx, cy, x2, y2], fill=(255, 240, 180, spike_a), width=3)
            draw.line([cx, cy, x2, y2], fill=(255, 255, 255, spike_a // 2), width=1)

        # Smoke wisps (later frames)
        if f >= 1:
            for _ in range(6):
                angle = random.uniform(-0.8, 0.8)
                dist = random.uniform(20, 60 + progress * 30)
                px = cx + math.cos(angle) * dist
                py = cy + math.sin(angle) * dist
                pr = random.randint(5, 12)
                a = int(40 * (1 - progress * 0.3))
                for r in range(pr, 0, -2):
                    draw.ellipse([px-r, py-r, px+r, py+r], fill=(100, 90, 80, int(a * r / pr)))

        img = img.filter(ImageFilter.GaussianBlur(radius=1))
        sheet.paste(img, (f * FRAME, 0), img)
    sheet.save(os.path.join(OUT, 'muzzle_flash_sheet.png'))
    print(f'muzzle_flash_sheet.png: {sheet.size}')

def make_shield_barrier():
    sheet = Image.new('RGBA', (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new('RGBA', (FRAME, FRAME), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        cx, cy = FRAME // 2, FRAME // 2
        progress = f / (FRAMES - 1)
        random.seed(700 + f)

        # Hexagonal shield barrier
        shield_r = int(60 + progress * 30)
        pulse = math.sin(progress * math.pi * 3) * 0.1 + 0.9

        # Multiple shield rings
        for ring in range(3):
            r = int(shield_r * (1 - ring * 0.15) * pulse)
            alpha = int((180 - ring * 40) * (1 - progress * 0.3))
            # Hex shape
            points = []
            for i in range(6):
                angle = math.pi / 3 * i + progress * 0.3
                px = cx + math.cos(angle) * r
                py = cy + math.sin(angle) * r
                points.append((px, py))
            draw.polygon(points, outline=(100, 255, 160, alpha))

        # Inner energy fill
        fill_r = int(shield_r * 0.85 * pulse)
        for r in range(fill_r, 0, -3):
            t = r / fill_r
            alpha = int(40 * (1 - progress * 0.2) * (1 - t))
            color = (80, 220, 130, alpha)
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color)

        # Energy particles orbiting
        for _ in range(12):
            angle = random.uniform(0, math.pi * 2)
            dist = shield_r * random.uniform(0.7, 1.0)
            px = cx + math.cos(angle + progress * 2) * dist
            py = cy + math.sin(angle + progress * 2) * dist
            pr = random.randint(2, 4)
            a = int(200 * (1 - progress * 0.3))
            draw.ellipse([px-pr, py-pr, px+pr, py+pr], fill=(150, 255, 180, a))

        # Central glow
        glow_r = int(15 + progress * 10)
        for r in range(glow_r, 0, -1):
            t = r / glow_r
            alpha = int(150 * (1 - progress * 0.2) * (1 - t * 0.5))
            color = (120, 255, 160, alpha)
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color)

        img = img.filter(ImageFilter.GaussianBlur(radius=0.8))
        sheet.paste(img, (f * FRAME, 0), img)
    sheet.save(os.path.join(OUT, 'shield_barrier_sheet.png'))
    print(f'shield_barrier_sheet.png: {sheet.size}')

def make_power_surge():
    sheet = Image.new('RGBA', (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new('RGBA', (FRAME, FRAME), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        cx, cy = FRAME // 2, FRAME // 2
        progress = f / (FRAMES - 1)
        random.seed(800 + f)

        # Power surge: expanding energy rings with rising power particles
        # Outer expanding ring
        for ring in range(3):
            r = int(30 + progress * 120 + ring * 15)
            alpha = int((200 - ring * 50) * (1 - progress * 0.3))
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], outline=(255, 80, 120, alpha), width=3 - ring)

        # Central power core
        core_r = int(20 + progress * 25)
        for r in range(core_r, 0, -1):
            t = r / core_r
            alpha = int(255 * (1 - progress * 0.3) * (1 - t * 0.4))
            if t < 0.3:
                color = (255, 255, 255, alpha)
            elif t < 0.6:
                color = (255, 100, 150, alpha)
            else:
                color = (255, 50, 100, alpha)
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color)

        # Rising power particles
        for _ in range(25):
            angle = random.uniform(0, math.pi * 2)
            dist = random.uniform(20, 100 + progress * 80)
            px = cx + math.cos(angle) * dist
            py = cy + math.sin(angle) * dist - progress * 30
            pr = random.randint(2, 5)
            a = int(220 * (1 - progress * 0.4))
            color = random.choice([(255, 80, 120, a), (255, 150, 200, a), (255, 200, 220, a)])
            draw.ellipse([px-pr, py-pr, px+pr, py+pr], fill=color)

        # Energy rays
        num_rays = 8
        for i in range(num_rays):
            angle = (math.pi * 2 * i / num_rays) + progress * 0.8
            ray_len = int(40 + progress * 80)
            x2 = cx + math.cos(angle) * ray_len
            y2 = cy + math.sin(angle) * ray_len
            ray_a = int(180 * (1 - progress * 0.4))
            draw.line([cx, cy, x2, y2], fill=(255, 100, 150, ray_a), width=3)
            draw.line([cx, cy, x2, y2], fill=(255, 200, 220, ray_a // 2), width=1)

        # Pulsing aura
        aura_r = int(40 + progress * 60 + math.sin(progress * math.pi * 4) * 10)
        for r in range(aura_r, 0, -3):
            t = r / aura_r
            alpha = int(30 * (1 - progress * 0.2) * (1 - t))
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(255, 50, 100, alpha))

        img = img.filter(ImageFilter.GaussianBlur(radius=1))
        sheet.paste(img, (f * FRAME, 0), img)
    sheet.save(os.path.join(OUT, 'power_surge_sheet.png'))
    print(f'power_surge_sheet.png: {sheet.size}')

make_ice_freeze()
make_electric_arc()
make_muzzle_flash()
make_shield_barrier()
make_power_surge()
print('Done!')
