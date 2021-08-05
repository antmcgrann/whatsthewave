import mongoose from 'mongoose';
import internal from 'stream';
//This file should have schemas that represent the data we want stored

// This schema is for the event data
const eventSchema = mongoose.Schema({
    key: Number,
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
const event1 = new EventData({key: 11111 , title: 'SDD Party', lat: '42.73029109316892', 
long: '-73.67987394332887', desc: 'abc', creator: 'me', tags: ['outdoor','food'], 
    rsvp: ['will', 'andrew', 'audrey', 'anthony', 'justin'], date: '2021-07-20' });
const event2 = new EventData({key: 22222 , title: 'Albany', lat: '42.6526', 
    long: '-73.7562', desc: 'abc', creator: 'me', tags: ['outdoor','food'], 
        rsvp: ['will', 'andrew', 'audrey', 'anthony', 'justin'], date: '2021-07-20' });
// Must save it to db
event2.save();
event1.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
export default EventData;
// Exports model