import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  LinearProgress,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Edit,
  Timeline,
  TrendingUp,
  LocalFireDepartmentRounded,
  BarChartRounded,
  AccessTimeRounded,
  PsychologyRounded,
  EmojiEventsRounded,
  FaceRounded,
  StarRounded,
  CalendarMonthRounded,
  WorkspacePremiumRounded
} from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { loadSkills, Skill } from "../utils/skills";
import { dashboardPalette } from "../theme";
import profileIcon from "../assets/profile.png";
import LogrosCarousel from "../components/LogrosCarousel";
import ReactTimeAgo from "react-time-ago";
import "react-time-ago/locale/es"

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setSkills(loadSkills());
  }, []);

  const raw = localStorage.getItem(user!?.uid)
  const parsed = JSON.parse(raw!)

  /*
  const achievements = [
    {
      id: 1,
      name: "Primera Skill",
      icon: "🎯",
      description: "Agrega tu primera habilidad",
      completed: true,
    },
    {
      id: 2,
      name: "Nivel 4",
      icon: "🏆",
      description: "Alcanza el nivel 4",
      completed: true,
    },
    {
      id: 3,
      name: "Maestro Skills",
      icon: "👑",
      description: "Completa 5 habilidades al 80%",
      completed: false,
    },
    {
      id: 4,
      name: "Avatar Personalizado",
      icon: "👤",
      description: "Personaliza tu avatar",
      completed: true,
    },
    {
      id: 5,
      name: "Racha 7 días",
      icon: "🔥",
      description: "Inicia sesión 7 días seguidos",
      completed: true,
    },
  ]; 
  */

  const panelCard = {
    backgroundColor: "var(--dashboard-panel-bg)",
    border: `3px solid ${dashboardPalette.panelBorder}`,
    borderRadius: "18px",
    boxShadow: "0 5px 0 rgba(62, 80, 147, 0.45)",
  };

  const recentActivity = [
    {
      action: "Skill Programming actualizada",
      time: "2h",
      icon: <PsychologyRounded sx={{ color: "#fff", fontSize: 18 }} />,
      iconBg: "#1f9ddd",
    },
    {
      action: 'Logro "Nivel 4" desbloqueado',
      time: "1d",
      icon: <EmojiEventsRounded sx={{ color: "#fff", fontSize: 18 }} />,
      iconBg: "var(--dashboard-yellow-dark)",
    },
    {
      action: "Avatar personalizado",
      time: "2d",
      icon: <FaceRounded sx={{ color: "#fff", fontSize: 18 }} />,
      iconBg: "#7f96e6",
    },
    {
      action: "Nueva skill agregada",
      time: "3d",
      icon: <StarRounded sx={{ color: "#fff", fontSize: 18 }} />,
      iconBg: "var(--dashboard-teal)",
    },
    {
      action: "Inicio de sesión diario",
      time: "3d",
      icon: <CalendarMonthRounded sx={{ color: "#fff", fontSize: 18 }} />,
      iconBg: "#5f7bd7",
    },
  ];

  return (
    <DashboardLayout title="Mi Perfil">
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "var(--dashboard-page-bg)",
          minHeight: "100%",
        }}
      >
        <Card
          sx={{
            mb: 3,
            ...panelCard,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexWrap: "wrap",
              }}
            >
              {parsed && parsed.PortraitImg !== undefined ?
                parsed.PortraitImg === "" ?
                  <Avatar
                    src={profileIcon}
                    sx={{
                      width: 120,
                      height: 120,
                      border: `4px solid ${dashboardPalette.headerBlue}`,
                      boxShadow: "0 4px 0 rgba(47,43,116,0.25)",
                    }}
                  />
                  : <Avatar
                    src={parsed.PortraitImg}
                    sx={{
                      width: 120,
                      height: 120,
                      border: `4px solid ${dashboardPalette.headerBlue}`,
                      boxShadow: "0 4px 0 rgba(47,43,116,0.25)",
                    }}
                  /> :
                <Avatar
                  src={profileIcon}
                  sx={{
                    width: 120,
                    height: 120,
                    border: `4px solid ${dashboardPalette.headerBlue}`,
                    boxShadow: "0 4px 0 rgba(47,43,116,0.25)",
                  }}
                />}

              <Box sx={{ flex: 1 }}>
                <Typography
                  className="outlined-title-underlined"
                  variant="h3"
                  sx={{ fontWeight: 900, mb: 1 }}
                >
                  {parsed?.Nombre || "Usuario"}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: "var(--dashboard-text)", mb: 2 }}
                >
                  {parsed?.Email}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
                  <Chip
                    label={"Nivel " + parsed?.Nivel}
                    sx={{
                      background: "var(--dashboard-yellow)",
                      color: "var(--dashboard-header-blue)",
                      border: `2px solid ${dashboardPalette.accentYellowDark}`,
                      fontWeight: 800,
                    }}
                  />
                  <Chip
                    label={parsed?.CurrentExp + " XP"}
                    sx={{
                      background: "rgba(79, 194, 134, 0.18)",
                      color: "#1f8f62",
                      fontWeight: 600,
                      border: "1px solid #1f8f62",
                    }}
                  />
                  <Chip
                    label={parsed?.Logros?.length + " Logros"}
                    sx={{
                      background: "rgba(247, 197, 11, 0.2)",
                      color: "#9a7000",
                      fontWeight: 600,
                      border: `1px solid ${dashboardPalette.accentYellowDark}`,
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--dashboard-text)" }}
                  >
                    Progreso al Nivel {parsed?.Nivel + 1}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={parsed?.CurrentExp * 100 / 1000}
                    sx={{
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "var(--dashboard-track)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "var(--dashboard-teal)",
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--dashboard-teal)", fontWeight: 700 }}
                  >
                    {parsed?.CurrentExp * 100 / 1000}%
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  sx={{
                    backgroundColor: "var(--dashboard-yellow)",
                    color: "var(--dashboard-header-blue)",
                    fontWeight: 800,
                    border: `2px solid ${dashboardPalette.accentYellowDark}`,
                    boxShadow: "0 3px 0 rgba(211, 158, 0, 0.95)",
                    "&:hover": {
                      backgroundColor: "var(--dashboard-yellow)",
                    },
                  }}
                >
                  Editar Perfil
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Stats Overview */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                ...panelCard,
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  className="outlined-title-underlined"
                  variant="h5"
                  sx={{ fontWeight: 900, mb: 3 }}
                >
                  <BarChartRounded
                    sx={{ mr: 1, verticalAlign: "text-bottom" }}
                  />
                  Estadísticas Generales
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <TrendingUp
                        sx={{ fontSize: 40, color: "#1bdb6b", mb: 1 }}
                      />
                      <Typography
                        variant="h4"
                        sx={{ color: "#1bdb6b", fontWeight: 800 }}
                      >
                        {parsed?.Skill?.length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#2d1b69" }}>
                        Skills Totales
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Timeline
                        sx={{ fontSize: 40, color: "#ff6ddd", mb: 1 }}
                      />
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
                      <Typography variant="body2" sx={{ color: "#2d1b69" }}>
                        Promedio
                      </Typography>
                    </Box>
                  </Grid>
                  {/*
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <EmojiEvents
                        sx={{ fontSize: 40, color: "#feca52", mb: 1 }}
                      />
                      <Typography
                        variant="h4"
                        sx={{ color: "#feca52", fontWeight: 800 }}
                      >
                        {userData?.Logros?.length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#2d1b69" }}>
                        Logros
                      </Typography>
                    </Box>
                  </Grid>
 */}
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <LocalFireDepartmentRounded
                        sx={{ fontSize: 40, color: "#5f7bd7", mb: 1 }}
                      />
                      <Typography
                        variant="h4"
                        sx={{ color: "#5f7bd7", fontWeight: 800 }}
                      >
                        7
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#2d1b69" }}>
                        Días Racha
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card
              sx={{
                ...panelCard,
              }}
            >
              {parsed.Logros?.length >= 1 ?
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    className="outlined-title-underlined"
                    variant="h5"
                    sx={{ fontWeight: 900, mb: 3 }}
                  >
                    <WorkspacePremiumRounded
                      sx={{ mr: 1, verticalAlign: "text-bottom" }}
                    />
                    Logros
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <LogrosCarousel></LogrosCarousel>

                    {/**
                  {achievements.map((achievement) => (
                    <Box
                      key={achievement.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: "16px",
                        background: achievement.completed
                          ? "rgba(79, 194, 134, 0.15)"
                          : "#fff",
                        border: achievement.completed
                          ? "1px solid rgba(79, 194, 134, 0.5)"
                          : `1px solid ${dashboardPalette.panelBorder}`,
                        opacity: achievement.completed ? 1 : 0.6,
                      }}
                    >
                      <Typography sx={{ fontSize: "32px", mr: 2 }}>
                        {achievement.icon}
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "#2d1b69", fontWeight: 700 }}
                        >
                          {achievement.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#2d1b69" }}>
                          {achievement.description}
                        </Typography>
                      </Box>
                      {achievement.completed && (
                        <Chip
                          label="Completado"
                          size="small"
                          sx={{
                            background: "var(--dashboard-teal)",
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
                  ))} 
                   */}
                  </Box>
                </CardContent>
                :
                <></>
              }
            </Card>
          </Grid>

          {/* Recent Activity */}
          {/** */}
          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                ...panelCard,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  className="outlined-title-underlined"
                  variant="h6"
                  sx={{ fontWeight: 900, mb: 3 }}
                >
                  <AccessTimeRounded
                    sx={{ mr: 1, verticalAlign: "text-bottom" }}
                  />
                  Actividad Reciente
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  {parsed.Notifications?.map((notif: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: "8px",
                        background: "#fff",
                        border: `1px solid ${dashboardPalette.panelBorder}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          mr: 1.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {notif.Icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#2d1b69",
                            fontWeight: 600,
                            lineHeight: 1.2,
                          }}
                        >
                          {notif.Title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#6c6c6c" }}>
                          {notif.Date ?
                            <ReactTimeAgo date={notif.Date.seconds * 1000} locale="es" />
                            :
                            <></>}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider
                  sx={{ my: 2, borderColor: `${dashboardPalette.panelBorder}` }}
                />

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: "var(--dashboard-header-blue)",
                    borderColor: `${dashboardPalette.panelBorder}`,
                    fontWeight: 700,
                    "&:hover": {
                      background: "#fff",
                      borderColor: `${dashboardPalette.panelBorder}`,
                    },
                  }}
                >
                  Ver Todo el Historial
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default ProfilePage;
