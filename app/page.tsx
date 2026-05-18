"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { CourseIntro } from "@/components/CourseIntro";
import { WhoItsFor } from "@/components/WhoItsFor";
import { SixWeekEvolution } from "@/components/SixWeekEvolution";
import { Countdown } from "@/components/Countdown";
import { BookingTabs } from "@/components/BookingTabs";
import { CourseInfoCard } from "@/components/CourseInfoCard";
import { EnrollmentCta } from "@/components/EnrollmentCta";
import { SHOW_COURSE_INFO_CARD, SHOW_COUNTDOWN_SECTION } from "@/lib/page-sections";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Footer } from "@/components/Footer";
import { FaqSection } from "@/components/FaqSection";
import { VIDEO_DECADE, VIDEO_HAILEY, VIDEO_INTRO } from "@/lib/video-sources";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip selection:bg-[#537FE7]/30 selection:text-white">
      <LanguageSwitcher />
      
      {/* Main Content Wrapper */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20 flex flex-col z-10">
        
        {/* Hero Section */}
        <div className="w-full flex justify-start">
          <Hero />
        </div>

        {/* Video: OIO 2分钟介绍 */}
        <VideoSection
          title={t.videos.introTitle}
          bilibiliBvid={VIDEO_INTRO.bilibiliBvid || undefined}
          youtubeVideoId={VIDEO_INTRO.youtubeId || undefined}
        />

        {/* Course Intro: OIO系统拆解 */}
        <CourseIntro />

        {/* 不适合谁 · 适合谁（先排除再对号入座） */}
        <WhoItsFor />

        {/* 你的OIO进化地图：纵向时间线 */}
        <SixWeekEvolution />

        {/* 本期课程信息：进化地图后；显示开关见 lib/page-sections.ts */}
        {SHOW_COURSE_INFO_CARD ? <CourseInfoCard /> : null}

        {/* 招募截止倒计时：紧接课程信息，再引导中部 CTA；开关见 lib/page-sections.ts */}
        {SHOW_COUNTDOWN_SECTION ? <Countdown /> : null}

        <EnrollmentCta className="my-8 md:my-10" />

        {/* Video: OIO的十年故事 */}
        <VideoSection
          title={t.videos.decadeTitle}
          subtitle={t.videos.decadeSubtitle}
          bilibiliBvid={VIDEO_DECADE.bilibiliBvid || undefined}
          youtubeVideoId={VIDEO_DECADE.youtubeId || undefined}
        />

        {/* Video: Hailey的OIO深度使用评测 */}
        <VideoSection
          title={t.videos.haileyTitle}
          bilibiliBvid={VIDEO_HAILEY.bilibiliBvid || undefined}
          youtubeVideoId={VIDEO_HAILEY.youtubeId || undefined}
        />

        {/* 预约咨询（微信 / Email）：与上方按钮相对视频的留白一致（mt-8 / md:mt-10） */}
        <div
          id="oio-booking"
          className="mt-8 flex w-full scroll-mt-28 justify-center md:mt-10 md:scroll-mt-32"
        >
          <BookingTabs />
        </div>

        <FaqSection />
      </div>

      <Footer />
      
      {/* Background Ambient Effects - Obsidian Dark Mode */}
      <div className="fixed inset-0 -z-20 h-full w-full bg-[#0b0c0e]" />
      <div className="fixed top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#1c1d21] to-transparent -z-10 opacity-40" />
    </main>
  );
}
