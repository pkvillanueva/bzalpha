/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Form } from '@ant-design/compatible';

export const VesselContext = createContext();

export const VesselProvider = Form.create()( ( { children, data, form } ) => {
	const [ vessel, setVessel ] = useState( data );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isVesselTouched, setIsVesselTouched ] = useState( false );
	const store = {
		vessel,
		setVessel,
		isSaving,
		setIsSaving,
		isVesselTouched,
		setIsVesselTouched,
		...form,
	};

	return (
		<VesselContext.Provider value={ store }>
			{ children }
		</VesselContext.Provider>
	);
} );

VesselProvider.getInitialProps = async ( ctx ) => {
	const { id } = ctx.query;
	const cookies = parseCookies( ctx );
	const res = await axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel/${ id }`, {
		headers: {
			Authorization: `Bearer ${ cookies.token }`,
		},
	} );

	return {
		data: res.data,
	};
};
