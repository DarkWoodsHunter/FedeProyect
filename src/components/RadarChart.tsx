import React, { useRef } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface Skol {
  Materia: string,
  Progress: number, 
}

interface RadarChartProps {
  skills: Skol[];
}

const RadarChart: React.FC<RadarChartProps> = ({ skills }) => {
  const chartRef = useRef<ChartJS<"radar">>(null);

  const data = {
    labels: skills.map((skill) => skill.Materia),
    datasets: [
      {
        label: "Skills",
        data: skills.map((skill) => skill.Progress),
        backgroundColor: "rgba(45, 225, 120, 0.2)",
        borderColor: "#1bdb6b",
        borderWidth: 3,
        pointBackgroundColor: "#1bdb6b",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#8d86ff",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed.r}%`,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: "rgba(255, 255, 255, 0.6)",
          backdropColor: "transparent",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        pointLabels: {
          display: false,
          color: "#fff",
          font: {
            size: 13,
            weight: 600,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutCubic" as const,
    },
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #c5a9e0, #b09ad6)",
        borderRadius: "28px",
        border: "2px solid rgba(255, 255, 255, 0.12)",
        padding: 2,
        height: 400,
        position: "relative",
      }}
    >
      <Radar ref={chartRef} data={data} options={options} />
    </Box>
  );
};

export default RadarChart;
