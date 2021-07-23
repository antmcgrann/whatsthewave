import mongoose from 'mongoose';
//This file should have schemas that represent the data we want stored

// This schema is for the event data
const eventSchema = mongoose.Schema({
    title: String,
    lat: String,
    long: String,
    desc: String,
    creator: String,
    tags: [String],
    rsvp: [String],
    date: Date
});

// Creates the model on the db, made from schema
const EventData = mongoose.model('EventData', eventSchema);

// Create object
const event1 = new EventData({ title: 'SDD Party', lat: '42.73029109316892', 
long: '-73.67987394332887', desc: 'abc', creator: 'me', tags: ['outdoor','food'], 
    rsvp: ['will', 'andrew', 'audrey', 'anthony', 'justin'], date: '2021-07-20' });
// Must save it to db
event1.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
export default EventData;
// Exports model