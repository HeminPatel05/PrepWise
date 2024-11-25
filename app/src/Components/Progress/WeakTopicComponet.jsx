import { Chip, Stack } from "@mui/material";
import React from "react";

const WeakTopicComponent = (props) => {
  const { topics_weakness } = props; // Destructuring props for readability

  return (
    <div>
      {/* Weak Topics */}
      <h4>Weak Topics:</h4>
      <Stack direction="row" spacing={1}>
        {topics_weakness && topics_weakness.length > 0 ? ( // Check if topics_weakness exists and has items
          topics_weakness.map((topic, index) => (
            <Chip key={index} label={topic} />
          ))
        ) : (
          <p>No weak topics available.</p> // Fallback message
        )}
      </Stack>
    </div>
  );
};

export default WeakTopicComponent;
