import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Save, RestartAlt, Close } from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import CustomAvatar from "../components/CustomAvatar";
import { AvatarConfig, DEFAULT_AVATAR, ACCESSORY_ITEMS } from "../types/user";

const AVATAR_OPTIONS = [
  { id: 0, name: "Avatar 1" },
  { id: 1, name: "Avatar 2" },
  { id: 2, name: "Avatar 3" },
  { id: 3, name: "Avatar 4" },
  { id: 4, name: "Avatar 5" },
];

const AvatarCustomization: React.FC = () => {
  const [avatarConfig, setAvatarConfig] =
    useState<AvatarConfig>(DEFAULT_AVATAR);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      try {
        const parsed = JSON.parse(savedAvatar);
        setAvatarConfig(parsed);
      } catch (error) {
        console.error("Error loading saved avatar:", error);
      }
    }
  }, []);

  const updateAvatar = (base: number) => {
    setAvatarConfig((prev) => ({
      ...prev,
      base,
    }));
  };

  const removeAccessory = (type: "hat" | "clothing" | "hairstyle") => {
    setAvatarConfig((prev) => ({
      ...prev,
      accessories: {
        ...prev.accessories,
        [type]: undefined,
      },
    }));
  };

  const saveAvatar = () => {
    localStorage.setItem("userAvatar", JSON.stringify(avatarConfig));
    setSavedMessage("¡Avatar guardado correctamente!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const resetAvatar = () => {
    setAvatarConfig(DEFAULT_AVATAR);
    setSavedMessage("Avatar restablecido");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #e8dff5 0%, #dbd6e8 100%)",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "#333",
            textAlign: "center",
          }}
        >
          Avatar
        </Typography>

        {savedMessage && (
          <Card sx={{ mb: 3, background: "#4caf50", borderRadius: "12px" }}>
            <CardContent sx={{ py: 2 }}>
              <Typography
                sx={{ color: "#fff", fontWeight: 600, textAlign: "center" }}
              >
                {savedMessage}
              </Typography>
            </CardContent>
          </Card>
        )}

        <Grid spacing={3}>
          {/* Avatar Preview + Item Chest Combined */}
          <Grid sx={{ xs: 12 }}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #c5a9e0, #b09ad6)",
                borderRadius: "24px",
                overflow: "hidden",
                height: "100%",
                minHeight: 650,
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  background: "linear-gradient(135deg, #c5a9e0, #b09ad6)",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Personalizar Avatar
                </Typography>
              </Box>

              {/* Main Content */}
              <Box sx={{ background: "white", p: 3 }}>
                <Grid container spacing={3}>
                  {/* Left - Avatar Preview */}
                  <Grid item xs={12} md={5}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#333",
                        fontWeight: 600,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      Avatar
                    </Typography>

                    <Box
                      sx={{ mb: 3, display: "flex", justifyContent: "center" }}
                    >
                      <CustomAvatar
                        config={avatarConfig}
                        size={180}
                        fullBody={true}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={saveAvatar}
                        sx={{
                          background:
                            "linear-gradient(135deg, #ff6b6b, #ee5a52)",
                          color: "white",
                          fontWeight: 600,
                          px: 3,
                          borderRadius: "12px",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #ee5a52, #ff6b6b)",
                          },
                        }}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<RestartAlt />}
                        onClick={resetAvatar}
                        sx={{
                          borderColor: "rgba(0, 0, 0, 0.2)",
                          color: "#333",
                          borderRadius: "12px",
                          "&:hover": {
                            borderColor: "#ff6b6b",
                            background: "rgba(255, 107, 107, 0.1)",
                          },
                        }}
                      >
                        Restablecer
                      </Button>
                    </Box>
                  </Grid>

                  {/* Right - Customization */}
                  <Grid item xs={12} md={7}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#333",
                        fontWeight: 600,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      Selecciona tu Avatar Base
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {AVATAR_OPTIONS.map((option) => (
                        <Grid item xs={6} sm={4} key={option.id}>
                          <Card
                            sx={{
                              background:
                                avatarConfig.base === option.id
                                  ? "linear-gradient(135deg, #ff6b6b, #ee5a52)"
                                  : "#f5f5f5",
                              borderRadius: "16px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              border:
                                avatarConfig.base === option.id
                                  ? "3px solid #fff"
                                  : "2px solid #e0e0e0",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                              },
                            }}
                            onClick={() => updateAvatar(option.id)}
                          >
                            <CardContent sx={{ p: 2, textAlign: "center" }}>
                              <Box sx={{ mb: 1 }}>
                                <CustomAvatar
                                  config={{
                                    ...DEFAULT_AVATAR,
                                    base: option.id,
                                  }}
                                  size={60}
                                />
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    avatarConfig.base === option.id
                                      ? "white"
                                      : "#666",
                                  fontWeight: 600,
                                }}
                              >
                                {option.name}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Equipped Accessories */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#333",
                        fontWeight: 600,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      Accesorios Equipados
                    </Typography>

                    <Grid container spacing={2}>
                      {["hat", "clothing", "hairstyle"].map((type) => {
                        const equippedItem =
                          avatarConfig.accessories[
                            type as keyof typeof avatarConfig.accessories
                          ];
                        const accessory = equippedItem
                          ? ACCESSORY_ITEMS.find(
                              (item) => item.id === equippedItem,
                            )
                          : null;

                        return (
                          <Grid item xs={4} key={type}>
                            <Card
                              sx={{
                                background: accessory
                                  ? "linear-gradient(135deg, #81c784, #66bb6a)"
                                  : "#f5f5f5",
                                borderRadius: "12px",
                                textAlign: "center",
                                border: "2px solid #e0e0e0",
                                minHeight: 100,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                            >
                              <CardContent sx={{ p: 1 }}>
                                {accessory ? (
                                  <>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontSize: "24px", mb: 1 }}
                                    >
                                      {accessory.icon}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: accessory ? "white" : "#666",
                                        fontWeight: 600,
                                        fontSize: "11px",
                                        display: "block",
                                        mb: 1,
                                      }}
                                    >
                                      {accessory.name}
                                    </Typography>
                                    <Button
                                      size="small"
                                      onClick={() =>
                                        removeAccessory(
                                          type as
                                            | "hat"
                                            | "clothing"
                                            | "hairstyle",
                                        )
                                      }
                                      sx={{
                                        color: "white",
                                        minWidth: 0,
                                        p: 0.5,
                                      }}
                                    >
                                      <Close fontSize="small" />
                                    </Button>
                                  </>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "#999", fontSize: "12px" }}
                                  >
                                    {type === "hat"
                                      ? "Sombrero"
                                      : type === "clothing"
                                        ? "Ropa"
                                        : "Peinado"}
                                  </Typography>
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default AvatarCustomization;
