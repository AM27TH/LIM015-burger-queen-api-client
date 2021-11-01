import React from 'react';
import {
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  CssBaseline,
  InputAdornment,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useAuth from '../services/auth/useAuth';
import IconButton from '@mui/material/IconButton';
import { useForm, Controller } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let errorMessage = '';

const Login = () => {
  const { handleSubmit, control } = useForm();
  const auth = useAuth();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (event) => {
    const user = auth.login(event.email, event.password);
    user.then((response) => {
      if (response.err) {
        errorMessage =
          response.message === 'Not found'
            ? 'El usuario no existe.'
            : response.message;
        handleOpen();
      }
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          sm={4}
          md={7}
          sx={{
            display: { xs: 'none', sm: 'block' },
            background: `url(images/background.webp) no-repeat center center`,
            backgroundSize: 'cover',
          }}
          alt="brand"
        />
        <Grid
          textAlign="center"
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              py: 8,
              px: 4,
              m: 'auto',
              height: '100vh',
              maxWidth: '600px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <img
              src="./images/redLogo.svg"
              width="200px"
              height="90px"
              style={{ m: '1rem' }}
              alt="logo"
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="email"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="account">
                          <AccountCircleIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              rules={{
                required: 'Email required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Debes usar un email válido',
                },
              }}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type={values.showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="eye"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              rules={{
                required: 'Contraseña requerida',
                minLength: {
                  value: 8,
                  message: 'Contraseña debe tener al menos 8 caracteres',
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    'Contraseña debe tener al menos 1 caracter alfabético ,1 caracter numérico y un caracter eapecial',
                },
                validate: {
                  equals: (password) =>
                    password !== 'password123#' ||
                    'Escoge una contraseña mas segura',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="signInButton"
              fullWidth
              sx={{ mt: 3, mb: 2, p: 2 }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* mostarmos la data almacenada en el servicio */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {errorMessage}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Por favor ingresar un usuario valido.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
