/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { FileOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, DatePicker, Button, Row, Col } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from './store/seaman';
import DataCollection from '~/components/DataCollection';
import FileUpload from '~/components/FileUpload';
import { isEmpty } from 'lodash';
import { parseMoment, dateFormat } from '~/utils/api';

const Licenses = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { licenses } = meta;

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
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
			render: ( date ) => dateFormat( date, 'll' ),
		},
		{
			title: 'Valid Until',
			dataIndex: 'valid_until',
			key: 'valid_until',
			render: ( date ) => dateFormat( date, 'll' ),
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
					licenses: values,
				},
			},
		} );
	};

	return (
		<DataCollection
			columns={ columns }
			dataSource={ licenses }
			onSave={ handleSave }
			modalProps={ {
				title: 'License',
				form: modalForm,
			} }
		/>
	);
};

const modalForm = ( { getFieldDecorator }, initialValues ) => (
	<>
		<Row gutter={ 32 }>
			<Col lg={ 12 }>
				<Form.Item key="name" label="Name">
					{ getFieldDecorator( 'name', {
						initialValue: initialValues.name,
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
				<Form.Item key="valid_until" label="Valid Until">
					{ getFieldDecorator( 'valid_until', {
						initialValue: parseMoment( initialValues.valid_until ),
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
	return file && file.source_url && <Button icon={<FileOutlined />} size="small" href={ file.source_url } target="_blank" />;
};

export default Licenses;
