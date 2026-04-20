import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Dialog, DialogContent, IconButton, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CheckIcon from "@mui/icons-material/Check";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";

// --- Chip ---
export const Chip: React.FC<{ text: string; fontSize?: number; height?: number }> = ({ text, fontSize = 14, height = 32 }) => (
  <Box
    sx={{
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "100px",
      px: 3,
      py: 0.5,
      height: `${height}px`,
      display: "inline-flex",
      alignItems: "center",
      backdropFilter: "blur(10px)",
    }}
  >
    <Typography sx={{ color: "#CB97FF", fontWeight: 500, fontSize: `${fontSize}px` }}>{text}</Typography>
  </Box>
);

// --- EmailInput ---
export const EmailInput: React.FC<{
  height?: number;
  borderRadius?: number;
  placeholder?: string;
  onEmailSubmit?: (email: string) => void;
  buttonText?: string;
  sx?: any;
}> = ({
  height = 48,
  borderRadius = 8,
  placeholder = "Enter your email",
  onEmailSubmit,
  buttonText = "Join the Waitlist",
  sx,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleButtonClick = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    if (onEmailSubmit) {
      onEmailSubmit(trimmedEmail);
      setEmail("");
    }
  };

  return (
    <Box sx={{ position: "relative", height: `${height}px`, ...sx }}>
      <TextField
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => { setEmail(e.target.value); setError(""); }}
        onKeyPress={(e) => e.key === "Enter" && handleButtonClick()}
        error={!!error}
        sx={{
          height: `${height}px`,
          "& .MuiOutlinedInput-root": {
            height: `${height}px`,
            background: "rgba(157, 157, 157, 0.2)",
            border: error ? "0.5px solid #ff6b6b" : "0.5px solid rgba(255, 255, 255, 0.6)",
            borderRadius: `${borderRadius}px`,
            backdropFilter: "blur(20px)",
            paddingRight: { xs: "100px", sm: "120px" },
            "& fieldset": { border: "none" },
            "& input": { height: "100%", padding: "0 16px", color: "#FFFFFF" },
          },
        }}
      />
      <Button
        onClick={handleButtonClick}
        sx={{
          position: "absolute",
          right: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          height: { xs: "36px", sm: "40px" },
          borderRadius: "8px",
          background: "#5934BC",
          color: "#FFFFFF",
          textTransform: "none",
          fontWeight: 500,
          "&:hover": { background: "#4a2a9f" },
        }}
      >
        {buttonText}
      </Button>
      {error && (
        <Typography sx={{ position: "absolute", top: "100%", left: "0", fontSize: "12px", color: "#ff6b6b", mt: "4px" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

// --- EmailPopUp ---
export const EmailPopUp: React.FC<{
  open: boolean;
  onClose: () => void;
  joinedCount?: number;
  peopleImage?: string;
}> = ({ open, onClose, joinedCount = 500, peopleImage }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible",
        },
      }}
      BackdropProps={{
        sx: { backgroundColor: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(10px)" }
      }}
    >
      <DialogContent sx={{ padding: 0, position: "relative", overflow: "visible" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: "-20px",
            top: "-20px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#fff",
            zIndex: 1001,
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            backgroundColor: "#000000",
            border: "1px solid #404040",
            borderRadius: "16px",
            padding: "3rem 2rem",
            textAlign: "center",
            backdropFilter: "blur(20px)",
          }}
        >
          <Typography component="h2" sx={{ fontWeight: 600, fontSize: "28px", color: "#ffffff", mb: 2 }}>
            Join the <Box component="span" sx={{ color: "#CB97FF", fontStyle: "italic" }}>Developer</Box> Transformation
          </Typography>
          <Typography sx={{ color: "#B2B2B2", mb: 4 }}>
            Get notified when we launch and secure your spot in the future-ready dev cohort.
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, justifyContent: "center" }}>
            {peopleImage && <img src={peopleImage} alt="Waitlist" style={{ maxHeight: "32px" }} />}
            <Typography sx={{ fontWeight: 700, color: "#FFFFFF" }}>
              Already {joinedCount}+ creative minds are lined up.
            </Typography>
          </Box>

          <EmailInput 
            onEmailSubmit={() => { console.log("Submitting"); onClose(); }} 
            buttonText="Join Now" 
            sx={{ maxWidth: "400px", mx: "auto" }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// --- BorderGradient ---
export const BorderGradient: React.FC<{
  children: React.ReactNode;
  outerGradient?: string;
  innerGradient?: string;
  outerAngle?: number;
  innerAngle?: number;
  borderWidth?: number;
  borderRadius?: number;
  sx?: any;
}> = ({
  children,
  outerGradient = "linear-gradient(#111111 46.75%, rgba(203, 151, 255, 0.5) 100%)",
  innerGradient = "linear-gradient(#130B28 0%, #010101 64.84%)",
  outerAngle = 301.51,
  innerAngle = 121.25,
  borderWidth = 1,
  borderRadius = 8,
  sx,
}) => {
  const finalOuterGradient = outerGradient.replace(/linear-gradient\(\s*/, `linear-gradient(${outerAngle}deg, `);
  const finalInnerGradient = innerGradient.replace(/linear-gradient\(\s*/, `linear-gradient(${innerAngle}deg, `);

  return (
    <Box sx={{ background: finalOuterGradient, borderRadius, padding: `${borderWidth}px`, ...sx }}>
      <Box sx={{ borderRadius: borderRadius - borderWidth / 3, width: "100%", height: "100%", background: finalInnerGradient }}>
        {children}
      </Box>
    </Box>
  );
};

// --- HomeCarousel ---
export const HomeCarousel: React.FC<{ items: Array<{ title: string; description: string }> }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1)), 3000);
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  if (!items || items.length === 0) return null;

  return (
    <Box sx={{ width: "100%", minHeight: { xs: "180px", md: "150px" } }}>
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "24px", color: "#FFFFFF", mb: 1 }}>{items[currentIndex]?.title}</Typography>
          <Typography sx={{ color: "#B2B2B2" }}>{items[currentIndex]?.description}</Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

// --- VideoSection ---
export const VideoSection: React.FC<{ title: string; subtitle?: string; wistiaVideoId: string }> = ({ title, wistiaVideoId }) => {
  useEffect(() => {
    if (!document.getElementById("wistia-script")) {
      const script = document.createElement("script");
      script.id = "wistia-script";
      script.src = "https://fast.wistia.com/assets/external/E-v1.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography sx={{ fontWeight: 700, fontSize: { xs: "28px", md: "44px" }, color: "#fff", mb: 4, textAlign: "center" }}>{title}</Typography>
      <Box sx={{ width: "100%", maxWidth: "900px", aspectRatio: "16/9", background: "#1a1a1a", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div className={`wistia_embed wistia_async_${wistiaVideoId}`} style={{ height: "100%", width: "100%" }} />
      </Box>
    </Box>
  );
};

// --- HeroValueProp ---
export const HeroValueProp: React.FC<{ title: string; description: string; children?: React.ReactNode; sx?: any }> = ({ title, description, children, sx }) => (
  <BorderGradient sx={{ width: "100%", p: "2px", ...sx }}>
    <Box sx={{ p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography sx={{ fontWeight: 700, fontSize: { xs: "18px", md: "20px" }, color: "#fff", lineHeight: 1.4 }}>{title}</Typography>
      <Typography sx={{ color: "#D9D9D9", fontSize: { xs: "13px", md: "15px" }, lineHeight: 1.6 }}>{description}</Typography>
      {children}
    </Box>
  </BorderGradient>
);

// --- LevelUpCard ---
export const LevelUpCard: React.FC<{ title: string; description: string; carouselItems: any[] }> = ({ title, description, carouselItems }) => (
  <HeroValueProp title={title} description={description} sx={{ height: "100%", minHeight: { md: "450px" } }}>
     <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
        <HomeCarousel items={carouselItems} />
     </Box>
  </HeroValueProp>
);

// --- ImageCard ---
export const ImageCard: React.FC<{ title: string; description: string; image: string; sx?: any }> = ({ title, description, image, sx }) => (
  <HeroValueProp title={title} description={description} sx={{ height: "100%", ...sx }}>
     <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
        <Box component="img" src={image} sx={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }} />
     </Box>
  </HeroValueProp>
);

// --- IconCard ---
export const IconCard: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <Box
    sx={{
      width: "48px",
      height: "48px",
      background: "linear-gradient(124.18deg, #34265A -6.8%, #0C0913 50.17%)",
      border: "1px solid #1a1a1a",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#CB97FF",
    }}
  >
    {icon}
  </Box>
);

// --- CarouselCard ---
export const CarouselCard: React.FC<{ text: string }> = ({ text }) => (
  <Box
    sx={{
      height: "43px",
      borderRadius: "200px",
      border: "1px solid #0E0E0E",
      px: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(124.18deg, #34265A -6.8%, #0C0913 50.17%)",
    }}
  >
    <Typography sx={{ color: "#fff", fontSize: "14px", whiteSpace: "nowrap" }}>{text}</Typography>
  </Box>
);

// --- BenifitCard ---
export const BenifitCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <BorderGradient
    outerGradient="linear-gradient(rgba(203, 151, 255, 0.5) 2.24%, #111111 27.64%)"
    innerGradient="linear-gradient(rgba(41, 24, 86, 0.5) 2.29%, rgba(13, 8, 27, 0.5) 60.52%, rgba(0, 0, 0, 0.5) 108.82%)"
    outerAngle={177.31}
    innerAngle={177.26}
    sx={{ height: { xs: "auto", md: "300px" }, minHeight: { xs: "260px", md: "300px" } }}
  >
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: "20px" }}>
      <IconCard icon={icon} />
      <Box>
        <Typography component="h3" sx={{ fontWeight: 700, fontSize: { xs: "18px", md: "20px" }, color: "#fff", mb: 1 }}>{title}</Typography>
        <Typography sx={{ color: "#B2B2B2", fontSize: { xs: "13px", md: "14px" }, lineHeight: 1.6 }}>{description}</Typography>
      </Box>
    </Box>
  </BorderGradient>
);

// --- BenifitCarousel ---
export const BenifitCarousel: React.FC<{ items: string[] }> = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Box sx={{ py: 4 }}>
      <Slider {...settings}>
        {items.map((item, idx) => (
          <Box key={idx} sx={{ px: 1 }}>
            <CarouselCard text={item} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

// --- Accordion ---
export const Accordion: React.FC<{ index: string | number; title: string; content: string; defaultExpanded?: boolean; tag?: string }> = ({ index, title, content, defaultExpanded = false, tag }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <Box sx={{ border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", overflow: "hidden", mb: 2 }}>
      <Box onClick={() => setExpanded(!expanded)} sx={{ p: 2, background: "rgba(255, 255, 255, 0.05)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
           <Typography sx={{ color: "#CB97FF", fontWeight: 700 }}>{typeof index === 'number' ? String(index).padStart(2, '0') : index}</Typography>
           <Typography sx={{ color: "#fff", fontWeight: 500 }}>{title}</Typography>
           {tag && <Box sx={{ background: "#CB97FF", color: "#000", px: 1, borderRadius: "4px", fontSize: "10px", fontWeight: 700 }}>{tag}</Box>}
         </Box>
         <ExpandMoreIcon sx={{ color: "#CB97FF", transform: expanded ? "rotate(180deg)" : "none", transition: "0.3s" }} />
      </Box>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <Box sx={{ p: 3, background: "rgba(255, 255, 255, 0.02)", color: "#B2B2B2", fontSize: "14px" }}>
              {content}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

// --- Phases ---
export const Phases: React.FC<{ modules: any[] }> = ({ modules }) => (
  <Box sx={{ width: "100%", maxWidth: "580px", p: 3, background: "#0B0718", borderRadius: "20px", border: "1px solid #141414" }}>
    {modules.map((m, i) => (
      <Accordion key={i} index={`Phase ${i+1}`} title={m.title} content={typeof m.lessons === 'string' ? m.lessons : m.lessons.join(", ")} defaultExpanded={i === 0} />
    ))}
  </Box>
);

// --- Perks ---
export const Perks: React.FC<{ perks: string[] }> = ({ perks }) => (
  <Box sx={{ width: "100%", maxWidth: "343px", p: 4, background: "#0B0718", borderRadius: "20px", border: "1px solid #141414", display: "flex", flexDirection: "column", gap: 3 }}>
    <Typography sx={{ fontWeight: 700, fontSize: "20px", color: "#fff" }}>Perks Of Joining</Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {perks.map((p, i) => (
        <Typography key={i} sx={{ color: "#B2B2B2", fontSize: "14px" }}>{p}</Typography>
      ))}
    </Box>
    <Button fullWidth sx={{ background: "#5934BC", color: "#fff", py: 1.5, borderRadius: "8px", "&:hover": { background: "#4a2a9f" } }}>Join The Waitlist</Button>
  </Box>
);

// --- CohortDate ---
export const CohortDate: React.FC = () => (
   <Box sx={{ width: "100%", maxWidth: "343px", p: 4, background: "linear-gradient(124deg, #5934BC 0%, #CB97FF 100%)", borderRadius: "20px", textAlign: "center" }}>
      <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "24px" }}>Launching Soon</Typography>
      <Typography sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}>Be the first to know when we start the new batch.</Typography>
   </Box>
);

// --- SpeakerCard ---
export const SpeakerCard: React.FC<{ name: string; designation: string; profilePhoto: string; linkedinUrl?: string }> = ({ name, designation, profilePhoto, linkedinUrl }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, background: "#0B0718", border: "1px solid #141414", borderRadius: "24px", p: 1.5, width: "100%", maxWidth: "363px" }}>
    <Box component="img" src={profilePhoto} sx={{ width: "64px", height: "64px", borderRadius: "12px", objectFit: "cover" }} />
    <Box sx={{ flex: 1 }}>
       <Typography sx={{ fontWeight: 700, color: "#fff" }}>{name}</Typography>
       <Typography sx={{ fontSize: "12px", color: "#B2B2B2" }}>{designation}</Typography>
    </Box>
    <IconButton component="a" href={linkedinUrl} target="_blank" sx={{ background: "linear-gradient(90deg, #CB97FF 0%, #5934BC 100%)", color: "#fff", borderRadius: "8px" }}>
       <LinkedInIcon />
    </IconButton>
  </Box>
);

// --- TestimonialCard ---
export const TestimonialCard: React.FC<{ name: string; profilePhoto: string; rating: number; testimonialText: string; position?: string }> = ({ name, profilePhoto, rating, testimonialText }) => (
  <Box sx={{ p: 4, borderRadius: "20px", background: "rgba(32, 24, 53, 0.1)", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", gap: 2, width: { xs: "100%", md: "332px" } }}>
     <Box sx={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }}>
        <img src={profilePhoto} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
     </Box>
     <Rating value={rating} readOnly size="small" />
     <Typography sx={{ fontStyle: "italic", color: "#B2B2B2", fontSize: "14px", lineHeight: 1.6 }}>"{testimonialText}"</Typography>
     <Typography sx={{ fontWeight: 700, color: "#fff" }}>{name}</Typography>
  </Box>
);
