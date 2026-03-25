import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { Skill } from "../utils/skills";
import { useAuth } from "../contexts/AuthContext";

interface StatsProps {
  skills: Skill[];
}

const Stats: React.FC<StatsProps> = ({ skills }) => {


  const { user } = useAuth();

  const raw = localStorage.getItem(user!.uid)
  const parsed = JSON.parse(raw!)




  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {parsed?.Skill?.map((skill: any, index: any) => (
        <Box
          key={index}
          sx={{
            display: "grid",
            gridTemplateColumns: "44px 1fr 140px",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#7f8ef1",
              boxShadow: "0 0 0 2px rgba(255,255,255,.18) inset",
              fontSize: "18px",
              transition: "transform .12s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            🎯
          </Box>

          {/* Progress Bar */}
          <Box sx={{ position: "relative" }}>
            <LinearProgress
              variant="determinate"
              value={parsed?.Skill[index]?.Progress}
              sx={{
                height: 22,
                borderRadius: "999px",
                backgroundColor: "rgba(0,0,0,.25)",
                boxShadow:
                  "inset 0 8px 16px rgba(0,0,0,.15), inset 0 -6px 8px rgba(255,255,255,.08)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#53d07c",
                  borderRadius: "999px",
                  transition: "transform .7s cubic-bezier(.2,.8,.2,1)",
                },
              }}
            />
            <Box
              sx={{
                color: "#2d1b69",
                fontWeight: 700,
                textShadow: "0 1px 0 rgba(0,0,0,.3)",
                justifySelf: "center"
              }}>
              {parsed?.Skill[index]?.Progress + "%"}
            </Box>

          </Box>

          {/* Label */}
          <Typography
            variant="body2"
            sx={{
              color: "#2d1b69",
              fontWeight: 700,
              textShadow: "0 1px 0 rgba(0,0,0,.3)",
              justifySelf: "end",
            }}
          >
            {parsed?.Skill[index]?.Materia}
          </Typography>



        </Box>
      ))}

    </Box>
  );
};

export default Stats;
