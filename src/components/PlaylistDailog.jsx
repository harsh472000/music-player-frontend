import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
} from '@mui/material';
import CustomButton from './common/CustomButton';

const PlaylistDialog = ({
  open,
  onClose,
  selectedSong,
  playlists,
  onAddToPlaylist,
  onCreatePlaylist,
}) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

  const handleCreate = () => {
    onCreatePlaylist(newPlaylistName, newPlaylistDescription);
    setNewPlaylistName('');
    setNewPlaylistDescription('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>Add to Playlist</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={selectedSong?.album.images[0]?.url}
            variant="square"
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              {selectedSong?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedSong?.artists.map((a) => a.name).join(', ')}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          Select a playlist:
        </Typography>

        <List dense sx={{ maxHeight: '300px', overflow: 'auto', mb: 2 }}>
          {playlists.map((playlist) => (
            <ListItemButton
              key={playlist._id}
              onClick={() => onAddToPlaylist(playlist._id)}
              sx={{
                borderRadius: 1,
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <ListItemText
                primary={playlist.name}
                secondary={`${playlist.songs?.length || 0} songs`}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Or create a new playlist:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            size="small"
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="New playlist Description"
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
            size="small"
          />
          <CustomButton
            title="Create"
            variant="primary"
            state="Filled"
            onClick={handleCreate}
            disabled={!newPlaylistName.trim()}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <CustomButton
          title="Cancel"
          variant="primary"
          state="Stroke"
          onClick={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistDialog;