import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <FormControlLabel
        control={<Switch name="notifications" />}
        label="Enable Notifications"
      />
      <FormControlLabel
        control={<Switch name="darkMode" />}
        label="Dark Mode"
      />
      {/* Add more settings options as needed */}
    </Box>
  );
};

export default Settings; 