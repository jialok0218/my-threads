import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { resetPassword } from '../../lib/api';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'idle'>(linkIsValid ? 'idle' : 'error');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      setStatus('loading');
      if (code) {
        await resetPassword({ verificationCode: code, password: newPassword });
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage("Invalid reset link.");
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setStatus('error');
      setErrorMessage("Password reset failed. Please try again.");
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <CircularProgress color="secondary" />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              Resetting your password, please wait...
            </Typography>
          </>
        );
      case 'success':
        return (
          <>
            <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
              Your password has been reset. You can now log in with your new password.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/login')}
              sx={{ mt: 4 }}
            >
              Go to Login
            </Button>
          </>
        );
      case 'error':
        return (
          <>
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage || "Invalid or expired link."}
            </Alert>
            <Button component={Link} to="/login" variant="outlined" color="secondary">
              Request a new password reset link
            </Button>
          </>
        );
      default:
        return (
          <>
            <TextField
              fullWidth
              required
              label="New Password"
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (e.target.value.length >= 6) {
                  setPasswordError(null);
                }
              }}
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
              label="Confirm New Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {(passwordError || errorMessage) && (
              <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
                {passwordError || errorMessage}
              </Typography>
            )}
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={handlePasswordReset}
              fullWidth
              sx={{
                backgroundColor: '#6200ea',
                color: '#fff',
                mt: 2,
              }}
            >
              Reset Password
            </Button>
          </>
        );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7c4dff',
        px: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#ffffff',
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            Reset Password
          </Typography>
          {renderContent()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;
