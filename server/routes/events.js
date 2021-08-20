// File is overview of requests and responses into express

import express from 'express'

//Import controller functions for router
import { getEvents, createEvent, getOneEvent, editEvent, getEventUnique, rsvpEvent } from '../controllers/events.js'
const eventRoutes = express.Router()

// http://localhost:5000


// Request to return events created
// Returns a json 
eventRoutes.get('/getEvents', getEvents);

// Is set up to create model of event to represent on mongodb
// Only needs a valid req of a event object
eventRoutes.post('/createEvent', createEvent);

eventRoutes.get('/getOneEvent', getOneEvent);

eventRoutes.post('/editEvent', editEvent);

eventRoutes.get('/getEventUnique', getEventUnique);

eventRoutes.post('/rsvpEvent', rsvpEvent);

export default eventRoutes;