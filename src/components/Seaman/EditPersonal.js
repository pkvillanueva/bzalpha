/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form } from '@ant-design/compatible';
import { Input, Select, DatePicker, Row, Col, Card } from 'antd';
import { map } from 'lodash';

/**
 * Internal dependencies.
 */
import { SeamanContext } from './store/seaman';
import nationalities from '~/utils/nationalities';
import { parseMoment } from '~/utils/api';

const PersonalInformation = () => {
	const { seaman, getFieldDecorator } = useContext( SeamanContext );
	const { meta } = seaman;

	return (
		<Card title="Personal Information" style={ { marginBottom: 32 } }>
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="First Name">
						{ getFieldDecorator( 'meta.first_name', {
							rules: [ { required: true, message: 'First name is required.' } ],
							initialValue: meta.first_name,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Middle Name">
						{ getFieldDecorator( 'meta.middle_name', {
							initialValue: meta.middle_name,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Last Name">
						{ getFieldDecorator( 'meta.last_name', {
							rules: [ { required: true, message: 'Last name is required.' } ],
							initialValue: meta.last_name,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="Gender">
						{ getFieldDecorator( 'meta.gender', {
							rules: [ { required: true, message: 'Gender is required.' } ],
							initialValue: meta.gender,
						} )( <Select showSearch style={ { width: '100%' } }>
							<Select.Option value="Male">Male</Select.Option>
							<Select.Option value="Female">Female</Select.Option>
						</Select> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Nationality">
						{ getFieldDecorator( 'meta.nationality', {
							rules: [ { required: true, message: 'Nationality is required.' } ],
							initialValue: meta.nationality,
						} )( <Select showSearch style={ { width: '100%' } }>
							{ map( nationalities, ( label ) => <Select.Option value={ label } key={ label }>{ label }</Select.Option> ) }
						</Select> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Marital Status">
						{ getFieldDecorator( 'meta.marital_status', {
							rules: [ { required: true, message: 'Marital status is required.' } ],
							initialValue: meta.marital_status,
						} )( <Select showSearch style={ { width: '100%' } }>
							<Select.Option value="Single">Single</Select.Option>
							<Select.Option value="Married">Married</Select.Option>
							<Select.Option value="Engaged">Engaged</Select.Option>
							<Select.Option value="Widowed">Widowed</Select.Option>
							<Select.Option value="Divorced">Divorced</Select.Option>
						</Select> ) }
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="Date of Birth">
						{ getFieldDecorator( 'meta.birth_date', {
							rules: [ { required: true, message: 'Date of birth is required.' } ],
							initialValue: parseMoment( meta.birth_date ),
						} )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Place of Birth">
						{ getFieldDecorator( 'meta.birth_place', {
							rules: [ { required: true, message: 'Place of birth is required.' } ],
							initialValue: meta.birth_place,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
			</Row>
		</Card>
	);
};

export default PersonalInformation;
