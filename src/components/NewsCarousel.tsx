import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    CardContent,
    Typography,
} from "@mui/material";
import { GetAllNews } from "../firebase-config";

/***
 * Componente para el Dashboard
 * Muestra las noticias actuales
 * mediante un slick, que rota por las distintas noticias disponibles
*/

const NewsCarousel: React.FC = () => {

    const [newsData, setNewsData] = useState<any>([]);

    useEffect(() => {
        GetNewsData();
    }, []);

    const GetNewsData = async () => {
        const aTask = await GetAllNews();
        setNewsData(aTask);
    }

    return (
            <Slider dots={true} infinite={true} speed={1000} autoplaySpeed={5000} autoplay={true} pauseOnHover={true}>
                {newsData?.map((news: any, index: any) => {
                    return <div key={index}>
                        <CardContent
                            sx={{
                                p: 2,
                                minHeight: 230,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "var(--dashboard-text)",
                                    fontWeight: 900,
                                    mb: 0.8,
                                    fontSize: "1.85rem",
                                    lineHeight: 1.1,
                                }}
                            >
                                {news.Titulo}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "var(--dashboard-text)",
                                    fontWeight: 700,
                                    mb: 0.8,
                                    fontSize: "1.15rem",
                                    lineHeight: 1.2,
                                }}
                            >
                                {news.subtitle}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "var(--dashboard-text)",
                                    mb: 1.5,
                                    fontSize: "1.05rem",
                                    lineHeight: 1.3,
                                    flex: 1,
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {news.Cuerpo}
                            </Typography>
                        </CardContent>
                    </div>
                })
                }
            </Slider>
    )
}

export default NewsCarousel;