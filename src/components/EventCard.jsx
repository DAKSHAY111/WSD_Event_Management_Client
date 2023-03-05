import * as React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function EventCard({ title, description,image,eventId }) {
  const history = useNavigate();
  const handleDetailsClick = () => {
    history.push(`/events/${eventId}`);
  };

  const descriptionStyle = {
    margin: '8px 0',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden', 
    textOverflow: 'ellipsis',
  };

  return (
    <Card style={{ maxWidth: 345, margin: '5px', minWidth: 300 }}>
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
          <Typography variant="button">View Details</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  // image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
};

export default EventCard;
