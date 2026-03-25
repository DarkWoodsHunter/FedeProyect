import { createTheme } from "@mui/material/styles";

export const dashboardPalette = {
  pageBg: "#7f96e6",
  panelBg: "#f3f3f3",
  panelBorder: "#6e83cb",
  headerBlue: "#2f2b74",
  sectionBlue: "#afbee9",
  accentYellow: "#f7c50b",
  accentYellowDark: "#d39e00",
  teal: "#4fc286",
  track: "#bec4d3",
  sidebarBg: "#ececec",
  textDark: "#3d3d3d",
  white: "#ffffff",
  mascotBg: "#56c5e8",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: dashboardPalette.headerBlue,
    },
    secondary: {
      main: dashboardPalette.accentYellow,
    },
    background: {
      default: dashboardPalette.pageBg,
      paper: dashboardPalette.panelBg,
    },
    text: {
      primary: dashboardPalette.textDark,
      secondary: "#6c6c6c",
    },
    success: {
      main: dashboardPalette.teal,
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
      fontWeight: 800,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--dashboard-page-bg": dashboardPalette.pageBg,
          "--dashboard-panel-bg": dashboardPalette.panelBg,
          "--dashboard-panel-border": dashboardPalette.panelBorder,
          "--dashboard-header-blue": dashboardPalette.headerBlue,
          "--dashboard-section-blue": dashboardPalette.sectionBlue,
          "--dashboard-yellow": dashboardPalette.accentYellow,
          "--dashboard-yellow-dark": dashboardPalette.accentYellowDark,
          "--dashboard-teal": dashboardPalette.teal,
          "--dashboard-track": dashboardPalette.track,
          "--dashboard-sidebar": dashboardPalette.sidebarBg,
          "--dashboard-text": dashboardPalette.textDark,
          "--dashboard-mascot-bg": dashboardPalette.mascotBg,
          "--dashboard-outline-title-stroke": "0px",
          "--dashboard-outline-button-stroke": "0px",
          "--dashboard-outline-shadow": "none",
        },
        body: {
          margin: 0,
          minHeight: "100vh",
          backgroundColor: dashboardPalette.pageBg,
        },
        ".outlined-title": {
          fontFamily: "'Arial Black', 'Poppins', 'Segoe UI', sans-serif",
          fontWeight: 900,
          color: "var(--dashboard-header-blue)",
          WebkitTextStroke: "var(--dashboard-outline-title-stroke) transparent",
          paintOrder: "stroke fill",
          textShadow: "var(--dashboard-outline-shadow)",
        },
        ".outlined-title-underlined": {
          fontFamily: "'Arial Black', 'Poppins', 'Segoe UI', sans-serif",
          fontWeight: 900,
          color: "var(--dashboard-header-blue)",
          WebkitTextStroke: "var(--dashboard-outline-title-stroke) transparent",
          paintOrder: "stroke fill",
          textShadow: "var(--dashboard-outline-shadow)",
          textDecoration: "underline",
          textDecorationThickness: "2px",
          textUnderlineOffset: "3px",
        },
        ".outlined-button-text": {
          fontFamily: "'Arial Black', 'Poppins', 'Segoe UI', sans-serif",
          fontWeight: 900,
          color: "var(--dashboard-header-blue)",
          WebkitTextStroke: "var(--dashboard-outline-button-stroke) transparent",
          paintOrder: "stroke fill",
          textShadow: "var(--dashboard-outline-shadow)",
          letterSpacing: "0.4px",
        },
      },
    },
  },
});

export default theme;