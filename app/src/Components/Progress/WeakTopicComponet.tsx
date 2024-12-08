import { Chip, Stack } from "@mui/material";
import React from "react";

// Define the props type for the component
interface WeakTopicComponentProps {
  topics_weakness: string[];
}

const WeakTopicComponent: React.FC<WeakTopicComponentProps> = ({
  topics_weakness,
}) => {
  return (
    <div>
      {/* Weak Topics */}
      <h4>Weak Topics:</h4>
      <Stack direction="row" spacing={1} sx={{ marginLeft: 0 }}>
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
