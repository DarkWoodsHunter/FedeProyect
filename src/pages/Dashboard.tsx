import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Button,
  CircularProgress,
} from "@mui/material";
import { Code, Extension, ChangeHistory } from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import { dashboardPalette } from "../theme";
import avatarImage from "../assets/spr_placeholder_avatar.png";
import mascotImage from "../assets/dashboardMascot.png";
import teamImage from "../assets/team.png";
import { useAuth } from "../contexts/AuthContext";
import { GetOneUser, Task } from "../firebase-config";
import NewsCarousel from "../components/NewsCarousel";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<Task[] | any>([]);


  useEffect(() => {
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
  const raw = localStorage.getItem(user!.uid);
  const parsed = JSON.parse(raw!);

  const news = [
    {
      id: 1,
      title: "WEBINAR DISEÑO DE PERSONAJE",
      subtitle: "Faltan 3 días para",
      description: "A través de zoom por la profe Lorena Lorenzo...",
      hasImage: false,
    },
    {
      id: 2,
      title: "Conoce al equipo detrás",
      subtitle: "Novedades",
      description:
        "Conoce a los profesores, equipo académico en el encuentro académico de fin de año.",
      hasImage: true,
    },
  ];

  const skillIcons = [
    <Code key="code" sx={{ fontSize: 18 }} />,
    <Extension key="extension" sx={{ fontSize: 18 }} />,
    <ChangeHistory key="shape" sx={{ fontSize: 18 }} />,
  ];

  const primaryCard = {
    backgroundColor: "var(--dashboard-panel-bg)",
    border: `3px solid ${dashboardPalette.panelBorder}`,
    borderRadius: "18px",
    boxShadow: "0 5px 0 rgba(62, 80, 147, 0.45)",
  };

  const yellowButtonSx = {
    px: 3,
    py: 0.8,
    minWidth: 112,
    borderRadius: "14px",
    backgroundColor: "var(--dashboard-yellow)",
    border: `2px solid ${dashboardPalette.accentYellowDark}`,
    fontWeight: 800,
    boxShadow: "0 3px 0 rgba(211, 158, 0, 0.95)",
    "&:hover": {
      backgroundColor: "var(--dashboard-yellow)",
    },
  };

  const TOP_ROW_HEIGHT = 350;
  const BOTTOM_ROW_HEIGHT = 470;

  return (
    <DashboardLayout title="Dashboard" showNavbar={true}>
      <Box
        sx={{
          minHeight: "100%",
          p: { xs: 1.5, md: 2 },
          backgroundColor: "var(--dashboard-page-bg)",
        }}
      >
        <Box
          sx={{
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Card
                  sx={{
                    ...primaryCard,
                    height: { xs: "auto", md: TOP_ROW_HEIGHT },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        px: 2.5,
                        py: 2,
                        borderBottom: `1px solid ${dashboardPalette.track}`,
                      }}
                    >
                      <Typography
                        className="outlined-title-underlined"
                        sx={{
                          fontWeight: 900,
                          fontSize: "2rem",
                          lineHeight: 1,
                        }}
                      >
                        Mis Skills
                      </Typography>
                    </Box>

                    <Box sx={{ px: 2, py: 1.5 }}>
                      <>{parsed?.Skill?.map((skill: any, index: any) => {
                        return <div key={index}>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "34px 1fr auto",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                bgcolor: "#1f9ddd",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {skillIcons[index] || skillIcons[0]}
                            </Box>
                            <Typography
                              sx={{
                                color: "var(--dashboard-text)",
                                fontWeight: 700,
                                fontSize: "1.05rem",
                              }}
                            >
                              {skill.Materia}
                            </Typography>
                            <Typography
                              sx={{
                                color: "var(--dashboard-text)",
                                fontWeight: 800,
                              }}
                            >
                              {skill.Progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={skill.Progress}
                            sx={{
                              mt: 0.6,
                              ml: "42px",
                              height: 14,
                              borderRadius: 8,
                              backgroundColor: "var(--dashboard-track)",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 8,
                                backgroundColor: "var(--dashboard-teal)",
                              },
                            }}
                          />
                        </div>
                      })}</>
                      {/**
                      {skills.slice(0, 3).map((skill, index) => (
                        <Box key={skill.skill} sx={{ mb: 1.8 }}>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "34px 1fr auto",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                bgcolor: "#1f9ddd",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {skillIcons[index] || skillIcons[0]}
                            </Box>
                            <Typography
                              sx={{
                                color: "var(--dashboard-text)",
                                fontWeight: 700,
                                fontSize: "1.05rem",
                              }}
                            >
                              {skill.skill}
                            </Typography>
                            <Typography
                              sx={{
                                color: "var(--dashboard-text)",
                                fontWeight: 800,
                              }}
                            >
                              {skill.level}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={skill.level}
                            sx={{
                              mt: 0.6,
                              ml: "42px",
                              height: 14,
                              borderRadius: 8,
                              backgroundColor: "var(--dashboard-track)",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 8,
                                backgroundColor: "var(--dashboard-teal)",
                              },
                            }}
                          />
                        </Box>
                      ))}
                         */}
                    </Box>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    ...primaryCard,
                    overflow: "hidden",
                    height: { xs: "auto", md: BOTTOM_ROW_HEIGHT },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        height: 350,
                        m: 1,
                        borderRadius: "10px",
                        background:
                          "linear-gradient(180deg, #6e63f0 0%, #ce77ef 100%)",
                        border: `2px solid ${dashboardPalette.white}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {parsed && parsed.PortraitImg !== undefined ?
                        parsed.PortraitImg === "" ?
                          <Box
                            component="img"
                            src={avatarImage}
                            alt="Avatar"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          /> :
                          <Box
                            component="img"
                            src={parsed.PortraitImg}
                            alt="Avatar"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        :
                        <Box
                          component="img"
                          src={avatarImage}
                          alt="Avatar"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />}

                    </Box>

                    <Box
                      sx={{
                        px: 2,
                        pb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          className="outlined-title-underlined"
                          sx={{ fontWeight: 900, fontSize: "2rem" }}
                        >
                          {parsed && parsed.Nombre !== undefined ?
                            <>{parsed.Nombre}</>
                            : <>Loading...</>}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--dashboard-text)",
                            fontSize: "1.4rem",
                          }}
                        >
                          {parsed && parsed.Nivel !== undefined ?
                            <>Nivel {parsed.Nivel}</>
                            : <>Nivel 0</>}
                        </Typography>
                      </Box>
                      {/**
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {["F", "☺"].map((badge) => (
                          <Box
                            key={badge}
                            sx={{
                              width: 42,
                              height: 42,
                              borderRadius: "50%",
                              border: `3px solid ${dashboardPalette.accentYellowDark}`,
                              bgcolor: "#f7d387",
                              color: "#9a5f00",
                              fontWeight: 800,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.2rem",
                            }}
                          >
                            {badge}
                          </Box>
                        ))}
                      </Box>
                       */}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  height: { xs: "auto", md: TOP_ROW_HEIGHT },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "var(--dashboard-yellow)",
                    border: `3px solid ${dashboardPalette.accentYellowDark}`,
                    borderRadius: "16px",
                    height: 58,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 0 rgba(211, 158, 0, 0.85)",
                  }}
                >
                  <Typography
                    className="outlined-title-underlined"
                    sx={{
                      fontWeight: 900,
                      fontSize: "2rem",
                    }}
                  >
                    Noticias
                  </Typography>
                </Box>

                <Card
                  sx={{
                    ...primaryCard,
                    flex: 1,
                    overflow: "hidden",
                  }}
                >
                  <NewsCarousel></NewsCarousel>
                  {/* 
                  <CardContent
                    sx={{
                      p: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "var(--dashboard-text)",
                        fontWeight: 700,
                        mb: 0.8,
                        fontSize: "1.15rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {news[0].subtitle}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--dashboard-text)",
                        fontWeight: 900,
                        mb: 0.8,
                        fontSize: "1.85rem",
                        lineHeight: 1.1,
                      }}
                    >
                      {news[0].title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--dashboard-text)",
                        mb: 1.5,
                        fontSize: "1.05rem",
                        lineHeight: 1.3,
                        flex: 1,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {news[0].description}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button sx={yellowButtonSx}>
                        <Box component="span" className="outlined-button-text">
                          Leer más
                        </Box>
                      </Button>
                    </Box>
                  </CardContent>
                  */}
                </Card>
              </Box>

              <Card
                sx={{
                  ...primaryCard,
                  overflow: "hidden",
                  height: { xs: "auto", md: BOTTOM_ROW_HEIGHT },
                }}
              >
                <Box
                  sx={{
                    height: 290,
                    background:
                      "linear-gradient(180deg, #99addc 0%, #879ccb 100%)",
                    borderBottom: `2px solid ${dashboardPalette.panelBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={teamImage}
                    alt="Equipo"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      color: "var(--dashboard-text)",
                      fontWeight: 900,
                      mb: 0.8,
                      fontSize: "1.85rem",
                      lineHeight: 1.15,
                    }}
                  >
                    {news[1].title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--dashboard-text)",
                      mb: 1.2,
                      fontSize: "1.05rem",
                      lineHeight: 1.35,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {news[1].description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button sx={yellowButtonSx}>
                      <Box component="span" className="outlined-button-text">
                        Leer más
                      </Box>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Card
                  sx={{
                    ...primaryCard,
                    overflow: "hidden",
                    height: { xs: "auto", md: TOP_ROW_HEIGHT },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        px: 2.5,
                        py: 2,
                        borderBottom: `1px solid ${dashboardPalette.track}`,
                      }}
                    >
                      <Typography
                        className="outlined-title-underlined"
                        sx={{
                          fontWeight: 900,
                          fontSize: "2rem",
                        }}
                      >
                        Progreso
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", justifyContent: "center", py: 2 }}
                    >
                      <Box
                        sx={{ position: "relative", display: "inline-flex" }}
                      >
                        {parsed && parsed.CurrentExp !== undefined ?
                          <>
                            <CircularProgress
                              variant="determinate"
                              value={100}
                              size={150}
                              thickness={4}
                              sx={{
                                color: "var(--dashboard-track)",
                                position: "absolute",
                                left: 0,
                              }}
                            />
                            <CircularProgress
                              variant="determinate"
                              value={parsed.CurrentExp * 100 / 1000}
                              size={150}
                              thickness={4}
                              sx={{ color: "var(--dashboard-teal)" }}
                            />
                            <Box
                              sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#7f96e6",
                                  fontWeight: 900,
                                  fontSize: "3.2rem",
                                  lineHeight: 1,
                                }}
                              >
                                {parsed.CurrentExp * 100 / 1000}
                                <Typography
                                  component="span"
                                  sx={{ fontWeight: 800, fontSize: "1.8rem" }}
                                >
                                  %
                                </Typography>
                              </Typography>
                            </Box>
                          </>
                          : <>
                            <>
                              <CircularProgress
                                variant="determinate"
                                value={100}
                                size={150}
                                thickness={4}
                                sx={{
                                  color: "var(--dashboard-track)",
                                  position: "absolute",
                                  left: 0,
                                }}
                              />
                              <CircularProgress
                                variant="determinate"
                                value={0}
                                size={150}
                                thickness={4}
                                sx={{ color: "var(--dashboard-teal)" }}
                              />
                              <Box
                                sx={{
                                  top: 0,
                                  left: 0,
                                  bottom: 0,
                                  right: 0,
                                  position: "absolute",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "#7f96e6",
                                    fontWeight: 900,
                                    fontSize: "3.2rem",
                                    lineHeight: 1,
                                  }}
                                >
                                  {0}
                                  <Typography
                                    component="span"
                                    sx={{ fontWeight: 800, fontSize: "1.8rem" }}
                                  >
                                    %
                                  </Typography>
                                </Typography>
                              </Box>
                            </>
                          </>}

                      </Box>
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "var(--dashboard-section-blue)",
                        py: 1.3,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        className="outlined-title-underlined"
                        sx={{
                          fontWeight: 900,
                          fontSize: "2rem",
                        }}
                      >
                        {parsed && parsed.Nivel !== undefined ?
                          <>Nivel {parsed.Nivel}</>
                          : <>Nivel 0</>}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ p: 2, display: "flex", justifyContent: "center" }}
                    >
                      <Button sx={yellowButtonSx}>
                        <Box component="span" className="outlined-button-text">
                          Ver más
                        </Box>
                      </Button>
                    </Box>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    ...primaryCard,
                    backgroundColor: "var(--dashboard-mascot-bg)",
                    height: { xs: "auto", md: BOTTOM_ROW_HEIGHT },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                  }}
                >
                  <Box
                    component="img"
                    src={mascotImage}
                    alt="Mascota"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
