/**
 * External dependencies
 */
import React, { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ( { cookies, children } ) => {
	const { token, email, display_name, nice_name, header_collapsed } = cookies;

	const store = {
		token,
		email,
		display_name,
		nice_name,
		header_collapsed,
	};

	return (
		<UserContext.Provider value={ store }>
			{ children }
		</UserContext.Provider>
	);
};
