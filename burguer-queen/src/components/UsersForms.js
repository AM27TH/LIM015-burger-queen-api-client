import * as React from 'react';
import {
  Fade,
  Backdrop,
  Box,
  ButtonGroup,
  Button,
  InputAdornment,
  Modal,
  FormControl,
  MenuItem,
  IconButton,
  TextField,
  Typography,
  InputLabel,
  Select,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { postData } from '../helpers/post';
import { deleteDataById } from '../helpers/delete';
import { updateData } from '../helpers/put';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

const AddUserForm = ({
  table,
  setTable,
  handleClose,
  openSnackbar,
  setMessage,
}) => {
  const { handleSubmit, control } = useForm();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    rol: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (event) => {
    const data = {
      email: event.email,
      password: event.password,
      roles: {
        rol: event.rol,
        admin: event.rol === 'admin',
      },
    };
    postData('users', data).then((response) => {
      if (!response.err) {
        const { _id, email, roles } = response;
        const newUser = {
          _id,
          email,
          roles: roles.rol,
        };
        setTable({
          ...table,
          body: [newUser, ...table.body],
        });
        handleClose();
        setMessage({ color: 'success', text: 'Se agrego usuario' });
        openSnackbar();
      } else {
        setMessage({ color: 'error', text: response.message });
        openSnackbar();
      }
    });
  };

  return (
    <Box
      id="modal-description"
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                  <IconButton>
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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
              'Contraseña debe tener al menos 1 caracter alfabético ,1 caracter numérico y un caracter especial',
          },
          validate: {
            equals: (password) =>
              password !== 'password123#' || 'Escoge una contraseña mas segura',
          },
        }}
      />
      <Controller
        name="rol"
        control={control}
        defaultValue="mesero"
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="roles">Rol</InputLabel>
            <Select
              labelId="roles"
              id="rol"
              value={value}
              label="Rol"
              onChange={onChange}
            >
              <MenuItem value="mesero">Mesero</MenuItem>
              <MenuItem value="chef">Chef</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        )}
        rules={{ required: 'Rol requerido' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        id="signInButton"
        fullWidth
        sx={{ mt: 3, mb: 2, p: 2 }}
      >
        Crear usuario
      </Button>
    </Box>
  );
};

const DeleteUserForm = ({
  data,
  pagination,
  table,
  setTable,
  handleClose,
  openSnackbar,
  setMessage,
}) => {
  const [loading, setLoading] = React.useState(false);
  const deleteUser = () => {
    setLoading(true);
    deleteDataById('users', data).then((response) => {
      if (!response.err) {
        if ((table.body.length - 1) % pagination.rowsPerPage === 0) pagination.setPage(pagination.page === 0 ? 0 : pagination.page - 1);
        setTable({
          ...table,
          body: table.body.filter((item) => item.email !== data),
        });
        setMessage({ color: 'success', text: 'Se borró usuario' });
        openSnackbar();
      } else {
        setMessage({ color: 'error', text: response.message });
        openSnackbar();
      }
      setLoading(false);
      handleClose();
    });
  };

  return (
    <Box>
      <Box py="1rem">Correo de usuario: {data}</Box>
      <ButtonGroup
        fullWidth
        sx={{ marginTop: 1 }}
        disableElevation
        variant="contained"
      >
        <Button
          sx={{ opacity: 0.7, backgroundColor: '#696969' }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button variant="contained" disabled={loading} onClick={deleteUser}>
          Borrar usuario
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const UpdateUserForm = ({
  data,
  table,
  setTable,
  handleClose,
  openSnackbar,
  setMessage,
}) => {
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    rol: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const updateUser = (event) => {
    const newData = {};
    if (data.email !== event.email) newData.email = event.email;
    if (event.password !== '') newData.password = event.password;
    if (event.rol !== 'select')
      newData.roles = {
        rol: event.rol,
        admin: event.rol === 'admin',
      };
    setLoading(true);
    updateData('users', data.email, newData).then((response) => {
      if (!response.err) {
        setTable({
          ...table,
          body: table.body.map((item) => {
            if (item._id === data._id) {
              return {
                ...item,
                roles: response.roles.rol,
              };
            } else {
              return item;
            }
          }),
        });
        setMessage({ color: 'success', text: 'Se actualizo usuario' });
        openSnackbar();
      } else {
        setMessage({ color: 'error', text: response.message });
        openSnackbar();
      }
      setLoading(false);
      handleClose();
    });
  };

  return (
    <Box>
      <Box
        id="modal-description"
        component="form"
        noValidate
        onSubmit={handleSubmit(updateUser)}
      >
        <Controller
          name="email"
          control={control}
          defaultValue={data.email}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                    <IconButton>
                      <AccountCircleIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            minLength: {
              value: 8,
              message: 'Contraseña debe tener al menos 8 caracteres',
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                'Contraseña debe tener al menos 1 caracter alfabético ,1 caracter numérico y un caracter especial',
            },
            validate: {
              equals: (password) =>
                password !== 'password123#' ||
                'Escoge una contraseña mas segura',
            },
          }}
        />
        <Controller
          name="rol"
          control={control}
          defaultValue="select"
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="roles">Rol</InputLabel>
              <Select
                labelId="roles"
                id="rol"
                value={value}
                label="Rol"
                onChange={onChange}
              >
                <MenuItem value="select">Seleccionar</MenuItem>
                <MenuItem value="mesero">Mesero</MenuItem>
                <MenuItem value="chef">Chef</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <ButtonGroup
          fullWidth
          sx={{ marginTop: 1 }}
          disableElevation
          variant="contained"
        >
          <Button
            sx={{ opacity: 0.7, backgroundColor: '#696969' }}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button variant="contained" disabled={loading} type="submit">
            Actualizar usuario
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default function BasicModal({
  modal,
  setModal,
  actionForm,
  table,
  setTable,
  openSnackbar,
  setMessage,
}) {
  const handleClose = () => setModal(false);
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modal}>
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {actionForm?.title}
          </Typography>
          {actionForm?.nameForm === 'add' && (
            <AddUserForm
              handleClose={handleClose}
              table={table}
              setTable={setTable}
              openSnackbar={openSnackbar}
              setMessage={setMessage}
            />
          )}
          {actionForm?.nameForm === 'delete' && (
            <DeleteUserForm
              data={actionForm?.data}
              pagination={actionForm?.pagination}
              handleClose={handleClose}
              table={table}
              setTable={setTable}
              openSnackbar={openSnackbar}
              setMessage={setMessage}
            />
          )}
          {actionForm?.nameForm === 'update' && (
            <UpdateUserForm
              data={actionForm?.data}
              handleClose={handleClose}
              table={table}
              setTable={setTable}
              openSnackbar={openSnackbar}
              setMessage={setMessage}
            />
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
