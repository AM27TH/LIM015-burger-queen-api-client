import React, { useReducer, useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  ButtonGroup,
  Button,
} from '@mui/material';
import SpanningTable from '../components/SpanningTable';
import Snackbars from '../components/Feedback/Snackbar';
import Tabs from '../components/Tabs';
import useAuth from '../services/auth/useAuth';
import {
  shoppingInitialState,
  shoppingReducer,
} from '../services/orders/useAddOrder';
import { TYPES } from '../services/orders/actions';
import { getData } from '../helpers/get';
import { postData } from '../helpers/post';
import useSnackbar from '../services/Feedback/useSnackbar';

export default function AddOrder() {
  const auth = useAuth();
  const { open, close, message, openSnackbar, setMessage } = useSnackbar();
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, cart, client } = state;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancel = false;
    getData('products?limit=1000').then((response) => {
      if (cancel) return;
      if (!response.err) {
        dispatch({ type: TYPES.READ_PRODUCTS, payload: response });
      } else {
        dispatch({ type: TYPES.NO_DATA });
      }
    });
    return () => {
      cancel = true;
    };
  }, []);

  const addToCart = (id) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const delFromCart = (id, all = false) => {
    dispatch({
      type: all ? TYPES.REMOVE_ALL_FROM_CART : TYPES.REMOVE_ONE_FROM_CART,
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  const addOrder = () => {
    setLoading(true);
    const data = { client };
    if (cart !== undefined && cart.length !== 0) {
      data.userId = auth.user._id;
      data.products = cart.map((product) => ({
        qty: product.quantity,
        productId: product.id,
      }));
      postData('orders', data).then((response) => {
        if (!response.err) {
          setMessage({ color: 'success', text: 'Se envio pedido a cocina' });
          openSnackbar();
          clearCart();
        } else {
          setMessage({ color: 'error', text: response.message });
          openSnackbar();
        }
        setLoading(false);
      });
    }
  };

  return (
    <Grid
      container
      component="main"
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12} sm={6}>
        <Tabs products={products} addProduct={addToCart} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Pedido
        </Typography>
        <TextField
          fullWidth
          variant="standard"
          id="outlined-client"
          label="Cliente"
          value={client}
          onChange={(event) => dispatch({ type: TYPES.SET_CLIENT, client: event.target.value})}
          sx={{ marginBottom: 2 }}
        />
        <SpanningTable products={cart} deleteProduct={delFromCart} />
        <ButtonGroup
          fullWidth
          sx={{ marginTop: 1 }}
          disableElevation
          variant="contained"
        >
          <Button
            sx={{
              opacity: 0.9,
              color: '#fff',
              backgroundColor: '#515862',
              '&:hover': {
                backgroundColor: '#696969',
                opacity: 0.7,
              },
            }}
            onClick={clearCart}
          >
            Cancelar
          </Button>
          <Button variant="contained" disabled={loading} onClick={addOrder}>
            Pedir orden
          </Button>
        </ButtonGroup>
      </Grid>
      <Snackbars open={open} close={close} message={message} />
    </Grid>
  );
}
