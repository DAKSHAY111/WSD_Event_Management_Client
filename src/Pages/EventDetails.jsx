import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { Typography,Grid,CardMedia,Card,CardContent } from '@mui/material';


const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setevent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`https://localhost:7035/api/Events/${eventId}`);

        if (response.ok) {
          const data = await response.json();
          setevent(data);
          console.log(data)
        } else {
          console.log(`Failed to fetch event details for event ${eventId}`);
        }
      } catch (error) {
        console.error(`Error fetching event details for event ${eventId}:`, error);
      }
    };

    fetchEvent();
  }, []);

  return (
    <>
      {event ? (
        <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', padding: '24px' }}>
        <Typography variant="h4" style={{ fontWeight: 600, marginBottom: '16px' }}>{event.eventName}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                alt={event.eventName}
                height="450"
                image={event.imageUrl}
                title={event.eventName}
                style={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h2" style={{ fontWeight: 600, marginBottom: '16px' }}>Event Details</Typography>
            <Typography variant="body1" style={{ marginBottom: '8px' }}>{event.eventDescription}</Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>Location: {event.eventlocation}</Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '8px' }}>Date: {event.eventDate}</Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '8px' }}>Duration: {event.eventDuration}</Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '8px' }}>Entry Fee: {event.entryFees}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </>
  );
};

export default EventDetails;
