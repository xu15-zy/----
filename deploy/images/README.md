# 敦煌六大纹样 · 图片素材目录

把图片按下面的**约定文件名**丢进本目录（`standalone/images/`），刷新网页（建议 Ctrl+Shift+R 硬刷新）即自动生效；
没有放图的纹样会继续使用网站原有的「程序简版」占位（Canvas 几何图标 / 渐变色块），不会出现破图。

> 支持的格式（自动探测，命中即用）：`.jpg` / `.png` / `.webp` / `.svg`
> 位图推荐横图分辨率 ≥ 1200px 宽，单张控制在 300KB 以内以保证加载流畅；`.svg` 矢量图自动按 `contain` 居中、不裁切。
>
> 已接入的古代壁画真迹（用户提供 6 张）：`old-<slug>.jpg`（对比滑块左侧「传统壁画」）。
> 已接入的重构纹样 SVG（用户提取的 6 个）：`thumb-<slug>.svg`（卡片缩略图）+ `new-<slug>.svg`（对比滑块「数字三维重构」右侧）。

## 命名约定

纹样 slug 对照：
`1=rendong`(忍冬) · `2=lianhua`(莲花) · `3=yun`(云) · `4=shuibo`(八功德水波纹) · `5=qianfo`(千佛点阵) · `6=santu`(三兔共耳藻井)

### 1. 卡片缩略图（首页六大纹样入口卡）
```
thumb-rendong.jpg      thumb-lianhua.jpg     thumb-yun.jpg
thumb-shuibo.jpg       thumb-qianfo.jpg      thumb-santu.jpg
```
→ 显示在卡片顶部横幅；有图时隐藏原有的 Canvas 几何图标。

### 2. 古今对比图（每个纹样详情页「传统 vs 数字」滑块）
```
old-rendong.jpg   （传统壁画，滑块左侧）   ← 莫高窟第254窟双叶忍冬边饰
new-rendong.jpg   （数字三维重构，滑块右侧）← 重构提取 SVG
old-lianhua.jpg / new-lianhua.jpg          ← 莲花藻井真迹 / 重构 SVG
old-yun.jpg     / new-yun.jpg              ← 飞天祥云真迹 / 重构 SVG
old-shuibo.jpg  / new-shuibo.jpg           ← 八功德水莲池真迹 / 重构 SVG
old-qianfo.jpg  / new-qianfo.jpg           ← 莫高窟第263窟千佛局部 / 重构 SVG
old-santu.jpg   / new-santu.jpg            ← 三兔共耳藻井真迹 / 重构 SVG
```
→ 替换对比滑块里的渐变色块；没图时保留渐变 + 文字标签兜底。

### 3. 纹样页头图（详情页顶部 Banner）
```
banner-rendong.jpg  banner-lianhua.jpg  banner-yun.jpg
banner-shuibo.jpg   banner-qianfo.jpg   banner-santu.jpg
```
→ 作为详情页标题区背景（带暗化蒙版保证文字可读）。

### 4. 首页主视觉（Hero 背景）
```
hero.jpg
```
→ 作为首页全屏标题区的暗化背景；没有则保持纯文字 + 光晕。

### 5. 千年历史时间轴配图
```
history-1.jpg   history-2.jpg   history-3.jpg   history-4.jpg   history-5.jpg
```
→ 对应时间轴 5 个节点（开窟 / 北魏 / 隋 / 唐 / 当代数字化），显示在条目左侧小图。

---
提示：模型文件 (`.glb`) 仍放在上一级 `standalone/models/`，视频放在 `standalone/videos/`，与本目录互不影响。
