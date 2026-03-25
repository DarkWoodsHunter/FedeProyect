import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  HomeRounded,
  EmojiEventsRounded,
  GridViewRounded,
  FlagRounded,
  Logout,
} from "@mui/icons-material";
import { logout } from "../auth";
import { dashboardPalette } from "../theme";
import profileIcon from "../assets/profile.png";

const MENU_ITEMS = [
  {
    id: "dashboard",
    label: "Inicio",
    icon: HomeRounded,
    path: "/dashboard",
  },
  { 
    id: "redeem",
    label: "Premios",
    icon: EmojiEventsRounded,
    path: "/redeem",
   
  },
  {
    id: "skills",
    label: "Skills",
    icon: GridViewRounded,
    path: "/skills",
  },
  {
    id: "profile",
    label: "Perfil",
    icon: FlagRounded,
    path: "/profile",
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: 86,
        height: "100vh",
        background: "var(--dashboard-sidebar)",
        borderRight: `2px solid ${dashboardPalette.panelBorder}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: `3px solid ${dashboardPalette.headerBlue}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fff4c4",
            boxShadow: "0 3px 0 rgba(47,43,116,0.25)",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={profileIcon}
            alt="Perfil"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ width: "100%", flex: 1, pt: 4 }}>
        <List sx={{ p: 0 }}>
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <ListItem
                key={item.id}
                sx={{ px: 0, py: 0.4, justifyContent: "center" }}
              >
                <Tooltip title={item.label} placement="right">
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      minWidth: 70,
                      maxWidth: 70,
                      height: 64,
                      borderRadius: 0,
                      justifyContent: "center",
                      position: "relative",
                      bgcolor: isActive
                        ? "var(--dashboard-yellow)"
                        : "transparent",
                      borderTop: isActive
                        ? `1px solid ${dashboardPalette.accentYellowDark}`
                        : "none",
                      borderBottom: isActive
                        ? `1px solid ${dashboardPalette.accentYellowDark}`
                        : "none",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: 3,
                        bgcolor: isActive
                          ? dashboardPalette.accentYellowDark
                          : "transparent",
                      },
                      "&:hover": {
                        bgcolor: isActive
                          ? "var(--dashboard-yellow)"
                          : "#f7f7f7",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        color: "var(--dashboard-header-blue)",
                      }}
                    >
                      <Icon sx={{ fontSize: 28 }} />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ pb: 2 }}>
        <Tooltip title="Cerrar sesión" placement="right">
          <IconButton
            onClick={handleLogout}
            sx={{
              color: "var(--dashboard-header-blue)",
              border: `2px solid ${dashboardPalette.panelBorder}`,
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#fff4c4",
              },
            }}
          >
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
