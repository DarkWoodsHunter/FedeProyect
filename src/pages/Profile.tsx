// pages/Profile.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Avatar,
  Chip,
  LinearProgress,
} from "@mui/material";
import { AdminPanelSettings, Logout } from "@mui/icons-material";
import RadarChart from "../components/RadarChart";
import Stats from "../components/Stats";
import { logout } from "../auth";
import { loadSkills, Skill } from "../utils/skills";
import { GetOneUser, Task } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userData, setUserData] = useState<Task[] | any>([]);
  const { user } = useAuth();

  useEffect(() => {
    setSkills(loadSkills());
    if (user) {
      GetOneUserdata();
    }
  }, []);

  const raw = localStorage.getItem(user!?.uid)
  const parsed = JSON.parse(raw!)

  //call the function to get data from 1 entry and save the info
  const GetOneUserdata = async () => {
    if (user) {
      const aTask = await GetOneUser(user.uid);
      setUserData(aTask);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Card
        sx={{
          width: "min(1100px, 92vw)",
          background: "linear-gradient(135deg, #c5a9e0, #b09ad6)",
          borderRadius: "28px",
          padding: 3,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src="/imgPerfil.jpg"
                sx={{
                  width: 64,
                  height: 64,
                  boxShadow: "0 0 0 6px #6f84e8",
                }}
              />
              <Chip
                label="Maira Rodriguez"
                sx={{
                  background: "#f15ccb",
                  color: "#2d1b69",
                  fontWeight: 800,
                  fontSize: "1rem",
                  padding: "10px 16px",
                  height: "auto",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Level Display */}
              <Box
                sx={{
                  background: "#7f8ef1",
                  color: "#2d1b69",
                  borderRadius: "14px",
                  padding: "6px 10px",
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  LV
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  4
                </Typography>
                <Box sx={{ width: 80, ml: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={55}
                    sx={{
                      height: 8,
                      borderRadius: "999px",
                      backgroundColor: "#2f5bd1",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#53d07c",
                        borderRadius: "999px",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Button
                variant="contained"
                startIcon={<AdminPanelSettings />}
                onClick={() => navigate("/admin")}
                sx={{
                  background: "rgba(79, 105, 211, 0.7)",
                  color: "#2d1b69",
                  fontWeight: 700,
                  "&:hover": {
                    background: "rgba(79, 105, 211, 0.9)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Admin
              </Button>

              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  borderColor: "#2d1b69",
                  color: "#2d1b69",
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "#2d1b69",
                    background: "rgba(45, 27, 105, 0.1)",
                  },
                }}
              >
                Cerrar sesión
              </Button>
            </Box>
          </Box>

          {/* Body */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              mt: 2,
            }}
          >
            {/* Left Panel - Avatar Display */}
            <Box
              sx={{
                minHeight: 330,
                borderRadius: "24px",
                background: "color-mix(in oklab, #9575cd 60%, transparent)",
                boxShadow:
                  "inset 0 8px 16px rgba(0,0,0,.15), inset 0 -6px 8px rgba(255,255,255,.08)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                src="/imgAvatar.png"
                sx={{
                  width: 200,
                  height: 200,
                }}
              />
              {/* Dock */}
              <Box
                sx={{
                  position: "absolute",
                  left: 40,
                  right: 40,
                  bottom: 28,
                  height: 46,
                  borderRadius: "24px",
                  background: "color-mix(in oklab, #9575cd 80%, transparent)",
                  boxShadow: "0 10px 26px rgba(0,0,0,.25)",
                }}
              />
            </Box>

            {/* Right Panel - Tabs and Content */}
            <Box
              sx={{
                borderRadius: "24px",
                padding: "18px 18px 22px",
                background: "color-mix(in oklab, #9575cd 60%, transparent)",
                boxShadow:
                  "inset 0 8px 16px rgba(0,0,0,.15), inset 0 -6px 8px rgba(255,255,255,.08)",
              }}
            >
              {/* Tabs */}
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  mb: 2,
                  minHeight: "auto",
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab
                  label="Stats"
                  sx={{
                    background: activeTab === 0 ? "#f15ccb" : "#a458f3",
                    color: "#2d1b69",
                    fontWeight: 800,
                    borderRadius: "12px 12px 4px 4px",
                    minHeight: "auto",
                    padding: "10px 14px",
                    marginRight: 1,
                    textTransform: "none",
                    boxShadow:
                      activeTab === 0
                        ? "0 2px 0 #c83fb0 inset"
                        : "0 2px 0 #7d3dc1 inset",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      filter: "brightness(1.05)",
                    },
                  }}
                />
                <Tab
                  label="Graphic"
                  sx={{
                    background: activeTab === 1 ? "#f15ccb" : "#a458f3",
                    color: "#2d1b69",
                    fontWeight: 800,
                    borderRadius: "12px 12px 4px 4px",
                    minHeight: "auto",
                    padding: "10px 14px",
                    textTransform: "none",
                    boxShadow:
                      activeTab === 1
                        ? "0 2px 0 #c83fb0 inset"
                        : "0 2px 0 #7d3dc1 inset",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      filter: "brightness(1.05)",
                    },
                  }}
                />
              </Tabs>

              {/* Tab Content */}
              <Box>
                {activeTab === 0 && <Stats skills={skills} />}
                {activeTab === 1 && <RadarChart skills={parsed?.Skill} />}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
