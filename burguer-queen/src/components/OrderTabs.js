import * as React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import OrderListCard from './OrderListCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ openSnackbar, setMessage }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="tabs"
        >
          <Tab label="Pendientes" {...a11yProps(0)} />
          <Tab label="Preparados" {...a11yProps(1)} />
          <Tab label="Listos" {...a11yProps(2)} />
          <Tab label="Entregados" {...a11yProps(3)} />
          <Tab label="Cancelados" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OrderListCard
          type="pendiente"
          openSnackbar={openSnackbar}
          setMessage={setMessage}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderListCard
          type="preparando"
          openSnackbar={openSnackbar}
          setMessage={setMessage}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderListCard
          type="listo"
          openSnackbar={openSnackbar}
          setMessage={setMessage}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OrderListCard
          type="entregado"
          openSnackbar={openSnackbar}
          setMessage={setMessage}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OrderListCard
          type="cancelado"
          openSnackbar={openSnackbar}
          setMessage={setMessage}
        />
      </TabPanel>
    </Box>
  );
}
