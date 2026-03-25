import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import {
  BarChartRounded,
  GridViewRounded,
  AnalyticsRounded,
  RadarRounded,
} from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import RadarChart from "../components/RadarChart";
import Stats from "../components/Stats";
import { loadSkills, Skill } from "../utils/skills";
import { dashboardPalette } from "../theme";
import { useAuth } from "../contexts/AuthContext";
import { GetOneUser, Task } from "../firebase-config";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAuth();
  const [userData, setUserData] = useState<Task[] | any>([]);


  const panelCard = {
    backgroundColor: "var(--dashboard-panel-bg)",
    border: `3px solid ${dashboardPalette.panelBorder}`,
    borderRadius: "18px",
    boxShadow: "0 5px 0 rgba(62, 80, 147, 0.45)",
  };

  useEffect(() => {
    setSkills(loadSkills());
    if (user) {
      GetOneUserdata();
    }
  }, [user]);

  const GetOneUserdata = async () => {
    if (user) {
      const aTask = await GetOneUser(user.uid);
      setUserData(aTask);
    }
  }

  const raw = localStorage.getItem(user!?.uid)
  const parsed = JSON.parse(raw!)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <DashboardLayout title="Skills & Gráficos">
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          minHeight: "100%",
          backgroundColor: "var(--dashboard-page-bg)",
        }}
      >
        {/* Header */}
        <Card
          sx={{
            mb: 3,
            ...panelCard,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              className="outlined-title-underlined"
              variant="h4"
              sx={{ fontWeight: 900, mb: 1 }}
            >
              Análisis de Habilidades
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--dashboard-text)" }}>
              Visualiza tu progreso y descubre áreas de mejora en tus
              habilidades.
            </Typography>
          </CardContent>
        </Card>

        {/* Main Content - Side by Side Layout */}
        <Grid container spacing={3} sx={{ height: 550 }}>
          {/* Left Side - Stats Table */}
          <Grid item xs={12} lg={6} sx={{ height: "100%" }}>
            <Card
              sx={{
                ...panelCard,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Tabs */}
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    mb: 3,
                    minHeight: "auto",
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                >
                  <Tab
                    icon={
                      <GridViewRounded
                        sx={{
                          color: "var(--dashboard-header-blue)",
                          fontSize: 18,
                        }}
                      />
                    }
                    iconPosition="start"
                    label="Lista de Skills"
                    sx={{
                      background:
                        activeTab === 0
                          ? "var(--dashboard-yellow)"
                          : "var(--dashboard-section-blue)",
                      color: "var(--dashboard-header-blue)",
                      fontWeight: 800,
                      border: `2px solid ${dashboardPalette.panelBorder}`,
                      borderRadius: "12px",
                      minHeight: "auto",
                      padding: "12px 20px",
                      marginRight: 1,
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: "0 3px 0 rgba(62, 80, 147, 0.3)",
                      "&:hover": {
                        background:
                          activeTab === 0
                            ? "var(--dashboard-yellow)"
                            : "var(--dashboard-section-blue)",
                      },
                    }}
                  />
                  <Tab
                    icon={
                      <AnalyticsRounded
                        sx={{
                          color: "var(--dashboard-header-blue)",
                          fontSize: 18,
                        }}
                      />
                    }
                    iconPosition="start"
                    label="Detalles"
                    sx={{
                      background:
                        activeTab === 1
                          ? "var(--dashboard-yellow)"
                          : "var(--dashboard-section-blue)",
                      color: "var(--dashboard-header-blue)",
                      fontWeight: 800,
                      border: `2px solid ${dashboardPalette.panelBorder}`,
                      borderRadius: "12px",
                      minHeight: "auto",
                      padding: "12px 20px",
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: "0 3px 0 rgba(62, 80, 147, 0.3)",
                      "&:hover": {
                        background:
                          activeTab === 1
                            ? "var(--dashboard-yellow)"
                            : "var(--dashboard-section-blue)",
                      },
                    }}
                  />
                </Tabs>

                {/* Tab Content */}
                {activeTab === 0 && (
                  <Box
                    sx={{
                      height: 380,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      overflowY: "auto",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--dashboard-header-blue)",
                        fontWeight: 800,
                        mb: 2,
                      }}
                    >
                      <BarChartRounded
                        sx={{ mr: 1, verticalAlign: "text-bottom" }}
                      />
                      Progreso por Habilidad
                    </Typography>
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {parsed?.Skill?.map((skill: any, index: any) => {
                        return <div key={index}>

                        </div>
                      })}

                      <Stats skills={skills} />
                    </Box>
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--dashboard-header-blue)",
                        fontWeight: 800,
                        mb: 2,
                      }}
                    >
                      <AnalyticsRounded
                        sx={{ mr: 1, verticalAlign: "text-bottom" }}
                      />
                      Estadísticas Detalladas
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          background: "#fff",
                          border: `2px solid ${dashboardPalette.panelBorder}`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--dashboard-text)" }}
                        >
                          Skills Totales
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: "#1bdb6b", fontWeight: 800 }}
                        >
                          {parsed?.Skill?.length}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          background: "#fff",
                          border: `2px solid ${dashboardPalette.panelBorder}`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--dashboard-text)" }}
                        >
                          Promedio General
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: "#ff6ddd", fontWeight: 800 }}
                        >
                          {parsed?.Skill?.length > 0
                            ? Math.round(
                              parsed?.Skill.reduce(
                                (acc: any, skill: any) => acc + skill.Progress,
                                0,
                              ) / skills.length,
                            )
                            : 0}
                          %
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          background: "#fff",
                          border: `2px solid ${dashboardPalette.panelBorder}`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--dashboard-text)" }}
                        >
                          Mejor Skill
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: "#feca52", fontWeight: 800 }}
                        >
                          {parsed?.Skill?.length > 0
                            ? parsed?.Skill.reduce(
                              (max: any, skill: any) =>
                                skill.Progress > max.Progress ? skill : max,
                              parsed.Skill[0],
                            ).Materia
                            : "N/A"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#feca52", fontWeight: 600 }}
                        >
                          {parsed?.Skill?.length > 0
                            ? parsed.Skill.reduce(
                              (max: any, skill: any) =>
                                skill.Progress > max.Progress ? skill : max,
                              parsed.Skill[0],
                            ).Progress
                            : 0}
                          %
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - Radar Chart */}
          <Grid item xs={12} lg={6} sx={{ height: "100%" }}>

            <Card
              sx={{
                ...panelCard,
                height: "100%",
                minWidth: "450px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--dashboard-header-blue)",
                    fontWeight: 800,
                    mb: 2,
                  }}
                >
                  <RadarRounded sx={{ mr: 1, verticalAlign: "text-bottom" }} />
                  Gráfico Radar
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--dashboard-text)",
                    mb: 2,
                    fontSize: "12px",
                  }}
                >
                  Visualización completa de todas tus habilidades en un gráfico
                  interactivo.
                </Typography>

                <Box
                  sx={{
                    height: 380,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {parsed?.Skill?.length > 0 ? (
                    <RadarChart skills={parsed.Skill} />
                  ) : (
                    <Box
                      sx={{
                        height: 400,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        color: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        <BarChartRounded />
                      </Typography>
                      <Typography variant="body1">
                        No hay skills para mostrar
                      </Typography>
                      <Typography variant="body2">
                        Agrega skills desde el panel de administración
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Skills;
