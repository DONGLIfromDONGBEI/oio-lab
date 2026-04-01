# 本期课程信息 & 倒计时通知栏

本页说明如何**重新显示**这两个首页区块，以及如何**改文案**。组件与翻译都保留在代码里，只是默认不渲染。

## 1. 显示 / 隐藏开关

编辑 `lib/page-sections.ts`：

| 常量 | 作用 | 当前默认 |
|------|------|----------|
| `SHOW_COURSE_INFO_CARD` | 「本期课程信息」卡片 | `false`（隐藏） |
| `SHOW_COUNTDOWN_SECTION` | 「截止日期 / 已截止」等通知框 | `false`（隐藏） |

改为 `true` 后保存、部署即可重新出现在页面上。

---

## 2. 改文案要动哪些文件

- **简体 / 繁体正文**：`lib/dictionaries.ts`  
  - 课程信息：`translations['zh-CN'].courseInfo` 与 `translations['zh-TW'].courseInfo`  
  - 倒计时与截止提示：`translations['zh-CN'].countdown` 与 `translations['zh-TW'].countdown`
- **倒计时「是否已过期」的时间点**（影响显示倒计时数字还是「已截止」两块文案）：`components/Countdown.tsx` 顶部的 `DEADLINE_MS`

你可以在**下面第 3、4 节**直接改好文案，再让助手（或自己）把内容同步进 `dictionaries.ts`；也可以先改本文档当草稿，再说一声「按文档同步到代码」。

---

## 3. 本期课程信息（courseInfo）

以下为当前快照，与 `lib/dictionaries.ts` 一致；发布前请按实际需要改日期与条款。

### 简体中文（zh-CN）

| 键 | 文案 |
|----|------|
| title | 本期课程信息 |
| timezoneNote | 注意：以下时间均为北京时间，海外同学请换算好时差，以免造成不便。 |
| scheduleLine | 直播课安排：固定每周六主课，每周三答疑练习课；共6周。 |
| firstWeekLine | 开课第一周日期：4月11日（周六）；4月15日（周三） |
| replayLine | 回看说明：每节课回看将在24小时内上传（相关福利内容同步开放，如有） |
| refundLine | 退款政策：14天无理由退款（自第一堂课4月11日开始计算，截止4月24日。微信申请即可，过期不退）。 |

### 繁体中文（zh-TW）

| 键 | 文案 |
|----|------|
| title | 本期課程資訊 |
| timezoneNote | 注意：以下時間均為北京時間，海外同學請換算好時差，以免造成不便。 |
| scheduleLine | 直播課安排：固定每週六主課，每週三答疑練習課；共6週。 |
| firstWeekLine | 開課第一週日期：4月11日（週六）；4月15日（週三） |
| replayLine | 回看說明：每節課回看將在24小時內上傳（相關福利內容同步開放，如有） |
| refundLine | 退款政策：14天無理由退款（自第一堂課4月11日開始計算，截止4月24日。微信申請即可，過期不退）。 |

**组件文件**：`components/CourseInfoCard.tsx`（一般只需改字典，不必改组件结构。）

---

## 4. 倒计时 / 截止通知（countdown）

### 截止时间（逻辑）

文件：`components/Countdown.tsx`  

```ts
const DEADLINE_MS = new Date("2026-02-20T23:59:59+08:00").getTime();
```

- 当前时间 **晚于** 该时刻 → 显示「已截止」类文案（`closedLine1` / `closedLine2`）。  
- **早于** 该时刻 → 显示倒计时与 `deadlineNote`、`notice`。  

新一批招募请改此日期时间。

### 文案快照（与 dictionaries 一致）

#### 简体中文（zh-CN）

| 键 | 文案 |
|----|------|
| deadlineNote | 截止日期：2026年2月27日 (UTC+8) |
| notice | 首批创始名额限8位，共创期特权仅限本批次 |
| closedLine1 | 首批创始名额已满，招募已截止。 |
| closedLine2 | 预约下一批，第一时间获取开放通知。 |
| days / hours / minutes / seconds | 天 / 时 / 分 / 秒 |
| expired | 已截止 |

#### 繁体中文（zh-TW）

| 键 | 文案 |
|----|------|
| deadlineNote | 截止日期：2026年2月27日 (UTC+8) |
| notice | 首批創始名額限8位，共創期特權僅限本批次 |
| closedLine1 | 首批創始名額已滿，招募已截止。 |
| closedLine2 | 預約下一批，第一時間獲取開放通知。 |
| days / hours / minutes / seconds | 天 / 時 / 分 / 秒 |
| expired | 已截止 |

**组件文件**：`components/Countdown.tsx`

---

## 5. 快速检查清单（发布日）

- [ ] `lib/page-sections.ts` 里两个 `SHOW_*` 改为 `true`（若需要显示）  
- [ ] 已按上表更新 `lib/dictionaries.ts`（简繁）  
- [ ] 已按需修改 `Countdown.tsx` 的 `DEADLINE_MS`  
- [ ] 本地 `npm run build` 通过  
