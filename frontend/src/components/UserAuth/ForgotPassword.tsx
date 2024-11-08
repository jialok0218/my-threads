import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { sendPasswordResetEmail } from '../../lib/api';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(email);
      setIsEmailSent(true);  // Set email sent status to true
      setErrorMessage(null); // Clear any previous error message
    } catch (error) {
      console.error('Error sending reset email:', error);
      setErrorMessage('Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    handleForgotPassword();
  };

  // Display confirmation message if email was successfully sent
  if (isEmailSent) {
    return (
      <Box sx={{ textAlign: 'center', px: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Reset Link Sent!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We've sent a password reset link to your email address ({email}).
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please check your inbox and follow the link to reset your password.
          If you don't see the email, please check your spam folder.
        </Typography>
      </Box>
    );
  }

  // Form to input email address for password reset request
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ px: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Forgot Password
      </Typography>

      {errorMessage && (
        <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <TextField
        fullWidth
        required
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          sx: {
            color: '#000',
            '&.Mui-focused': {
              color: '#000',
            },
          },
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            '&:hover fieldset': {
              borderColor: '#6200ea',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6200ea',
            },
          },
        }}
      />

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        disabled={isLoading}
        sx={{ 
          backgroundColor: '#6200ea',
          color: '#fff', 
          mb: 2 
        }}
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </Box>
  );
};

export default ForgotPassword;
