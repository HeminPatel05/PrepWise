import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"; // Import Box for layout
import { getSummary, getSessions } from "../../services/progress-service.js";
import WeakTopicComponet from "./WeakTopicComponet.jsx";
import SessionListComponent from "./SessionListComponent.jsx";

const Progress = () => {
  const [timeToAns, setTimeToAns] = useState(0);
  const [username, setUsername] = useState("user123");
  const [quesionAttempted, setQuesionAttempted] = useState(50);
  const [correctAns, setCorrectAns] = useState(50);
  const [accuracy, setAccuracy] = useState(50);
  const [summaryResponse, setSummaryResponse] = useState([]);
  const [sessionResponse, setSessionResponse] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await getSummary(username); // Call the API
        setSummaryResponse(summary); // Update state with API response
        setTimeToAns(summary.average_time_per_question || 0);
        setQuesionAttempted(summary.total_questions_answered || 0);
        setCorrectAns(summary.correct_answers || 0);
        setAccuracy(summary.accuracy || 0);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getSessions(username); // Call the new API function
        setSessionResponse(sessions); // Update state with session data
      } catch (error) {
        console.error("Error fetching sessions:", error.message);
      }
    };

    fetchSessions();
  }, []); // Empty dependency array ensures this runs only once

  // // Example session data
  // const sessionData = {
  //   section: "Verbal",
  //   date: "2024-11-17T09:00:00.000Z",
  //   duration: 60,
  //   topics_covered: ["Sentence Correction", "Vocabulary", "efewswfw"],
  // };

  // const additionalSessionData = {
  //   section: "Quantitative",
  //   date: "2024-11-18T09:00:00.000Z",
  //   duration: 45,
  //   topics_covered: ["Algebra", "Geometry", "Data Analysis"],
  // };

  // // Format dates to a readable format
  // const formattedDate = new Date(sessionData.date).toLocaleDateString("en-US", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  // const formattedAdditionalDate = new Date(
  //   additionalSessionData.date
  // ).toLocaleDateString("en-US", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  return (
    <>
      <Typography variant="h3" align="center">
        Summary
      </Typography>
      <Stack spacing={2}>
        {/* Use Box with Flexbox for row layout */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }} // Stack vertically on small screens, horizontally on medium+
          alignItems="center"
          justifyContent="space-between"
          gap={2} // Add spacing between items
        >
          {/* Gauge takes 2/3 of the row */}
          <Box flex={{ xs: "1 1 auto", md: "2" }} textAlign="center">
            <Stack alignItems="center" spacing={1}>
              {/* Gauge for progress */}
              <Gauge
                width={400}
                height={200}
                value={accuracy}
                startAngle={-90}
                endAngle={90}
                text={({ value }) => `${value}%`}
              />

              {/* Message below the Gauge */}
              <Typography variant="body1" color="textSecondary">
                {correctAns} correct out of {quesionAttempted}
              </Typography>
            </Stack>
          </Box>

          {/* Card takes 1/3 of the row */}
          <Box flex={{ xs: "1 1 auto", md: "1" }}>
            <Card
              variant="outlined"
              sx={{
                width: "fit-content", // Fits content dynamically
                maxWidth: "100%", // Prevents overflow on smaller screens
                minWidth: "250px", // Ensures the card has a minimum size
                padding: 2, // Adds padding inside the card for a larger feel
              }}
            >
              <CardContent
                sx={{
                  display: "flex", // Enables Flexbox
                  flexDirection: "column", // Stacks content vertically
                  justifyContent: "center", // Centers content vertically
                  alignItems: "center", // Centers content horizontally
                  height: "100%", // Ensures full height for vertical centering
                  textAlign: "center", // Center-aligns the text itself
                }}
              >
                <Typography variant="h6" component="div">
                  Avg. Time/Question
                </Typography>
                <Typography variant="h4" color="primary">
                  {timeToAns} sec
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Weak Topics */}
        <WeakTopicComponet topics_weakness={summaryResponse.topics_weakness} />
        {/* Weak Topics */}
        {/* <h4>Weak Topics:</h4>
        <Stack direction="row" spacing={1}>
          {summaryResponse?.topics_weakness?.length > 0 ? (
            summaryResponse.topics_weakness.map((topic, index) => (
              <Chip key={index} label={topic} />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No weak topics available.
            </Typography>
          )}
        </Stack>

        {console.log(summaryResponse.topics_weakness)} */}
        <SessionListComponent sessions={sessionResponse} />
      </Stack>
    </>
  );
};

export default Progress;
