import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  ButtonGroup,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  CardContent,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import getTime from '../helpers/date';

export default function OrderCard({ order, action, updateOrder }) {
  const { _id, client, products, status, dateEntry, dateProcessed } = order;
  const subtotal = products.reduce(
    (sum, item) => item.product?.price ?? 0 + sum,
    0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  const time = getTime(dateProcessed, dateEntry);

  return (
    <Card sx={{ display: 'flex' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            my: 1,
          }}
        >
          <TimerIcon color={time.color} />
          <Typography
            sx={{ ml: '2px', fontSize: '0.875rem', fontWeight: 400 }}
            color={time.color}
          >
            {time.message}
          </Typography>
        </Box>
        <Box sx={{ lineHeight: 1.8, fontSize: '0.875rem', fontWeight: 400 }}>
          <b>Pedido:</b> {_id} <br />
          <b>Cliente:</b> {client}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <b>Estado:</b>
            <Chip
              sx={{ marginLeft: 1 }}
              variant="outlined"
              color={action.statusColor}
              size="small"
              label={status}
            />
          </Box>
          <b>Total a pagar:</b> S/.{total.toFixed(2)}
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((item) => (
              <TableRow key={item.product?._id ?? 0}>
                <TableCell>
                  {item.product?.name ?? 'Producto Borrado'}
                </TableCell>
                <TableCell align="center">{item.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ButtonGroup
          fullWidth
          sx={{
            marginTop: 1,
            '& .MuiButtonGroup-grouped:not(:last-of-type)': {
              borderRight: 0,
            },
          }}
          disableElevation
          variant="contained"
        >
          {action.name !== 'Pedir' && (
            <Button
              sx={{
                opacity: 0.9,
                color: '#fff',
                backgroundColor: '#515862',
                border: '0',
                '&:hover': {
                  backgroundColor: '#696969',
                  opacity: 0.7,
                },
              }}
              onClick={() => updateOrder(_id, 'cancelado')}
            >
              Cancelar
            </Button>
          )}
          {action.name !== '' && (
            <Button
              variant="contained"
              color={action.color}
              onClick={() => updateOrder(_id, action.nextStatus)}
            >
              {action.name}
            </Button>
          )}
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
