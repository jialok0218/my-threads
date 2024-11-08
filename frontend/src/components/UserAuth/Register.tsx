import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { register } from '../../lib/api';
import { RegisterData } from '../../types/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setIsLoading(true);
      const registerData: RegisterData = { email, password, confirmPassword };
      await register(registerData);
      setIsRegistered(true);
      setError(null);
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.message || error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    handleRegister();
  };

  if (isRegistered) {
    return (
      <Box sx={{ textAlign: 'center', px: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Registration Successful!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Thank you for registering. We've sent a verification link to your email address ({email}).
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please check your inbox and click the verification link to activate your account.
          If you don't see the email, please check your spam folder.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ px: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Create Your Account
      </Typography>
      {error && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}
      
      <TextField
        required
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!email && error !== null}
        helperText={!email && error !== null ? "Email is required" : ""}
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
      
      <TextField
        required
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!password && error !== null}
        helperText={!password && error !== null ? "Password is required" : ""}
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
      
      <TextField
        required
        fullWidth
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!confirmPassword && error !== null}
        helperText={!confirmPassword && error !== null ? "Confirm Password is required" : ""}
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
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default Register;
