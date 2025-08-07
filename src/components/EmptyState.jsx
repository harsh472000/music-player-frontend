import React from 'react';
import { Box, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const EmptyState = ({ hasSearched, searchQuery }) => {
  if (!hasSearched) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          textAlign: 'center',
          p: 4,
        }}
      >
        <MusicNoteIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Discover New Music
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '500px', mb: 3 }}
        >
          Search for your favorite songs, artists, or albums to get started.
          Click the search button to explore the world of music.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No results found for "{searchQuery}"
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Try a different search term or check your spelling.
      </Typography>
    </Box>
  );
};

export default EmptyState;