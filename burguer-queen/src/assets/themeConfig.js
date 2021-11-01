import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F8A000',
      contrastText: '#000000',
    },
    secondary: {
      main: '#891E3C',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: '100%',
          color: '#696969',
          backgroundColor: '#F2F2F2',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0.7rem',
          '&:last-child': {
            paddingBottom: '0.7rem',
          }
        }
      },
    },
  },
});

export default theme;