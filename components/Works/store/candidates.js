/**
 * External dependencies
 */
import React, { createContext, useState, useContext } from 'react';
import moment from 'moment';
import { map, filter } from 'lodash';
import { OrdersContext } from './orders';

export const CandidatesContext = createContext();

export const CandidatesProvider = ( { order, children } ) => {
	const { updateOrder } = useContext( OrdersContext );
	const [ fields, setFields ] = useState( { seaman: '', type: 'proposed' } );
	const [ candidates, setCandidates ] = useState( order.meta.candidates || [] );

	const saveCandidates = ( records ) => {
		updateOrder( {
			id: order.id,
			values: {
				meta: {
					candidates: records,
				},
			},
			success( res ) {
				setFields( {
					seaman: '',
					type: 'proposed',
				} );

				setCandidates( res.data.meta.candidates || [] );
			},
		} );
	};

	const deleteCandidate = ( index ) => {
		saveCandidates( filter( candidates, ( candidate, id ) => {
			return id !== index;
		} ) );
	};

	const updateCandidate = ( index, data ) => {
		saveCandidates( map( candidates, ( candidate, i ) => {
			return i === index ? { ...candidate, ...data } : candidate;
		} ) );
	};

	const createCandidate = () => {
		const records = [ ...candidates, {
			seaman: fields.seaman,
			status: fields.type === 'requested' ? 'approved' : 'waiting',
			type: fields.type,
			timestamp: moment().format( 'YYYY-MM-DD' ),
		} ];

		saveCandidates( records );
	};

	const store = {
		order,
		candidates,
		fields,
		setFields,
		createCandidate,
		updateCandidate,
		deleteCandidate,
	};

	return (
		<CandidatesContext.Provider value={ store }>
			{ children }
		</CandidatesContext.Provider>
	);
};
