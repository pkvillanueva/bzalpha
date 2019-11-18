/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Form, Button, Card, Input, Select } from 'antd';
import { map } from 'lodash';
import ReactCountryFlag from 'react-country-flag';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import { PrincipalProvider, PrincipalContext } from '~/store/principal';
import withAuth from '~/utils/withAuth';
import withProvider from '~/utils/withProvider';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import countries from '~/utils/countries';

const Page = () => {
  const {
    principal,
    setPrincipal,
    validateFields,
    isSaving,
    setIsSaving,
    getFieldDecorator,
    resetFields,
    isFieldsTouched,
    isPrincipalTouched,
    setIsPrincipalTouched,
    getFieldValue
  } = useContext( PrincipalContext );
  const { query } = useRouter();

  const handleSave = () => {
    if ( isSaving ) {
      return;
    }

    validateFields( ( err, values ) => {
      if ( err ) {
        return;
      }

      setIsSaving( true );
      const cookies = parseCookies();
      axios.post( `http://bzalpha.test/wp-json/bzalpha/v1/principal/${ query.id }`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ cookies.token }`,
        }
      } ).then( ( res ) => {
        setTimeout( () => {
          setPrincipal( res.data );
          resetFields();
          setIsSaving( false );
          setIsPrincipalTouched( false );
        }, 1500 );
      } ).catch( () => {
        setTimeout( () => {
          setIsSaving( false );
          setIsPrincipalTouched( false );
        }, 1500 );
      } );
    } );
  };

  const getBreadcrumb = () => {
    return [
      { path: '/principal', breadcrumbName: 'Principals List' },
      { breadcrumbName: principal.name }
    ]
  };

  return (
    <Layout
      title={
        <>
          { principal.name }
          { principal.country && <span style={ { marginLeft: '8px', verticalAlign: 'text-bottom' } }>
            <ReactCountryFlag code={ principal.country.toLowerCase() } svg />
          </span> }
        </>
      }
      breadcrumb={ formatBreadcrumb( getBreadcrumb() ) }
      extra={ [
        <Button type="primary" key="save" onClick={ handleSave } disabled={ ( ! isPrincipalTouched && ! isFieldsTouched() ) } loading={ isSaving }>Save</Button>
      ] }
    >
      <Card title="Basic Information">
        <Form style={ { maxWidth: '400px', margin: '0 auto' } }>
          <Form.Item label="Name">
            { getFieldDecorator( 'name', {
              initialValue: principal.name,
              rules: [
                {
                  required: true,
                  message: 'Name is required!',
                },
              ],
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="Country">
            { getFieldDecorator( 'country', {
              initialValue: principal.country
            } )(
              <Select showSearch>
                { map( countries, ( country ) => <Select.Option key={ country.code } value={ country.code }>{ country.name }</Select.Option> ) }
              </Select>
            ) }
            { getFieldValue( 'country' ) && <ReactCountryFlag code={ getFieldValue( 'country' ).toLowerCase() } svg /> }
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default withAuth( withProvider( PrincipalProvider, Page ) );
