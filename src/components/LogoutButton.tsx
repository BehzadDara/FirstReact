import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    navigate("/loginRegister");
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
      sx={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 1000,
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
