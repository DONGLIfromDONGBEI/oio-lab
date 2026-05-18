import Link from "next/link";

/** Local-only embed smoke test for Bilibili iframe player */
export default function EmbedTestPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-sm text-[#888]">B 站内嵌测试页 · 非正式入口</p>
          <h1 className="mt-2 text-xl font-semibold">BV1hEDPBWEQs</h1>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-[#537FE7] underline underline-offset-2 hover:text-[#6b92ff]"
          >
            ← 返回首页
          </Link>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-[#333333] bg-[#161616] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              title="Bilibili embed test"
              src="https://player.bilibili.com/player.html?bvid=BV1hEDPBWEQs&page=1&autoplay=0"
              className="absolute inset-0 h-full w-full"
              scrolling="no"
              allowFullScreen
            />
          </div>
        </div>

        <p className="max-w-xl text-center text-sm text-[#a0a0a0]">
          若此处可正常播放，说明在你们站点内嵌 B 站播放器可行。本地地址请打开{" "}
          <Link
            href="/embed-test"
            className="font-mono text-[#e0e0e0] underline decoration-[#444] underline-offset-2 hover:text-white"
          >
            /embed-test
          </Link>
          （末尾不要带句号「。」，否则会变成无效路径）。
        </p>
      </div>
    </main>
  );
}
