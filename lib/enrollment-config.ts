/**
 * 报名 / 付款按钮：招生开关 + 跳转 URL（客户端需 NEXT_PUBLIC_ 前缀）。
 * 未配置 URL 时使用下方公开课程页作为默认跳转。
 * OPEN 未设置或为 true 时视为开放；仅当为 false / 0 / no 时关闭（回退为微信预约滚动）。
 * @see .env.example
 */
export const ENROLLMENT_CTA_PLACEHOLDER_URL =
  "https://apprunwspi61682.h5.xiaoeknow.com/p/course/ecourse/course_3EFey6LYxS9W0JExGemIxx4ley6";

/**
 * 本期招生结束后 `true`：橙色按钮不跳外链，统一滚至 `#oio-booking`（与 env 关闭时行为一致）。
 * 下期恢复外链报名时设回 `false`，并配置 `NEXT_PUBLIC_ENROLLMENT_OPEN` 与 `NEXT_PUBLIC_ENROLLMENT_CHECKOUT_URL`。
 */
export const ENROLLMENT_APPOINTMENT_ONLY = false;

export function getEnrollmentConfig(): {
  open: boolean;
  ctaUrl: string;
} {
  if (ENROLLMENT_APPOINTMENT_ONLY) {
    return {
      open: false,
      ctaUrl: ENROLLMENT_CTA_PLACEHOLDER_URL,
    };
  }

  const flag = (process.env.NEXT_PUBLIC_ENROLLMENT_OPEN || "").toLowerCase().trim();
  const closedExplicitly =
    flag === "false" || flag === "0" || flag === "no";
  const open = !closedExplicitly;

  const fromEnv = (process.env.NEXT_PUBLIC_ENROLLMENT_CHECKOUT_URL || "").trim();
  const ctaUrl = fromEnv || ENROLLMENT_CTA_PLACEHOLDER_URL;
  return { open, ctaUrl };
}
