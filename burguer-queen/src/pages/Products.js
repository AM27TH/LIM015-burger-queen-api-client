import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import Table from '../components/ProductsTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProdutctsForms from '../components/ProductsForms';
import Modal from '../components/Feedback/Modal';
import Snackbars from '../components/Feedback/Snackbar';
import { getData } from '../helpers/get';
import useSnackbar from '../services/Feedback/useSnackbar';

const Products = () => {
  const { open, close, message, openSnackbar, setMessage } = useSnackbar();
  const [table, setTable] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [actionForm, setActionForm] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    getData('products?limit=1000').then((response) => {
      if (cancel) return;
      if (!response.err) {
        setTable({
          header: [
            'Id',
            'Imagen',
            'Producto',
            'Categoria',
            'Precio',
            'Editar',
            'Borrar',
          ],
          body: response.map((products) => ({
            ...products,
            type: products.type,
          })),
        });
        setError(null);
      } else {
        setError({
          title: 'Error',
          message: response.message,
        });
        setModalError(true);
      }
    });
    return () => {
      cancel = true;
    };
  }, []);

  const addProducts = () => {
    setActionForm({
      title: 'Agregar Producto',
      nameForm: 'add',
    });
    setModal(true);
  };

  const deleteProduct = (products, page, setPage, rowsPerPage) => {
    setActionForm({
      title: '¿Seguro que desea borrar producto?',
      nameForm: 'delete',
      data: products,
      pagination: { page, setPage, rowsPerPage },
    });
    setModal(true);
  };

  const updateProduct = (products) => {
    setActionForm({
      title: 'Actualizar producto',
      nameForm: 'update',
      data: products,
    });
    setModal(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Productos</h1>
        <IconButton aria-label="add product" onClick={addProducts}>
          <AddCircleIcon color="success" />
        </IconButton>
      </Box>
      <Table
        table={table}
        deleteProduct={deleteProduct}
        updateProduct={updateProduct}
      />
      <ProdutctsForms
        modal={modal}
        setModal={setModal}
        actionForm={actionForm}
        table={table}
        setTable={setTable}
        openSnackbar={openSnackbar}
        setMessage={setMessage}
      />
      <Modal
        modal={modalError}
        setModal={setModalError}
        title={error?.title}
        message={error?.message}
      />
      <Snackbars open={open} close={close} message={message} />
    </Box>
  );
};

export default Products;
