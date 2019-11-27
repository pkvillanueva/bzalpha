/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Form } from 'antd';

export const PrincipalContext = createContext();

export const PrincipalProvider = Form.create()( ( { children, data, form } ) => {
  const [ principal, setPrincipal ] = useState( data );
  const [ isSaving, setIsSaving ] = useState( false );
  const [ isPrincipalTouched, setIsPrincipalTouched ] = useState( false );
  const store = {
    principal,
    setPrincipal,
    isSaving,
    setIsSaving,
    isPrincipalTouched,
    setIsPrincipalTouched,
    ...form
  };

  return (
    <PrincipalContext.Provider value={ store }>
      { children }
    </PrincipalContext.Provider>
  );
} );

PrincipalProvider.getInitialProps = async ( ctx ) => {
  const { id } = ctx.query;
  const cookies = parseCookies( ctx );
  const res = await axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/principal/${ id }`, {
    headers: {
      'Authorization': `Bearer ${ cookies.token }`
    }
  } );

  return {
    data: res.data
  };
};
