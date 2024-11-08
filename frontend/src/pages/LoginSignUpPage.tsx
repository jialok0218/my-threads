import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Divider } from '@mui/material';
import Login from '../components/UserAuth/Login';
import Register from '../components/UserAuth/Register';
import ForgotPassword from '../components/UserAuth/ForgotPassword';

const LoginSignUpPage: React.FC = () => {
  const [view, setView] = useState<'login' | 'register' | 'forgotPassword'>('login');

  const toggleView = (newView: 'login' | 'register' | 'forgotPassword') => {
    setView(newView); // Simply set the view state without navigation
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#7c4dff', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', maxWidth: '1200px', width: '100%' }}>
        <Box
          sx={{
            flex: '0 1 500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            p: 4,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2 }}>
            MyThreads
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Discuss topics, share your thoughts.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: '0 1 500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#7c4dff',
          }}
        >
          <Card
            sx={{
              width: '500px',
              padding: '40px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
            }}
          >
            <CardContent>
              {view === 'login' && <Login />}
              {view === 'register' && <Register />}
              {view === 'forgotPassword' && <ForgotPassword />}

              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                {view === 'login' && (
                  <>
                    Don't have an account?{' '}
                    <Button onClick={() => toggleView('register')} sx={{ color: '#6200ea', fontWeight: 'bold' }}>
                      Sign Up
                    </Button>
                    <br />
                    <Button onClick={() => toggleView('forgotPassword')} sx={{ color: '#6200ea', fontWeight: 'bold' }}>
                      Forgot Password?
                    </Button>
                  </>
                )}
                {view === 'register' && (
                  <>
                    Already have an account?{' '}
                    <Button onClick={() => toggleView('login')} sx={{ color: '#6200ea', fontWeight: 'bold' }}>
                      Login
                    </Button>
                  </>
                )}
                {view === 'forgotPassword' && (
                  <>
                    Remember your password?{' '}
                    <Button onClick={() => toggleView('login')} sx={{ color: '#6200ea', fontWeight: 'bold' }}>
                      Login
                    </Button>
                  </>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginSignUpPage;
