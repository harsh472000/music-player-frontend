import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import CustomButton from "./CustomButton";

const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        
        <CustomButton
          title={"Cancel"}
          variant="primary"
          state="Stroke"
          onClick={onClose}
        />
        <CustomButton onClick={onConfirm} title="Delete" variant="error" state="Filled" />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
