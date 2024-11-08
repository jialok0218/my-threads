import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ContactUs: React.FC = () => {
  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you have any questions or feedback, feel free to reach out to us using the form below.
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Your Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Your Email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Send Message
        </Button>
      </form>
    </Box>
  );
};

export default ContactUs; 