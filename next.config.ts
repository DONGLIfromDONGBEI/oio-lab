import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // 从聊天/文档复制链接时常把中文句号「。」粘在路径末尾 → 404
      { source: "/embed-test\u3002", destination: "/embed-test", permanent: false },
      { source: "/embed-test.", destination: "/embed-test", permanent: false },
    ];
  },
};

export default nextConfig;
