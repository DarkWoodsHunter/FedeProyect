import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { signIn } from "../auth";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/main" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
    } catch (err: any) {
      setError("Error iniciando sesión. Revisa tu correo/contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={3}
      sx={{ backgroundColor: "var(--dashboard-page-bg)" }}
    >
      <Card
        sx={{
          width: "min(520px, 94vw)",
          backgroundColor: "var(--dashboard-panel-bg)",
          border: "3px solid var(--dashboard-panel-border)",
          borderRadius: "24px",
          boxShadow: "0 6px 0 rgba(62, 80, 147, 0.45)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              position: "relative",
              border: "2px solid var(--dashboard-panel-border)",
              borderRadius: "20px",
              padding: "20px",
              background: "linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%)",
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              className="outlined-title"
              sx={{
                mb: 1,
                fontSize: "2rem",
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              Login
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2.5, color: "var(--dashboard-text)" }}
            >
              Ingresa tus credenciales para continuar
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin}>
              <Typography
                variant="body2"
                component="label"
                sx={{
                  display: "block",
                  mb: 1,
                  color: "var(--dashboard-header-blue)",
                  fontWeight: 600,
                }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    background: "#ffffff",
                    borderRadius: "14px",
                    color: "var(--dashboard-text)",
                    "& fieldset": {
                      borderColor: "var(--dashboard-panel-border)",
                    },
                  },
                }}
              />

              <Typography
                variant="body2"
                component="label"
                sx={{
                  display: "block",
                  mb: 1,
                  color: "var(--dashboard-header-blue)",
                  fontWeight: 600,
                }}
              >
                Contraseña
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    background: "#ffffff",
                    borderRadius: "14px",
                    color: "var(--dashboard-text)",
                    "& fieldset": {
                      borderColor: "var(--dashboard-panel-border)",
                    },
                  },
                }}
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      sx={{
                        color: "var(--dashboard-header-blue)",
                        "&.Mui-checked": { color: "var(--dashboard-teal)" },
                      }}
                    />
                  }
                  label="Recuérdame"
                  sx={{ color: "var(--dashboard-text)" }}
                />
                <Link
                  href="#"
                  sx={{
                    color: "var(--dashboard-header-blue)",
                    fontWeight: 700,
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  mb: 2,
                  backgroundColor: "var(--dashboard-yellow)",
                  border: "2px solid var(--dashboard-yellow-dark)",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  padding: "14px 16px",
                  borderRadius: "18px",
                  boxShadow: "0 4px 0 rgba(211, 158, 0, 0.95)",
                  "&:hover": {
                    backgroundColor: "var(--dashboard-yellow)",
                  },
                  "&:active": {
                    transform: "translateY(2px)",
                    boxShadow: "0 2px 0 rgba(211, 158, 0, 0.95)",
                  },
                }}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                <Box component="span" className="outlined-button-text">
                  {loading ? "Cargando..." : "Iniciar sesión"}
                </Box>
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
