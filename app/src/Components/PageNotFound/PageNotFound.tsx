import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./PageNotFound.css";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <Typography variant="h1" className="title">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" className="message">
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        className="home-button"
      >
        Go to Homepage
      </Button>
    </div>
  );
};

export default PageNotFound;
