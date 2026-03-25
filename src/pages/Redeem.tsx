import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Pagination,
  Stack,
} from "@mui/material";
import {
  Stars,
  ShoppingCart,
  EmojiEvents,
  RedeemRounded,
  CategoryRounded,
} from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import { ACCESSORY_ITEMS, AccessoryItem } from "../types/user";
import { dashboardPalette } from "../theme";

interface RedeemItem {
  id: number;
  name: string;
  description: string;
  cost: number;
  category: "avatar" | "badge" | "theme" | "special";
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  preview?: string;
  accessoryId?: string;
}

const REDEEM_ITEMS: RedeemItem[] = [
  ...ACCESSORY_ITEMS.map((accessory: AccessoryItem, index: number) => ({
    id: 100 + index,
    name: accessory.name,
    description: `Equipa este ${accessory.type === "hat" ? "sombrero" : accessory.type === "clothing" ? "artículo de ropa" : "peinado"} en tu avatar`,
    cost: accessory.cost,
    category: "avatar" as const,
    icon: accessory.icon,
    rarity: accessory.rarity,
    preview: accessory.image,
    accessoryId: accessory.id,
  })),

  {
    id: 1,
    name: "Amazon Gift Card $10",
    description: "Tarjeta de regalo de Amazon por $10 USD",
    cost: 1000,
    category: "special",
    icon: "🛒",
    rarity: "legendary",
  },
  {
    id: 2,
    name: "Steam Gift Card $10",
    description: "Tarjeta de regalo de Steam por $10 USD",
    cost: 1000,
    category: "special",
    icon: "🎮",
    rarity: "legendary",
  },
  {
    id: 3,
    name: "Epic Games Gift Card $10",
    description: "Tarjeta de regalo de Epic Games por $10 USD",
    cost: 1000,
    category: "special",
    icon: "🎯",
    rarity: "legendary",
  },

  {
    id: 4,
    name: "Tema Dorado",
    description: "Tema premium dorado para la interfaz",
    cost: 500,
    category: "theme",
    icon: "✨",
    rarity: "epic",
  },
  {
    id: 5,
    name: "Insignia Maestro",
    description: "Insignia que demuestra tu maestría",
    cost: 250,
    category: "badge",
    icon: "🏅",
    rarity: "rare",
  },
  {
    id: 6,
    name: "Boost XP x2",
    description: "Duplica tu XP por 24 horas",
    cost: 150,
    category: "special",
    icon: "🚀",
    rarity: "common",
  },
];

const RARITY_COLORS = {
  common: "#a0a0a0",
  rare: "#4dabf7",
  epic: "#9775fa",
  legendary: "#ffd43b",
};

const CATEGORY_LABELS = {
  avatar: "Avatar",
  badge: "Insignia",
  theme: "Tema",
  special: "Especial",
};

const Redeem: React.FC = () => {
  const [userPoints, setUserPoints] = useState(856);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handlePurchase = (item: RedeemItem) => {
    if (userPoints >= item.cost && !purchasedItems.includes(item.id)) {
      setUserPoints((prev) => prev - item.cost);
      setPurchasedItems((prev) => [...prev, item.id]);

      if (item.accessoryId && item.category === "avatar") {
        const accessoryItem = ACCESSORY_ITEMS.find(
          (acc) => acc.id === item.accessoryId,
        );
        if (accessoryItem) {
          const currentAvatarStr = localStorage.getItem("userAvatar");
          const currentAvatar = currentAvatarStr
            ? JSON.parse(currentAvatarStr)
            : {
                base: 0,
                accessories: {},
                colors: { skin: "#ffdbac", hair: "#8B4513" },
              };

          const updatedAvatar = {
            ...currentAvatar,
            accessories: {
              ...currentAvatar.accessories,
              [accessoryItem.type]: accessoryItem.id,
            },
          };

          localStorage.setItem("userAvatar", JSON.stringify(updatedAvatar));

          console.log(`¡${accessoryItem.name} equipado!`);
        }
      }
    }
  };

  const filteredItems =
    selectedCategory === "all"
      ? REDEEM_ITEMS
      : REDEEM_ITEMS.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const panelCard = {
    backgroundColor: "var(--dashboard-panel-bg)",
    border: `3px solid ${dashboardPalette.panelBorder}`,
    borderRadius: "18px",
    boxShadow: "0 5px 0 rgba(62, 80, 147, 0.45)",
  };

  const yellowButtonSx = {
    borderRadius: "14px",
    backgroundColor: "var(--dashboard-yellow)",
    border: `2px solid ${dashboardPalette.accentYellowDark}`,
    color: "var(--dashboard-header-blue)",
    fontWeight: 800,
    boxShadow: "0 3px 0 rgba(211, 158, 0, 0.95)",
    "&:hover": {
      backgroundColor: "var(--dashboard-yellow)",
    },
  };

  return (
    <DashboardLayout title="Tienda de Canjes">
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "var(--dashboard-page-bg)",
          minHeight: "100vh",
          p: 3,
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  className="outlined-title-underlined"
                  variant="h4"
                  sx={{ fontWeight: 900, mb: 1 }}
                >
                  <RedeemRounded sx={{ mr: 1, verticalAlign: "text-bottom" }} />
                  Tienda de Canjes
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "var(--dashboard-text)" }}
                >
                  Canjea tus puntos por increíbles recompensas y mejoras.
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "var(--dashboard-header-blue)",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Stars
                    sx={{ fontSize: 40, color: "var(--dashboard-yellow-dark)" }}
                  />
                  {userPoints.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--dashboard-text)" }}
                >
                  Puntos disponibles
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <Card
          sx={{
            mb: 3,
            ...panelCard,
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "var(--dashboard-header-blue)",
                  fontWeight: 800,
                  mr: 2,
                }}
              >
                <CategoryRounded
                  sx={{ mr: 0.8, verticalAlign: "text-bottom" }}
                />
                Categorías:
              </Typography>

              <Button
                variant={selectedCategory === "all" ? "contained" : "outlined"}
                onClick={() => setSelectedCategory("all")}
                sx={{
                  ...yellowButtonSx,
                  backgroundColor:
                    selectedCategory === "all"
                      ? "var(--dashboard-yellow)"
                      : "#fff",
                  boxShadow:
                    selectedCategory === "all"
                      ? "0 3px 0 rgba(211, 158, 0, 0.95)"
                      : "none",
                  "&:hover": {
                    backgroundColor:
                      selectedCategory === "all"
                        ? "var(--dashboard-yellow)"
                        : "#fff",
                  },
                }}
              >
                Todos
              </Button>

              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "contained" : "outlined"}
                  onClick={() => setSelectedCategory(key)}
                  sx={{
                    ...yellowButtonSx,
                    backgroundColor:
                      selectedCategory === key
                        ? "var(--dashboard-yellow)"
                        : "#fff",
                    boxShadow:
                      selectedCategory === key
                        ? "0 3px 0 rgba(211, 158, 0, 0.95)"
                        : "none",
                    "&:hover": {
                      backgroundColor:
                        selectedCategory === key
                          ? "var(--dashboard-yellow)"
                          : "#fff",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Items Grid */}
        <Box
          sx={{
            mb: 4,
            mt: 4,
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {paginatedItems.map((item) => {
            const canAfford = userPoints >= item.cost;
            const isPurchased = purchasedItems.includes(item.id);

            return (
              <Box key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    minHeight: 380,
                    background: "var(--dashboard-panel-bg)",
                    border: `2px solid ${RARITY_COLORS[item.rarity]}`,
                    borderRadius: "18px",
                    position: "relative",
                    overflow: "visible",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 12px 30px ${RARITY_COLORS[item.rarity]}40`,
                    },
                  }}
                >
                  {/* Rarity Badge */}
                  <Chip
                    label={item.rarity.toUpperCase()}
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: 8,
                      background: RARITY_COLORS[item.rarity],
                      color: "#000",
                      fontWeight: 800,
                      fontSize: "0.7rem",
                      zIndex: 2,
                    }}
                  />

                  <CardContent
                    sx={{
                      p: 2.5,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Item Icon */}
                    <Box
                      sx={{
                        fontSize: "3.5rem",
                        textAlign: "center",
                        mb: 1.5,
                        opacity: isPurchased ? 0.6 : 1,
                        height: 70,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </Box>

                    {/* Item Info */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--dashboard-header-blue)",
                        fontWeight: 700,
                        mb: 1,
                        textAlign: "center",
                        opacity: isPurchased ? 0.6 : 1,
                        fontSize: "0.95rem",
                        lineHeight: 1.3,
                        minHeight: "2.6rem",
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--dashboard-text)",
                        textAlign: "center",
                        mb: 2,
                        flex: 1,
                        opacity: isPurchased ? 0.6 : 1,
                        fontSize: "0.85rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.description}
                    </Typography>

                    {/* Price and Purchase */}
                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Chip
                          label={`${item.cost} puntos`}
                          sx={{
                            background: RARITY_COLORS[item.rarity],
                            color: "#000",
                            fontWeight: 800,
                            fontSize: "0.8rem",
                          }}
                        />
                      </Box>

                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford || isPurchased}
                        startIcon={
                          isPurchased ? <EmojiEvents /> : <ShoppingCart />
                        }
                        sx={{
                          background: isPurchased
                            ? "var(--dashboard-teal)"
                            : canAfford
                              ? "var(--dashboard-yellow)"
                              : "#d9dce6",
                          color: isPurchased
                            ? "#fff"
                            : canAfford
                              ? "var(--dashboard-header-blue)"
                              : "#7d869f",
                          fontWeight: 800,
                          borderRadius: "12px",
                          border: canAfford
                            ? `2px solid ${dashboardPalette.accentYellowDark}`
                            : "none",
                          boxShadow: canAfford
                            ? "0 3px 0 rgba(211, 158, 0, 0.95)"
                            : "none",
                          textTransform: "none",
                          fontSize: "0.9rem",
                          padding: "10px 16px",
                          "&:hover": {
                            background: isPurchased
                              ? "var(--dashboard-teal)"
                              : canAfford
                                ? "var(--dashboard-yellow)"
                                : "#d9dce6",
                          },
                          "&:disabled": {
                            color: isPurchased ? "#fff" : "#7d869f",
                          },
                        }}
                      >
                        {isPurchased
                          ? "Adquirido"
                          : canAfford
                            ? "Canjear"
                            : "Insuficientes"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    backgroundColor: "#fff",
                    color: "var(--dashboard-header-blue)",
                    border: `1px solid ${dashboardPalette.panelBorder}`,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "var(--dashboard-yellow)",
                      color: "var(--dashboard-header-blue)",
                      "&:hover": {
                        backgroundColor: "var(--dashboard-yellow)",
                      },
                    },
                  },
                }}
              />
            </Stack>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default Redeem;
