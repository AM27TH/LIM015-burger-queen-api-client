import * as React from 'react';
import {
  Fade,
  Backdrop,
  Box,
  ButtonGroup,
  Button,
  Modal,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  Select,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { postData } from '../helpers/post';
import { deleteDataById } from '../helpers/delete';
import { updateData } from '../helpers/put';

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

const AddProductsForm = ({
  table,
  setTable,
  handleClose,
  openSnackbar,
  setMessage,
}) => {
  const { handleSubmit, control } = useForm();
  const [values] = React.useState({
    image: '',
    name: '',
    type: '',
    price: '',
  });

  const onSubmit = (products) => {
    const data = {
      //image: products.image,
      name: products.name,
      type: products.type,
      price: products.price,
    };
    postData('products', data).then((response) => {
      if (!response.err) {
        const { _id, name, type, price } = response;
        const newProducts = {
          _id,
          name,
          type,
          price,
        };
        setTable({
          ...table,
          body: [newProducts, ...table.body],
        });
        handleClose();
        setMessage({ color: 'success', text: 'Se agrego producto' });
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
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="name"
            margin="normal"
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
          />
        )}
        rules={{
          required: 'Products required',
          pattern: {
            value: /^[A-Z]+$/i,
            message: 'Debes ingresar un producto válido',
          },
        }}
      />
      <Controller
        name="price"
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
            name="price"
            label="price"
            type={values ? 'text' : 'price'}
            id="price"
            autoComplete="current-price"
          />
        )}
        rules={{
          required: 'Precio requerida',
          pattern: {
            value: /^[0-9.]+$/,
            message: 'Debes ingresar solo numeros',
          },
        }}
      />
      <Controller
        name="type"
        control={control}
        defaultValue="Desayuno"
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="type">Categoria</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={value}
              label="Categoria"
              onChange={onChange}
            >
              <MenuItem value="Desayuno">Desayuno</MenuItem>
              <MenuItem value="Almuerzo y cena">Almuerzo y cena</MenuItem>
            </Select>
          </FormControl>
        )}
        rules={{ required: 'Categoria Requerida' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        id="signInButton"
        fullWidth
        sx={{ mt: 3, mb: 2, p: 2 }}
      >
        Crear producto
      </Button>
    </Box>
  );
};

const DeleteProductsForm = ({
  data,
  pagination,
  table,
  setTable,
  handleClose,
  openSnackbar,
  setMessage,
}) => {
  const [loading, setLoading] = React.useState(false);
  const deleteProduct = () => {
    setLoading(true);
    deleteDataById('products', data).then((response) => {
      if (!response.err) {
        if ((table.body.length - 1) % pagination.rowsPerPage === 0) pagination.setPage(pagination.page === 0 ? 0 : pagination.page - 1);
        setTable({
          ...table,
          body: table.body.filter((item) => item._id !== data),
        });
        setMessage({ color: 'success', text: 'Se borró producto' });
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
      <Box py="1rem">Producto: {data}</Box>
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
        <Button variant="contained" disabled={loading} onClick={deleteProduct}>
          Borrar producto
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const UpdateProductsForm = ({
  data,
  table,
  setTable,
  handleClose,
  openSnackbar,
  setMessage,
}) => {
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = React.useState(false);

  const updateProdutds = (event) => {
    const newData = {};
    if (data.name !== event.producto) newData.name = event.producto;
    if (data.price !== event.precio && event.precio !== '')
      newData.price = event.precio;
    if (event.type !== '') newData.type = event.type;
    setLoading(true);
    updateData('products', data._id, newData).then((response) => {
      if (!response.err) {
        setTable({
          ...table,
          body: table.body.map((item) => {
            if (item._id === data._id) {
              return {
                ...response,
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
        onSubmit={handleSubmit(updateProdutds)}
      >
        <Controller
          name="producto"
          control={control}
          defaultValue={data.name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="producto"
              margin="normal"
              fullWidth
              id="producto"
              label="producto"
              name="producto"
              autoComplete="producto"
              autoFocus
            />
          )}
          rules={{
            required: 'Products required',
            pattern: {
              value: /^[A-Z]+$/i,
              message: 'Debes ingresar un producto válido',
            },
          }}
        />
        <Controller
          name="precio"
          control={control}
          defaultValue={data.price}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              margin="normal"
              fullWidth
              name="precio"
              label="Precio"
              type="text"
              id="precio"
            />
          )}
          rules={{
            required: 'Precio requerida',
            pattern: {
              value: /^[0-9.]+$/,
              message: 'Debes ingresar solo numeros',
            },
          }}
        />
        <Controller
          name="type"
          control={control}
          defaultValue="Desayuno"
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="type">Categoria</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={value}
                label="Categoria"
                onChange={onChange}
              >
                <MenuItem value="Desayuno">Desayuno</MenuItem>
                <MenuItem value="Almuerzo y cena">Almuerzo y cena</MenuItem>
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
            Actualizar producto
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
            <AddProductsForm
              handleClose={handleClose}
              table={table}
              setTable={setTable}
              openSnackbar={openSnackbar}
              setMessage={setMessage}
            />
          )}
          {actionForm?.nameForm === 'delete' && (
            <DeleteProductsForm
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
            <UpdateProductsForm
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
