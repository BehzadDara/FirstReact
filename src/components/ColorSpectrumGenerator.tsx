import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import Values from "values.js";
import InvalidColorModal from "./InvalidColorModal.tsx";

const ColorSpectrumGenerator: React.FC = () => {
  const [inputColor, setInputColor] = useState<string>("");
  const [colorSpectrum, setColorSpectrum] = useState<any[]>([]);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [copiedColor, setCopiedColor] = useState<string>("");

  const generateSpectrum = () => {
    try {
      const values = new Values(inputColor);
      const colors = values.all(10);
      setColorSpectrum(colors);
      setErrorModalOpen(false);
    } catch {
      setColorSpectrum([]);
      setErrorModalOpen(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setSnackbarOpen(true);
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
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }} gutterBottom>
          Color Spectrum Generator
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            generateSpectrum();
          }}
          sx={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 4 }}
        >
          <TextField
            label="Enter a Color"
            variant="outlined"
            fullWidth
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value)}
            placeholder='e.g., "red", "#ff0000", or "rgb(255,0,0)"'
            sx={{ maxWidth: 400 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Generate
          </Button>
        </Box>

        {colorSpectrum.length > 0 && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            * Click a color card to copy its HEX value
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            marginTop: 2,
          }}
        >
          {colorSpectrum.map((color, index) => {
            const hexValue = `#${color.hex}`;
            const rgbValue = `rgb(${color.rgb.join(",")})`;

            return (
              <Card
                key={index}
                sx={{
                  backgroundColor: hexValue,
                  color: index > 9 ? "white" : "black",
                  padding: 1,
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: 2,
                  width: "100%",
                  maxWidth: 400,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: 45,
                }}
                onClick={() => copyToClipboard(hexValue)}
                title="Click to copy color"
              >
                <Typography variant="body2" sx={{ fontWeight: "bold", flex: 1 }}>
                  {color.weight}%
                </Typography>
                <Typography variant="body2" sx={{ flex: 2, textAlign: "center" }}>
                  {rgbValue}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "uppercase", marginLeft: 2 }}
                >
                  {hexValue}
                </Typography>
              </Card>
            );
          })}
        </Box>
      </Box>

      {}
      <InvalidColorModal closeModal={() => setErrorModalOpen(false)} open={errorModalOpen} />

      {}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Color {copiedColor} copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ColorSpectrumGenerator;
