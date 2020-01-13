/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Card, Input, Select } from 'antd';
import { map, mapValues } from 'lodash';
import ReactCountryFlag from 'react-country-flag';

/**
 * Internal dependencies.
 */
import SelectFetch from '~/components/SelectFetch';
import { VesselContext } from '../store/vessel';
import { countries } from '~/utils/countries';
import { vesselType } from '~/utils/vessel';

const Information = () => {
	const { vessel, getFieldDecorator, getFieldValue } = useContext( VesselContext );
	const { meta } = vessel;

	return (
		<Card>
			<Form style={ { maxWidth: '400px', margin: '0 auto' } }>
				<Form.Item label="Owner">
					{ getFieldDecorator( 'principal', {
						initialValue: mapValues( vessel.principal, 'id' ),
						rules: [ { required: true, message: 'Owner is required.' } ],
					} )(
						<SelectFetch
							initialData={ vessel.principal }
							dataKey="id"
							labelKey="name"
							action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/principal` }
						/>
					) }
				</Form.Item>
				<Form.Item label="Name">
					{ getFieldDecorator( 'title', {
						initialValue: vessel.title,
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
				<Form.Item label="Type">
					{ getFieldDecorator( 'meta.type', {
						initialValue: meta.type,
					} )(
						<Select showSearch>
							{ map( vesselType, ( type ) => <Select.Option key={ type.value } value={ type.value }>{ type.name }</Select.Option> ) }
						</Select>
					) }
				</Form.Item>
				<Form.Item label="Flag">
					{ getFieldDecorator( 'meta.flag', {
						initialValue: meta.flag,
					} )(
						<Select
							filterOption={ true }
							optionFilterProp="children"
							showSearch={ true }
						>
							{ map( countries, ( country ) => <Select.Option key={ country.code } value={ country.code }>{ country.name }</Select.Option> ) }
						</Select>
					) }
					{ getFieldValue( 'flag' ) && <ReactCountryFlag code={ getFieldValue( 'flag' ).toLowerCase() } svg /> }
				</Form.Item>
				<Form.Item label="(IMO) International Maritime Organization">
					{ getFieldDecorator( 'meta.imo', {
						initialValue: meta.imo,
					} )(
						<Input />
					) }
				</Form.Item>
				<Form.Item label="(GRT) Gross Register Tonnage">
					{ getFieldDecorator( 'meta.grt', {
						initialValue: meta.grt,
					} )(
						<Input />
					) }
				</Form.Item>
				<Form.Item label="(DWT) Deadweight Tonnage">
					{ getFieldDecorator( 'meta.dwt', {
						initialValue: meta.dwt,
					} )(
						<Input />
					) }
				</Form.Item>
				<Form.Item label="(HP) Horse Power">
					{ getFieldDecorator( 'meta.hp', {
						initialValue: meta.hp,
					} )(
						<Input />
					) }
				</Form.Item>
				<Form.Item label="(KW) Kilowatt">
					{ getFieldDecorator( 'meta.kw', {
						initialValue: meta.kw,
					} )(
						<Input />
					) }
				</Form.Item>
				<Form.Item label="Engine">
					{ getFieldDecorator( 'meta.engine', {
						initialValue: meta.engine,
					} )(
						<Input />
					) }
				</Form.Item>
			</Form>
		</Card>
	);
};

export default Information;
