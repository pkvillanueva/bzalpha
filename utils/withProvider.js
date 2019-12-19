/**
 * External dependencies.
 */
import React from 'react';

const withProvider = ( Provider, Component ) => class extends React.Component {
  static async getInitialProps( ctx ) {
    let providerProps = {};
    if ( Provider.getInitialProps ) {
      providerProps = await Provider.getInitialProps( ctx );
    }

    let componentProps = {};
    if ( Component.getInitialProps ) {
      componentProps = await Component.getInitialProps( ctx );
    }

    return {
      providerProps,
      componentProps
    }
  }

  render() {
    const { providerProps, componentProps, ...props } = this.props;

    return (
      <Provider { ...providerProps } { ...props }>
        <Component { ...componentProps } { ...props } />
      </Provider>
    )
  }
};

export default withProvider;
