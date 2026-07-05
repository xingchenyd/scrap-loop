from collections import deque
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "source"
OUT = ROOT / "assets" / "sprites"
GEN = ROOT / "assets" / "generated"


def is_bg(pixel):
    r, g, b = pixel[:3]
    return r > 215 and g > 215 and b > 215 and max(r, g, b) - min(r, g, b) < 22


def flood_key_to_alpha(img):
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    q = deque()
    seen = set()

    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if (x, y) in seen or x < 0 or y < 0 or x >= w or y >= h:
            continue
        seen.add((x, y))
        if not is_bg(px[x, y]):
            continue
        px[x, y] = (255, 255, 255, 0)
        q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    bbox = rgba.getbbox()
    if bbox:
        rgba = rgba.crop(bbox)
    return rgba


def crop_grid(source, prefix, cols, rows, picks):
    img = Image.open(SRC / source)
    w, h = img.size
    for name, col, row in picks:
        left = round(col * w / cols)
        top = round(row * h / rows)
        right = round((col + 1) * w / cols)
        bottom = round((row + 1) * h / rows)
        sprite = flood_key_to_alpha(img.crop((left, top, right, bottom)))
        sprite.save(OUT / f"{prefix}_{name}.png")


def split_atlas():
    img = Image.open(GEN / "map_atlas.png").convert("RGB")
    w, h = img.size
    regions = {
        "hub": (0, 0, w // 2, h // 2),
        "arena": (w // 2, 0, w, h // 2),
        "lab": (0, h // 2, w // 2, h),
        "market": (w // 2, h // 2, w, h),
    }
    for name, box in regions.items():
        img.crop(box).save(GEN / f"{name}.png")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    split_atlas()
    crop_grid(
        "equipment.png",
        "equip",
        5,
        4,
        [
            ("wrench_basic", 0, 0),
            ("helmet_basic", 1, 0),
            ("armor_basic", 2, 0),
            ("boots_basic", 4, 0),
            ("wrench_green", 0, 1),
            ("armor_green", 2, 1),
            ("wrench_blue", 0, 2),
            ("helmet_blue", 1, 2),
            ("wrench_gold", 0, 3),
            ("armor_gold", 2, 3),
        ],
    )
    crop_grid(
        "enemies.png",
        "enemy",
        4,
        2,
        [
            ("spider", 0, 0),
            ("beetle", 1, 0),
            ("binbot", 2, 0),
            ("sludge", 3, 0),
            ("eye", 0, 1),
            ("mimic", 1, 1),
            ("saw", 2, 1),
            ("guard", 3, 1),
        ],
    )
    crop_grid(
        "traps.png",
        "trap",
        4,
        2,
        [
            ("spikes", 0, 0),
            ("saw", 1, 0),
            ("vent", 2, 0),
            ("slime_pool", 3, 0),
            ("barrel", 0, 1),
            ("coil", 1, 1),
            ("magnet", 2, 1),
            ("crusher", 3, 1),
        ],
    )
    crop_grid(
        "items_buffs.png",
        "item",
        5,
        5,
        [
            ("plastic", 0, 0),
            ("glass", 2, 0),
            ("circuit", 3, 0),
            ("coil", 4, 0),
            ("spring", 0, 1),
            ("gear", 1, 1),
            ("metal", 2, 1),
            ("token", 3, 1),
            ("battery", 4, 1),
            ("heart", 0, 2),
            ("key", 1, 2),
            ("bomb", 2, 2),
            ("shield", 3, 2),
            ("speed", 4, 2),
            ("magnet", 0, 3),
            ("poison", 1, 3),
            ("power", 2, 3),
            ("cooldown", 3, 3),
            ("dash", 4, 3),
            ("burst", 0, 4),
            ("spark", 1, 4),
            ("toxin", 2, 4),
            ("recycle_aura", 3, 4),
        ],
    )
    crop_grid(
        "facilities.png",
        "facility",
        5,
        4,
        [
            ("workbench", 0, 0),
            ("portal", 1, 0),
            ("locker", 2, 0),
            ("scrap_bin", 3, 0),
            ("shelf", 4, 0),
            ("medbay", 0, 1),
            ("recycler", 1, 1),
            ("terminal", 2, 1),
            ("board", 3, 1),
            ("exchange", 4, 1),
            ("printer", 0, 2),
            ("refiner", 1, 2),
            ("doors", 3, 2),
            ("gate", 4, 2),
        ],
    )
    crop_grid(
        "portal.png",
        "portal",
        4,
        2,
        [(f"frame_{i}", i % 4, i // 4) for i in range(8)],
    )
    crop_grid(
        "hero_sheet.jpg",
        "hero",
        8,
        4,
        [
            ("idle_front", 0, 0),
            ("walk_front_1", 0, 1),
            ("walk_front_2", 1, 1),
            ("walk_right_1", 2, 1),
            ("walk_right_2", 3, 1),
            ("idle_back", 4, 0),
            ("walk_back_1", 4, 1),
            ("walk_back_2", 5, 1),
        ],
    )


if __name__ == "__main__":
    main()
