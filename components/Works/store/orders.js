/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { map, filter, find, merge } from 'lodash';
import { parseCookies } from 'nookies';
const { token } = parseCookies();
import { prepareValues } from '~/utils/api';

export const OrdersContext = createContext();

export const OrdersProvider = ( { children } ) => {
	const [ loading, setLoading ] = useState( true );
	const [ updating, setUpdating ] = useState( false );
	const [ orders, setOrders ] = useState( [] );
	const signal = axios.CancelToken.source();

	const getOrder = ( id ) => {
		return find( orders, { id } );
	};

	const fetchOrders = ( vessel ) => {
		setLoading( true );

		axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order`, {
			cancelToken: signal.token,
			params: {
				vessel,
				orderby: 'id',
				per_page: 100,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ token }`,
			},
		} ).then( ( res ) => {
			setOrders( res.data );
		} ).catch( ( err ) => {
			console.log( err );
		} ).finally( () => {
			setLoading( false );
		} );
	};

	const deleteOrder = ( { id, success, error, done } ) => {
		setUpdating( true );

		axios.delete( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/${ id }`, {
			cancelToken: signal.token,
			headers: { Authorization: `Bearer ${ token }` },
			data: {
				id,
			},
		} ).then( ( res ) => {
			success && success( res );

			setUpdating( false );
			setOrders( filter( orders, ( order ) => order.id !== id ) );
			message.success( 'Order deleted.' );
		} ).catch( ( err ) => {
			error && error();

			setUpdating( false );
			console.log( err );
			message.error( 'Unable to delete order.' );
		} ).finally( () => {
			done && done();
		} );
	};

	const updateOrder = ( { id, values, success, error, done } ) => {
		values = prepareValues( values );
		setUpdating( true );

		axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/${ id }`, values, {
			cancelToken: signal.token,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ token }`,
			},
		} ).then( ( res ) => {
			success && success( res );

			setUpdating( false );
			setOrders( map( orders, ( order ) => order.id === id ? res.data : order ) );
			message.success( 'Order updated.' );
		} ).catch( ( err ) => {
			error && error();

			setUpdating( false );
			console.log( err );
			message.error( 'Unable to update order.' );
		} ).finally( () => {
			done && done();
		} );
	};

	const createOrder = ( { values, success, error, done } ) => {
		values = prepareValues( values );
		setUpdating( true );

		axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/`, {
			...values,
			status: 'publish',
		}, {
			cancelToken: signal.token,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ token }`,
			},
		} ).then( ( res ) => {
			success && success( res );

			const order = res.data;
			const { parent_order } = order.meta;
			let records = [ order, ...orders ];

			// Update parent order.
			if ( parent_order && getOrder( parent_order ) ) {
				records = map( records, ( record ) => {
					return parent_order !== record.id ? record : merge( record, { meta: {
						child_order: order.id,
					} } );
				} );
			}

			setUpdating( false );
			setOrders( records );
			message.success( 'Order updated.' );
		} ).catch( ( err ) => {
			error && error();

			setUpdating( false );
			console.log( err );
			message.error( 'Unable to update order.' );
		} ).finally( () => {
			done && done();
		} );
	};

	const closeOrder = ( { id, success, error, done } ) => {
		setUpdating( true );

		axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/close`, {
			id,
			end_of_contract: 'End of Contract',
		}, {
			cancelToken: signal.token,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ token }`,
			},
		} ).then( ( res ) => {
			success && success( res );

			const order = getOrder( id );
			const { child_order } = order.meta;
			let records = [ ...orders ];

			// Remove close order from list.
			records = filter( records, ( record ) => record.id !== order.id );

			// Update child order.
			if ( child_order && getOrder( child_order ) ) {
				records = map( records, ( record ) => {
					return child_order !== record.id ? record : merge( record, { meta: {
						status: 'onboard',
					} } );
				} );
			}

			setUpdating( false );
			setOrders( records );
			message.success( 'Order updated.' );
		} ).catch( ( err ) => {
			error && error();

			setUpdating( false );
			console.log( err );
			message.error( 'Could not close order.' );
		} ).finally( () => {
			done && done();
		} );
	};

	const store = {
		loading,
		setLoading,
		updating,
		setUpdating,
		fetchOrders,
		orders,
		setOrders,
		getOrder,
		deleteOrder,
		updateOrder,
		createOrder,
		closeOrder,
	};

	return (
		<OrdersContext.Provider value={ store }>
			{ children }
		</OrdersContext.Provider>
	);
};
