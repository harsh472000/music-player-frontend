import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import CustomInput from './common/CustomInput';
import CustomButton from './common/CustomButton';

const PlaylistDialog = ({
  open,
  onClose,
  onSubmit,
  currentPlaylist,
  formData,
  onInputChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>
        {currentPlaylist ? 'Edit Playlist' : 'Create New Playlist'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pt: 1,
          }}
        >
          <CustomInput
            name="name"
            label="Playlist Name"
            type="text"
            value={formData.name}
            onChange={onInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            label="Description (Optional)"
            value={formData.description}
            onChange={onInputChange}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <CustomButton
          title="Cancel"
          variant="primary"
          state="Stroke"
          onClick={onClose}
        />

        <CustomButton
          title={currentPlaylist ? 'Save Changes' : 'Create Playlist'}
          variant="primary"
          state="Filled"
          onClick={onSubmit}
          disabled={!formData.name}
        />
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistDialog;