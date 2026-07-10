# -*- coding: utf-8 -*-
import os, json

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'main.js')
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start = None
for i, line in enumerate(lines):
    if line.strip() == 'function showStory() {':
        start = i
        break

if start is None:
    print('ERROR: showStory not found')
    exit(1)

brace = 0
end = None
for i in range(start, len(lines)):
    brace += lines[i].count('{')
    brace -= lines[i].count('}')
    if brace == 0 and i > start:
        end = i
        break

print('Found showStory at lines %d to %d' % (start+1, end+1))

# Build new showStory using json for safe unicode
new_func = []
new_func.append('function showStory() {')
new_func.append('  const acts = [')
new_func.append('    { key: "\u5e8f\u7ae0", label: "\u5e8f\u7ae0\u00b7\u57fa\u5730\u5f15\u5bfc", color: "#2fe0dc" },')
new_func.append('    { key: "\u7b2c\u4e00\u5e55\u00b7\u7535\u5b50\u5e9f\u6599", label: "\u7b2c\u4e00\u5e55\u00b7\u7535\u5b50\u5e9f\u6599", color: "#ffd861" },')
new_func.append('    { key: "\u7b2c\u4e8c\u5e55\u00b7\u5851\u6599\u5e9f\u6599", label: "\u7b2c\u4e8c\u5e55\u00b7\u5851\u6599\u5e9f\u6599", color: "#46d57a" },')
new_func.append('    { key: "\u7b2c\u4e09\u5e55\u00b7\u7eb8\u677f\u7eb8\u7c7b", label: "\u7b2c\u4e09\u5e55\u00b7\u7eb8\u677f\u7eb8\u7c7b", color: "#d4a76a" },')
new_func.append('    { key: "\u7b2c\u56db\u5e55\u00b7\u5e03\u6599\u7eba\u7ec7", label: "\u7b2c\u56db\u5e55\u00b7\u5e03\u6599\u7eba\u7ec7", color: "#e87aa0" },')
new_func.append('    { key: "\u5c3e\u58f0", label: "\u5c3e\u58f0\u00b7\u5faa\u73af\u518d\u751f", color: "#c8b8ff" },')
new_func.append('  ];')
new_func.append('  const sections = acts.map((act) => {')
new_func.append('    const sceneList = dialogueScenes.map((scene, index) => ({ scene, index })).filter((item) => item.scene[0] === act.key);')
new_func.append('    if (!sceneList.length) return "";')
new_func.append('    const cards = sceneList.map((item) => {')
new_func.append('      const preview = (item.scene[3] || "").slice(0, 40);')
new_func.append('      return BTICK + '<button class="story-entry" data-action="startDialogue" data-id="' + DOLLAR + '{item.index}' + BTICK + '><img src="' + DOLLAR + '{imagePaths[storyPortraitFor(item.scene)]}" alt="" /><span><b>' + DOLLAR + '{String(item.index + 1).padStart(2, "0")} ' + DOLLAR + '{item.scene[2]}</b><small>' + DOLLAR + '{preview}...</small></span></button>' + BTICK + ';')
new_func.append('    }).join("");')
new_func.append('    return BTICK + '<div class="story-section"><h3 style="color:' + DOLLAR + '{act.color};border-bottom:2px solid ' + DOLLAR + '{act.color};padding-bottom:4px;margin:12px 0 6px;">' + DOLLAR + '{act.label}</h3><div class="story-list">' + DOLLAR + '{cards}</div></div>' + BTICK + ';')
new_func.append('  }).join("");')
new_func.append('  showModal(BTICK_)
new_func.append('    <div class="modal-header">')
new_func.append('      <div>')
new_func.append('        <h2>\u5267\u60c5\u5bfc\u89c8</h2>')
new_func.append('        <p>\u4e94\u5e55\u4e3b\u7ebf\u5267\u60c5\uff1a\u5e8f\u7ae0 \u2192 \u7535\u5b50 \u2192 \u5851\u6599 \u2192 \u7eb8\u677f \u2192 \u5e03\u6599 \u2192 \u5c3e\u58f0\u3002\u70b9\u51fb\u4efb\u610f\u4e00\u6bb5\u8fdb\u5165\u7acb\u7ed8\u5bf9\u8bdd\uff0c\u6309 Enter \u63a8\u8fdb\uff0c\u6309 Esc \u5173\u95ed\u3002</p>')
new_func.append('      </div>')
new_func.append('      <button class="quiet" data-action="close">\u5173\u95ed Esc</button>')
new_func.append('    </div>')
new_func.append('    <div class="story-actions">')
new_func.append('      <button class="game-button primary" data-action="startDialogue" data-id="0">\u4ece\u5e8f\u7ae0\u5f00\u59cb</button>')
new_func.append('      <button class="game-button" data-action="showQuiz">\u77e5\u8bc6\u95ee\u7b54</button>')
new_func.append('    </div>')
new_func.append('    _DOLLAR_{sections}')
new_func.append('    <div class="modal-footer">\u63d0\u793a\uff1a\u5bf9\u8bdd\u4e2d\u6309 Enter \u63a8\u8fdb\u5230\u4e0b\u4e00\u53e5\uff0c\u7b54\u5bf9\u95ee\u7b54\u53ef\u83b7\u5f97\u788e\u7247\u5956\u52b1\u3002</div>')
new_func.append('  _BTICK, "bgHub");')
new_func.append('}')
new_func_str = '\n'.join(new_func) + '\n'
print('ERROR: too complex, use different approach')
exit(1)
