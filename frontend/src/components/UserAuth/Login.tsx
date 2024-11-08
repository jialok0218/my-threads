import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../lib/api';
import { LoginData } from '../../types/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const loginData: LoginData = { email, password };
      await login(loginData);
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error?.message === 'Please verify your email before logging in') {
        setError(error.message);
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    handleLogin();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Welcome Back!
      </Typography>
      {error && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}
      
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
      
      <TextField
        fullWidth
        required
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
          '&.Mui-disabled': {
            backgroundColor: '#9747FF',
            color: '#fff',
          },
          color: '#fff', 
          mb: 2 
        }}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default Login;
