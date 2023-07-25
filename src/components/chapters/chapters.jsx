import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import { response } from "./responseData";
import ChapterCard from "../chapterCard/ChapterCard";
import { useDispatch } from "react-redux";
import { selectChapter } from "../../redux/actions/actions";
import { useTheme } from '@mui/material/styles';
import './chapters.css';

const Chapters = () => {
    const theme = useTheme();
    const [subjectData, setSubjectData] = useState(response);
    const dispatch = useDispatch();

    const handleChapter = (chapterID) => {
        dispatch(selectChapter(chapterID));
    };

    const progressColor = (score) => {
        if (score >= 90) {
            return "#4FC0D0";
        } else if (score >= 80 && score <= 89) {
            return "#3cb43c";
        } else if (score > 35 && score < 80) {
            return "#37bcb6";
        } else {
            return "#F94A29";
        }
    };

    return (
        <Box sx={{ minHeight: "100%", overflow: "hidden", width: "100%", backgroundColor: theme.palette.primary.bg.grey }} className="section" >
            <Grid container xs={12} sx={{ height: "100%", position: { xs: "none", md: "fixed"}, backgroundColor: theme.palette.primary.bg.grey }} px={2} >
                <Grid item xs={12} md={4} mt={2} sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", order: { xs: 2, md: 1 } }} className="container" >
                    <Box sx={{
                        height: "100%", width: "100%", borderTop: "1px solid lightgrey", overflowY: "auto"
                    }} px={3}>
                        {subjectData?.chapters?.map((chapter, index) => (
                            <Box
                                key={chapter.id}
                                sx={{
                                    boxShadow: 1,
                                    borderRadius: "10px",
                                    padding: "1rem 2rem",
                                    mb: index === subjectData.chapters.length - 1 ? 5 : 2, 
                                    mt: 2,
                                    backgroundColor: theme.palette.primary.bg.white
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {chapter.name}
                                </Typography>
                                <Typography variant="h6" sx={{ opacity: 0.8 }} mt={1}>You Scored</Typography>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <LinearProgress
                                        variant="determinate"
                                        value={chapter.score}
                                        sx={{
                                            flex: 1,
                                            mr: 1,
                                            borderRadius: "5px",
                                            height: "6px",
                                            backgroundColor: "lightgrey",
                                            "& .MuiLinearProgress-bar": {
                                                backgroundColor: progressColor(chapter.score),
                                            }
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {chapter.score}%
                                    </Typography>
                                </Box>

                                <Box sx={{ marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Typography variant="h6" onClick={() => handleChapter(chapter.id)} sx={{ cursor: "pointer", color: "orange" }}>View Details</Typography>
                                </Box>
                                
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item mt={2} xs={12} md={8} sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", order: { xs: 1, md: 2 } }}>
                    <Box sx={{
                        height: "100%", width: "100%", borderTop: "1px solid lightgrey", borderLeft: "1px solid lightgrey"
                    }} px={3}>
                        <ChapterCard />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Chapters;
