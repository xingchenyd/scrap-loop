import re

with open("main.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add synthMode variable after synthSelected
content = content.replace(
    "let synthSelected = null;\nlet synthAnimating = false;",
    'let synthSelected = null;\nlet synthAnimating = false;\nlet synthMode = "craft";'
)

# 2. Set synthMode in showCraft()
old_craft = """function showCraft() {
  closeModal();
  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderSynthRecipes();"""
new_craft = """function showCraft() {
  closeModal();
  synthMode = "craft";
  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderSynthRecipes();"""
content = content.replace(old_craft, new_craft)

# 3. Set synthMode in useRecycler()
old_rec = """function useRecycler() {
  closeModal();
  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderRecyclerUI();"""
new_rec = """function useRecycler() {
  closeModal();
  synthMode = "recycler";
  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderRecyclerUI();"""
content = content.replace(old_rec, new_rec)

# 4. Reset synthMode in closeSynth()
content = content.replace(
    "function closeSynth() {\n  if (synthOverlay) synthOverlay.classList.add(\"hidden\");\n  state.paused = false;\n  synthSelected = null;\n}",
    'function closeSynth() {\n  if (synthOverlay) synthOverlay.classList.add("hidden");\n  state.paused = false;\n  synthSelected = null;\n  synthMode = "craft";\n}'
)

# 5. Fix interact() - when synthMode is recycler, do nothing on Enter (recycler uses clicks)
old_interact = 'if (synthOverlay && !synthOverlay.classList.contains("hidden")) { doSynth(); return; }'
new_interact = 'if (synthOverlay && !synthOverlay.classList.contains("hidden")) { if (synthMode === "craft") doSynth(); return; }'
content = content.replace(old_interact, new_interact)

# 6. Fix keydown handler - same logic
old_keydown = 'if (key === "enter" && synthOverlay && !synthOverlay.classList.contains("hidden")) doSynth();'
new_keydown = 'if (key === "enter" && synthOverlay && !synthOverlay.classList.contains("hidden")) { if (synthMode === "craft") doSynth(); }'
content = content.replace(old_keydown, new_keydown)

# 7. Add recycler animation function after doRecycle
old_dorecycle_end = """  renderRecyclerUI();
  toast("\u7cbe\u70bc\u6210\u529f\uff1a\u83b7\u5f97 1 \u679a\u56de\u6536\u7ae0\u3002");
}"""
new_dorecycle_end = """  renderRecyclerUI();
  triggerRecyclerAnimation();
  toast("\u7cbe\u70bc\u6210\u529f\uff1a\u83b7\u5f97 1 \u679a\u56de\u6536\u7ae0\u3002");
}

function triggerRecyclerAnimation() {
  const hammer = document.getElementById("anvilHammer");
  const spark = document.getElementById("anvilSpark");
  const crafting = document.getElementById("synthCrafting");
  const bowl = document.getElementById("anvilBowl");
  if (crafting) crafting.textContent = "\u7cbe\u70bc\u4e2d...";
  let strikes = 0;
  const doStrike = () => {
    if (hammer) hammer.classList.add("strike");
    if (spark) { spark.classList.remove("active"); void spark.offsetWidth; spark.classList.add("active"); }
    strikes++;
    setTimeout(() => {
      if (hammer) hammer.classList.remove("strike");
      if (strikes < 3) setTimeout(doStrike, 200);
      else {
        if (crafting) crafting.textContent = "\u7cbe\u70bc\u5b8c\u6210\uff01\u9009\u62e9\u5176\u4ed6\u788e\u7247\u7ee7\u7eed\u7cbe\u70bc\u3002";
      }
    }, 200);
  };
  doStrike();
}"""
content = content.replace(old_dorecycle_end, new_dorecycle_end)

with open("main.js", "w", encoding="utf-8") as f:
    f.write(content)

# Verify
checks = [
    ("synthMode variable", 'let synthMode = "craft";' in content),
    ("showCraft sets synthMode", 'synthMode = "craft";\n  if (synthOverlay) {\n    synthOverlay.classList.remove("hidden");\n    state.paused = true;\n    renderSynthRecipes();' in content),
    ("useRecycler sets synthMode", 'synthMode = "recycler";' in content),
    ("interact checks synthMode", 'if (synthMode === "craft") doSynth(); return;' in content),
    ("keydown checks synthMode", 'if (synthMode === "craft") doSynth(); }' in content),
    ("triggerRecyclerAnimation exists", "function triggerRecyclerAnimation()" in content),
]
for name, ok in checks:
    print(("OK" if ok else "FAIL") + ": " + name)
