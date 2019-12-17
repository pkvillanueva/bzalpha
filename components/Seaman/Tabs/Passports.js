/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, DatePicker, Button, Select } from 'antd';
import moment from 'moment';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import DataCollection from '~/components/DataCollection';
import FileUpload from '~/components/FileUpload';
import { isEmpty } from 'lodash';

const Passports = () => {
  const { seaman, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Number', dataIndex: 'num', key: 'num' },
    { title: 'Issue Date', dataIndex: 'issue_date', key: 'issue_date' },
    { title: 'Valid Till', dataIndex: 'valid_till', key: 'valid_till' },
    { title: 'Issued By', dataIndex: 'issued_by', key: 'issued_by' },
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      render: ( record ) => record && record.url && <Button icon="file" size="small" href={ record.url } target="_blank" />
    },
  ];

  const handleSave = ( records ) => {
    setFieldsValue( { passports: records } );
    setIsSeamanTouched( true );
  };

  const handleFormatRecord = ( record ) => {
    return {
      ...record,
      issue_date: record['issue_date'].format( 'YYYY-MM-DD' ),
      valid_till: record['valid_till'].format( 'YYYY-MM-DD' )
    }
  };

  return (
    <div style={ { marginBottom: 24 } }>
      <DataCollection
        title="Passports"
        columns={ columns }
        data={ seaman.passports }
        modalTitle="Passport"
        onChange={ handleSave }
        formatRecord={ handleFormatRecord }
        modalForm={ ( getFieldDecorator, initialValues ) => [
          <Form.Item key="type" label="Type">
            { getFieldDecorator( 'type', {
              initialValue: initialValues.type
            } )( <Select placeholder="Select type" style={ { width: '100%' } }>
              <Select.Option value="S/Book">S/Book</Select.Option>
              <Select.Option value="Travel Passport">Travel Passport</Select.Option>
              <Select.Option value="Travel Passport BIO">Travel Passport BIO</Select.Option>
              <Select.Option value="UA">UA</Select.Option>
              <Select.Option value="Inn">Inn</Select.Option>
              <Select.Option value="E-REG (Manila)">E-REG (Manila)</Select.Option>
            </Select> ) }
          </Form.Item>,
          <Form.Item key="num" label="Number">
            { getFieldDecorator( 'num', {
              initialValue: initialValues.num
            } )( <Input /> ) }
          </Form.Item>,
          <Form.Item key="issue_date" label="Issue Date">
            { getFieldDecorator( 'issue_date', {
              initialValue: initialValues.issue_date && moment( initialValues.issue_date )
            } )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
          </Form.Item>,
          <Form.Item key="valid_till" label="Valid Till">
            { getFieldDecorator( 'valid_till', {
              initialValue: initialValues.valid_till && moment( initialValues.valid_till )
            } )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
          </Form.Item>,
          <Form.Item key="issued_by" label="Issued By">
            { getFieldDecorator( 'issued_by', {
              initialValue: initialValues.issued_by
            } )( <Input /> ) }
          </Form.Item>,
          <Form.Item key="file" label="File">
            { getFieldDecorator( 'file', {
              initialValue: initialValues.file,
              valuePropName: 'file',
              getValueFromEvent: ( file ) => ! isEmpty( file ) ? file : {},
            } )( <FileUpload /> ) }
          </Form.Item>
        ] }
      />
    </div>
  );
};

export default Passports;
