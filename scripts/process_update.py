import shutil
from collections import deque
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "source"
OUT_SPRITES = ROOT / "assets" / "sprites"
OUT_THEMES = ROOT / "assets" / "themes"
OUT_GEN = ROOT / "assets" / "generated"

TARGET_SPRITE = 128
TARGET_ICON = 64


def is_checker_pixel(pixel):
    r, g, b, a = pixel
    return a > 0 and r > 210 and g > 210 and b > 210 and max(r, g, b) - min(r, g, b) < 28


def transparent_flood_fill(img):
    img = img.convert("RGBA")
    pix = img.load()
    w, h = img.size
    stack = []
    for x in range(w):
        stack.append((x, 0))
        stack.append((x, h - 1))
    for y in range(h):
        stack.append((0, y))
        stack.append((w - 1, y))
    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        if not is_checker_pixel(pix[x, y]):
            continue
        pix[x, y] = (255, 255, 255, 0)
        stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    return img


def trim_alpha(img, pad=6):
    alpha = img.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(img.width, x1 + pad)
    y1 = min(img.height, y1 + pad)
    return img.crop((x0, y0, x1, y1))


def resize_to_square(img, size):
    w, h = img.size
    scale = min(size / w, size / h)
    new_w = max(1, round(w * scale))
    new_h = max(1, round(h * scale))
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ox = (size - new_w) // 2
    oy = (size - new_h) // 2
    canvas.paste(resized, (ox, oy), resized)
    return canvas


def crop_grid_cell(img, cols, rows, col, row):
    w, h = img.size
    left = round(col * w / cols)
    top = round(row * h / rows)
    right = round((col + 1) * w / cols)
    bottom = round((row + 1) * h / rows)
    return img.crop((left, top, right, bottom))


def process_cell_to_sprite(img, cols, rows, col, row, out_path, size=TARGET_SPRITE):
    cell = crop_grid_cell(img, cols, rows, col, row)
    cell = transparent_flood_fill(cell)
    cell = trim_alpha(cell)
    cell = resize_to_square(cell, size)
    cell.save(out_path)


def component_boxes(img, min_area=500):
    alpha = img.getchannel("A")
    pix = alpha.load()
    w, h = img.size
    seen = set()
    boxes = []
    for yy in range(h):
        for xx in range(w):
            if (xx, yy) in seen or pix[xx, yy] == 0:
                continue
            q = deque([(xx, yy)])
            seen.add((xx, yy))
            x0 = x1 = xx
            y0 = y1 = yy
            area = 0
            while q:
                x, y = q.popleft()
                if pix[x, y] == 0:
                    continue
                area += 1
                x0 = min(x0, x)
                y0 = min(y0, y)
                x1 = max(x1, x)
                y1 = max(y1, y)
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if nx < 0 or ny < 0 or nx >= w or ny >= h or (nx, ny) in seen:
                        continue
                    seen.add((nx, ny))
                    if pix[nx, ny] != 0:
                        q.append((nx, ny))
            if area >= min_area:
                boxes.append((x0, y0, x1 + 1, y1 + 1, area))
    boxes.sort(key=lambda b: (round(b[1] / 100), b[0]))
    return boxes


def save_component(img, box, out_path, pad=8, size=TARGET_SPRITE):
    x0, y0, x1, y1, _ = box
    piece = img.crop((max(0, x0 - pad), max(0, y0 - pad), min(img.width, x1 + pad), min(img.height, y1 + pad)))
    piece = trim_alpha(piece, pad=3)
    piece = resize_to_square(piece, size)
    piece.save(out_path)


def process_monsters():
    themes = ["electronic", "paper", "plastic", "textile"]
    for theme in themes:
        src_file = SRC / ("monsters_" + theme + ".png")
        if not src_file.exists():
            print("  SKIP " + src_file.name)
            continue
        img = Image.open(src_file)
        for i in range(8):
            col = i % 4
            row = i // 4
            out = OUT_THEMES / (theme + "_monster_" + str(i) + ".png")
            process_cell_to_sprite(img, 4, 2, col, row, out, size=128)
        print("  monsters_" + theme + ": 8 sprites")


def process_souvenirs_electronic():
    src_file = SRC / "souvenirs_electronic.png"
    img = transparent_flood_fill(Image.open(src_file).convert("RGBA"))
    boxes = component_boxes(img, min_area=500)
    boxes.sort(key=lambda b: b[0])
    for i, box in enumerate(boxes):
        out = OUT_THEMES / ("electronic_souvenir_" + str(i) + ".png")
        save_component(img, box, out, size=128)
    print("  souvenirs_electronic: " + str(len(boxes)) + " sprites")


def process_equipment_electronic():
    src_file = SRC / "equipment_electronic.png"
    img = Image.open(src_file)
    for tier in range(4):
        for slot in range(4):
            out = OUT_THEMES / ("electronic_equip_" + str(tier) + "_" + str(slot) + ".png")
            process_cell_to_sprite(img, 4, 4, slot, tier, out, size=64)
        src_s = OUT_THEMES / ("electronic_equip_" + str(tier) + "_3.png")
        dst_s = OUT_THEMES / ("electronic_equip_" + str(tier) + "_4.png")
        if src_s.exists():
            shutil.copy2(src_s, dst_s)
    print("  equipment_electronic: 16+4 sprites")


def process_facilities_new():
    src_file = SRC / "facilities_new.png"
    img = Image.open(src_file)
    idx = 0
    for row in range(2):
        for col in range(3):
            out = OUT_SPRITES / ("facility_new_" + str(idx) + ".png")
            process_cell_to_sprite(img, 3, 2, col, row, out, size=128)
            idx += 1
    print("  facilities_new: 6 sprites")


def process_hero_sheet():
    src_file = SRC / "hero_sheet_new.png"
    img = Image.open(src_file)
    hero_map = [
        ("hero_idle_front", 0, 0),
        ("hero_walk_front_1", 1, 0),
        ("hero_walk_front_2", 2, 0),
        ("hero_idle_right", 3, 0),
        ("hero_walk_right_1", 0, 1),
        ("hero_walk_right_2", 1, 1),
        ("hero_idle_back", 2, 1),
        ("hero_walk_back_1", 3, 1),
    ]
    for name, col, row in hero_map:
        out = OUT_SPRITES / (name + ".png")
        process_cell_to_sprite(img, 4, 2, col, row, out, size=128)
    src_p = OUT_SPRITES / "hero_walk_back_1.png"
    dst_p = OUT_SPRITES / "hero_walk_back_2.png"
    if src_p.exists():
        shutil.copy2(src_p, dst_p)
    print("  hero_sheet_new: 9 sprites")


def process_bg_electronic():
    src_file = SRC / "bg_electronic_new.png"
    dst = OUT_GEN / "bg_electronic.png"
    img = Image.open(src_file)
    img.save(dst)
    print("  bg_electronic_new: " + str(img.size))


def process_boss_cat():
    src_file = SRC / "boss_cat.png"
    img = transparent_flood_fill(Image.open(src_file).convert("RGBA"))
    img = trim_alpha(img, pad=10)
    img = resize_to_square(img, 256)
    out = OUT_SPRITES / "boss_cat.png"
    img.save(out)
    print("  boss_cat: " + str(img.size))


def process_minimap_icons():
    src_file = SRC / "minimap_icons.png"
    img = Image.open(src_file)
    names = ["minimap_hub", "minimap_battle", "minimap_quest", "minimap_shop"]
    idx = 0
    for row in range(2):
        for col in range(2):
            out = OUT_SPRITES / (names[idx] + ".png")
            process_cell_to_sprite(img, 2, 2, col, row, out, size=64)
            idx += 1
    print("  minimap_icons: 4 sprites")


def process_portraits():
    two_col = {
        "portrait_battery.png": "char_battery",
        "portrait_bottle.png": "char_bottle",
        "portrait_box.png": "char_box",
        "portrait_phone.png": "char_phone",
        "portrait_shirt.png": "char_shirt",
    }
    for src_name, sprite_name in two_col.items():
        src_file = SRC / src_name
        if not src_file.exists():
            print("  SKIP " + src_name)
            continue
        img = Image.open(src_file)
        left = crop_grid_cell(img, 2, 1, 0, 0)
        left = transparent_flood_fill(left)
        left = trim_alpha(left, pad=8)
        left = resize_to_square(left, 128)
        out = OUT_SPRITES / (sprite_name + ".png")
        left.save(out)
        print("  " + src_name + " -> " + sprite_name + ".png")
    src_file = SRC / "portrait_warden.png"
    if src_file.exists():
        img = Image.open(src_file)
        top = crop_grid_cell(img, 1, 3, 0, 0)
        top = transparent_flood_fill(top)
        top = trim_alpha(top, pad=8)
        top = resize_to_square(top, 128)
        out = OUT_SPRITES / "char_warden.png"
        top.save(out)
        print("  portrait_warden -> char_warden.png")


def main():
    for d in (OUT_SPRITES, OUT_THEMES, OUT_GEN):
        d.mkdir(parents=True, exist_ok=True)
    print("Processing 17 source images...")
    process_monsters()
    process_souvenirs_electronic()
    process_equipment_electronic()
    process_facilities_new()
    process_hero_sheet()
    process_bg_electronic()
    process_boss_cat()
    process_minimap_icons()
    process_portraits()
    print("Done.")


if __name__ == "__main__":
    main()
