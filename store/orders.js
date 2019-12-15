/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';

export const OrdersContext = createContext();

export const OrdersProvider = ( { children } ) => {
  const [ reload, setReload ] = useState( false );

  const store = {
    reload,
    setReload
  };

  return (
    <OrdersContext.Provider value={ store }>
      { children }
    </OrdersContext.Provider>
  );
};
