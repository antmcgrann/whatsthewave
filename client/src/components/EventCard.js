import React from "react";
import { useSelector } from 'react-redux';

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

export default EventCard;
