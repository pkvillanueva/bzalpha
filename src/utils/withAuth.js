/**
 * External dependencies.
 */
import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';

const withAuth = ( Component ) => class extends React.Component {
	static async getInitialProps( ctx ) {
		const cookies = parseCookies( ctx );

		// Check token.
		await axios.post( `${ process.env.API_URL }/wp-json/jwt-auth/v1/token/validate`, {}, {
			headers: {
				Authorization: `Bearer ${ cookies.token }`,
			},
		} ).then( () => {
			// Do nothing.
		} ).catch( () => {
			if ( ctx.res ) {
				ctx.res.writeHead( 302, {
					Location: '/login',
				} );
				ctx.res.end();
			} else {
				Router.push( '/login' );
			}
		} );

		if ( Component.getInitialProps ) {
			const props = await Component.getInitialProps( ctx );
			return { ...props };
		}
		return {};
	}

	render() {
		return <Component { ...this.props } />;
	}
};

export default withAuth;
