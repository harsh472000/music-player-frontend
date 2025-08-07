import React from 'react';
import { Button, Box } from '@mui/material';

const PaginationControls = ({ 
  onPrev, 
  onNext, 
  currentOffset, 
  limit, 
  total 
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <Button
        variant="outlined"
        onClick={onPrev}
        disabled={currentOffset === 0}
      >
        Previous
      </Button>
      <Button
        variant="outlined"
        onClick={onNext}
        disabled={currentOffset + limit >= total}
        sx={{ ml: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;