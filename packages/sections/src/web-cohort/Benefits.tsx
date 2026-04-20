import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import WorkIcon from "@mui/icons-material/Work";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import { WebCohortBenefitsProps } from "./schema";
import { BenifitCard, BenifitCarousel, Chip } from "./internal/components";

// Asset Import
import BenifitShadow from "./assets/Benifits/BenifitShadow.webp";

const iconMap: Record<string, React.ReactNode> = {
  SchoolIcon: <SchoolIcon />,
  BuildIcon: <BuildIcon />,
  WorkIcon: <WorkIcon />,
  FeedbackIcon: <FeedbackIcon />,
  PeopleIcon: <PeopleIcon />,
  BusinessIcon: <BusinessIcon />,
};

export default function WebCohortBenefits({
  title = [
    { text: "What's for you in the Creative ", highlight: false },
    { text: "Cohort", highlight: true }
  ],
  benefits = [
    { title: "Real Usecase Projects", description: "You're not building tic-tac-toe here. You’ll solve actual problems, build usable products.", icon: "BuildIcon" },
    { title: "Tech That’s Used in Real Teams", description: "You’ll learn modern frameworks, CI/CD pipelines, Git workflows.", icon: "SchoolIcon" },
    { title: "Portfolios that recruiter hires", description: "Your final projects won’t sit in folders collecting dust. They’ll be structured.", icon: "WorkIcon" },
    { title: "Industry Mentorship", description: "Get direct feedback from engineers working in top tech companies.", icon: "PeopleIcon" },
    { title: "Job Readiness", description: "Go beyond basic coding; learn architecture, scaling, and production best practices.", icon: "BusinessIcon" },
    { title: "Feedback Loops", description: "Regular code reviews and feedback to ensure you're improving every day.", icon: "FeedbackIcon" },
  ],
}: WebCohortBenefitsProps) {
  const techStack = ["React", "Node.js", "TypeScript", "Express", "MongoDB", "PostgreSQL", "REST APIs", "Microservices", "WebSockets", "Git & GitHub", "GraphQL"];

  return (
    <Box
      id="benefits"
      sx={{
        backgroundColor: "#000",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Shadow */}
      <Box
        component="img"
        src={BenifitShadow}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          maxHeight: "800px",
          opacity: 0.8,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: 1, textAlign: "center", width: "100%", maxWidth: "1200px" }}
      >
        <Chip text="Benefits" />
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontSize: { xs: "32px", md: "50px" },
            lineHeight: 1.2,
            fontWeight: 400,
            fontFamily: "Urbanist, sans-serif",
            mt: 3,
            mb: 2,
          }}
        >
          {title.map((segment, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                color: segment.highlight ? "#CB97FF" : "inherit",
                fontStyle: segment.highlight ? "italic" : "normal",
                fontFamily: segment.highlight ? "Cormorant Garamond, serif" : "inherit",
              }}
            >
              {segment.text}
            </Box>
          ))}
        </Typography>

        <Typography sx={{ color: "#B2B2B2", mb: 8, maxWidth: "700px", mx: "auto", fontSize: { xs: "14px", md: "18px" } }}>
          Real projects. Real mentorship. Real transformation. Why hundreds trust this cohort to go from intern to job-ready dev.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 4,
            mb: 4,
          }}
        >
          {benefits.map((benefit, idx) => (
            <BenifitCard
              key={idx}
              title={benefit.title}
              description={benefit.description}
              icon={iconMap[benefit.icon] || <BuildIcon />}
            />
          ))}
        </Box>

        <BenifitCarousel items={techStack} />
      </motion.div>

      {/* Bottom Shadow (Rotated 180 degrees for symmetry) */}
      <Box
        component="img"
        src={BenifitShadow}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          maxHeight: "800px",
          opacity: 0.8,
          pointerEvents: "none",
          transform: "rotate(180deg)",
          zIndex: 0
        }}
      />
    </Box>
  );
}
