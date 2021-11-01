import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Box from '@mui/material/Box';
import MainBar from '../components/Layout/MainBar';
import SideBar from "../components/Layout/SideBar";
import Topic from "../components/Layout/Content";
import useAuth from "../services/auth/useAuth";
import Colaborators from "../pages/Colaborators";
import Products from "../pages/Products";

import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminRouter = () => {
  const routes = [
    {
      route: '/perfil',
      text: 'Perfil',
      icon: <AccountCircleIcon />,
      main: <h2>Perfil</h2>
    },
    {
      route: '/colaboradores',
      text: 'Colaboradores',
      icon: <GroupIcon />,
      main: <Colaborators />
    },
    {
      route: '/productos',
      text: 'Productos',
      icon: <ShoppingCartIcon />,
      main: <Products />
    },
  ];
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  return (
    <Box sx={{ display: 'flex' }}>
      {auth.urlRol() !== "/admin" && <Redirect to={auth.urlRol()}/>}
      <MainBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} routes={routes} />
      <Box component="main" sx={{
          flexGrow: 1,
          p: 2,
          minHeight: '80vh',
          marginTop: '80px',
          overflow: 'auto',
      }}>
        <Switch>
          <Route exact path="/admin">
            <h1>Hola admin</h1>
          </Route>
          <Route path="/admin/:topicId" children={<Topic routes={routes}/>}/>
        </Switch>
      </Box>
    </Box>
  );
};

export default AdminRouter;
