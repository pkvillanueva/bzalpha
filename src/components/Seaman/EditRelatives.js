/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form } from '@ant-design/compatible';
import { Input, Row, Col } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from './store/seaman';
import DataCollection from '~/components/DataCollection';

const EditRelatives = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { relatives } = meta;

	const columns = [
		{
			title: 'First Name',
			dataIndex: 'first_name',
			key: 'first_name',
		},
		{
			title: 'Last Name',
			dataIndex: 'last_name',
			key: 'last_name',
		},
		{
			title: 'Contact',
			dataIndex: 'contact',
			key: 'contact',
		},
		{
			title: 'Kin',
			dataIndex: 'kin',
			key: 'kin',
		},
	];

	const handleSave = ( { values, success, error } ) => {
		updateSeaman( {
			success,
			error,
			values: {
				meta: {
					relatives: values,
				},
			},
		} );
	};

	return (
		<DataCollection
			columns={ columns }
			dataSource={ relatives }
			onSave={ handleSave }
			modalProps={ {
				title: 'Relative',
				form: modalForm,
			} }
		/>
	);
};

const modalForm = ( { getFieldDecorator }, initialValues ) => (
	<>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="first_name" label="First Name">
					{ getFieldDecorator( 'first_name', {
						initialValue: initialValues.first_name,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
			<Col lg={ 12 }>
				<Form.Item key="last_name" label="Last Name">
					{ getFieldDecorator( 'last_name', {
						initialValue: initialValues.last_name,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
		</Row>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="contact" label="Contact">
					{ getFieldDecorator( 'contact', {
						initialValue: initialValues.contact,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
			<Col lg={ 12 }>
				<Form.Item key="kin" label="Kin">
					{ getFieldDecorator( 'kin', {
						initialValue: initialValues.kin,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
		</Row>
	</>
);

export default EditRelatives;
