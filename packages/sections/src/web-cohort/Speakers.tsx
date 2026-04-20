import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { WebCohortSpeakersProps } from "./schema";
import { SpeakerCard, Chip } from "./internal/components";

export default function WebCohortSpeakers({
  title = [{ text: "Preparing You for cross-functional collaboration", highlight: false }],
  subtitle = "Get exclusive access to live guest sessions, featuring industry experts sharing real stories, strategies, and insider insights.",
  speakers = [
    { id: "1", name: "Aman Minhas", designation: "Tech Lead at Nas Company", profilePhoto: "/images/web-cohort/guest01.jpeg", linkedinUrl: "#" },
    { id: "2", name: "Ashish Aryan", designation: "Senior Software Engineer at Velotio", profilePhoto: "/images/web-cohort/guest02.jpeg", linkedinUrl: "#" },
    { id: "3", name: "Dinansh Bhardwaj", designation: "Senior Backend Engineer at Webanix", profilePhoto: "/images/web-cohort/guest03.jpeg", linkedinUrl: "#" },
    { id: "4", name: "Madhav Khandal", designation: "Product Designer at Zoconut", profilePhoto: "/images/web-cohort/guest04.jpeg", linkedinUrl: "#" },
  ],
}: WebCohortSpeakersProps) {
  return (
    <Box
      id="speakers"
      sx={{
        backgroundColor: "#000",
        py: 10,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", width: "100%", maxWidth: "1200px" }}
      >
        <Chip text="From PMs to Lead Devs to Designers" />
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontSize: { xs: "32px", md: "40px" },
            fontWeight: 400,
            mt: 4,
            mb: 2,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {title.map((segment, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                color: segment.highlight ? "#CB97FF" : "inherit",
                fontStyle: segment.highlight ? "italic" : "inherit",
                fontFamily: segment.highlight ? "'Cormorant Garamond', serif" : "inherit",
              }}
            >
              {segment.text}
            </Box>
          ))}
        </Typography>

        <Typography sx={{ color: "#B2B2B2", mb: 8, maxWidth: "700px", mx: "auto" }}>
          {subtitle}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              name={speaker.name}
              designation={speaker.designation}
              profilePhoto={speaker.profilePhoto}
              linkedinUrl={speaker.linkedinUrl}
            />
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
