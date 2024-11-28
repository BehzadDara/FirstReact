import React, { useState, useMemo } from "react"; // used to optimize performance by memoizing the result of an expensive calculation. It prevents unnecessary recalculations of a value unless its dependencies change.
import { Box, Button, Typography, Container } from "@mui/material";

function ExpensiveCalculation(num: number): number {
  return num * 2;
}

const Calculation: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<number>(0);

  const double = useMemo(() => ExpensiveCalculation(value), [value]);

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
          Calculation
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: 2,
            color: value % 2 === 0 ? "#4caf50" : "#f44336",
          }}
        >
          Value: {double}
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
            onClick={() => setValue(value + 1)}
          >
            Increase Value
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setCount(count + 1)}
          >
            Increase Count
          </Button>
        </Box>
        <Typography
          variant="body1"
          sx={{ marginTop: 2, color: "#555", fontStyle: "italic" }}
        >
          Count: {count}
        </Typography>
      </Box>
    </Container>
  );
};

export default Calculation;
