// Functions used in routes

//Imports model so logic can be used
import { forEach } from 'async';
import express from 'express';
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
    // We will use the the built in
    let newEvent = new EventData(req.body);
    console.log(newEvent);
    try  {
      await newEvent.save();
      res.status(201).json(newEvent);
    }  catch (error) {
      res.status(409).json({ message: error.message });
    }

}

//Hmm, this might get used
export const getOneEvent = async (req,res) => {


}

//Req should be a key:value list, where key is item needing changing
// Should be used for everything except rsvp,
export const editEvent = async (req,res) => {
  const request = req.body;
  let editList = {};
  for (var key in request) {
    if (request.hasOwnProperty(key)) {
      let value = request[key];
      editList.push({key: value});
    }
  }
  

}

export const getEventUnique = async (req,res) => {
  //Try to see if a similar event exists
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

//Store account id in list
//Req should have event id, and account id
//Needs testing
export const rsvpEvent = async (req,res) => {
  const request = req.body;
  const filter = { _id: request.event_id };
  const update = { rsvp: request.acccount_id }; 
  let doc = await EventData.findOneAndUpdate(filter, update, {
    new: true
  });
  try{
    res.status(203);
  }catch(error){
    res.status(410);
  }
  

}
