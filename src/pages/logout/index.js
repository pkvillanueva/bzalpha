/**
 * External dependencies.
 */
import React, { Component } from 'react';
import Router from 'next/router';
import { destroyCookie } from 'nookies';

class Logout extends Component {
	static async getInitialProps( ctx ) {
		destroyCookie( ctx, 'token' );
		destroyCookie( ctx, 'display_name' );
		destroyCookie( ctx, 'email' );
		destroyCookie( ctx, 'nice_name' );
		destroyCookie( ctx, 'header_collapsed' );

		if ( ctx.res ) {
			ctx.res.writeHead( 302, {
				Location: '/login',
			} );
			ctx.res.end();
		} else {
			Router.push( '/login' );
		}
	}

	render() {
		return <></>;
	}
}

export default Logout;
