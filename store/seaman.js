/**
 * External dependencies
 */
import React, { createContext, useState } from 'react';
import useForm from 'react-hook-form';

export const SeamanContext = createContext();

export const SeamanProvider = ( { children, data } ) => {
  const [ seamanData, setSeamanData ] = useState( data );
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const store = {
    seamanData,
    setSeamanData,
    register,
    handleSubmit,
    formState,
    setValue,
    reset
  };

  return (
    <SeamanContext.Provider value={ store }>
      { children }
    </SeamanContext.Provider>
  );
};
