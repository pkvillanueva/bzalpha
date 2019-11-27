/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Form } from 'antd';

export const SeamanContext = createContext();

export const SeamanProvider = Form.create()( ( { children, data, form } ) => {
  const [ seaman, setSeaman ] = useState( data );
  const [ isSaving, setIsSaving ] = useState( false );
  const [ isSeamanTouched, setIsSeamanTouched ] = useState( false );
  const store = {
    seaman,
    setSeaman,
    isSaving,
    setIsSaving,
    isSeamanTouched,
    setIsSeamanTouched,
    ...form
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
      'Authorization': `Bearer ${ cookies.token }`
    }
  } );

  return {
    data: res.data
  };
};
