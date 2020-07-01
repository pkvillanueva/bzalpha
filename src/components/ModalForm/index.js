/**
 * External dependencies.
 */
import React, { useState, cloneElement } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal } from 'antd';

const ModalForm = Form.create()( ( props ) => {
	const { modalForm, title, form, children, onChange, onSave, onCancel, okText, ...restProps } = props;
	const { validateFields, resetFields } = form;
	const [ visible, setVisible ] = useState( false );
	const [ loading, setLoading ] = useState( false );

	const handleOk = () => {
		validateFields( ( errors, values ) => {
			if ( errors ) {
				return;
			}

			if ( onChange ) {
				onChange( {
					values,
					done() {
						setVisible( false );
					},
				} );
			} else if ( onSave ) {
				setLoading( true );

				onSave( {
					values,
					form,
					success() {
						setVisible( false );
					},
					error() {
						setLoading( false );
					},
				} );
			} else {
				setVisible( false );
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

	const afterClose = () => {
		setLoading( false );
	};

	return (
		<>
			<Modal
				{ ...restProps }
				afterClose={ afterClose }
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
				{ modalForm( form ) }
			</Modal>
			{ cloneElement( children, { onClick: () => setVisible( true ) } ) }
		</>
	);
} );

export default ModalForm;
