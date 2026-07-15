export interface Pattern {
  id: number;
  name: string;
  en: string;
  sub: string;
  desc: string;
  /** Theme background colour for the outer container, transitions with the active card. */
  bg: string;
  /** Accent / glow colour used for the card halo and the watermark. */
  glow: string;
  /** Preview image (digital-reconstruction SVG). */
  preview: string;
  /** Route to the detail page. */
  route: string;
}

const base = import.meta.env.BASE_URL;

export const patterns: Pattern[] = [
  {
    id: 1,
    name: '忍冬纹',
    en: 'HONEYSUCKLE',
    sub: '佛龛边饰 · 恒久',
    desc: '自魏晋随佛教东传进入敦煌，是莫高窟最早大规模使用的边饰纹样。寒冬不凋，象征佛法恒久、生生不息，贯穿北朝至元代所有洞窟。',
    bg: '#16302a',
    glow: '#7fd1b9',
    preview: base + 'patterns/rendong-render.png',
    route: './index.html?pattern=1',
  },
  {
    id: 2,
    name: '莲花纹',
    en: 'LOTUS',
    sub: '藻井净土 · 清净',
    desc: '佛教核心符号，受印度莲花与中原宝相花融合演化。多层仰覆莲代表极乐净土本源，单层缠枝莲象征接引渡化、清净善根。',
    bg: '#3a1c22',
    glow: '#e8907f',
    preview: base + 'patterns/lianhua-render.png',
    route: './index.html?pattern=2',
  },
  {
    id: 3,
    name: '云纹',
    en: 'CLOUD',
    sub: '背光华盖 · 遍布',
    desc: '源自中国传统云气纹，隋唐与佛教背光融合。厚重团云烘托神圣佛国，连绵流云象征佛法如云遍布大千世界。',
    bg: '#1b2c44',
    glow: '#82aede',
    preview: base + 'patterns/yun-render.png',
    route: './index.html?pattern=3',
  },
  {
    id: 4,
    name: '八功德水波纹',
    en: 'RIPPLE',
    sub: '净土莲池 · 润泽',
    desc: '依托《阿弥陀经》八功德水池记载，多见于唐代净土经变。同心水圈以几何分层区分佛与菩萨水域，洗涤众生八苦。',
    bg: '#103038',
    glow: '#6fd0c0',
    preview: base + 'patterns/new-shuibo.png',
    route: './index.html?pattern=4',
  },
  {
    id: 5,
    name: '千佛点阵纹',
    en: 'BUDDHAS',
    sub: '四壁十方 · 普度',
    desc: '北魏兴起，以点阵小圆简化千佛造像，铺满洞窟四壁。极简几何实现宏大叙事，表现十方诸佛无量圆满。',
    bg: '#33260c',
    glow: '#e8c456',
    preview: base + 'patterns/qianfo-render.png',
    route: './index.html?pattern=5',
  },
  {
    id: 6,
    name: '三兔共耳藻井',
    en: 'HARES',
    sub: '窟顶轮回 · 循环',
    desc: '敦煌独有顶层几何符号，隋代成熟。三兔两两共耳形成循环图形，对应三世轮回、万法归一，是装饰符号体系的几何顶点。',
    bg: '#2c1838',
    glow: '#c79be0',
    preview: base + 'patterns/santu-render.png',
    route: './index.html?pattern=6',
  },
];
