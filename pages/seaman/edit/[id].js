/**
 * External dependencies.
 */
import React from 'react';
import axios from 'axios';
import { Form } from 'antd';

/**
 * Internal dependencies
 */
import App from '~/components/App';
import Container from '~/components/Container';
import { SeamanProvider } from '~/store/seaman';
import withAuth from '~/utils/withAuth';
import SeamanEdit from '~/components/SeamanEdit';
import { parseCookies } from 'nookies';

const Page = Form.create( { name: 'seaman' } )( ( { data, form } ) => {
  return (
    <SeamanProvider data={ data } form={ form }>
      <App>
        <Container>
          <SeamanEdit />
        </Container>
      </App>
    </SeamanProvider>
  );
} );

Page.getInitialProps = async ( ctx ) => {
  const { id } = ctx.query;
  const cookies = parseCookies( ctx );
  const res = await axios.get( `http://bzalpha.test/wp-json/bzalpha/v1/seaman/${ id }`, {
    headers: {
      'Authorization': `Bearer ${ cookies.token }`
    }
  } );

  return {
    data: res.data
  };
}

export default withAuth( Page );
