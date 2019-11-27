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
import { parseFullName } from '~/utils/utils';

const SeamanNew = Form.create()( ( { form, visible, onCancel } ) => {
  const { getFieldDecorator, validateFields, resetFields } = form;
  const [ isLoading, setIsLoading ] = useState( false );

  const handleOk = () => {
    validateFields( ( err, values ) => {
      if ( err ) {
        return;
      }

      setIsLoading( true );
      const { token } = parseCookies();
      const fullName = parseFullName( values.full_name );
      values = {
        status: 'publish',
        title: fullName.first + ( fullName.last ? ` ${ fullName.last }` : '' ),
        first_name: fullName.first,
        middle_name: fullName.middle,
        last_name: fullName.last,
        job_status: 'standby'
      };

      axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        },
      } )
      .then( ( res ) => {
        setTimeout( () => {
          Router.push( `/seaman/${ res.data.id }` );
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
      title="Create new seaman"
      okText={ 'Create' }
      maskClosable={ ! isLoading }
      onCancel={ handleCancel }
      onOk={ handleOk }
      okButtonProps={ { loading: isLoading } }
    >
      <Form layout="vertical">
        <Form.Item label="Full Name">
          { getFieldDecorator( 'full_name', {
            rules: [ { required: true, message: 'Name is required.' } ],
          } )( <Input placeholder="Enter full name" /> ) }
        </Form.Item>
      </Form>
    </Modal>
  )
} );

export default SeamanNew;
