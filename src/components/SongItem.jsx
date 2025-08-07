import React from 'react';
import { Avatar, IconButton, ListItem, ListItemText, Typography, Box } from '@mui/material';
import AddCircleIcon from "@mui/icons-material/AddCircle";

const SongItem = ({ track, onAddToPlaylist }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="add"
          onClick={() => onAddToPlaylist(track)}
          color="primary"
          size="large"
        >
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      }
      sx={{
        '&:hover': { backgroundColor: 'action.hover' },
        transition: 'background-color 0.2s',
      }}
    >
      <Avatar
        variant="square"
        src={track.album.images[0]?.url}
        alt={track.album.name}
        sx={{ width: 56, height: 56, mr: 2 }}
      />
      <ListItemText
        primary={
          <Typography variant="subtitle1" fontWeight={500}>
            {track.name}
          </Typography>
        }
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {track.artists.map((a) => a.name).join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {track.album.name}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
};

export default SongItem;