import * as React from 'react';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { menuItems } from '../../constants/menuItem';
import { Link, Route, Routes } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { Button, ListItem } from '@mui/material';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});




function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    if (open) {
      setOpen(false);
    }
    else {
      setOpen(true);
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ minWidth: 220, p: 2 }}>
            <Box sx={{ height: 60, p: 2, backgroundColor: "white" }}>
              LOGO
            </Box>

            <List>
              {menuItems.map((item, i) => (
                <Link key={i} to={item.slug}>
                  <ListItem disablePadding sx={{ display: 'flex' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 42,
                        pX: 1,
                        borderRadius: 1,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 2,
                          color: 'white',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} sx={{ color: 'white' }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>

          </Box>
          <Box>

          </Box>
          <Box component="main" sx={{ flexGrow: 1, m: 4, bgcolor: '#212423', borderRadius: 3, overflow: 'hidden' }
          }>
            <Routes>
              {
                routes.map((item, i) => (
                  <Route key={i} path={item.path} element={item.element} />
                ))
              }

            </Routes>
          </Box >
        </Box >
      </ThemeProvider>
    </>
  )
};
export default AppLayout;