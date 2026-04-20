import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { WebCohortFAQProps } from "./schema";
import { Accordion, Chip } from "./internal/components";

export default function WebCohortFAQ({
  title = [{ text: "Got Questions? We've Got Answers", highlight: false }],
  subtitle = "Find answers to the most common questions about our Creative Cohort program. Still have questions? Feel free to reach out!",
  faqs = [
    { id: "1", question: "Is this suitable for someone with no coding background?", answer: "This cohort is designed for developers who already understand coding fundamentals but struggle with real-world application." },
    { id: "2", question: "How is this different from other bootcamps?", answer: "Most bootcamps teach you to follow tutorials. We train you the way we train our internal development teams." },
    { id: "3", question: "What tech stack will I learn?", answer: "You'll master React with TypeScript, Next.js, Node.js, PostgreSQL, Redis, and AWS." },
    { id: "4", question: "What if AI replaces developers?", answer: "We don't teach you to fear AI - we teach you to leverage it as your coding assistant." },
  ],
}: WebCohortFAQProps) {
  return (
    <Box
      id="faq"
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
        style={{ textAlign: "center", width: "100%", maxWidth: "800px" }}
      >
        <Chip text="Frequently Asked Questions" />
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontSize: { xs: "32px", md: "48px" },
            fontWeight: 700,
            mt: 4,
            mb: 2,
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

        <Typography sx={{ color: "#B2B2B2", mb: 8 }}>
          {subtitle}
        </Typography>

        <Box sx={{ textAlign: "left" }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={faq.id}
              index={index + 1}
              title={faq.question}
              content={faq.answer}
              defaultExpanded={index === 0}
            />
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
