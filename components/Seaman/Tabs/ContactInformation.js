/**
 * External dependencies.
 */
import React, { useState, useContext } from 'react';
import { Form, Input, Select, Row, Col, Card } from 'antd';
import { map, filter, sortBy } from 'lodash';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '../store/seaman';
import states from '~/utils/states';
import cities from '~/utils/cities';

const getCities = ( value ) => {
	const state = filter( states, [ 'name', value ] );
	if ( ! state.length ) {
		return [];
	}

	const options = filter( cities, [ 'province', state[ 0 ].key ] );
	if ( ! options.length ) {
		return [];
	}

	return sortBy( options, [ 'name' ] );
};

const ContactInformation = () => {
	const { seaman, getFieldDecorator, setFieldsValue } = useContext( SeamanContext );

	const [ selectCities, setSelectCities ] = useState( getCities( seaman.meta.state ) );

	const handleState = ( value ) => {
		setSelectCities( getCities( value ) );
		setFieldsValue( {
			meta: {
				city: '',
			},
		} );
	};

	return (
		<Card title="Contact information">
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="Country">
						{ getFieldDecorator( 'meta.country', {
							rules: [ { required: true, message: 'Country is required.' } ],
							initialValue: seaman.meta.country,
						} )( <Select style={ { width: '100%' } } showSearch>
							<Select.Option value="Philippines">Philippines</Select.Option>
						</Select> ) }
					</Form.Item>
				</Col>
				<Col md={ 16 }>
					<Form.Item label="Address">
						{ getFieldDecorator( 'meta.address', {
							rules: [ { required: true, message: 'Address is required.' } ],
							initialValue: seaman.meta.address,
						} )( <Input rows={ 4 } /> ) }
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="State">
						{ getFieldDecorator( 'meta.state', {
							rules: [ { required: true, message: 'State is required.' } ],
							initialValue: seaman.meta.state,
						} )( <Select showSearch style={ { width: '100%' } } onChange={ handleState }>
							{ map( sortBy( states, [ 'name' ] ), ( state ) => (
								<Select.Option value={ state.name } key={ state.name }>{ state.name }</Select.Option>
							) ) }
						</Select> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="City">
						{ getFieldDecorator( 'meta.city', {
							rules: [ { required: true, message: 'City is required.' } ],
							initialValue: seaman.meta.city,
						} )( <Select showSearch style={ { width: '100%' } }>
							{ map( selectCities, ( city ) => (
								<Select.Option value={ city.name } key={ city.name }>{ city.name }</Select.Option>
							) ) }
						</Select> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Zip">
						{ getFieldDecorator( 'meta.zip', {
							rules: [ { required: true, message: 'Zip is required.' } ],
							initialValue: seaman.meta.zip,
						} )( <Input type="number" /> ) }
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="Tel. Number">
						{ getFieldDecorator( 'meta.tel', {
							initialValue: seaman.meta.tel,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Phone Number">
						{ getFieldDecorator( 'meta.phone', {
							rules: [ { required: true, message: 'Phone number is required.' } ],
							initialValue: seaman.meta.phone,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Email">
						{ getFieldDecorator( 'meta.email', {
							rules: [ { type: 'email', message: 'The input is not valid E-mail!' } ],
							initialValue: seaman.meta.email,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="Skype">
						{ getFieldDecorator( 'meta.skype', {
							initialValue: seaman.meta.skype,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
			</Row>
		</Card>
	);
};

export default ContactInformation;
