/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { map } from 'lodash';
import { parseCookies } from 'nookies';
const { token } = parseCookies();

export const WorksContext = createContext();

export const WorksProvider = ( { children } ) => {
  const [ loading, setLoading ] = useState( true );
  const [ fetchVesselId, setFetchVesselId ] = useState( 0 );
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
      params.per_page = 100;
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
    } ).finally( () => {
      setLoading( false );
    } );
  };

  const updateVessel = ( id ) => {
    if ( ! id ) {
      return;
    }

    setFetchVesselId( id );
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
    } ).finally( () => {
      setFetchVesselId( 0 );
    } );
  };

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
    fetchVesselId,
    setFetchVesselId,
    updateVessel
  };

  return (
    <WorksContext.Provider value={ store }>
      { children }
    </WorksContext.Provider>
  );
};
