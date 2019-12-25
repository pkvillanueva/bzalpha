/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, DatePicker, Button } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import DataCollection from '~/components/DataCollection';
import FileUpload from '~/components/FileUpload';
import { isEmpty, omit, map } from 'lodash';
import { parseMoment, dateFormat } from '~/utils/api';

const Licenses = () => {
  const { seaman, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Number', dataIndex: 'num', key: 'num' },
    { title: 'Issue Date', dataIndex: 'issue_date', key: 'issue_date', render: ( date ) => dateFormat( date ) },
    { title: 'Valid Until', dataIndex: 'valid_until', key: 'valid_until', render: ( date ) => dateFormat( date ) },
    { title: 'Issued By', dataIndex: 'issued_by', key: 'issued_by' },
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      render: ( file ) => file && file.source_url && <Button icon="file" size="small" href={ file.source_url } target="_blank" />
    },
  ];

  const handleSave = ( records ) => {
    setFieldsValue( {
      meta: {
        licenses: map( records, ( record ) => omit( record, [ 'id', 'key' ] ) )
      }
    } );
    setIsSeamanTouched( true );
  };

  return (
    <DataCollection
      title="Licenses"
      columns={ columns }
      data={ seaman.meta.licenses }
      modalTitle="License"
      onChange={ handleSave }
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
            initialValue: parseMoment( initialValues.issue_date )
          } )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
        </Form.Item>,
        <Form.Item key="valid_until" label="Valid Until">
          { getFieldDecorator( 'valid_until', {
            initialValue: parseMoment( initialValues.valid_until )
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
