import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  showNavbar?: boolean;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = "Dashboard",
  showNavbar = true,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        height: "100vh",
        background: "var(--dashboard-page-bg)",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          height: "100vh",
          background: "var(--dashboard-page-bg)",
        }}
      >
        {showNavbar && <Navbar title={title} />}

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            height: "100%",
            padding: "12px 24px",
            paddingBottom: 5,
            background: "var(--dashboard-page-bg)",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
