/**
 * External dependencies.
 */
import App from 'next/app';
import { parseCookies } from 'nookies';
import { ReactQueryConfigProvider } from 'react-query';

/**
 * Internal dependencies.
 */
import { UserProvider } from '../store/user';

const QUERY_CONFIG = {};

class _App extends App {
	static async getInitialProps( { Component, ctx } ) {
		const cookies = parseCookies( ctx );

		if ( Component.getInitialProps ) {
			const props = await Component.getInitialProps( ctx );
			return { ...props, cookies };
		}
		return { cookies };
	}

	render() {
		const { Component, cookies, ...pageProps } = this.props;

		return (
			<ReactQueryConfigProvider config={ QUERY_CONFIG }>
				<UserProvider cookies={ cookies }>
					<Component { ...pageProps } />
				</UserProvider>
			</ReactQueryConfigProvider>
		);
	}
}

export default _App;
