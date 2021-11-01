import React from 'react';
import { Box, Grid, CssBaseline, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  let history = useHistory();

  function goLogin() {
    history.push('/login');
  }
  return (
    <Grid textAlign="center" sx={{ mt: 2 }}>
      <CssBaseline />
      <Typography variant="h6">
        Parece que te perdiste el rumbo, dale click al boton de abajo.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Grid>
          <img
            src="./images/notFound.png"
            className="404"
            alt="notFound404"
            width="400"
            position=" absolute"
          />
        </Grid>
      </Box>
      <Grid textAlign="center">
        <Box
          sx={{
            py: 0,
            px: 4,
            m: 'auto',
            maxWidth: '300px',
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="signInButton"
            fullWidth
            sx={{ mt: 0, mb: 2, p: 2 }}
            onClick={goLogin}
          >
            Volver al inicio
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NotFound;
