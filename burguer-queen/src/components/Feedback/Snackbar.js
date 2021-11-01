import * as React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars({ open, close, message }) {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={2000}
      onClose={close}
    >
      <Alert onClose={close} severity={message.color} sx={{ width: '100%' }}>
        {message.text}
      </Alert>
    </Snackbar>
  );
}
