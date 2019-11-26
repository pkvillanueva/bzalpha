/**
 * External dependencies.
 */
import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Modal, Form, Input } from 'antd';

/**
 * Internal dependencies.
 */
import SelectFetch from '~/components/SelectFetch';

const VesselNew = Form.create()( ( { form, visible, onCancel, basePrincipal } ) => {
  const { getFieldDecorator, validateFields, resetFields } = form;
  const [ isLoading, setIsLoading ] = useState( false );

  const handleOk = () => {
    validateFields( ( err, values ) => {
      if ( err ) {
        return;
      }

      setIsLoading( true );
      const { token } = parseCookies();
      values = {
        status: 'publish',
        title: values.name,
        principal: basePrincipal ? basePrincipal : values.principal
      };

      axios.post( `http://api.bzalpha.com/wp-json/bzalpha/v1/vessel`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        },
      } )
      .then( ( res ) => {
        setTimeout( () => {
          Router.push( `/vessel/${ res.data.id }` );
        }, 1500 );
      } )
      .catch( () => {
        setIsLoading( false );
      } );
    } );
  };

  const handleCancel = () => {
    resetFields();

    if ( ! isLoading && onCancel ) {
      onCancel();
    }
  }

  return (
    <Modal
      visible={ visible }
      title="Create new vessel"
      okText={ 'Create' }
      maskClosable={ ! isLoading }
      onCancel={ handleCancel }
      onOk={ handleOk }
      okButtonProps={ { loading: isLoading } }
    >
      <Form layout="vertical">
        { ! basePrincipal ? <Form.Item label="Owner">
          { getFieldDecorator( 'principal', {
            rules: [ { required: true, message: 'Owner is required.' } ],
          } )(
            <SelectFetch
              placeholder="Select owner"
              dataKey="id"
              labelKey="name"
              action='http://api.bzalpha.com/wp-json/bzalpha/v1/principal'
            />
          ) }
        </Form.Item> : null }
        <Form.Item label="Name">
          { getFieldDecorator( 'name', {
            rules: [ { required: true, message: 'Name is required.' } ],
          } )( <Input placeholder="Enter name" /> ) }
        </Form.Item>
      </Form>
    </Modal>
  )
} );

export default VesselNew;
