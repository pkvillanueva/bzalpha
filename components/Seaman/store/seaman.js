/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
const { token } = parseCookies();
import { Form, message } from 'antd';

/**
 * Internal dependecies.
 */
import { prepareValues } from '../../../utils/api';

export const SeamanContext = createContext();

export const SeamanProvider = Form.create()( ( { children, data, form } ) => {
	const [ seaman, setSeaman ] = useState( data );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isSeamanTouched, setIsSeamanTouched ] = useState( false );
	const signal = axios.CancelToken.source();

	const updateSeaman = ( { values, success, error, done } ) => {
		const { id } = seaman;
		values = prepareValues( values );

		axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman/${ id }`, values, {
			cancelToken: signal.token,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ token }`,
			},
		} ).then( ( res ) => {
			success && success( res );

			setSeaman( res.data );
			message.success( 'Seaman updated.' );
		} ).catch( ( err ) => {
			error && error();

			console.log( err );
			message.error( 'Unable to update seaman.' );
		} ).finally( () => {
			done && done();
		} );
	};

	const store = {
		seaman,
		setSeaman,
		isSaving,
		setIsSaving,
		isSeamanTouched,
		setIsSeamanTouched,
		updateSeaman,
		...form,
	};

	return (
		<SeamanContext.Provider value={ store }>
			{ children }
		</SeamanContext.Provider>
	);
} );

SeamanProvider.getInitialProps = async ( ctx ) => {
	const { id } = ctx.query;
	const cookies = parseCookies( ctx );
	const res = await axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman/${ id }`, {
		headers: {
			Authorization: `Bearer ${ cookies.token }`,
		},
	} );

	return {
		data: res.data,
	};
};
