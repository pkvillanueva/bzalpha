/**
 * External dependencies.
 */
import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Table, Divider } from 'antd';
import { filter, map, isEmpty } from 'lodash';

/**
 * Internal dependencies.
 */
import styles from './styles.less';

const DataCollection = Form.create()( ( props ) => {
	const {	onSave, initialData, form, modalProps = {}, tableProps = {}, buttonProps = {} } = props;
	const [ data, setData ] = useState( [] );
	const [ visible, setVisible ] = useState( false );
	const [ loading, setLoading ] = useState( false );
	const [ editIndex, setEditIndex ] = useState( -1 );
	let { columns = [] } = props;

	useEffect( () => {
		setData( initialData );
	}, [] );

	const isEditing = () => {
		return editIndex >= 0;
	};

	const getEditingValues = () => {
		return editIndex < 0 ? {} : data[ editIndex ];
	};

	const deleteRecord = ( index ) => {
		const records = filter( data, ( record, i ) => i !== index );

		if ( onSave ) {
			onSave( {
				values: records,
				success() {
					setData( records );
				},
			} );
		}
	};

	const handleAdd = () => {
		setVisible( true );
	};

	const handleSave = () => {
		const { getFieldsValue } = form;
		let values = getFieldsValue();
		const records = [ ...data ];

		if ( isEmpty( values ) ) {
			values = {};
		}

		if ( isEditing() ) {
			records.splice( editIndex, 1, values );
		} else {
			records.push( values );
		}

		if ( onSave ) {
			setLoading( true );

			onSave( {
				values: records,
				success() {
					setVisible( false );
					setData( records );
				},
				error() {
					setLoading( false );
				},
			} );
		}
	};

	const handleCancel = () => {
		setVisible( false );
	};

	const handleEdit = ( index ) => {
		setEditIndex( index );
		setVisible( true );
	};

	const handleDelete = ( index ) => {
		Modal.confirm( {
			title: 'Are you sure delete this row?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => deleteRecord( index ),
		} );
	};

	const afterClose = () => {
		setLoading( false );
		setEditIndex( -1 );
	};

	columns = [ ...columns, {
		title: 'Action',
		key: 'action',
		className: 'action',
		align: 'right',
		width: 125,
		render: ( action, record, index ) => (
			<>
				<Button type="link" size="small" onClick={ () => handleEdit( index ) }>Edit</Button>
				<Divider type="vertical" />
				<Button type="link" size="small" onClick={ () => handleDelete( index ) }>Delete</Button>
			</>
		),
	} ];

	return (
		<>
			<Modal
				maskClosable={ false }
				okText={ 'Save' }
				{ ...modalProps }
				title={ isEditing() ? `Edit ${ modalProps.title }` : `New ${ modalProps.title }` }
				onOk={ handleSave }
				onCancel={ handleCancel }
				visible={ visible }
				okButtonProps={ { loading } }
				cancelButtonProps={ { disabled: loading } }
				afterClose={ afterClose }
			>
				{ modalProps.form( form, getEditingValues() ) }
			</Modal>
			<Button
				className={ styles.newButton }
				block={ true }
				type="dashed"
				icon="plus"
				children={ 'Add New' }
				{ ...buttonProps }
				onClick={ handleAdd }
			/>
			<Table
				className={ styles.table }
				dataSource={ map( data, ( record, i ) => ( { key: i, ...record } ) ) }
				pagination={ false }
				scroll={ { x: 'max-content' } }
				{ ...tableProps }
				columns={ columns }
			/>
			<Button
				className={ styles.newButton }
				block={ true }
				type="dashed"
				icon="plus"
				children={ 'Add New' }
				{ ...buttonProps }
				onClick={ handleAdd }
			/>
		</>
	);
} );

export default DataCollection;
