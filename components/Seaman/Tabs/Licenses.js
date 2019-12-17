/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import moment from 'moment';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import DataCollection from '~/components/DataCollection';
import FileUpload from '~/components/FileUpload';
import { isEmpty } from 'lodash';

const Licenses = () => {
  const { seaman, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Number', dataIndex: 'num', key: 'num' },
    { title: 'Issue Date', dataIndex: 'issue_date', key: 'issue_date' },
    { title: 'Valid Until', dataIndex: 'valid_until', key: 'valid_until' },
    { title: 'Issued By', dataIndex: 'issued_by', key: 'issued_by' },
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      render: ( record ) => record && record.url && <Button icon="file" size="small" href={ record.url } target="_blank" />
    },
  ];

  const handleSave = ( records ) => {
    setFieldsValue( { licenses: records } );
    setIsSeamanTouched( true );
  };

  const handleFormatRecord = ( record ) => {
    return {
      ...record,
      issue_date: record['issue_date'].format( 'YYYY-MM-DD' ),
      valid_until: record['valid_until'].format( 'YYYY-MM-DD' )
    }
  };

  return (
    <DataCollection
      title="Licenses"
      columns={ columns }
      data={ seaman.licenses }
      modalTitle="Document"
      onChange={ handleSave }
      formatRecord={ handleFormatRecord }
      modalForm={ ( getFieldDecorator, initialValues ) => [
        <Form.Item key="name" label="Name">
          { getFieldDecorator( 'name', {
            initialValue: initialValues.name
          } )( <Input /> ) }
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
        <Form.Item key="valid_until" label="Valid Until">
          { getFieldDecorator( 'valid_until', {
            initialValue: initialValues.valid_until && moment( initialValues.valid_until )
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
  );
};

export default Licenses;
