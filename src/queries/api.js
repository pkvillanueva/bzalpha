import axios from 'axios';

export default axios.create( {
	responseType: 'json',
	baseURL: `${ process.env.API_URL }/wp-json`,
	headers: {
		'Content-Type': 'application/json',
	},
} );
