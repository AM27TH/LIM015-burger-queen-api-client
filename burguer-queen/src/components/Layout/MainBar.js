import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
//import logo from '../../assets/images/Logo.svg';
import useAuth from "../../services/auth/useAuth";

const drawerWidth = 180;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ToolBar = styled(Toolbar, {})(() => ({
    justifyContent: 'space-between',
    height: '80px',
  }));

const MainBar = ({open, handleDrawerOpen}) => {
  const auth = useAuth();
  const LogOut = () => {
    auth.logout();
  };

  return (
    <AppBar position="fixed" open={open} color="secondary">
      <ToolBar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <img height="60px" width="130px" src="../images/Logo.svg" className="logo" alt="Burguer Queen" />
        <IconButton
          color="inherit"
          aria-label="logout"
          onClick={LogOut}
        >
          <LogoutIcon />
        </IconButton>
      </ToolBar>
    </AppBar>
  );
};

export default MainBar;