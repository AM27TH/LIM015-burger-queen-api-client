import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Card from './OrderCard';
import { getData } from '../helpers/get';
import { updateData } from '../helpers/put';

export default function BasicList({ type, openSnackbar, setMessage }) {
  let action;
  switch (type) {
    case 'pendiente':
      action = {
        statusColor: 'warning',
        color: 'warning',
        name: 'Preparar',
        nextStatus: 'preparando',
      };
      break;
    case 'preparando':
      action = {
        statusColor: 'warning',
        color: 'info',
        name: 'Listo',
        nextStatus: 'listo',
      };
      break;
    case 'listo':
      action = {
        statusColor: 'info',
        color: 'success',
        name: 'Entregar',
        nextStatus: 'entregado',
      };
      break;
    case 'entregado':
      action = {
        statusColor: 'success',
        color: 'info',
        name: '',
        nextStatus: '',
      };
      break;
    case 'cancelado':
      action = {
        statusColor: 'error',
        color: 'info',
        name: 'Pedir',
        nextStatus: 'pendiente',
      };
      break;
    default:
      action = {
        statusColor: 'info',
        color: 'info',
        name: '',
        nextStatus: 'cancelado',
      };
      break;
  }
  const [orders, setOrders] = useState();
  useEffect(() => {
    let cancel = false;
    getData(`orders?limit=1000&status=${type}`).then((response) => {
      if (cancel) return;
      setOrders(response);
    });
    return () => {
      cancel = true;
    };
  }, [type]);

  const updateOrder = (id, status) => {
    updateData('orders', id, { status }).then((response) => {
      if (!response.err) {
        setOrders(orders.filter((order) => order._id !== id));
        setMessage({ color: 'success', text: 'Se actualizo pedido' });
        openSnackbar();
      } else {
        setMessage({ color: 'error', text: response.message });
        openSnackbar();
      }
    });
  };
  return (
    <Grid container justifyContent="center" spacing={{ xs: 2 }} columns={{ sm: 8, md: 12 }}>
      {orders?.map((order) => (
        <Grid item xs={12} sm={4} md={4} key={order._id}>
          <Card order={order} action={action} updateOrder={updateOrder} />
        </Grid>
      ))}
      {orders?.length === 0 && (
        <Grid item xs={12}>
          <Typography>No hay pedidos con estado {type}</Typography>
        </Grid>
      )}
    </Grid>
  );
}
