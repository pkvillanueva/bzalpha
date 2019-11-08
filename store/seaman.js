/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';

export const SeamanContext = createContext();

export const SeamanProvider = ( { children, data, form } ) => {
  const [ seaman, setSeaman ] = useState( data );
  const [ isSeamanTouched, setIsSeamanTouched ] = useState( false );
  const store = {
    seaman,
    setSeaman,
    isSeamanTouched,
    setIsSeamanTouched,
    ...form
  };

  return (
    <SeamanContext.Provider value={ store }>
      { children }
    </SeamanContext.Provider>
  );
};
