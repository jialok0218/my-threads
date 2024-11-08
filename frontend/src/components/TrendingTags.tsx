import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

// Sample trending tags data
const trendingTags = ['React', 'Web3', 'Cybersecurity', 'AI', 'DevOps', 'MachineLearning'];

const TrendingTags = () => {
  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Trending Tags
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {trendingTags.map((tag) => (
          <Chip label={`#${tag}`} key={tag} clickable />
        ))}
      </Box>
    </Box>
  );
};

export default TrendingTags;
