with open("main.js", "r", encoding="utf-8") as f:
    content = f.read()

# Add result image change in useRecycler
old_rec = """  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderRecyclerUI();
    const title = document.getElementById("synthTitle");
    const hint = document.getElementById("synthHint");
    const crafting = document.getElementById("synthCrafting");
    if (title) title.textContent = "\u7cbe\u70bc\u673a";
    if (hint) hint.textContent = "\u9009\u62e9\u4e00\u7c7b\u6750\u6599\uff0c\u6309 Enter \u6216\u70b9\u51fb\u7cbe\u70bc\uff1a\u6d88\u8017 3 \u4e2a\u540c\u7c7b\u788e\u7247\uff0c\u70bc\u6210 1 \u679a\u56de\u6536\u7ae0\u3002";
    if (crafting) crafting.textContent = "\u9009\u62e9\u788e\u7247\u7c7b\u522b\u540e\u7cbe\u70bc";
  }"""

new_rec = """  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderRecyclerUI();
    const title = document.getElementById("synthTitle");
    const hint = document.getElementById("synthHint");
    const crafting = document.getElementById("synthCrafting");
    const resultImg = document.getElementById("synthResultImg");
    if (title) title.textContent = "\u7cbe\u70bc\u673a";
    if (hint) hint.textContent = "\u9009\u62e9\u4e00\u7c7b\u6750\u6599\uff0c\u70b9\u51fb\u7cbe\u70bc\uff1a\u6d88\u8017 3 \u4e2a\u540c\u7c7b\u788e\u7247\uff0c\u70bc\u6210 1 \u679a\u56de\u6536\u7ae0\u3002";
    if (crafting) crafting.textContent = "\u9009\u62e9\u788e\u7247\u7c7b\u522b\u540e\u70b9\u51fb\u7cbe\u70bc";
    if (resultImg) resultImg.src = imagePaths.facilityRecycler || "";
  }"""

content = content.replace(old_rec, new_rec)

# Add result image change in showCraft
old_craft = """  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderSynthRecipes();
    const title = document.getElementById("synthTitle");
    const hint = document.getElementById("synthHint");
    const crafting = document.getElementById("synthCrafting");
    if (title) title.textContent = "\u7eaa\u5ff5\u5de5\u574a";
    if (hint) hint.textContent = "\u9009\u4e2d\u4e00\u4e2a\u914d\u65b9\uff0c\u6309 Enter \u6216\u70b9\u51fb\u5408\u6210\u542f\u52a8\u5408\u6210\u53f0\u3002";
    if (crafting) crafting.textContent = "\u9009\u62e9\u914d\u65b9\u540e\u5408\u6210";
    return;
  }"""

new_craft = """  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderSynthRecipes();
    const title = document.getElementById("synthTitle");
    const hint = document.getElementById("synthHint");
    const crafting = document.getElementById("synthCrafting");
    const resultImg = document.getElementById("synthResultImg");
    if (title) title.textContent = "\u7eaa\u5ff5\u5de5\u574a";
    if (hint) hint.textContent = "\u9009\u4e2d\u4e00\u4e2a\u914d\u65b9\uff0c\u6309 Enter \u6216\u70b9\u51fb\u5408\u6210\u542f\u52a8\u5408\u6210\u53f0\u3002";
    if (crafting) crafting.textContent = "\u9009\u62e9\u914d\u65b9\u540e\u5408\u6210";
    if (resultImg) resultImg.src = imagePaths.facilityWorkbench || "";
    return;
  }"""

content = content.replace(old_craft, new_craft)

with open("main.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Recycler/Craft visual differentiation added")
print("Recycler img change:", "resultImg.src = imagePaths.facilityRecycler" in content)
print("Craft img change:", "resultImg.src = imagePaths.facilityWorkbench" in content)
