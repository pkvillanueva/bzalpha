/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form } from '@ant-design/compatible';
import { Input, Select, Row, Col } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from './store/seaman';
import DataCollection from '~/components/DataCollection';

const EditEducations = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { educations } = meta;

	const columns = [
		{
			title: 'School',
			dataIndex: 'school',
			key: 'school',
		},
		{
			title: 'Level',
			dataIndex: 'level',
			key: 'level',
		},
		{
			title: 'From',
			dataIndex: 'from',
			key: 'from',
		},
		{
			title: 'To',
			dataIndex: 'to',
			key: 'to',
		},
	];

	const handleSave = ( { values, success, error } ) => {
		updateSeaman( {
			success,
			error,
			values: {
				meta: {
					educations: values,
				},
			},
		} );
	};

	return (
		<DataCollection
			columns={ columns }
			dataSource={ educations }
			onSave={ handleSave }
			modalProps={ {
				title: 'Education',
				form: modalForm,
			} }
		/>
	);
};

const modalForm = ( { getFieldDecorator }, initialValues ) => (
	<>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="school" label="School">
					{ getFieldDecorator( 'school', {
						initialValue: initialValues.school,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
			<Col lg={ 12 }>
				<Form.Item key="level" label="Level">
					{ getFieldDecorator( 'level', {
						initialValue: initialValues.level,
					} )( <Select showSearch style={ { width: '100%' } }>
						<Select.Option value="Higher">Higher</Select.Option>
						<Select.Option value="Secondary">Secondary</Select.Option>
						<Select.Option value="Vocational">Vocational</Select.Option>
					</Select> ) }
				</Form.Item>
			</Col>
		</Row>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="from" label="From">
					{ getFieldDecorator( 'from', {
						initialValue: initialValues.from,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
			<Col lg={ 12 }>
				<Form.Item key="to" label="To">
					{ getFieldDecorator( 'to', {
						initialValue: initialValues.to,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
		</Row>
	</>
);

export default EditEducations;
