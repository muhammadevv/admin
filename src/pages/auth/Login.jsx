import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Axios from '../../api';
import { useForm } from 'react-hook-form';
import { Box, Button, Card, TextField } from '@mui/material';

function Login() {

  const { addToken } = useAuth()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onFinish = (values) => {
    setLoading(true)
    Axios.post('/auth', values).then((res) => {
      console.log(res);
      if (res.data.token) {
        addToken(res.data.token)
        navigate("/")
      }
    }).catch(err => console.log(err, '💩💩💩')).finally(() => setLoading(false))
  }

  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit(onFinish)}>
        <Card spacing={1} direction="column" sx={{ p: 2 }}>
          <TextField size="small" required type="text" {...register("login")} label="Login" />
          <TextField size="small" required type="password" {...register("password")} label="Password" />
          {errors.exampleRequired && <span>This field is required</span>}
          <Button type="submit" variant="contained">Log In</Button>
        </Card>
      </form>

    </div>

  );
};
export default Login;