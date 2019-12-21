/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { map } from 'lodash';
import { parseCookies } from 'nookies';
const { token } = parseCookies();

export const WorksContext = createContext();

export const WorksProvider = ( { children } ) => {
  const [ loading, setLoading ] = useState( true );
  const [ principalId, setPrincipalId ] = useState( '' );
  const [ principalName, setPrincipalName ] = useState( '' );
  const [ vesselId, setVesselId ] = useState( '' );
  const [ vesselName, setVesselName ] = useState( '' );
  const [ vessels, setVessels ] = useState( [] );
  const signal = axios.CancelToken.source();

  const getVessels = () => {
    const params = {};
    setLoading( true );

    if ( vesselId ) {
      params.include = [ vesselId ];
    } else if ( principalId ) {
      params.principal = principalId;
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

  const getVessel = ( id ) => {
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

  const saveOrders = ( { values, success, error, done } ) => {
    axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/bulk`, values, {
      cancelToken: signal.token,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
    } ).then( ( res ) => {
      if ( success ) {
        success( res );
      }

      getVessel( parseInt( values.vessel ) );
      message.success( 'Orders created.' );
    } ).catch( ( err ) => {
      if ( error ) {
        error();
      }

      console.log( err );
      message.error( 'Failed to create orders.' );
    } ).finally( () => {
      if ( done ) {
        done();
      }
    } );
  }

  const store = {
    loading,
    setLoading,
    principalId,
    setPrincipalId,
    principalName,
    setPrincipalName,
    vesselId,
    setVesselId,
    vesselName,
    setVesselName,
    vessels,
    setVessels,
    getVessels,
    getVessel,
    saveOrders
  };

  return (
    <WorksContext.Provider value={ store }>
      { children }
    </WorksContext.Provider>
  );
};
