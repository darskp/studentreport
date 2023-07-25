import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';
import { response } from "../chapters/responseData";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useEffect, useState } from "react";
import { selectChapter } from "../../redux/actions/actions";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Chart as chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from "react-chartjs-2";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import ChapterQuizKeyModal from "./ChapterQuizKeyModal";
chartjs.register(
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
)
const ChapterCard = () => {
    const theme = useTheme();
    const chapterData = response.chapters;
    const selectedChapterId = useSelector((state) => state.selectedChapterId);
    const dispatch = useDispatch();
    const selectedChapter = chapterData.find((chapter) => chapter.id === selectedChapterId);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (selectedChapterId === null && chapterData.length > 0) {
            dispatch(selectChapter(chapterData[0].id));
        }
    }, [selectedChapterId, chapterData, dispatch, selectedChapter]);

    const doughnutData = {
        labels: ['correct', 'incorrect', 'unattempted'],
        datasets: [
            {
                data: [selectedChapter ? selectedChapter.accuracyAnalysis.correct : 0, selectedChapter ? selectedChapter.accuracyAnalysis.incorrect : 0, selectedChapter ? selectedChapter.accuracyAnalysis.unattempted : 0],
                backgroundColor: ["#00ce95", "#eb3e68", "#959aad"],
                borderWidth: 0,
            }
        ],
    };

    const doughnutOptions = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                titleFontSize: 14,
                bodyFontSize: 12,
            },
        },
    };

    const easyValue = selectedChapter ? selectedChapter.difficultyAnalysis.easy : 0;
    const normalValue = selectedChapter ? selectedChapter.difficultyAnalysis.normal : 0;
    const hardValue = selectedChapter ? selectedChapter.difficultyAnalysis.hard : 0;

    const barData = {
        labels: ['Easy', 'Normal', 'Hard'],
        datasets: [
            {
                data: [easyValue, normalValue, hardValue],
                backgroundColor: ["#58cced", "#3895d3", "#1261a0"],
                barPercentage: 0.8,
                categoryPercentage: 0.8,
            },
        ],
    };

    const barOptions = {
        plugins: {
            tooltip: {
                titleFontSize: 14,
                bodyFontSize: 12,
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 100
            },
        },
    };

    return (
        <>
            {selectedChapterId === null ?
                (<>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress size={40} />
                    </Box>
                </>)
                :
                <>
                    <Box
                        sx={{
                            height: "90%",
                            width: "100%",
                            backgroundColor: theme.palette.primary.bg.white,
                            borderRadius: "10px",
                            mt: 2,
                        }}
                    >
                        <Box
                            sx={{
                                padding: "1rem 2rem",
                                borderBottom: "1px solid #f4f4f4",
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "center", 
                                justifyContent:  "space-between", 
                            }}
                        >
                            <Box sx={{ mb: { xs: 2, md: 0 } }}> 
                                <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "left" }}>
                                    {selectedChapter.name}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column", 
                                    alignItems: "center", 
                                    justifyContent: "center", 
                                    mb: { xs: 2, md: 0 }, 
                                }}
                            >
                                <ThumbUpOffAltIcon sx={{ textAlign: "center", fontSize: { xs: "25px", md: "30px" } }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    Score: {selectedChapter.score}%
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: { xs: "center", md: "flex-start" }, 
                                    justifyContent: { xs: "space-around", md: "flex-start" }, 
                                }}
                            >
                                <Box sx={{ marginRight: "5px" }}> 
                                    <AccessAlarmIcon sx={{ textAlign: "center", fontSize: { xs: "35px", md: "40px" } }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        Time Taken: {selectedChapter.timeTaken}
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.8 }}>Total Time: {selectedChapter.totalTime} mins</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ padding: "0.5rem 2rem" }} mt={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={7} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column" }}>
                                    <Typography variant="h6" sx={{ marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>Accuracy Analysis</Typography>
                                    <Box mt={2} style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                                        <Box style={{ height: "150px", width: "150px" }} >
                                            {selectedChapter && <Doughnut data={doughnutData} options={doughnutOptions} />}
                                        </Box>
                                        <Box sx={{ ml: { xs: 2, md: "5px" } }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: "bold", position: "relative" }} variant="h6">
                                                    {selectedChapter?.accuracyAnalysis.correct / 20 * 100}%
                                                </Typography>
                                                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                                                    <Box sx={{ color: "#00ce95", display: "flex", alignItems: "center", justifyContent: "center", mr: 0.4 }}>
                                                        <FiberManualRecordRoundedIcon sx={{ fontSize: "0.8rem" }} />
                                                    </Box>
                                                    <span>Correct | <span>{selectedChapter?.accuracyAnalysis.correct} out of 20</span></span>
                                                </Typography>
                                            </Box>
                                            <Box mt={1}>
                                                <Typography sx={{ fontWeight: "bold", position: "relative" }} variant="h6">
                                                    {selectedChapter?.accuracyAnalysis.incorrect / 20 * 100}%
                                                </Typography>
                                                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                                                    <Box sx={{ color: "#eb3e68", display: "flex", alignItems: "center", justifyContent: "center", mr: 0.4 }}>
                                                        <FiberManualRecordRoundedIcon sx={{ fontSize: "0.8rem" }} />
                                                    </Box>
                                                    <span> Incorrect | <span>{selectedChapter?.accuracyAnalysis.incorrect} out of 20</span>
                                                    </span>
                                                </Typography>
                                            </Box>
                                            <Box mt={1}>
                                                <Typography sx={{ fontWeight: "bold", position: "relative" }} variant="h6">
                                                    {selectedChapter?.accuracyAnalysis.unattempted / 20 * 100}%
                                                </Typography>
                                                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                                                    <Box sx={{ color: "#959aad", display: "flex", alignItems: "center", justifyContent: "center", mr: 0.4 }}>
                                                        <FiberManualRecordRoundedIcon sx={{ fontSize: "0.8rem" }} />
                                                    </Box>
                                                    <span>Unattempted | <span>{selectedChapter?.accuracyAnalysis.unattempted} out of 20</span></span>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={5} sx={{ display: "flex", alignItems: "center", justifyContent: "start", flexDirection: "column", mt: { xs: 2, md: 0 } }}>
                                    <Typography variant="h6" sx={{ marginBottom: "2rem", fontWeight: "bold" }}>Difficulty Analysis</Typography>
                                    {selectedChapter && <Bar data={barData} options={barOptions} height="160px" />}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ margin: "1rem 2rem", backgroundColor: "#eefff5", borderRadius: "10px", px: { xs: 0, md: 1 } }} py={2} >
                            <Box px={2} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "start" } }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}> Case Study1 - Analysis</Typography>
                            </Box>
                            <Box px={2} mt={2} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" } }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", mt: { xs: 1, md: 0 } }}>
                                    <Typography variant="body1" >Local-0 out of 2</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0470cc" }}>{selectedChapter?.caseStudy.local.percentage}%</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", mt: { xs: 1, md: 0 } }}>
                                    <Typography variant="body1">Global-1 out of 2</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0470cc" }}>{selectedChapter?.caseStudy.global.percentage}%</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", mt: { xs: 1, md: 0 } }}>
                                    <Typography variant="body1">Interface-2 out of 2</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0470cc" }}>{selectedChapter?.caseStudy.interface.percentage}%</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0.5rem 2rem",
                            }}
                        >
                            <Button variant="h5"
                                sx={{
                                    padding: "0.4rem 0.8rem",
                                    color: "white",
                                    backgroundColor: "green",
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "green",
                                    },
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "white", }} onClick={handleOpenModal}>Chapter Quiz Key</Typography>
                               { isModalOpen &&  <ChapterQuizKeyModal open={isModalOpen}  onClose={handleCloseModal} />}
                            </Button>
                        </Box>
                    </Box>
                </>}
        </>)
}

export default ChapterCard;