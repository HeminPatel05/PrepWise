import { Card, CardContent, Chip, Typography, Stack } from "@mui/material";
import React from "react";
import { Session } from "../../models/Progress";

// Define the props type for the component
interface SessionListComponentProps {
  sessions: Session[];
}

const SessionListComponent: React.FC<SessionListComponentProps> = ({
  sessions,
}) => {
  // Function to format ISO date to a readable format
  const formatDate = (isoDate: string): string => {
    const dateObj = new Date(isoDate); // Create a Date object
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long", // e.g., Sunday
      year: "numeric", // e.g., 2024
      month: "long", // e.g., November
      day: "numeric", // e.g., 17
    });
  };

  return (
    <div>
      <h2>Session Details:</h2>
      {sessions.map((session, index) => (
        <Card key={index} variant="outlined" sx={{ width: "100%", mb: 2 }}>
          <CardContent>
            {/* Section */}
            <Typography variant="h6" gutterBottom>
              Section:
            </Typography>
            <Typography variant="body1">{session.section}</Typography>

            {/* Date */}
            <Typography variant="h6" gutterBottom mt={2}>
              Date:
            </Typography>
            <Typography variant="body1">{formatDate(session.date)}</Typography>

            {/* Duration */}
            <Typography variant="h6" gutterBottom mt={2}>
              Duration:
            </Typography>
            <Typography variant="body1">{session.duration} minutes</Typography>

            {/* Topics Covered */}
            <Typography variant="h6" gutterBottom mt={2}>
              Topics Covered:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ marginLeft: 0 }}
            >
              {session.topics_covered.map((topic, topicIndex) => (
                <Chip key={topicIndex} label={topic} />
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SessionListComponent;
