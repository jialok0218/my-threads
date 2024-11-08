import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Card, CardContent } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../lib/api';

const VerifyEmail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        if (code) {
          await verifyEmail(code);
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Email verification error:', error);
        setStatus('error');
      }
    };

    verifyUserEmail();
  }, [code]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <CircularProgress color="secondary" />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              Verifying your email, please wait...
            </Typography>
          </>
        );
      case 'success':
        return (
          <>
            <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
              Email Verified!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
              Your email has been successfully verified. You can now log in.
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
            <Typography variant="h5" sx={{ color: 'error.main', fontWeight: 'bold' }}>
              Verification Failed
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
              The link is either invalid or expired. Please try again or contact support.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/')}
              sx={{ mt: 4 }}
            >
              Back to Home
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7c4dff', // Use the theme's secondary color
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
          {renderContent()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyEmail;
