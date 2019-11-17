/**
 * External dependencies.
 */
import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';

const withNoAuth = ( Component ) => class extends React.Component {
  static async getInitialProps( ctx ) {
    const cookies = parseCookies( ctx );

    try {
      await axios.post( 'http://bzalpha.test/wp-json/jwt-auth/v1/token/validate', {}, {
        headers: {
          'Authorization': `Bearer ${ cookies.token }`
        }
      } );

      if ( ctx.res ) {
        ctx.res.writeHead( 302, {
          Location: '/'
        } );
        ctx.res.end();
      } else {
        Router.push( '/' );
      }
    } catch( err ) {
      // Do nothing.
    }

    if ( Component.getInitialProps ) {
      const props = await Component.getInitialProps( ctx );
      return { ...props };
    } else {
      return {};
    }
  }

  render() {
    return <Component { ...this.props } />
  }
};

export default withNoAuth;
