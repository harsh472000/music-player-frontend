import React from 'react';
import { Box, Typography } from '@mui/material';
import { PlaylistAdd } from '@mui/icons-material';
import CustomButton from './common/CustomButton';
import { RiAddFill } from 'react-icons/ri';

const EmptyDashboardState = ({ onCreatePlaylist }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        textAlign: 'center',
      }}
    >
      <PlaylistAdd sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No Playlists Yet
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Create your first playlist to get started
      </Typography>

      <CustomButton
        title="Create Playlist"
        Icon={RiAddFill}
        variant="primary"
        state="Filled"
        onClick={onCreatePlaylist}
      />
    </Box>
  );
};

export default EmptyDashboardState;