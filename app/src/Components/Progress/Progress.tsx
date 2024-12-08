import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; // Import Button for sharing
import { getSummary, getSessions } from "../../services/progress-service.js";
import WeakTopicComponent from "./WeakTopicComponet.js";
import SessionListComponent from "./SessionListComponent.js";
import { Session, Summary } from "../../models/Progress.js";
import "./Progress.css";

const Progress: React.FC = () => {
  const [timeToAns, setTimeToAns] = useState<number>(0);
  // const [user_id, setUser_id] = useState<string>("6754d3f61ef42bf2a9afb40d");
  const [quesionAttempted, setQuesionAttempted] = useState<number>(50);
  const [correctAns, setCorrectAns] = useState<number>(50);
  const [accuracy, setAccuracy] = useState<number>(50);
  const [summaryResponse, setSummaryResponse] = useState<Summary | null>(null);
  const [sessionResponse, setSessionResponse] = useState<Session[]>([]);

  // Get user_id from Redux store
  const user_id = useSelector((state: any) => state.user.id); // Adjust path based on your Redux state structure

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary: Summary = await getSummary(user_id); // Fetch summary using user_id
        setSummaryResponse(summary);
        setTimeToAns(summary.average_time_per_question || 0);
        setQuesionAttempted(summary.total_questions_answered || 0);
        setCorrectAns(summary.correct_answers || 0);
        setAccuracy(summary.accuracy || 0);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, [user_id]); // Dependency on user_id

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary: Summary = await getSummary(user_id);
        setSummaryResponse(summary);
        setTimeToAns(summary.average_time_per_question || 0);
        setQuesionAttempted(summary.total_questions_answered || 0);
        setCorrectAns(summary.correct_answers || 0);
        setAccuracy(summary.accuracy || 0);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions: Session[] = await getSessions(user_id);
        setSessionResponse(sessions);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching sessions:", error.message);
        } else {
          console.error("An unknown error occurred");
        }
      }
    };

    fetchSessions();
  }, []);

  // Function to handle sharing
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Progress Summary",
          text: `Check out my progress! I answered ${quesionAttempted} questions with an accuracy of ${accuracy}%. My average time per question is ${timeToAns} seconds.`,
          url: window.location.href,
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <Box position="relative">
      {/* Share Button in Top-Right Corner */}
      <Box
        position="absolute"
        top={16} // Distance from the top
        right={16} // Distance from the right
        zIndex={1} // Ensure it appears above other elements
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleShare}
          sx={{
            paddingX: 2,
            paddingY: 1,
            fontSize: "0.875rem", // Slightly smaller font size for button
          }}
        >
          Share My Progress
        </Button>
      </Box>

      {/* Main Content */}
      <Typography variant="h3" align="center">
        Summary
      </Typography>
      <Stack spacing={2}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Box flex={{ xs: "1 1 auto", md: "2" }} textAlign="center">
            <Stack alignItems="center" spacing={1}>
              <Gauge
                width={400}
                height={200}
                value={accuracy}
                startAngle={-90}
                endAngle={90}
                text={({ value }) => `${value}%`}
              />
              <Typography variant="body1" color="textSecondary">
                {correctAns} correct out of {quesionAttempted}
              </Typography>
            </Stack>
          </Box>

          <Box flex={{ xs: "1 1 auto", md: "1" }}>
            <Card
              variant="outlined"
              sx={{
                width: "fit-content",
                maxWidth: "100%",
                minWidth: "250px",
                padding: 2,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
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
        <WeakTopicComponent
          topics_weakness={summaryResponse?.topics_weakness || []}
        />

        {/* Session List */}
        <SessionListComponent sessions={sessionResponse} />
      </Stack>
    </Box>
  );
};

export default Progress;
