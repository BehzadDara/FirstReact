import React, { useState, useTransition } from "react"; // for smooth transition
import { Box, Button, Typography, Container } from "@mui/material";
import withLogger from "../higherOrderComponents/withLogger.tsx";

const generateColors = (count: number): string[] =>
  Array.from({ length: count }, () => {
    const randomColor = `rgb(
      ${Math.floor(Math.random() * 255)}, 
      ${Math.floor(Math.random() * 255)}, 
      ${Math.floor(Math.random() * 255)}
    )`;
    return randomColor;
  });

const ColorGenerator: React.FC = () => {
  const [colorCount] = useState<number>(9);
  const [colors, setColors] = useState<string[]>(generateColors(colorCount));
  const [isPending, startTransition] = useTransition();

  const handleGenerateColors = () => {
    startTransition(() => {
      setColors(generateColors(colorCount));
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
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
          Color Generator
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            color: "#555",
            fontStyle: "italic",
          }}
        >
          Generate random colors!
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateColors}
            disabled={isPending}
          >
            {isPending ? "Generating Colors..." : "Generate Colors"}
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {colors.map((color, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: color,
                width: "200px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                borderRadius: 1,
              }}
            >
              {color}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default withLogger(ColorGenerator);
