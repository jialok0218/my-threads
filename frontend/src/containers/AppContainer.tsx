import { Box, CircularProgress, Container } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AppContainer: React.FC = () => {
  const { user, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          flexDirection: 'column',
        }}
      >
        <CircularProgress sx={{ marginBottom: 2 }} />
      </Container>
    );
  }

  if (isError) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectUrl: window.location.pathname,
        }}
      />
    );
  }

  if (user) {
    return (
      <Box sx={{ padding: 4, minHeight: '100vh' }}>
        <Outlet />
      </Box>
    );
  }

  return (
    <Navigate
      to="/login"
      replace
      state={{
        redirectUrl: window.location.pathname,
      }}
    />
  );
};

export default AppContainer;