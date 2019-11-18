/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Form, Button, Card, Input } from 'antd';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import { VesselProvider, VesselContext } from '~/store/vessel';
import withAuth from '~/utils/withAuth';
import withProvider from '~/utils/withProvider';
import formatBreadcrumb from '~/utils/formatBreadcrumb';

const Page = () => {
  const {
    vessel,
    setVessel,
    validateFields,
    isSaving,
    setIsSaving,
    getFieldDecorator,
    resetFields,
    isFieldsTouched,
    isVesselTouched,
    setIsVesselTouched
  } = useContext( VesselContext );
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
      axios.post( `http://bzalpha.test/wp-json/bzalpha/v1/vessel/${ query.id }`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ cookies.token }`,
        }
      } ).then( ( res ) => {
        setTimeout( () => {
          setVessel( res.data );
          resetFields();
          setIsSaving( false );
          setIsVesselTouched( false );
        }, 1500 );
      } ).catch( () => {
        setTimeout( () => {
          setIsSaving( false );
          setIsVesselTouched( false );
        }, 1500 );
      } );
    } );
  };

  const getBreadcrumb = () => {
    return [
      { path: '/vessel', breadcrumbName: 'Vessels List' },
      { breadcrumbName: vessel.title.rendered }
    ]
  };

  return (
    <Layout
      title={ vessel.title.rendered }
      breadcrumb={ formatBreadcrumb( getBreadcrumb() ) }
      extra={ [
        <Button type="primary" key="save" onClick={ handleSave } disabled={ ( ! isVesselTouched && ! isFieldsTouched() ) } loading={ isSaving }>Save</Button>
      ] }
    >
      <Card title="Basic Information">
        <Form style={ { maxWidth: '400px', margin: '0 auto' } }>
          <Form.Item label="Name">
            { getFieldDecorator( 'title', {
              initialValue: vessel.title.rendered,
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
          <Form.Item label="Type">
            { getFieldDecorator( 'type', {
              initialValue: vessel.type
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="International Maritime Organization (IMO)">
            { getFieldDecorator( 'imo', {
              initialValue: vessel.imo
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="Maritime Mobile Service Identity (MMSI)">
            { getFieldDecorator( 'mmsi', {
              initialValue: vessel.mmsi
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="Gross Register Tonnage (GRT)">
            { getFieldDecorator( 'grt', {
              initialValue: vessel.grt
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="Deadweight Tonnage (DWT)">
            { getFieldDecorator( 'dwt', {
              initialValue: vessel.dwt
            } )(
              <Input />
            ) }
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default withAuth( withProvider( VesselProvider, Page ) );
