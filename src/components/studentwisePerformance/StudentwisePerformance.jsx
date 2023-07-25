import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Box, TableRow, Paper, Typography } from '@mui/material';
import './studentPerformance.css';
import SquareIcon from '@mui/icons-material/Square';
import { studentPerformanceData } from './studentPerformanceData';

const SortableTable = () => {
  const [data, setData] = useState(studentPerformanceData);

  const [sortOrder, setSortOrder] = useState({
    studentName: 'asc',
    concept: 'asc',
    subConcept: 'asc',
    rootConcept: 'asc',
    marks: 'asc',
    percentage: 'asc',
    timeTaken: 'asc',
    avgTimePerQuestion: 'asc',
    attemptOn: 'asc',
    pq1Attempt: 'asc',
    pq2Attempt: 'asc',
    highestScore: 'asc',
  });

  const headers = [
    { label: "S. No", property: null },
    { label: "Student", property: 'studentName' },
    { label: "Concept", property: 'concept' },
    { label: "Sub Concept", property: 'subConcept' },
    { label: "Root-Concept", property: 'rootConcept' },
    { label: "Marks", property: 'marks' },
    { label: "Percentage", property: 'percentage' },
    { label: "Time Taken (Min)", property: 'timeTaken' },
    { label: "Agv. time per Question", property: 'avgTimePerQuestion' },
    { label: "Attempt On", property: 'attemptOn' },
    { label: "PQ1 Attempt", property: 'pq1Attempt' },
    { label: "PQ2 Attempt", property: 'pq2Attempt' },
    { label: "Highest Score (PQ)", property: 'highestScore' },
  ];

  const handleAscSort = (property) => {
    const sortedData = [...data].sort((a, b) => {
      switch (property) {
        case 'studentName':
        case 'concept':
          return a[property].localeCompare(b[property]);
        case 'subConcept':
          const aSubConcept = a[property][0];
          const bSubConcept = b[property][0];
          if (!aSubConcept || !bSubConcept) return 0;
          const aSubConceptName = aSubConcept?.name;
          const bSubConceptName = bSubConcept?.name;
          return aSubConceptName.localeCompare(bSubConceptName);
        case 'marks':
          const aTotalMarks = calculateTotalMarks(a.subConcept);
          const bTotalMarks = calculateTotalMarks(b.subConcept);
          return aTotalMarks - bTotalMarks;
        case 'rootConcept':
          const aRootConcepts = a.subConcept.flatMap((subConcept) =>
            subConcept.rootConcepts.map((item) => item.name)
          );
          const bRootConcepts = b.subConcept.flatMap((subConcept) =>
            subConcept.rootConcepts.map((item) => item.name)
          );
          const aRootConceptNames = aRootConcepts.join(', ');
          const bRootConceptNames = bRootConcepts.join(', ');
          return aRootConceptNames.localeCompare(bRootConceptNames);
        case 'timeTaken':
        case 'avgTimePerQuestion':
          const aTime = stringToSeconds(a[property]);
          const bTime = stringToSeconds(b[property]);
          return aTime - bTime;
        case 'attemptOn':
          const aDate = dateStringToSeconds(a[property]);
          const bDate = dateStringToSeconds(b[property]);
          return aDate - bDate;
        default:
          return a[property] - b[property];
      }
    });
    setData(sortedData);
    setSortOrder({ ...sortOrder, [property]: 'asc' });
  };

  const handleDescSort = (property) => {
    const sortedData = [...data].sort((a, b) => {
      switch (property) {
        case 'studentName':
        case 'concept':
          return b[property].localeCompare(a[property]);
        case 'subConcept':
          const aSubConcept = a[property][0];
          const bSubConcept = b[property][0];
          if (!aSubConcept || !bSubConcept) return 0;
          const aSubConceptName = aSubConcept?.name;
          const bSubConceptName = bSubConcept?.name;
          return bSubConceptName.localeCompare(aSubConceptName);
        case 'rootConcept':
          const aRootConcepts = a.subConcept.flatMap((subConcept) =>
            subConcept.rootConcepts.map((item) => item.name)
          );
          const bRootConcepts = b.subConcept.flatMap((subConcept) =>
            subConcept.rootConcepts.map((item) => item.name)
          );
          const aRootConceptNames = aRootConcepts.join(', ');
          const bRootConceptNames = bRootConcepts.join(', ');
          return bRootConceptNames.localeCompare(aRootConceptNames);
        case 'marks':
          const aTotalMarks = calculateTotalMarks(a.subConcept);
          const bTotalMarks = calculateTotalMarks(b.subConcept);
          return bTotalMarks - aTotalMarks;
        case 'timeTaken':
        case 'avgTimePerQuestion':
          const aTime = stringToSeconds(a[property]);
          const bTime = stringToSeconds(b[property]);
          return bTime - aTime;
        case 'attemptOn':
          const aDate = dateStringToSeconds(a[property]);
          const bDate = dateStringToSeconds(b[property]);
          return bDate - aDate;
        default:
          return b[property] - a[property];
      }
    });
    setData(sortedData);
    setSortOrder({ ...sortOrder, [property]: 'desc' });
  };

  const stringToSeconds = (timeString) => {
    const timeParts = timeString.split(' ');
    let totalSeconds = 0;
    for (let i = 0; i < timeParts.length; i += 2) {
      const value = parseInt(timeParts[i]);
      if (timeParts[i + 1] === 'min') {
        totalSeconds += value * 60;
      } else if (timeParts[i + 1] === 'seconds') {
        totalSeconds += value;
      }
    }
    return totalSeconds;
  };

  const calculateTotalMarks = (subConcepts) => {
    let totalMarks = 0;
    subConcepts.forEach((subConcept) => {
      subConcept.rootConcepts.forEach((rootConcept) => {
        totalMarks += rootConcept.marks;
      });
    });
    return totalMarks;
  };

  const dateStringToSeconds = (dateString) => {
    const months = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    const dateParts = dateString.split('-');
    const day = parseInt(dateParts[0]);
    const month = months[dateParts[1].toLowerCase()];
    const year = 2000 + parseInt(dateParts[2]);
    const dateInSeconds = new Date(year, month, day).getTime() / 1000;
    return dateInSeconds;
  };

  const getColor = (percentage) => {
    if (percentage >= 80) {
      return '#b1eee9';
    } else if (percentage >= 60 && percentage < 80) {
      return '#fdf8de';
    } else if (percentage >= 40 && percentage < 60) {
      return '#fbe498';
    } else {
      return '#fecace';
    }
  };

  const colorData = [
    { color: "#b1eee9", label: ">= 80 Blue" },
    { color: "#fdf8de", label: "60-79 Green" },
    { color: "#fbe498", label: "40-59 Yellow" },
    { color: "#fecace", label: ">= 39 Red" },
  ];

  useEffect(() => {
    const property = 'percentage';
    const sortedData = [...data].sort((a, b) => b[property] - a[property]);
    setData(sortedData);
    setSortOrder({ ...sortOrder, [property]: 'desc' });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: { xs: "100vh", md: "100vh" },
        width: "100vw",
        bgcolor: "white",
        overflow: "hidden",
      }}
    >
      <Box
        m={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "95%",
          bgcolor: "white",
          paddingBottom: "0rem",
          minHeight: { xs: "70%", md: "70%" },
        }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: { xs: "82vh", md: "80vh" }, overflow: "auto" }} className='table-container'>
          <Table>
            <TableHead sx={{ position: "sticky", top: "0%", left: 0, backgroundColor: '#403e75', zIndex: 1 }} aria-label="sticky table">
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} sx={{ textAlign: 'center', color: 'white', border: '1px solid rgb(213 207 199)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                      <Typography variant="h5" sx={{ color: 'white' }}>
                        {header.label}
                      </Typography>
                      {header.property && (
                        <Box className="both-arrows" ml={1}>
                          <Box className="arrow asc" onClick={() => handleAscSort(header.property)} />
                          <Box className="arrow desc" onClick={() => handleDescSort(header.property)} />
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={13} sx={{ textAlign: 'center', color: 'white', border: '1px solid #d5cfc7' }}>
                    <Typography variant="h6">No data available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={row.id} sx={{
                    backgroundColor: getColor(row.percentage), border: '1px solid #d5cfc7'
                  }}>
                    <TableCell className='table-cell-custom' sx={{ alignItems: 'flex-start', verticalAlign: row.subConcept.length > 1 ? "top" : "middle" }} >
                      <Typography variant="h6" >{index + 1}</Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom' sx={{ alignItems: 'flex-start', verticalAlign: row.subConcept.length > 1 ? "top" : "middle" }}>
                      <Typography variant="h6"><strong>{row.studentName}</strong></Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom' sx={{ alignItems: 'flex-start', verticalAlign: row.subConcept.length > 1 ? "top" : "middle" }}>
                      <Typography variant="h6">{row.concept}</Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom textalign-start' sx={{ padding: 0 }}>
                      {row.subConcept?.map((item, subIndex) => {
                        const subItemCount = row.subConcept.length || 0;
                        const rootItemCount1 = item?.rootConcepts?.length || 0;
                        const rootItemHeight = subItemCount > 1 ? `${100 / subItemCount}%` : "auto";
                        const check = row.subConcept.length > 1;
                        return (
                          <Box key={item.id} style={{ display: 'flex', flexDirection: 'column', }}>
                            {item.rootConcepts.map((rootItem, index) => {
                              return (
                                <Box key={rootItem.id}>
                                  <Typography variant="h6" sx={{ padding: '4px 8px', height: rootItemHeight, borderBottom: subIndex !== row.subConcept.length - 1 ? (index !== item.rootConcepts.length - 1) ? 'none' : '1px solid #d5cfc7' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {index === 0 && item.name}
                                    {/* { item.name} */}
                                  </Typography>
                                </Box>
                              )
                            }
                            )}
                            {rootItemCount1 === 0 && (
                              <Typography variant="h6" sx={{ height: rootItemHeight, borderBottom: '1px solid #d5cfc7', padding: '4px 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.name}
                              </Typography>
                            )}
                          </Box>
                        );
                      })}
                    </TableCell>
                    <TableCell className='table-cell-custom textalign-start' sx={{ padding: 0 }}>
                      {row.subConcept?.map((item, subIndex) => {
                        const rootItemCount = item?.rootConcepts?.length || 0;
                        const rootItemHeight = rootItemCount > 1 ? `${100 / rootItemCount}%` : "auto";
                        const check = item.rootConcepts.length > 1;
                        return (
                          <Box key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            {item.rootConcepts.map((rootItem, index) => (
                              <Typography key={rootItem.id} variant="h6" sx={{ height: rootItemHeight, borderBottom: check ? '1px solid #d5cfc7' : 'none', padding: '4px 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {rootItem.name}
                              </Typography>
                            ))}
                            {rootItemCount === 0 && (
                              <Typography variant="h6" sx={{ height: rootItemHeight, borderBottom: '1px solid #d5cfc7', padding: '4px 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                &nbsp;
                              </Typography>
                            )}
                          </Box>
                        );
                      })}
                    </TableCell>
                    <TableCell className='table-cell-custom' sx={{ padding: 0 }}>
                      {row.subConcept?.map((item) => {
                        const rootItemCount = item?.rootConcepts?.length || 0;
                        const rootItemHeight = rootItemCount > 1 ? `${100 / rootItemCount}%` : 'auto';
                        const check = item.rootConcepts.length > 1;
                        return (
                          <Box key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            {item.rootConcepts.map((rootItem) => (
                              <Typography key={rootItem.id} variant="h6" sx={{ height: rootItemHeight, borderBottom: check ? '1px solid #d5cfc7' : 'none', padding: '4px 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {check ? `${rootItem.marks}/10` : rootItem.marks}
                              </Typography>
                            ))}
                            {rootItemCount === 0 && (
                              <Typography variant="h6" sx={{ height: rootItemHeight, borderBottom: '1px solid #d5cfc7', padding: '4px 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                &nbsp;
                              </Typography>
                            )}
                          </Box>
                        );
                      })}
                    </TableCell>
                    <TableCell className='table-cell-custom'>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{row.percentage}%</Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom textalign-start'>
                      <Typography variant="h6">{row.timeTaken}</Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom textalign-start'>
                      <Typography variant="h6">{row.avgTimePerQuestion}</Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom'>
                      <Typography variant="h6">{row.attemptOn}</Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom'>
                      <Typography variant="h6">{row.pq1Attempt}</Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom'>
                      <Typography variant="h6">{row.pq2Attempt}</Typography>
                    </TableCell>
                    <TableCell className='table-cell-custom'>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{row.highestScore}%</Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        m={2}
        mt={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          bgcolor: "white",
          width: "95%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box style={{ minWidth: "100%", display: 'flex', alignItems: 'center', justifyContent: "center", gap: "1rem" }}>
          {colorData?.map((item, index) => (
            <Box key={index} sx={{ color: item.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ marginRight: "0.5rem" }}>
                <SquareIcon sx={{ fontSize: "1.5rem" }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: "1.2" }}>{item.label}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box >
  );
};

export default SortableTable;
