import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { WebCohortFooterProps } from "./schema";
import { Chip, EmailInput } from "./internal/components";

export default function WebCohortFooter({
  title = [{ text: "Ready to Transform Your Creative Journey?", highlight: false }],
  subtitle = "Join our creative cohort and start your journey from beginner to confident developer and storyteller.",
  logoUrl = "/images/web-cohort/CreativeLogo.png",
  email = "cohort@creativeupaay.com",
  phone = "+91-8118855738",
  whatsappNumber = "+91-8118855738",
  whatsappLink = "https://chat.whatsapp.com/KPjM1bvf6BYAUiGc1RpJb5",
  copyright = "© Creative Upaay 2025",
}: WebCohortFooterProps) {
  return (
    <Box
      component="footer"
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
        style={{ width: "100%", maxWidth: "1100px" }}
      >
        <Box
          sx={{
            background: "rgba(20, 20, 20, 0.3)",
            border: "1px solid rgba(69, 51, 128, 0.5)",
            borderRadius: "20px",
            p: { xs: 4, md: 8 },
            textAlign: "center",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden",
            mb: 8,
          }}
        >
          <Chip text="Get Started" />
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontSize: { xs: "28px", md: "52px" },
              fontWeight: 700,
              mt: 4,
              mb: 2,
              fontFamily: "Urbanist, sans-serif",
            }}
          >
            {title.map((segment: any, i: number) => (
              <span
                key={i}
                style={{
                  color: segment.highlight ? "#CB97FF" : "inherit",
                  fontFamily: segment.highlight ? "Cormorant Garamond, serif" : "inherit",
                  fontStyle: segment.highlight ? "italic" : "normal",
                  fontWeight: segment.highlight ? 600 : "inherit",
                }}
              >
                {segment.text}
              </span>
            ))}
          </Typography>
          <Typography sx={{ color: "#B2B2B2", mb: 6, maxWidth: "700px", mx: "auto" }}>
            {subtitle}
          </Typography>

          <Box sx={{ maxWidth: "450px", mx: "auto" }}>
            <EmailInput onEmailSubmit={(e) => console.log(e)} placeholder="Enter your email to join the waitlist" />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
           <img src={logoUrl} alt="Logo" style={{ height: "60px" }} />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: { xs: 2, md: 3 }, mb: 6 }}>
           {email && <ContactBox icon={<EmailIcon />} text={email} href={`mailto:${email}`} />}
           {phone && <ContactBox icon={<PhoneIcon />} text={phone} href={`tel:${phone}`} />}
           {whatsappNumber && <ContactBox icon={<WhatsAppIcon sx={{ color: "#25D366" }} />} text={whatsappNumber} href={whatsappLink} />}
        </Box>

        <Typography sx={{ color: "#666", textAlign: "center", fontSize: "14px" }}>
          {copyright}
        </Typography>
      </motion.div>
    </Box>
  );
}

function ContactBox({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        p: { xs: "12px 24px", md: "20px 40px" },
        minWidth: { xs: "100%", md: "300px" },
        background: "transparent",
        borderTop: "1px solid rgba(69, 51, 128, 0.2)",
        borderBottom: "1px solid rgba(69, 51, 128, 0.2)",
        textDecoration: "none",
        transition: "0.3s",
        "&:hover": { background: "rgba(203, 151, 255, 0.05)", borderColor: "rgba(69, 51, 128, 0.5)" },
      }}
    >
      <Typography sx={{ color: "#fff", fontSize: "16px" }}>{text}</Typography>
      <Box sx={{ color: "#CB97FF" }}>{icon}</Box>
    </Box>
  );
}
