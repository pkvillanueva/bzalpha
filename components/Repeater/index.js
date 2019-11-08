/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { Button, Modal, Form, Popconfirm, Card, Table } from 'antd';
import moment from 'moment';

/**
 * Internal dependencies.
 */
import { map, filter, find, isEmpty } from 'lodash';
import styles from './styles.less';

const Repeater = Form.create( { name: 'relatives' } )( ( props ) => {
  const { title, data, columns, modalTitle, modalForm, form, onChange, formatRecord, ...table } = props;
  const { getFieldDecorator, getFieldsValue, resetFields } = form;
  const [ records, setRecords ] = useState( map( data, ( record, id ) => ( { id: id, key: id, ...record } ) ) );
  const [ visible, setVisible ] = useState( false );
  const [ edit, setEdit ] = useState( {} );

  const handleOk = () => {
    let save = [];
    let values = getFieldsValue();

    if ( formatRecord ) {
      values = formatRecord( values );
    }

    if ( ! isEmpty( edit ) ) {
      const id = edit.id;
      save = [ ...records ];
      save.splice( id, 1, { id: id, key: id, ...values } );
    } else {
      const id = records.length;
      save = [ ...records, { id: id, key: id, ...values } ];
    }

    setRecords( save );
    onChange( save );
    setVisible( false );
    setEdit( {} );
    resetFields();
  };

  const handleCancel = () => {
    resetFields();
    setVisible( false );
  };

  const handleNew = () => {
    setVisible( true );
    setEdit( {} );
    resetFields();
  };

  const handleEdit = ( id ) => {
    setEdit( find( records, { id: id } ) );
    setVisible( true );
  };

  const handleDelete = ( id ) => {
    const save = filter( records, ( record ) => record.id !== id );
    setRecords( save );
    onChange( save );
  };

  const extra = [
    <Button key="add" type="primary" icon="plus" onClick={ handleNew }>Add New</Button>
  ];

  if ( columns[ columns.length - 1 ].key !== 'action' ) {
    columns.push( {
      title: 'Action',
      key: 'action',
      className: 'action',
      width: 90,
      render: ( record ) => [
        <Button icon="edit" size="small" key="edit" onClick={ () => handleEdit( record.id ) } />,
        <Popconfirm title="Sure to delete?" onConfirm={ () => handleDelete( record.id ) } key="delete">
          <Button icon="delete" size="small" />
        </Popconfirm>
      ]
    } );
  }

  return (
    <div className="app-repeater">
      <Modal
        visible={ visible }
        title={ ! isEmpty( edit ) ? `Edit ${ modalTitle }` : `New ${ modalTitle }` }
        okText="Save"
        onOk={ handleOk }
        onCancel={ handleCancel }
        maskClosable={ false }
      >
        { modalForm( getFieldDecorator, edit ) }
      </Modal>
      <Card className={ styles.repeater } title={ title } extra={ extra }>
        <Table dataSource={ records } columns={ columns } size="middle" pagination={ false } { ...table } />
      </Card>
    </div>
  );
} );

export default Repeater;
