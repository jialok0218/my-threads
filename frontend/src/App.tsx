// App.tsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import HomePage from './pages/HomePage';
import LoginSignUpPage from './pages/LoginSignUpPage';
import VerifyEmail from './components/UserAuth/VerifyEmail';
import ResetPassword from './components/UserAuth/ResetPassword';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import AppContainer from './containers/AppContainer';
// import AppContainer from './containers/AppContainer';

const App = () => {
  const location = useLocation();

  const minimalLayoutRoutes = ['/login', '/email/verify', '/password/reset'];
  const isMinimalLayout = minimalLayoutRoutes.some(route => location.pathname.startsWith(route));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      <NavBar />

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          pt: '64px', // Height of NavBar
        }}
      >
        {/* Conditionally render the SideBar */}
        {!isMinimalLayout && <SideBar />}

        {/* Main content with routes */}
        <Box component="main" sx={{ flexGrow: 1}}>
          <Routes>

            <Route element={<AppContainer />}>
              <Route path="/settings" element={<Settings />} />
              <Route path="/contact" element={<ContactUs />} /> 
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginSignUpPage />} />
            <Route path="/email/verify/:code" element={<VerifyEmail />} />
            <Route path="/password/reset" element={<ResetPassword />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
