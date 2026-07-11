"""Scrap Loop - Premium Effect Sprite Generator v3"""
from PIL import Image, ImageDraw, ImageFilter
import math, random, os

OUT = r"C:\Users\lenovo\Documents\Codex\2026-06-13\recycle-quest\assets\effects"
FRAME = 384
FRAMES = 4


def ease_out(t):
    return 1 - (1 - t) ** 2


def ease_in_out(t):
    if t < 0.5:
        return 2 * t * t
    return 1 - ((-2 * t + 2) ** 2) / 2


def radial_gradient(draw, cx, cy, max_r, color_inner, color_outer, alpha_max=255, alpha_min=0):
    if max_r <= 0:
        return
    for r in range(max_r, 0, -1):
        t = 1 - r / max_r
        rr = int(color_outer[0] + (color_inner[0] - color_outer[0]) * t)
        gg = int(color_outer[1] + (color_inner[1] - color_outer[1]) * t)
        bb = int(color_outer[2] + (color_inner[2] - color_outer[2]) * t)
        aa = int(alpha_min + (alpha_max - alpha_min) * t)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(rr, gg, bb, aa))


def add_bloom(img, radius=2):
    blurred = img.filter(ImageFilter.GaussianBlur(radius=radius))
    img.alpha_composite(blurred)


def make_sheet(name, frame_renderers):
    sheet = Image.new("RGBA", (FRAME * FRAMES, FRAME), (0, 0, 0, 0))
    for f in range(FRAMES):
        img = Image.new("RGBA", (FRAME, FRAME), (0, 0, 0, 0))
        for render_fn in frame_renderers:
            render_fn(img, f)
        sheet.paste(img, (f * FRAME, 0), img)
    path = os.path.join(OUT, name + "_sheet.png")
    sheet.save(path)
    print(name + "_sheet.png: " + str(sheet.size))


# 1. HIT SPARK
def render_hit_spark(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_out(t)
    random.seed(200 + f)
    glow_r = int(40 + progress * 100)
    radial_gradient(draw, cx, cy, glow_r, (255, 255, 200), (255, 180, 50), alpha_max=40, alpha_min=0)
    num_spikes = 8
    for i in range(num_spikes):
        angle = (math.pi * 2 * i / num_spikes) + random.uniform(-0.08, 0.08)
        spike_len = int(50 + progress * 90 + random.uniform(0, 25))
        x1 = cx + math.cos(angle) * 8
        y1 = cy + math.sin(angle) * 8
        x2 = cx + math.cos(angle) * spike_len
        y2 = cy + math.sin(angle) * spike_len
        perp = angle + math.pi / 2
        w = int(5 + (1 - progress) * 6)
        sa = int(230 * (1 - progress * 0.5))
        x1p = x1 + math.cos(perp) * w
        y1p = y1 + math.sin(perp) * w
        x1m = x1 - math.cos(perp) * w
        y1m = y1 - math.sin(perp) * w
        draw.polygon([(x1 + math.cos(perp) * (w + 3), y1 + math.sin(perp) * (w + 3)), (x2, y2), (x1 - math.cos(perp) * (w + 3), y1 - math.sin(perp) * (w + 3))], fill=(255, 220, 80, sa // 3))
        draw.polygon([(x1p, y1p), (x2, y2), (x1m, y1m)], fill=(255, 240, 100, sa))
        draw.line([(x1, y1), (x2, y2)], fill=(255, 255, 255, sa), width=max(1, w // 3))
    flash_r = int(20 + progress * 25)
    radial_gradient(draw, cx, cy, flash_r, (255, 255, 255), (255, 220, 80), alpha_max=int(255 * (1 - progress * 0.4)), alpha_min=0)
    for _ in range(25):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(25, 120 + progress * 70)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist
        pr = random.randint(1, 5)
        a = int(220 * (1 - progress * 0.6))
        trail_len = random.randint(8, 20)
        tx = px - math.cos(angle) * trail_len
        ty = py - math.sin(angle) * trail_len
        draw.line([(tx, ty), (px, py)], fill=(255, 220, 80, a // 2), width=max(1, pr))
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=(255, 240, 120, a))
    add_bloom(img, 1.5)


# 2. SLASH ARC
def render_slash(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_in_out(t)
    random.seed(300 + f)
    base_angle = -math.pi * 0.7 + progress * math.pi * 1.4
    arc_radius = 105
    arc_width = int(24 + progress * 12)
    for layer in range(arc_width, 0, -1):
        lt = layer / arc_width
        alpha = int(255 * (1 - progress * 0.35) * (1 - lt * 0.6))
        if lt < 0.25:
            color = (255, 255, 255, alpha)
        elif lt < 0.5:
            color = (180, 250, 255, alpha)
        elif lt < 0.75:
            color = (80, 200, 240, alpha)
        else:
            color = (30, 130, 200, alpha)
        start_a = base_angle - 0.55 + lt * 0.25
        end_a = base_angle + 0.55 - lt * 0.25
        bbox = [cx - arc_radius - layer, cy - arc_radius - layer, cx + arc_radius + layer, cy + arc_radius + layer]
        try:
            draw.arc(bbox, math.degrees(start_a), math.degrees(end_a), fill=color, width=max(1, layer // 4))
        except:
            pass
    for _ in range(20):
        angle = base_angle + random.uniform(-0.7, 0.7)
        dist = random.uniform(arc_radius * 0.65, arc_radius * 1.25)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist
        pr = random.randint(1, 4)
        a = int(190 * (1 - progress * 0.5))
        trail_len = random.randint(5, 15)
        tx = px - math.cos(base_angle) * trail_len * random.choice([-1, 1])
        ty = py - math.sin(base_angle) * trail_len * random.choice([-1, 1])
        draw.line([(tx, ty), (px, py)], fill=(150, 230, 255, a // 2), width=pr)
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=(200, 245, 255, a))
    lead_x = cx + math.cos(base_angle) * arc_radius
    lead_y = cy + math.sin(base_angle) * arc_radius
    radial_gradient(draw, lead_x, lead_y, 16, (255, 255, 255), (150, 230, 255), alpha_max=int(230 * (1 - progress * 0.3)), alpha_min=0)
    radial_gradient(draw, cx, cy, int(arc_radius * 0.8), (100, 200, 255), (0, 80, 160), alpha_max=25, alpha_min=0)
    add_bloom(img, 1.2)


# 3. EXPLOSION
def render_explosion(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_out(t)
    random.seed(100 + f)
    outer_r = int(35 + progress * 140)
    if f >= 1:
        for _ in range(10):
            angle = random.uniform(0, math.pi * 2)
            dist = random.uniform(outer_r * 0.55, outer_r * 0.9)
            px = cx + math.cos(angle) * dist
            py = cy + math.sin(angle) * dist - progress * 15
            pr = random.randint(18, 35)
            for r in range(pr, 0, -3):
                a = int(35 * (1 - progress * 0.4) * (r / pr))
                draw.ellipse([px - r, py - r, px + r, py + r], fill=(50, 42, 38, a))
    for r in range(outer_r, 0, -1):
        t_r = r / outer_r
        if t_r > 0.75:
            alpha = int(55 * (1 - progress * 0.5) * (1 - (t_r - 0.75) / 0.25))
            color = (90, 50, 35, alpha)
        elif t_r > 0.5:
            alpha = int(180 * (1 - progress * 0.3))
            mix = (t_r - 0.5) / 0.25
            color = (255, int(100 + mix * 60), int(20 + mix * 20), alpha)
        elif t_r > 0.25:
            alpha = int(230 * (1 - progress * 0.4))
            mix = (t_r - 0.25) / 0.25
            color = (255, int(160 + mix * 40), int(40 + mix * 60), alpha)
        else:
            alpha = int(255 * (1 - progress * 0.6))
            color = (255, 255, int(180 + (1 - t_r / 0.25) * 75), alpha)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    num_rays = 10
    for i in range(num_rays):
        angle = (math.pi * 2 * i / num_rays) + random.uniform(-0.15, 0.15)
        ray_len = int(outer_r * (0.75 + random.uniform(0, 0.45)))
        x1 = cx + math.cos(angle) * outer_r * 0.25
        y1 = cy + math.sin(angle) * outer_r * 0.25
        x2 = cx + math.cos(angle) * ray_len
        y2 = cy + math.sin(angle) * ray_len
        ray_a = int(200 * (1 - progress * 0.5))
        for w in range(5, 0, -1):
            a = int(ray_a * (w / 5))
            col = (255, 220, 80, a) if w > 2 else (255, 255, 200, a)
            draw.line([(x1, y1), (x2, y2)], fill=col, width=w)
    for _ in range(30):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(outer_r * 0.4, outer_r * 1.3)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist - progress * 10
        pr = random.randint(2, 7)
        a = int(210 * (1 - progress * 0.7))
        col = random.choice([(255, 200, 50, a), (255, 120, 30, a), (200, 70, 20, a)])
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=col)
    if f == 0:
        flash_r = outer_r + 50
        for r in range(flash_r, 0, -3):
            a = int(60 * (1 - r / flash_r))
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, a))
    add_bloom(img, 1.8)


# 4. ICE FREEZE
def render_ice_freeze(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_out(t)
    random.seed(400 + f)
    for tier, (num, base_len, base_w) in enumerate([(6, 90, 12), (6, 55, 8)]):
        offset = (tier * math.pi / 6) + progress * 0.2
        for i in range(num):
            angle = (math.pi * 2 * i / num) + offset + random.uniform(-0.15, 0.15)
            shard_len = int(base_len * (0.4 + progress * 0.7) + random.uniform(0, 15))
            shard_w = int(base_w * (0.5 + progress * 0.6))
            tip_x = cx + math.cos(angle) * shard_len
            tip_y = cy + math.sin(angle) * shard_len
            perp = angle + math.pi / 2
            base_x = cx + math.cos(angle) * 12
            base_y = cy + math.sin(angle) * 12
            x1 = base_x + math.cos(perp) * shard_w
            y1 = base_y + math.sin(perp) * shard_w
            x2 = base_x - math.cos(perp) * shard_w
            y2 = base_y - math.sin(perp) * shard_w
            alpha = int(210 * (1 - progress * 0.35))
            draw.polygon([(x1, y1), (tip_x, tip_y), (x2, y2)], fill=(100, 200, 255, alpha))
            inner_len = shard_len * 0.55
            ix = cx + math.cos(angle) * inner_len
            iy = cy + math.sin(angle) * inner_len
            ix1 = base_x + math.cos(perp) * (shard_w * 0.45)
            iy1 = base_y + math.sin(perp) * (shard_w * 0.45)
            ix2 = base_x - math.cos(perp) * (shard_w * 0.45)
            iy2 = base_y - math.sin(perp) * (shard_w * 0.45)
            draw.polygon([(ix1, iy1), (ix, iy), (ix2, iy2)], fill=(220, 245, 255, alpha))
            if tier == 0 and progress > 0.2:
                branch_len = int(shard_len * 0.3)
                for side in [-1, 1]:
                    ba = angle + side * math.pi / 3
                    bx = cx + math.cos(angle) * shard_len * 0.5
                    by = cy + math.sin(angle) * shard_len * 0.5
                    btx = bx + math.cos(ba) * branch_len
                    bty = by + math.sin(ba) * branch_len
                    bw = max(3, shard_w // 3)
                    bx1 = bx + math.cos(ba + math.pi / 2) * bw
                    by1 = by + math.sin(ba + math.pi / 2) * bw
                    bx2 = bx - math.cos(ba + math.pi / 2) * bw
                    by2 = by - math.sin(ba + math.pi / 2) * bw
                    draw.polygon([(bx1, by1), (btx, bty), (bx2, by2)], fill=(150, 220, 255, alpha // 2))
    burst_r = int(18 + progress * 22)
    radial_gradient(draw, cx, cy, burst_r, (240, 250, 255), (100, 200, 255), alpha_max=int(230 * (1 - progress * 0.3)), alpha_min=0)
    for _ in range(25):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(25, 130 + progress * 60)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist
        pr = random.randint(1, 5)
        a = int(190 * (1 - progress * 0.5))
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=(180, 230, 255, a))
    ring_r = int(35 + progress * 55)
    ring_a = int(160 * (1 - progress * 0.4))
    draw.ellipse([cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r], outline=(150, 220, 255, ring_a), width=3)
    ring_r2 = int(25 + progress * 35)
    draw.ellipse([cx - ring_r2, cy - ring_r2, cx + ring_r2, cy + ring_r2], outline=(200, 240, 255, ring_a // 2), width=1)
    add_bloom(img, 1.0)


# 5. ELECTRIC ARC
def render_electric_arc(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_out(t)
    random.seed(500 + f)
    num_bolts = 6
    for i in range(num_bolts):
        angle = (math.pi * 2 * i / num_bolts) + progress * 0.4 + random.uniform(-0.15, 0.15)
        bolt_len = int(50 + progress * 110 + random.uniform(0, 25))
        segments = 7
        points = [(cx, cy)]
        for j in range(1, segments + 1):
            tt = j / segments
            bx = cx + math.cos(angle) * bolt_len * tt
            by = cy + math.sin(angle) * bolt_len * tt
            jitter = 18 * (1 - tt * 0.3) * (1 - progress * 0.2)
            px = bx + random.uniform(-jitter, jitter)
            py = by + random.uniform(-jitter, jitter)
            points.append((px, py))
        bolt_alpha = int(230 * (1 - progress * 0.3))
        for w, a_mult, col in [(8, 0.3, (60, 130, 255)), (5, 0.5, (100, 180, 255)), (3, 0.8, (180, 220, 255)), (1, 1.0, (255, 255, 255))]:
            a = int(bolt_alpha * a_mult)
            for j in range(len(points) - 1):
                draw.line([points[j], points[j + 1]], fill=(col[0], col[1], col[2], a), width=w)
        if progress > 0.1 and random.random() > 0.4:
            branch_pt = random.choice(points[1:-1]) if len(points) > 3 else points[1]
            ba = angle + random.uniform(-1, 1)
            blen = int(bolt_len * random.uniform(0.2, 0.4))
            bex = branch_pt[0] + math.cos(ba) * blen
            bey = branch_pt[1] + math.sin(ba) * blen
            bseg = 3
            bpts = [branch_pt]
            for j in range(1, bseg + 1):
                tt = j / bseg
                bx2 = branch_pt[0] + math.cos(ba) * blen * tt
                by2 = branch_pt[1] + math.sin(ba) * blen * tt
                jitter2 = 10 * (1 - tt * 0.3)
                bpts.append((bx2 + random.uniform(-jitter2, jitter2), by2 + random.uniform(-jitter2, jitter2)))
            for j in range(len(bpts) - 1):
                draw.line([bpts[j], bpts[j + 1]], fill=(180, 220, 255, int(bolt_alpha * 0.6)), width=2)
    ball_r = int(15 + progress * 18)
    radial_gradient(draw, cx, cy, ball_r, (255, 255, 255), (80, 180, 255), alpha_max=int(255 * (1 - progress * 0.3)), alpha_min=0)
    for _ in range(20):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(20, 90 + progress * 40)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist
        pr = random.randint(1, 3)
        a = int(210 * (1 - progress * 0.4))
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=(150, 220, 255, a))
    radial_gradient(draw, cx, cy, int(60 + progress * 40), (60, 140, 255), (0, 40, 120), alpha_max=20, alpha_min=0)
    add_bloom(img, 0.8)


# 6. POISON CLOUD
def render_poison_cloud(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_out(t)
    random.seed(600 + f)
    num_blobs = 6
    for i in range(num_blobs):
        angle = (math.pi * 2 * i / num_blobs) + progress * 1.5 + random.uniform(-0.5, 0.5)
        dist = random.uniform(15, 60 + progress * 50)
        bx = cx + math.cos(angle) * dist
        by = cy + math.sin(angle) * dist
        blob_r = int(30 + progress * 50 + random.uniform(-10, 15))
        for r in range(blob_r, 0, -2):
            t_r = r / blob_r
            if t_r > 0.7:
                a = int(50 * (1 - progress * 0.4) * (1 - (t_r - 0.7) / 0.3))
                color = (60, 100, 40, a)
            elif t_r > 0.4:
                a = int(100 * (1 - progress * 0.3))
                mix = (t_r - 0.4) / 0.3
                color = (90 + int(mix * 20), 160 + int(mix * 20), 50 + int(mix * 30), a)
            else:
                a = int(150 * (1 - progress * 0.3))
                color = (130, 200, 70, a)
            draw.ellipse([bx - r, by - r, bx + r, by + r], fill=color)
    core_r = int(35 + progress * 30)
    radial_gradient(draw, cx, cy, core_r, (160, 220, 80), (60, 100, 30), alpha_max=int(130 * (1 - progress * 0.3)), alpha_min=0)
    for _ in range(15):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(20, 90 + progress * 40)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist + progress * 10
        pr = random.randint(2, 6)
        a = int(180 * (1 - progress * 0.5))
        col = random.choice([(120, 200, 50, a), (100, 160, 40, a), (140, 80, 100, a)])
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=col)
    for _ in range(10):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(30, 80 + progress * 50)
        wx = cx + math.cos(angle + progress * 3) * dist
        wy = cy + math.sin(angle + progress * 3) * dist
        wr = random.randint(8, 18)
        for r in range(wr, 0, -2):
            a = int(30 * (1 - progress * 0.4) * (r / wr))
            draw.ellipse([wx - r, wy - r, wx + r, wy + r], fill=(80, 120, 50, a))
    add_bloom(img, 2.5)


# 7. MUZZLE FLASH
def render_muzzle_flash(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_out(t)
    random.seed(700 + f)
    flash_r = int(22 + progress * 35)
    radial_gradient(draw, cx, cy, flash_r, (255, 255, 255), (255, 160, 40), alpha_max=int(255 * (1 - progress * 0.6)), alpha_min=0)
    cone_len = int(55 + progress * 65)
    for i in range(10):
        angle = random.uniform(-0.5, 0.5)
        x1 = cx
        y1 = cy
        x2 = cx + cone_len * math.cos(angle)
        y2 = cy + cone_len * math.sin(angle)
        a = int(220 * (1 - progress * 0.5))
        col = (255, 220, 80, a) if i % 3 != 0 else (255, 255, 200, a)
        draw.line([(x1, y1), (x2, y2)], fill=col, width=random.randint(2, 6))
    num_spikes = 7
    for i in range(num_spikes):
        angle = (math.pi * 2 * i / num_spikes) + random.uniform(-0.1, 0.1)
        spike_len = int(35 + progress * 45 + random.uniform(0, 18))
        if abs(angle) < 1 or abs(angle - 2 * math.pi) < 1:
            spike_len = int(spike_len * 1.5)
        x2 = cx + math.cos(angle) * spike_len
        y2 = cy + math.sin(angle) * spike_len
        perp = angle + math.pi / 2
        w = 4
        x1p = cx + math.cos(perp) * w
        y1p = cy + math.sin(perp) * w
        x1m = cx - math.cos(perp) * w
        y1m = cy - math.sin(perp) * w
        spike_a = int(190 * (1 - progress * 0.5))
        draw.polygon([(x1p, y1p), (x2, y2), (x1m, y1m)], fill=(255, 230, 120, spike_a))
        draw.line([(cx, cy), (x2, y2)], fill=(255, 255, 255, spike_a), width=2)
    if f >= 1:
        for _ in range(8):
            angle = random.uniform(-0.9, 0.9)
            dist = random.uniform(25, 65 + progress * 30)
            px = cx + math.cos(angle) * dist
            py = cy + math.sin(angle) * dist
            pr = random.randint(6, 14)
            for r in range(pr, 0, -2):
                a = int(45 * (1 - progress * 0.3) * (r / pr))
                draw.ellipse([px - r, py - r, px + r, py + r], fill=(90, 80, 70, a))
    radial_gradient(draw, cx, cy, int(50 + progress * 30), (255, 200, 50), (120, 60, 0), alpha_max=30, alpha_min=0)
    add_bloom(img, 1.5)


# 8. HEAL AURA
def render_heal_aura(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_in_out(t)
    random.seed(800 + f)
    ground_r = int(60 + progress * 20)
    for r in range(ground_r, 0, -2):
        t_r = r / ground_r
        a = int(50 * (1 - progress * 0.2) * (1 - t_r))
        draw.ellipse([cx - r, cy + 80 - r, cx + r, cy + 80 + r], fill=(80, 200, 100, a))
    for _ in range(30):
        angle = random.uniform(-0.6, 0.6)
        base_dist = random.uniform(0, 50)
        rise = random.uniform(40, 180) * (0.3 + progress * 0.9)
        px = cx + math.cos(angle - math.pi / 2) * base_dist + random.uniform(-20, 20)
        py = cy + 100 - rise
        pr = random.randint(2, 6)
        a = int(220 * (1 - progress * 0.4))
        if pr > 4:
            col = (255, 255, 255, a)
        else:
            col = (100, 230, 120, a)
        trail = random.randint(8, 20)
        draw.line([(px, py + trail), (px, py)], fill=(100, 220, 130, a // 3), width=pr)
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=col)
    for _ in range(12):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(10, 60)
        rise = random.uniform(30, 150) * (0.3 + progress * 0.8)
        px = cx + math.cos(angle) * dist
        py = cy + 80 - rise
        size = random.randint(4, 8)
        leaf_a = int(180 * (1 - progress * 0.4))
        draw.ellipse([px - size, py - size // 2, px + size, py + size // 2], fill=(80, 200, 100, leaf_a))
    glow_r = int(40 + progress * 25)
    radial_gradient(draw, cx, cy + 30, glow_r, (150, 255, 150), (40, 120, 50), alpha_max=int(60 * (1 - progress * 0.2)), alpha_min=0)
    add_bloom(img, 1.2)


# 9. SHIELD BARRIER
def render_shield_barrier(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_out(t)
    random.seed(900 + f)
    pulse = math.sin(progress * math.pi * 3) * 0.08 + 0.92
    for ring in range(3):
        r = int((70 + progress * 25 - ring * 12) * pulse)
        alpha = int((200 - ring * 45) * (1 - progress * 0.3))
        points = []
        for i in range(6):
            angle = math.pi / 3 * i + progress * 0.3
            px = cx + math.cos(angle) * r
            py = cy + math.sin(angle) * r
            points.append((px, py))
        draw.polygon(points, outline=(60, 200, 120, alpha // 3))
        draw.polygon(points, outline=(100, 255, 160, alpha))
        for i in range(6):
            mid_x = (points[i][0] + points[(i + 1) % 6][0]) / 2
            mid_y = (points[i][1] + points[(i + 1) % 6][1]) / 2
            inner_x = cx + (mid_x - cx) * 0.5
            inner_y = cy + (mid_y - cy) * 0.5
            draw.line([(cx, cy), (inner_x, inner_y)], fill=(80, 220, 130, alpha // 3), width=1)
    fill_r = int(65 * pulse)
    radial_gradient(draw, cx, cy, fill_r, (80, 220, 130), (20, 100, 50), alpha_max=int(40 * (1 - progress * 0.2)), alpha_min=0)
    for _ in range(16):
        angle = random.uniform(0, math.pi * 2)
        dist = 70 * random.uniform(0.6, 1.0) * pulse
        px = cx + math.cos(angle + progress * 2.5) * dist
        py = cy + math.sin(angle + progress * 2.5) * dist
        pr = random.randint(2, 5)
        a = int(220 * (1 - progress * 0.3))
        col = (150, 255, 180, a) if pr > 3 else (255, 255, 255, a)
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=col)
    core_r = int(18 + progress * 8)
    radial_gradient(draw, cx, cy, core_r, (200, 255, 200), (80, 200, 120), alpha_max=int(150 * (1 - progress * 0.2)), alpha_min=0)
    hex_size = 14
    for row in range(-3, 4):
        for col2 in range(-3, 4):
            hx = cx + col2 * hex_size * 1.5
            hy = cy + row * hex_size * 1.7 + (col2 % 2) * hex_size * 0.85
            dist_from_center = math.sqrt((hx - cx) ** 2 + (hy - cy) ** 2)
            if dist_from_center < 65 * pulse and dist_from_center > 15:
                ha = int(60 * (1 - dist_from_center / (65 * pulse)) * (1 - progress * 0.2))
                hex_pts = []
                for i in range(6):
                    ha_angle = math.pi / 3 * i
                    hex_pts.append((hx + math.cos(ha_angle) * hex_size * 0.4, hy + math.sin(ha_angle) * hex_size * 0.4))
                draw.polygon(hex_pts, outline=(100, 255, 160, ha))
    add_bloom(img, 1.0)


# 10. POWER SURGE
def render_power_surge(img, f):
    draw = ImageDraw.Draw(img)
    cx, cy = FRAME // 2, FRAME // 2
    t = f / (FRAMES - 1)
    progress = ease_out(t)
    random.seed(1000 + f)
    for ring in range(3):
        r = int(35 + progress * 130 + ring * 18)
        alpha = int((220 - ring * 55) * (1 - progress * 0.3))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 60, 110, alpha // 3), width=5)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 100, 150, alpha), width=2)
    core_r = int(22 + progress * 28)
    radial_gradient(draw, cx, cy, core_r, (255, 255, 255), (255, 40, 80), alpha_max=int(255 * (1 - progress * 0.3)), alpha_min=0)
    for _ in range(35):
        angle = random.uniform(0, math.pi * 2)
        dist = random.uniform(25, 110 + progress * 80)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist - progress * 35
        pr = random.randint(2, 6)
        a = int(230 * (1 - progress * 0.4))
        col = random.choice([(255, 60, 110, a), (255, 150, 200, a), (255, 200, 220, a), (255, 255, 255, a)])
        trail = random.randint(5, 15)
        draw.line([(px, py + trail), (px, py)], fill=(255, 80, 130, a // 3), width=pr)
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=col)
    num_rays = 8
    for i in range(num_rays):
        angle = (math.pi * 2 * i / num_rays) + progress * 0.9
        ray_len = int(45 + progress * 85)
        x2 = cx + math.cos(angle) * ray_len
        y2 = cy + math.sin(angle) * ray_len
        perp = angle + math.pi / 2
        w = 4
        x1p = cx + math.cos(perp) * w
        y1p = cy + math.sin(perp) * w
        x1m = cx - math.cos(perp) * w
        y1m = cy - math.sin(perp) * w
        ray_a = int(190 * (1 - progress * 0.4))
        draw.polygon([(x1p, y1p), (x2, y2), (x1m, y1m)], fill=(255, 80, 130, ray_a))
        draw.line([(cx, cy), (x2, y2)], fill=(255, 200, 220, ray_a), width=2)
    aura_r = int(50 + progress * 60 + math.sin(progress * math.pi * 4) * 12)
    radial_gradient(draw, cx, cy, aura_r, (255, 40, 80), (120, 0, 40), alpha_max=int(35 * (1 - progress * 0.2)), alpha_min=0)
    add_bloom(img, 1.5)


# Generate all
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    make_sheet("hit_spark", [render_hit_spark])
    make_sheet("slash_effect", [render_slash])
    make_sheet("explosion", [render_explosion])
    make_sheet("ice_freeze", [render_ice_freeze])
    make_sheet("electric_arc", [render_electric_arc])
    make_sheet("poison_cloud", [render_poison_cloud])
    make_sheet("muzzle_flash", [render_muzzle_flash])
    make_sheet("heal_aura", [render_heal_aura])
    make_sheet("shield_barrier", [render_shield_barrier])
    make_sheet("power_surge", [render_power_surge])
    print("\nAll effect sheets generated!")
    print("Output: " + OUT)
