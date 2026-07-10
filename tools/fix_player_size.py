with open("main.js", "r", encoding="utf-8") as f:
    content = f.read()

# Fix player draw size to be square (matching 128x128 sprites)
old_size = "const pw = 64, ph = 80;"
new_size = "const pw = 72, ph = 72;"
content = content.replace(old_size, new_size)

with open("main.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Player draw size fixed to 72x72 (square aspect ratio)")
