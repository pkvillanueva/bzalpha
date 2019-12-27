/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, Row, Col, Card } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from './store/seaman';

const ContactInformation = () => {
	const { seaman, getFieldDecorator } = useContext( SeamanContext );
	const { meta } = seaman;

	return (
		<Card title="BMI">
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="Hair Color">
						{ getFieldDecorator( 'meta.hair_color', {
							initialValue: meta.hair_color,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Height (cm)">
						{ getFieldDecorator( 'meta.height', {
							initialValue: meta.height,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Collar Size (cm)">
						{ getFieldDecorator( 'meta.collar_size', {
							initialValue: meta.collar_size,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="Eyes Color">
						{ getFieldDecorator( 'meta.eyes_color', {
							initialValue: meta.eyes_color,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Weight (kg)">
						{ getFieldDecorator( 'meta.weight', {
							initialValue: meta.weight,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
				<Col md={ 8 }>
					<Form.Item label="Waist Size (cm)">
						{ getFieldDecorator( 'meta.waist_size', {
							initialValue: meta.waist_size,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={ [ 32 ] }>
				<Col md={ 8 }>
					<Form.Item label="Shoes Size">
						{ getFieldDecorator( 'meta.shoes_size', {
							initialValue: meta.shoes_size,
						} )( <Input /> ) }
					</Form.Item>
				</Col>
			</Row>
		</Card>
	);
};

export default ContactInformation;
