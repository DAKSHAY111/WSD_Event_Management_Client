import { React, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AdminEventCard = ({ title, description, image, eventId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await fetch(
          `https://localhost:7035/api/Events/${id}`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("Event deleted successfully");
          navigate('/');
        } else {
          console.log(`Failed to delete event with id ${id}`);
        }
      } catch (error) {
        console.error(
          `Error fetching event details for event ${eventId}:`,
          error
        );
      }
      console.log("Event ID: ", id);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const handleDetailsClick = () => {
    navigate(`/eventsParticipant/${eventId}`);
  };

  const descriptionStyle = {
    margin: "8px 0",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this event ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(eventId)} color="success" autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose} color="error">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
      <Card style={{ maxWidth: 345, margin: "5px", minWidth: 300 }}>
        <CardMedia sx={{ height: 200 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={descriptionStyle}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleDetailsClick}>
            <Typography variant="button">View All Participants</Typography>
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

AdminEventCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
};

export default AdminEventCard;
