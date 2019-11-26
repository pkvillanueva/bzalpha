/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { setCookie } from 'nookies';
import { Form, Icon, Input, Button, Checkbox, Card, Layout, Alert } from 'antd';
import axios from 'axios';
import Router from 'next/router';

/**
 * Internal dependencies.
 */
import withNoAuth from '~/utils/withNoAuth';
import styles from './styles.less';

const Login = ( { form } ) => {
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( '' );
  const { getFieldDecorator, validateFields } = form;

  const handleSubmit = ( event ) => {
    event.preventDefault();
    if ( loading ) {
      return;
    }

    setLoading( true );
    validateFields( async ( err, values ) => {
      if ( err ) {
        setLoading( false );
        return;
      }

      try {
        const res = await axios.post( 'http://api.bzalpha.com/wp-json/jwt-auth/v1/token', values, {
          headers: {
            'Content-Type': 'application/json',
          }
        } );

        setCookie( {}, 'token', res.data.token );
        setCookie( {}, 'display_name', res.data.user_display_name );
        setCookie( {}, 'email', res.data.user_email );
        setCookie( {}, 'nice_name', res.data.user_nicename );
        setError( '' );
        Router.push( '/' );
      } catch( err ) {
        setLoading( false );
        setError( 'Invalid username or password.' );
      }
    } );
  };

  return (
    <Layout>
      <Layout.Content className={ styles.content }>
        <img className={ styles.logo } alt="BZ Alpha" src="./static/bzalpha-logo.svg" />
        <Card className={ styles.card }>
          <Form onSubmit={ handleSubmit }>
            { error && <Form.Item>
              <Alert message={ error } type="error" showIcon />
            </Form.Item> }
            <Form.Item>
              { getFieldDecorator( 'username', {
                rules: [ { required: true, message: 'Please enter your username.' } ],
              } )(
                <Input
                  prefix={ <Icon type="user" className={ styles.icon } />}
                  placeholder="Username"
                />,
              ) }
            </Form.Item>
            <Form.Item>
              { getFieldDecorator( 'password', {
                rules: [ { required: true, message: 'Please enter your password.' } ],
              } )(
                <Input
                  prefix={<Icon type="lock" className={ styles.icon } />}
                  type="password"
                  placeholder="Password"
                />,
              ) }
            </Form.Item>
            <Form.Item className={ styles.actions }>
              { getFieldDecorator( 'remember', {
                valuePropName: 'checked',
                initialValue: true,
              } )(
                <Checkbox>Remember me</Checkbox>
              ) }
              <a className={ styles.forgot } href="mailto:patrick@bzalpha.com">Forgot password</a>
              <Button
                loading={ loading }
                type="primary"
                htmlType="submit"
                className={ styles.submit }
              >Log in</Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default withNoAuth( Form.create( { name: 'login' } )( Login ) );
