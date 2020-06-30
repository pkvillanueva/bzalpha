const path = require( 'path' );
const antdLessLoader = require( 'next-antd-aza-less' );
const withBundleAnalyzer = require('@next/bundle-analyzer');

if ( typeof require !== 'undefined' ) {
	require.extensions[ '.less' ] = () => {};
}

const config = antdLessLoader( {
	env: {
		API_URL: process.env.NODE_ENV === 'production' ? 'http://api.bzalpha.com' : 'http://bzalpha.test',
	},
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[hash:base64:5]',
	},
	lessLoaderOptions: {
		javascriptEnabled: true,
	},
	webpack: ( config, options ) => {
		const { isServer } = options;

		if ( isServer ) {
			const antStyles = /antd\/.*?\/style.*?/;
			const origExternals = [ ...config.externals ];
			config.externals = [
				( context, request, callback ) => {
					if ( request.match( antStyles ) ) {
						return callback();
					}
					if ( typeof origExternals[ 0 ] === 'function' ) {
						origExternals[ 0 ]( context, request, callback );
					} else {
						callback();
					}
				},
				...( typeof origExternals[ 0 ] === 'function' ? [] : origExternals ),
			];

			config.module.rules.unshift( {
				test: antStyles,
				use: 'null-loader',
			} );
		}

		config.resolve.alias[ '~' ] = path.join( __dirname, 'src' );

		return config;
	},
} );

module.exports = withBundleAnalyzer( {
	enabled: process.env.ANALYZE === 'true',
} )( config );
