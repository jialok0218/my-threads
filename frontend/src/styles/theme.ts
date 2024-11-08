import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', 
    },
    secondary: {
      main: '#4527a0',
    },
    background: {
      default: '#e0e0e0', 
    },
    text: {
      primary: '#212121', 
      secondary: '#000000', 
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#212121',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#212121',
    },
    h6: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#212121',
    },
    body1: {
      fontSize: '1rem',
      color: '#212121',
      fontWeight: 500,
    },
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: '#4527a0', 
  //         color: '#ffffff',           
  //         '&:hover': {
  //           backgroundColor: '#311b92', 
  //         },
  //       },
  //     },
  //   },
  // },
});

export default theme;
