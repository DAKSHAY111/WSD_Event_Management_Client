import React, { useState,useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid, Box } from '@mui/material';
import { useParams } from "react-router-dom";

const UpdateEvent = () => {
    
  const { eventId } = useParams();

    const [event, setEvent] = useState({
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
        setEvent((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    

      useEffect(() => {
        const fetchEvent = async () => {
          try {
            const response = await fetch(
              `https://localhost:7035/api/Events/${eventId}`
            );
    
            if (response.ok) {
              const data = await response.json();
              setEvent(data);
              console.log(data);
            } else {
              console.log(`Failed to fetch event details for event ${eventId}`);
            }
          } catch (error) {
            console.error(
              `Error fetching event details for event ${eventId}:`,
              error
            );
          }
        };
    
        fetchEvent();
      }, []);

      
  const handleSubmit = async () => {
  console.log(event)
      try {
      const response = await fetch(`https://localhost:7035/api/Events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
  
      if (response.ok) {
        setEvent({
          eventName: '',
          eventDescription: '',
          type: '',
          eventlocation: '',
          eventDate: '',
          eventDuration: '',
          imageUrl: '',
          entryFees: '',
        });
        alert('Event Updated successfully!');
      } 
    } catch (error) {
      console.error('Error while Updating event:', error);
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
              value={event.eventName}
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
              value={event.eventDescription}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select name="type" value={event.type} onChange={handleInputChange}>
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
              value={event.eventlocation}
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
              value={event.date}
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
              value={event.eventDuration}
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
              value={event.imageUrl}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Entry Fees"
              type={Number}
              fullWidth
              name="entryFees"
              value={event.entryFees.toString()}
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

export default UpdateEvent;