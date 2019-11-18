/**
 * External dependencies.
 */
import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Modal, Form, Input } from 'antd';

const VesselNew = Form.create()( ( { form, visible, onCancel } ) => {
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
      };

      axios.post( `http://bzalpha.test/wp-json/bzalpha/v1/vessel`, values, {
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
