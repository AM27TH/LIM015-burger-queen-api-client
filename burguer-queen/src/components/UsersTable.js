import * as React from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

export default function UsersTable({ table, deleteUser, updateUser }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - table?.body?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const defaultLabelDisplayedRows = () => {
    const count = table?.body.length ?? 1;
    const from = page === 0 ? 1 : page * rowsPerPage;
    const to =
      page === 0
        ? rowsPerPage
        : page * rowsPerPage + rowsPerPage > count
        ? count
        : page * rowsPerPage + rowsPerPage;
    return `${from}-${to} de ${count !== -1 ? count : `más de ${count}`}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="table" size="small">
        <TableHead>
          <TableRow>
            {table?.header?.map((header, index) => (
              <TableCell align="center" key={index}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {table?.body
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user._id}</TableCell>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell>{user.roles}</TableCell>
                <TableCell size="small" align="center">
                  <IconButton aria-label="update user" onClick={() => updateUser(user)}>
                    <CreateIcon color="secondary" />
                  </IconButton>
                </TableCell>
                <TableCell size="small" align="center">
                  <IconButton aria-label="delete product" onClick={() => deleteUser(user.email, page, setPage, rowsPerPage)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={table?.body.length ?? 1}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Filas por página"
              labelDisplayedRows={defaultLabelDisplayedRows}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
