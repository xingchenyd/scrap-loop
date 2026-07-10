with open("main.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find first showInventory
count = 0
start = None
end = None
for i, line in enumerate(lines):
    if line.strip().startswith("function showInventory()"):
        count += 1
        if count == 1:
            start = i
            brace = 0
            for j in range(i, len(lines)):
                brace += lines[j].count("{")
                brace -= lines[j].count("}")
                if brace == 0 and j > i:
                    end = j
                    break
            break

if start is None:
    print("ERROR: showInventory not found")
    exit(1)

print("Removing first showInventory at lines %d to %d" % (start + 1, end + 1))
new_lines = lines[:start] + lines[end + 1:]

with open("main.js", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("File now has %d lines" % len(new_lines))
