/**
 * External dependencies.
 */
import React, { useState, cloneElement } from 'react';
import { Modal, Form } from 'antd';

const ModalForm = Form.create()( ( props ) => {
	const { modalForm, title, form, children, onChange, onSave, onCancel, okText, ...restProps } = props;
	const { getFieldDecorator, validateFields, resetFields } = form;
	const [ visible, setVisible ] = useState( false );
	const [ loading, setLoading ] = useState( false );

	const handleOk = () => {
		validateFields( ( errors, values ) => {
			if ( errors ) {
				return;
			}

			setLoading( true );

			if ( onChange ) {
				onChange( {
					values,
					done() {
						setVisible( false );
						setLoading( false );
					},
				} );
			} else if ( onSave ) {
				onSave( {
					values,
					form,
					success() {
						setVisible( false );
						setLoading( false );
					},
					error() {
						setLoading( false );
					},
					done() {
						setLoading( false );
					},
				} );
			} else {
				setVisible( false );
				setLoading( false );
			}
		} );
	};

	const handleCancel = () => {
		setVisible( false );
		resetFields();

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
				okText={ okText || 'Save' }
				onOk={ handleOk }
				onCancel={ handleCancel }
				maskClosable={ false }
				cancelButtonProps={ {
					disabled: loading,
				} }
				okButtonProps={ {
					loading,
				} }
			>
				{ modalForm( getFieldDecorator, form ) }
			</Modal>
			{ cloneElement( children, { onClick: () => setVisible( true ) } ) }
		</>
	);
} );

export default ModalForm;
