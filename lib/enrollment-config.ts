/**
 * 报名 / 付款按钮：招生开关 + 跳转 URL（客户端需 NEXT_PUBLIC_ 前缀）。
 * 未配置 URL 时使用占位链接，便于在 HTML 与源码中统一替换。
 * @see .env.example
 */
export const ENROLLMENT_CTA_PLACEHOLDER_URL =
  "https://example.com/oio-course-enroll";

export function getEnrollmentConfig(): {
  open: boolean;
  ctaUrl: string;
} {
  const flag = (process.env.NEXT_PUBLIC_ENROLLMENT_OPEN || "").toLowerCase().trim();
  const open = flag === "true" || flag === "1" || flag === "yes";
  const fromEnv = (process.env.NEXT_PUBLIC_ENROLLMENT_CHECKOUT_URL || "").trim();
  const ctaUrl = fromEnv || ENROLLMENT_CTA_PLACEHOLDER_URL;
  return { open, ctaUrl };
}
