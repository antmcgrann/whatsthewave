import React from 'react';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core/';
import { useDispatch } from 'react-redux';


const Event = ({ events, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <div className={classes.overlay}>
        <Typography>{events.creator}</Typography>
      </div>
      <div className={classes.details}>
        <Typography> {events.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography> {events.title}</Typography>
      <CardContent>
        <Typography> {events.desc} </Typography>
      </CardContent>
    </Card>
  );
};

export default Event;
