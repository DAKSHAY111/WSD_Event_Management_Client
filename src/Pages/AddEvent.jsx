import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
  Box,
  Alert,
  Typography,
  Backdrop,
} from "@mui/material";

const AddEvent = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(false);
  const [isError, setIsError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const [eventData, setEventData] = useState({
    eventName: "",
    eventDescription: "",
    type: "",
    eventlocation: "",
    eventDate: "",
    eventDuration: "",
    imageUrl: "",
    entryFees: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0].size > 2097152) {
      Alert("Maximum size exceeded!! Max Limit - 2MB");
    } else {
      setFile(e.target.files[0]);
      console.log(file);
    }
  };

  const addEvent = async () => {
    const response = await fetch("https://localhost:7035/api/Events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    console.log(data);
    setResponse(true);
    setIsError(false);
    setAlertMessage("Event Added Successfully");
    setEventData({
      eventName: "",
      eventDescription: "",
      type: "",
      eventlocation: "",
      eventDate: "",
      eventDuration: "",
      imageUrl: "",
      entryFees: "",
    });

    setFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "eventManagementApp");
    formData.append("cloud_name", "dr08zgkg2");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dr08zgkg2/image/upload",
        {
          method: "post",
          body: formData,
        }
      );
      let urlData = await response.json();
      
      console.log(urlData);
      setEventData((prevState) => ({
        ...prevState,
        imageUrl: urlData.url,
      }));
      addEvent();
    } catch (err) {
      setResponse(true);
      setIsError(true);
      setAlertMessage("Something went wrong");
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Backdrop
        className="backdrop-dialog"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={response}
        onClick={() => {
          setResponse(false);
          setAlertMessage("");
        }}
      >
        <Alert
          className="response-dialog"
          style={{
            display: response ? "flex" : "none",
            color: isError ? "red" : "green",
          }}
          severity={isError ? "error" : "success"}
        >
          {alertMessage}
        </Alert>
      </Backdrop>
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
                <Select
                  name="type"
                  value={eventData.type}
                  onChange={handleInputChange}
                >
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
              <Button variant="outlined" component="label">
                Upload An Image
                <input type="file" onChange={handleImage} hidden />
              </Button>
            </Grid>

            {file && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  {file.name}
                </Typography>
              </Grid>
            )}
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
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
