with open("main.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find all showMuseum and showCollectibleStory definitions
funcs_to_dedup = ["function showMuseum", "function showCollectibleStory"]
to_remove = []  # list of (start, end) line ranges

for func_prefix in funcs_to_dedup:
    positions = []
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith(func_prefix + "(") or stripped.startswith(func_prefix + " ("):
            positions.append(i)
    
    # Keep only the LAST one, remove all earlier ones
    for pos in positions[:-1]:
        brace = 0
        end = None
        for j in range(pos, len(lines)):
            brace += lines[j].count("{")
            brace -= lines[j].count("}")
            if brace == 0 and j > pos:
                end = j
                break
        if end:
            to_remove.append((pos, end))
            print("Will remove %s at lines %d-%d" % (func_prefix, pos + 1, end + 1))

# Sort in reverse order to not mess up line numbers
to_remove.sort(key=lambda x: x[0], reverse=True)

for start, end in to_remove:
    lines = lines[:start] + lines[end + 1:]

with open("main.js", "w", encoding="utf-8") as f:
    f.writelines(lines)

print("Done. File now has %d lines" % len(lines))
