# 敦煌纹样宣传站 — 本轮修改概览

## 本次三项改动（纹样专题入口）

### 1. 卡内悬停旋转（替换中央浮层）
- 删除旧的 `#pc-focus` 中央浮层（HTML/CSS/JS 全部移除，包括 `showFocus`/`hideFocus`）。
- 每张纹样卡片 `.pc` 内新增 `.ci-render-wrap > img.ci-render`，预加载对应敦煌渲染图（`patterns/${slug}-render.png`，id4 用 `new-shuibo.png`）。
- 悬停时该卡内纹样图标原地替换为敦煌渲染图并 `pcf-spin 14s linear infinite` 旋转，移出恢复；位置不变（has-thumb 覆盖顶部缩略图区，无缩略图覆盖中心图标区）。
- 点击卡片改为跳转 pattern 详情页 `G('pattern',p.id)`。

### 2. 替换全部 3D 模型 + DRACO 支持
- 模型源：`D:\桌面\纹样模型\` 的 6 个 glb（三兔_draco / 云纹 / 千佛 / 忍冬 / 波纹 / 莲花）。
- 已复制到 `standalone/models/` 与 `deploy/models/`，沿用 SLUG 命名覆盖旧文件。
- `三兔` 为 DRACO 压缩（14.9MB，旧版 366MB 未压缩），为 `ModelViewer` 接入 `DRACOLoader`（decoder 走 jsdelivr CDN `three@0.163.0/examples/jsm/libs/draco/`），新建共享 `_gltf` loader 替换原来的 `new GLTFLoader()`。

### 3. 纹样网格自动轮播
- `buildCards()` 内 `startCardAuto()` 每 2.8s 循环给卡片加 `.auto`（放大 + 金边发光 + 静态显示敦煌渲染图）。
- 悬停 `#cards` 暂停，`IntersectionObserver` 仅在 `.ps` 区块进入视口时轮播、离开停止。

## 验证（Playwright + 本地 http 服务）
- 6 张卡片渲染正常；悬停时 `.ci-render-wrap` opacity=1、`pcf-spin` 运行中；网格自动轮播 `AUTO_ACTIVE=1`。
- `santu`(DRACO) 与 `lianhua`(非 DRACO) 模型均成功加载（`.dz` 隐藏、`#vh` 显示），**PAGE_ERRORS=0**。
- 关键坑：`G()` 在入口动画结束（`#nv.vis`）前会静默 return，验证须等动画结束再导航。

## 涉及文件
- `D:\桌面\workbuddy\web\standalone\index.html`（源）
- `D:\桌面\workbuddy\web\deploy\index.html`（已同步）
- `D:\桌面\workbuddy\web\deploy\models\`、`standalone/models\`（6 个 glb 已替换）
