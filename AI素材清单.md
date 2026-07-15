# AI 生成的敦煌图形化装饰素材

> 路径：`public/images/ai-generated/`
> 风格：扁平矢量插画风 / 对称 / 金线描边 / 敦煌五色
> 底色规则：徽章类 = 深青底 #1B2A33；背景类 = 米白底 #F4EAD4

---

## 1. caisson-hero.png（1536 × 1536 · 2.0 MB）

**用途**：Hero 区域巨幅中心图（Hero 主视觉水印）
- 放在首页 Hero 区居中偏后（opacity 0.12~0.18）做背景水印花
- 或在「关于」区块作为大幅展示
- 也适合做全站暗色 section 的视觉锚点

**特征**：藻井图案——叠套方框 + 中心八瓣莲花团花 + 卷草云纹填充 + 四角联珠圆点

```tsx
{/* Hero 藻井水印示例 */}
<div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
  <Image src="/images/ai-generated/caisson-hero.png" alt="" fill className="object-contain" />
</div>
```

---

## 2. three-hares.png（1024 × 1024 · 1.5 MB）

**用途**：三兔共耳文化符号徽章
- 首页 CTA 暗卡内点缀图标
- 「历史」或「纹样总览」页面的章节标识
- Footer 品牌区装饰

**特征**：三兔共耳圆形徽章——三只奔跑兔子耳朵交扣于中心、外圈莲瓣、最外围联珠点

```tsx
{/* 三兔徽章示例 */}
<Image
  src="/images/ai-generated/three-hares.png"
  alt="三兔共耳"
  width={280}
  height={280}
  className="rounded-full shadow-dh-md"
/>
```

---

## 3. lotus-medallion.png（1024 × 1024 · 1.4 MB）

**用途**：莲花团花徽章 / 图案详情页配饰
- 莲花纹样详情页 (`/patterns/lianhua`) 的主视觉
- 与 caisson 配套使用形成"一藻井一团花"组合

**特征**：多层花瓣莲花团花 + 同心卷草辐射 + 外围联珠边

```tsx
{/* 莲花团花徽章 */}
<Image
  src="/images/ai-generated/lotus-medallion.png"
  alt="莲花团花"
  width={240}
  height={240}
/>
```

---

## 4. cloud-field.png（1536 × 1024 · 1.4 MB）

**用途**：浅色柔背景（区块底纹）
- 首页各 section 交替米白底时叠加（opacity 0.06~0.10）
- 或直接作为某个浅色 section 的 background-image（background-size: cover; background-position: center）
- 让长滚动页面有节奏感

**特征**：极淡祥云卷草纹理，金线细描，大面积留白，米白底

```tsx
{/* 区块柔背景 */}
<section style={{
  backgroundImage: 'url(/images/ai-generated/cloud-field.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}>
  {/* content */}
</section>
```

---

## 5. pearl-frieze.png（1536 × 512 · 1.1 MB）

**用途**：联珠纹横向分割带
- 页面主要 section 之间的分割线（替代现有 `<hr>` 细金线）
- 可 CSS `repeat-x` 平铺或单次显示为宽幅装饰带
- 也适合放在 Nav 底部或 Card 标题下方

**特征**：重复联珠圆点行 + 中间嵌小莲花/忍冬，金线描边，深青底

```tsx
{/* 分割带组件 */}
<div
  className="w-full my-16"
  style={{
    backgroundImage: 'url(/images/ai-generated/pearl-frieze.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
    height: 64,
  }}
/>

/* 或平铺版 */
<div
  className="w-full my-8"
  style={{
    backgroundImage: 'url(/images/ai-generated/pearl-frieze.png)',
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 48px',
    height: 48,
  }}
/>
```

---

## 使用优先级建议

| 批次 | 素材 | 接入位置 | 工作量 |
|------|------|----------|--------|
| 第一批 | `caisson-hero` + `cloud-field` | Hero 背景 + section 交替底色 | ~30 min |
| 第二批 | `pearl-frieze` | 替换全局 `<hr>` 为装饰分割带 | ~20 min |
| 第三批 | `three-hares` + `lotus-medallion` | CTA 卡 / 详情页 / Footer 装饰 | ~30 min |

> ✅ 水印已去除：5 张图右下角原 Hunyuan「图片由AI生成」水印已用 OpenCV inpaint 修复移除，并经程序化残差检测确认框外无残留。带水印原图备份在 `../_watermark_backup/_backup/`。
