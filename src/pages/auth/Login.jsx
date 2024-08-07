import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Axios from '../../api';
import { useForm } from 'react-hook-form';
import { Box, Button, Card, FormControl, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

function Login() {

  const { addToken } = useAuth()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, } = useForm()


  const onFinish = (values) => {
    setLoading(true)
    Axios.post('/auth', values).then((res) => {
      if (res.data.token) {
        addToken(res.data.token)
        navigate("/")
      }
    }).catch(
      function (err) {
        if (err.code === "ERR_NETWORK") {
          alert("ERR NETWORK")
        }
        else if (err.response.status === 401) {
          alert('Login')
        }
        else {
          console.log(err, "💥💥💥")
        }
      }
    ).finally(() => setLoading(false))
  }

  return (
    <div className='login-page' >
      <form onSubmit={handleSubmit(onFinish)}>
        <Card sx={{ display: "flex", flexDirection: "column", borderRadius: 2 }}>
          <Typography variant='h6' component="h6" sx={{ borderBottom: '1px solid #2a2d2c', p: 2 }}>
            Login
          </Typography>
          <FormControl sx={{
            display: 'flex', gap: 2, p: 3
          }}>
            <TextField size="small" required type="text" {...register("login")
            } label="Login" />
            <TextField size="small" required type="password" {...register("password")} label="Password" />
            {errors.exampleRequired && <span>This field is required</span>}
            <LoadingButton loading={loading} type="submit" variant="contained">Log In</LoadingButton>
          </FormControl>
        </Card>
      </form>

    </div >

  );
};
export default Login;