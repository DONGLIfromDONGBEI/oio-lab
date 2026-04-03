# 本期课程信息 & 倒计时通知栏

本页说明如何**重新显示**这两个首页区块，以及如何**改文案**。组件与翻译都保留在代码里，只是默认不渲染。

## 1. 显示 / 隐藏开关

编辑 `lib/page-sections.ts`：

| 常量 | 作用 | 当前默认 |
|------|------|----------|
| `SHOW_COURSE_INFO_CARD` | 「本期课程信息」卡片 | `true`（显示） |
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

- **页面位置**：`SixWeekEvolution`（六周地图）之后、下一块内容（如预约 CTA / 视频）之前。  
- **标题**：与其它板块一致，`h2` 在卡片外；正文在深色圆角卡片内。  
- **显示开关**：`SHOW_COURSE_INFO_CARD` 为 `false` 时整段不渲染。

以下为当前与 `lib/dictionaries.ts` 一致的文案；改日期/条款时以字典为准，并同步更新下表。

### 简体中文（zh-CN）

| 键 | 文案 |
|----|------|
| title | 本期课程信息 |
| timezoneNote | 以下时间均为北京时间；海外学员请务必换算时差。 |
| scheduleLine | 直播：每周六主课、每周三答疑练习，固定 19:00 开始，约 1–2 小时；共 6 周，12 场直播。 |
| firstWeekLine | 首周上课时间：4 月 11 日（周六）主课、4 月 15 日（周三）答疑练习；之后连续五周同一时间。 |
| replayLine | 回看：每节课结束后 24 小时内上传（如有配套福利，同步开放）。 |
| refundLine | 退款：自首节直播课（4 月 11 日）起 14 天内可无理由退款，截止 4 月 24 日（北京时间）。微信申请即可，逾期不退。 |
| alternatePaymentNote | 付款：当前以微信支付为主。若你无法使用微信支付，请添加课程微信或通过 Line 联系我们，协商其他付款方式。 |

### 繁体中文（zh-TW）

| 键 | 文案 |
|----|------|
| title | 本期課程資訊 |
| timezoneNote | 以下時間均為北京時間；海外同學請務必換算時差。 |
| scheduleLine | 直播：每週六主課、每週三答疑／練習課，固定 19:00 開始，約 1–2 小時；共 6 週，12 場直播。 |
| firstWeekLine | 首週上課時間：4 月 11 日（週六）主課、4 月 15 日（週三）答疑練習；之後連續五週同一時間。 |
| replayLine | 回看：每節課結束後 24 小時內上傳（如有配套福利，同步開放）。 |
| refundLine | 退款：自首節直播課（4 月 11 日）起 14 天內可無理由退款，截止 4 月 24 日（北京時間）。微信申請即可，逾期不退。 |
| alternatePaymentNote | 付款：目前以微信支付為主。若你無法使用微信支付，請新增課程微信或透過 Line 聯絡我們，另洽付款方式。 |

**组件文件**：`components/CourseInfoCard.tsx`（标题在 section 内、卡片外。）

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
