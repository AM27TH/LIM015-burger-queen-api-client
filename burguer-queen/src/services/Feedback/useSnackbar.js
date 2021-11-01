import { useState } from 'react';

export default function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ color: 'info', text: 'info' });

  const openSnackbar = () => {
    setOpen(true);
  };

  const close = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return {open, openSnackbar, close, message, setMessage};
}
