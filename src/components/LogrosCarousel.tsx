import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, Box, Chip } from "@mui/material";
import { GetOneUser, Task } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { dashboardPalette } from "../theme";

/***
 * Componente para el Dashboard
 * Muestra las noticias actuales
 * mediante un slick, que rota por las distintas noticias disponibles
*/

const LogrosCarousel: React.FC = () => {

    const { user } = useAuth();
    const [userData, setUserData] = useState<Task[] | any>([]);


    useEffect(() => {
        if (user) {
            GetOneUserdata();
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

    return (
        <Slider dots={false} infinite={true} slidesToShow={5} slidesToScroll={1} vertical={true} verticalSwiping={true} speed={1000} autoplaySpeed={5000} autoplay={false}>
            {parsed.Logros?.map((ach: any, index: any) => {
                return <div key={index}>
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            borderRadius: "16px",
                            background: ach.Status == "Completado"
                                ? "rgba(79, 194, 134, 0.15)"
                                : "#fff",
                            border: ach.Status == "Completado"
                                ? "1px solid rgba(79, 194, 134, 0.5)"
                                : `1px solid ${dashboardPalette.panelBorder}`,
                            opacity: ach.Status == "Completado" ? 1 : 0.6,
                        }}
                    >
                        <Typography sx={{ fontSize: "32px", mr: 2 }}>
                            {ach.Icon}
                        </Typography>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="h6"
                                sx={{ color: "#2d1b69", fontWeight: 700 }}
                            >
                                {ach.Name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#2d1b69" }}>
                                {ach.Description}
                            </Typography>
                        </Box>
                        {ach.Status == "Completado" && (
                            <Chip
                                label="Completado"
                                size="small"
                                sx={{
                                    background: "var(--dashboard-teal)",
                                    color: "#fff",
                                    fontWeight: 600,
                                }}
                            />
                        )}
                    </Box>
                </div>
            })
            }
        </Slider>
    )
}

export default LogrosCarousel;