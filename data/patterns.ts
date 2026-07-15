export type Accent = "shiqing" | "zheshi" | "zhusha" | "jin";

export interface PatternLayer {
  inner: string;
  middle: string;
  outer: string;
}

export interface Pattern {
  slug: string;
  name: string;
  tagline: string;
  space: string;
  formFeature: string;
  meaning: string;
  background: string;
  modeling: string;
  animationName: string;
  animationLogic: string;
  ratio: string;
  layers: PatternLayer;
  aesthetic: string[];
  model?: string;
  accent: Accent;
}

export const patterns: Pattern[] = [
  {
    slug: "rendong",
    name: "忍冬纹",
    tagline: "佛龛边饰 · 恒久",
    space: "佛龛边饰、造像背光、窟檐装饰",
    formFeature: "连续卷草、对称排列",
    meaning: "佛教东传，象征佛法恒久",
    background:
      "忍冬即金银花，寒冬不凋，自魏晋随佛教东传进入敦煌，是莫高窟最早大规模使用的边饰纹样，大量用于佛龛边框、造像背光与窟檐装饰。佛龛边缘忍冬直线棱角、对称排布，象征佛法恒久；菩萨背光忍冬流畅卷曲、轻盈舒展，寓意慈悲渡世。忍冬纹贯穿北朝至元代所有洞窟，是敦煌装饰体系中最具时间纵深的纹样。",
    modeling:
      "S 形卷草采用贝塞尔曲线旋转成型，叶片挤出厚度；通过曲线建模 + 修改器阵列实现连续延展。",
    animationName: "生长延展",
    animationLogic:
      "卷草单元从茎线一端依次生长、抽叶、勾卷，再衔接下一单元，形成“一生二、二生三、三生无穷”的连续延展，最后由生长状态自然回卷到起始状态，形成完整循环，以“生生不息”呼应佛教轮回理念。",
    ratio: "1 : 3 : 1",
    layers: {
      inner: "瑞鸟点缀",
      middle: "卷草主体",
      outer: "连续边饰环带",
    },
    aesthetic: [
      "对称与连续：佛龛中线为轴左右镜像排布，连续卷草首尾相接无限延展",
      "虚实对比：棱角分明的叶片为实、茎线为虚，对比鲜明",
      "节奏：以“叶—茎—叶”为单位重复排列，随卷曲程度变化呈现舒缓流动层次",
    ],
    model: "/models/rendong.glb",
    accent: "zheshi",
  },
  {
    slug: "lianhua",
    name: "莲花纹",
    tagline: "藻井净土 · 清净",
    space: "藻井、净土变、造像基座",
    formFeature: "仰覆莲、宝相花",
    meaning: "净土核心符号，象征清净善根",
    background:
      "莲花是佛教核心符号，自北凉洞窟起成为主纹样，受印度莲花造像与中原宝相花融合演化。佛用多层仰覆莲、宝相花，方正厚重，代表极乐净土本源；菩萨用单层卷枝缠枝莲，轻盈缠绕，象征接引渡化、清净善根。莲花纹在净土变、说法图、飞天造像中无处不在，是净土思想最直观的视觉表达。",
    modeling:
      "花瓣阵列围绕莲心轴心径向分布，分层叠加；通过阵列 + 径向分布 + 形变完成。",
    animationName: "绽放",
    animationLogic:
      "莲花从花苞到盛开：内层莲心先行点亮，中层花瓣由内向外逐层绽放，外层莲子环最终展开呈圆形排列，整组绽放厚重有力，寓意“花开见佛”，直接呼应净土宗核心信仰。",
    ratio: "1 : 4 : 1",
    layers: {
      inner: "莲心圆点",
      middle: "莲瓣主体",
      outer: "莲子环收束",
    },
    aesthetic: [
      "比例黄金分割：花瓣长宽比约 1:0.618，8 瓣每瓣 45°、16 瓣每瓣 22.5°",
      "虚实相生：饱满花瓣为实、花瓣间隙与莲子圆点为虚",
      "节奏：以花瓣层叠形成“收—放—收”的节奏变化",
    ],
    model: "/models/lianhua.glb",
    accent: "zhusha",
  },
  {
    slug: "yun",
    name: "云纹",
    tagline: "背光华盖 · 遍布",
    space: "背光、华盖、飞天衣袂",
    formFeature: "团云、流云",
    meaning: "佛国空间过渡，象征佛法遍布",
    background:
      "云纹源自中国传统云气纹样，隋唐时期与佛教背光融合，形成敦煌专属祥云体系，用于佛菩萨背光、华盖、飞天衣袂与窟顶空间填充。背光承托团云厚重稳定，烘托神圣佛国空间；衣袂连绵流云细长卷曲，象征佛法如云遍布大千世界。云纹是连接人与佛境的过渡纹样，覆盖所有洞窟。",
    modeling:
      "云头使用形变球体，飘带用路径跟随生成；通过形变 + 曲线跟随完成。",
    animationName: "流动",
    animationLogic:
      "云气先凝聚成形，随后沿曲线路径缓缓流动飘移，飘带在云体后方拖曳延伸，经过处留下短暂雾化轨迹；整体节奏先沉稳缓慢、随后轻快多变，呈现空灵的佛国空间感。",
    ratio: "1 : 3 : 2",
    layers: {
      inner: "云头核心",
      middle: "勾卷云体",
      outer: "飘带回旋",
    },
    aesthetic: [
      "流动曲线：以舒展卷曲的连续曲线构成",
      "虚实交错：团云为实、飘带为虚，构建空灵佛国空间",
      "过渡叙事：连接人与佛境，是整套体系的空间过渡符号",
    ],
    model: "/models/yun.glb",
    accent: "shiqing",
  },
  {
    slug: "shuibo",
    name: "八功德水波纹",
    tagline: "净土莲池 · 润泽",
    space: "净土经变、佛菩萨莲池",
    formFeature: "同心圆水圈、分层细波",
    meaning: "极乐净土八功德水",
    background:
      "依托《阿弥陀经》极乐净土八功德水池记载，大量出现在唐代净土经变画中。佛居中莲池为宽大厚重单层大水圈，代表极乐世界究竟清净的本体；菩萨周边为细碎多层细密小波纹，象征八功德甘露洗涤众生八苦。水波纹以同心圆几何分层区分佛与菩萨水域，是敦煌净土题材最具识别性的符号。",
    modeling:
      "同心水圈使用经纬球切片，分层错位排列；通过网格切片 + 阵列完成。",
    animationName: "扩散",
    animationLogic:
      "水波从中心向外扩散：内层佛池大水圈先产生一次强烈扩散，随后外层细碎波纹持续以同心圆向外层层荡开，间距按等比递增、波纹由粗到细渐变，象征八功德水洗涤众生八苦、由内向外普度一切。",
    ratio: "2 : 5 : 3",
    layers: {
      inner: "中心水圈",
      middle: "同心水圈群",
      outer: "边饰波纹",
    },
    aesthetic: [
      "双重渐变：水圈由内向外逐渐变大、间距变宽，且由粗到细渐变",
      "几何分层：以同心圆区分佛与菩萨水域",
      "空间纵深：模拟水波扩散物理规律，产生由中心向外辐射的纵深感",
    ],
    model: "/models/shuibo.glb",
    accent: "shiqing",
  },
  {
    slug: "qianfo",
    name: "千佛点阵纹",
    tagline: "四壁十方 · 普度",
    space: "洞窟四壁、莲心装饰",
    formFeature: "小圆点阵、几何阵列",
    meaning: "十方诸佛、普度众生",
    background:
      "千佛图像自北魏洞窟兴起，以点阵小圆简化千佛造像，铺满洞窟四壁，是表现十方诸佛最简化抽象符号。四壁大型千佛点阵为佛本位标准阵列，代表十方无量、圆满不灭的一切觉者；菩萨旁小型莲心千佛为微型点阵，象征菩萨生生世世度化无数众生。千佛点阵纹以极简几何实现了宏大叙事。",
    modeling:
      "小圆点采用粒子系统分布，光晕用发光材质；通过粒子系统 + 发光材质完成。",
    animationName: "聚散",
    animationLogic:
      "点阵先从四周边缘向中心汇聚形成密集排列，随后从中心向外辐射消散再重新汇聚；聚集代表万佛归一、佛法凝聚，消散代表十方诸佛遍布大千、普度众生，形成宏大而富有禅意的视觉节奏。",
    ratio: "1 : 6 : 1",
    layers: {
      inner: "莲心小圆点",
      middle: "壁面千佛点阵",
      outer: "佛光环饰",
    },
    aesthetic: [
      "重复与连续的极致：相同大小圆点等距排列铺满整面墙壁",
      "渐变暗示光线：佛身色彩由深到浅、由暖到冷",
      "抽象归纳：以一个圆点代表一尊佛，承载完整佛学叙事",
    ],
    model: "/models/qianfo.glb",
    accent: "jin",
  },
  {
    slug: "santu",
    name: "三兔共耳藻井纹",
    tagline: "窟顶轮回 · 循环",
    space: "窟顶藻井",
    formFeature: "三兔共耳、循环闭环",
    meaning: "三世轮回、宇宙时空",
    background:
      "三兔藻井是敦煌独有的顶层几何符号，隋代成熟，置于洞窟顶部，不依附佛或菩萨单体造像，作为整个洞窟宇宙时空的抽象象征。内层三兔两两共耳形成循环图形，外层环绕兔爪抽象纹样，纯几何无限闭环。对应佛为三世十方诸佛循环不灭、万法归一；对应菩萨为三世轮回、众生流转，是敦煌装饰符号体系的几何顶点。",
    modeling:
      "三兔使用镜像修改器复制，共享耳部单独建模；通过镜像 + 布尔 + 对称完成。",
    animationName: "循环旋转",
    animationLogic:
      "内层三兔沿圆环匀速旋转，共耳结构始终保持无缝衔接形成永不停歇的循环；外层兔爪纹样以不同速度反向旋转，内外层速度差形成丰富视觉层次，直观表达时间轮回、生死循环的佛学宇宙观。",
    ratio: "2 : 5 : 3",
    layers: {
      inner: "三兔共耳",
      middle: "兔爪与回旋",
      outer: "几何边框",
    },
    aesthetic: [
      "旋转对称：三兔等距排列于圆环，每兔占 120° 三等分",
      "循环闭环：三兔共耳形成无限循环，是连续性的几何极致",
      "几何顶点：纯几何抽象，作为整套装饰符号体系的顶点",
    ],
    model: "/models/santu.glb",
    accent: "zhusha",
  },
];

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug);
}

export const accentHex: Record<Accent, string> = {
  shiqing: "#2b5d7d",
  zheshi: "#9c5b3b",
  zhusha: "#b23a2e",
  jin: "#c9a227",
};
