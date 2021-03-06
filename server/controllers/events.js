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
    const newEvent = new EventData(req.body);
    try  {
      await newEvent.save();
      res.status(201).json(newEvent);
    }  catch (error) {
      res.status(409).json({ message: error.message });
    }

}

export const getOneEvent = async (req,res) => {
  let event = await EventData.findById(req.body.id);
  try {
    res.status(211).json(event);
  }catch(error){
    res.status(411).json({ message: error.message});
  }

}

export const editEvent = async (req,res) => {
  
}

//WIP
//Not using this
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

//WIP
//Store account id in list
//Req should have event id, and account id
//Needs testing, but should work
export const rsvpEvent = async (req,res) => {
  const filter = { _id: req.body.eventID };
  const update = { $push : {rsvp: req.body.accountID }}; 
  console.log(req.body.acccountID);
  let doc = await EventData.findOneAndUpdate(filter, update, {
    new: true
  });
  try{
    res.status(203).json(doc);
  }catch(error){
    res.status(410).json({error: error.message});
  }
  

}
