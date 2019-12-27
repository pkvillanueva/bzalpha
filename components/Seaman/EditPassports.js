/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, DatePicker, Button, Select, Row, Col } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from './store/seaman';
import DataCollection from '~/components/DataCollection';
import FileUpload from '~/components/FileUpload';
import { isEmpty } from 'lodash';
import { dateFormat, parseMoment } from '~/utils/api';

const Passports = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { passports } = meta;

	const columns = [
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type' },
		{
			title: 'Number',
			dataIndex: 'num',
			key: 'num' },
		{
			title: 'Issue Date',
			dataIndex: 'issue_date',
			key: 'issue_date',
			render: ( date ) => dateFormat( date, 'll' ),
		},
		{
			title: 'Valid Till',
			dataIndex: 'valid_till',
			key: 'valid_till',
			render: ( date ) => dateFormat( date, 'll' ),
		},
		{
			title: 'Issued By',
			dataIndex: 'issued_by',
			key: 'issued_by' },
		{
			title: 'File',
			dataIndex: 'file',
			key: 'file',
			render: renderFile,
		},
	];

	const handleSave = ( { values, success, error } ) => {
		updateSeaman( {
			success,
			error,
			values: {
				meta: {
					passports: values,
				},
			},
		} );
	};

	return (
		<div style={ { marginBottom: 24 } }>
			<DataCollection
				dataSource={ passports }
				columns={ columns }
				onSave={ handleSave }
				modalProps={ {
					title: 'Passport',
					form: modalForm,
				} }
			/>
		</div>
	);
};

const modalForm = ( { getFieldDecorator }, initialValues ) => (
	<>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="type" label="Type">
					{ getFieldDecorator( 'type', {
						initialValue: initialValues.type,
					} )( <Select placeholder="Select type" style={ { width: '100%' } }>
						<Select.Option value="S/Book">S/Book</Select.Option>
						<Select.Option value="Travel Passport">Travel Passport</Select.Option>
						<Select.Option value="Travel Passport BIO">Travel Passport BIO</Select.Option>
						<Select.Option value="UA">UA</Select.Option>
						<Select.Option value="Inn">Inn</Select.Option>
						<Select.Option value="E-REG">E-REG</Select.Option>
					</Select> ) }
				</Form.Item>
			</Col>
			<Col lg={ 12 }>
				<Form.Item key="num" label="Number">
					{ getFieldDecorator( 'num', {
						initialValue: initialValues.num,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
		</Row>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="issue_date" label="Issue Date">
					{ getFieldDecorator( 'issue_date', {
						initialValue: parseMoment( initialValues.issue_date ),
					} )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
				</Form.Item>
			</Col>
			<Col lg={ 12 }>
				<Form.Item key="valid_till" label="Valid Till">
					{ getFieldDecorator( 'valid_till', {
						initialValue: parseMoment( initialValues.valid_till ),
					} )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
				</Form.Item>
			</Col>
		</Row>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="issued_by" label="Issued By">
					{ getFieldDecorator( 'issued_by', {
						initialValue: initialValues.issued_by,
					} )( <Input /> ) }
				</Form.Item>
			</Col>
			<Col lg={ 12 }>
				<Form.Item key="file" label="File">
					{ getFieldDecorator( 'file', {
						initialValue: initialValues.file,
						valuePropName: 'file',
						getValueFromEvent: ( file ) => ! isEmpty( file ) ? file : {},
					} )( <FileUpload /> ) }
				</Form.Item>
			</Col>
		</Row>
	</>
);

const renderFile = ( file ) => {
	return (
		file && file.source_url && <Button icon="file" size="small" href={ file.source_url } target="_blank" />
	);
};

export default Passports;
