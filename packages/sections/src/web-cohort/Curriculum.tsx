import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { WebCohortCurriculumProps } from "./schema";
import { Phases, Perks, CohortDate, Chip } from "./internal/components";

export default function WebCohortCurriculum({
  title = [
    { text: "Our Cohort Includes What ", highlight: false },
    { text: "Real Developers", highlight: true },
    { text: " Actually Use", highlight: false }
  ],
  subtitle = "No outdated frameworks or toy projects. Master exact tools and practices powering today's top teams.",
  modules = [],
  perks = [
    "✨ Lifetime access to course materials",
    "👥 Direct mentorship from industry experts",
    "🏆 Certificate of completion",
    "💼 Job placement assistance",
    "🌐 Access to exclusive developer community",
    "📚 Bonus resources and advanced tutorials",
  ],
}: WebCohortCurriculumProps) {
  return (
    <Box
      id="curriculum"
      sx={{
        backgroundColor: "#000000",
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: {
          xs: "2rem 1rem",
          md: "4rem 2rem",
          lg: "4rem 2rem",
        },
        textAlign: "center",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
      >
        <Box sx={{ maxWidth: "900px", width: "100%", mb: { xs: 6, md: 10 } }}>
          <Chip text="Curriculum" />
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Urbanist, sans-serif",
              fontWeight: 400,
              fontSize: { xs: "32px", md: "40px" },
              lineHeight: 1.2,
              color: "#ffffff",
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

          <Typography sx={{ color: "#B2B2B2", fontSize: { xs: "14px", md: "18px" }, maxWidth: "700px", mx: "auto" }}>
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "center",
            alignItems: { xs: "center", lg: "flex-start" },
            gap: { xs: "2rem", lg: "20px" },
            maxWidth: "1200px",
          }}
        >
          {/* Phases Column */}
          <Box sx={{ width: "100%", maxWidth: "580px" }}>
            <Phases modules={modules} />
          </Box>

          {/* Perks and CohortDate Column */}
          <Box sx={{ width: "100%", maxWidth: "343px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Perks perks={perks} />
            <CohortDate />
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
