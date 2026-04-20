import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { WebCohortHeroProps } from "./schema";
import { EmailInput, VideoSection, LevelUpCard, ImageCard, Chip } from "./internal/components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Asset Imports
import HeaderShadow from "./assets/HeaderShadow.webp";
import heroPeople from "./assets/hero/hero-people.png";
import ProvenTechImg from "./assets/hero/ProvenTech.png";
import ApprochDevImg from "./assets/hero/ApprochDev.png";
import MasterETEDevImg from "./assets/hero/MasterETEDev.png";

export default function WebCohortHero({
  chipText = "Struggling for Internships to Job Ready in 6 Months",
  title = [
    { text: "Course", highlight: true },
    { text: " Knowledge ≠ ", highlight: false },
    { text: "Job", highlight: true },
    { text: " Readiness. We Make You Job Ready ", highlight: false },
    { text: "Developer", highlight: true },
    { text: ".", highlight: false }
  ],
  subtitle = "Tired of courses that promise skills but don’t deliver real world job skills? Build production-ready apps alongside best practices from industry grade developers.",
  joinedCount = 200,
  joinedText = "developers already in queue, Join the Waitlist",
  emailPlaceholder = "Enter your email",
  emailCta = "Join the Waitlist",
  video = {
    title: "Myth-Busting Truths for Developers",
    subtitle: "Watch real developers share their transformation journey",
    wistiaVideoId: "oqxvk0siq4"
  },
  valueProps = [
    {
      title: "73% of developers build identical portfolio projects which gets rejected",
      description: "Youtube clone, weather app, to-do list, If these are your projects, Forget jobs, you won’t land an internship. So stop copying tutorials and start solving real problems..",
      type: "carousel" as const,
      carouselItems: [
        { title: "Portfolio Clone", description: "Identical projects lead to rejection." },
        { title: "Real Problems", description: "Build apps that matter and stand out." }
      ]
    },
    {
      title: "Not just another course, Its a Experiential cohort",
      description: "No bluff. No more scattered learning or random tutorials. This is a hands-on developer journey where you’ll gain every skill needed to become ready for real-world developer work.",
      type: "default" as const
    },
    {
      title: "Approach Development Like a Product Engineer",
      description: "You’ve seen polished apps and scalable systems, now it’s time to build one yourself. Learn how devs plan, structure, and scale features from scratch.",
      type: "default" as const
    },
    {
      title: "Master End-to-End Development",
      description: "From Frontend to Backend, master the entire stack. We don't just teach you code, we teach you how to build and deploy production-ready applications.",
      type: "default" as const
    }
  ]
}: WebCohortHeroProps) {
  
  const scrollToTechStack = () => {
    const el = document.getElementById("tech-stack-carousel");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Box
        sx={{
          backgroundColor: "#000000",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 12, md: 16 },
          pb: 10,
          px: { xs: 2, md: 4 },
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box
          component="img"
          src={HeaderShadow}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: { xs: "400px", md: "700px" },
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none"
          }}
        />

        <Box sx={{ zIndex: 1, mb: 4 }}>
          <Chip text={chipText} />
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontFamily: "Urbanist, sans-serif",
            fontWeight: 400,
            fontSize: { xs: "32px", md: "60px" },
            lineHeight: { xs: 1.2, md: 1.1 },
            color: "#fff",
            textAlign: "center",
            maxWidth: "900px",
            zIndex: 1
          }}
        >
          {title.map((segment, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                fontFamily: segment.highlight ? "Cormorant Garamond, serif" : "inherit",
                fontStyle: segment.highlight ? "italic" : "normal",
                color: segment.highlight ? "#CB97FF" : "inherit"
              }}
            >
              {segment.text}
            </Box>
          ))}
        </Typography>

        <Typography
          sx={{
            color: "#B2B2B2",
            textAlign: "center",
            maxWidth: "700px",
            mt: 4,
            fontSize: { xs: "16px", md: "20px" },
            lineHeight: 1.6,
            zIndex: 1
          }}
        >
          {subtitle}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 6, zIndex: 1, flexDirection: { xs: "column", sm: "row" } }}>
          <Box component="img" src={heroPeople} sx={{ height: "40px" }} />
          <Typography sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
            {joinedCount}+ {joinedText}
          </Typography>
        </Box>

        <VideoSection title={video.title} subtitle={video.subtitle} wistiaVideoId={video.wistiaVideoId} />

        {/* Specialized Value Proposition Cards */}
        <Box sx={{ mt: 10, width: "100%", maxWidth: "1400px", display: "flex", flexDirection: "column", gap: 4, zIndex: 1 }}>
           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
              <Box sx={{ flex: { md: 5 } }}>
                <LevelUpCard 
                  title={valueProps[0]?.title || ""} 
                  description={valueProps[0]?.description || ""} 
                  carouselItems={valueProps[0]?.carouselItems || []} 
                />
              </Box>
              <Box sx={{ flex: { md: 7 } }}>
                <ImageCard 
                  title={valueProps[1]?.title || ""} 
                  description={valueProps[1]?.description || ""} 
                  image={ProvenTechImg} 
                />
              </Box>
           </Box>
           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
              <Box sx={{ flex: { md: 7 } }}>
                <ImageCard 
                  title={valueProps[2]?.title || ""} 
                  description={valueProps[2]?.description || ""} 
                  image={ApprochDevImg} 
                />
              </Box>
              <Box sx={{ flex: { md: 5 } }}>
                <ImageCard 
                  title={valueProps[3]?.title || ""} 
                  description={valueProps[3]?.description || ""} 
                  image={MasterETEDevImg} 
                />
              </Box>
           </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
