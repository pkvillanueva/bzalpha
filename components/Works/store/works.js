/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { map } from 'lodash';
import { parseCookies } from 'nookies';
const { token } = parseCookies();
import { prepareValues } from '~/utils/api';

export const WorksContext = createContext();

export const WorksProvider = ( { children } ) => {
  const [ loading, setLoading ] = useState( true );
  const [ principal, setPrincipal ] = useState( { id: '', name: '' } );
  const [ vessel, setVessel ] = useState( { id: '', name: '' } );
  const [ vessels, setVessels ] = useState( [] );
  const signal = axios.CancelToken.source();

  const fetchVessels = () => {
    const params = {};
    setLoading( true );

    if ( vessel.id ) {
      params.include = [ vessel.id ];
    } else if ( principal.id ) {
      params.principal = principal.id;
    }

    axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel`, {
      cancelToken: signal.token,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      }
    } ).then( ( res ) => {
      setVessels( res.data );
    } ).catch( ( err ) => {
      console.log( err );
    } ).finally( () => {
      setLoading( false );
    } );
  };

  const fetchVessel = ( id ) => {
    if ( ! id ) {
      return;
    }

    setLoading( true );
    axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel/${ id }`, {
      cancelToken: signal.token,
      params: {
        include: [ id ]
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      }
    } ).then( ( res ) => {
      setVessels( map( vessels, ( vessel ) => vessel.id === id ? res.data : vessel ) );
    } ).catch( ( err ) => {
      console.log( err );
    } ).finally( () => {
      setLoading( false );
    } );
  };

  const createOrders = ( { values, success, error, done } ) => {
    values = prepareValues( values );

    axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/bulk`, values, {
      cancelToken: signal.token,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
    } ).then( ( res ) => {
      success && success( res );

      fetchVessel( values.vessel );
      message.success( 'Orders created.' );
    } ).catch( ( err ) => {
      error && error();

      console.log( err );
      message.error( 'Failed to create orders.' );
    } ).finally( () => {
      done && done();
    } );
  }

  const store = {
    loading,
    setLoading,
    principal,
    setPrincipal,
    vessel,
    setVessel,
    vessels,
    setVessels,
    fetchVessels,
    fetchVessel,
    createOrders
  };

  return (
    <WorksContext.Provider value={ store }>
      { children }
    </WorksContext.Provider>
  );
};
