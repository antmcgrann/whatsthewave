import * as API from '../API';


//Action creators
export const getEvents = () => async (dispatch) => {

	try{
		const {data} = await API.fetchEvents();
		dispatch( {type: 'FETCH_ALL', payload: data});

	}
	catch(error){
		console.log(error.message);

	}
}
