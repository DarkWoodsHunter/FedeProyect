import React from "react";
import { Box, Avatar } from "@mui/material";
import { AvatarConfig, ACCESSORY_ITEMS } from "../types/user";

interface CustomAvatarProps {
  config: AvatarConfig;
  size?: number;
  onClick?: () => void;
  fullBody?: boolean;
}

const AVATAR_IMAGES = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=John&size=200",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane&size=200",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&size=200",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&size=200",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&size=200",
];

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  config,
  size = 120,
  onClick,
  fullBody = false,
}) => {
  const baseImage = AVATAR_IMAGES[config.base || 0] || AVATAR_IMAGES[0];

  const equippedHat = config.accessories.hat
    ? ACCESSORY_ITEMS.find((item) => item.id === config.accessories.hat)
    : null;
  const equippedClothing = config.accessories.clothing
    ? ACCESSORY_ITEMS.find((item) => item.id === config.accessories.clothing)
    : null;
  const equippedHairstyle = config.accessories.hairstyle
    ? ACCESSORY_ITEMS.find((item) => item.id === config.accessories.hairstyle)
    : null;

  if (fullBody) {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: size * 1.5,
          height: size * 2,
          position: "relative",
          cursor: onClick ? "pointer" : "default",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%)",
          border: "3px solid rgba(255, 255, 255, 0.3)",
          overflow: "visible",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          boxShadow: "0 12px 40px rgba(139, 69, 19, 0.3)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": onClick
            ? {
                transform: "scale(1.02)",
                boxShadow: "0 16px 50px rgba(139, 69, 19, 0.4)",
              }
            : {},
        }}
      >
        {/* Platform/Pedestal */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "20px",
            background: "linear-gradient(135deg, #d4a574, #8b4513)",
            borderRadius: "50px 50px 8px 8px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          }}
        />

        {/* Full Body Avatar */}
        <Box
          sx={{
            width: "85%",
            height: "85%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src={baseImage}
            alt="Avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          {/* Clothing Overlay */}
          {equippedClothing && (
            <Box
              sx={{
                position: "absolute",
                top: "25%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: `${size * 0.3}px`,
                zIndex: 2,
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
              }}
            >
              {equippedClothing.image}
            </Box>
          )}

          {/* Hairstyle Overlay */}
          {equippedHairstyle && (
            <Box
              sx={{
                position: "absolute",
                top: "5%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: `${size * 0.25}px`,
                zIndex: 3,
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
              }}
            >
              {equippedHairstyle.image}
            </Box>
          )}

          {/* Hat Overlay */}
          {equippedHat && (
            <Box
              sx={{
                position: "absolute",
                top: "0%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: `${size * 0.35}px`,
                zIndex: 4,
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
              }}
            >
              {equippedHat.image}
            </Box>
          )}
        </Box>

        {/* Level Badge */}
        <Box
          sx={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #ff6b6b, #ee5a52)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 800,
            color: "#fff",
            boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
            zIndex: 5,
          }}
        >
          25
        </Box>
      </Box>
    );
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        width: size,
        height: size,
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        borderRadius: "50%",
        border: "3px solid rgba(255, 255, 255, 0.2)",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": onClick
          ? {
              transform: "scale(1.05)",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4)",
            }
          : {},
      }}
    >
      {/* Base Avatar */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Avatar
          src={baseImage}
          sx={{
            width: "100%",
            height: "100%",
            "& img": {
              objectFit: "cover",
            },
          }}
        />

        {/* Clothing Overlay - Behind avatar */}
        {equippedClothing && (
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: `${size * 0.4}px`,
              zIndex: 1,
              filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.3))",
            }}
          >
            {equippedClothing.image}
          </Box>
        )}
      </Box>

      {/* Hairstyle Overlay - On top */}
      {equippedHairstyle && (
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: `${size * 0.35}px`,
            zIndex: 3,
            pointerEvents: "none",
            filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.3))",
          }}
        >
          {equippedHairstyle.image}
        </Box>
      )}

      {/* Hat Overlay - On top */}
      {equippedHat && (
        <Box
          sx={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: `${size * 0.45}px`,
            zIndex: 4,
            pointerEvents: "none",
            filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.3))",
          }}
        >
          {equippedHat.image}
        </Box>
      )}

      {/* Level Badge */}
      <Box
        sx={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 24,
          height: 24,
          background: "linear-gradient(135deg, #ff6b6b, #ee5a52)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 800,
          color: "#fff",
          boxShadow: "0 2px 8px rgba(255, 107, 107, 0.4)",
          zIndex: 5,
        }}
      >
        25
      </Box>
    </Box>
  );
};

export default CustomAvatar;
