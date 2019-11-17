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
    return (
      <Provider { ...this.props.providerProps }>
        <Component { ...this.props.componentProps } />
      </Provider>
    )
  }
};

export default withProvider;
