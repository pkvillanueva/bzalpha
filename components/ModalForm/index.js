/**
 * External dependencies.
 */
import React, { useState, cloneElement } from 'react';
import { Modal, Form } from 'antd';

const ModalForm = Form.create()( ( props ) => {
  const { modalForm, title, form, children, onChange, onSave, onCancel, ...restProps } = props;
  const { getFieldDecorator, validateFields } = form;
  const [ visible, setVisible ] = useState( false );
  const [ loading, setLoading ] = useState( false );

  const handleOk = () => {
    validateFields( ( errors, values ) => {
      if ( errors ) {
        return;
      }

      setLoading( true );

      if ( onChange ) {
        onChange( values, () => {
          setVisible( false );
          setLoading( false );
        } );
      } else if ( onSave ) {
        onSave( { values, form }, () => {
          setVisible( false );
          setLoading( false );
        }, () => {
          setLoading( false );
        } );
      } else {
        setVisible( false );
      }
    } );
  };

  const handleCancel = () => {
    setVisible( false );

    if ( onCancel ) {
      onCancel();
    }
  };

  return (
    <>
      <Modal
        { ...restProps }
        visible={ visible }
        title={ title }
        okText="Save"
        onOk={ handleOk }
        onCancel={ handleCancel }
        maskClosable={ false }
        okButtonProps={ {
          loading: loading
        } }
      >
        { modalForm( getFieldDecorator, form ) }
      </Modal>
      { cloneElement( children, { onClick: () => setVisible( true ) } ) }
    </>
  );
} );

export default ModalForm;
