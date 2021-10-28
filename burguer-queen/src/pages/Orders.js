import React from "react";
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import OrderCard from "../components/OrderCard";
import OrderTabs from '../components/OrderTabs';

const Orders = () => {
  const order = {
    _id: "5a15s1d",
    client: "Anghel",
    products: [
      {
        qty: 2,
        product: {
          _id: 'asdfsdag',
          name: "hamburguesa",
          price: 5,
        },
      },
      {
        qty: 2,
        product: {
          _id: 'asdfg',
          name: "hamburguesa doble",
          price: 5,
        },
      },
    ],
    status: "pendiente",
    dateEntry: "2021-10-23T20:51:21.376+00:00",
    dateProcessed: "2021-10-19T01:54:30.378+00:00",
  };
  return (
    <Grid
      container
      component="main"
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <OrderTabs/>
    <Box>
      <Typography variant="h4">Orders</Typography>
      <Box>
        <OrderCard order={order} action={{name:'Enviar', color: 'success'}} />
      </Box>
    </Box>
    </Grid>
  );
};

export default Orders;
