import React, { useState } from "react";
import { Box, Slider, Typography, Container, Card, CardContent } from "@mui/material";
import { getReadableTextColor } from "../ColorHelper.tsx";
import withLogger from "../higherOrderComponents/withLogger.tsx";

interface RGB {
  r: number;
  g: number;
  b: number;
}

const ColorPicker: React.FC = () => {
  const [rgb, setRgb] = useState<RGB>({ r: 0, g: 0, b: 0 });

  const handleSliderChange = (color: keyof RGB, value: number): void => {
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

        {(["r", "g", "b"] as Array<keyof RGB>).map((color) => (
          <Box key={color} sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ color: "#555" }}>
              {color.toUpperCase()} ({rgb[color]})
            </Typography>
            <Slider
              value={rgb[color]}
              min={0}
              max={255}
              step={1}
              onChange={(_, newValue) => handleSliderChange(color, newValue as number)}
              sx={{
                color: color === "r" ? "red" : color === "g" ? "green" : "blue",
              }}
            />
          </Box>
        ))}

        <Card sx={{ backgroundColor: colorString, marginTop: 4, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ textAlign: "center", color: getReadableTextColor([rgb.r,rgb.g,rgb.b]) }}>
              Color Preview
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default withLogger(ColorPicker);
