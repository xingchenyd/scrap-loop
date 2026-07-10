import re

with open("main.js", "r", encoding="utf-8") as f:
    content = f.read()

# The broken pattern is: ` + "`" + ` (backtick + space + plus + space + doublequote + backtick + doublequote + space + plus + space + backtick)
# We need to replace it with just a single backtick
# But the actual characters may vary. Let's use regex.

# Pattern: backtick, optional space, plus, optional space, double-quote, backtick, double-quote, optional space, plus, optional space, backtick
pattern = r'`\s*\+\s*"`"\s*\+\s*`'
matches = re.findall(pattern, content)
print("Found %d broken backtick patterns" % len(matches))

content = re.sub(pattern, '`', content)

# Also fix patterns where it's at the start: ` + "`" + at end of line before \n
# Pattern: showModal(` + "`" + \n  -> showModal(`\n
pattern2 = r'showModal\(`\s*\+\s*"`"\s*\+\s*\n'
matches2 = re.findall(pattern2, content)
print("Found %d showModal broken patterns" % len(matches2))
content = re.sub(pattern2, 'showModal(`\n', content)

# Pattern: ` + "`" + , "bgHub");  -> `, "bgHub");
pattern3 = r'`\s*\+\s*"`"\s*\+\s*,\s*"bgHub"\);'
matches3 = re.findall(pattern3, content)
print("Found %d closing broken patterns" % len(matches3))
content = re.sub(pattern3, '`, "bgHub");', content)

# Check for any remaining
remaining = re.findall(r'\+\s*"`"', content)
print("Remaining broken quotes: %d" % len(remaining))

with open("main.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
