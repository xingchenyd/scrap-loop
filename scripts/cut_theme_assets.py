from collections import deque, namedtuple
from pathlib import Path
from shutil import copyfile

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SRC = {
    "plastic": Path(r"C:\Users\lenovo\AppData\Local\Temp\codex-clipboard-de3db2c3-850e-4ce5-8838-021c19749533.png"),
    "paper": Path(r"C:\Users\lenovo\AppData\Local\Temp\codex-clipboard-bd05a5d2-4591-4de0-abe7-9438ad3f36dc.png"),
    "textile": Path(r"C:\Users\lenovo\AppData\Local\Temp\codex-clipboard-0ae587a7-38fe-4fa2-bd23-893f28a38066.png"),
}

Crop = namedtuple("Crop", "name cx cy w h")


def build_crops(theme):
    crops = []
    monster_x = [78, 235, 392, 549, 706, 863, 1020, 1168]
    monster_y = 112
    for i, x in enumerate(monster_x):
        crops.append(Crop(f"{theme}_monster_{i}", x, monster_y, 150, 175))

    equip_x = [112, 338, 590, 835, 1080]
    if theme == "textile":
        equip_ys = [330, 485, 640]
    else:
        equip_ys = [315, 468, 620, 770]
    for tier, y in enumerate(equip_ys):
        for slot, x in enumerate(equip_x):
            crops.append(Crop(f"{theme}_equip_{tier}_{slot}", x, y, 190 if slot == 2 else 165, 145))

    souvenir_x = [80, 245, 410, 575, 740, 905, 1070, 1210]
    souvenir_y = 930
    if theme == "textile":
        souvenir_y = 875
    for i, x in enumerate(souvenir_x):
        crops.append(Crop(f"{theme}_souvenir_{i}", x, souvenir_y, 150, 150))

    if theme == "textile":
        facilities = [(160, 1112, 300, 230), (468, 1112, 300, 230), (770, 1112, 300, 230), (1086, 1112, 300, 230)]
    else:
        facilities = [(160, 1132, 300, 205), (470, 1132, 300, 205), (780, 1132, 300, 205), (1088, 1132, 300, 205)]
    for i, (x, y, w, h) in enumerate(facilities):
        crops.append(Crop(f"{theme}_facility_{i}", x, y, w, h))
    return crops


def crop_box(crop, size):
    x0 = max(0, int(crop.cx - crop.w / 2))
    y0 = max(0, int(crop.cy - crop.h / 2))
    x1 = min(size[0], int(crop.cx + crop.w / 2))
    y1 = min(size[1], int(crop.cy + crop.h / 2))
    return x0, y0, x1, y1


def is_checker_pixel(pixel):
    r, g, b, a = pixel
    return a > 0 and r > 210 and g > 210 and b > 210 and max(r, g, b) - min(r, g, b) < 28


def transparent_flood_fill(img):
    img = img.convert("RGBA")
    pix = img.load()
    w, h = img.size
    stack = []
    seen = set()
    for x in range(w):
        stack.append((x, 0))
        stack.append((x, h - 1))
    for y in range(h):
        stack.append((0, y))
        stack.append((w - 1, y))

    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or (x, y) in seen:
            continue
        seen.add((x, y))
        if not is_checker_pixel(pix[x, y]):
            continue
        pix[x, y] = (255, 255, 255, 0)
        stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    return img


def trim_alpha(img, pad=8):
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


def component_boxes(img, min_area=600):
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
                    if pix[nx, ny] == 0:
                        seen.add((nx, ny))
                        continue
                    seen.add((nx, ny))
                    q.append((nx, ny))
            if area >= min_area:
                boxes.append((x0, y0, x1 + 1, y1 + 1, area))
    boxes.sort(key=lambda b: (round(((b[1] + b[3]) / 2) / 115), b[0]))
    return boxes


def names_for(theme):
    names = []
    names.extend(f"{theme}_monster_{i}" for i in range(8))
    equip_tiers = 3 if theme == "textile" else 4
    for tier in range(equip_tiers):
        for slot in range(5):
            names.append(f"{theme}_equip_{tier}_{slot}")
    names.extend(f"{theme}_souvenir_{i}" for i in range(8))
    names.extend(f"{theme}_facility_{i}" for i in range(4))
    return names


def main():
    out = ROOT / "assets" / "themes"
    source_out = ROOT / "assets" / "source"
    out.mkdir(parents=True, exist_ok=True)
    source_out.mkdir(parents=True, exist_ok=True)

    for theme, path in SRC.items():
        if not path.exists():
            raise FileNotFoundError(path)
        copyfile(path, source_out / f"{theme}_theme_sheet.png")
        sheet = transparent_flood_fill(Image.open(path).convert("RGBA"))
        boxes = component_boxes(sheet)
        names = names_for(theme)
        if len(boxes) < len(names):
            print(f"warning: {theme} detected {len(boxes)} components, expected {len(names)}; falling back to grid crops")
            for crop in build_crops(theme):
                piece = sheet.crop(crop_box(crop, sheet.size))
                piece = trim_alpha(piece)
                piece.save(out / f"{crop.name}.png")
            continue
        if len(boxes) > len(names):
            boxes = boxes[: len(names)]
        for name, (x0, y0, x1, y1, _area) in zip(names, boxes):
            pad = 10
            piece = sheet.crop((max(0, x0 - pad), max(0, y0 - pad), min(sheet.width, x1 + pad), min(sheet.height, y1 + pad)))
            piece = trim_alpha(piece, 4)
            piece.save(out / f"{name}.png")


if __name__ == "__main__":
    main()
