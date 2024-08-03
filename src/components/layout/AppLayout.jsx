import * as React from 'react';
import { styled } from '@mui/material/styles';
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


function AppLayout() {


  return (
    <>
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
    </>
  )
};
export default AppLayout;