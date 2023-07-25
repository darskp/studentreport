import React from 'react';
import { Box, Typography } from '@mui/material';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';

const QuizKeyList = ({ questions, handleQuestionClick }) => {
    const getColor = (status) => {
        switch (status) {
            case 'correct':
                return '#00ce95';
            case 'incorrect':
                return '#eb3e68';
            default:
                return '#959aad';
        }
    };

    return (
        <Box sx={{ display: 'flex', minWidth: "100%",alignItems: 'center',justifyContent: "start",flexDirection:"column"}}>
            <Box sx={{ display: 'flex', minWidth: "100%",alignItems: 'center', justifyContent: "start",gap:"2rem"}}>
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        Quiz Key
                    </Typography>
                </Box>
                <Box style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap',width:"80%" }}>
                    {questions.filter((data,index)=>index<40).map((question,index) => (
                        <Box
                            key={question.id}
                            style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '5px',
                                backgroundColor: getColor(question.status),
                                flex: '0 0 auto',

                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "white",
                                    cursor:"pointer"
                                }}
                                onClick={() => { handleQuestionClick(index)}}
                            >
                                {index+1}
                            </Typography>
                        </Box>
                    ))}
                </Box>
           </Box>
            <Box style={{ minWidth: "100%", display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: "1rem"}} mt={2}>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                    <Box sx={{ color: "#00ce95", display: "flex", alignItems: "center", justifyContent: "center", mr: 0.4 }}>
                        <FiberManualRecordRoundedIcon sx={{ fontSize: "1.1rem" }} />
                    </Box> -
                    Correct
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                    <Box sx={{ color: "#eb3e68", display: "flex", alignItems: "center", justifyContent: "center", mr: 0.4 }}>
                        <FiberManualRecordRoundedIcon sx={{ fontSize: "1.1rem" }} />
                    </Box> -
                    Incorrect
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                    <Box sx={{ color: "#959aad", display: "flex", alignItems: "center", justifyContent: "center", mr: 0.4 }}>
                        <FiberManualRecordRoundedIcon sx={{ fontSize: "1.1rem" }} />
                    </Box> -
                    Unattempted
                </Typography>
            </Box>
        </Box>
    );
};

export default QuizKeyList;
