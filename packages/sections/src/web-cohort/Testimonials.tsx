import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { WebCohortTestimonialsProps } from "./schema";
import { TestimonialCard, Chip, EmailInput } from "./internal/components";

export default function WebCohortTestimonials({
  title = [{ text: "From Developers Who Were Once Where You Are", highlight: false }],
  subtitle = "Honest stories from developers who went from rejected applications to dream job offers.",
  testimonials = [
    { id: "1", name: "Paraj Jain", testimonialText: "Creative Cohort join kiya aur 6 months mein real-time collaboration platform build kiya jo actually 5000+ users use karte hain daily.", rating: 5, profilePhoto: "/images/web-cohort/testimonial01.jpeg" },
    { id: "2", name: "Ashmita", testimonialText: "When I deployed it live and showed real user analytics in interviews, recruiters stopped scrolling and started asking technical questions.", rating: 5, profilePhoto: "/images/web-cohort/testimonial02.jpeg" },
    { id: "3", name: "Daksh", testimonialText: "Creative Cohort taught me to make AI my coding assistant instead. My interviewer said 'Finally, someone who understands both AI and scalable systems.'", rating: 5, profilePhoto: "/images/web-cohort/testimonial03.jpeg" },
  ],
}: WebCohortTestimonialsProps) {
  return (
    <Box
      id="testimonials"
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
        <Chip text="Testimonials" />
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontSize: { xs: "32px", md: "48px" },
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
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            mb: 10,
          }}
        >
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              name={t.name}
              testimonialText={t.testimonialText}
              rating={t.rating}
              profilePhoto={t.profilePhoto}
            />
          ))}
        </Box>

        <Box sx={{ maxWidth: "500px", mx: "auto", textAlign: "center" }}>
           <Typography sx={{ color: "#fff", fontWeight: 700, mb: 3 }}>
             Already hundreds of creative minds are lined up. Ready to join them?
           </Typography>
           <EmailInput onEmailSubmit={(e) => console.log(e)} placeholder="Enter your email" />
        </Box>
      </motion.div>
    </Box>
  );
}
