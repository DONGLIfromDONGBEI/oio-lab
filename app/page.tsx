"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { CourseIntro } from "@/components/CourseIntro";
import { Countdown } from "@/components/Countdown";
import { BookingTabs } from "@/components/BookingTabs";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Footer } from "@/components/Footer";

const VIDEO_OIO_INTRO =
  "https://oiosync-landingpage.oss-cn-hongkong.aliyuncs.com/OIO%E7%90%86%E5%BF%B5%E4%BB%8B%E7%BB%8D.mp4";
const VIDEO_OIO_LAUNCH =
  "https://oiosync-landingpage.oss-cn-hongkong.aliyuncs.com/oio%E5%8F%91%E5%B8%83%E4%BB%8B%E7%BB%8D.mp4";
const VIDEO_REVIEW =
  "https://oiosync-landingpage.oss-cn-hongkong.aliyuncs.com/%E9%BB%91%E6%A2%A8%E7%9A%84Review.mp4";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden selection:bg-[#537FE7]/30 selection:text-white">
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
          src={VIDEO_OIO_INTRO}
        />

        {/* Course Intro: OIO系统拆解 */}
        <CourseIntro />

        {/* Video: OIO的十年故事 */}
        <VideoSection
          title={t.videos.decadeTitle}
          subtitle={t.videos.decadeSubtitle}
          src={VIDEO_OIO_LAUNCH}
        />

        {/* Video: Hailey的OIO深度使用评测 */}
        <VideoSection
          title={t.videos.haileyTitle}
          src={VIDEO_REVIEW}
        />

        {/* Booking Tabs: Email & WeChat */}
        <div className="w-full flex justify-center mt-2">
          <BookingTabs />
        </div>

        {/* Countdown + Notice (below booking) */}
        <Countdown />

      </div>
      
      <Footer />
      
      {/* Background Ambient Effects - Obsidian Dark Mode */}
      <div className="fixed inset-0 -z-20 h-full w-full bg-[#0b0c0e]" />
      <div className="fixed top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#1c1d21] to-transparent -z-10 opacity-40" />
    </main>
  );
}
