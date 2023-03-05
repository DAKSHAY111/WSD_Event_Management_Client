import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid, Box } from '@mui/material';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    type: '',
    eventlocation: '',
    eventDate: '',
    eventDuration: '',
    imageUrl: '',
    entryFees: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('https://localhost:7035/api/Events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        setEventData({
          eventName: '',
          eventDescription: '',
          type: '',
          eventlocation: '',
          eventDate: '',
          eventDuration: '',
          imageUrl: '',
          entryFees: '',
        });
        alert('Event created successfully!');
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
                label="Event Name"
                fullWidth
                required
                name="eventName"
                value={eventData.eventName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                required
                multiline
                rows={4}
                name="eventDescription"
                value={eventData.eventDescription}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select name="type" value={eventData.type} onChange={handleInputChange}>
                  <MenuItem value="concert">Concert</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="conference">Conference</MenuItem>
                  <MenuItem value="festival">Festival</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                fullWidth
                required
                name="eventlocation"
                value={eventData.eventlocation}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                required
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration"
                type="time"
                fullWidth
                required
                name="eventDuration"
                value={eventData.eventDuration}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URLs (comma separated)"
                fullWidth
                name="imageUrl"
                value={eventData.imageUrl}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Entry Fees"
                type={Number}
                fullWidth
                name="entryFees"
                value={eventData.entryFees.toString()}
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
  );
};

export default AddEvent;
