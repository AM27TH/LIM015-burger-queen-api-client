import React from 'react';
import { Grid } from '@mui/material';
import OrderTabs from '../components/OrderTabs';
import Snackbars from '../components/Feedback/Snackbar';
import useSnackbar from '../services/Feedback/useSnackbar';

const Orders = () => {
  const { open, close, message, openSnackbar, setMessage } = useSnackbar();
  return (
    <Grid
      container
      component="main"
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12}>
        <OrderTabs openSnackbar={openSnackbar} setMessage={setMessage}/>
      </Grid>
      <Snackbars open={open} close={close} message={message} />
    </Grid>
  );
};

export default Orders;
