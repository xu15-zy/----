# 敦煌纹样宣传站 — 修改概览

## 版本与回退（git）
- 仓库根：`D:/桌面/workbuddy/web`（本次会话 `git init`，`.gitignore` 排除 node_modules/deploy.zip/根级原始.glb/moxing/shots/_watermark_backup/.next/）。
- `baseline-pre-enhance`（commit `f7b39c8`）：优化前基线，可 `git checkout baseline-pre-enhance` 回退。
- `v1-enhanced`（commit `9016b8d`）：动效与美观优化版，可 `git checkout v1-enhanced` 回退。
- 当前新增：Round 3 修复（见下方），提交后新增为 `v2-fixes`。

---

## 一、纹样专题入口（早期轮次）
1. 卡内悬停旋转：删除 `#pc-focus` 中央浮层，改为卡内 `.ci-render` 悬停 `pcf-spin` 原地旋转；点击跳转 pattern 详情。
2. 替换全部 3D 模型 + DRACO：6 个 glb 复制到 `standalone/models/` 与 `deploy/models/`，接入 `DRACOLoader`。
3. 纹样网格自动轮播：`startCardAuto()` 每 2.8s 高亮 `.auto` 卡，悬停暂停、视口外停止。

## 二、Round 2 修复（已验证）
- 三兔(santu)卡顿：关抗锯齿 + high-performance、离屏/切后台暂停渲染、`_clr()` 释放 GPU、`setPerf` 三兔像素比降到 1.0。
- React 轮播自动播放：4s 间隔，悬停/切后台暂停。
- rendong/lianhua 模型去背景：删 `柱体.001` / `立方体`+`立方体.001` 节点。

## 三、交互动效与美观层次优化（已验证）— standalone/index.html → deploy/index.html
1. **顶部滚动进度条** `#spbar`：滚动时金色渐变条按进度 `scaleX`。
2. **回到顶部按钮** `#btt`：滚过 0.6 视口高时浮现，点击平滑回顶。
3. **Hero 行动按钮**「进入纹样世界 →」：点击平滑滚动到「纹样专题」区块，提升首屏行动召唤。
4. **导航当前页高亮** `setNav(p)`：首页 / 千年历史 / 纹样体系 / 对应纹样名 自动高亮，增强方位感。
5. **入场动效升级**：通用 `@keyframes lr` 改为「模糊上浮」（`filter:blur(7px)→0` + `cubic-bezier(.16,1,.3,1)`），所有滚动揭示更高级。
6. **修复 hover 抬升被锁死**：卡片/符号卡 hover 由 `transform` 改 `translate` 属性，避开 reveal 动画 `forwards` 对 transform 的占用，悬停抬升/金边发光恢复正常。
7. **无障碍降级**：`prefers-reduced-motion` 下关闭动画/过渡并强制内容可见。

## 四、Round 3 修复（已验证）
1. **千佛点阵纹 / 三兔共耳藻井 位置修正**
   - 用用户提供的参考图替换 `deploy/patterns/` 与 `standalone/patterns/` 下的 `qianfo-render.png`（千佛）和 `santu-render.png`（三兔），并同步 `gallery/public/patterns/`。
   - 修复首页「纹样专题入口」卡片与 React 轮播中这两个纹样视觉错位的问题。
2. **6 个纹样动画视频插入详情页**
   - 从 `D:/桌面/纹样模型/` 复制 6 个 MP4 到 `standalone/videos/` 与 `deploy/videos/`，按 SLUG 命名。
   - 在 `standalone/index.html` 的 pattern 数据中为每个纹样新增 `video` 字段；现有 `buildPattern()` 自动渲染视频播放器，所有纹样详情页现在都有对应动画视频。
3. **React 轮播自动轮播 bug 修复 + 间隔缩短**
   - 把 interval 改为只依赖 `navigate`，暂停状态通过 `autoPausedRef` 在 tick 中读取，避免 state 更新导致 interval 被意外拆除。
   - 间隔从 4000ms 缩短到 3000ms。
   - 保留 hover / visibilitychange 暂停。
4. **轮播卡片悬停顺时针缓慢旋转**
   - 在 `gallery/src/index.css` 新增 `@keyframes pg-spin` + `.pg-card:hover .pg-img { animation: pg-spin 12s linear infinite; }`。
   - 带 `prefers-reduced-motion` 降级。

## 验证（Playwright, http://127.0.0.1:8765）
- Round 3：HOME_CARDS=6；PATTERN_VIDEO_1~6 全部 vb=block 且 src 正确；CAROUSEL_AUTO_ADVANCE 忍冬纹→莲花纹；CAROUSEL_HOVER_SPIN_CSS 存在；NO_JS_ERRORS=0。
- 前期：三元素齐全；滚半页时进度条 `scaleX=0.586`、回到顶部 `show=True`；导航高亮正确；Hero CTA 滚动到 `.ps` 成功；6/6 卡片入场正常。
- 404 均为 `findImg` 探测可选图片扩展名，无害，非新增 JS 错误。

## 涉及文件
- `D:\桌面\workbuddy\web\standalone\index.html`（源）/ `deploy\index.html`（已同步）
- `gallery/src/components/PatternGallery.tsx` + `gallery/src/index.css` + `deploy/carousel.html`（React 轮播）
- `standalone/patterns/`、`deploy/patterns/`、`gallery/public/patterns/`（qianfo/santu 图片修正）
- `standalone/videos/`、`deploy/videos/`（6 个纹样 MP4）
- `standalone/models/`、`deploy/models/`（6 个 glb）
