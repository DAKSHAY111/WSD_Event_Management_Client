import React from 'react'
import { useState ,useEffect} from 'react';
import EventCard from '../components/EventCard';
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const [isLoading, setisLoading] = useState(true);
  const [events, setEvents] = useState([]);
 
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(
          "https://localhost:7035/api/Events",
          {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
            });
            
        console.log(response);
        const data = await response.json();
        console.log(data);
        setEvents(data);
        setisLoading(false);

      } catch (error) {
        console.log(error);
      }
    }
    getEvents();
  }, []);


  return (
    <>
    {isLoading ? (
      <Grid container align="center" sx={{ marginTop: "20vh" }}>
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      </Grid>
    ) : (
      <Grid container spacing={3} align="center" sx={{ margin: "15vh 15vh" }}>
        {events.map((event, ind) => (
          <EventCard key={event.eventId} title={event.eventName} description={event.eventDescription} image={event.imageUrl} eventId={event.eventId}/>
        ))}
      </Grid>
    )}
  </>
  )
}

export default Home