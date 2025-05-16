// components/loginPromptModal/LoginPromptModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const LoginPromtModal = ({ open, onClose, onLogin }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Authentication Required</DialogTitle>
      <DialogContent>
        <Typography align="center">You should login first to make a reservation.</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button variant="contained" color="primary" onClick={onLogin}>
          Login
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPromtModal;
