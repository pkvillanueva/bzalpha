/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import { omit, map } from 'lodash';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import DataCollection from '~/components/DataCollection';

const Relatives = () => {
  const { seaman, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );

  const columns = [
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { title: 'Kin', dataIndex: 'kin', key: 'kin' }
  ];

  const handleSave = ( records ) => {
    setFieldsValue( {
      meta: {
        relatives: map( records, ( record ) => omit( record, [ 'id', 'key' ] ) )
      }
    } );
    setIsSeamanTouched( true );
  };

  return (
    <DataCollection
      title="Relatives"
      columns={ columns }
      data={ seaman.meta.relatives }
      modalTitle="Relative"
      onChange={ handleSave }
      modalForm={ ( getFieldDecorator, initialValues ) => [
        <Form.Item key="first_name" label="First Name">
          { getFieldDecorator( 'first_name', {
            initialValue: initialValues.first_name
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="last_name" label="Last Name">
          { getFieldDecorator( 'last_name', {
            initialValue: initialValues.last_name
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="contact" label="Contact">
          { getFieldDecorator( 'contact', {
            initialValue: initialValues.contact
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="kin" label="Kin">
          { getFieldDecorator( 'kin', {
            initialValue: initialValues.kin
          } )( <Input /> ) }
        </Form.Item>
      ] }
    />
  );
};

export default Relatives;
