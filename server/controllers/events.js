// Functions used in routes

//Imports model so logic can be used
import EventData from '../models/eventData.js';

//This is the function referenced in routes
export const getEvents = async (  req, res  ) => {
  try{
    const eventsData = await EventData.find();

    console.log(eventsData);
    // This returns a json list of Events
    res.status(200).json(eventsData);
    }  catch (error)  {
    res.status(404).json({ message: error.message});

}

}

export const createEvent = async (req, res) => {
    let event = JSON(req);
    if(!(EventData.findOne(event.key) === null)){
      res.status(202).json({message: "Event exists in database"});
    }
    const newEvent = new EventData(event);
    try  {
      await newEvent.save();
      res.status(201).json(newEvent);
    }  catch (error) {
      res.status(409).json({ message: error.message });
    }

}
