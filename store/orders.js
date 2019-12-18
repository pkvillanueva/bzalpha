/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { map, filter } from 'lodash';
import { parseCookies } from 'nookies';
const { token } = parseCookies();

export const OrdersContext = createContext();

export const OrdersProvider = ( { children } ) => {
  const [ loading, setLoading ] = useState( true );
  const [ updating, setUpdating ] = useState( false );
  const [ orders, setOrders ] = useState( [] );
  const signal = axios.CancelToken.source();

  const getOrders = ( vessel ) => {
    setLoading( true );

    axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order`, {
      cancelToken: signal.token,
      params: {
        vessel: vessel,
        per_page: 100
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      }
    } ).then( ( res ) => {
      setOrders( res.data );
    } ).catch( ( err ) => {
      console.log( err );
    } ).finally( () => {
      setLoading( false );
    } );
  };

  const deleteOrder = ( id ) => {
    id = parseInt( id );
    setUpdating( true );

    axios.delete( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/${ id }`, {
      cancelToken: signal.token,
      headers: { 'Authorization': `Bearer ${ token }` },
      data: {
        id: id
      }
    } ).then( () => {
      setOrders( filter( orders, order => order.id !== id ) );
      message.success( 'Order deleted.' );
    } ).catch( ( err ) => {
      console.log( err );
      message.success( 'Unable to delete order.' );
    } ).finally( () => {
      setUpdating( false );
    } );
  };

  const updateOrder = ( { id, params, success, error, done } ) => {
    id = parseInt( id );
    setUpdating( true );

    axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/${ id } `, params, {
      cancelToken: signal.token,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      }
    } ).then( ( res ) => {
      if ( success ) success( res );
      setOrders( map( orders, ( order ) => order.id === id ? res.data : order ) );
      setUpdating( false );
      message.success( 'Order updated.' );
    } ).catch( ( err ) => {
      console.log( err );
      if ( error ) error();
      setUpdating( false );
      message.error( 'Unable to update order.' );
    } ).finally( () => {
      if ( done ) done();
    } );
  }

  const store = {
    loading,
    setLoading,
    updating,
    setUpdating,
    getOrders,
    deleteOrder,
    updateOrder,
    orders,
    setOrders
  };

  return (
    <OrdersContext.Provider value={ store }>
      { children }
    </OrdersContext.Provider>
  );
};
