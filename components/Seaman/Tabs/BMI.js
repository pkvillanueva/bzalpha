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
      <Row gutter={ [ 32 ] }>
        <Col md={ 8 }>
          <Form.Item label="Hair Color">
            { getFieldDecorator( 'meta.hair_color', {
              initialValue: seaman.meta.hair_color
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Height (cm)">
            { getFieldDecorator( 'meta.height', {
              initialValue: seaman.meta.height
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Collar Size (cm)">
            { getFieldDecorator( 'meta.collar_size', {
              initialValue: seaman.meta.collar_size
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 32 ] }>
        <Col md={ 8 }>
          <Form.Item label="Eyes Color">
            { getFieldDecorator( 'meta.eyes_color', {
              initialValue: seaman.meta.eyes_color
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Weight (kg)">
            { getFieldDecorator( 'meta.weight', {
              initialValue: seaman.meta.weight
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Waist Size (cm)">
            { getFieldDecorator( 'meta.waist_size', {
              initialValue: seaman.meta.waist_size
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 32 ] }>
        <Col md={ 8 }>
          <Form.Item label="Shoes Size">
            { getFieldDecorator( 'meta.shoes_size', {
              initialValue: seaman.meta.shoes_size
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default ContactInformation;
