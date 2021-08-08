// Functions used in routes

//Imports model so logic can be used
import expres from 'express';
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
    //Get req parsed in
    //Everything sent through must match mongoose model
    /*
    if(!(EventData.findOne(event['key']) === null)){
      res.status(202).json({message: "Event exists in database"});
    }
    */
    console.log(req.body);
    const newEvent = new EventData(req.body);
    console.log(newEvent);
    try  {
      await newEvent.save();
      res.status(201).json(newEvent);
    }  catch (error) {
      res.status(409).json({ message: error.message });
    }

}

export const getOneEvent = async (req,res) => {


}

export const editEvent = async (req,res) => {
  
}

export const getEventUnique = async (req,res) => {
  let event = req.body,
  tempBool = true,
  errorMsg = [];
  if(await EventData.findOne({title: event.title}).exec()){
    errorMsg.push['title'];
    if(await EventData.findOne({desc: event.descField}).exec()){
      tempBool = false;
      errorMsg.push['desc'];
    }
    //Can add more fields to look for
  }

  
  try{
    res.status(202).json({unique: tempBool, errorBody: errorMsg });
  } catch(error){
    res.status(410).json({ message: error.message });
  }

}
