/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { Button, Modal, Form, Popconfirm, Card, Table, Divider } from 'antd';

/**
 * Internal dependencies.
 */
import { map, filter, find, isEmpty } from 'lodash';
import styles from './styles.less';

const DataCollection = Form.create()( ( props ) => {
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
    const save = filter( records, ( r ) => r.id !== id );
    setRecords( save );
    onChange( save );
  };

  if ( columns[ columns.length - 1 ].key !== 'action' ) {
    columns.push( {
      title: 'Action',
      key: 'action',
      className: 'action',
      align: 'center',
      width: 125,
      render: ( r ) => (
        <>
          <a onClick={ () => handleEdit( r.id ) }>Edit</a>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={ () => handleDelete( r.id ) }>
            <a>Delete</a>
          </Popconfirm>
        </>
      )
    } );
  }

  return (
    <>
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
      <Card title={ title }>
        <Table className={ styles.table } dataSource={ records } columns={ columns } pagination={ false } scroll={ { x: 'max-content' } } { ...table } />
        <Button className={ styles.newButton } block type="dashed" icon="plus" onClick={ handleNew }>Add New</Button>
      </Card>
    </>
  );
} );

export default DataCollection;
