import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({counter}) {
  return (
    <Stack sx={{ pt:2 }} spacing={2}>
      <Pagination count={counter} color="primary" />
    </Stack>
  );
}