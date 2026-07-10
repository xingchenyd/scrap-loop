with open("main.js", "r", encoding="utf-8") as f:
    content = f.read()

# Enhance drawBattlePortal with glow effect
old_portal = """function drawBattlePortal() {
  const idx = Math.floor(performance.now() / 120) % 8;
  drawSprite(imgs[`portal${idx}`], state.battlePortal.x, state.battlePortal.y, 128, 128);
}"""

new_portal = """function drawBattlePortal() {
  const p = state.battlePortal;
  const idx = Math.floor(performance.now() / 120) % 8;
  const pulse = Math.sin(performance.now() / 300) * 0.15 + 0.85;
  ctx.save();
  ctx.globalAlpha = 0.3 * pulse;
  ctx.fillStyle = "#46d57a";
  ctx.beginPath();
  ctx.arc(p.x, p.y, 90, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
  drawSprite(imgs[`portal${idx}`], p.x, p.y, 128, 128);
  const d = distance(player, p);
  if (d < 160) {
    drawGameText("\u4f20\u9001\u95e8 Enter", p.x - 50, p.y - 90, 16, "#46d57a", true);
  }
}"""

content = content.replace(old_portal, new_portal)

# Make portal arrow always visible (remove the dist < 200 return)
old_arrow = """function drawPortalArrow() {
  if (!state.battlePortal) return;
  const dx = state.battlePortal.x - player.x;
  const dy = state.battlePortal.y - player.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 200) return;"""
new_arrow = """function drawPortalArrow() {
  if (!state.battlePortal) return;
  const dx = state.battlePortal.x - player.x;
  const dy = state.battlePortal.y - player.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 140) return;"""
content = content.replace(old_arrow, new_arrow)

with open("main.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Portal visibility enhanced")
print("Glow added:", "globalAlpha = 0.3 * pulse" in content)
print("Arrow threshold lowered:", "if (dist < 140) return;" in content)
