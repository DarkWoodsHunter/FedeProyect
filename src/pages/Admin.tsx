// pages/Admin.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import { Add, Delete, Save, RestartAlt } from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import {
  loadSkills,
  saveSkills,
  resetSkills,
  createEmptySkill,
  validateSkill,
  Skill,
} from "../utils/skills";

const Admin: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    setSkills(loadSkills());
  }, []);

  const handleSkillChange = (
    index: number,
    field: keyof Skill,
    value: string,
  ) => {
    const updatedSkills = [...skills];
    if (field === "level") {
      updatedSkills[index][field] = Math.max(
        0,
        Math.min(100, parseInt(value) || 0),
      );
    } else {
      updatedSkills[index][field] = value;
    }
    setSkills(updatedSkills);
  };

  const handleSaveSkills = () => {
    const validSkills = skills.filter(validateSkill);
    if (validSkills.length === 0) {
      showAlert("error", "Please add at least one valid skill");
      return;
    }
    saveSkills(validSkills);
    setSkills(validSkills);
    showAlert("success", "Skills saved successfully!");
  };

  const handleResetSkills = () => {
    resetSkills();
    setSkills(loadSkills());
    showAlert("success", "Skills reset to default!");
  };

  const handleAddSkill = () => {
    setSkills([...skills, createEmptySkill()]);
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <DashboardLayout title="Admin Panel">
      <Box sx={{ p: 3 }}>
        {/* Alert */}
        {alert && (
          <Alert severity={alert.type} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Admin Panel
        </Typography>

        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Skills Management</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleAddSkill}
                >
                  Add Skill
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RestartAlt />}
                  onClick={handleResetSkills}
                  color="warning"
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveSkills}
                  color="primary"
                >
                  Save Skills
                </Button>
              </Box>
            </Box>

            {/* Skills List */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {skills.map((skill, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <TextField
                    label="Skill Name"
                    value={skill.skill}
                    onChange={(e) =>
                      handleSkillChange(index, "skill", e.target.value)
                    }
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Level (0-100)"
                    type="number"
                    value={skill.level}
                    onChange={(e) =>
                      handleSkillChange(index, "level", e.target.value)
                    }
                    size="small"
                    sx={{ width: 120 }}
                    inputProps={{ min: 0, max: 100 }}
                  />
                  <IconButton
                    onClick={() => handleDeleteSkill(index)}
                    color="error"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {skills.length === 0 && (
              <Typography
                color="textSecondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                No skills added. Click "Add Skill" to get started.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default Admin;
