import json, os, sys

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
mainjs = os.path.join(base, "main.js")
patch_json = os.path.join(base, "tools", "new_showstory.json")

with open(patch_json, "r", encoding="utf-8") as f:
    data = json.load(f)

new_code = data["code"]

with open(mainjs, "r", encoding="utf-8") as f:
    content = f.read()

lines = content.split("\n")
start = None
for i, line in enumerate(lines):
    if line.strip() == "function showStory() {":
        start = i
        break

if start is None:
    print("ERROR: showStory not found")
    sys.exit(1)

brace = 0
end = None
for i in range(start, len(lines)):
    brace += lines[i].count("{")
    brace -= lines[i].count("}")
    if brace == 0 and i > start:
        end = i
        break

print("Found showStory at lines %d to %d" % (start + 1, end + 1))

new_lines = lines[:start] + [new_code] + lines[end + 1:]
result = "\n".join(new_lines)

with open(mainjs, "w", encoding="utf-8") as f:
    f.write(result)

print("Replaced showStory successfully")
print("File now has %d lines" % len(new_lines))
