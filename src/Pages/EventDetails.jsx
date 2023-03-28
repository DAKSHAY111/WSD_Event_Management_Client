import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  CardMedia,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const EventDetails = () => {
  const { eventId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [event, setevent] = useState(null);

  const [user, setUser] = useState({
    eventId: eventId,
    name: "",
    email: "",
    gender: "",
    city: "",
    contactNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(user);
    try {
      const response = await fetch(
        `https://localhost:7035/api/ParticipantEvents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        alert("Participated Successfully");
      } else {
        console.log(`Failed to Participate ... please try again later`);
      }
    } catch (error) {
      console.error(`Failed to Participate ... please try again later`, error);
    }

    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://localhost:7035/api/Events/${eventId}`
        );

        if (response.ok) {
          const data = await response.json();
          setevent(data);
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

  return (
    <>
      {event ? (
        <div
          style={{
            backgroundColor: "#f7f7f7",
            minHeight: "100vh",
            padding: "24px",
          }}
        >
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Enter Your Details</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid Item xs={12}>
                    <TextField
                      label="Participant Name"
                      fullWidth
                      required
                      name="name"
                      sx={{ my: "auto" }}
                      value={user.name}
                      variant="filled"
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid Item xs={12}>
                    <TextField
                      label="Email Address"
                      fullWidth
                      required
                      sx={{ margin: "auto" }}
                      name="email"
                      value={user.email}
                      variant="filled"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid Item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>gender</InputLabel>
                      <Select
                        name="gender"
                        value={user.gender}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid Item xs={12}>
                    <TextField
                      label="City"
                      fullWidth
                      required
                      name="city"
                      variant="filled"
                      sx={{ my: "auto" }}
                      value={user.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid Item xs={12}>
                  <TextField
                      label="Contact Number"
                      fullWidth
                      required
                      name="contactNumber"
                      variant="filled"
                      sx={{ my: "auto" }}
                      value={user.contactNumber}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>
              <Button
                onClick={()=> handleSubmit()}
                form="participation-form"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Typography
            variant="h4"
            style={{ fontWeight: 600, marginBottom: "16px" }}
          >
            {event.eventName}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  alt={event.eventName}
                  height="450"
                  image={event.imageUrl}
                  style={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: 600, marginBottom: "16px" }}
                >
                  Event Details
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "8px" }}>
                  {event.eventDescription}
                </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                  Location: {event.eventlocation}
                </Typography>
                <Typography variant="subtitle2" style={{ marginBottom: "8px" }}>
                  Date: {event.eventDate}
                </Typography>
                <Typography variant="subtitle2" style={{ marginBottom: "8px" }}>
                  Duration: {event.eventDuration}
                </Typography>
                <Typography variant="subtitle2" style={{ marginBottom: "8px" }}>
                  Entry Fee: {event.entryFees}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenDialog(!openDialog)}
                >
                  Participate
                </Button>
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
