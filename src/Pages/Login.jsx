import React, { useState } from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [userData, setUserData] = useState({
    userName: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
   

    try {
      const response = await fetch(`https://localhost:7035/api/Users/Login?Email=${userData.userName}&Password=${userData.password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("User :"+JSON.stringify(data));
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/')
        alert('Login successfully!');
      } 
    } catch (error) {
      alert('Failed to login...check Your Email and Password');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              required
              name="userName"
              value={userData.userName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="password"
              fullWidth
              required
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  </Box>
  )
}

export default Login