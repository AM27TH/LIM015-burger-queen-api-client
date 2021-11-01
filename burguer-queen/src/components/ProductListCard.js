import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from './ProductCard';

export default function BasicList({ type, products, addProduct }) {
  products = products?.filter((product) => product.type === type);
  return (
    <Grid container spacing={{ xs: 2 }} columns={{ sm: 8, md: 12 }}>
      {products?.map((product) => (
        <Grid item xs={12} sm={4} md={6} key={product.id}>
          <Card product={product} addProduct={addProduct} />
        </Grid>
      ))}
    </Grid>
  );
}
