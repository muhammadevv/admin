import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { menuItems } from '../../constants/menuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link, Route, Routes } from 'react-router-dom';
import { routes } from '../../utils/routes';

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
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" open={open} >
          <DrawerHeader>
            {/* {open && <h2 sx={{ width: "100%" }} >NIGGA</h2>} */}
            <IconButton onClick={handleDrawer}>
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((item, i) => (
              <Link key={i} to={item.slug}>
                <ListItem disablePadding sx={{ display: 'flex', paddingX: 1 }}>
                  <ListItemButton
                    LinkComponent={item.slug}
                    aria-label="add to shopping cart"
                    sx={{
                      minHeight: 42,
                      justifyContent: open ? 'initial' : 'center',
                      p: 0,
                      borderRadius: 1
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                        pl: 1.4
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Drawer >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            {
              routes.map((item, i) => (
                <Route key={i} path={item.path} element={item.element} />
              ))
            }
            
          </Routes>
        </Box>
      </Box >
    </>
  )
};
export default AppLayout;