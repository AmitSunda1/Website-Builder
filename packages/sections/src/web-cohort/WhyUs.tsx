import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { WebCohortWhyUsProps } from "./schema";
import { Chip } from "./internal/components";

export default function WebCohortWhyUs({
  title = [{ text: "Creative Upaay Vs. The Rest", highlight: false }],
  subtitle = "We’ve crafted an experience that breaks away from the usual — designed to help you grow, create, and thrive in today’s creator economy.",
  othersPoints = [
    "YouTube tutorials and copy-paste learning",
    "Generic projects: to-do lists, Netflix clones",
    "Theory-heavy lectures",
    "Self-paced isolation",
  ],
  ourPoints = [
    "Hands-on mentorship from industry pros",
    "Real-world products solving actual problems",
    "Industry workflows - sprints, reviews",
    "Cohort accountability with 90%+ completion",
  ],
}: WebCohortWhyUsProps) {
  return (
    <Box id="why-us" sx={{ backgroundColor: "#000", py: 10, px: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", width: "100%", maxWidth: "1200px" }}>
        <Chip text="Why This Workshop" />
        <Typography variant="h2" sx={{ color: "#fff", fontSize: { xs: "32px", md: "40px" }, fontWeight: 400, mt: 4, mb: 2, textAlign: "center" }}>
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
        <Typography sx={{ color: "#B2B2B2", mb: 8, maxWidth: "700px", mx: "auto" }}>{subtitle}</Typography>

        <Box sx={{ width: "100%", maxWidth: "858px", mx: "auto", p: { xs: 2, md: 5 }, background: "#06050B", border: "1px solid #141414", borderRadius: "24px", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 5 }}>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
             <Typography sx={{ color: "#FF4444", fontWeight: 600, fontSize: "20px" }}>Others</Typography>
             {othersPoints.map((p, i) => (
               <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                 <CloseIcon sx={{ color: "#FF4444", fontSize: "20px" }} />
                 <Typography sx={{ color: "#B2B2B2", fontSize: "14px" }}>{p}</Typography>
               </Box>
             ))}
          </Box>

          <Box sx={{ flex: 1, background: "#0B0718", p: 3, borderRadius: "20px", border: "1px solid #141414" }}>
            <Box sx={{ background: "linear-gradient(124deg, #201835 0%, #0C0913 100%)", p: 3, borderRadius: "12px", border: "1px solid rgba(69, 51, 128, 0.5)" }}>
              <Typography sx={{ color: "#CB97FF", fontWeight: 600, fontSize: "20px", mb: 3 }}>Creative Cohort</Typography>
              {ourPoints.map((p, i) => (
                <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                  <CheckIcon sx={{ color: "#00D26A", fontSize: "20px" }} />
                  <Typography sx={{ color: "#fff", fontSize: "14px" }}>{p}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
