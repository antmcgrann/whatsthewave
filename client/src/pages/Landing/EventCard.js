import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const Event = ({ event, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.overlay}>
        <Typography variant="h6">{events.creator}</Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{events.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{events.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{events.desc}</Typography>
      </CardContent>
    </Card>
  );
};

export default Event;
