import { Login } from './pages'
import { AppLayout } from './components'
import useIsAuth from './context/useIsAuth'
import { ThemeProvider, createTheme } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const isAuth = useIsAuth()

  return (

    <>
      <ThemeProvider theme={darkTheme}>
        {
          isAuth ? <AppLayout /> : <Login />
        }
      </ThemeProvider>
    </>

  )
}

export default App