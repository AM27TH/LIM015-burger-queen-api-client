import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const TAX_RATE = 0.18;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items
    .map(({ totalPrice }) => totalPrice)
    .reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable({ products, deleteProduct }) {
  const invoiceSubtotal = subtotal(products);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Detalle
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Precio
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Cant.</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">{ccyFormat(product.price)}</TableCell>
              <TableCell align="right">
                {ccyFormat(product.totalPrice)}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => deleteProduct(product.id)}>
                  <DeleteIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => deleteProduct(product.id, true)}>
                  <ClearAllIcon color="secondary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IGV</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
