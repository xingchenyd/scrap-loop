const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const titleScreen = document.getElementById("titleScreen");
const modal = document.getElementById("modal");
const toastEl = document.getElementById("toast");
const hpText = document.getElementById("hpText");
const hpFill = document.getElementById("hpFill");
const shieldText = document.getElementById("shieldText");
const shieldFill = document.getElementById("shieldFill");
const pointText = document.getElementById("pointText");
const printText = document.getElementById("printText");
const scrapRow = document.getElementById("scrapRow");
const hudMiniEl = document.getElementById("hudMini");
const coachBubble = document.getElementById("coachBubble");
const coachTitle = document.getElementById("coachTitle");
const coachText = document.getElementById("coachText");
const synthOverlay = document.getElementById("synthOverlay");
const storyOverlay = document.getElementById("storyOverlay");
const quizOverlay = document.getElementById("quizOverlay");

const W = canvas.width;
const H = canvas.height;
const GAME_NAME = "废品轮回 Scrap Loop";
const SAVE_KEY = "scrap-loop-save-v3";
const OLD_SAVE_KEYS = ["green-loop-quest-save-v2", "green-loop-quest-save-v1"];
ctx.imageSmoothingEnabled = false;

const imagePaths = {
  bgHub: "assets/generated/hub.png",
  bgArena: "assets/generated/arena.png",
  bgLab: "assets/generated/lab.png",
  bgMarket: "assets/generated/market.png",
  bossCat: "assets/sprites/boss_cat.png",
  heroFront: "assets/sprites/hero_idle_front.png",
  heroBack: "assets/sprites/hero_idle_back.png",
  heroWalkFront1: "assets/sprites/hero_walk_front_1.png",
  heroWalkFront2: "assets/sprites/hero_walk_front_2.png",
  heroWalkBack1: "assets/sprites/hero_walk_back_1.png",
  heroWalkBack2: "assets/sprites/hero_walk_back_2.png",
  heroWalkRight1: "assets/sprites/hero_walk_right_1.png",
  heroWalkRight2: "assets/sprites/hero_walk_right_2.png",
  portal0: "assets/sprites/portal_frame_0.png",
  portal1: "assets/sprites/portal_frame_1.png",
  portal2: "assets/sprites/portal_frame_2.png",
  portal3: "assets/sprites/portal_frame_3.png",
  portal4: "assets/sprites/portal_frame_4.png",
  portal5: "assets/sprites/portal_frame_5.png",
  portal6: "assets/sprites/portal_frame_6.png",
  portal7: "assets/sprites/portal_frame_7.png",
  facilityWorkbench: "assets/sprites/facility_workbench.png",
  facilityPortal: "assets/sprites/facility_portal.png",
  facilityLocker: "assets/sprites/facility_locker.png",
  facilityMedbay: "assets/sprites/facility_medbay.png",
  facilityRecycler: "assets/sprites/facility_recycler.png",
  facilityBoard: "assets/sprites/facility_board.png",
  facilityExchange: "assets/sprites/facility_exchange.png",
  facilityTerminal: "assets/sprites/facility_terminal.png",
  facilityPrinter: "assets/sprites/facility_printer.png",
  facilityShelf: "assets/sprites/facility_shelf.png",
  enemyBinbot: "assets/sprites/enemy_binbot.png",
  enemySludge: "assets/sprites/enemy_sludge.png",
  enemyEye: "assets/sprites/enemy_eye.png",
  enemyMimic: "assets/sprites/enemy_mimic.png",
  enemyGuard: "assets/sprites/enemy_guard.png",
  trapSpikes: "assets/sprites/trap_spikes.png",
  trapSaw: "assets/sprites/trap_saw.png",
  trapVent: "assets/sprites/trap_vent.png",
  itemPlastic: "assets/sprites/item_plastic.png",
  itemGlass: "assets/sprites/item_glass.png",
  itemCircuit: "assets/sprites/item_circuit.png",
  itemCoil: "assets/sprites/item_coil.png",
  itemGear: "assets/sprites/item_gear.png",
  itemMetal: "assets/sprites/item_metal.png",
  itemToken: "assets/sprites/item_token.png",
  itemBattery: "assets/sprites/item_battery.png",
  itemHeart: "assets/sprites/item_heart.png",
  itemShield: "assets/sprites/item_shield.png",
  itemSpeed: "assets/sprites/item_speed.png",
  itemMagnet: "assets/sprites/item_magnet.png",
  itemPower: "assets/sprites/item_power.png",
  itemCooldown: "assets/sprites/item_cooldown.png",
  equipWrenchBasic: "assets/sprites/equip_wrench_basic.png",
  equipWrenchGreen: "assets/sprites/equip_wrench_green.png",
  equipWrenchBlue: "assets/sprites/equip_wrench_blue.png",
  equipWrenchGold: "assets/sprites/equip_wrench_gold.png",
  equipHelmetBasic: "assets/sprites/equip_helmet_basic.png",
  equipHelmetBlue: "assets/sprites/equip_helmet_blue.png",
  equipArmorBasic: "assets/sprites/equip_armor_basic.png",
  equipArmorGreen: "assets/sprites/equip_armor_green.png",
  equipArmorGold: "assets/sprites/equip_armor_gold.png",
  equipBootsBasic: "assets/sprites/equip_boots_basic.png",
  guideSprite: "assets/sprites/guide_sprite.png",
  charBluecat: "assets/sprites/char_bluecat.png",
  charBattery: "assets/sprites/char_battery.png",
  charBottle: "assets/sprites/char_bottle.png",
  charBox: "assets/sprites/char_box.png",
  charShirt: "assets/sprites/char_shirt.png",
  charWarden: "assets/sprites/char_warden.png",
  charPhone: "assets/sprites/char_phone.png",
  facilityStory: "assets/sprites/facility_story.png",
  bgElectronic: "assets/generated/bg_electronic.png",
  bgPlastic: "assets/generated/bg_plastic.png",
  bgPaper: "assets/generated/bg_paper.png",
  bgTextile: "assets/generated/bg_textile.png",
  itemPaper: "assets/sprites/item_paper.png",
  itemFabric: "assets/sprites/item_fabric.png",
  minimapHub: "assets/sprites/minimap_hub.png",
  minimapBattle: "assets/sprites/minimap_battle.png",
  minimapQuest: "assets/sprites/minimap_quest.png",
  minimapShop: "assets/sprites/minimap_shop.png",
  facilityNew0: "assets/sprites/facility_new_0.png",
  facilityNew1: "assets/sprites/facility_new_1.png",
  facilityNew2: "assets/sprites/facility_new_2.png",
  facilityNew3: "assets/sprites/facility_new_3.png",
  facilityNew4: "assets/sprites/facility_new_4.png",
  facilityNew5: "assets/sprites/facility_new_5.png",
  fxHitSpark: "assets/effects/hit_spark_sheet.png",
  fxSlash: "assets/effects/slash_effect_sheet.png",
  fxExplosion: "assets/effects/explosion_sheet.png",
  fxFreeze: "assets/effects/ice_freeze_sheet.png",
  fxElectric: "assets/effects/electric_arc_sheet.png",
  fxPoison: "assets/effects/poison_cloud_sheet.png",
  fxMuzzle: "assets/effects/muzzle_flash_sheet.png",
  fxHeal: "assets/effects/heal_aura_sheet.png",
  fxShield: "assets/effects/shield_barrier_sheet.png",
  fxPower: "assets/effects/power_surge_sheet.png",
};

const themeAssetCounts = {
  electronic: { monsters: 8, equipmentTiers: 4, souvenirs: 3, facilities: 6 },
  plastic: { monsters: 8, equipmentTiers: 4, souvenirs: 8, facilities: 4 },
  paper: { monsters: 8, equipmentTiers: 4, souvenirs: 8, facilities: 4 },
  textile: { monsters: 8, equipmentTiers: 3, souvenirs: 8, facilities: 4 },
};

for (const [themeId, counts] of Object.entries(themeAssetCounts)) {
  for (let i = 0; i < counts.monsters; i += 1) imagePaths[`${themeId}Monster${i}`] = `assets/themes/${themeId}_monster_${i}.png`;
  for (let tier = 0; tier < counts.equipmentTiers; tier += 1) {
    for (let slot = 0; slot < 5; slot += 1) imagePaths[`${themeId}Equip${tier}_${slot}`] = `assets/themes/${themeId}_equip_${tier}_${slot}.png`;
  }
  for (let i = 0; i < counts.souvenirs; i += 1) imagePaths[`${themeId}Souvenir${i}`] = `assets/themes/${themeId}_souvenir_${i}.png`;
  for (let i = 0; i < counts.facilities; i += 1) imagePaths[`${themeId}Facility${i}`] = `assets/themes/${themeId}_facility_${i}.png`;
}

const imgs = {};
let assetsReady = false;

const scrapTypes = [
  ["plastic", "塑料带", "itemPlastic"],
  ["glass", "玻璃片", "itemGlass"],
  ["metal", "金属板", "itemMetal"],
  ["circuit", "电路板", "itemCircuit"],
  ["coil", "铜线圈", "itemCoil"],
  ["gear", "齿轮", "itemGear"],
  ["battery", "电池芯", "itemBattery"],
  ["paper", "纸板纤维", "itemPaper"],
  ["fabric", "再生布料", "itemFabric"],
  ["token", "回收章", "itemToken"],
];

const buffs = {
  heart: { name: "修复心", img: "itemHeart", apply: () => heal(26) },
  shield: { name: "护盾", img: "itemShield", apply: () => addShield(22) },
  speed: { name: "疾行鞋", img: "itemSpeed", apply: () => addBuff("speed", 9) },
  magnet: { name: "磁力", img: "itemMagnet", apply: () => addBuff("magnet", 10) },
  power: { name: "强化", img: "itemPower", apply: () => addBuff("power", 8) },
  cooldown: { name: "冷却", img: "itemCooldown", apply: () => addBuff("cooldown", 8) },
};

const equipments = [
  {
    id: "wrench_basic",
    slot: "weapon",
    name: "环形修补扳手",
    img: "equipWrenchBasic",
    desc: "圆圈震荡攻击，范围稳定，适合新手清怪。",
    attackType: "circle",
    damage: 18,
    cooldown: 0.44,
    reach: 84,
    cost: {},
  },
  {
    id: "wrench_green",
    slot: "weapon",
    name: "循环挥砍钳",
    img: "equipWrenchGreen",
    desc: "前方扇形挥砍，伤害更集中，打 Boss 更舒服。",
    attackType: "slash",
    damage: 30,
    cooldown: 0.36,
    reach: 122,
    cost: { plastic: 8, metal: 6, gear: 2 },
  },
  {
    id: "wrench_blue",
    slot: "weapon",
    name: "追踪电磁钳",
    img: "equipWrenchBlue",
    desc: "发射追踪子弹，自动锁定最近敌人或 Boss。",
    attackType: "homing",
    damage: 24,
    cooldown: 0.32,
    reach: 520,
    cost: { circuit: 7, coil: 5, battery: 2 },
  },
  {
    id: "wrench_gold",
    slot: "weapon",
    name: "公益光束钳",
    img: "equipWrenchGold",
    desc: "挥砍加追踪弹的混合高阶武器。",
    attackType: "hybrid",
    damage: 38,
    cooldown: 0.28,
    reach: 150,
    cost: { token: 5, circuit: 9, coil: 7 },
  },
  {
    id: "helmet_basic",
    slot: "helmet",
    name: "分拣头盔",
    img: "equipHelmetBasic",
    desc: "进入战斗时提供少量护盾。",
    shield: 10,
    cost: {},
  },
  {
    id: "helmet_blue",
    slot: "helmet",
    name: "蓝屏护目盔",
    img: "equipHelmetBlue",
    desc: "减少陷阱和 Boss 弹幕伤害。",
    shield: 24,
    trapResist: 0.35,
    cost: { glass: 7, circuit: 5, token: 2 },
  },
  {
    id: "armor_basic",
    slot: "armor",
    name: "旧料护甲",
    img: "equipArmorBasic",
    desc: "基础防护，增加生命上限。",
    hp: 18,
    defense: 1,
    cost: {},
  },
  {
    id: "armor_green",
    slot: "armor",
    name: "循环背心",
    img: "equipArmorGreen",
    desc: "提高生命，并提升碎片拾取范围。",
    hp: 34,
    defense: 3,
    pickup: 18,
    cost: { plastic: 6, glass: 4, metal: 6 },
  },
  {
    id: "armor_gold",
    slot: "armor",
    name: "Scrap Loop 白金甲",
    img: "equipArmorGold",
    desc: "高阶护甲，承受 Boss 弹幕更稳。",
    hp: 56,
    defense: 6,
    pickup: 28,
    cost: { token: 6, metal: 10, battery: 3 },
  },
  {
    id: "boots_basic",
    slot: "boots",
    name: "分拣靴",
    img: "equipBootsBasic",
    desc: "提高移动速度，减少被包围风险。",
    speed: 20,
    cost: {},
  },
];

equipments.forEach((item) => {
  if (!item.theme) item.theme = "electronic";
});

equipments.push(
  { id: "plastic_visor", theme: "plastic", slot: "helmet", name: "瓶盖护目盔", img: "plasticEquip1_1", desc: "塑料主题头盔。提高护盾并减少陷阱伤害，适合新手刷塑料港。", shield: 18, trapResist: 0.18, cost: { plastic: 8, glass: 2 } },
  { id: "plastic_sprayer", theme: "plastic", slot: "weapon", name: "瓶片弹射枪", img: "plasticEquip0_0", desc: "发射多枚可轻微追踪的瓶片弹，清小怪效率高。", attackType: "burst", damage: 18, cooldown: 0.34, reach: 520, projectileCount: 3, cost: { plastic: 8, glass: 3 } },
  { id: "plastic_recycle_armor", theme: "plastic", slot: "armor", name: "塑料蜂巢甲", img: "plasticEquip1_2", desc: "轻量护甲，提升拾取范围，并让环形攻击半径更大。", hp: 26, defense: 2, pickup: 42, areaBonus: 18, cost: { plastic: 10, token: 2 } },
  { id: "plastic_cap_boots", theme: "plastic", slot: "boots", name: "瓶盖轮靴", img: "plasticEquip2_4", desc: "高速移动，触发技能后短暂加速。", speed: 42, cost: { plastic: 9, gear: 2 } },

  { id: "paper_fold_helmet", theme: "paper", slot: "helmet", name: "折纸守护盔", img: "paperEquip1_1", desc: "纸板主题头盔。提供护盾，技能冷却期间更适合稳步推进。", shield: 16, trapResist: 0.12, cost: { paper: 8, token: 1 } },
  { id: "paper_blade", theme: "paper", slot: "weapon", name: "折纸穿刺剑", img: "paperEquip2_0", desc: "前方穿透挥砍，命中越密集越好用。", attackType: "pierce", damage: 28, cooldown: 0.36, reach: 168, cost: { paper: 8, gear: 2 } },
  { id: "paper_layer_armor", theme: "paper", slot: "armor", name: "瓦楞层叠甲", img: "paperEquip1_2", desc: "受到碰撞时反伤附近敌人，适合尸潮。", hp: 38, defense: 4, reflect: 14, cost: { paper: 10, token: 2 } },
  { id: "paper_light_boots", theme: "paper", slot: "boots", name: "纸翼轻靴", img: "paperEquip3_4", desc: "降低攻击冷却，让连续挥砍更顺。", speed: 26, cooldownBoost: 0.05, cost: { paper: 9, token: 2 } },

  { id: "textile_patch_cap", theme: "textile", slot: "helmet", name: "补丁软帽", img: "textileEquip1_1", desc: "布料主题头盔。增加护盾，配合缠绕技能能稳定拉开距离。", shield: 20, trapResist: 0.1, cost: { fabric: 8, coil: 1 } },
  { id: "textile_sabre", theme: "textile", slot: "weapon", name: "织线弯刀", img: "textileEquip1_0", desc: "弧形挥砍附带织线束缚，近战容错更好。", attackType: "slash", damage: 31, cooldown: 0.34, reach: 136, bind: 1.6, cost: { fabric: 8, coil: 2 } },
  { id: "textile_patch_armor", theme: "textile", slot: "armor", name: "拼布修复甲", img: "textileEquip1_2", desc: "击败敌人时有轻微回复，适合长时间防守。", hp: 34, defense: 3, lifesteal: 3, cost: { fabric: 10, token: 2 } },
  { id: "textile_lace_boots", theme: "textile", slot: "boots", name: "绳结跑靴", img: "textileEquip2_4", desc: "移动更稳，拾取范围更大。", speed: 32, pickup: 26, cost: { fabric: 9, coil: 2 } },
);

const recipes = [
  {
    id: "ocean_charm",
    name: "海洋瓶片挂件",
    img: "itemGlass",
    desc: "用玻璃片和塑料带做成的蓝绿挂件。",
    cost: { plastic: 4, glass: 4, token: 1 },
    points: 14,
  },
  {
    id: "circuit_flower",
    name: "电路花纪念牌",
    img: "itemCircuit",
    desc: "电子废物再设计，适合公益展台展示。",
    cost: { circuit: 5, coil: 3, gear: 2 },
    points: 20,
  },
  {
    id: "clean_medal",
    name: "Scrap Loop 行动徽章",
    img: "itemToken",
    desc: "把金属板压制成可兑换徽章。",
    cost: { metal: 6, gear: 3, token: 2 },
    points: 24,
  },
];

const printRewards = [
  {
    id: "blue_cat_print",
    name: "蓝猫双层 3D 打印摆件券",
    img: "bossCat",
    desc: "Boss 掉落的打印碎片可兑换 3D 废物打印纪念品预约券。",
    cost: { printShard: 8 },
    points: 60,
  },
  {
    id: "recycle_core_print",
    name: "回收核心钥匙扣券",
    img: "itemToken",
    desc: "适合低门槛兑换的 3D 打印公益纪念品。",
    cost: { printShard: 4, token: 2 },
    points: 34,
  },
];

const backgrounds = [
  { id: "hub", name: "Scrap Loop 基地", img: "bgHub", cost: {}, desc: "默认公益基地背景。" },
  { id: "arena", name: "清洁废料场", img: "bgArena", cost: { plastic: 5, metal: 5 }, desc: "适合战斗感更强的主页展示。" },
  { id: "lab", name: "电子再生实验室", img: "bgLab", cost: { circuit: 5, coil: 4 }, desc: "电子废弃物主题背景。" },
  { id: "market", name: "公益兑换市场", img: "bgMarket", cost: { token: 3 }, desc: "更适合兑换和活动展示。" },
  { id: "boss", name: "蓝猫打印核心", img: "bgMarket", cost: { printShard: 3 }, desc: "击败 Boss 后可解锁的纪念品主题背景。" },
];

const enemyDeck = [
  { name: "履带垃圾桶", img: "enemyBinbot", hp: 38, speed: 58, damage: 6, drop: ["plastic", "metal"] },
  { name: "酸液团", img: "enemySludge", hp: 30, speed: 48, damage: 8, drop: ["glass", "battery"] },
  { name: "监测眼", img: "enemyEye", hp: 28, speed: 72, damage: 6, drop: ["circuit", "coil"] },
  { name: "伪装回收箱", img: "enemyMimic", hp: 52, speed: 44, damage: 10, drop: ["gear", "token"] },
  { name: "清障机", img: "enemyGuard", hp: 68, speed: 48, damage: 12, drop: ["metal", "battery", "token"] },
];

const themeConfigs = {
  electronic: {
    id: "electronic",
    name: "电子废料",
    short: "电子",
    desc: "电路、金属、电池与机械污染物，适合当前基础关卡。",
    preview: "itemCircuit",
    color: "#30e4e0",
    drops: ["circuit", "coil", "battery", "metal", "gear"],
    puzzle: ["circuit", "coil", "battery", "metal"],
    enemies: Array.from({ length: 8 }, (_, i) => ({ name: ["道强池怪", "电路蟹", "电池虫", "螺丝蛛", "芯片鬼", "线缆蛇", "开关兽", "电感巨人"][i], img: `electronicMonster${i}`, hp: 30 + i * 6, speed: 46 + i * 4, damage: 6 + Math.floor(i / 2), drop: ["circuit", i % 2 ? "coil" : "battery"] })),
    souvenirs: Array.from({ length: 3 }, (_, i) => ({ name: ["电路花纪念牌", "铜线萤火虫", "齿轮勋章"][i], img: `electronicSouvenir${i}`, desc: "电子废料再生制作的公益纪念品。" })),
    facilities: Array.from({ length: 6 }, (_, i) => `facilityNew${i}`),
  },
  plastic: {
    id: "plastic",
    name: "塑料废料",
    short: "塑料",
    desc: "塑料瓶、瓶盖、泡沫和海洋塑料，适合讲解可回收塑料再生。",
    preview: "plasticFacility0",
    color: "#3d93ff",
    drops: ["plastic", "glass", "token"],
    puzzle: ["plastic", "glass", "plastic", "token"],
    enemies: Array.from({ length: 8 }, (_, i) => ({ name: `塑料污染体 ${i + 1}`, img: `plasticMonster${i}`, hp: 34 + i * 5, speed: 46 + i * 4, damage: 6 + Math.floor(i / 2), drop: ["plastic", i % 2 ? "glass" : "token"] })),
    souvenirs: Array.from({ length: 8 }, (_, i) => ({ name: ["瓶片蓝猫", "瓶盖徽章", "海塑钥匙扣", "再生小树", "瓶身花盆", "环保台灯", "塑料砖小屋", "再生滑板"][i], img: `plasticSouvenir${i}`, desc: "由塑料废料再生制作的公益纪念品。" })),
    facilities: Array.from({ length: 4 }, (_, i) => `plasticFacility${i}`),
  },
  paper: {
    id: "paper",
    name: "纸板纸类",
    short: "纸类",
    desc: "纸箱、票据、纸杯和纸浆再造，适合讲解分类、压缩与再生纸。",
    preview: "paperFacility0",
    color: "#b9874c",
    drops: ["paper", "gear", "token"],
    puzzle: ["paper", "paper", "gear", "token"],
    enemies: Array.from({ length: 8 }, (_, i) => ({ name: `纸板污染体 ${i + 1}`, img: `paperMonster${i}`, hp: 32 + i * 6, speed: 44 + i * 4, damage: 6 + Math.floor(i / 2), drop: ["paper", i % 2 ? "gear" : "token"] })),
    souvenirs: Array.from({ length: 8 }, (_, i) => ({ name: ["纸板城堡", "再生纸本", "种子明信片", "纸灯笼", "纸板机器人", "纸浆摆件", "环保礼盒", "书屋模型"][i], img: `paperSouvenir${i}`, desc: "由纸板纸类废料再生制作的公益纪念品。" })),
    facilities: Array.from({ length: 4 }, (_, i) => `paperFacility${i}`),
  },
  textile: {
    id: "textile",
    name: "布料纺织",
    short: "布料",
    desc: "旧衣、纽扣、线轴与布料边角料，适合讲解修补、再设计和循环纺织。",
    preview: "textileFacility0",
    color: "#46d57a",
    drops: ["fabric", "coil", "token"],
    puzzle: ["fabric", "coil", "fabric", "token"],
    enemies: Array.from({ length: 8 }, (_, i) => ({ name: `布料污染体 ${i + 1}`, img: `textileMonster${i}`, hp: 36 + i * 5, speed: 48 + i * 3, damage: 6 + Math.floor(i / 2), drop: ["fabric", i % 2 ? "coil" : "token"] })),
    souvenirs: Array.from({ length: 8 }, (_, i) => ({ name: ["拼布玩偶", "再生布袋", "布花胸针", "编织手环", "牛仔背包", "拼布猫挂件", "布艺书签", "织物挂毯"][i], img: `textileSouvenir${i}`, desc: "由旧布料和纺织边角料再设计的公益纪念品。" })),
    facilities: Array.from({ length: 4 }, (_, i) => `textileFacility${i}`),
  },
};

const battleMaps = [
  { id: "electronic_yard", name: "\u7535\u5b50\u518d\u751f\u8f66\u95f4", img: "bgElectronic", theme: "electronic", tint: "rgba(47,224,220,0.06)", accent: "#2fe0dc" },
  { id: "blue_sorter", name: "\u84dd\u8272\u5206\u62fe\u8f66\u95f4", img: "bgLab", theme: "electronic", tint: "rgba(210,244,255,0.06)", accent: "#30e4e0" },
  { id: "market_lane", name: "\u516c\u76ca\u5151\u6362\u8857\u533a", img: "bgMarket", theme: "electronic", tint: "rgba(255,248,218,0.06)", accent: "#ffd861" },
  { id: "plastic_bay", name: "\u585e\u6599\u6f6e\u6c50\u6e2f", img: "bgArena", theme: "plastic", tint: "rgba(89,174,255,0.06)", accent: "#3d93ff" },
  { id: "paper_workshop", name: "\u7eb8\u677f\u538b\u7f29\u5382", img: "bgMarket", theme: "paper", tint: "rgba(214,166,92,0.06)", accent: "#d6a65c" },
  { id: "textile_lane", name: "\u5e03\u6599\u4fee\u8865\u8857", img: "bgLab", theme: "textile", tint: "rgba(91,214,129,0.06)", accent: "#46d57a" },
];

const collectibleCards = [
  { id: "battery_remote", theme: "electronic", name: "遥控器电池", img: "itemBattery", rarity: "危险回忆", story: "自从他被主人从空调遥控器上扣下后，他一路流浪在厨余垃圾中，外壳被汤汁泡软，里面的金属一点点渗出。被你带回基地后，他第一次知道：危险废物要去专门回收点，而不是混进普通垃圾袋。" },
  { id: "circuit_flower_card", theme: "electronic", name: "电路花纪念牌", img: "itemCircuit", rarity: "再生电光", story: "她曾是一块旧玩具的电路板，按钮失灵后被丢进抽屉。基地把铜线和芯片重新整理，她被做成一朵会发光的纪念花，提醒大家电子废料里既有资源，也有需要谨慎处理的部分。" },
  { id: "coil_firefly", theme: "electronic", name: "铜线萤火虫", img: "itemCoil", rarity: "导线故事", story: "这卷铜线以前藏在坏掉的耳机里，缠得像一团烦恼。修复师把它绕成萤火虫的翅膀，让它在展柜里发亮：越小的电子配件，越容易被忽略，也越需要分类回收。" },
  { id: "gear_medal", theme: "electronic", name: "齿轮行动徽章", img: "itemGear", rarity: "机械余温", story: "他曾经负责让小电机转动，停下后还以为自己没用了。你把齿轮交给纪念工坊，压成一枚行动徽章，送给完成第一次分类任务的玩家。" },
  { id: "metal_seed", theme: "electronic", name: "金属种子", img: "itemMetal", rarity: "资源种子", story: "金属片不该一直沉在垃圾堆里。清洗、分拣、重塑之后，它被做成一颗种子形状的吊坠，意思是：回收不是结束，是下一次制造的开始。" },
  { id: "glass_chip", theme: "electronic", name: "玻璃屏碎星", img: "itemGlass", rarity: "屏幕碎光", story: "她来自一块摔裂的屏幕。破碎时她很锋利，混进垃圾袋会划伤清运人员。展馆把她封进透明徽章里，告诉大家：尖锐物也需要安全包裹后再处理。" },
  { id: "token_stamp", theme: "electronic", name: "回收站章", img: "itemToken", rarity: "公益通行", story: "这枚章不是钱，却能兑换一次真实行动：修好一个零件、完成一轮分拣、换回一张3D废物打印纪念券。它记录你让废品少走的一段弯路。" },
  { id: "cat_print_ticket", theme: "electronic", name: "蓝猫打印券", img: "bossCat", rarity: "Boss纪念", story: "蓝猫Boss被净化后留下打印碎片。它不再吼叫，而是变成一张预约券，等待用回收材料打印成真实摆件，证明游戏里的选择也能走到现实里。" },

  { id: "bottle_crab", theme: "plastic", name: "瓶壳小蟹", img: "plasticSouvenir0", rarity: "海湾守望", story: "一个饮料瓶漂到排水口，瓶身裂开后成了小蟹的壳。你把它带回塑料港，做成透明蓝色摆件：塑料轻、方便，却会在环境里停留很久。" },
  { id: "cap_badge", theme: "plastic", name: "瓶盖徽章", img: "plasticSouvenir1", rarity: "盖子证词", story: "瓶盖总觉得自己太小，不会造成麻烦。直到他卡进泥沙里，被风吹到河边。现在他被压成徽章，提醒大家小件塑料也要一起收集。" },
  { id: "ocean_keychain", theme: "plastic", name: "海塑钥匙扣", img: "plasticSouvenir2", rarity: "潮汐来信", story: "这枚钥匙扣由被捞回的塑料碎片制成。它的蓝色不是海水，而是海水曾经承受过的颜色。把它挂在包上，就是一次小小的提醒。" },
  { id: "plastic_tree", theme: "plastic", name: "再生小树", img: "plasticSouvenir3", rarity: "瓶片新芽", story: "瓶片被清洗、破碎、重塑，变成一棵小树模型。它不会真的长高，却会让玩家记得：回收前先倒空、压扁、分类，能让再生流程更顺畅。" },
  { id: "bottle_planter", theme: "plastic", name: "瓶身花盆", img: "plasticSouvenir4", rarity: "透明花盆", story: "半截瓶身原本在垃圾桶里等待被混运。工坊给它钻孔、打磨，放进种子和泥土，它终于从一次性容器变成了每天都能照顾的东西。" },
  { id: "cap_lamp", theme: "plastic", name: "瓶盖台灯", img: "plasticSouvenir5", rarity: "夜间分拣", story: "许多彩色瓶盖拼成灯罩，灯光透出来像小小的地图。展馆说明牌写着：同类材料越干净，回收再利用的机会越高。" },
  { id: "brick_house", theme: "plastic", name: "塑料砖小屋", img: "plasticSouvenir6", rarity: "压缩之家", story: "泡沫盒怪被击败后留下轻飘飘的碎块。压缩机把它们做成模型砖，小屋不大，却装着‘减少一次性用品’的任务。" },
  { id: "recycle_skate", theme: "plastic", name: "再生滑板", img: "plasticSouvenir7", rarity: "少年路线", story: "滑板的轮子来自旧瓶盖，板面来自再生塑料。它属于基地最快的巡查员，也提醒玩家：重复使用比丢掉再买更酷。" },

  { id: "cardboard_castle", theme: "paper", name: "纸板城堡", img: "paperSouvenir0", rarity: "快递王国", story: "纸箱曾保护过一份快递，却在拆开后被随手扔在雨里。晒干、压平、裁切后，它变成展馆里的城堡：纸类回收最怕被油污和水浸坏。" },
  { id: "seed_notebook", theme: "paper", name: "再生纸本", img: "paperSouvenir1", rarity: "书页新生", story: "一本旧作业本说：我不是被写满就结束了。基地把干净纸张再制成新本子，第一页印着‘先双面使用，再分类回收’。" },
  { id: "seed_postcard", theme: "paper", name: "种子明信片", img: "paperSouvenir2", rarity: "会发芽的信", story: "这张纸里藏着种子。写完祝福后可以埋进土里，长出一点绿色。它让废纸讲了第二个故事，而不是直接变成负担。" },
  { id: "paper_lantern", theme: "paper", name: "纸灯笼", img: "paperSouvenir3", rarity: "柔光档案", story: "旧票据被揉皱后很难再读。分拣员把干净纸片做成灯笼，光从纤维里透出来，像在说：纸类回收前请保持干燥。" },
  { id: "paper_robot", theme: "paper", name: "纸板机器人", img: "paperSouvenir4", rarity: "瓦楞伙伴", story: "瓦楞纸板怪以前躲在仓库角落，觉得自己只配被压扁。你给它装上绿色标志，它变成会打招呼的小机器人，负责提醒大家拆掉胶带再回收。" },
  { id: "pulp_bear", theme: "paper", name: "纸浆小熊", img: "paperSouvenir5", rarity: "柔软成型", story: "碎纸进入纸浆池，像忘掉了自己的旧字迹。成型后的小熊坐在展柜里，告诉玩家：纸张可以循环，但每次循环都需要更细心的分类。" },
  { id: "gift_box", theme: "paper", name: "环保礼盒", img: "paperSouvenir6", rarity: "第二次礼物", story: "礼盒不是为了被拆开就丢。它被重新折叠、加固、贴上回收标志，成为可以再次送出的礼物，里面装着一张‘少买包装’的提醒卡。" },
  { id: "book_house", theme: "paper", name: "书屋模型", img: "paperSouvenir7", rarity: "纸页小镇", story: "旧书页不再完整，但它们组成了一间小书屋。展馆给它的说明是：能捐赠和交换的书，先让知识继续旅行。" },

  { id: "patch_doll", theme: "textile", name: "拼布玩偶", img: "textileSouvenir0", rarity: "修补朋友", story: "一件破洞T恤觉得自己只剩下洞。裁剪、缝合、填充之后，它成为拼布玩偶。它学会的第一句话是：小破损先修补，不急着丢掉。" },
  { id: "recloth_bag", theme: "textile", name: "再生布袋", img: "textileSouvenir1", rarity: "随身循环", story: "旧窗帘被剪成布袋，陪玩家去基地领取奖励。它不喜欢一次性袋子，因为每少用一个，都是给它的同伴少一点压力。" },
  { id: "button_flower", theme: "textile", name: "布花胸针", img: "textileSouvenir2", rarity: "纽扣花开", story: "纽扣从旧衬衫上掉下来，以为没人会找它。修补摊把它缝在布花中央，它成了最亮的花心，也让玩家记得拆下可再用配件。" },
  { id: "woven_bracelet", theme: "textile", name: "编织手环", img: "textileSouvenir3", rarity: "线头约定", story: "几根线头被丢在裁剪台边缘，差点被扫走。它们被编成手环，代表伙伴之间的约定：不要让还能用的布料直接进垃圾桶。" },
  { id: "cowboy_bag", theme: "textile", name: "牛仔背包", img: "textileSouvenir4", rarity: "耐磨远行", story: "旧牛仔裤的膝盖磨白了，但布料还很结实。工坊把裤腿改成背包，口袋里塞着一张地图，通往布料修补街。" },
  { id: "patch_cat", theme: "textile", name: "拼布猫挂件", img: "textileSouvenir5", rarity: "软布守护", story: "几块布边角拼成一只小猫。它的眼睛由旧纽扣做成，尾巴来自一段鞋带。它守着展柜，向玩家眨眼：边角料也有角色。" },
  { id: "fabric_bookmark", theme: "textile", name: "布艺书签", img: "textileSouvenir6", rarity: "书页之间", story: "这条书签原来是一截校服袖口。它变薄、变轻，却保留了布料的纹理。每夹住一页，它都在提醒：旧衣物可以捐赠、改造或规范回收。" },
  { id: "wall_hanging", theme: "textile", name: "织物挂毯", img: "textileSouvenir7", rarity: "线与风景", story: "许多颜色不同的布条被织成一幅小山水。它不是昂贵材料做的，却有最完整的故事：被珍惜的旧物，也能重新成为风景。" },
];

const dialogueScenes = [
  ["序章", "charWarden", "基地引导员", "欢迎来到废品轮回基地。这里不是垃圾场，是废品的第二次报名处。你愿意成为分棣学员吗？", "基地是玩家理解循环流程的起点。"],
  ["序章", "charWarden", "基地引导员", "每一件被丢弃的东西，都曾被人需要过。我们的任务，是听它们说完自己的故事，再帮它们找到正确的路。", "故事化叙事让知识更容易被记住。"],
  ["序章", "charWarden", "基地引导员", "基地里有十个功能区。先用 WASD 走到传送门，按 Enter 选择一个主题关卡。电子、塑料、纸板、布料，各有各的处理方式。", "不同废物有不同处理路径。"],
  ["序章", "charWarden", "基地引导员", "记住：武器不是为了炒耀，而是为了更安全地清障。先去装备间选一套主题装备，再来找我。", "装备系统映射不同材料的处理方式。"],
  ["序章", "charWarden", "基地引导员", "合成台在纪念工坊。收集的碎片可以合成纪念品，再去兑换台换成公益点。精炼机也可以把多余碎片精炼成回收章。", "合成和精炼是资源循环的中间环节。"],

  ["第一幕·电子废料", "charBattery", "废电池", "就是你们把我从遥控器里扣下后随手丢，我在湿垃圾里漏出苦味，才变成现在这样。你知道我肚子里的重金属会渗进土里吗？", "电池、含电池设备需要规范回收，不能混进普通垃圾。"],
  ["第一幕·电子废料", "charBattery", "废电池", "我不是没用了，我的金属、外壳都还在，只是需要被送到专门的回收点，而不是被随手扔掉。你愿意带我回去吗？", "电子废弃物含可回收材料，也可能含需要规范处理的有害成分。"],
  ["第一幕·电子废料", "charBattery", "旧手机", "我不是没用了，我的金属、屏幕和电池都还在身体里，只是需要被拆解得更认真。你能帮我找到电子废物分棣台吗？", "电子废弃物含可回收材料，也可能含需要规范处理的有害成分。"],
  ["第一幕·电子废料", "charBattery", "耳机线", "我被缠成一团时，大家只想剪断我。先解开，再分类。小型电子配件容易被忽略，集中回收更安全。", "小型电子配件容易被忽略，集中回收更安全。"],
  ["第一幕·电子废料", "charBattery", "充电宝", "我肚子里还有电，挤压会发热。含锂电设备存在起火风险，应通过正规渠道回收。我不该被塞进普通垃圾车。", "含锂电设备存在起火风险，应通过正规渠道回收。"],
  ["第一幕·电子废料", "charBattery", "电路板守卫", "人类只看见垃圾，看不见铜和芯片。回收不是把危险藏起来，而是按流程处理。", "回收不是把危险藏起来，而是按流程处理。"],
  ["第一幕·电子废料", "charBluecat", "蓝猫回收守卫", "我是由打印失败的边角料和乱丢电池进化而来的 Boss。你以为打败我就够了？不，你得学会正确分类，我才会真正安静下来。", "Boss 碎片用于 3D 废物打印兑换，连接游戏与真实公益。"],
  ["第一幕·电子废料", "charWarden", "基地引导员", "你击败了蓝猫守卫，它留下了打印碎片。拿去兑换台，可以换一张 3D 废物打印纪念品券。这就是游戏里的选择走到现实的方式。", "实物兑换让虚拟公益有现实反馈。"],
  ["第一幕·电子废料", "charWarden", "基地引导员", "充电宝、废电池、旧手机、耳机线——它们都是电子废料家族。共同点是：不能随手丢，要送到专门回收点。", "含有害成分的电子废物必须规范处理。"],

  ["第二幕·塑料废料", "charBottle", "塑料瓶蟹", "我漂过排水沟，差点进了河。一个饮料瓶，从被喝完到被正确回收，中间有太多岔路。你压扁我了吗？倒空我了吗？", "瓶类回收前应尽量倒空、压扁并保持干净。"],
  ["第二幕·塑料废料", "charBottle", "塑料瓶蟹", "你们制造我很快，喝完就丢，忘记我更快。但我在环境里会停留几百年。我不是魔法变没的，要么被回收，要么一直存在。", "回收教育要同时强调减量、重复使用和分类。"],
  ["第二幕·塑料废料", "charBottle", "塑料瓶蟹", "如果我能被洗干净、分好类，我就能变成新的瓶子、衣服、滑板。再生不是魔法，是流程。你愿意走完这个流程吗？", "同类、干净、干燥能提高再生机会。"],
  ["第二幕·塑料废料", "charBottle", "瓶盖蜘蛛", "你们总觉得我太小，没有关系。但小塑料容易散落，集中收集能减少环境残留。小件塑料也要一起收集。", "小塑料容易散落，集中收集能减少环境残留。"],
  ["第二幕·塑料废料", "charBottle", "泡沫盒怪", "汤汁让我变得油腻，没人愿接近。被污染的包装要先判断是否可清洁。食物污染会降低塑料和纸类回收价值。", "食物污染会降低塑料和纸类回收价值。"],
  ["第二幕·塑料废料", "charBottle", "洗衣液桶", "我还有残液，混进去会弄脏一整袋。先倒空、冲洗、晞干。清洁度影响再生材料质量。", "清洁度影响再生材料质量。"],
  ["第二幕·塑料废料", "charBottle", "布舰乙虫", "我缠住过很多不该缠住的东西。回收网具和绳索，减少缠绕风险。绳网类废物会造成缠绕危害。", "绳网类废物会造成缠绕危害，需要专门收集。"],
  ["第二幕·塑料废料", "charWarden", "基地引导员", "塑料家族很庞大：瓶子、瓶盖、吸管、泡沫、洗衣液桶、渔网。它们的共同点是：轻、方便，却在环境里停留很久。", "塑料在环境中难以自然降解，需要人工回收。"],

  ["第三幕·纸板纸类", "charBox", "纸箱怪", "雨水让我软掉，油污让我失去下一次机会。我本来可以变成新纸、新盒子，但现在我只能烂在混合垃圾里。", "纸类回收应尽量保持干燥、少油污。"],
  ["第三幕·纸板纸类", "charBox", "纸箱怪", "胶带像盔甲一样贴在我身上，你们拆都不拆就扔。拆掉胶带、压平，我就能重新变成纤维，再成为一本书、一个盒子。", "纸箱回收前压平并去除明显杂物更利于分棣。"],
  ["第三幕·纸板纸类", "charBox", "纸箱怪", "我的纤维可以循环，但不是无限的。每次循环都需要更细心的分类。干净纸和油污纸，走的是完全不同的路。", "纸纤维可循环，但次数和质量有限。"],
  ["第三幕·纸板纸类", "charBox", "外卖纸袋", "我看起来是纸，但里面还有塑料膜。复合材料要按当地规则处理，不能只看外表。先看清材料再分类。", "复合材料要按当地规则处理，不能只看外表。"],
  ["第三幕·纸板纸类", "charBox", "旧作业本", "我还有空白页，别急着把我丢掉。先双面用完。重复使用是回收前的重要一步。", "重复使用是回收前的重要一步。"],
  ["第三幕·纸板纸类", "charBox", "纸杯人", "我里面有防水层，别把我当普通白纸。纸杯和普通办公纸回收路径可能不同。我会按规则丢到对应类别。", "纸杯和普通办公纸回收路径可能不同。"],
  ["第三幕·纸板纸类", "charWarden", "基地引导员", "纸类家族也很庞大：纸箱、外卖袋、作业本、纸杯、票据。它们的共同点是：怕水、怕油、怕混合。干燥分类是关键。", "纸类回收最怕被油污和潮湿。"],

  ["第四幕·布料纺织", "charShirt", "旧T恤", "我只是破了一个洞，不是整个生命都坏掉了。你们追着新款跑，把我丢成一座山。但我的布料还很结实，还能变成背包、玩偶、挂毯。", "修补和改造能延长衣物寿命。"],
  ["第四幕·布料纺织", "charShirt", "旧T恤", "能穿的先捐赠，不能穿的再回收。纽扣、拉链这些配件，拆下来还能用。别让还能用的东西直接进垃圾桶。", "纽扣、拉链等配件可以被再利用。"],
  ["第四幕·布料纺织", "charShirt", "旧T恤", "我由很多碎片组成，却不是拼凑人生。每一块旧布都有故事。被珍惜的旧物，也能重新成为风景。", "故事化展示能提升参与感。"],
  ["第四幕·布料纺织", "charShirt", "纽扣怪", "我掉下来以后，被扫进角落。我把可用配件拆下来收好。纽扣、拉链等配件可以被再利用。", "纽扣、拉链等配件可以被再利用。"],
  ["第四幕·布料纺织", "charShirt", "牛仔裤", "我的膝盖磨白了，但口袋还很结实。你可以把我变成背包。耐磨布料适合再设计。", "耐磨布料适合再设计。"],
  ["第四幕·布料纺织", "charShirt", "校服幽灵", "毕业后我被塞进柜子最深处。能捐赠就先让我继续被穿。还能穿的衣物适合捐赠或交换。", "还能穿的衣物适合捐赠或交换。"],
  ["第四幕·布料纺织", "charShirt", "染色布团", "颜色太杂，我害怕没人要。我会按材质和状态分开。纺织品回收常受材质混纺、染色和破损影响。", "纺织品回收常受材质混纺、染色和破损影响。"],
  ["第四幕·布料纺织", "charWarden", "基地引导员", "布料家族包括旧T恤、纽扣、牛仔裤、校服、染色布。它们的共同点是：能穿的先捐赠，不能穿的再拆解回收。", "能穿的衣物适合捐赠，不能穿的再规范回收。"],

  ["尾声", "charWarden", "基地引导员", "你已经听完了四种废品的故事。记住，回收不是终点，是下一次制造的开始。基地永远欢迎你回来，继续分棣，继续倾听。", "回收不是结束，是下一次制造的开始。"],
  ["尾声", "charWarden", "基地引导员", "最后一句话送给你：少用一次性，多修补，先分类再丢。这些小小的选择，就是公益回收的开始。", "公益回收从日常小事开始。"],
];

const skills = [
  { id: "invincible", name: "无敌回收罩", img: "itemShield", cost: {}, desc: "5秒内免疫伤害，适合Boss弹幕阶段。", effect: "invincible" },
  { id: "screen_clean", name: "全屏净化波", img: "itemToken", cost: { token: 3 }, desc: "对全屏敌人造成一次大量伤害。", effect: "screenDamage" },
  { id: "power50", name: "循环增幅", img: "itemPower", cost: { circuit: 4, token: 2 }, desc: "8秒内伤害提升50%。", effect: "damageBoost" },
  { id: "time_slow", name: "慢速分拣", img: "itemCooldown", cost: { gear: 4, token: 2 }, desc: "6秒内敌人和弹幕速度下降。", effect: "slow" },
  { id: "magnet_sweep", name: "磁力回收", img: "itemMagnet", cost: { coil: 5, token: 2 }, desc: "立即吸取大范围碎片与buff。", effect: "magnet" },
  { id: "heal_bloom", name: "修复花开", img: "itemHeart", cost: { plastic: 5, glass: 3 }, desc: "回复生命并产生一圈治疗光效。", effect: "heal" },
  { id: "freeze_foam", name: "低温泡沫", img: "plasticSouvenir3", cost: { plastic: 8, token: 2 }, desc: "冻结场上敌人3秒。", effect: "freeze" },
  { id: "paper_wall", name: "纸板屏障", img: "paperSouvenir0", cost: { paper: 8, token: 2 }, desc: "获得护盾并短暂反弹近身伤害。", effect: "barrier" },
  { id: "thread_bind", name: "织线束缚", img: "textileSouvenir3", cost: { fabric: 8, coil: 2 }, desc: "缠绕附近敌人并持续造成伤害。", effect: "bind" },
  { id: "drone_helper", name: "分拣无人机", img: "facilityTerminal", cost: { circuit: 7, battery: 2, token: 2 }, desc: "召唤追踪弹幕支援6秒。", effect: "drone" },
  { id: "dash_clean", name: "冲刺清扫", img: "itemSpeed", cost: { gear: 5, plastic: 4 }, desc: "向当前方向冲刺并留下伤害轨迹。", effect: "dash" },
  { id: "reflect_shell", name: "反射外壳", img: "itemMetal", cost: { metal: 8, token: 2 }, desc: "7秒内受到碰撞时反伤周围敌人。", effect: "reflect" },
];

const state = {
  scene: "title",
  battleMap: "arena",
  paused: false,
  last: 0,
  keys: new Set(),
  pad: new Set(),
  mouse: { x: W / 2, y: H / 2 },
  nearby: null,
  attacks: [],
  projectiles: [],
  enemyShots: [],
  shockwaves: [],
  enemies: [],
  pickups: [],
  traps: [],
  obstacles: [],
  battlePortal: null,
  boss: null,
  wave: 1,
  hordeTime: 0,
  hordeKills: 0,
  hordeSpawnTimer: 0,
  puzzle: null,
  prompt: "",
  toastTimer: 0,
  buffTimer: 0,
  bossDamageFloaters: [],
  skillEffects: [],
  particles: [],
  damageNumbers: [],
  shake: 0,
  shakeX: 0,
  shakeY: 0,
  hitstop: 0,
  camera: { x: 0, y: 0 },
  world: { w: W, h: H },
  mapId: "green_yard",
};

const player = {
  x: 640,
  y: 488,
  w: 46,
  h: 58,
  dir: "down",
  faceX: 1,
  faceY: 0,
  hp: 118,
  knockbackX: 0,
  knockbackY: 0,
  attackAnim: 0,
  dashTrail: [],
  pickupFlash: 0,
  maxHp: 118,
  shield: 10,
  attackCd: 0,
  skillCd: 0,
  hurtCd: 0,
  frame: 0,
  buffs: {},
};

let save = loadSave();

const hubFacilities = [
  { id: "story", name: "剧情导览", hint: "Enter 看回收剧情", img: "facilityStory", x: 280, y: 292, w: 124, h: 82, action: showStory },
  { id: "workbench", name: "纪念工坊", hint: "Enter 合成收藏品", img: "facilityWorkbench", x: 460, y: 292, w: 132, h: 78, action: showCraft },
  { id: "portal", name: "主题传送门", hint: "Enter 选主题和模式", img: "facilityPortal", x: 640, y: 292, w: 128, h: 112, action: showPortalMenu },
  { id: "museum", name: "收藏展馆", hint: "Enter 查看图鉴", img: "facilityShelf", x: 820, y: 292, w: 132, h: 88, action: showMuseum },
  { id: "exchange", name: "实物兑换", hint: "Enter 兑换实物券", img: "facilityExchange", x: 1000, y: 292, w: 134, h: 84, action: showExchange },
  { id: "locker", name: "装备间", hint: "Enter 穿脱装备", img: "facilityLocker", x: 280, y: 448, w: 116, h: 86, action: showInventory },
  { id: "medbay", name: "修复站", hint: "Enter 恢复状态", img: "facilityMedbay", x: 460, y: 448, w: 108, h: 96, action: useMedbay },
  { id: "recycler", name: "精炼机", hint: "Enter 碎片换回收章", img: "facilityRecycler", x: 640, y: 448, w: 112, h: 104, action: useRecycler },
  { id: "board", name: "任务板", hint: "Enter 查看任务", img: "facilityBoard", x: 820, y: 448, w: 126, h: 84, action: showMissions },
  { id: "terminal", name: "背景终端", hint: "Enter 切换背景", img: "facilityTerminal", x: 1000, y: 448, w: 130, h: 78, action: showBackgrounds },
];

const safeHubSpawnPoints = [
  { x: 640, y: 570 },
  { x: 640, y: 520 },
  { x: 250, y: 520 },
  { x: 1030, y: 520 },
  { x: 250, y: 350 },
  { x: 1030, y: 350 },
];

function defaultSave() {
  return {
    scraps: Object.fromEntries(scrapTypes.map(([id]) => [id, id === "token" ? 1 : 2])),
    printShard: 0,
    souvenirs: {},
    printTickets: {},
    points: 0,
    redeemed: [],
    unlocked: ["wrench_basic", "helmet_basic", "armor_basic", "boots_basic"],
    equipped: { weapon: "wrench_basic", helmet: "helmet_basic", armor: "armor_basic", boots: "boots_basic" },
    unlockedBackgrounds: ["hub"],
    currentBackground: "hub",
    currentTheme: "electronic",
    unlockedSkills: ["invincible"],
    equippedSkill: "invincible",
    stats: { collected: 0, defeated: 0, crafted: 0, bestWave: 1, bossDefeated: 0 },
    claimed: {},
  };
}

function migrateSave(raw) {
  const base = defaultSave();
  const old = raw || {};
  return {
    ...base,
    ...old,
    scraps: { ...base.scraps, ...(old.scraps || {}) },
    souvenirs: { ...base.souvenirs, ...(old.souvenirs || {}) },
    printTickets: { ...base.printTickets, ...(old.printTickets || {}) },
    equipped: { ...base.equipped, ...(old.equipped || {}) },
    stats: { ...base.stats, ...(old.stats || {}) },
    claimed: { ...base.claimed, ...(old.claimed || {}) },
    unlockedBackgrounds: old.unlockedBackgrounds || base.unlockedBackgrounds,
    currentBackground: old.currentBackground || "hub",
    currentTheme: themeConfigs[old.currentTheme] ? old.currentTheme : "electronic",
    unlockedSkills: old.unlockedSkills || base.unlockedSkills,
    equippedSkill: skills.some((s) => s.id === old.equippedSkill) ? old.equippedSkill : base.equippedSkill,
    printShard: old.printShard || 0,
  };
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY) || OLD_SAVE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    return raw ? migrateSave(JSON.parse(raw)) : defaultSave();
  } catch {
    return defaultSave();
  }
}

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function currentTheme() {
  return themeConfigs[save.currentTheme] || themeConfigs.electronic;
}

function currentEnemyDeck() {
  return currentTheme().enemies || enemyDeck;
}

function randomBattleMap(preferredTheme = save.currentTheme) {
  const themed = {
    electronic: ["electronic_yard", "blue_sorter"],
    plastic: ["plastic_bay", "blue_sorter"],
    paper: ["paper_workshop", "market_lane"],
    textile: ["textile_lane", "blue_sorter"],
  }[preferredTheme] || battleMaps.map((m) => m.id);
  const pool = battleMaps.filter((m) => themed.includes(m.id));
  return pool[Math.floor(Math.random() * pool.length)] || battleMaps[0];
}

function currentMap() {
  return battleMaps.find((m) => m.id === state.mapId) || battleMaps[0];
}

function setWorld(w = 3200, h = 2400) {
  state.world = { w, h };
  updateCamera();
}

function cameraScene() {
  return ["battle", "boss", "horde", "puzzle"].includes(state.scene);
}

function updateCamera() {
  if (!cameraScene()) {
    state.camera.x = 0;
    state.camera.y = 0;
    return;
  }
  state.camera.x = clamp(player.x - W / 2, 0, Math.max(0, state.world.w - W));
  state.camera.y = clamp(player.y - H / 2, 0, Math.max(0, state.world.h - H));
}

// ===== Particle System =====
function spawnParticles(x, y, count, opts) {
  opts = opts || {};
  for (let i = 0; i < count; i++) {
    const angle = opts.angle != null ? opts.angle + rand(-opts.spread || 0, opts.spread || 0) : Math.random() * Math.PI * 2;
    const speed = rand(opts.speedMin || 60, opts.speedMax || 200);
    state.particles.push({
      x: x + rand(-opts.xJitter || 0, opts.xJitter || 0),
      y: y + rand(-opts.yJitter || 0, opts.yJitter || 0),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: rand(opts.rMin || 2, opts.rMax || 5),
      rShrink: opts.rShrink != null ? opts.rShrink : 0.9,
      gravity: opts.gravity || 0,
      friction: opts.friction || 0.92,
      ttl: rand(opts.ttlMin || 0.3, opts.ttlMax || 0.6),
      maxTtl: opts.ttlMax || 0.6,
      color: opts.color || "#ffd861",
      glow: opts.glow || false,
      shape: opts.shape || "circle",
    });
  }
}

function updateParticles(dt) {
  for (const p of state.particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= p.friction;
    p.vy *= p.friction;
    p.vy += p.gravity * dt;
    p.r *= p.rShrink;
    p.ttl -= dt;
  }
  state.particles = state.particles.filter((p) => p.ttl > 0 && p.r > 0.5);
  if (state.particles.length > 400) state.particles = state.particles.slice(-400);
}

function drawParticles() {
  for (const p of state.particles) {
    const alpha = clamp(p.ttl / p.maxTtl, 0, 1);
    ctx.globalAlpha = alpha;
    if (p.glow) {
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
    }
    ctx.fillStyle = p.color;
    if (p.shape === "square") {
      ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (p.glow) ctx.shadowBlur = 0;
  }
  ctx.globalAlpha = 1;
}

// ===== Damage Numbers =====
function spawnDamageNumber(x, y, value, color) {
  state.damageNumbers.push({
    x: x + rand(-16, 16),
    y: y,
    vy: -60,
    vx: rand(-30, 30),
    value: value,
    ttl: 0.8,
    maxTtl: 0.8,
    color: color || "#ffd861",
    scale: 1.3,
  });
}

function updateDamageNumbers(dt) {
  for (const d of state.damageNumbers) {
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    d.vy += 80 * dt;
    d.vx *= 0.92;
    d.ttl -= dt;
    d.scale = 1 + 0.3 * (d.ttl / d.maxTtl);
  }
  state.damageNumbers = state.damageNumbers.filter((d) => d.ttl > 0);
}

function drawDamageNumbers() {
  for (const d of state.damageNumbers) {
    const alpha = clamp(d.ttl / d.maxTtl * 1.5, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.font = "950 " + Math.round(20 * d.scale) + "px MicrosoftYaHei, PingFangSC, SimHei, sans-serif";
    ctx.fillStyle = "rgba(16,35,45,0.7)";
    ctx.fillText("-" + d.value, d.x + 2, d.y + 2);
    ctx.fillStyle = d.color;
    ctx.fillText("-" + d.value, d.x, d.y);
  }
  ctx.globalAlpha = 1;
}

// ===== Screen Shake =====
function addShake(amount) {
  state.shake = Math.min(20, state.shake + amount);
}

function updateShake(dt) {
  if (state.shake > 0.1) {
    state.shakeX = rand(-state.shake, state.shake);
    state.shakeY = rand(-state.shake, state.shake);
    state.shake *= 0.85;
  } else {
    state.shake = 0;
    state.shakeX = 0;
    state.shakeY = 0;
  }
}

// ===== Hit Effects =====
function hitEffect(x, y, color, count) {
  count = count || 8;
  spawnParticles(x, y, count, {
    color: color || "#ffd861",
    speedMin: 80, speedMax: 220,
    rMin: 2, rMax: 5,
    ttlMin: 0.2, ttlMax: 0.45,
    glow: true,
    friction: 0.88,
  });
  spawnParticles(x, y, Math.floor(count / 2), {
    color: "#ffffff",
    speedMin: 120, speedMax: 260,
    rMin: 1, rMax: 3,
    ttlMin: 0.1, ttlMax: 0.25,
    glow: true,
    friction: 0.85,
  });
}

function deathBurst(x, y, color) {
  spawnParticles(x, y, 16, {
    color: color || "#f0525f",
    speedMin: 60, speedMax: 280,
    rMin: 3, rMax: 7,
    ttlMin: 0.3, ttlMax: 0.7,
    glow: true,
    friction: 0.9,
  });
  spawnParticles(x, y, 8, {
    color: "#ffffff",
    speedMin: 100, speedMax: 300,
    rMin: 1, rMax: 4,
    ttlMin: 0.15, ttlMax: 0.35,
    glow: true,
    friction: 0.88,
  });
  spawnParticles(x, y, 6, {
    color: "#ffd861",
    speedMin: 40, speedMax: 120,
    rMin: 2, rMax: 4,
    ttlMin: 0.4, ttlMax: 0.8,
    gravity: 200,
    friction: 0.94,
  });
  addShake(3);
}

// ===== Trail System =====
function updateDashTrail(dt) {
  if (player.dashTrail && player.dashTrail.length > 0) {
    for (const t of player.dashTrail) t.ttl -= dt;
    player.dashTrail = player.dashTrail.filter((t) => t.ttl > 0);
  }
  player.attackAnim = Math.max(0, player.attackAnim - dt);
  player.pickupFlash = Math.max(0, player.pickupFlash - dt);
}

function drawDashTrail() {
  if (!player.dashTrail) return;
  for (const t of player.dashTrail) {
    const alpha = t.ttl / 0.3;
    ctx.globalAlpha = alpha * 0.5;
    ctx.fillStyle = t.color || "#75ff9f";
    ctx.beginPath();
    ctx.arc(t.x, t.y, 28 * alpha, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}


// ===== Combat Animation Enhancement System =====
// Inspired by Soul Knight and Survivor.io animation patterns

// Attack trail system - records positions for motion-blur trails
const attackTrails = [];

function spawnAttackTrail(x, y, color, angle, ttl) {
  attackTrails.push({
    x: x, y: y, color: color, angle: angle || 0,
    ttl: ttl || 0.2, maxTtl: ttl || 0.2, r: 12,
  });
}

function updateAttackTrails(dt) {
  for (const t of attackTrails) {
    t.ttl -= dt;
    t.r *= 0.92;
  }
  for (let i = attackTrails.length - 1; i >= 0; i--) {
    if (attackTrails[i].ttl <= 0) attackTrails.splice(i, 1);
  }
}

function drawAttackTrails() {
  for (const t of attackTrails) {
    const alpha = clamp(t.ttl / t.maxTtl, 0, 1);
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate(t.angle);
    ctx.globalAlpha = alpha * 0.5;
    ctx.globalCompositeOperation = "lighter";
    ctx.shadowBlur = 10;
    ctx.shadowColor = t.color;
    ctx.fillStyle = t.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, t.r * 1.5, t.r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

// Hit-stop: brief frame freeze on heavy hits for impact feel
let hitStopTimer = 0;
function triggerHitStop(duration) {
  hitStopTimer = Math.max(hitStopTimer, duration || 0.05);
}
function updateHitStop(dt) {
  if (hitStopTimer > 0) hitStopTimer -= dt;
}
function isHitStopped() { return hitStopTimer > 0; }

// Enemy spawn warning: telegraph circle before enemy appears
const spawnWarnings = [];
function spawnWarning(x, y, ttl) {
  spawnWarnings.push({ x, y, ttl: ttl || 0.8, maxTtl: ttl || 0.8 });
}
function updateSpawnWarnings(dt) {
  for (const w of spawnWarnings) w.ttl -= dt;
  for (let i = spawnWarnings.length - 1; i >= 0; i--) {
    if (spawnWarnings[i].ttl <= 0) spawnWarnings.splice(i, 1);
  }
}
function drawSpawnWarnings() {
  for (const w of spawnWarnings) {
    const progress = 1 - w.ttl / w.maxTtl;
    const r = 20 + progress * 30;
    const alpha = 0.4 + Math.sin(progress * Math.PI * 4) * 0.3;
    ctx.save();
    ctx.globalAlpha = clamp(alpha, 0, 1);
    ctx.strokeStyle = "#f0525f";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.arc(w.x, w.y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    // Inner fill
    ctx.globalAlpha = 0.15 * (1 - progress);
    ctx.fillStyle = "#f0525f";
    ctx.beginPath();
    ctx.arc(w.x, w.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Trap telegraph: warn before trap activates
const trapTelegraphs = [];
function spawnTrapTelegraph(x, y, w, h, ttl) {
  trapTelegraphs.push({ x, y, w, h, ttl: ttl || 0.5, maxTtl: ttl || 0.5 });
}
function updateTrapTelegraphs(dt) {
  for (const t of trapTelegraphs) t.ttl -= dt;
  for (let i = trapTelegraphs.length - 1; i >= 0; i--) {
    if (trapTelegraphs[i].ttl <= 0) trapTelegraphs.splice(i, 1);
  }
}
function drawTrapTelegraphs() {
  for (const t of trapTelegraphs) {
    const progress = 1 - t.ttl / t.maxTtl;
    const flash = Math.sin(progress * Math.PI * 6) * 0.5 + 0.5;
    ctx.save();
    ctx.globalAlpha = 0.3 + flash * 0.3;
    ctx.fillStyle = "#ff4444";
    ctx.fillRect(t.x - t.w / 2, t.y - t.h / 2, t.w, t.h);
    // Border pulse
    ctx.globalAlpha = 0.6 + flash * 0.4;
    ctx.strokeStyle = "#ff6666";
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(t.x - t.w / 2, t.y - t.h / 2, t.w, t.h);
    ctx.setLineDash([]);
    ctx.restore();
  }
}

// Player movement dust
let dustTimer = 0;
function updateMovementDust(dt, moving) {
  if (!moving) return;
  dustTimer += dt;
  if (dustTimer >= 0.08) {
    dustTimer = 0;
    const stats = currentStats();
    spawnParticles(player.x, player.y + 28, 2, {
      color: "rgba(180,200,210,0.5)",
      speedMin: 10, speedMax: 40,
      rMin: 1, rMax: 3,
      ttlMin: 0.15, ttlMax: 0.3,
      friction: 0.9, gravity: 50,
      yJitter: 5,
    });
  }
}

// Enemy breathing/idle animation helper
function enemyBob(enemy, time) {
  const seed = (enemy.x * 0.1 + enemy.y * 0.07) % 6.28;
  return Math.sin(time * 3 + seed) * 2;
}

// Enemy hurt recoil offset
function enemyRecoil(enemy) {
  if (enemy.hitCd <= 0) return { x: 0, y: 0 };
  const intensity = enemy.hitCd * 8;
  const seed = (enemy.x + enemy.y) % 6.28;
  return {
    x: Math.cos(seed) * intensity,
    y: Math.sin(seed) * intensity,
  };
}

// Weapon glow aura: pulsing ring around player when weapon equipped
function drawWeaponAura() {
  const weapon = getEquip(save.equipped.weapon);
  if (!weapon) return;
  const t = performance.now() / 1000;
  const pulse = Math.sin(t * 4) * 0.15 + 0.85;
  const stats = currentStats();
  const reach = stats.reach || 60;
  ctx.save();
  ctx.globalAlpha = 0.12 * pulse;
  ctx.strokeStyle = "#ffd861";
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 8]);
  ctx.beginPath();
  ctx.arc(player.x, player.y, reach * 0.8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// Elemental attack overlays: frost crystals, electric arcs, poison drips
function drawElementalOverlay(x, y, element, progress) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  if (element === "frost") {
    // Ice crystal shards
    ctx.strokeStyle = "rgba(125,229,255,0.7)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * 2 * i) / 6 + progress * 2;
      const r1 = 10 + progress * 20;
      const r2 = r1 + 8;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1);
      ctx.lineTo(x + Math.cos(a) * r2, y + Math.sin(a) * r2);
      ctx.stroke();
    }
  } else if (element === "electric") {
    // Jagged lightning bolts
    ctx.strokeStyle = "rgba(120,200,255,0.8)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const a = (Math.PI * 2 * i) / 4 + progress * 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      let px = x, py = y;
      for (let j = 0; j < 4; j++) {
        const step = 8;
        px += Math.cos(a) * step + rand(-4, 4);
        py += Math.sin(a) * step + rand(-4, 4);
        ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  } else if (element === "poison") {
    // Dripping toxic bubbles
    ctx.fillStyle = "rgba(100,220,60,0.5)";
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI * 2 * i) / 5;
      const r = 15 + progress * 15;
      const bx = x + Math.cos(a) * r;
      const by = y + Math.sin(a) * r + progress * 10;
      ctx.beginPath();
      ctx.arc(bx, by, 3 + progress * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

// Shockwave ring: expanding ring on AoE hits
const combatRings = [];
function spawnCombatRing(x, y, color, maxR, ttl) {
  combatRings.push({ x, y, color, r: 5, maxR: maxR || 80, ttl: ttl || 0.4, maxTtl: ttl || 0.4 });
}
function updateCombatRings(dt) {
  for (const r of combatRings) {
    r.ttl -= dt;
    r.r += (r.maxR - r.r) * 6 * dt;
  }
  for (let i = combatRings.length - 1; i >= 0; i--) {
    if (combatRings[i].ttl <= 0) combatRings.splice(i, 1);
  }
}
function drawCombatRings() {
  for (const r of combatRings) {
    const alpha = clamp(r.ttl / r.maxTtl, 0, 1);
    ctx.save();
    ctx.globalAlpha = alpha * 0.7;
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = r.color;
    ctx.lineWidth = 4 * alpha;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

// Boss phase transition flash
let bossFlashTimer = 0;
function triggerBossFlash(duration) {
  bossFlashTimer = duration || 0.6;
}
function updateBossFlash(dt) {
  if (bossFlashTimer > 0) bossFlashTimer -= dt;
}
function drawBossFlash() {
  if (bossFlashTimer <= 0) return;
  const alpha = clamp(bossFlashTimer / 0.6, 0, 1);
  ctx.save();
  ctx.globalAlpha = alpha * 0.4;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(state.camera.x, state.camera.y, W, H);
  ctx.restore();
}

// Pickup magnet beam: line from pickup to player when magnetized
function drawMagnetBeam(pickup) {
  if (pickup.beamAlpha == null) return;
  ctx.save();
  ctx.globalAlpha = pickup.beamAlpha;
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "#ffd861";
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(pickup.x, pickup.y);
  ctx.lineTo(player.x, player.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}


// ===== Sprite Effect System =====
const spriteEffects = [];

function spawnSpriteEffect(x, y, sheetKey, frameCount, frameDuration, size, angle, opts) {
  if (!imgs[sheetKey]) return;
  spriteEffects.push({
    x: x, y: y,
    sheet: sheetKey,
    frame: 0,
    frameCount: frameCount || 4,
    frameDuration: frameDuration || 0.06,
    timer: 0,
    size: size || 80,
    angle: angle || 0,
    glowColor: (opts && opts.glowColor) || null,
    blend: (opts && opts.blend) || null,
    done: false,
  });
}

function updateSpriteEffects(dt) {
  for (const e of spriteEffects) {
    e.timer += dt;
    if (e.timer >= e.frameDuration) {
      e.timer = 0;
      e.frame++;
      if (e.frame >= e.frameCount) e.done = true;
    }
  }
  for (let i = spriteEffects.length - 1; i >= 0; i--) {
    if (spriteEffects[i].done) spriteEffects.splice(i, 1);
  }
}

function drawSpriteEffects() {
  for (const e of spriteEffects) {
    const img = imgs[e.sheet];
    if (!img || !img.width) continue;
    const frameW = img.width / e.frameCount;
    const sx = e.frame * frameW;
    const progress = e.frame / e.frameCount;
    // Scale up slightly during animation, fade out at end
    const scale = 0.7 + progress * 0.5;
    const alpha = e.fade != null ? e.fade * (1 - progress * 0.4) : 1 - progress * 0.35;
    const drawSize = e.size * scale;
    ctx.save();
    ctx.translate(e.x, e.y);
    if (e.angle) ctx.rotate(e.angle);
    ctx.globalAlpha = clamp(alpha, 0, 1);
    ctx.globalCompositeOperation = e.blend || "lighter";
    ctx.shadowBlur = 14;
    ctx.shadowColor = e.glowColor || "rgba(255,255,255,0.6)";
    ctx.drawImage(img, sx, 0, frameW, img.height, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

function triggerHitSpark(x, y) {
  spawnSpriteEffect(x, y, "fxHitSpark", 4, 0.05, 64);
  hitEffect(x, y, "#ffd861", 6);
}

function triggerExplosion(x, y, size) {
  spawnSpriteEffect(x, y, "fxExplosion", 4, 0.07, size || 96);
  addShake(5);
  spawnParticles(x, y, 12, {
    color: "#ff8800", speedMin: 80, speedMax: 250,
    rMin: 2, rMax: 5, ttlMin: 0.2, ttlMax: 0.5, glow: true, friction: 0.88,
  });
}

function selectTheme(id) {
  if (!themeConfigs[id]) return;
  save.currentTheme = id;
  saveGame();
  showPortalMenu();
  toast(`已切换主题：${currentTheme().name}`);
}

function loadImages() {
  return Promise.all(
    Object.entries(imagePaths).map(
      ([key, src]) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            imgs[key] = img;
            resolve();
          };
          img.onerror = () => {
            console.warn(`Missing image: ${src}`);
            resolve();
          };
          img.src = src;
        }),
    ),
  ).then(() => {
    assetsReady = true;
    recomputePlayerStats();
    updateHud();
    draw();
  });
}

function getEquip(id) {
  return equipments.find((item) => item.id === id);
}

function recomputePlayerStats() {
  const armor = getEquip(save.equipped.armor);
  const helmet = getEquip(save.equipped.helmet);
  player.maxHp = 100 + (armor?.hp || 0);
  player.hp = Math.min(player.hp || player.maxHp, player.maxHp);
  player.shield = Math.max(player.shield || 0, helmet?.shield || 0);
}

function currentStats() {
  const weapon = getEquip(save.equipped.weapon);
  const armor = getEquip(save.equipped.armor);
  const helmet = getEquip(save.equipped.helmet);
  const boots = getEquip(save.equipped.boots);
  const damageBoost = player.buffs.damageBoost ? 1.5 : 1;
  return {
    weapon,
    damage: Math.round(((weapon?.damage || 16) + (player.buffs.power ? 8 : 0)) * damageBoost),
    cooldown: Math.max(0.14, (weapon?.cooldown || 0.45) - (boots?.cooldownBoost || 0) - (player.buffs.cooldown ? 0.11 : 0)),
    reach: (weapon?.reach || 84) + (armor?.areaBonus || 0),
    defense: armor?.defense || 0,
    speed: 190 + (boots?.speed || 0) + (player.buffs.speed ? 64 : 0),
    pickup: 44 + (armor?.pickup || 0) + (boots?.pickup || 0) + (player.buffs.magnet ? 110 : 0),
    trapResist: helmet?.trapResist || 0,
    reflect: (armor?.reflect || 0) + (player.buffs.reflect ? 24 : 0),
    lifesteal: armor?.lifesteal || 0,
  };
}

function startNew() {
  save = defaultSave();
  player.hp = 118;
  player.shield = 10;
  saveGame();
  enterHub("欢迎来到废品轮回 Scrap Loop。靠近传送门按 Enter 选择主题和模式。");
}

function continueGame() {
  enterHub("存档已载入。传送门可选择小怪清理或 Boss 模式。");
}

function resetRuntimeLists() {
  state.enemies = [];
  state.pickups = [];
  state.traps = [];
  state.attacks = [];
  state.projectiles = [];
  state.enemyShots = [];
  state.shockwaves = [];
  state.bossDamageFloaters = [];
  state.skillEffects = [];
  state.camera = { x: 0, y: 0 };
  state.world = { w: W, h: H };
  state.buffTimer = 0;
  state.boss = null;
  state.battlePortal = null;
  state.hordeTime = 0;
  state.hordeKills = 0;
  state.hordeSpawnTimer = 0;
  state.puzzle = null;
}

function enterHub(message) {
  titleScreen.classList.add("hidden");
  closeModal();
  state.scene = "hub";
  state.paused = false;
  state.wave = Math.max(1, save.stats.bestWave || 1);
  resetRuntimeLists();
  state.obstacles = hubFacilities.map((f) => facilityRect(f));
  player.x = safeHubSpawnPoints[0].x;
  player.y = safeHubSpawnPoints[0].y;
  snapToSafeHubPoint();
  player.dir = "down";
  player.faceX = 1;
  player.faceY = 0;
  recomputePlayerStats();
  toast(message || "回到主页。");
  saveGame();
  if ((save.stats.defeated || 0) < 3) setTimeout(showCoach, 800);
}

function snapToSafeHubPoint() {
  const current = { x: player.x, y: player.y };
  const candidates = safeHubSpawnPoints
    .map((point) => ({ ...point, score: distance(point, current) }))
    .sort((a, b) => a.score - b.score);
  const safe = candidates.find((point) => isPlayerPointSafe(point)) || candidates[0];
  player.x = safe.x;
  player.y = safe.y;
}

function isPlayerPointSafe(point) {
  const rect = entityRect({ ...player, x: point.x, y: point.y });
  return !state.obstacles.some((o) => rectsOverlap(rect, o));
}

function showPortalMenu() {
  const theme = currentTheme();
  const themeCards = Object.values(themeConfigs)
    .map((t) => `
      <button class="theme-option ${save.currentTheme === t.id ? "active" : ""}" data-action="selectTheme" data-id="${t.id}">
        <img src="${imagePaths[t.preview]}" alt="" />
        <span>${t.name}</span>
      </button>`)
    .join("");
  showModal(
    `
    <div class="modal-header">
      <div>
        <h2>传送门模式选择</h2>
        <p>当前主题：${theme.name}。先选择废物主题，再进入小怪、尸潮、解密或 Boss。</p>
      </div>
      <button class="quiet" data-action="close">关闭 Esc</button>
    </div>
    <h3>废物主题</h3>
    <div class="theme-picker">${themeCards}</div>
    <h3>玩法模式</h3>
    <div class="modal-grid">
      <article class="card good">
        <div class="card-title"><img src="${imagePaths[theme.preview]}" alt="" /><span>${theme.short}小怪清理</span></div>
        <p>击败当前主题污染体，获得对应废物碎片，用于收藏品合成、展馆收集和升级循环。</p>
        <button class="primary" data-action="startMob">进入小怪模式</button>
      </article>
      <article class="card warn">
        <div class="card-title"><img src="${imagePaths.bossCat}" alt="" /><span>Boss：蓝猫回收守卫</span></div>
        <p>参考 3D 打印纪念品设计的 Boss。击败后获得“打印碎片”，可兑换 3D 废物打印实物券。</p>
        <button class="primary" data-action="startBoss">挑战 Boss</button>
      </article>
      <article class="card warn">
        <div class="card-title"><img src="${imagePaths.enemyGuard}" alt="" /><span>尸潮防守</span></div>
        <p>连续防守 60 秒，敌人会分批涌入。场地 buff 定时刷新，适合测试追踪弹、挥砍和范围武器。</p>
        <button class="primary" data-action="startHorde">进入尸潮</button>
      </article>
      <article class="card good">
        <div class="card-title"><img src="${imagePaths.facilityRecycler}" alt="" /><span>解密回收站</span></div>
        <p>玩法：先捡地上的目标样本，再找发光设备按 Enter 投放。顺序错会扣血，完成可获得材料奖励。</p>
        <button class="primary" data-action="startPuzzle">进入解密</button>
      </article>
    </div>
    <div class="modal-footer">快捷键：Enter 靠近传送门打开，Esc 返回主页。</div>
  `,
    "bgMarket",
  );
}


function showStory() {
  const acts = [
    { key: "序章", label: "序章·基地引导", color: "#2fe0dc" },
    { key: "第一幕·电子废料", label: "第一幕·电子废料", color: "#ffd861" },
    { key: "第二幕·塑料废料", label: "第二幕·塑料废料", color: "#46d57a" },
    { key: "第三幕·纸板纸类", label: "第三幕·纸板纸类", color: "#d4a76a" },
    { key: "第四幕·布料纺织", label: "第四幕·布料纺织", color: "#e87aa0" },
    { key: "尾声", label: "尾声·循环再生", color: "#c8b8ff" },
  ];
  const sections = acts.map((act) => {
    const sceneList = dialogueScenes.map((scene, index) => ({ scene, index })).filter((item) => item.scene[0] === act.key);
    if (!sceneList.length) return "";
    const cards = sceneList.map((item) => {
      const preview = (item.scene[3] || "").slice(0, 40);
      return `<button class="story-entry" data-action="startDialogue" data-id="${item.index}"><img src="${imagePaths[storyPortraitFor(item.scene)]}" alt="" /><span><b>${String(item.index + 1).padStart(2, "0")} ${item.scene[2]}</b><small>${preview}...</small></span></button>`;
    }).join("");
    return `<div class="story-section"><h3 style="color:${act.color};border-bottom:2px solid ${act.color};padding-bottom:4px;margin:12px 0 6px;">${act.label}</h3><div class="story-list">${cards}</div></div>`;
  }).join("");
  showModal(`
    <div class="modal-header">
      <div>
        <h2>剧情导览</h2>
        <p>五幕主线剧情：序章 → 电子 → 塑料 → 纸板 → 布料 → 尾声。点击任意一段进入立绘对话，按 Enter 推进，按 Esc 关闭。</p>
      </div>
      <button class="quiet" data-action="close">关闭 Esc</button>
    </div>
    <div class="story-actions">
      <button class="game-button primary" data-action="startDialogue" data-id="0">从序章开始</button>
      <button class="game-button" data-action="showQuiz">知识问答</button>
    </div>
    ${sections}
    <div class="modal-footer">提示：对话中按 Enter 推进到下一句，答对问答可获得碎片奖励。</div>
  `, "bgHub");
}

function startBattle() {
  closeModal();
  const theme = currentTheme();
  state.scene = "battle";
  state.mapId = randomBattleMap(theme.id).id;
  resetRuntimeLists();
  state.scene = "battle";
  state.mapId = randomBattleMap(theme.id).id;
  setWorld(3200, 2400);
  state.buffTimer = 2.2;
  state.traps = createTraps();
  state.obstacles = createBattleObstacles();
  player.x = 250;
  player.y = 560;
  player.hp = Math.max(player.hp, Math.floor(player.maxHp * 0.75));
  player.shield = Math.max(player.shield, (getEquip(save.equipped.helmet)?.shield || 0) + 12);
  player.hurtCd = 1.2;
  spawnWave();
  toast(`第 ${state.wave} 波：${theme.name}污染体会掉落主题碎片。`);
}

function startBoss() {
  closeModal();
  state.scene = "boss";
  resetRuntimeLists();
  state.scene = "boss";
  state.buffTimer = 2.6;
  state.mapId = "market_lane";
  setWorld(1780, 1120);
  state.obstacles = [
    { x: 160, y: 132, w: 138, h: 84 },
    { x: 1480, y: 150, w: 150, h: 84 },
    { x: 180, y: 914, w: 150, h: 70 },
    { x: 1460, y: 900, w: 160, h: 72 },
  ];
  player.x = 260;
  player.y = 560;
  player.hp = Math.max(player.hp, Math.floor(player.maxHp * 0.9));
  player.shield = Math.max(player.shield, (getEquip(save.equipped.helmet)?.shield || 0) + 20);
  player.hurtCd = 1.4;
  const bossMaxHp = 480 + save.stats.bossDefeated * 45;
  state.boss = {
    name: "蓝猫回收守卫",
    x: 1150,
    y: 548,
    w: 250,
    h: 260,
    hp: bossMaxHp,
    maxHp: bossMaxHp,
    phase: 1,
    shotTimer: 0.8,
    ringTimer: 2.5,
    summonTimer: 5,
    hitCd: 0,
    defeated: false,
  };
  toast("Boss 模式：击败蓝猫回收守卫，获得 3D 打印兑换碎片。");
}

function startHorde() {
  closeModal();
  const theme = currentTheme();
  state.scene = "horde";
  resetRuntimeLists();
  state.scene = "horde";
  state.mapId = randomBattleMap(theme.id).id;
  setWorld(1780, 1120);
  state.buffTimer = 1.8;
  state.hordeTime = 60;
  state.hordeKills = 0;
  state.hordeSpawnTimer = 0.2;
  state.traps = createTraps();
  state.obstacles = createBattleObstacles();
  player.x = 250;
  player.y = 560;
  player.hp = Math.max(player.hp, Math.floor(player.maxHp * 0.85));
  player.shield = Math.max(player.shield, (getEquip(save.equipped.helmet)?.shield || 0) + 16);
  player.hurtCd = 1.2;
  spawnHordePack(3);
  toast(`${theme.name}尸潮：坚持 60 秒，buff 会在场地内刷新。`);
}

function startPuzzle() {
  closeModal();
  const theme = currentTheme();
  state.scene = "puzzle";
  resetRuntimeLists();
  state.scene = "puzzle";
  state.mapId = randomBattleMap(theme.id).id;
  setWorld(2800, 2000);
  state.obstacles = [
    { x: 244, y: 180, w: 122, h: 74 },
    { x: 1330, y: 180, w: 132, h: 76 },
    { x: 252, y: 828, w: 132, h: 70 },
    { x: 1320, y: 816, w: 146, h: 72 },
  ];
  state.puzzle = {
    order: theme.puzzle,
    step: 0,
    held: {},
    stations: [
      { id: theme.puzzle[0], name: `${resourceName(theme.puzzle[0])}预处理台`, x: 430, y: 290, img: "facilityRecycler" },
      { id: theme.puzzle[1], name: `${resourceName(theme.puzzle[1])}分选机`, x: 1230, y: 290, img: "itemMagnet" },
      { id: theme.puzzle[2], name: `${resourceName(theme.puzzle[2])}检测台`, x: 430, y: 760, img: "facilityTerminal" },
      { id: theme.puzzle[3], name: `${resourceName(theme.puzzle[3])}封存箱`, x: 1230, y: 760, img: "facilityLocker" },
    ],
  };
  player.x = 830;
  player.y = 520;
  spawnPuzzleItems();
  toast(`${theme.name}解密：按底部提示收集材料，再靠近发光设备按 Enter 投放。`);
}

function spawnHordePack(count) {
  const deck = currentEnemyDeck();
  for (let i = 0; i < count; i += 1) {
    const def = deck[Math.floor(Math.random() * deck.length)];
    const edge = Math.floor(Math.random() * 4);
    const ranges = [
      { minX: 80, maxX: 220, minY: 120, maxY: state.world.h - 120 },
      { minX: state.world.w - 220, maxX: state.world.w - 80, minY: 120, maxY: state.world.h - 120 },
      { minX: 260, maxX: state.world.w - 260, minY: 110, maxY: 190 },
      { minX: 260, maxX: state.world.w - 260, minY: state.world.h - 190, maxY: state.world.h - 110 },
    ][edge];
    const pos = randomOpenPoint(ranges.minX, ranges.maxX, ranges.minY, ranges.maxY, 68, 64);
    const scale = 1 + Math.max(0, 60 - state.hordeTime) * 0.008;
    state.enemies.push({
      ...def,
      id: `horde-${Date.now()}-${i}`,
      x: pos.x,
      y: pos.y,
      w: def.img === "enemyGuard" ? 76 : 70,
      h: def.img === "enemyGuard" ? 78 : 70,
      maxHp: Math.floor(def.hp * scale),
      hp: Math.floor(def.hp * scale),
      speed: def.speed + Math.max(0, 60 - state.hordeTime) * 0.45,
      hitCd: 0,
    });
  }
}

function spawnPuzzleItems() {
  const theme = currentTheme();
  const ids = [...theme.puzzle, ...theme.drops, "token"];
  for (let i = 0; i < 16; i += 1) {
    const id = ids[i % ids.length];
    const point = randomOpenPoint(260, state.world.w - 260, 160, state.world.h - 160, 40, 40);
    spawnPickup(point.x, point.y, "puzzle", id);
  }
}

function spawnWave() {
  const deck = currentEnemyDeck();
  const count = Math.min(2 + Math.floor(state.wave * 1.1), 8);
  for (let i = 0; i < count; i += 1) {
    const def = deck[(i + state.wave) % deck.length];
    const pos = randomOpenPoint(520, state.world.w - 160, 140, state.world.h - 150, 76, 56);
    spawnWarning(pos.x, pos.y, 0.6);
    state.enemies.push({
      ...def,
      id: `${Date.now()}-${i}`,
      x: pos.x,
      y: pos.y,
      w: def.img === "enemyGuard" ? 76 : 70,
      h: def.img === "enemyGuard" ? 78 : 70,
      maxHp: Math.floor(def.hp + state.wave * 8),
      hp: Math.floor(def.hp + state.wave * 8),
      hitCd: 0,
    });
  }
}

function createBattleObstacles() {
  const theme = save.currentTheme || "electronic";
  const w = state.world.w;
  const h = state.world.h;
  const obs = [];
  // Generate theme-flavored obstacle clusters spread across the large map
  const clusters = [
    { cx: w * 0.15, cy: h * 0.2, n: 2 },
    { cx: w * 0.5, cy: h * 0.15, n: 3 },
    { cx: w * 0.8, cy: h * 0.25, n: 2 },
    { cx: w * 0.2, cy: h * 0.7, n: 2 },
    { cx: w * 0.55, cy: h * 0.75, n: 3 },
    { cx: w * 0.82, cy: h * 0.65, n: 2 },
    { cx: w * 0.35, cy: h * 0.45, n: 1 },
    { cx: w * 0.7, cy: h * 0.45, n: 1 },
  ];
  for (const c of clusters) {
    for (let i = 0; i < c.n; i++) {
      obs.push({
        x: c.cx + rand(-80, 80),
        y: c.cy + rand(-60, 60),
        w: 80 + Math.floor(Math.random() * 80),
        h: 60 + Math.floor(Math.random() * 40),
        theme: theme,
      });
    }
  }
  return obs;
}

function createTraps() {
  return [
    { kind: "spikes", img: "trapSpikes", x: 650, y: 560, w: 82, h: 58, damage: 12, cd: 0 },
    { kind: "saw", img: "trapSaw", x: 1082, y: 522, w: 82, h: 70, damage: 14, cd: 0 },
    { kind: "vent", img: "trapVent", x: 860, y: 322, w: 72, h: 72, damage: 9, cd: 0 },
    { kind: "spikes", img: "trapSpikes", x: 1370, y: 760, w: 82, h: 58, damage: 12, cd: 0 },
  ];
}

function facilityRect(f) {
  return { x: f.x - f.w / 2, y: f.y - f.h / 2 + f.h * 0.28, w: f.w, h: f.h * 0.62 };
}

function randomOpenPoint(minX, maxX, minY, maxY, w, h) {
  for (let i = 0; i < 120; i += 1) {
    const point = { x: rand(minX, maxX), y: rand(minY, maxY) };
    const rect = entityRect({ ...point, w, h });
    if (!state.obstacles.some((o) => rectsOverlap(rect, o)) && distance(point, player) > 240) return point;
  }
  return { x: rand(minX, maxX), y: rand(minY, maxY) };
}

function update(dt) {
  if (!assetsReady || state.scene === "title" || state.paused) return;
  updateTimers(dt);
  movePlayer(dt);
  if (state.scene === "hub") updateHub();
  if (state.scene === "battle") updateBattle(dt);
  if (state.scene === "boss") updateBoss(dt);
  if (state.scene === "horde") updateHorde(dt);
  if (state.scene === "puzzle") updatePuzzle(dt);
  updateSkillAutoFire(dt);
  updateCamera();
  updateProjectiles(dt);
  updateHud();
}

function updateTimers(dt) {
  player.attackCd = Math.max(0, player.attackCd - dt);
  player.skillCd = Math.max(0, player.skillCd - dt);
  player.hurtCd = Math.max(0, player.hurtCd - dt);
  player.frame += dt;
  for (const key of Object.keys(player.buffs)) {
    player.buffs[key] -= dt;
    if (player.buffs[key] <= 0) delete player.buffs[key];
  }
  for (const a of state.attacks) a.ttl -= dt;
  state.attacks = state.attacks.filter((a) => a.ttl > 0);
  for (const effect of state.skillEffects) effect.ttl -= dt;
  state.skillEffects = state.skillEffects.filter((effect) => effect.ttl > 0);
  updateParticles(dt);
  updateDamageNumbers(dt);
  updateShake(dt);
  updateDashTrail(dt);
  updateSpriteEffects(dt);
  updateAttackTrails(dt);
  updateHitStop(dt);
  updateSpawnWarnings(dt);
  updateTrapTelegraphs(dt);
  updateCombatRings(dt);
  updateBossFlash(dt);
  for (const floater of state.bossDamageFloaters) {
    floater.y -= 28 * dt;
    floater.ttl -= dt;
  }
  state.bossDamageFloaters = state.bossDamageFloaters.filter((f) => f.ttl > 0);
  state.toastTimer -= dt;
  if (state.toastTimer <= 0) toastEl.classList.add("hidden");
}

function movementVector() {
  let dx = 0;
  let dy = 0;
  if (state.keys.has("arrowleft") || state.keys.has("a") || state.pad.has("left")) dx -= 1;
  if (state.keys.has("arrowright") || state.keys.has("d") || state.pad.has("right")) dx += 1;
  if (state.keys.has("arrowup") || state.keys.has("w") || state.pad.has("up")) dy -= 1;
  if (state.keys.has("arrowdown") || state.keys.has("s") || state.pad.has("down")) dy += 1;
  if (dx || dy) {
    const len = Math.hypot(dx, dy);
    dx /= len;
    dy /= len;
    player.faceX = dx;
    player.faceY = dy;
    if (dx && dy) player.dir = dy < 0 ? (dx > 0 ? "up-right" : "up-left") : dx > 0 ? "down-right" : "down-left";
    else player.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
  }
  return { dx, dy };
}

function movePlayer(dt) {
  const { dx, dy } = movementVector();
  if (!dx && !dy) return;
  const stats = currentStats();
  moveEntity(player, dx * stats.speed * dt, dy * stats.speed * dt, state.obstacles);
  const world = cameraScene() ? state.world : { w: W, h: H };
  player.x = clamp(player.x, 38, world.w - 38);
  player.y = clamp(player.y, 74, world.h - 40);
}

function moveEntity(entity, dx, dy, obstacles) {
  entity.x += dx;
  let rect = entityRect(entity);
  if (obstacles.some((o) => rectsOverlap(rect, o))) entity.x -= dx;
  entity.y += dy;
  rect = entityRect(entity);
  if (obstacles.some((o) => rectsOverlap(rect, o))) entity.y -= dy;
}

function updateHub() {
  state.nearby = null;
  for (const f of hubFacilities) {
    if (distance(player, f) < 112) {
      state.nearby = f;
      break;
    }
  }
  state.prompt = state.nearby
    ? `${state.nearby.name}：${state.nearby.hint}`
    : "WASD 移动 · Enter 互动 · E 装备 · C 合成 · X 兑换 · B 背景 · M 任务";
}

function updateBattle(dt) {
  updateTraps(dt);
  updateBuffSpawner(dt);
  for (const enemy of state.enemies) {
    enemy.hitCd = Math.max(0, enemy.hitCd - dt);
    enemy.bindTimer = Math.max(0, (enemy.bindTimer || 0) - dt);
    if (enemy.knockbackX || enemy.knockbackY) {
      moveEntity(enemy, enemy.knockbackX * dt, enemy.knockbackY * dt, state.obstacles);
      enemy.knockbackX *= 0.8;
      enemy.knockbackY *= 0.8;
      if (Math.abs(enemy.knockbackX) < 1) enemy.knockbackX = 0;
      if (Math.abs(enemy.knockbackY) < 1) enemy.knockbackY = 0;
    }
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = enemy.speed * enemySpeedFactor(enemy);
    moveEntity(enemy, (dx / len) * speed * dt, (dy / len) * speed * dt, state.obstacles);
    if (rectsOverlap(entityRect(player), entityRect(enemy)) && enemy.hitCd <= 0) {
      hurtPlayer(enemy.damage, `${enemy.name} 撞击了你。`);
      enemy.hitCd = 0.85;
    }
  }
  collectPickups();
  state.enemies = state.enemies.filter((enemy) => {
    if (enemy.hp > 0) return true;
    deathBurst(enemy.x, enemy.y, "#f0525f");
    triggerExplosion(enemy.x, enemy.y, 80);
    spawnCombatRing(enemy.x, enemy.y, "#f0525f", 60, 0.4);
    addShake(3);
    dropLoot(enemy);
    save.stats.defeated += 1;
    return false;
  });
  if (!state.enemies.length && !state.battlePortal) {
    state.battlePortal = { x: Math.min(state.world.w - 100, player.x + 200), y: Math.min(state.world.h - 100, player.y - 100), r: 64, mode: "home" };
    save.stats.bestWave = Math.max(save.stats.bestWave, state.wave);
    saveGame();
    toast("小怪清理完成！跟随黄色箭头找到传送门，Enter 回主页，N 继续下一波。");
  }
  state.prompt =
    state.battlePortal && distance(player, state.battlePortal) < 90
      ? "传送门：Enter 回主页并保存 · N 继续下一波"
    : `小怪模式：Space/点击攻击 · 剩余 ${state.enemies.length} 个 · Esc 回主页`;
}

function updateHorde(dt) {
  updateTraps(dt);
  updateBuffSpawner(dt);
  state.hordeTime = Math.max(0, state.hordeTime - dt);
  state.hordeSpawnTimer -= dt;
  if (state.hordeSpawnTimer <= 0 && !state.battlePortal) {
    const intensity = 2 + Math.floor((60 - state.hordeTime) / 14);
    spawnHordePack(intensity);
    state.hordeSpawnTimer = Math.max(1.05, 2.8 - (60 - state.hordeTime) * 0.025);
  }
  for (const enemy of state.enemies) {
    enemy.hitCd = Math.max(0, enemy.hitCd - dt);
    enemy.bindTimer = Math.max(0, (enemy.bindTimer || 0) - dt);
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = enemy.speed * enemySpeedFactor(enemy);
    moveEntity(enemy, (dx / len) * speed * dt, (dy / len) * speed * dt, state.obstacles);
    if (rectsOverlap(entityRect(player), entityRect(enemy)) && enemy.hitCd <= 0) {
      hurtPlayer(enemy.damage, `${enemy.name} 冲撞了你。`);
      enemy.hitCd = 0.8;
    }
  }
  collectPickups();
  state.enemies = state.enemies.filter((enemy) => {
    if (enemy.hp > 0) return true;
    dropLoot(enemy);
    state.hordeKills += 1;
    save.stats.defeated += 1;
    return false;
  });
  if ((state.hordeTime <= 0 || state.hordeKills >= 36) && !state.battlePortal) {
    addReward({ token: 2, metal: 4, plastic: 4 });
    save.stats.bestWave = Math.max(save.stats.bestWave, state.wave);
    state.battlePortal = { x: Math.min(state.world.w - 100, player.x + 200), y: Math.min(state.world.h - 100, player.y - 100), r: 64, mode: "home" };
    saveGame();
    toast("尸潮防守完成：获得回收章和基础材料奖励。");
  }
  state.prompt =
    state.battlePortal && distance(player, state.battlePortal) < 90
      ? "尸潮完成：Enter 回主页 · N 再来一轮"
      : `尸潮防守：剩余 ${Math.ceil(state.hordeTime)}s · 击败 ${state.hordeKills}/36 · Space 攻击 · 场地刷新 buff`;
}

function updatePuzzle() {
  collectPickups();
  const puzzle = state.puzzle;
  if (!puzzle) return;
  puzzle.nearby = puzzle.stations.find((station) => distance(player, station) < 86) || null;
  const next = puzzle.order[puzzle.step];
  const nextName = resourceName(next);
  state.prompt = puzzle.nearby
    ? `${puzzle.nearby.name}：Enter 投放 · 当前目标 ${nextName} · 已携带 ${puzzle.held[next] || 0}`
    : `解密回收：目标 ${puzzle.step + 1}/${puzzle.order.length} ${nextName} · 收集材料并按顺序投放`;
}

function updateBoss(dt) {
  const boss = state.boss;
  if (!boss) return;
  boss.hitCd = Math.max(0, boss.hitCd - dt);
  updateBuffSpawner(dt);
  if (boss.hp <= boss.maxHp * 0.62) boss.phase = 2;
  if (boss.hp <= boss.maxHp * 0.32) boss.phase = 3;

  boss.x += Math.sin(performance.now() / 900) * dt * 30;
  boss.shotTimer -= dt;
  boss.ringTimer -= dt;
  boss.summonTimer -= dt;
  if (boss.shotTimer <= 0) {
    fireBossBurst(boss, boss.phase >= 3 ? 12 : boss.phase >= 2 ? 9 : 6);
    boss.shotTimer = boss.phase >= 3 ? 1.1 : boss.phase >= 2 ? 1.45 : 1.9;
  }
  if (boss.ringTimer <= 0) {
    state.shockwaves.push({ x: boss.x, y: boss.y + 70, r: 18, speed: 230, ttl: 2.2, damage: boss.phase >= 2 ? 15 : 11, hit: false });
    boss.ringTimer = boss.phase >= 3 ? 2.4 : 3.2;
  }
  if (boss.summonTimer <= 0 && boss.phase >= 2 && state.enemies.length < 3) {
    const deck = currentEnemyDeck();
    const def = deck[Math.floor(Math.random() * Math.min(3, deck.length))];
    const pos = randomOpenPoint(260, 1060, 130, 600, 64, 64);
    state.enemies.push({ ...def, id: `boss-add-${Date.now()}`, x: pos.x, y: pos.y, w: 64, h: 64, hp: 42, maxHp: 42, hitCd: 0 });
    boss.summonTimer = 6;
  }

  for (const enemy of state.enemies) {
    enemy.hitCd = Math.max(0, enemy.hitCd - dt);
    enemy.bindTimer = Math.max(0, (enemy.bindTimer || 0) - dt);
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = enemy.speed * enemySpeedFactor(enemy);
    moveEntity(enemy, (dx / len) * speed * dt, (dy / len) * speed * dt, state.obstacles);
    if (rectsOverlap(entityRect(player), entityRect(enemy)) && enemy.hitCd <= 0) {
      hurtPlayer(enemy.damage, `${enemy.name} 干扰了你。`);
      enemy.hitCd = 0.9;
    }
  }
  state.enemies = state.enemies.filter((enemy) => {
    if (enemy.hp > 0) return true;
    dropLoot(enemy);
    save.stats.defeated += 1;
    return false;
  });

  updateEnemyShots(dt);
  updateShockwaves(dt);
  collectPickups();

  if (boss.hp <= 0 && !boss.defeated) {
    boss.defeated = true;
    const reward = 5 + boss.phase;
    save.printShard += reward;
    save.stats.bossDefeated += 1;
    if (!save.unlockedBackgrounds.includes("boss")) save.unlockedBackgrounds.push("boss");
    state.battlePortal = { x: Math.min(state.world.w - 100, player.x + 200), y: Math.min(state.world.h - 100, player.y - 100), r: 64, mode: "home" };
    saveGame();
    toast(`蓝猫回收守卫已净化！获得打印碎片 ×${reward}，已解锁 Boss 背景。`);
  }

  state.prompt =
    state.battlePortal && distance(player, state.battlePortal) < 90
      ? "Boss 已净化：Enter 回主页 · X 可兑换 3D 打印实物券"
      : "Boss 模式：躲避弹幕与震荡波，使用追踪弹或挥砍更有效";
}

function updateTraps(dt) {
  for (const trap of state.traps) {
    trap.cd = Math.max(0, trap.cd - dt);
    if (rectsOverlap(entityRect(player), trapRect(trap)) && trap.cd <= 0) {
      const stats = currentStats();
      hurtPlayer(Math.max(2, Math.round(trap.damage * (1 - stats.trapResist))), "险陷已触发，注意地面标识。");
      trap.cd = 0.9;
      spawnParticles(trap.x, trap.y, 12, {
        color: "#f0525f", speedMin: 60, speedMax: 200,
        rMin: 2, rMax: 5, ttlMin: 0.2, ttlMax: 0.5, glow: true, friction: 0.88,
      });
      spawnParticles(trap.x, trap.y, 6, {
        color: "#ffd861", speedMin: 40, speedMax: 120,
        rMin: 3, rMax: 6, ttlMin: 0.3, ttlMax: 0.6, gravity: 150, friction: 0.92,
      });
      addShake(4);
      spawnCombatRing(trap.x, trap.y, "#ff4444", 70, 0.35);
      triggerHitStop(0.03);
    }
    // Telegraph before trap reactivates
    if (trap.cd > 0 && trap.cd < 0.5 && !trap._telegraphed) {
      trap._telegraphed = true;
      spawnTrapTelegraph(trap.x, trap.y, trap.w, trap.h, 0.45);
    }
    if (trap.cd <= 0) trap._telegraphed = false;
    if (trap.cd < 0.15 && trap.cd > 0 && Math.random() < 0.3) {
      spawnParticles(trap.x + rand(-trap.w/3, trap.w/3), trap.y + rand(-trap.h/3, trap.h/3), 1, {
        color: "rgba(240,82,95,0.6)", speedMin: 10, speedMax: 30,
        rMin: 1, rMax: 2, ttlMin: 0.1, ttlMax: 0.2, friction: 0.9,
      });
    }
  }
}

function enemySpeedFactor(enemy) {
  if (player.buffs.freeze) return 0;
  let factor = player.buffs.slow ? 0.45 : 1;
  if (enemy.bindTimer > 0) factor *= 0.25;
  return factor;
}

function fireBossBurst(boss, count) {
  spawnParticles(boss.x, boss.y + 18, 12, {
    color: "#33f1ff", speedMin: 60, speedMax: 200,
    rMin: 2, rMax: 5, ttlMin: 0.2, ttlMax: 0.4, glow: true, friction: 0.88,
  });
  addShake(5);
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + performance.now() / 1000;
    state.enemyShots.push({
      x: boss.x,
      y: boss.y + 18,
      vx: Math.cos(angle) * 150,
      vy: Math.sin(angle) * 150,
      r: 9,
      damage: boss.phase >= 3 ? 13 : 10,
      ttl: 4.2,
    });
  }
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const len = Math.hypot(dx, dy) || 1;
  state.enemyShots.push({ x: boss.x, y: boss.y + 16, vx: (dx / len) * 230, vy: (dy / len) * 230, r: 12, damage: 16, ttl: 3.3 });
}

function updateEnemyShots(dt) {
  const speedFactor = player.buffs.freeze ? 0 : player.buffs.slow ? 0.5 : 1;
  const world = state.world || { w: W, h: H };
  state.enemyShots = state.enemyShots.filter((shot) => {
    shot.x += shot.vx * dt * speedFactor;
    shot.y += shot.vy * dt * speedFactor;
    shot.ttl -= dt;
    if (distance(player, shot) < shot.r + 24) {
      hurtPlayer(shot.damage, "被 Boss 回收能量弹命中。");
      return false;
    }
    return shot.ttl > 0 && shot.x > -40 && shot.x < world.w + 40 && shot.y > -40 && shot.y < world.h + 40;
  });
}

function updateShockwaves(dt) {
  state.shockwaves = state.shockwaves.filter((wave) => {
    wave.r += wave.speed * dt;
    wave.ttl -= dt;
    const d = distance(player, wave);
    if (!wave.hit && Math.abs(d - wave.r) < 24) {
      hurtPlayer(wave.damage, "震荡波命中，Boss 正在过载。");
      wave.hit = true;
    }
    return wave.ttl > 0;
  });
}

function updateProjectiles(dt) {
  const world = state.world || { w: W, h: H };
  state.projectiles = state.projectiles.filter((p) => {
    const target = findTarget(p);
    if (target) {
      const dx = target.x - p.x;
      const dy = target.y - p.y;
      const len = Math.hypot(dx, dy) || 1;
      p.vx = p.vx * 0.88 + (dx / len) * p.speed * 0.12;
      p.vy = p.vy * 0.88 + (dy / len) * p.speed * 0.12;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.ttl -= dt;
    if (Math.random() < 0.5) {
      spawnParticles(p.x, p.y, 1, {
        color: "#75ff9f", speedMin: 10, speedMax: 40,
        rMin: 1, rMax: 3, ttlMin: 0.1, ttlMax: 0.2, glow: true, friction: 0.9,
      });
    }
    for (const enemy of state.enemies) {
      if (enemy.hp > 0 && circleHitsRect({ x: p.x, y: p.y, r: p.r }, entityRect(enemy))) {
        damageTarget(enemy, p.damage);
        hitEffect(p.x, p.y, "#75ff9f", 6);
        return false;
      }
    }
    if (state.boss && !state.boss.defeated && circleHitsRect({ x: p.x, y: p.y, r: p.r }, bossRect(state.boss))) {
      damageTarget(state.boss, p.damage);
      return false;
    }
    return p.ttl > 0 && p.x > -30 && p.x < world.w + 30 && p.y > -30 && p.y < world.h + 30;
  });
}

function findTarget(p) {
  const candidates = [...state.enemies.filter((e) => e.hp > 0)];
  if (state.boss && !state.boss.defeated) candidates.push(state.boss);
  candidates.sort((a, b) => distance(p, a) - distance(p, b));
  return candidates[0];
}

function triggerAttack() {
  if (!["battle", "boss", "horde"].includes(state.scene) || player.attackCd > 0 || modalOpen()) return;
  const stats = currentStats();
  const weapon = stats.weapon || equipments[0];
  player.attackCd = stats.cooldown;
  if (weapon.attackType === "circle") doCircleAttack(stats);
  if (weapon.attackType === "slash") doSlashAttack(stats);
  if (weapon.attackType === "homing") doHomingAttack(stats, 1);
  if (weapon.attackType === "burst") doHomingAttack(stats, weapon.projectileCount || 3);
  if (weapon.attackType === "pierce") doPierceAttack(stats);
  if (weapon.attackType === "hybrid") {
    doSlashAttack(stats);
    doHomingAttack(stats, 2);
  }
}

function doCircleAttack(stats) {
  const attack = { type: "circle", x: player.x, y: player.y, r: stats.reach, ttl: 0.16 };
  state.attacks.push(attack);
  damageInCircle(attack, stats.damage);
  spawnParticles(player.x, player.y, 10, {
    color: "#30e4e0", speedMin: 80, speedMax: stats.reach * 2,
    rMin: 2, rMax: 5, ttlMin: 0.2, ttlMax: 0.4, glow: true, friction: 0.9,
  });
  spawnSpriteEffect(player.x, player.y, "fxHitSpark", 4, 0.05, Math.max(64, stats.reach * 0.6));
  player.attackAnim = 0.15;
  addShake(2);
}

function doSlashAttack(stats) {
  const len = Math.hypot(player.faceX, player.faceY) || 1;
  const nx = player.faceX / len;
  const ny = player.faceY / len;
  const attack = { type: "slash", x: player.x + nx * 68, y: player.y + ny * 52, nx, ny, r: stats.reach, ttl: 0.18 };
  state.attacks.push(attack);
  spawnSpriteEffect(attack.x, attack.y, "fxSlash", 4, 0.05, 120, Math.atan2(ny, nx));
  for (let i = 0; i < 8; i++) {
    const a = Math.atan2(ny, nx) + rand(-0.5, 0.5);
    spawnParticles(player.x + nx * (40 + i * 15), player.y + ny * (40 + i * 15), 1, {
      color: i % 2 ? "#ffd861" : "#ffffff",
      angle: a, spread: 0.3,
      speedMin: 60, speedMax: 160,
      rMin: 2, rMax: 4, ttlMin: 0.15, ttlMax: 0.3, glow: true, friction: 0.88,
    });
  }
  for (const target of activeTargets()) {
    const dx = target.x - player.x;
    const dy = target.y - player.y;
    const dist = Math.hypot(dx, dy);
    const dot = (dx / (dist || 1)) * nx + (dy / (dist || 1)) * ny;
    if (dist <= stats.reach && dot > 0.28) damageTarget(target, stats.damage + 5);
  }
  if (stats.weapon?.bind) bindNearby(stats.weapon.bind, stats.reach * 0.8, stats.damage * 0.25);
}

function doHomingAttack(stats, count) {
  const len = Math.hypot(player.faceX, player.faceY) || 1;
  const nx = player.faceX / len;
  const ny = player.faceY / len;
  spawnParticles(player.x + nx * 48, player.y + ny * 48, 6, {
    color: "#75ff9f", angle: Math.atan2(ny, nx), spread: 0.6,
    speedMin: 80, speedMax: 200,
    rMin: 2, rMax: 4, ttlMin: 0.1, ttlMax: 0.25, glow: true, friction: 0.85,
  });
  for (let i = 0; i < count; i += 1) {
    const spread = (i - (count - 1) / 2) * 0.32;
    state.projectiles.push({
      x: player.x + nx * 42,
      y: player.y + ny * 42,
      vx: (nx * Math.cos(spread) - ny * Math.sin(spread)) * 360,
      vy: (ny * Math.cos(spread) + nx * Math.sin(spread)) * 360,
      speed: 430,
      r: 11,
      damage: stats.damage,
      ttl: 2.6,
    });
  }
  state.attacks.push({ type: "muzzle", x: player.x + nx * 48, y: player.y + ny * 48, r: 34, ttl: 0.12 });
  spawnSpriteEffect(player.x + nx * 48, player.y + ny * 48, "fxMuzzle", 4, 0.04, 48, Math.atan2(ny, nx));
}

function doPierceAttack(stats) {
  const len = Math.hypot(player.faceX, player.faceY) || 1;
  const nx = player.faceX / len;
  const ny = player.faceY / len;
  const attack = { type: "pierce", x: player.x, y: player.y, nx, ny, r: stats.reach, ttl: 0.2 };
  state.attacks.push(attack);
  for (let i = 0; i < 6; i++) {
    spawnParticles(player.x + nx * (30 + i * 20), player.y + ny * (30 + i * 20), 1, {
      color: "#30e4e0", angle: Math.atan2(ny, nx) + Math.PI / 2, spread: 0.4,
      speedMin: 40, speedMax: 100,
      rMin: 2, rMax: 3, ttlMin: 0.15, ttlMax: 0.3, glow: true, friction: 0.9,
    });
  }
  for (const target of activeTargets()) {
    const dx = target.x - player.x;
    const dy = target.y - player.y;
    const along = dx * nx + dy * ny;
    const side = Math.abs(dx * ny - dy * nx);
    if (along > 0 && along < stats.reach + 80 && side < 42) damageTarget(target, stats.damage + 8);
  }
}

function bindNearby(seconds, radius, damage) {
  state.skillEffects.push({ type: "bind", x: player.x, y: player.y, r: radius, ttl: 0.45 });
  for (const target of activeTargets()) {
    if (distance(player, target) < radius) {
      target.bindTimer = Math.max(target.bindTimer || 0, seconds);
      damageTarget(target, damage);
    }
  }
}

function activeTargets() {
  const list = [...state.enemies.filter((e) => e.hp > 0)];
  if (state.boss && !state.boss.defeated) list.push(state.boss);
  return list;
}

function damageInCircle(circle, damage) {
  for (const target of activeTargets()) {
    const rect = target === state.boss ? bossRect(target) : entityRect(target);
    if (circleHitsRect(circle, rect)) damageTarget(target, damage);
  }
}

function damageTarget(target, damage) {
  const finalDamage = Math.max(1, Math.round(damage));
  target.hp -= finalDamage;
  target.hitCd = 0.18;
  // Hit-stop for impact feel (like Soul Knight)
  if (finalDamage >= 15) triggerHitStop(0.04);
  // Combat ring on hit
  spawnCombatRing(target.x, target.y, "#ffd861", 30 + finalDamage, 0.25);
  // Hit spark sprite
  triggerHitSpark(target.x, target.y);
  if (target === state.boss) {
    state.bossDamageFloaters.push({
      x: target.x + rand(-36, 36),
      y: target.y - target.h * 0.42,
      value: finalDamage,
      ttl: 0.72,
    });
    // Boss phase transition flash
    if (target.hp > 0 && target.hp / target.maxHp < 0.33 && (target.phase || 1) < 3) triggerBossFlash(0.6);
    if (target.hp > 0 && target.hp / target.maxHp < 0.66 && (target.phase || 1) < 2) triggerBossFlash(0.4);
  }
  const stats = currentStats();
  if (target !== state.boss && target.hp <= 0 && stats.lifesteal) heal(stats.lifesteal);
}

function collectPickups() {
  const stats = currentStats();
  state.pickups = state.pickups.filter((p) => {
    if (distance(player, p) > stats.pickup) return true;
    if (p.kind === "scrap") {
      save.scraps[p.id] = (save.scraps[p.id] || 0) + p.amount;
      save.stats.collected += p.amount;
      spawnParticles(p.x, p.y, 6, {
        color: "#ffd861", speedMin: 40, speedMax: 120,
        rMin: 1, rMax: 3, ttlMin: 0.15, ttlMax: 0.3, glow: true, friction: 0.88,
      });
      player.pickupFlash = 0.2;
      toast(`获得 ${p.name} ×${p.amount}`);
    } else if (p.kind === "puzzle") {
      if (state.puzzle) {
        state.puzzle.held[p.id] = (state.puzzle.held[p.id] || 0) + 1;
        toast(`拾取分拣样本：${p.name}`);
      }
    } else {
      buffs[p.id]?.apply();
      spawnParticles(p.x, p.y, 10, {
        color: "#75ff9f", speedMin: 50, speedMax: 150,
        rMin: 2, rMax: 4, ttlMin: 0.2, ttlMax: 0.4, glow: true, friction: 0.88,
      });
      player.pickupFlash = 0.3;
      toast(`获得增益：${buffs[p.id]?.name || "临时增益"}`);
    }
    saveGame();
    return false;
  });
}

function dropLoot(enemy) {
  const count = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i += 1) {
    const id = enemy.drop[Math.floor(Math.random() * enemy.drop.length)];
    spawnPickup(enemy.x + rand(-22, 22), enemy.y + rand(-20, 20), "scrap", id);
  }
}

function updateBuffSpawner(dt) {
  state.buffTimer -= dt;
  if (state.buffTimer > 0) return;
  state.buffTimer = state.scene === "boss" ? 5.4 : 6.4;
  const activeBuffs = state.pickups.filter((p) => p.kind === "buff").length;
  if (activeBuffs >= 3) return;
  const point = randomBuffPoint();
  spawnPickup(point.x, point.y, "buff", randomKey(buffs));
}

function randomBuffPoint() {
  const area = state.scene === "boss"
    ? { minX: 260, maxX: state.world.w - 240, minY: 160, maxY: state.world.h - 180 }
    : { minX: 220, maxX: state.world.w - 220, minY: 140, maxY: state.world.h - 160 };
  for (let i = 0; i < 100; i += 1) {
    const point = { x: rand(area.minX, area.maxX), y: rand(area.minY, area.maxY) };
    const rect = { x: point.x - 22, y: point.y - 22, w: 44, h: 44 };
    const blocked = state.obstacles.some((o) => rectsOverlap(rect, o));
    if (!blocked && distance(point, player) > 120) return point;
  }
  return { x: player.x + 90, y: player.y + 70 };
}

function spawnPickup(x, y, kind, id) {
  const scrap = scrapTypes.find((s) => s[0] === id);
  state.pickups.push({
    x,
    y,
    kind,
    id,
    amount: kind === "scrap" ? 1 : 0,
    name: scrap?.[1] || buffs[id]?.name || id,
    img: kind === "scrap" ? scrap?.[2] : buffs[id]?.img,
    bob: Math.random() * Math.PI * 2,
  });
}

function hurtPlayer(amount, message) {
  if (player.buffs.invincible) {
    state.skillEffects.push({ type: "shield", x: player.x, y: player.y, r: 86, ttl: 0.35 });
    spawnParticles(player.x, player.y, 6, {
      color: "#75ff9f", speedMin: 40, speedMax: 120,
      rMin: 2, rMax: 4, ttlMin: 0.15, ttlMax: 0.3, glow: true, friction: 0.88,
    });
    return;
  }
  if (player.hurtCd > 0) return;
  const stats = currentStats();
  let damage = Math.max(1, Math.round(amount - stats.defense));
  if (player.shield > 0) {
    const blocked = Math.min(player.shield, damage);
    player.shield -= blocked;
    damage -= blocked;
    spawnParticles(player.x, player.y, 8, {
      color: "#75ff9f", speedMin: 60, speedMax: 160,
      rMin: 2, rMax: 5, ttlMin: 0.15, ttlMax: 0.3, glow: true, friction: 0.88,
    });
  }
  player.hp -= damage;
  player.hurtCd = 0.55;
  addShake(6);
  spawnParticles(player.x, player.y, 10, {
    color: "#f0525f", speedMin: 60, speedMax: 180,
    rMin: 2, rMax: 5, ttlMin: 0.2, ttlMax: 0.4, glow: true, friction: 0.88,
  });
  if (stats.reflect > 0) {
    state.skillEffects.push({ type: "reflect", x: player.x, y: player.y, r: 124, ttl: 0.35 });
    damageInCircle({ x: player.x, y: player.y, r: 124 }, stats.reflect);
  }
  if (damage > 0) toast(message);
  if (player.hp <= 0) {
    player.hp = Math.ceil(player.maxHp * 0.55);
    state.wave = 1;
    enterHub("生命过低，修复站把你拉回主页。碎片已保留，重新整备再出发。");
  }
}

function heal(amount) {
  player.hp = Math.min(player.maxHp, player.hp + amount);
  spawnParticles(player.x, player.y, 8, {
    color: "#75ff9f", speedMin: 20, speedMax: 80,
    rMin: 2, rMax: 4, ttlMin: 0.3, ttlMax: 0.6, glow: true,
    gravity: -60, friction: 0.92,
  });
}

function addShield(amount) {
  player.shield = Math.min(90, player.shield + amount);
}

function addBuff(id, seconds) {
  player.buffs[id] = Math.max(player.buffs[id] || 0, seconds);
}

function currentSkill() {
  return skills.find((skill) => skill.id === save.equippedSkill) || skills[0];
}

function activateSkill() {
  if (!["battle", "boss", "horde", "puzzle"].includes(state.scene) || modalOpen()) return;
  const skill = currentSkill();
  if (!save.unlockedSkills.includes(skill.id)) return toast("先在装备间解锁并选择技能。");
  if (player.skillCd > 0) return toast(`技能冷却中：${Math.ceil(player.skillCd)}s`);
  player.skillCd = 20;
  const baseEffect = { x: player.x, y: player.y, r: 160, ttl: 0.7 };
  if (skill.effect === "invincible") {
    addBuff("invincible", 5);
    spawnSpriteEffect(player.x, player.y, "fxShield", 4, 0.08, 130, 0, { glowColor: "rgba(100,255,160,0.8)" });
    state.skillEffects.push({ ...baseEffect, type: "shield", r: 120, ttl: 5 });
  }
  if (skill.effect === "screenDamage") {
    for (const target of activeTargets()) {
      damageTarget(target, 86);
      hitEffect(target.x, target.y, "#ffd861", 10);
    }
    addShake(12);
    spawnSpriteEffect(player.x, player.y, "fxElectric", 4, 0.05, 160, 0, { glowColor: "rgba(100,180,255,0.8)" });
    state.skillEffects.push({ ...baseEffect, type: "screen", x: player.x, y: player.y, r: 520, ttl: 0.75 });
  }
  if (skill.effect === "damageBoost") {
    addBuff("damageBoost", 8);
    spawnSpriteEffect(player.x, player.y, "fxPower", 4, 0.07, 150, 0, { glowColor: "rgba(255,100,150,0.8)" });
    state.skillEffects.push({ ...baseEffect, type: "power", r: 136, ttl: 8 });
  }
  if (skill.effect === "slow") {
    addBuff("slow", 6);
    state.skillEffects.push({ ...baseEffect, type: "slow", r: 260, ttl: 6 });
  }
  if (skill.effect === "magnet") {
    addBuff("magnet", 5);
    state.pickups.forEach((pickup) => {
      spawnParticles(pickup.x, pickup.y, 3, {
        color: "#30e4e0", speedMin: 40, speedMax: 120,
        rMin: 1, rMax: 3, ttlMin: 0.15, ttlMax: 0.3, glow: true, friction: 0.9,
      });
      pickup.x = player.x + rand(-40, 40);
      pickup.y = player.y + rand(-40, 40);
    });
    state.skillEffects.push({ ...baseEffect, type: "magnet", r: 240, ttl: 0.8 });
  }
  if (skill.effect === "heal") {
    heal(46);
    addShield(16);
    spawnSpriteEffect(player.x, player.y, "fxHeal", 4, 0.08, 140, 0, { glowColor: "rgba(100,230,120,0.8)" });
    state.skillEffects.push({ ...baseEffect, type: "heal", r: 150, ttl: 1.2 });
  }
  if (skill.effect === "freeze") {
    addBuff("freeze", 3);
    for (const t of activeTargets()) {
      spawnParticles(t.x, t.y, 8, {
        color: "#7de5ff", speedMin: 30, speedMax: 100,
        rMin: 2, rMax: 4, ttlMin: 0.3, ttlMax: 0.6, glow: true, friction: 0.9,
      });
    }
    addShake(4);
    spawnSpriteEffect(player.x, player.y, "fxFreeze", 4, 0.07, 200, 0, { glowColor: "rgba(125,229,255,0.8)" });
    state.skillEffects.push({ ...baseEffect, type: "freeze", r: 300, ttl: 3 });
  }
  if (skill.effect === "barrier") {
    addShield(42);
    addBuff("reflect", 5);
    spawnSpriteEffect(player.x, player.y, "fxShield", 4, 0.08, 150, 0, { glowColor: "rgba(100,255,160,0.8)" });
    state.skillEffects.push({ ...baseEffect, type: "shield", r: 138, ttl: 5 });
  }
  if (skill.effect === "bind") {
    bindNearby(4, 260, 22);
    spawnSpriteEffect(player.x, player.y, "fxPoison", 4, 0.09, 220, 0, { glowColor: "rgba(120,200,50,0.7)" });
    state.skillEffects.push({ ...baseEffect, type: "bind", r: 260, ttl: 2 });
  }
  if (skill.effect === "drone") {
    addBuff("drone", 6);
    state.skillEffects.push({ ...baseEffect, type: "drone", r: 180, ttl: 6 });
  }
  if (skill.effect === "dash") {
    const len = Math.hypot(player.faceX, player.faceY) || 1;
    const nx = player.faceX / len;
    const ny = player.faceY / len;
    moveEntity(player, nx * 180, ny * 180, state.obstacles);
    damageInCircle({ x: player.x, y: player.y, r: 132 }, 52);
    addBuff("speed", 3);
    state.skillEffects.push({ ...baseEffect, type: "dash", x: player.x, y: player.y, r: 180, ttl: 0.45 });
  }
  if (skill.effect === "reflect") {
    addBuff("reflect", 7);
    state.skillEffects.push({ ...baseEffect, type: "reflect", r: 150, ttl: 7 });
  }
  toast(`释放技能：${skill.name}`);
}

function updateSkillAutoFire(dt) {
  if (!player.buffs.drone || !["battle", "boss", "horde"].includes(state.scene)) return;
  player.droneTimer = Math.max(0, (player.droneTimer || 0) - dt);
  if (player.droneTimer > 0) return;
  player.droneTimer = 0.45;
  const stats = currentStats();
  doHomingAttack({ ...stats, damage: Math.max(14, stats.damage * 0.55), reach: 520 }, 1);
}

function interact() {
  if (state.scene === "title") {
    continueGame();
    return;
  }
  if (modalOpen()) return;
  if (synthOverlay && !synthOverlay.classList.contains("hidden")) { if (synthMode === "craft") doSynth(); return; }
  if (storyOverlay && !storyOverlay.classList.contains("hidden")) { storyRespond(); return; }
  if (quizOverlay && !quizOverlay.classList.contains("hidden")) { if (quizAnswered) quizNext(); return; }
  if (state.scene === "hub" && state.nearby) {
    state.nearby.action();
    return;
  }
  if (state.scene === "puzzle") {
    interactPuzzle();
    return;
  }
  if ((state.scene === "battle" || state.scene === "boss" || state.scene === "horde") && state.battlePortal && distance(player, state.battlePortal) < 92) {
    if (state.scene === "battle") state.wave += 1;
    enterHub("战斗奖励已保存，已回到主页。");
  }
}

function interactPuzzle() {
  const puzzle = state.puzzle;
  if (!puzzle || !puzzle.nearby) return;
  const expected = puzzle.order[puzzle.step];
  if (puzzle.nearby.id !== expected) {
    hurtPlayer(5, "投放顺序错误，分拣机触发了轻微电击。");
    toast(`顺序不对：当前应先处理 ${resourceName(expected)}。`);
    return;
  }
  if ((puzzle.held[expected] || 0) <= 0) {
    toast(`还缺 ${resourceName(expected)} 样本，先去场地里收集。`);
    return;
  }
  puzzle.held[expected] -= 1;
  puzzle.step += 1;
  addShield(8);
  if (puzzle.step >= puzzle.order.length) {
    addReward({ token: 2, circuit: 2, coil: 2 });
    save.stats.collected += 4;
    saveGame();
    enterHub("解密回收完成：获得回收章、电路与线圈奖励。");
  } else {
    toast(`投放成功，下一步：${resourceName(puzzle.order[puzzle.step])}。`);
  }
}

function nextWave() {
  if (state.scene === "battle" && state.battlePortal && distance(player, state.battlePortal) < 120) {
    state.wave += 1;
    startBattle();
  }
  if (state.scene === "horde" && state.battlePortal && distance(player, state.battlePortal) < 120) startHorde();
}

function useMedbay() {
  if ((save.scraps.token || 0) <= 0 && player.hp < player.maxHp) {
    toast("修复站需要 1 枚回收章。");
    return;
  }
  if (player.hp < player.maxHp) save.scraps.token = Math.max(0, (save.scraps.token || 0) - 1);
  player.hp = player.maxHp;
  addShield(12);
  saveGame();
  toast("修复完成，并获得临时护盾。");
}

function useRecycler() {
  closeModal();
  synthMode = "recycler";
  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderRecyclerUI();
    const title = document.getElementById("synthTitle");
    const hint = document.getElementById("synthHint");
    const crafting = document.getElementById("synthCrafting");
    const resultImg = document.getElementById("synthResultImg");
    if (title) title.textContent = "精炼机";
    if (hint) hint.textContent = "选择一类材料，点击精炼：消耗 3 个同类碎片，炼成 1 枚回收章。";
    if (crafting) crafting.textContent = "选择碎片类别后点击精炼";
    if (resultImg) resultImg.src = imagePaths.facilityRecycler || "";
  }
}


function paperdollHtml() {
  const weapon = getEquip(save.equipped.weapon);
  const helmet = getEquip(save.equipped.helmet);
  const armor = getEquip(save.equipped.armor);
  const boots = getEquip(save.equipped.boots);
  return `
    <div class="paperdoll-stack">
      <img class="hero-base" src="${imagePaths.heroFront}" alt="" />
      ${armor ? `<img class="paper-armor" src="${imagePaths[armor.img]}" alt="" />` : ""}
      ${helmet ? `<img class="paper-helmet" src="${imagePaths[helmet.img]}" alt="" />` : ""}
      ${boots ? `<img class="paper-boots" src="${imagePaths[boots.img]}" alt="" />` : ""}
      ${weapon ? `<img class="paper-weapon" src="${imagePaths[weapon.img]}" alt="" />` : ""}
    </div>
  `;
}

function showSkills() {
  const current = currentSkill();
  const cards = skills
    .map((skill) => {
      const unlocked = save.unlockedSkills.includes(skill.id);
      const active = save.equippedSkill === skill.id;
      return `
        <article class="card ${unlocked ? "good" : "locked"}">
          <div class="card-title"><img src="${imagePaths[skill.img]}" alt="" /><span>${skill.name}</span></div>
          <p>${skill.desc}</p>
          <div class="cost-row">${costHtml(skill.cost) || '<span class="cost">初始技能</span>'}<span class="cost">CD 20s</span></div>
          <button class="${active ? "quiet" : "primary"}" data-action="${unlocked ? "selectSkill" : "unlockSkill"}" data-id="${skill.id}">
            ${active ? "已选择" : unlocked ? "选择" : "解锁"}
          </button>
        </article>`;
    })
    .join("");
  showModal(`
    <div class="modal-header">
      <div><h2>技能训练</h2><p>当前技能：${current.name}。战斗中按 Q 释放，所有技能统一 20 秒冷却，适合青少年玩家理解“强效果也要等时机”。</p></div>
      <button class="quiet" data-action="close">关闭 Esc</button>
    </div>
    <div class="modal-grid">${cards}</div>
    <div class="modal-footer">建议：Boss 用无敌回收罩/慢速分拣，小怪用全屏净化波，尸潮用纸板屏障/织线束缚。</div>
  `, "bgLab");
}

function showCraft() {
  closeModal();
  synthMode = "craft";
  if (synthOverlay) {
    synthOverlay.classList.remove("hidden");
    state.paused = true;
    renderSynthRecipes();
    const title = document.getElementById("synthTitle");
    const hint = document.getElementById("synthHint");
    const crafting = document.getElementById("synthCrafting");
    const resultImg = document.getElementById("synthResultImg");
    if (title) title.textContent = "纪念工坊";
    if (hint) hint.textContent = "选中一个配方，按 Enter 或点击合成启动合成台。";
    if (crafting) crafting.textContent = "选择配方后合成";
    if (resultImg) resultImg.src = imagePaths.facilityWorkbench || "";
    return;
  }
}

function closeSynth() {
  if (synthOverlay) synthOverlay.classList.add("hidden");
  state.paused = false;
  synthSelected = null;
  synthMode = "craft";
}

let synthSelected = null;
let synthAnimating = false;
let synthMode = "craft";

function renderSynthRecipes() {
  const list = document.getElementById("synthRecipes");
  if (!list) return;
  const inv = scrapTypes.map(([id, name, img]) => `<span class="cost"><img src="${imagePaths[img]}" alt="" style="width:18px;height:18px;vertical-align:middle"/> ${name} ${save.scraps[id]||0}</span>`).join(" ");
  list.innerHTML = `<div style="margin-bottom:8px;color:#ffd861;font-size:11px">碎片库存：${inv}</div>` + recipes.map((recipe) => {
    const can = canAfford(recipe.cost);
    const owned = save.souvenirs[recipe.id] || 0;
    return `<div class="synth-recipe ${synthSelected === recipe.id ? "selected" : ""}" data-action="selectSynth" data-id="${recipe.id}">
      <img src="${imagePaths[recipe.img]}" alt="" />
      <div class="synth-recipe-text">
        <strong>${recipe.name} ${can ? "" : "(材料不足)"}</strong>
        <span>${costHtml(recipe.cost)} 库存 ${owned} 公益点 +${recipe.points}</span>
      </div>
    </div>`;
  }).join("");
}

function renderRecyclerUI() {
  const list = document.getElementById("synthRecipes");
  if (!list) return;
  const scrapNames = { plastic: "塑料带", glass: "玻璃片", metal: "金属板", circuit: "电路板", coil: "铜线圈", gear: "齿轮", battery: "电池芯", paper: "纸板纤维", fabric: "再生布料" };
  const candidates = Object.keys(scrapNames).filter((id) => (save.scraps[id] || 0) >= 3);
  const inv = scrapTypes.map(([id, name, img]) => `<span class="cost"><img src="${imagePaths[img]}" alt="" style="width:16px;height:16px;vertical-align:middle"/> ${name} ${save.scraps[id]||0}</span>`).join(" ");
  if (!candidates.length) {
    list.innerHTML = `<div style="color:#ffd861;margin-bottom:8px">碎片库存：${inv}</div><div class="recycler-empty">库存中没有 3 个以上同类碎片。回到关卡收集更多碎片后再来精炼。</div>`;
    return;
  }
  list.innerHTML = `<div style="color:#ffd861;margin-bottom:8px;font-size:11px">碎片库存：${inv}</div>` + candidates.map((id) => {
    const count = save.scraps[id] || 0;
    return `<div class="synth-recipe recycler-option" data-action="doRecycle" data-id="${id}">
      <img src="${imagePaths["item" + id.charAt(0).toUpperCase() + id.slice(1)] || imagePaths.itemToken}" alt="" />
      <div class="synth-recipe-text">
        <strong>${scrapNames[id] || id} ×${count}</strong>
        <span>消耗 3 个 → 获得 1 枚回收章</span>
      </div>
    </div>`;
  }).join("");
}


function selectSynth(id) {
  synthSelected = id;
  renderSynthRecipes();
  const recipe = recipes.find((r) => r.id === id);
  const crafting = document.getElementById("synthCrafting");
  if (recipe && crafting) crafting.textContent = `已选：${recipe.name}，按 Enter 合成`;
}

function doRecycle(id) {
  if (!id) return;
  if ((save.scraps[id] || 0) < 3) {
    toast("碎片不足，需要至少 3 个。");
    return;
  }
  save.scraps[id] -= 3;
  save.scraps.token = (save.scraps.token || 0) + 1;
  saveGame();
  renderRecyclerUI();
  triggerRecyclerAnimation();
  toast("精炼成功：获得 1 枚回收章。");
}

function triggerRecyclerAnimation() {
  const hammer = document.getElementById("anvilHammer");
  const spark = document.getElementById("anvilSpark");
  const crafting = document.getElementById("synthCrafting");
  const bowl = document.getElementById("anvilBowl");
  if (crafting) crafting.textContent = "精炼中...";
  let strikes = 0;
  const doStrike = () => {
    if (hammer) hammer.classList.add("strike");
    if (spark) { spark.classList.remove("active"); void spark.offsetWidth; spark.classList.add("active"); }
    strikes++;
    setTimeout(() => {
      if (hammer) hammer.classList.remove("strike");
      if (strikes < 3) setTimeout(doStrike, 200);
      else {
        if (crafting) crafting.textContent = "精炼完成！选择其他碎片继续精炼。";
      }
    }, 200);
  };
  doStrike();
}


function doSynth() {
  if (synthAnimating || !synthSelected) { toast("请先选择一个配方。"); return; }
  const recipe = recipes.find((r) => r.id === synthSelected);
  if (!recipe) return;
  if (!canAfford(recipe.cost)) { toast("碎片不足，无法合成。"); return; }
  synthAnimating = true;
  const hammer = document.getElementById("anvilHammer");
  const spark = document.getElementById("anvilSpark");
  const crafting = document.getElementById("synthCrafting");
  if (crafting) crafting.textContent = "合成中...";
  let strikes = 0;
  const doStrike = () => {
    if (hammer) hammer.classList.add("strike");
    if (spark) { spark.classList.remove("active"); void spark.offsetWidth; spark.classList.add("active"); }
    strikes++;
    setTimeout(() => {
      if (hammer) hammer.classList.remove("strike");
      if (strikes < 3) setTimeout(doStrike, 200);
      else finishSynth(recipe);
    }, 200);
  };
  doStrike();
}

function finishSynth(recipe) {
  consume(recipe.cost);
  save.souvenirs[recipe.id] = (save.souvenirs[recipe.id] || 0) + 1;
  save.stats.crafted += 1;
  saveGame();
  synthAnimating = false;
  const crafting = document.getElementById("synthCrafting");
  const resultImg = document.getElementById("synthResultImg");
  const hint = document.getElementById("synthHint");
  if (resultImg) resultImg.src = imagePaths[recipe.img];
  if (crafting) crafting.textContent = `合成成功！获得 ${recipe.name} x1`;
  if (hint) hint.textContent = `${recipe.desc} 库存：${save.souvenirs[recipe.id]}。`;
  renderSynthRecipes();
  toast(`${recipe.name} 合成完成。`);
}

function showExchange() {
  const normal = recipes
    .map((recipe) => {
      const owned = save.souvenirs[recipe.id] || 0;
      return `
        <article class="card ${owned ? "good" : "locked"}">
          <div class="card-title"><img src="${imagePaths[recipe.img]}" alt="" /><span>${recipe.name}</span></div>
          <p>普通纪念品兑换公益点 +${recipe.points}。</p>
          <p>库存：${owned}</p>
          <button class="primary" data-action="exchange" data-id="${recipe.id}" ${owned ? "" : "disabled"}>兑换</button>
        </article>`;
    })
    .join("");
  const prints = printRewards
    .map((reward) => `
      <article class="card warn">
        <div class="card-title"><img src="${imagePaths[reward.img]}" alt="" /><span>${reward.name}</span></div>
        <p>${reward.desc}</p>
        <div class="cost-row">${costHtml(reward.cost)}</div>
        <p>已兑换：${save.printTickets[reward.id] || 0}</p>
        <button class="primary" data-action="exchangePrint" data-id="${reward.id}">兑换 3D 打印券</button>
      </article>`)
    .join("");
  const log = save.redeemed.slice(-5).reverse().map((r) => `<span class="cost">${r}</span>`).join("");
  showModal(`
    <div class="modal-header">
      <div><h2>实物兑换台</h2><p>Boss 模式掉落“打印碎片”，可兑换 3D 废物打印纪念品预约券。</p></div>
      <button class="quiet" data-action="close">关闭 Esc</button>
    </div>
    <h3>3D 废物打印兑换</h3>
    <div class="modal-grid">${prints}</div>
    <h3>普通纪念品兑换</h3>
    <div class="modal-grid">${normal}</div>
    <h3>最近记录</h3>
    <div class="cost-row">${log || '<span class="cost">还没有兑换记录</span>'}</div>
    <div class="modal-footer">快捷键：X 打开兑换。当前打印碎片：${save.printShard} · 公益点：${save.points}</div>
  `, "bgMarket");
}

function showBackgrounds() {
  const cards = backgrounds
    .map((bg) => {
      const unlocked = save.unlockedBackgrounds.includes(bg.id);
      const active = save.currentBackground === bg.id;
      return `
        <article class="card ${unlocked ? "good" : "locked"}">
          <div class="card-title"><img src="${imagePaths[bg.img]}" alt="" /><span>${bg.name}</span></div>
          <p>${bg.desc}</p>
          <div class="cost-row">${costHtml(bg.cost) || '<span class="cost">默认解锁</span>'}</div>
          <button class="${active ? "quiet" : "primary"}" data-action="${unlocked ? "selectBg" : "unlockBg"}" data-id="${bg.id}">
            ${active ? "使用中" : unlocked ? "切换" : "解锁"}
          </button>
        </article>`;
    })
    .join("");
  showModal(`
    <div class="modal-header">
      <div><h2>背景终端</h2><p>用碎片解锁主页背景，让装备、兑换等界面也带主题氛围。</p></div>
      <button class="quiet" data-action="close">关闭 Esc</button>
    </div>
    <div class="modal-grid">${cards}</div>
    <div class="modal-footer">快捷键：B 打开背景选择。Boss 背景需要打印碎片解锁。</div>
  `, "bgHub");
}

function showMissions() {
  const missions = [
    { id: "collect12", name: "碎片回收员", target: 12, value: save.stats.collected, reward: { token: 2 } },
    { id: "defeat6", name: "污染清障", target: 6, value: save.stats.defeated, reward: { metal: 4, token: 1 } },
    { id: "craft1", name: "第一件纪念品", target: 1, value: save.stats.crafted, reward: { battery: 2, coil: 2 } },
    { id: "boss1", name: "蓝猫守卫净化", target: 1, value: save.stats.bossDefeated, reward: { printShard: 2 } },
  ];
  const cards = missions
    .map((m) => {
      const done = m.value >= m.target;
      const claimed = save.claimed[m.id];
      return `
        <article class="card ${done ? "good" : "warn"}">
          <div class="card-title"><img src="${m.id === "boss1" ? imagePaths.bossCat : imagePaths.itemToken}" alt="" /><span>${m.name}</span></div>
          <p>进度：${Math.min(m.value, m.target)} / ${m.target}</p>
          <div class="cost-row">${costHtml(m.reward, "奖励")}</div>
          <button class="primary" data-action="claim" data-id="${m.id}" ${done && !claimed ? "" : "disabled"}>${claimed ? "已领取" : done ? "领取" : "进行中"}</button>
        </article>`;
    })
    .join("");
  showModal(`
    <div class="modal-header">
      <div><h2>公益任务板</h2><p>任务奖励帮助玩家更快升级装备、解锁背景、兑换 3D 打印纪念品。</p></div>
      <button class="quiet" data-action="close">关闭 Esc</button>
    </div>
    <div class="modal-grid">${cards}</div>
    <div class="modal-footer">快捷键：M 打开任务。</div>
  `, "bgHub");
}




function claimMission(id) {
  const map = {
    collect12: { ok: save.stats.collected >= 12, reward: { token: 2 } },
    defeat6: { ok: save.stats.defeated >= 6, reward: { metal: 4, token: 1 } },
    craft1: { ok: save.stats.crafted >= 1, reward: { battery: 2, coil: 2 } },
    boss1: { ok: save.stats.bossDefeated >= 1, reward: { printShard: 2 } },
  };
  const m = map[id];
  if (!m || !m.ok || save.claimed[id]) return;
  addReward(m.reward);
  save.claimed[id] = true;
  saveGame();
  showMissions();
  toast("任务奖励已入库。");
}

function tryUnlock(id) {
  const item = getEquip(id);
  if (!item || save.unlocked.includes(id)) return;
  if (!canAfford(item.cost)) return toast("材料不足，先去小怪模式收集碎片。");
  consume(item.cost);
  save.unlocked.push(id);
  save.equipped[item.slot] = id;
  recomputePlayerStats();
  saveGame();
  showInventory();
  toast(`${item.name} 已解锁并穿戴。`);
}

function unlockSkill(id) {
  const skill = skills.find((item) => item.id === id);
  if (!skill || save.unlockedSkills.includes(id)) return;
  if (!canAfford(skill.cost)) return toast("技能训练材料不足，先去对应主题关卡收集碎片。");
  consume(skill.cost);
  save.unlockedSkills.push(id);
  save.equippedSkill = id;
  saveGame();
  showSkills();
  toast(`${skill.name} 已解锁并选择。`);
}

function selectSkill(id) {
  if (!save.unlockedSkills.includes(id)) return;
  save.equippedSkill = id;
  saveGame();
  showSkills();
  toast(`已选择技能：${currentSkill().name}`);
}

let dialogueRuntime = { index: 0, step: 0, list: [] };

function galleryCardsForTheme(themeId) {
  return collectibleCards.filter((item) => item.theme === themeId);
}

function collectionProgress(themeId) {
  const cards = galleryCardsForTheme(themeId);
  const unlocked = cards.filter((card) => isCardUnlocked(card)).length;
  return { unlocked, total: cards.length };
}

function isCardUnlocked(card) {
  if (card.theme === save.currentTheme) return true;
  const ownedTheme = {
    electronic: ["circuit", "coil", "battery", "gear", "metal"].some((id) => (save.scraps[id] || 0) > 4),
    plastic: (save.scraps.plastic || 0) > 4,
    paper: (save.scraps.paper || 0) > 4,
    textile: (save.scraps.fabric || 0) > 4,
  };
  return Boolean(ownedTheme[card.theme] || save.stats.bossDefeated > 0 || save.points >= 20);
}

function showMuseum(themeId = save.currentTheme) {
  const activeTheme = themeConfigs[themeId] || currentTheme();
  const themeTabs = Object.values(themeConfigs)
    .map((theme) => {
      const p = collectionProgress(theme.id);
      return `<button class="theme-option ${activeTheme.id === theme.id ? "active" : ""}" data-action="showMuseumTheme" data-id="${theme.id}">
        <img src="${imagePaths[theme.preview]}" alt="" />
        <span>${theme.name}<small>${p.unlocked}/${p.total}</small></span>
      </button>`;
    })
    .join("");
  const cards = galleryCardsForTheme(activeTheme.id)
    .map((item) => {
      const unlocked = isCardUnlocked(item);
      return `
        <article class="collect-card ${unlocked ? "" : "locked-card"}">
          <div class="collect-art"><img src="${imagePaths[item.img]}" alt="" /></div>
          <div class="collect-copy">
            <span class="rarity">${item.rarity}</span>
            <h3>${item.name}</h3>
            <p>${unlocked ? item.story.slice(0, 72) + "..." : "未解锁：进入对应主题关卡收集碎片，或完成 Boss / 兑换任务后开放。"}</p>
            <button class="primary" data-action="openCollect" data-id="${item.id}" ${unlocked ? "" : "disabled"}>${unlocked ? "翻开卡牌" : "未解锁"}</button>
          </div>
        </article>`;
    })
    .join("");
  const monsters = activeTheme.enemies
    .slice(0, 8)
    .map((enemy, index) => `
      <article class="monster-entry">
        <img src="${imagePaths[enemy.img]}" alt="" />
        <div>
          <strong>${enemy.name}</strong>
          <p>掉落：${enemy.drop.map(resourceName).join("、")}。战斗提示：${index % 3 === 0 ? "优先拉开距离。" : index % 3 === 1 ? "用范围攻击清理。" : "用追踪弹稳定输出。"}</p>
        </div>
      </article>`)
    .join("");
  const p = collectionProgress(activeTheme.id);
  showModal(`
    <div class="modal-header">
      <div>
        <h2>收藏展馆</h2>
        <p>${activeTheme.name} · 卡牌 ${p.unlocked}/${p.total}。展馆包含卡牌故事、怪物图鉴、主题设施和兑换指引。</p>
      </div>
      <button class="quiet" data-action="close">关闭 Esc</button>
    </div>
    <div class="theme-picker museum-tabs">${themeTabs}</div>
    <section class="museum-layout">
      <div>
        <h3>纪念品卡牌</h3>
        <div class="collect-grid">${cards}</div>
      </div>
      <aside class="museum-side">
        <h3>污染体图鉴</h3>
        <div class="monster-list">${monsters}</div>
        <h3>兑换目标</h3>
        <p>小怪碎片用于装备、技能、普通纪念品；Boss 打印碎片用于 3D 废物打印实物券。</p>
      </aside>
    </section>
    <div class="modal-footer">提示：传送门切换主题会影响关卡敌人；展馆可提前查看所有主题，但部分卡牌需要碎片进度解锁。</div>
  `, "bgMarket");
}

function showCollectibleStory(id) {
  const item = collectibleCards.find((card) => card.id === id);
  if (!item) return;
  const theme = themeConfigs[item.theme] || currentTheme();
  showModal(`
    <div class="modal-header">
      <div>
        <h2>${item.name}</h2>
        <p>${theme.name} · ${item.rarity}</p>
      </div>
      <button class="quiet" data-action="showMuseumTheme" data-id="${theme.id}">返回展馆</button>
    </div>
    <article class="card-detail">
      <div class="collect-art large"><img src="${imagePaths[item.img]}" alt="" /></div>
      <div>
        <span class="rarity">${item.rarity}</span>
        <p>${item.story}</p>
        <div class="card-lore-note">课堂提问：这个废品为什么不能混投？它被重新设计成纪念品后，故事发生了什么变化？</div>
      </div>
    </article>
  `, "bgMarket");
}

function storyPortraitFor(scene) {
  return scene[1] || "charWarden";
}

function startDialogue(index = 0) {
  closeModal();
  dialogueRuntime = { index: clamp(index, 0, dialogueScenes.length - 1), step: 0, list: dialogueScenes };
  renderDialogue();
}

function renderDialogue() {
  const scene = dialogueRuntime.list[dialogueRuntime.index] || dialogueRuntime.list[0];
  if (!scene) return;
  const portrait = storyPortraitFor(scene);
  const name = scene[2] || scene[0];
  const line = scene[3] || "";
  const fact = scene[4] || "";
  if (storyOverlay) {
    storyOverlay.classList.remove("hidden");
    const pImg = document.getElementById("storyPortrait");
    const pName = document.getElementById("storyName");
    const pDlg = document.getElementById("storyDialogue");
    const pFact = document.getElementById("storyFact");
    if (pImg) pImg.src = imagePaths[portrait] || imagePaths.charWarden;
    if (pName) pName.textContent = name;
    if (pDlg) pDlg.textContent = line;
    if (pFact) pFact.textContent = fact;
    state.paused = true;
  }
}

function closeStory() {
  if (storyOverlay) storyOverlay.classList.add("hidden");
  state.paused = false;
}

function storyRespond() {
  const next = (dialogueRuntime.index + 1) % dialogueRuntime.list.length;
  dialogueRuntime.index = next;
  renderDialogue();
}

function storyContinueAct() {
  dialogueRuntime.index = Math.min(dialogueRuntime.list.length - 1, dialogueRuntime.index + 3);
  renderDialogue();
}

const quizData = [
  { theme: "electronic", question: "废电池应该怎么处理？", options: ["混进普通垃圾袋", "送到专门的电子废物回收点", "丢进可回收垃圾桶", "直接埋进土里"], correct: 1, reward: { token: 2 } },
  { theme: "electronic", question: "充电宝含有哪种危险？", options: ["易燃的锂离子电池", "有毒的化学染料", "锋利的金属刀片", "传染性病毒"], correct: 0, reward: { circuit: 3, token: 1 } },
  { theme: "plastic", question: "塑料瓶回收前最好怎么做？", options: ["随便丢进垃圾桶", "倒空、压扁、保持干净", "用水泡一天", "和食物残渣一起放"], correct: 1, reward: { token: 2 } },
  { theme: "plastic", question: "哪种塑料不应该回收？", options: ["饮料瓶", "被油污严重污染的泡沫盒", "瓶盖", "塑料尺"], correct: 1, reward: { token: 1 } },
  { theme: "paper", question: "纸箱回收前需要做什么？", options: ["保持干燥、拆掉胶带、压平", "用水洗干净", "剪成小碎片", "涂上颜色"], correct: 0, reward: { token: 2 } },
  { theme: "paper", question: "纸杯应该归到哪一类？", options: ["普通纸类（要看当地分类）", "全部是可回收", "有害垃圾", "厨余"], correct: 0, reward: { paper: 3 } },
  { theme: "textile", question: "旧 T 恤最环保的做法是什么？", options: ["直接丢垃圾桶", "先修补或捐赠", "烧掉", "埋进土里"], correct: 1, reward: { token: 2 } },
  { theme: "textile", question: "纽扣、拉链这些配件应该？", options: ["丢进垃圾", "拆下来收集可再利用", "混在布料里回收", "焚烧处理"], correct: 1, reward: { token: 1, fabric: 2 } },
  { theme: "general", question: "3D 打印纪念品券可以兑换什么？", options: ["游戏金币", "真实的回收主题纪念品", "食物", "电子游戏"], correct: 1, reward: { printShard: 1 } },
  { theme: "general", question: "公益基地的目的是什么？", options: ["赚钱", "听废品故事、学习分类、兑换公益品", "打游戏", "收藏垃圾"], correct: 1, reward: { token: 1 } }
];

let quizIndex = 0;
let quizAnswered = false;

function showQuiz() {
  closeModal();
  if (quizIndex >= quizData.length) { quizIndex = 0; }
  const q = quizData[quizIndex];
  const quizOv = document.getElementById("quizOverlay");
  const questionEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const resultEl = document.getElementById("quizResult");
  const nextBtn = document.getElementById("quizNext");
  if (!quizOv || !questionEl) return;
  quizOv.classList.remove("hidden");
  state.paused = true;
  quizAnswered = false;
  questionEl.textContent = q.question;
  resultEl.style.display = "none";
  resultEl.textContent = "";
  nextBtn.style.display = "none";
  optionsEl.innerHTML = q.options.map((opt, i) => 
    `<button class="quiz-option" data-idx="${i}">${String.fromCharCode(65+i)}. ${opt}</button>`
  ).join("");
  optionsEl.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const chosen = parseInt(btn.dataset.idx);
      const isCorrect = chosen === q.correct;
      btn.classList.add(isCorrect ? "correct" : "wrong");
      if (!isCorrect) {
        optionsEl.querySelectorAll(".quiz-option")[q.correct].classList.add("correct");
      }
      optionsEl.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
      resultEl.style.display = "block";
      resultEl.innerHTML = isCorrect 
        ? `<b>答对了！</b> 奖励：${costHtml(q.reward)}。` 
        : `<b>答错了。</b> 正确答案是 ${String.fromCharCode(65+q.correct)}. ${q.options[q.correct]}?`;
      if (isCorrect) {
        addReward(q.reward);
        saveGame();
      }
      nextBtn.style.display = "inline-block";
    });
  });
}

function quizNext() {
  quizIndex += 1;
  showQuiz();
}

function closeQuiz() {
  const quizOv = document.getElementById("quizOverlay");
  if (quizOv) quizOv.classList.add("hidden");
  state.paused = false;
}


function showStoryList() {
  showStory();
}

function itemEffectTags(item) {
  const tags = [slotName(item.slot)];
  if (item.attackType) tags.push({
    circle: "范围震荡",
    slash: "弧形挥砍",
    homing: "追踪子弹",
    hybrid: "混合攻击",
    burst: "多弹追踪",
    pierce: "穿透直线",
  }[item.attackType] || item.attackType);
  if (item.reflect) tags.push(`反伤 ${item.reflect}`);
  if (item.bind) tags.push(`束缚 ${item.bind}s`);
  if (item.lifesteal) tags.push(`击败回血 ${item.lifesteal}`);
  if (item.cooldownBoost) tags.push("冷却缩短");
  if (item.pickup) tags.push(`拾取 +${item.pickup}`);
  if (item.shield) tags.push(`护盾 +${item.shield}`);
  if (item.hp) tags.push(`生命 +${item.hp}`);
  if (item.speed) tags.push(`速度 +${item.speed}`);
  return tags.map((tag) => `<span class="cost">${tag}</span>`).join("");
}

function themeSuitDesc(themeId) {
  return {
    electronic: "电子套装偏追踪、电磁弹和稳定护盾，适合 Boss 与远距离输出。",
    plastic: "塑料套装偏多弹、拾取范围和机动性，适合小怪清理与材料收集。",
    paper: "纸板套装偏穿透、反伤和冷却缩短，适合尸潮与密集敌人。",
    textile: "布料套装偏缠绕、回复和持续作战，适合长时间推进。",
  }[themeId] || "";
}

function showInventory() {
  const stats = currentStats();
  const slotCards = ["weapon", "helmet", "armor", "boots"]
    .map((slot) => {
      const item = getEquip(save.equipped[slot]);
      return `<article class="equip-slot-card">
        <span>${slotName(slot)}</span>
        ${item ? `<img src="${imagePaths[item.img]}" alt="" /><strong>${item.name}</strong><small>${itemEffectTags(item)}</small>` : `<strong>未装备</strong>`}
      </article>`;
    })
    .join("");
  const themeSections = Object.values(themeConfigs)
    .map((theme) => {
      const items = equipments.filter((item) => (item.theme || "electronic") === theme.id);
      const owned = items.filter((item) => save.unlocked.includes(item.id)).length;
      return `<section class="equip-theme-block">
        <div class="equip-theme-head">
          <div><h3>${theme.name}套装</h3><p>${themeSuitDesc(theme.id)}</p></div>
          <span class="rarity">${owned}/${items.length}</span>
        </div>
        <div class="modal-grid">
          ${items
            .map((item) => {
              const unlocked = save.unlocked.includes(item.id);
              const equipped = save.equipped[item.slot] === item.id;
              return `<article class="card ${unlocked ? "good" : "locked"}">
                <div class="card-title"><img src="${imagePaths[item.img]}" alt="" /><span>${item.name}</span></div>
                <div class="cost-row">${itemEffectTags(item)}</div>
                <p>${item.desc}</p>
                <div class="cost-row">${costHtml(item.cost) || '<span class="cost">基础装备</span>'}</div>
                <button class="${equipped ? "quiet" : "primary"}" data-action="${unlocked ? "equip" : "unlock"}" data-id="${item.id}">${equipped ? "已穿戴" : unlocked ? "穿戴" : "解锁"}</button>
                ${equipped && item.slot !== "weapon" ? `<button class="quiet" data-action="unequip" data-slot="${item.slot}">脱下</button>` : ""}
              </article>`;
            })
            .join("")}
        </div>
      </section>`;
    })
    .join("");
  showModal(`
    <div class="modal-header">
      <div>
        <h2>装备间</h2>
        <p>四个废物主题对应四套装备方向。装备效果会真实影响战斗：追踪、多弹、穿透、反伤、缠绕、回血、冷却与拾取范围。</p>
      </div>
      <button class="quiet" data-action="close">关闭 Esc</button>
    </div>
    <div class="equip-layout">
      <aside class="equip-paperdoll">
        ${paperdollHtml()}
        <div class="equip-slot-grid">${slotCards}</div>
        <div class="stat-panel">
          <span>伤害 ${stats.damage}</span><span>冷却 ${stats.cooldown.toFixed(2)}s</span><span>移速 ${Math.round(stats.speed)}</span><span>拾取 ${stats.pickup}</span>
        </div>
        <button class="primary" data-action="openSkills">技能训练 / 选择 Q 技能</button>
      </aside>
      <div class="equip-theme-list">${themeSections}</div>
    </div>
    <div class="modal-footer">建议先按当前关卡主题解锁一套，再混搭：电子武器 + 纸板护甲 + 布料鞋也可以成立。</div>
  `, "bgLab");
}

function equip(id) {
  const item = getEquip(id);
  if (!item || !save.unlocked.includes(id)) return;
  save.equipped[item.slot] = id;
  recomputePlayerStats();
  saveGame();
  showInventory();
}

function unequip(slot) {
  if (slot === "weapon") return;
  save.equipped[slot] = "";
  recomputePlayerStats();
  saveGame();
  showInventory();
}

function craft(id) {
  selectSynth(id);
  doSynth();
}

function exchange(id) {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe || (save.souvenirs[id] || 0) <= 0) return;
  save.souvenirs[id] -= 1;
  save.points += recipe.points;
  save.redeemed.push(`${recipe.name} -> 公益点 +${recipe.points}`);
  saveGame();
  showExchange();
  toast("普通纪念品兑换完成。");
}

function exchangePrint(id) {
  const reward = printRewards.find((r) => r.id === id);
  if (!reward) return;
  if (!canAfford(reward.cost)) return toast("打印碎片不足，挑战 Boss 可获得。");
  consume(reward.cost);
  save.printTickets[id] = (save.printTickets[id] || 0) + 1;
  save.points += reward.points;
  save.redeemed.push(`${reward.name} -> 3D 打印券 +1`);
  saveGame();
  showExchange();
  toast("3D 废物打印兑换券已生成。");
}

function unlockBg(id) {
  const bg = backgrounds.find((b) => b.id === id);
  if (!bg || save.unlockedBackgrounds.includes(id)) return;
  if (!canAfford(bg.cost)) return toast("解锁背景的碎片不足。");
  consume(bg.cost);
  save.unlockedBackgrounds.push(id);
  save.currentBackground = id;
  saveGame();
  showBackgrounds();
  toast(`${bg.name} 已解锁并切换。`);
}

function selectBg(id) {
  if (!save.unlockedBackgrounds.includes(id)) return;
  save.currentBackground = id;
  saveGame();
  showBackgrounds();
  toast("主页背景已切换。");
}

function canAfford(cost) {
  return Object.entries(cost || {}).every(([key, val]) => getResource(key) >= val);
}

function consume(cost) {
  for (const [key, val] of Object.entries(cost || {})) {
    if (key === "printShard") save.printShard -= val;
    else save.scraps[key] -= val;
  }
}

function addReward(reward) {
  for (const [key, val] of Object.entries(reward || {})) {
    if (key === "printShard") save.printShard += val;
    else save.scraps[key] = (save.scraps[key] || 0) + val;
  }
}

function getResource(key) {
  if (key === "printShard") return save.printShard || 0;
  return save.scraps[key] || 0;
}

function costHtml(cost, label = "") {
  return Object.entries(cost || {})
    .map(([key, val]) => `<span class="cost">${label ? `${label}: ` : ""}${resourceName(key)} ×${val}</span>`)
    .join("");
}

function resourceName(key) {
  if (key === "printShard") return "打印碎片";
  return scrapTypes.find((s) => s[0] === key)?.[1] || key;
}

function slotName(slot) {
  return { weapon: "武器", helmet: "头盔", armor: "护甲", boots: "靴子" }[slot] || slot;
}

function showModal(html, bgKey = "bgHub") {
  state.paused = true;
  toastEl.classList.add("hidden");
  modal.innerHTML = html;
  modal.classList.remove("hidden");
}

function closeModal() {
  state.paused = false;
  modal.classList.add("hidden");
  modal.innerHTML = "";
}

function modalOpen() {
  return !modal.classList.contains("hidden");
}

function updateHud() {
  hpText.textContent = `${Math.ceil(player.hp)}/${player.maxHp}`;
  if (hpFill) hpFill.style.width = `${clamp(player.hp / player.maxHp, 0, 1) * 100}%`;
  shieldText.textContent = `${Math.ceil(player.shield)}/90`;
  if (shieldFill) shieldFill.style.width = `${clamp(player.shield / 90, 0, 1) * 100}%`;
  pointText.textContent = `${save.points}`;
  printText.textContent = `${save.printShard}`;
  const theme = currentTheme();
  if (hudMiniEl) {
    const relevant = theme.drops.filter((id) => id !== "token").slice(0, 3);
    hudMiniEl.innerHTML = relevant.map((id) => { const st = scrapTypes.find((s) => s[0] === id); return st ? `<span class="scrap-chip"><img src="${imagePaths[st[2]]}" alt="" />${save.scraps[id] || 0}</span>` : ""; }).join("");
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  if (!assetsReady) return drawLoading();
  if (state.scene === "title") {
    drawBg(imgs.bgHub);
    return;
  }
  if (state.scene === "hub") drawHub();
  if (state.scene === "battle") drawBattle();
  if (state.scene === "boss") drawBossBattle();
  if (state.scene === "horde") drawHorde();
  if (state.scene === "puzzle") drawPuzzle();
  drawPrompt();
}

function drawLoading() {
  ctx.fillStyle = "#dff7ff";
  ctx.fillRect(0, 0, W, H);
  drawGameText("正在整理回收站素材...", 420, 350, 34, "#10232d");
}

function currentHubBg() {
  const bg = backgrounds.find((b) => b.id === save.currentBackground) || backgrounds[0];
  return imgs[bg.img] || imgs.bgHub;
}

function drawHub() {
  drawBg(currentHubBg());
  drawWalkableGlow();
  for (const f of hubFacilities) drawFacility(f);
  drawPlayer();
  if (state.nearby) drawMarker(state.nearby.x, state.nearby.y - state.nearby.h / 2 - 18, "Enter");
}

function drawBattle() {
  const map = currentMap();
  drawWorldBg(imgs[map.img], map);
  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);
  drawArenaBounds(map.accent || "#ffd861");
  for (const obstacle of state.obstacles) drawObstacle(obstacle);
  for (const trap of state.traps) drawTrap(trap);
  drawPickupsAndCombat();
  if (state.battlePortal) drawBattlePortal();
  for (const enemy of state.enemies) drawEnemy(enemy);
  drawPlayer();
  drawSkillWorldEffects();
  ctx.restore();
  drawPortalArrow();
  drawSkillHud();
}

function drawPortalArrow() {
  if (!state.battlePortal) return;
  const dx = state.battlePortal.x - player.x;
  const dy = state.battlePortal.y - player.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 140) return;
  const angle = Math.atan2(dy, dx);
  const arrowX = player.x + Math.cos(angle) * 60;
  const arrowY = player.y - 50 + Math.sin(angle) * 40;
  ctx.save();
  ctx.translate(arrowX, arrowY);
  ctx.rotate(angle);
  ctx.fillStyle = "#ffd861";
  ctx.strokeStyle = "#0d1f2a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(-10, -12);
  ctx.lineTo(-4, 0);
  ctx.lineTo(-10, 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawHorde() {
  drawBattle();
  ctx.save();
  ctx.fillStyle = "rgba(9, 27, 38, 0.78)";
  ctx.strokeStyle = "#ffd861";
  ctx.lineWidth = 3;
  roundedRect(470, 170, 340, 54, 8, true);
  roundedRect(470, 170, 340, 54, 8, false);
  drawGameText(`尸潮 ${Math.ceil(state.hordeTime)}s  击败 ${state.hordeKills}/36`, 492, 205, 22, "#f7fff1", false);
  ctx.restore();
}

function drawPuzzle() {
  const map = currentMap();
  drawWorldBg(imgs[map.img], map);
  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);
  drawArenaBounds("#75ff9f");
  for (const obstacle of state.obstacles) drawObstacle(obstacle);
  drawPickupsAndCombat();
  const puzzle = state.puzzle;
  if (puzzle) {
    for (const station of puzzle.stations) drawPuzzleStation(station, station.id === puzzle.order[puzzle.step]);
  }
  drawPlayer();
  drawSkillWorldEffects();
  ctx.restore();
  if (puzzle) drawPuzzleHud(puzzle);
  drawSkillHud();
}

function drawPuzzleStation(station, active) {
  drawSprite(imgs[station.img], station.x, station.y, active ? 84 : 72, active ? 84 : 72);
  ctx.save();
  ctx.strokeStyle = active ? "#ffd861" : "rgba(117,255,159,0.55)";
  ctx.lineWidth = active ? 5 : 3;
  ctx.beginPath();
  ctx.arc(station.x, station.y, active ? 56 : 48, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  if (distance(player, station) < 86) drawMarker(station.x, station.y - 70, "Enter");
}

function drawPuzzleHud(puzzle) {
  const next = puzzle.order[puzzle.step];
  ctx.save();
  ctx.fillStyle = "rgba(9, 27, 38, 0.8)";
  ctx.strokeStyle = "#75ff9f";
  ctx.lineWidth = 3;
  roundedRect(390, 170, 500, 58, 8, true);
  roundedRect(390, 170, 500, 58, 8, false);
  drawGameText(`解密 ${puzzle.step + 1}/${puzzle.order.length}: ${resourceName(next)}  携带 ${puzzle.held[next] || 0}`, 416, 208, 22, "#f7fff1", false);
  ctx.restore();
}

function drawBossBattle() {
  const map = currentMap();
  drawWorldBg(imgs[map.img], map);
  ctx.save();
  ctx.translate(-state.camera.x + state.shakeX, -state.camera.y + state.shakeY);
  ctx.fillStyle = "rgba(6, 20, 31, 0.28)";
  ctx.fillRect(0, 0, state.world.w, state.world.h);
  drawArenaBounds("#30e4e0");
  drawBossFloor();
  for (const obstacle of state.obstacles) drawObstacle(obstacle);
  drawPickupsAndCombat();
  for (const enemy of state.enemies) drawEnemy(enemy);
  if (state.boss) drawBoss(state.boss);
  if (state.battlePortal) drawBattlePortal();
  drawPlayer();
  drawSkillWorldEffects();
  drawBossDamageFloaters();
  ctx.restore();
  if (state.boss && !state.boss.defeated) drawBossHud(state.boss);
  drawPortalArrow();
  drawSkillHud();
}

function drawPickupsAndCombat() {
  drawTrapTelegraphs();
  drawSpawnWarnings();
  for (const pickup of state.pickups) drawPickup(pickup);
  drawDashTrail();
  drawAttackTrails();
  drawCombatRings();
  for (const shot of state.enemyShots) drawEnemyShot(shot);
  for (const wave of state.shockwaves) drawShockwave(wave);
  for (const projectile of state.projectiles) drawProjectile(projectile);
  for (const attack of state.attacks) drawAttack(attack);
  drawWeaponAura();
  drawParticles();
  drawSpriteEffects();
  drawDamageNumbers();
  drawBossFlash();
}

function drawBg(img) {
  ctx.fillStyle = "#c9eddc";
  ctx.fillRect(0, 0, W, H);
  if (!img) return;
  const scale = Math.max(W / img.width, H / img.height);
  const sw = W / scale;
  const sh = H / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(0, 0, W, H);
}

function drawWorldBg(img, map) {
  const themeId = map?.theme || save.currentTheme || "electronic";
  const themeColors = {
    electronic: { floor: "#0d1f2d", floor2: "#132838", line: "#1a3a4a", accent: "#30e4e0", glow: "rgba(48,228,224,0.08)" },
    plastic: { floor: "#0a1928", floor2: "#0e2138", line: "#163050", accent: "#3d93ff", glow: "rgba(61,147,255,0.08)" },
    paper: { floor: "#1a1410", floor2: "#241c16", line: "#332820", accent: "#d6a65c", glow: "rgba(214,166,92,0.08)" },
    textile: { floor: "#0d1c14", floor2: "#122618", line: "#1a3020", accent: "#46d57a", glow: "rgba(70,213,122,0.08)" },
  };
  const tc = themeColors[themeId] || themeColors.electronic;
  const world = state.world || { w: W, h: H };

  ctx.fillStyle = tc.floor;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.translate(-state.camera.x + state.shakeX, -state.camera.y + state.shakeY);

  // Floor tiles with subtle variation and noise
  const ts = 80;
  for (let x = 0; x < world.w; x += ts) {
    for (let y = 0; y < world.h; y += ts) {
      const odd = (Math.floor(x / ts) + Math.floor(y / ts)) % 2;
      ctx.fillStyle = odd ? tc.floor2 : tc.floor;
      ctx.fillRect(x, y, ts, ts);
      // Subtle noise highlight on some tiles
      if ((x * 7 + y * 13) % 5 === 0) {
        ctx.globalAlpha = 0.03;
        ctx.fillStyle = tc.accent;
        ctx.fillRect(x, y, ts, ts);
        ctx.globalAlpha = 1;
      }
    }
  }

  // Grid lines
  ctx.strokeStyle = tc.line;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.5;
  for (let x = 0; x <= world.w; x += ts) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, world.h);
    ctx.stroke();
  }
  for (let y = 0; y <= world.h; y += ts) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(world.w, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Theme-specific decorations
  drawThemeDecorations(themeId, world, tc);

  // Tint overlay
  ctx.fillStyle = map?.tint || tc.glow;
  ctx.fillRect(0, 0, world.w, world.h);

  // Border glow
  ctx.strokeStyle = tc.accent;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 6;
  ctx.strokeRect(44, 68, world.w - 88, world.h - 104);
  ctx.globalAlpha = 1;

  // Corner brackets
  const cb = 30;
  ctx.strokeStyle = tc.accent;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 4;
  const corners = [[44, 68], [world.w - 44, 68], [44, world.h - 36], [world.w - 44, world.h - 36]];
  for (const [cx, cy] of corners) {
    const dx = cx < world.w / 2 ? 1 : -1;
    const dy = cy < world.h / 2 ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(cx, cy + cb * dy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + cb * dx, cy);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.restore();

  // Screen vignette
  const vgrd = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.7);
  vgrd.addColorStop(0, "rgba(0,0,0,0)");
  vgrd.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = vgrd;
  ctx.fillRect(0, 0, W, H);

  // Ambient battle dust
  if (["battle", "boss", "horde"].includes(state.scene) && Math.random() < 0.3) {
    const dx = state.camera.x + Math.random() * W;
    const dy = state.camera.y + Math.random() * H;
    spawnParticles(dx, dy, 1, {
      color: tc.accent, speedMin: 5, speedMax: 20,
      rMin: 1, rMax: 2, ttlMin: 1.0, ttlMax: 2.0, glow: true, friction: 0.98,
    });
  }
}

function drawThemeDecorations(themeId, world, tc) {
  const t = performance.now() / 1000;
  if (themeId === "electronic") {
    // Circuit board: glowing traces with pulsing nodes and data packets
    ctx.strokeStyle = tc.accent;
    ctx.lineWidth = 2;
    const traces = [
      [200, 150, 560, 150], [560, 150, 560, 400], [560, 400, 900, 400],
      [200, 600, 480, 600], [480, 600, 480, 850], [480, 850, 820, 850],
      [1200, 200, 1500, 200], [1500, 200, 1500, 500], [1500, 500, 2800, 500],
      [1100, 700, 1400, 700], [1400, 700, 1400, 1000], [1400, 1000, 2200, 1000],
      [2200, 300, 2600, 300], [2600, 300, 2600, 700], [2600, 700, 3000, 700],
      [200, 1200, 600, 1200], [600, 1200, 600, 1600], [600, 1600, 1000, 1600],
      [1800, 1400, 2400, 1400], [2400, 1400, 2400, 1900], [2400, 1900, 3000, 1900],
      [200, 1800, 500, 1800], [500, 1800, 500, 2200], [500, 2200, 1200, 2200],
      [1600, 2000, 2200, 2000], [2200, 2000, 2200, 2300], [2200, 2300, 3000, 2300],
    ];
    for (let i = 0; i < traces.length; i++) {
      const [x1, y1, x2, y2] = traces[i];
      ctx.globalAlpha = 0.08 + Math.sin(t * 1.5 + i * 0.7) * 0.04;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      // Data packet traveling along trace
      const progress = ((t * 0.3 + i * 0.15) % 1);
      const px = x1 + (x2 - x1) * progress;
      const py = y1 + (y2 - y1) * progress;
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = tc.accent;
      ctx.shadowBlur = 8;
      ctx.shadowColor = tc.accent;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    // Junction nodes (pulsing)
    const nodes = [[200,150],[560,400],[900,400],[480,600],[480,850],[820,850],
      [1200,200],[1500,500],[2800,500],[1400,700],[1400,1000],[2200,1000],
      [2600,300],[2600,700],[3000,700],[600,1200],[600,1600],[1000,1600],
      [2400,1400],[2400,1900],[3000,1900],[500,1800],[500,2200],[1200,2200]];
    for (let i = 0; i < nodes.length; i++) {
      const [nx, ny] = nodes[i];
      const pulse = 0.3 + Math.sin(t * 2 + i * 0.5) * 0.15;
      ctx.globalAlpha = pulse;
      ctx.fillStyle = tc.accent;
      ctx.shadowBlur = 6;
      ctx.shadowColor = tc.accent;
      ctx.beginPath();
      ctx.arc(nx, ny, 5, 0, Math.PI * 2);
      ctx.fill();
      // Outer ring
      ctx.globalAlpha = pulse * 0.4;
      ctx.strokeStyle = tc.accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(nx, ny, 10 + Math.sin(t * 3 + i) * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    // CPU chip decorations
    for (let i = 0; i < 5; i++) {
      const cx = 400 + i * 600 + (i % 2) * 200;
      const cy = 300 + Math.floor(i / 2) * 800;
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = tc.accent;
      ctx.fillRect(cx, cy, 80, 80);
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = tc.accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(cx, cy, 80, 80);
      // Pin legs
      for (let p = 0; p < 4; p++) {
        ctx.beginPath();
        ctx.moveTo(cx + 15 + p * 17, cy);
        ctx.lineTo(cx + 15 + p * 17, cy - 8);
        ctx.moveTo(cx + 15 + p * 17, cy + 80);
        ctx.lineTo(cx + 15 + p * 17, cy + 88);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  } else if (themeId === "plastic") {
    // Conveyor belts with moving stripes and rollers
    for (let i = 0; i < 4; i++) {
      const by = 180 + i * 550;
      const bh = 50;
      // Belt body
      ctx.fillStyle = "rgba(61,147,255,0.06)";
      ctx.fillRect(0, by, world.w, bh);
      // Belt edge rails
      ctx.strokeStyle = "rgba(61,147,255,0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, by);
      ctx.lineTo(world.w, by);
      ctx.moveTo(0, by + bh);
      ctx.lineTo(world.w, by + bh);
      ctx.stroke();
      // Moving diagonal stripes
      ctx.strokeStyle = "rgba(61,147,255,0.15)";
      ctx.lineWidth = 3;
      const offset = (t * 80) % 50;
      for (let x = -offset; x < world.w; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, by + 5);
        ctx.lineTo(x + 25, by + bh - 5);
        ctx.stroke();
      }
      // Roller ends
      for (let rx = 100; rx < world.w; rx += 800) {
        ctx.fillStyle = "rgba(61,147,255,0.12)";
        ctx.beginPath();
        ctx.arc(rx, by + bh / 2, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(61,147,255,0.25)";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Rotating spoke
        const rot = t * 3 + rx * 0.01;
        ctx.beginPath();
        ctx.moveTo(rx, by + bh / 2);
        ctx.lineTo(rx + Math.cos(rot) * 14, by + bh / 2 + Math.sin(rot) * 14);
        ctx.stroke();
      }
    }
    // Plastic bottle silhouettes scattered
    for (let i = 0; i < 8; i++) {
      const bx = 200 + (i * 380) % (world.w - 200);
      const by = 100 + ((i * 270) % (world.h - 200));
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "#3d93ff";
      ctx.beginPath();
      ctx.ellipse(bx, by, 14, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(bx - 5, by - 38, 10, 12);
    }
    ctx.globalAlpha = 1;
  } else if (themeId === "paper") {
    // Stacked cardboard boxes with flutes and tape
    for (let i = 0; i < 16; i++) {
      const bx = 120 + (i % 4) * 780 + Math.floor(i / 4) * 200;
      const by = 100 + Math.floor(i / 4) * 600;
      const bw = 180, bh = 130;
      // Box body
      ctx.fillStyle = "rgba(214,166,92,0.05)";
      ctx.fillRect(bx, by, bw, bh);
      // Corrugated flutes
      ctx.strokeStyle = "rgba(214,166,92,0.08)";
      ctx.lineWidth = 1;
      for (let fx = bx; fx < bx + bw; fx += 8) {
        ctx.beginPath();
        ctx.moveTo(fx, by);
        ctx.lineTo(fx, by + bh);
        ctx.stroke();
      }
      // Box outline
      ctx.strokeStyle = "rgba(214,166,92,0.18)";
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, by, bw, bh);
      // Tape seam
      ctx.strokeStyle = "rgba(214,166,92,0.25)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx, by + bh / 2);
      ctx.lineTo(bx + bw, by + bh / 2);
      ctx.stroke();
      // Recycle symbol
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "rgba(214,166,92,0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(bx + bw / 2, by + bh / 2, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    // Paper sheet stacks
    for (let i = 0; i < 6; i++) {
      const sx = 300 + i * 500;
      const sy = 200 + (i % 3) * 700;
      ctx.fillStyle = "rgba(214,166,92,0.03)";
      for (let j = 0; j < 5; j++) {
        ctx.fillRect(sx + j * 3, sy + j * 2, 120, 80);
      }
      ctx.strokeStyle = "rgba(214,166,92,0.1)";
      ctx.lineWidth = 1;
      ctx.strokeRect(sx, sy, 120, 80);
    }
  } else if (themeId === "textile") {
    // Fabric rolls with warp/weft pattern
    for (let i = 0; i < 8; i++) {
      const bx = 200 + (i % 3) * 1000;
      const by = 150 + Math.floor(i / 3) * 800;
      const rw = 160, rh = 100;
      // Roll body
      ctx.fillStyle = "rgba(70,213,122,0.04)";
      ctx.fillRect(bx, by, rw, rh);
      // Warp threads (vertical)
      ctx.strokeStyle = "rgba(70,213,122,0.08)";
      ctx.lineWidth = 1;
      for (let wx = bx; wx <= bx + rw; wx += 6) {
        ctx.beginPath();
        ctx.moveTo(wx, by);
        ctx.lineTo(wx, by + rh);
        ctx.stroke();
      }
      // Weft threads (horizontal, animated shimmer)
      ctx.strokeStyle = "rgba(70,213,122,0.06)";
      for (let wy = by; wy <= by + rh; wy += 6) {
        ctx.globalAlpha = 0.06 + Math.sin(t * 2 + wy * 0.1) * 0.03;
        ctx.beginPath();
        ctx.moveTo(bx, wy);
        ctx.lineTo(bx + rw, wy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // Roll outline
      ctx.strokeStyle = "rgba(70,213,122,0.15)";
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, by, rw, rh);
    }
    // Stitching lines
    ctx.strokeStyle = "rgba(70,213,122,0.12)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    for (let i = 0; i < 10; i++) {
      const sx = 100 + i * 320;
      const offset = (t * 20) % 10;
      ctx.beginPath();
      ctx.moveTo(sx, 80);
      ctx.lineTo(sx, world.h - 80);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    // Thread spools
    for (let i = 0; i < 6; i++) {
      const tx = 300 + (i * 550) % (world.w - 300);
      const ty = 200 + ((i * 400) % (world.h - 300));
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "#46d57a";
      ctx.beginPath();
      ctx.ellipse(tx, ty, 20, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(70,213,122,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }
}

function drawMapGrid(world, color) {
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  for (let x = 80; x < world.w; x += 160) {
    ctx.beginPath();
    ctx.moveTo(x, 82);
    ctx.lineTo(x, world.h - 82);
    ctx.stroke();
  }
  for (let y = 80; y < world.h; y += 160) {
    ctx.beginPath();
    ctx.moveTo(82, y);
    ctx.lineTo(world.w - 82, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWalkableGlow() {
  ctx.fillStyle = "rgba(229,255,240,0.36)";
  roundedRect(86, 256, 1096, 382, 18, true);
}

function drawArenaBounds(color) {
  const world = cameraScene() ? state.world : { w: W, h: H };
  ctx.strokeStyle = color || "#ffd861";
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 4;
  ctx.strokeRect(44, 68, world.w - 88, world.h - 104);
  // Corner brackets
  ctx.lineWidth = 6;
  ctx.globalAlpha = 0.8;
  const cl = 40;
  const corners = [[44, 68], [world.w - 44, 68], [44, world.h - 36], [world.w - 44, world.h - 36]];
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    if (cx < world.w / 2) { ctx.moveTo(cx, cy + cl); ctx.lineTo(cx, cy); ctx.lineTo(cx + cl, cy); }
    else { ctx.moveTo(cx, cy + cl); ctx.lineTo(cx, cy); ctx.lineTo(cx - cl, cy); }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawBossFloor() {
  ctx.save();
  const boss = state.boss || { x: 840, y: 365 };
  ctx.translate(boss.x, boss.y + 16);
  for (let i = 0; i < 4; i += 1) {
    ctx.strokeStyle = i % 2 ? "rgba(48,228,224,0.28)" : "rgba(70,213,122,0.32)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 108 + i * 42 + Math.sin(performance.now() / 420) * 8, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFacility(f) {
  drawSprite(imgs[f.img], f.x, f.y, f.w, f.h);
  drawFacilityLabel(f);
}

function drawFacilityLabel(f) {
  ctx.save();
  ctx.font = "950 15px MicrosoftYaHei, PingFangSC, SimHei, sans-serif";
  const text = f.name;
  const width = Math.min(116, ctx.measureText(text).width + 18);
  const x = f.x - width / 2;
  const y = f.y + f.h / 2 + 8;
  ctx.fillStyle = "rgba(247,255,238,0.94)";
  ctx.strokeStyle = "#10232d";
  ctx.lineWidth = 3;
  roundedRect(x, y, width, 26, 6, true);
  roundedRect(x, y, width, 26, 6, false);
  ctx.fillStyle = "#10232d";
  ctx.fillText(text, x + 9, y + 18);
  ctx.restore();
}

function drawObstacle(o) {
  const theme = o.theme || save.currentTheme || "electronic";
  const themeAccent = { electronic: "#30e4e0", plastic: "#3d93ff", paper: "#d6a65c", textile: "#46d57a" }[theme] || "#30e4e0";
  const themeFill = { electronic: "rgba(20,50,65,0.6)", plastic: "rgba(15,40,65,0.6)", paper: "rgba(45,35,25,0.6)", textile: "rgba(20,45,30,0.6)" }[theme] || "rgba(20,50,65,0.6)";
  ctx.fillStyle = themeFill;
  ctx.fillRect(o.x, o.y, o.w, o.h);
  ctx.strokeStyle = themeAccent;
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 3;
  ctx.strokeRect(o.x, o.y, o.w, o.h);
  // Inner detail line
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1;
  ctx.strokeRect(o.x + 6, o.y + 6, o.w - 12, o.h - 12);
  ctx.globalAlpha = 1;
  // Corner accent dots
  ctx.fillStyle = themeAccent;
  ctx.globalAlpha = 0.8;
  const r = 3;
  ctx.beginPath();
  ctx.arc(o.x + 4, o.y + 4, r, 0, Math.PI * 2);
  ctx.arc(o.x + o.w - 4, o.y + 4, r, 0, Math.PI * 2);
  ctx.arc(o.x + 4, o.y + o.h - 4, r, 0, Math.PI * 2);
  ctx.arc(o.x + o.w - 4, o.y + o.h - 4, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawTrap(t) {
  // Idle warning glow
  const pulse = Math.sin(performance.now() / 400) * 0.15 + 0.25;
  ctx.save();
  ctx.globalAlpha = pulse;
  ctx.fillStyle = "#ff4444";
  ctx.beginPath();
  ctx.arc(t.x, t.y, t.w * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  drawSprite(imgs[t.img], t.x, t.y, t.w, t.h);
  if (t.cd > 0) {
    ctx.fillStyle = "rgba(240,82,95,0.24)";
    const r = trapRect(t);
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // Activation spark particles on cooldown start
    if (t.cd > 1.4) {
      spawnParticles(t.x, t.y, 3, {
        color: "#ff6666", speedMin: 40, speedMax: 100,
        rMin: 1, rMax: 3, ttlMin: 0.2, ttlMax: 0.4, glow: true, friction: 0.85,
      });
    }
  }
}

function drawPickup(p) {
  const y = p.y + Math.sin(performance.now() / 240 + p.bob) * 5;
  if (p.kind === "buff") {
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#75ff9f";
  } else {
    ctx.shadowBlur = 6;
    ctx.shadowColor = "#ffd861";
  }
  drawSprite(imgs[p.img], p.x, y, p.kind === "buff" ? 42 : 36, p.kind === "buff" ? 42 : 36);
  ctx.shadowBlur = 0;
}

function drawBattlePortal() {
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
    drawGameText("传送门 Enter", p.x - 50, p.y - 90, 16, "#46d57a", true);
  }
}

function drawEnemy(enemy) {
  const hitFlash = enemy.hitCd > 0 && Math.floor(enemy.hitCd * 30) % 2 === 0;
  const bob = enemyBob(enemy, performance.now() / 1000);
  const recoil = enemyRecoil(enemy);
  const ex = enemy.x + recoil.x;
  const ey = enemy.y + recoil.y + bob;
  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.ellipse(enemy.x, enemy.y + enemy.h / 2 + 4, enemy.w * 0.4, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  if (enemy.hitCd > 0) ctx.globalAlpha = 0.72;
  drawSprite(imgs[enemy.img], ex, ey, enemy.w, enemy.h);
  if (hitFlash) {
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.6;
    drawSprite(imgs[enemy.img], ex, ey, enemy.w, enemy.h);
    ctx.globalCompositeOperation = "source-over";
  }
  ctx.globalAlpha = 1;
  drawBar(enemy.x - 34, enemy.y - enemy.h / 2 - 14, 68, 8, enemy.hp / enemy.maxHp, "#f0525f");
}

function drawBoss(boss) {
  const pulse = Math.sin(performance.now() / 180) * 7;
  if (boss.hitCd > 0) ctx.globalAlpha = 0.7;
  drawSprite(imgs.bossCat, boss.x, boss.y + pulse * 0.2, boss.w, boss.h);
  ctx.globalAlpha = 1;
}

function drawBossHud(boss) {
  const pct = clamp(boss.hp / boss.maxHp, 0, 1);
  const portraitUi = canvas.clientHeight > canvas.clientWidth * 1.3;
  const w = 590;
  const h = 54;
  const x = W / 2 - w / 2;
  const y = portraitUi ? 416 : 478;
  ctx.save();
  ctx.fillStyle = "rgba(9, 27, 38, 0.86)";
  ctx.strokeStyle = "#f7fff1";
  ctx.lineWidth = 3;
  roundedRect(x, y, w, h, 8, true);
  roundedRect(x, y, w, h, 8, false);
  drawGameText(`${boss.name}  Phase ${boss.phase}  ${Math.ceil(pct * 100)}%`, x + 18, y + 22, 18, "#f7fff1", false);
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  roundedRect(x + 18, y + 30, w - 36, 14, 5, true);
  const grd = ctx.createLinearGradient(x + 18, y, x + w - 18, y);
  grd.addColorStop(0, boss.phase >= 3 ? "#f0525f" : "#30e4e0");
  grd.addColorStop(1, boss.phase >= 3 ? "#ffd861" : "#75ff9f");
  ctx.fillStyle = grd;
  roundedRect(x + 18, y + 30, (w - 36) * pct, 14, 5, true);
  ctx.restore();
}

function drawBossDamageFloaters() {
  for (const floater of state.bossDamageFloaters) {
    ctx.globalAlpha = clamp(floater.ttl / 0.72, 0, 1);
    drawGameText(`-${floater.value}`, floater.x, floater.y, 22, "#ffd861");
    ctx.globalAlpha = 1;
  }
}

function drawEnemyShot(shot) {
  // Trail particles
  if (Math.random() < 0.5) {
    spawnParticles(shot.x, shot.y, 1, {
      color: "#33f1ff", speedMin: 5, speedMax: 15,
      rMin: 1, rMax: 2, ttlMin: 0.1, ttlMax: 0.2, glow: true, friction: 0.9,
    });
  }
  ctx.shadowBlur = 12;
  ctx.shadowColor = "#33f1ff";
  ctx.fillStyle = "#33f1ff";
  ctx.beginPath();
  ctx.arc(shot.x, shot.y, shot.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.arc(shot.x, shot.y, shot.r * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#10232d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(shot.x, shot.y, shot.r, 0, Math.PI * 2);
  ctx.stroke();
}

function drawShockwave(wave) {
  ctx.shadowBlur = 16;
  ctx.shadowColor = "#ffd861";
  ctx.strokeStyle = "rgba(255,216,97,0.9)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(wave.x, wave.y, wave.r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(wave.x, wave.y, wave.r - 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function drawProjectile(p) {
  if (Math.random() < 0.4) {
    spawnParticles(p.x, p.y, 1, {
      color: "#75ff9f", speedMin: 5, speedMax: 15,
      rMin: 1, rMax: 2, ttlMin: 0.1, ttlMax: 0.2, glow: true, friction: 0.9,
    });
  }
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#75ff9f";
  ctx.fillStyle = "#75ff9f";
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#10232d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.stroke();
}

function drawAttack(a) {
  if (a.type === "circle" || a.type === "muzzle") {
    const isMuzzle = a.type === "muzzle";
    const radius = a.r * (0.8 + a.ttl);
    const baseColor = isMuzzle ? "#75ff9f" : "#30e4e0";
    // Spawn expanding ring on first frame
    if (a.ttl > 0.28) spawnCombatRing(a.x, a.y, isMuzzle ? "#75ff9f" : "#30e4e0", radius * 1.2, 0.35);
    ctx.shadowBlur = 20;
    ctx.shadowColor = baseColor;
    // Outer ring
    ctx.strokeStyle = isMuzzle ? "rgba(117,255,159,0.9)" : "rgba(48,228,224,0.9)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(a.x, a.y, radius, 0, Math.PI * 2);
    ctx.stroke();
    // Inner ring
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(a.x, a.y, radius - 5, 0, Math.PI * 2);
    ctx.stroke();
    // Radial fill flash
    if (!isMuzzle) {
      const grd = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, radius);
      grd.addColorStop(0, "rgba(48,228,224,0.15)");
      grd.addColorStop(0.7, "rgba(48,228,224,0.05)");
      grd.addColorStop(1, "rgba(48,228,224,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(a.x, a.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }
  if (a.type === "slash") {
    if (a.ttl > 0.2) spawnAttackTrail(a.x, a.y, "#ffd861", Math.atan2(a.ny, a.nx), 0.25);
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(Math.atan2(a.ny, a.nx));
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#ffd861";
    const grd = ctx.createLinearGradient(-20, -45, 130, 45);
    grd.addColorStop(0, "rgba(255,255,255,0)");
    grd.addColorStop(0.35, "rgba(255,216,97,0.92)");
    grd.addColorStop(1, "rgba(48,228,224,0.62)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(-24, -54);
    ctx.quadraticCurveTo(102, -74, 150, 0);
    ctx.quadraticCurveTo(102, 74, -24, 54);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  if (a.type === "pierce") {
    if (a.ttl > 0.2) spawnAttackTrail(a.x, a.y, "#30e4e0", Math.atan2(a.ny, a.nx), 0.2);
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(Math.atan2(a.ny, a.nx));
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#30e4e0";
    ctx.fillStyle = "rgba(255,255,255,0.74)";
    ctx.strokeStyle = "rgba(48,228,224,0.9)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(18, -20);
    ctx.lineTo(a.r + 80, 0);
    ctx.lineTo(18, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

function drawSkillWorldEffects() {
  for (const effect of state.skillEffects) {
    const pct = clamp(effect.ttl / (effect.type === "shield" ? 5 : effect.type === "power" ? 8 : effect.type === "reflect" ? 7 : 1), 0, 1);
    ctx.save();
    if (effect.type === "shield") {
      ctx.strokeStyle = "rgba(117,255,159,0.8)";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.r + Math.sin(performance.now() / 130) * 7, 0, Math.PI * 2);
      ctx.stroke();
    } else if (effect.type === "screen") {
      ctx.strokeStyle = "rgba(255,216,97,0.82)";
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.r * (1.1 - pct * 0.35), 0, Math.PI * 2);
      ctx.stroke();
    } else if (effect.type === "power") {
      ctx.strokeStyle = "rgba(255,82,126,0.72)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.r + Math.sin(performance.now() / 90) * 10, 0, Math.PI * 2);
      ctx.stroke();
    } else if (effect.type === "slow" || effect.type === "freeze") {
      ctx.strokeStyle = effect.type === "freeze" ? "rgba(125,229,255,0.82)" : "rgba(127,139,255,0.7)";
      ctx.lineWidth = 6;
      ctx.setLineDash([18, 10]);
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.r, 0, Math.PI * 2);
      ctx.stroke();
    } else if (effect.type === "magnet" || effect.type === "bind") {
      ctx.strokeStyle = effect.type === "magnet" ? "rgba(48,228,224,0.76)" : "rgba(70,213,122,0.8)";
      ctx.lineWidth = 6;
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, effect.r - i * 38 + Math.sin(performance.now() / 120) * 8, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (effect.type === "heal") {
      ctx.fillStyle = "rgba(117,255,159,0.22)";
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.r * (1.2 - pct * 0.2), 0, Math.PI * 2);
      ctx.fill();
    } else if (effect.type === "dash") {
      ctx.strokeStyle = "rgba(255,216,97,0.9)";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.r * pct, 0, Math.PI * 2);
      ctx.stroke();
    } else if (effect.type === "reflect") {
      ctx.strokeStyle = "rgba(255,248,218,0.92)";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.r, 0, Math.PI * 2);
      ctx.stroke();
    } else if (effect.type === "drone") {
      const angle = performance.now() / 220;
      drawSprite(imgs.facilityTerminal, effect.x + Math.cos(angle) * 78, effect.y + Math.sin(angle) * 50 - 52, 42, 42);
    }
    ctx.restore();
  }
}

function drawSkillHud() {
  const skill = currentSkill();
  const ready = player.skillCd <= 0;
  ctx.save();
  const x = W - 252;
  const y = H - 122;
  ctx.fillStyle = ready ? "rgba(232,255,240,0.94)" : "rgba(245,248,255,0.86)";
  ctx.strokeStyle = "#10232d";
  ctx.lineWidth = 4;
  roundedRect(x, y, 220, 52, 8, true);
  roundedRect(x, y, 220, 52, 8, false);
  drawSprite(imgs[skill.img], x + 28, y + 26, 36, 36);
  drawGameText(`Q ${skill.name}`, x + 54, y + 23, 16, "#10232d", false);
  drawGameText(ready ? "可释放" : `冷却 ${Math.ceil(player.skillCd)}s`, x + 54, y + 43, 15, ready ? "#14834d" : "#b1424d", false);
  ctx.restore();
}

function drawPlayer() {
  const moving = Boolean(movementVector().dx || movementVector().dy);
  const step = Math.floor(player.frame * 8) % 2;
  const atkPulse = player.attackAnim > 0 ? 1 + player.attackAnim * 0.3 : 1;
  const pickGlow = player.pickupFlash > 0;
  // Spawn movement dust
  updateMovementDust(1/60, moving);
  // Attack swing arc effect
  if (player.attackAnim > 0) {
    const swingAngle = (1 - player.attackAnim) * Math.PI * 1.5;
    const dir = player.dir || "down";
    const baseAngle = dir.includes("up") ? -Math.PI/2 : dir.includes("down") ? Math.PI/2 : dir.includes("left") ? Math.PI : 0;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(baseAngle + swingAngle);
    ctx.globalAlpha = player.attackAnim * 0.4;
    ctx.globalCompositeOperation = "lighter";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#ffd861";
    ctx.strokeStyle = "#ffd861";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 40, -0.4, 0.4);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  let img = imgs.heroFront;
  const dir = player.dir || "down";
  if (dir.includes("up")) img = moving ? (step ? imgs.heroWalkBack1 : imgs.heroWalkBack2) : (imgs.heroIdleBack || imgs.heroFront);
  else if (dir.includes("down")) img = moving ? (step ? imgs.heroWalkFront1 : imgs.heroWalkFront2) : imgs.heroFront;
  else img = moving ? (step ? imgs.heroWalkRight1 : imgs.heroWalkRight2) : (imgs.heroIdleRight || imgs.heroWalkRight1);
  if (pickGlow) {
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffd861";
  }
  if (player.hurtCd > 0 && Math.floor(player.hurtCd * 20) % 2 === 0) ctx.globalAlpha = 0.5;
  const pw = 72 * atkPulse, ph = 72 * atkPulse;
  ctx.save();
  if (dir.includes("left")) { ctx.translate(player.x, player.y); ctx.scale(-1, 1); drawSprite(img, 0, 0, pw, ph); }
  else drawSprite(img, player.x, player.y, pw, ph);
  ctx.restore();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  drawPlayerEquipment();
  drawBar(player.x - 30, player.y - 52, 60, 6, player.hp / player.maxHp, "#46d57a");
}

function drawPlayerEquipment() {
  const helmet = getEquip(save.equipped.helmet);
  const armor = getEquip(save.equipped.armor);
  const weapon = getEquip(save.equipped.weapon);
  const flip = (player.dir || "down").includes("left");
  ctx.save();
  if (flip) { ctx.translate(player.x, player.y); ctx.scale(-1, 1); ctx.translate(-player.x, -player.y); }
  if (armor && imgs[armor.img]) { ctx.globalAlpha = 0.82; drawSprite(imgs[armor.img], player.x, player.y + 8, 36, 36); ctx.globalAlpha = 1; }
  if (helmet && imgs[helmet.img]) { ctx.globalAlpha = 0.9; drawSprite(imgs[helmet.img], player.x, player.y - 30, 30, 30); ctx.globalAlpha = 1; }
  if (weapon && imgs[weapon.img]) { ctx.globalAlpha = 0.95; drawSprite(imgs[weapon.img], player.x + 22, player.y + 14, 28, 28); ctx.globalAlpha = 1; }
  ctx.restore();
}

function drawSprite(img, x, y, w, h) {
  if (!img) return;
  ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
}

function drawPrompt() {
  const text = state.prompt || "WASD 移动 · Enter 互动";
  const portraitUi = canvas.clientHeight > canvas.clientWidth * 1.3;
  const y = portraitUi ? H - 178 : H - 58;
  ctx.save();
  ctx.font = "950 20px MicrosoftYaHei, PingFangSC, SimHei, sans-serif";
  const pad = 18;
  const width = Math.min(980, ctx.measureText(text).width + pad * 2);
  const x = W / 2 - width / 2;
  const grd = ctx.createLinearGradient(x, y, x + width, y + 40);
  grd.addColorStop(0, "rgba(250,255,238,0.95)");
  grd.addColorStop(1, "rgba(207,250,255,0.95)");
  ctx.fillStyle = grd;
  ctx.strokeStyle = "#10232d";
  ctx.lineWidth = 4;
  roundedRect(x, y, width, 42, 8, true);
  roundedRect(x, y, width, 42, 8, false);
  drawGameText(text, x + pad, y + 28, 20, "#10232d", false);
  ctx.restore();
}

function drawGameText(text, x, y, size, color, shadow = true) {
  ctx.save();
  ctx.font = `950 ${size}px MicrosoftYaHei, PingFangSC, SimHei, sans-serif`;
  if (shadow) {
    ctx.fillStyle = "rgba(48,228,224,0.6)";
    ctx.fillText(text, x + 2, y + 2);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawMarker(x, y, text) {
  ctx.save();
  ctx.font = "950 18px MicrosoftYaHei, PingFangSC, SimHei, sans-serif";
  const width = ctx.measureText(text).width + 24;
  ctx.fillStyle = "#ffd861";
  ctx.strokeStyle = "#10232d";
  ctx.lineWidth = 4;
  roundedRect(x - width / 2, y - 18, width, 34, 6, true);
  roundedRect(x - width / 2, y - 18, width, 34, 6, false);
  ctx.fillStyle = "#10232d";
  ctx.fillText(text, x - width / 2 + 12, y + 6);
  ctx.restore();
}

function drawBar(x, y, w, h, pct, color) {
  ctx.fillStyle = "#10232d";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fillRect(x + 2, y + 2, Math.max(0, w - 4) * clamp(pct, 0, 1), h - 4);
}

function roundedRect(x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  if (fill) ctx.fill();
  else ctx.stroke();
}

function entityRect(e) {
  return { x: e.x - e.w * 0.36, y: e.y - e.h * 0.22, w: e.w * 0.72, h: e.h * 0.52 };
}

function bossRect(b) {
  return { x: b.x - b.w * 0.34, y: b.y - b.h * 0.34, w: b.w * 0.68, h: b.h * 0.68 };
}

function trapRect(t) {
  return { x: t.x - t.w * 0.38, y: t.y - t.h * 0.28, w: t.w * 0.76, h: t.h * 0.56 };
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function circleHitsRect(c, r) {
  const nx = clamp(c.x, r.x, r.x + r.w);
  const ny = clamp(c.y, r.y, r.y + r.h);
  return Math.hypot(c.x - nx, c.y - ny) <= c.r;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function randomKey(obj) {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
}

function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  state.toastTimer = 2.7;
}

function loop(now) {
  const dt = Math.min(0.033, (now - state.last) / 1000 || 0);
  state.last = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

const tutorialSteps = [
  { title: "欢迎来到废品轮回", text: "用 WASD 或方向键移动角色。走到发光的设施旁，按 Enter 互动。", scene: "hub" },
  { title: "选择主题关卡", text: "走到中央的传送门，按 Enter 选择电子、塑料、纸板或布料主题。", scene: "hub" },
  { title: "战斗基础", text: "在关卡中用 Space 或点击画面攻击。按 Q 释放技能（20 秒冷却）。", scene: "battle" },
  { title: "合成纪念品", text: "回到基地，走到纪念工坊，按 Enter 打开合成台。", scene: "hub" },
  { title: "挑战 Boss", text: "在传送门选择 Boss 模式。击败蓝猫守卫获得打印碎片。", scene: "hub" },
];
let tutorialIndex = 0;
function showCoach() {
  if (!coachBubble) return;
  const step = tutorialSteps[tutorialIndex];
  if (!step) { hideCoach(); return; }
  if (step.scene !== state.scene && step.scene !== "any") return;
  coachBubble.classList.remove("hidden");
  if (coachTitle) coachTitle.textContent = step.title;
  if (coachText) coachText.textContent = step.text;
}
function hideCoach() { if (coachBubble) coachBubble.classList.add("hidden"); }
function coachNext() { tutorialIndex += 1; if (tutorialIndex >= tutorialSteps.length) hideCoach(); else showCoach(); }
function coachSkip() { hideCoach(); tutorialIndex = tutorialSteps.length; }

function bindEvents() {
  document.getElementById("startBtn").addEventListener("click", startNew);
  document.getElementById("continueBtn").addEventListener("click", continueGame);
  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem(SAVE_KEY);
    OLD_SAVE_KEYS.forEach((key) => localStorage.removeItem(key));
    save = defaultSave();
    toast("存档已重置。");
  });

  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    state.keys.add(key);
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) e.preventDefault();
    if (e.repeat) return;
    if (key === "enter") interact();
    if (key === " ") triggerAttack();
    if (key === "q") activateSkill();
    if (key === "e" && state.scene !== "title") showInventory();
    if (key === "k" && state.scene !== "title") showSkills();
    if (key === "c" && state.scene !== "title") showCraft();
    if (key === "enter" && synthOverlay && !synthOverlay.classList.contains("hidden")) { if (synthMode === "craft") doSynth(); }
    if (key === "x" && state.scene !== "title") showExchange();
    if (key === "b" && state.scene !== "title") showBackgrounds();
    if (key === "m" && state.scene !== "title") showMissions();
    if (key === "escape") {
      if (quizOverlay && !quizOverlay.classList.contains("hidden")) { closeQuiz(); return; }
      if (storyOverlay && !storyOverlay.classList.contains("hidden")) { closeStory(); return; }
      if (synthOverlay && !synthOverlay.classList.contains("hidden")) { closeSynth(); return; }
      if (modalOpen()) closeModal();
      else if (state.scene === "battle" || state.scene === "boss" || state.scene === "horde" || state.scene === "puzzle") enterHub("已退出关卡，角色已回到主页安全区。");
    }
    if (key === "n") nextWave();
  });

  window.addEventListener("keyup", (e) => state.keys.delete(e.key.toLowerCase()));
  canvas.addEventListener("mousemove", (e) => (state.mouse = canvasPoint(e)));
  canvas.addEventListener("click", (e) => {
    const p = canvasPoint(e);
    state.mouse = p;
    player.faceX = p.x - player.x;
    player.faceY = p.y - player.y;
    if (state.scene === "hub") {
      const target = hubFacilities.find((f) => Math.abs(p.x - f.x) < f.w / 2 && Math.abs(p.y - f.y) < f.h / 2);
      if (target) return target.action();
    }
    triggerAttack();
  });

  modal.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;
    const id = button.dataset.id;
    if (action === "close") closeModal();
    if (action === "startMob") startBattle();
    if (action === "startBoss") startBoss();
    if (action === "startHorde") startHorde();
    if (action === "startPuzzle") startPuzzle();
    if (action === "selectTheme") selectTheme(id);
    if (action === "openCollect") showCollectibleStory(id);
    if (action === "showMuseum") showMuseum();
    if (action === "showMuseumTheme") showMuseum(id);
    if (action === "startDialogue") startDialogue(Number(id || 0));
    if (action === "dialogueStep") {
      dialogueRuntime.step = Math.min(2, dialogueRuntime.step + 1);
      renderDialogue();
    }
    if (action === "dialogueBack") {
      dialogueRuntime.step = 0;
      renderDialogue();
    }
    if (action === "showStoryList") showStoryList();
    if (action === "openSkills") showSkills();
    if (action === "unlockSkill") unlockSkill(id);
    if (action === "selectSkill") selectSkill(id);
    if (action === "unlock") tryUnlock(id);
    if (action === "equip") equip(id);
    if (action === "unequip") unequip(button.dataset.slot);
    if (action === "craft") craft(id);
    if (action === "showQuiz") showQuiz();
    if (action === "doRecycle") doRecycle(id);
    if (action === "storyContinueAct") storyContinueAct();
    if (action === "exchange") exchange(id);
    if (action === "exchangePrint") exchangePrint(id);
    if (action === "unlockBg") unlockBg(id);
    if (action === "selectBg") selectBg(id);
    if (action === "claim") claimMission(id);
  });

  document.querySelectorAll("[data-pad]").forEach((btn) => {
    const dir = btn.dataset.pad;
    btn.addEventListener("pointerdown", () => state.pad.add(dir));
    btn.addEventListener("pointerup", () => state.pad.delete(dir));
    btn.addEventListener("pointerleave", () => state.pad.delete(dir));
  });
  document.querySelector('[data-action="attack"]').addEventListener("click", triggerAttack);
  document.querySelector('[data-action="skill"]').addEventListener("click", activateSkill);
  document.querySelector('[data-action="interact"]').addEventListener("click", interact);
  const sR=document.getElementById("storyRespond");const sC=document.getElementById("storyContinue");const sX=document.getElementById("storyClose");
  if(sR)sR.addEventListener("click",storyRespond);if(sC)sC.addEventListener("click",storyContinueAct);if(sX)sX.addEventListener("click",closeStory);
  const cN=document.getElementById("coachNext");const cS=document.getElementById("coachSkip");
  if(cN)cN.addEventListener("click",coachNext);if(cS)cS.addEventListener("click",coachSkip);
  if(synthOverlay)synthOverlay.addEventListener("click",(e)=>{const r=e.target.closest("[data-action=selectSynth]");const c=e.target.closest("[data-action=doRecycle]");if(r)selectSynth(r.dataset.id);if(c)doRecycle(c.dataset.id);});
  const qN=document.getElementById("quizNext");const qC=document.getElementById("quizClose");
  if(qN)qN.addEventListener("click",quizNext);if(qC)qC.addEventListener("click",closeQuiz);
}

function canvasPoint(e) {
  const rect = canvas.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * W;
  const y = ((e.clientY - rect.top) / rect.height) * H;
  return cameraScene() ? { x: x + state.camera.x, y: y + state.camera.y } : { x, y };
}

bindEvents();
loadImages();
requestAnimationFrame(loop);
