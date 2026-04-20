import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { WebCohortHeaderProps } from "./schema";
import { EmailPopUp } from "./internal/components";

export default function WebCohortHeader({
  logoUrl = "/images/web-cohort/CreativeLogo.png",
  navLinks = [{ label: "Know More", href: "#curriculum" }],
  ctaText = "Join Now",
}: WebCohortHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [emailPopupOpen, setEmailPopupOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleJoinNowClick = () => {
    setEmailPopupOpen(true);
    handleMenuClose();
  };

  return (
    <Box sx={{ position: "fixed", zIndex: 1100, width: "100%", top: 0 }}>
      <AppBar
        sx={{
          backgroundColor: "rgba(6, 6, 6, 0.4)",
          backdropFilter: "blur(40px)",
          borderBottom: "1px solid #404040",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 5, lg: 10 },
            height: { xs: "64px", sm: "72px", md: "80px" },
          }}
        >
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logoUrl}
              alt="Logo"
              sx={{
                height: { xs: "28px", sm: "32px", md: "40px" },
                width: "auto",
                maxWidth: { xs: "140px", sm: "200px" },
              }}
            />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 400,
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                variant="contained"
                onClick={handleJoinNowClick}
                sx={{
                  backgroundColor: "#7c3aed",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  px: 3,
                  "&:hover": { backgroundColor: "#6d28d9" },
                }}
              >
                {ctaText}
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box>
              <IconButton color="inherit" onClick={handleMenuClick} sx={{ color: "#fff" }}>
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#060606",
                    border: "1px solid #404040",
                    borderRadius: "8px",
                    minWidth: "160px",
                  },
                }}
              >
                {navLinks.map((link) => (
                  <MenuItem key={link.label} onClick={handleMenuClose} sx={{ color: "#fff" }}>
                    <a href={link.href} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                      {link.label}
                    </a>
                  </MenuItem>
                ))}
                <MenuItem sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleJoinNowClick}
                    sx={{ backgroundColor: "#7c3aed", color: "#fff", textTransform: "none", borderRadius: "6px" }}
                  >
                    {ctaText}
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Email Popup */}
      <EmailPopUp 
        open={emailPopupOpen} 
        onClose={() => setEmailPopupOpen(false)} 
        peopleImage="/images/web-cohort/hero/hero-people.png"
      />
    </Box>
  );
}
