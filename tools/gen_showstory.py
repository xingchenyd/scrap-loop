import json

code = """function showStory() {
  const acts = [
    { key: "\u5e8f\u7ae0", label: "\u5e8f\u7ae0\u00b7\u57fa\u5730\u5f15\u5bfc", color: "#2fe0dc" },
    { key: "\u7b2c\u4e00\u5e55\u00b7\u7535\u5b50\u5e9f\u6599", label: "\u7b2c\u4e00\u5e55\u00b7\u7535\u5b50\u5e9f\u6599", color: "#ffd861" },
    { key: "\u7b2c\u4e8c\u5e55\u00b7\u5851\u6599\u5e9f\u6599", label: "\u7b2c\u4e8c\u5e55\u00b7\u5851\u6599\u5e9f\u6599", color: "#46d57a" },
    { key: "\u7b2c\u4e09\u5e55\u00b7\u7eb8\u677f\u7eb8\u7c7b", label: "\u7b2c\u4e09\u5e55\u00b7\u7eb8\u677f\u7eb8\u7c7b", color: "#d4a76a" },
    { key: "\u7b2c\u56db\u5e55\u00b7\u5e03\u6599\u7eba\u7ec7", label: "\u7b2c\u56db\u5e55\u00b7\u5e03\u6599\u7eba\u7ec7", color: "#e87aa0" },
    { key: "\u5c3e\u58f0", label: "\u5c3e\u58f0\u00b7\u5faa\u73af\u518d\u751f", color: "#c8b8ff" },
  ];
  const sections = acts.map((act) => {
    const sceneList = dialogueScenes.map((scene, index) => ({ scene, index })).filter((item) => item.scene[0] === act.key);
    if (!sceneList.length) return "";
    const cards = sceneList.map((item) => {
      const preview = (item.scene[3] || "").slice(0, 40);
      return ` + "`" + `<button class="story-entry" data-action="startDialogue" data-id="${item.index}"><img src="${imagePaths[storyPortraitFor(item.scene)]}" alt="" /><span><b>${String(item.index + 1).padStart(2, "0")} ${item.scene[2]}</b><small>${preview}...</small></span></button>` + "`" + `;
    }).join("");
    return ` + "`" + `<div class="story-section"><h3 style="color:${act.color};border-bottom:2px solid ${act.color};padding-bottom:4px;margin:12px 0 6px;">${act.label}</h3><div class="story-list">${cards}</div></div>` + "`" + `;
  }).join("");
  showModal(` + "`" + `
    <div class="modal-header">
      <div>
        <h2>\u5267\u60c5\u5bfc\u89c8</h2>
        <p>\u4e94\u5e55\u4e3b\u7ebf\u5267\u60c5\uff1a\u5e8f\u7ae0 \u2192 \u7535\u5b50 \u2192 \u5851\u6599 \u2192 \u7eb8\u677f \u2192 \u5e03\u6599 \u2192 \u5c3e\u58f0\u3002\u70b9\u51fb\u4efb\u610f\u4e00\u6bb5\u8fdb\u5165\u7acb\u7ed8\u5bf9\u8bdd\uff0c\u6309 Enter \u63a8\u8fdb\uff0c\u6309 Esc \u5173\u95ed\u3002</p>
      </div>
      <button class="quiet" data-action="close">\u5173\u95ed Esc</button>
    </div>
    <div class="story-actions">
      <button class="game-button primary" data-action="startDialogue" data-id="0">\u4ece\u5e8f\u7ae0\u5f00\u59cb</button>
      <button class="game-button" data-action="showQuiz">\u77e5\u8bc6\u95ee\u7b54</button>
    </div>
    ${sections}
    <div class="modal-footer">\u63d0\u793a\uff1a\u5bf9\u8bdd\u4e2d\u6309 Enter \u63a8\u8fdb\u5230\u4e0b\u4e00\u53e5\uff0c\u7b54\u5bf9\u95ee\u7b54\u53ef\u83b7\u5f97\u788e\u7247\u5956\u52b1\u3002</div>
  ` + "`" + `, "bgHub");
}"""

with open("tools/new_showstory.json", "w", encoding="utf-8") as f:
    json.dump({"code": code}, f, ensure_ascii=False)
print("JSON written, code length:", len(code))
