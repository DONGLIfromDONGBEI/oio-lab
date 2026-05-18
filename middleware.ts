import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const EMBED_TEST = "/embed-test";

/**
 * 复制链接时常混入 Markdown「**」、全角标点或未编码完的 %EF%BC…，导致路径不是干净的 /embed-test。
 * 真实合法扩展路由应为 /embed-test/xxx（带斜杠）；若为 /embed-test 后直接粘连杂质则重定向修正。
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith(EMBED_TEST)) {
    return NextResponse.next();
  }
  if (pathname === EMBED_TEST) {
    return NextResponse.next();
  }
  if (pathname.startsWith(`${EMBED_TEST}/`)) {
    return NextResponse.next();
  }
  const suffix = pathname.slice(EMBED_TEST.length);
  if (suffix.length === 0) {
    return NextResponse.next();
  }
  // /embed-testing 等：下一字符为「单词延续」则当作合法路径（当前项目无此类路由，仅防御误杀）
  if (/^[a-zA-Z0-9_-]/.test(suffix)) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = EMBED_TEST;
  return NextResponse.redirect(url);
}

export const config = {
  // 须匹配「/embed-test」后无斜杠的脏路径（如 /embed-test**…）；仅用 /embed-test/:path* 可能匹配不到
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
