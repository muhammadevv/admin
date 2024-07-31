import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Axios from '../../api';
import { useForm } from 'react-hook-form';
import { Box, Button, Card, TextField, Typography } from '@mui/material';

function Login() {

  const { addToken } = useAuth()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()


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
    <div className='login-page'>
      <form onSubmit={handleSubmit(onFinish)}>
        <Card sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
          <Typography variant='h6' component="h8">
            Login
          </Typography>
          <TextField size="small" required type="text" {...register("login")} label="Login" />
          <TextField size="small" required type="password" {...register("password")} label="Password" />
          {errors.exampleRequired && <span>This field is required</span>}
          <Button type="submit" loading={loading} variant="contained">Log In</Button>
        </Card>
      </form>

    </div>

  );
};
export default Login;