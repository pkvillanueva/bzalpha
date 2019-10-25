/**
 * External dependencies
 */
import React, { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ( { cookies, children } ) => {
  const { token, email, display_name, nice_name } = cookies;

  const store = {
    token,
    email,
    display_name,
    nice_name
  };

  return (
    <UserContext.Provider value={ store }>
      { children }
    </UserContext.Provider>
  );
};
