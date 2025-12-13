"use client";

import HomeHeroSection from "@/components/home/hero";
import HomeAboutSection from "@/components/home/about";
import HomeFacultySection from "@/components/home/faculty";
import HomeEventsSection from "@/components/home/events";
import HomeVideoSection from "@/components/home/video";

import Snowfall from "react-snowfall";


export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10 h-full">
          <Snowfall
            color="blue" 
            snowflakeCount={200} 
            style={{
              position: "fixed", 
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1, 
            }}
          />
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeEventsSection />
      <HomeVideoSection />
      <HomeFacultySection />
    </div>
  );
}
