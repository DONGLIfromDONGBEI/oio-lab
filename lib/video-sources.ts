/**
 * 落地页三段视频的嵌入 ID。
 * 仅使用 B 站（内地）与 YouTube（非内地，含港澳台）。
 *
 * NEXT_PUBLIC_VIDEO_INTRO_BVID / NEXT_PUBLIC_VIDEO_INTRO_YOUTUBE
 * NEXT_PUBLIC_VIDEO_DECADE_BVID / NEXT_PUBLIC_VIDEO_DECADE_YOUTUBE
 * NEXT_PUBLIC_VIDEO_HAILEY_BVID / NEXT_PUBLIC_VIDEO_HAILEY_YOUTUBE
 */

const env = (key: string) =>
  typeof process.env[key] === "string" ? process.env[key]!.trim() : "";

export const VIDEO_INTRO = {
  bilibiliBvid: env("NEXT_PUBLIC_VIDEO_INTRO_BVID") || "BV1eT5x6eE4x",
  youtubeId: env("NEXT_PUBLIC_VIDEO_INTRO_YOUTUBE") || "gPx3W26apUw",
} as const;

export const VIDEO_DECADE = {
  bilibiliBvid: env("NEXT_PUBLIC_VIDEO_DECADE_BVID") || "BV1hEDPBWEQs",
  youtubeId: env("NEXT_PUBLIC_VIDEO_DECADE_YOUTUBE") || "7qcIHARZ7f8",
} as const;

export const VIDEO_HAILEY = {
  bilibiliBvid: env("NEXT_PUBLIC_VIDEO_HAILEY_BVID") || "BV1Yu5x6AECE",
  youtubeId: env("NEXT_PUBLIC_VIDEO_HAILEY_YOUTUBE") || "DrLwsubyqcU",
} as const;
