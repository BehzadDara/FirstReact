import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useCounter } from "../hooks/useCounter.ts";
import withLogger from "../higherOrderComponents/withLogger.tsx";

const Counter: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#f4f4f4",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          Counter
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginTop: 2, color: count >= 0 ? "#4caf50" : "#f44336" }}
        >
          Count: {count}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: 3,
          }}
        >
          <Button variant="contained" color="primary" onClick={increment}>
            Increment
          </Button>
          <Button variant="contained" color="secondary" onClick={decrement}>
            Decrement
          </Button>
          <Button variant="outlined" color="error" onClick={reset}>
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default withLogger(Counter);
