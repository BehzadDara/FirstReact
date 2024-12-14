import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import withLogger from "../higherOrderComponents/withLogger.tsx";
import useAuthStore from "../stores/useAuthStore.ts"; 

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const setToken = useAuthStore((state) => state.setToken);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setUsername("");
    setPassword("");
    setRepeatPassword("");
  };

  const handleSubmit = async () => {
    setError(null);

    if (!username || !password || (!isLogin && password !== repeatPassword)) {
      setError(isLogin ? "Please fill in all fields." : "Passwords do not match.");
      return;
    }

    const endpoint = isLogin ? "/Users/Login" : "/Users/Register";
    const body = JSON.stringify({ username, password });

    try {
      const response = await fetch(`http://localhost:5079${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }

      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        navigate("/");
      } else {
        setError("Authentication failed.");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
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
          {isLogin ? "Login" : "Register"}
        </Typography>
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ maxWidth: 400 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ maxWidth: 400 }}
          />
          {!isLogin && (
            <TextField
              label="Repeat Password"
              type="password"
              variant="outlined"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              fullWidth
              sx={{ maxWidth: 400 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ maxWidth: 400 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            component="button"
            variant="body2"
            onClick={handleToggleMode}
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default withLogger(LoginRegister);
