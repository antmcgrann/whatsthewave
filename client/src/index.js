  
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
<script src="https://maps.googleapis.com/maps/api/js?key=process.env.REACT_APP_API_KEY&libraries=places"></script>

ReactDOM.render(<App />, document.getElementById('root'));