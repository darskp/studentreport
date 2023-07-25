import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Button, Grid, Checkbox, CircularProgress } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import QuizKeyList from "./QuizKeyList";
import { response } from "../chapters/responseData";
import { useSelector } from "react-redux";

const ChapterQuizKeyModal = ({ open, onClose }) => {

    const chapterData = response.chapters;
    const selectedChapterId = useSelector((state) => state.selectedChapterId);
    const selectedChapter = chapterData.find(chapter => chapter.id === selectedChapterId);

    const [questions, setQuestions] = useState(selectedChapter?.questions || []);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex] || {};
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleQuestionClick = (id) => {
        setLoading(true);
        setTimeout(() => {
            setCurrentQuestionIndex(id);
            setLoading(false);
        }, 500);
    };

    const handleAnswerSelection = (e, option) => {
        e.preventDefault();
        setSelectedAnswer(option);
        let updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = {
            ...currentQuestion,
            userSelected: option,
            status: option === currentQuestion.correctOption ? "correct" : "incorrect",
        };
        setQuestions(updatedQuestions);
    };

    const handleNextQuestion = () => {
        setLoading(true);
        setTimeout(() => {
            setCurrentQuestionIndex((n) => n + 1);
            setLoading(false);
        }, 500);
    };


    const handlePreQuestion = () => {
        setLoading(true);
        setTimeout(() => {
            setCurrentQuestionIndex((prev) => prev - 1);
            setLoading(false);
        }, 500);
    };


    useEffect(() => {
        if (selectedChapter) {
            setQuestions(selectedChapter.questions);
        }
    }, [selectedChapter]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [questions]);

    useEffect(() => {
        setSelectedAnswer(currentQuestion?.userSelected || currentQuestion?.correctOption);
    }, [currentQuestionIndex, questions, selectedChapterId]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    height:{xs:"100%",md:"100vh"},
                    width: "100vw",
                    bgcolor: "#E5E5E5",
                    // overflowY: {xs:"scroll",md:"unset"}
                }}
                >
                <Box
                    m={2}
                    mb={1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "95%",
                        bgcolor: "white",
                        borderRadius: "10px",
                        padding: "1rem",
                        paddingBottom: "0rem",
                        minHeight:{xs:"auto",md:"70%"},
                        marginRight: "1rem",  
                        // overflowY: {xs:"scroll",md:"visible"}
                    }}>
                    <Grid
                        container
                        style={{ minHeight:{xs:"auto",md:"70%"},backgroundColor: "white", }}
                    >
                        <Grid
                            key={currentQuestionIndex}
                            item
                            xs={12}
                            md={6}
                            sx={{
                                display: "flex",
                                justifyContent: "start",
                                flexDirection: "column",
                            }}
                            p={2}
                        >
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Introduction to Motion AY 20-21
                            </Typography>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Devtesting - {selectedChapter.name} & Q{currentQuestion?.id} & {currentQuestion?.status}
                            </Typography>
                            {loading ?
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70%" }}>
                                    <CircularProgress />
                                </Box> :
                                <Box>
                                    <Typography variant="h6" mt={1}>
                                        Q{currentQuestion?.id}. {currentQuestion?.question}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }} mt={2}>
                                        Explanation
                                    </Typography>
                                    <Typography variant="h6" mt={1}>
                                        {currentQuestion?.explanation}
                                    </Typography>
                                </Box>
                            }
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"
}}
                        >
                            <Box p={2}>
                                <Typography
                                    mt={1}
                                    mb={2}
                                    variant="h6"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Answer
                                </Typography>
                                {loading ?
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60%" }}>
                                        <CircularProgress />
                                    </Box> :
                                    <>
                                        <Box>
                                            {currentQuestion?.options?.map((option, index) => (
                                                <Box key={index}>
                                                    <Box

                                                        px={1}
                                                        mt={2}
                                                        sx={{
                                                            paddingY: "5px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "start",
                                                            border: "1px solid lightgrey",
                                                            borderRadius: "5px",
                                                            backgroundColor:
                                                                selectedAnswer === option
                                                                    ? currentQuestion.correctOption === option
                                                                        ? "#e7ffe8"
                                                                        : "#fdd8e1"
                                                                    : selectedAnswer && selectedAnswer !== option && option === currentQuestion?.correctOption ? "#e7ffe8" : "white"
                                                        }}
                                                    >
                                                        <Box>
                                                            <Checkbox
                                                                checked={selectedAnswer === option}
                                                                onChange={(e) => handleAnswerSelection(e, option)}
                                                                icon={
                                                                    selectedAnswer ? (
                                                                        selectedAnswer !== option && option === currentQuestion?.correctOption ? (
                                                                            <CheckBoxIcon style={{ color: "#00ce95" }} />
                                                                        ) : (
                                                                            <DisabledByDefaultRoundedIcon />
                                                                        )
                                                                    ) : <CheckBoxOutlineBlankIcon />
                                                                }
                                                                checkedIcon={
                                                                    selectedAnswer ? (
                                                                        selectedAnswer === option && option === currentQuestion?.correctOption ? (
                                                                            <CheckBoxIcon style={{ color: "#00ce95" }} />
                                                                        ) : (
                                                                            <DisabledByDefaultRoundedIcon style={{ color: "#eb3e68" }} />
                                                                        )
                                                                    ) : <CheckBoxOutlineBlankIcon />
                                                                }
                                                                // disabled={currentQuestion.status !== "unattempted"}
                                                                disabled
                                                            />
                                                        </Box>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: "bold"
                                                            }}
                                                        >
                                                            {option}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        {selectedAnswer === option ? (option === currentQuestion?.correctOption ? (
                                                            currentQuestion?.status === 'unattempted' ? <>
                                                                <Box ml={1}>
                                                                    <Typography variant="h6">
                                                                        This is the Correct Answer
                                                                    </Typography>
                                                                </Box>
                                                            </> :
                                                                <>
                                                                    <Box ml={1}>
                                                                        <Typography variant="h6">
                                                                            Correct Answer
                                                                        </Typography>
                                                                    </Box>
                                                                </>
                                                        ) : (
                                                            <>
                                                                <Box ml={1}>
                                                                    <Typography variant="h6">
                                                                        Your Answer
                                                                    </Typography>
                                                                </Box>
                                                            </>
                                                        )) : null
                                                        }
                                                        {selectedAnswer && selectedAnswer !== option && option === currentQuestion?.correctOption ?
                                                            <>
                                                                <Box ml={1}>
                                                                    <Typography variant="h6">
                                                                        This is the Correct Answer
                                                                    </Typography>
                                                                </Box>
                                                            </>
                                                            : null
                                                        }
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </>
                                }
                            </Box>
                            <Box
                                px={2}
                                sx={{ position:"fixed",top:"68%",right:"2%",display: "flex", gap: "1rem", justifyContent: "end", }}
                            >
                                <Button
                                    variant="h5"
                                    sx={{
                                        padding: "0.4rem 0.4rem",
                                        color: "white",
                                        backgroundColor: "green",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "green",
                                        },
                                    }}
                                    onClick={onClose}
                                >
                                    <Typography variant="h6" sx={{ color: "white" }}>Exit</Typography>
                                </Button>
                                <Button
                                    variant="h5"
                                    sx={{
                                        padding: "0.4rem 0.8rem",
                                        color: "white",
                                        backgroundColor: currentQuestionIndex !== 0 ? "green" : "lightgrey",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: currentQuestionIndex !== 0 ? "green" : "lightgrey",
                                        },
                                    }}
                                    onClick={handlePreQuestion}
                                    disabled={currentQuestionIndex === 0 || loading}
                                >
                                    <ExpandLessIcon sx={{ marginRight: "0.1rem", color: "white", transform: "rotate(-90deg)" }} />
                                    <Typography variant="h6" sx={{ color: "white" }}>Previous Question</Typography>

                                </Button>
                                <Button
                                    variant="h5"
                                    sx={{
                                        padding: "0.4rem 0.8rem",
                                        color: "white",
                                        backgroundColor: currentQuestionIndex !== questions?.length - 1 ? "orange" : "lightgrey",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: currentQuestionIndex !== questions?.length - 1 ? "orange" : "lightgrey",
                                        },
                                    }}
                                    onClick={handleNextQuestion}
                                    disabled={currentQuestionIndex === questions?.length - 1 || loading}
                                >
                                    <Typography variant="h6" sx={{ color: "white" }}>Next Question</Typography>
                                    <ExpandLessIcon sx={{ marginRight: "0.1rem", color: "white", transform: "rotate(90deg)" }} />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    m={2}
                    mt={1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px",
                        flex: 1,
                        bgcolor: "white",
                        padding: "1rem",
                        width: "95%",
                        height:"100%",
                        justifyContent:"center"
                    }}
                >
                    <Box>
                        <QuizKeyList questions={questions} currentQuestionIndex={currentQuestionIndex} handleQuestionClick={handleQuestionClick} />
                    </Box>
                </Box>
            </Box>
        </Modal >
    );
};

export default ChapterQuizKeyModal;