import React,{useState} from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid, Box } from '@mui/material';

const Signup = () => {

  const [userData, setuserData] = useState({
    userName: '',
    password: '',
    email: '',
    city: '',
    gender: '',
    role: 'user',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(userData);
    setuserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('https://localhost:7035/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log("User :"+JSON.stringify(response));
        setuserData({
          userName: '',
          password: '',
          email: '',
          city: '',
          gender: '',
          Role: '',
        });
        localStorage.setItem('user', JSON.stringify({'userName': userData.userName, 'role': userData.Role }));
        alert('Account created successfully!');
      } 
    } catch (error) {
      console.error('Error creating event:', error);
      // alert('Failed to create event. Please try again later.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="User Name"
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
              <TextField
                label="email"
                fullWidth
                required
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="city"
                fullWidth
                required
                name="city"
                value={userData.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>gender</InputLabel>
                <Select name="gender" value={userData.gender} onChange={handleInputChange}>
                  <MenuItem value="concert">Male</MenuItem>
                  <MenuItem value="Education">Female</MenuItem>
                  <MenuItem value="Education">Other</MenuItem>
                </Select>
              </FormControl>
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

export default Signup