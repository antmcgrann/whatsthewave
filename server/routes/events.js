// File is overview of requests and responses into express

import express from 'express'

//Import controller functions for router
import { getEvents, createEvent } from '../controllers/events.js'
const router = express.Router()

// http://localhost:5000


// Request to return events created
// Returns a json 
router.get('/getEvents', getEvents);

// Is set up to create model of event to represent on mongodb
// Only needs a valid req of a event object
router.post('/createEvent', createEvent);

export default router;