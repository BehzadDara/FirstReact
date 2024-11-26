import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Box, Container, Typography, Button, TextField } from "@mui/material";

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const connectionRef = useRef(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5079/timer")
      .withAutomaticReconnect()
      .build();

    connection.on("TimerUpdate", (time) => {
      setTimer(time);
    });

    connection.on("TimerComplete", (message) => {
      setStatus(message);
      setIsRunning(false);
    });

    connection
      .start()
      .then(() => {
        console.log("SignalR connection established.");
      })
      .catch((err) => console.error("Connection failed: ", err));

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, []);

  const startTimer = async () => {
    if (!inputTime || isNaN(inputTime) || inputTime <= 0) {
      setStatus("Please enter a valid positive number!");
      return;
    }

    setIsInit(false);
    setIsRunning(true);
    setStatus("");
    setTimer(0);

    try {
      await connectionRef.current.invoke("StartTimer", parseInt(inputTime));
    } catch (error) {
      console.error("Error starting timer: ", error);
      setIsRunning(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#f4f4f4",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Timer
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: 2,
            color: isInit? "#9c27b0" : isRunning ? "#4caf50" : "#f44336",
          }}
        >
          {`Time: ${timer}s`}
        </Typography>
        <TextField
          type="number"
          variant="outlined"
          placeholder="Enter time in seconds"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          fullWidth
          sx={{
            marginTop: 3,
            marginBottom: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          disabled={isRunning}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={startTimer}
          disabled={isRunning}
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            borderRadius: "8px",
          }}
        >
          {isRunning ? "Running..." : "Start Timer"}
        </Button>
        {status && (
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              marginTop: 3,
              fontStyle: "italic",
            }}
          >
            {status}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Timer;