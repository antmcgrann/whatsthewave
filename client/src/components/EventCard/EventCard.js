import React from "react";
import { useSelector } from 'react-redux';
import './eventcard.css';

/*
const EventCard = () =>{
	const events = useSelector((state) => state.events);

	console.log(events);
	return(
		<>
			<div ClassName = "eventdata">
				{event.data.map((data, key) =>{
					return(
						<div key={key}>
							{data.title + ":" + data.tags}
							{data.creator}
							{data.date}
						</div>
					);
				})}
			</div>
		</>
	);
};
*/

function Card(title, tags, desc, time, date, location, contact) {
	return (
		<div classname = 'card-container'>
			<div classname = 'card-title'>
				<h3>{title}</h3>
			</div>
			<div classname = 'card-tags'>
				<h4>{tags}</h4>
			</div>
			<div classname = 'card-content'>
				<div classname = 'card-location'>
					<p><b>Location: </b>{location}</p>
				</div>
				<div classname = 'card-date-time'>
					<p><b>Date and time: </b>{date}{time}</p>
				</div>
				<div classname = 'card-desc'>
					<p><b>Description: </b>{desc}</p>
				</div>
				<div classname = 'card-contact'>
					<p><b>Contact: </b>{contact}</p>
				</div>
			</div>
		</div>
	)
}

export default EventCard;
