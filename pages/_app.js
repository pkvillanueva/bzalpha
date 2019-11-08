/**
 * External dependencies.
 */
import App from 'next/app';
import { parseCookies } from 'nookies';

/**
 * Internal dependencies.
 */
import { UserProvider } from '../store/user';

class _App extends App {
  static async getInitialProps( { Component, ctx } ) {
    const cookies = parseCookies( ctx );

    if ( Component.getInitialProps ) {
      const props = await Component.getInitialProps( ctx );
      return { ...props, cookies };
    } else {
      return { cookies };
    }
  }

  render() {
    const { Component, cookies, ...pageProps } = this.props;

    return (
      <UserProvider cookies={ cookies }>
        <Component { ...pageProps } />
      </UserProvider>
    );
  }
}

export default _App;
