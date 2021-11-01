import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';

const DrawerList = ({ routes, url }) => {
  const newUrl = url.slice(-1) === '/' ? url.slice(0, -1) : url;
  let { pathname } = useLocation();
  const path = pathname.replace(newUrl, '');
  const route = routes.map((item, index) => {
    if (path === item.route) {
      return index + 1;
    }
    return 0;
  });
  const initialSelectedIndex = route.filter((item) => item !== 0)[0] ?? 0;
  const [selectedIndex, setSelectedIndex] =
    React.useState(initialSelectedIndex);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      <ListItem sx={{ p: '0' }} selected={selectedIndex === 0}>
        <ListItemButton
          onClick={() => handleListItemClick(0)}
          component={RouterLink}
          to={`${newUrl}`}
        >
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      {routes.map((item, index) => {
        const { text, icon } = item;
        return (
          <ListItem
            sx={{ p: '0' }}
            key={text}
            selected={selectedIndex === index + 1}
          >
            <ListItemButton
              component={RouterLink}
              to={`${newUrl}/${text.toLowerCase()}`}
              onClick={() => handleListItemClick(index + 1)}
            >
              {icon && (
                <ListItemIcon sx={{ minWidth: '40px' }}>{icon}</ListItemIcon>
              )}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default DrawerList;
