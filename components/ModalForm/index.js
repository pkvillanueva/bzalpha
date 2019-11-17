/**
 * External dependencies.
 */
import React, { useState, cloneElement } from 'react';
import { Modal, Form } from 'antd';

const ModalForm = Form.create()( ( props ) => {
  const { modalForm, title, form, children, onChange } = props;
  const { getFieldDecorator, getFieldsValue } = form;
  const [ visible, setVisible ] = useState( false );

  const handleOk = () => {
    let values = getFieldsValue();
    setVisible( false );
    if ( onChange ) {
      onChange( values );
    }
  };

  const handleCancel = () => {
    setVisible( false );
  };

  return (
    <>
      <Modal
        visible={ visible }
        title={ title }
        okText="Save"
        onOk={ handleOk }
        onCancel={ handleCancel }
        maskClosable={ false }
      >
        { modalForm( getFieldDecorator ) }
      </Modal>
      { cloneElement( children, { onClick: () => setVisible( true ) } ) }
    </>
  );
} );

export default ModalForm;
