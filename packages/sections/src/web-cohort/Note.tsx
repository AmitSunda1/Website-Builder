import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { WebCohortNoteProps } from "./schema";
import { Chip, EmailPopUp } from "./internal/components";

export default function WebCohortNote({
  title = [{ text: "This is a hands-on, live experience designed to help you find your voice, master storytelling, and edit like a pro using tools you Already have.", highlight: false }],
  chipText = "Note From CEO",
  ctaText = "Join the Waitlist",
}: WebCohortNoteProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        py: { xs: 8, md: 12 },
        px: 2,
        position: "relative",
        borderBottom: "1px solid rgba(69, 51, 128, 0.5)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto" }}
      >
        <Chip text={chipText} />
        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: "24px", md: "40px" },
            lineHeight: 1.4,
            fontWeight: 400,
            mt: 6,
            mb: 6,
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

        <Button
          onClick={() => setOpen(true)}
          sx={{
            background: "#5934BC",
            color: "#fff",
            px: 4,
            py: 1.5,
            borderRadius: "8px",
            fontSize: "18px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { background: "#4a2a9f" },
          }}
        >
          {ctaText}
        </Button>

        <Typography sx={{ color: "#CB97FF", fontWeight: 700, mt: 4, fontSize: "18px" }}>
          ✨ Limited seats only for better experience ✨
        </Typography>
      </motion.div>
      <EmailPopUp open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
