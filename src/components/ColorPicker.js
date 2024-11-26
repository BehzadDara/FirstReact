import React, { useState } from "react";
import { Box, Slider, Typography, Container, Card, CardContent } from "@mui/material";

function ColorPicker() {
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  const handleSliderChange = (color, value) => {
    setRgb((prevRgb) => ({
      ...prevRgb,
      [color]: value,
    }));
  };

  const colorString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

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
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }} gutterBottom>
          Color Picker
        </Typography>

        {["r", "g", "b"].map((color) => (
          <Box key={color} sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ color: "#555" }}>
              {color.toUpperCase()} ({rgb[color]})
            </Typography>
            <Slider
              value={rgb[color]}
              min={0}
              max={255}
              step={1}
              onChange={(e, newValue) => handleSliderChange(color, newValue)}
              sx={{
                color: color === "r" ? "red" : color === "g" ? "green" : "blue",
              }}
            />
          </Box>
        ))}

        <Card sx={{ backgroundColor: colorString, marginTop: 4, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ textAlign: "center", color: "#fff" }}>
              Color Preview
            </Typography>
          </CardContent>
        </Card>
        
      </Box>
    </Container>
  );
}

export default ColorPicker;
