const withPlugins = require('next-compose-plugins')
const antdLessLoader = require( 'next-antd-aza-less' )
const withCss = require('@zeit/next-css')

if ( typeof require !== 'undefined' ) {
  require.extensions['.less'] = ( file ) => {}
  require.extensions['.css'] = ( file ) => {}
}
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/less.*?/;
      const origExternals = [...config.externals];
      config.externals = [ // eslint-disable-line
        (context, request, callback) => { // eslint-disable-line
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    return config;
  },
};

module.exports = withPlugins(
  [
    [withCss],
    [
      antdLessLoader,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[hash:base64:5]",
        },
        lessLoaderOptions: {
          javascriptEnabled: true,
        }
      }
    ],
  ],
  nextConfig,
);
