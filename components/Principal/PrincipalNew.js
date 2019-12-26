/**
 * External dependencies.
 */
import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
const { token } = parseCookies();
import { map } from 'lodash';
import { Modal, Form, Input, Select } from 'antd';
import ReactCountryFlag from 'react-country-flag';

/**
 * Internal dependencies.
 */
import { countries } from '~/utils/countries';

const PrincipalNew = Form.create()( ( { form, visible, onCancel } ) => {
	const { getFieldDecorator, validateFields, resetFields, getFieldValue } = form;
	const [ isLoading, setIsLoading ] = useState( false );

	const handleSave = () => {
		validateFields( ( err, values ) => {
			if ( err ) {
				return;
			}

			setIsLoading( true );
			values = {
				...values,
				status: 'publish',
			};

			axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/principal`, values, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ token }`,
				},
			} )
				.then( ( res ) => {
					setTimeout( () => {
						Router.push( `/principal/${ res.data.id }` );
					}, 1500 );
				} )
				.catch( () => {
					setIsLoading( false );
				} );
		} );
	};

	const handleCancel = () => {
		resetFields();

		if ( ! isLoading && onCancel ) {
			onCancel();
		}
	};

	return (
		<Modal
			visible={ visible }
			title="Create new principal"
			okText={ 'Create' }
			maskClosable={ ! isLoading }
			onCancel={ handleCancel }
			onOk={ handleSave }
			okButtonProps={ { loading: isLoading } }
		>
			<Form layout="horizontal">
				<Form.Item label="Name">
					{ getFieldDecorator( 'name', {
						rules: [ { required: true, message: 'Name is required.' } ],
					} )( <Input placeholder="Enter name" /> ) }
				</Form.Item>
				<Form.Item label="Country">
					{ getFieldDecorator( 'meta.country', {
						rules: [ { required: true, message: 'Country is required.' } ],
					} )(
						<Select placeholder="Select country" showSearch>
							{ map( countries, ( country ) => <Select.Option key={ country.code } value={ country.code }>{ country.name }</Select.Option> ) }
						</Select>
					) }
					{ getFieldValue( 'meta.country' ) && <ReactCountryFlag code={ getFieldValue( 'meta.country' ).toLowerCase() } svg /> }
				</Form.Item>
			</Form>
		</Modal>
	);
} );

export default PrincipalNew;
