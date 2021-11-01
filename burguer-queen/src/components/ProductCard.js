import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function ProductCard({ product, addProduct }) {
  const { id, name, price, image } = product;
  return (
    <Card
      sx={{ display: 'flex', cursor: 'pointer' }}
      onClick={() => addProduct(id)}
    >
      <CardMedia
        component="img"
        sx={{ width: '58px' }}
        image={image || '../images/sinImagen.webp'}
        alt={name}
      />
      <Box sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="div"
            variant="body2"
            sx={{ fontWeight: '300' }}
          >
            {name}
            <br />
            S/.{price}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
