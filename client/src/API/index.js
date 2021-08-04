import axios from 'axios';

const url = 'http://localhost:5000/events';

export const fetchevents = () => axios.get(url);