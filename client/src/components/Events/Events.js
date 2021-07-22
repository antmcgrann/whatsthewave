import React from 'react';
import { useSelector } from 'react-redux';
import Event from './Event/Event';



const Events = () => {
    const events = useSelector((state) => state.events);
    console.log("Here are events");
    console.log(events);
    return (
        <>
            <h1>EVENTS</h1>
            <Event />
            <Event />
        </>
    )
}

export default Events;