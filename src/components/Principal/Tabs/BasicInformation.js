/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Input, Select } from 'antd';
import { map } from 'lodash';
import ReactCountryFlag from 'react-country-flag';

/**
 * Internal dependencies.
 */
import { PrincipalContext } from '~/store/principal';
import { countries } from '~/utils/countries';

const BasicInformation = () => {
	const { principal, getFieldDecorator, getFieldValue } = useContext( PrincipalContext );
	const { meta } = principal;

	return (
		<Card>
			<Form style={ { maxWidth: '400px', margin: '0 auto' } }>
				<Form.Item label="Name">
					{ getFieldDecorator( 'name', {
						initialValue: principal.name,
						rules: [
							{
								required: true,
								message: 'Name is required!',
							},
						],
					} )(
						<Input />
					) }
				</Form.Item>
				<Form.Item label="Country">
					{ getFieldDecorator( 'meta.country', {
						initialValue: meta.country,
						rules: [ { required: true, message: 'Country is required.' } ],
					} )(
						<Select
							placeholder="Select country"
							filterOption={ true }
							optionFilterProp="children"
							showSearch={ true }
						>
							{ map( countries, ( country ) => <Select.Option key={ country.code } value={ country.code }>{ country.name }</Select.Option> ) }
						</Select>
					) }
					{ getFieldValue( 'country' ) && <ReactCountryFlag code={ getFieldValue( 'country' ).toLowerCase() } svg /> }
				</Form.Item>
			</Form>
		</Card>
	);
};

export default BasicInformation;
