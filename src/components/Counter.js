import React, { useReducer } from "react"; // Used for managing complex state logic.

import { Box, Button, Typography, Container } from "@mui/material";

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Unknown action");
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

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
          sx={{ marginTop: 2, color: state.count >= 0 ? "#4caf50" : "#f44336" }}
        >
          Count: {state.count}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch({ type: "increment" })}
          >
            Increment
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch({ type: "decrement" })}
          >
            Decrement
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch({ type: "reset" })}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Counter;
