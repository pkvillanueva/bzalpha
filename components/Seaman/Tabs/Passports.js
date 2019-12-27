/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, DatePicker, Button, Select } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '../store/seaman';
import DataCollection from '~/components/DataCollection';
import FileUpload from '~/components/FileUpload';
import { isEmpty, omit, map } from 'lodash';
import { dateFormat, parseMoment } from '~/utils/api';

const Passports = () => {
	const { seaman, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );

	const columns = [
		{ title: 'Type', dataIndex: 'type', key: 'type' },
		{ title: 'Number', dataIndex: 'num', key: 'num' },
		{ title: 'Issue Date', dataIndex: 'issue_date', key: 'issue_date', render: ( date ) => dateFormat( date ) },
		{ title: 'Valid Till', dataIndex: 'valid_till', key: 'valid_till', render: ( date ) => dateFormat( date ) },
		{ title: 'Issued By', dataIndex: 'issued_by', key: 'issued_by' },
		{
			title: 'File',
			dataIndex: 'file',
			key: 'file',
			render: ( file ) => file && file.source_url && <Button icon="file" size="small" href={ file.source_url } target="_blank" />,
		},
	];

	const handleSave = ( records ) => {
		setFieldsValue( {
			meta: {
				passports: map( records, ( record ) => omit( record, [ 'id', 'key' ] ) ),
			},
		} );
		setIsSeamanTouched( true );
	};

	return (
		<div style={ { marginBottom: 24 } }>
			<DataCollection
				title="Passports"
				columns={ columns }
				data={ seaman.meta.passports }
				modalTitle="Passport"
				onChange={ handleSave }
				modalForm={ ( getFieldDecorator, initialValues ) => [
					<Form.Item key="type" label="Type">
						{ getFieldDecorator( 'type', {
							initialValue: initialValues.type,
						} )( <Select placeholder="Select type" style={ { width: '100%' } }>
							<Select.Option value="S/Book">S/Book</Select.Option>
							<Select.Option value="Travel Passport">Travel Passport</Select.Option>
							<Select.Option value="Travel Passport BIO">Travel Passport BIO</Select.Option>
							<Select.Option value="UA">UA</Select.Option>
							<Select.Option value="Inn">Inn</Select.Option>
							<Select.Option value="E-REG (Manila)">E-REG (Manila)</Select.Option>
						</Select> ) }
					</Form.Item>,
					<Form.Item key="num" label="Number">
						{ getFieldDecorator( 'num', {
							initialValue: initialValues.num,
						} )( <Input /> ) }
					</Form.Item>,
					<Form.Item key="issue_date" label="Issue Date">
						{ getFieldDecorator( 'issue_date', {
							initialValue: parseMoment( initialValues.issue_date ),
						} )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
					</Form.Item>,
					<Form.Item key="valid_till" label="Valid Till">
						{ getFieldDecorator( 'valid_till', {
							initialValue: parseMoment( initialValues.valid_till ),
						} )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
					</Form.Item>,
					<Form.Item key="issued_by" label="Issued By">
						{ getFieldDecorator( 'issued_by', {
							initialValue: initialValues.issued_by,
						} )( <Input /> ) }
					</Form.Item>,
					<Form.Item key="file" label="File">
						{ getFieldDecorator( 'file', {
							initialValue: initialValues.file,
							valuePropName: 'file',
							getValueFromEvent: ( file ) => ! isEmpty( file ) ? file : {},
						} )( <FileUpload /> ) }
					</Form.Item>,
				] }
			/>
		</div>
	);
};

export default Passports;
