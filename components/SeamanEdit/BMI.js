/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, Row, Col, Card } from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';

const ContactInformation = () => {
  const { seaman, getFieldDecorator } = useContext( SeamanContext );

  return (
    <Card title="BMI">
      <Row gutter={ [ 14 ] }>
        <Col md={ 8 }>
          <Form.Item label="Hair Color">
            { getFieldDecorator( 'hair_color', {
              initialValue: seaman.hair_color
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Height (cm)">
            { getFieldDecorator( 'height', {
              initialValue: seaman.height
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Collar Size (cm)">
            { getFieldDecorator( 'collar_size', {
              initialValue: seaman.collar_size
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 14 ] }>
        <Col md={ 8 }>
          <Form.Item label="Eyes Color">
            { getFieldDecorator( 'eyes_color', {
              initialValue: seaman.eyes_color
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Weight (kg)">
            { getFieldDecorator( 'weight', {
              initialValue: seaman.weight
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Waist Size (cm)">
            { getFieldDecorator( 'waist_size', {
              initialValue: seaman.waist_size
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 14 ] }>
        <Col md={ 8 }>
          <Form.Item label="Shoes Size">
            { getFieldDecorator( 'shoes_size', {
              initialValue: seaman.shoes_size
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default ContactInformation;
