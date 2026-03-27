import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Modal,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Notifications, CheckCircle, Info, Warning } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { dashboardPalette } from "../theme";
import profileIcon from "../assets/profile.png";
import { GetOneUser, Task } from "../firebase-config";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userData, setUserData] = useState<Task[] | any>([]);

  useEffect(() => {
    if (user) {
      GetOneUserdata()
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

  function GetNotif() {
    const NewArray = [];
    for (let i = 0; i < parsed.Notifications.length; i++) {
      if (parsed.Notifications[i].Checked === false) {
        NewArray.push(parsed.Notifications[i])
      }
    }
    return NewArray.length;
  }
  /** 
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "¡Misión completada!",
      message: "Has ganado 50 XP",
      icon: CheckCircle,
      color: "#4caf50",
    },
    {
      id: 2,
      type: "info",
      title: "Nueva actualización",
      message: "Funciones de avatar disponibles",
      icon: Info,
      color: "#2196f3",
    },
    {
      id: 3,
      type: "warning",
      title: "Skill pendiente",
      message: "Completa tu evaluación de JavaScript",
      icon: Warning,
      color: "#ff9800",
    },
  ];
*/
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #e8dff5, #dbd6e8)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", padding: "8px 24px" }}>
        {/* Page Title */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#333",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notifications */}
          <IconButton
            onClick={() => setNotificationsOpen(true)}
            sx={{
              color: "#fff",
              background: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {parsed?.Notifications ?
              <Badge badgeContent={GetNotif()} color="error">
                <Notifications />
              </Badge>
              : <></>}
          </IconButton>

          {/* User Avatar */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src={profileIcon}
              alt="Perfil"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `2px solid ${dashboardPalette.headerBlue}`,
                objectFit: "cover",
                boxShadow: "0 2px 0 rgba(47,43,116,0.25)",
              }}
            />
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {user?.displayName || user?.email?.split("@")[0] || "Usuario"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1,
                }}
              >
                {"Nivel " + parsed?.Nivel}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>

      {/* Notifications Modal */}
      <Modal
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        aria-labelledby="notifications-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, sm: 450 },
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          <Paper
            sx={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, #c5a9e0, #b09ad6)",
              p: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: 700,
                mb: 2,
                textAlign: "center",
              }}
            >
              Notificaciones
            </Typography>
            <List>
              {parsed?.Notifications?.map((notif: any, index: number) => (
                notif.Checked == false ?
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        borderRadius: "16px",
                        mb: 1,
                        background: "rgba(255, 255, 255, 0.10)",
                      }}
                    >
                      <ListItemIcon>
                        {notif.Icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                            {notif.Title}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            {notif.Description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                  : <Box key={index}></Box>
              ))}
            </List>
          </Paper>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Navbar;
