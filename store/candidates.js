/**
 * External dependencies
 */
import React, { createContext, useState, useContext } from 'react';
import moment from 'moment';
import { filter, isUndefined } from 'lodash';
import { OrdersContext } from '~/store/orders';

export const CandidatesContext = createContext();

export const CandidatesProvider = ( { order, children } ) => {
  const { updateOrder } = useContext( OrdersContext );
  const [ loading, setLoading ] = useState( true );
  const [ seamanId, setSeamanId ] = useState( '' );
  const [ type, setType ] = useState( 'proposed' );
  const [ candidates, setCandidates ] = useState( order.candidates || [] );

  const saveCandidates = ( records ) => {
    updateOrder( {
      id: order.id,
      params: {
        candidates: records
      },
      success( res ) {
        setCandidates( res.data.candidates || [] );
      },
      done() {
        setSeamanId( '' );
        setType( 'proposed' );
      }
    } );
  };

  const deleteCandidate = ( index ) => {
    const records = filter( candidates, ( candidate, id ) => {
      return id !== index;
    } );

    saveCandidates( records );
  };

  const updateCandidate = ( index, data ) => {
    const records = [ ...candidates ];

    if ( ! isUndefined( index ) && records[ index ] ) {
      records[ index ] = { ...records[ index ], ...data };
    } else {
      return;
    }

    saveCandidates( records );
  };

  const createCandidate = () => {
    const records = [ ...candidates, {
      seaman: seamanId,
      status: type === 'requested' ? 'approved' : 'waiting',
      type: type,
      timestamp: moment().format( 'YYYY-MM-DD' )
    } ];

    saveCandidates( records );
  };

  const store = {
    order,
    loading,
    setLoading,
    candidates,
    type,
    setType,
    seamanId,
    setSeamanId,
    createCandidate,
    updateCandidate,
    deleteCandidate
  };

  return (
    <CandidatesContext.Provider value={ store }>
      { children }
    </CandidatesContext.Provider>
  );
};
