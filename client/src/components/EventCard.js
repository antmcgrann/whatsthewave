import React from "react";
import eventdata from 'whatsthewave/server/events.json';

const EventCard = () =>{
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
