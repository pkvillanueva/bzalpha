/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, DatePicker, Button, Row, Col } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from './store/seaman';
import DataCollection from '~/components/DataCollection';
import FileUpload from '~/components/FileUpload';
import { isEmpty } from 'lodash';
import { dateFormat, parseMoment } from '~/utils/api';

const EditVisas = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { visas } = meta;

	const columns = [
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Number',
			dataIndex: 'num',
			key: 'num',
		},
		{
			title: 'Issue Date',
			dataIndex: 'issue_date',
			key: 'issue_date',
			render: dateFormat,
		},
		{
			title: 'Valid Till',
			dataIndex: 'valid_till',
			key: 'valid_till',
			render: dateFormat,
		},
		{
			title: 'Issued By',
			dataIndex: 'issued_by',
			key: 'issued_by',
		},
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
					visas: values,
				},
			},
		} );
	};

	return (
		<DataCollection
			columns={ columns }
			dataSource={ visas }
			onSave={ handleSave }
			modalProps={ {
				title: 'VISA',
				form: modalForm,
			} }
		/>
	);
};

const modalForm = ( { getFieldDecorator }, initialValues ) => (
	<>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="type" label="Type">
					{ getFieldDecorator( 'type', {
						initialValue: initialValues.type,
					} )( <Input /> ) }
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

export default EditVisas;
