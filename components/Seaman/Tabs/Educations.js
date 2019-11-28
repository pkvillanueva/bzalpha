/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, Select } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import DataCollection from '~/components/DataCollection';

const Educations = () => {
  const { seaman, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );

  const columns = [
    { title: 'School', dataIndex: 'school', key: 'school' },
    { title: 'Level', dataIndex: 'level', key: 'level' },
    { title: 'From', dataIndex: 'from', key: 'from' },
    { title: 'To', dataIndex: 'to', key: 'to' }
  ];

  const handleSave = ( records ) => {
    setFieldsValue( { educations: records } );
    setIsSeamanTouched( true );
  };

  return (
    <DataCollection
      title="Educations"
      columns={ columns }
      data={ seaman.educations }
      modalTitle="Education"
      onChange={ handleSave }
      modalForm={ ( getFieldDecorator, initialValues ) => [
        <Form.Item key="school" label="School">
          { getFieldDecorator( 'school', {
            initialValue: initialValues.school
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="level" label="Level">
          { getFieldDecorator( 'level', {
            initialValue: initialValues.level
          } )( <Select showSearch style={ { width: '100%' } }>
            <Select.Option value="Higher">Higher</Select.Option>
            <Select.Option value="Secondary">Secondary</Select.Option>
            <Select.Option value="Vocational">Vocational</Select.Option>
          </Select> ) }
        </Form.Item>,
        <Form.Item key="from" label="From">
          { getFieldDecorator( 'from', {
            initialValue: initialValues.from
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="to" label="To">
          { getFieldDecorator( 'to', {
            initialValue: initialValues.to
          } )( <Input /> ) }
        </Form.Item>
      ] }
    />
  );
};

export default Educations;
