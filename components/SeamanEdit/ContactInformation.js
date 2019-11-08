/**
 * External dependencies.
 */
import React, { useState, useContext } from 'react';
import { Form, Input, Select, Row, Col, Card } from 'antd';
import { map, filter, sortBy } from 'lodash';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import states from '~/utils/states';
import cities from '~/utils/cities';

const getCities = ( value ) => {
  const state = filter( states, [ 'name', value ] );
  if ( ! state.length ) {
    return [];
  }

  const options = filter( cities, [ 'province', state[0].key ] );
  if ( ! options.length ) {
    return [];
  }

  return sortBy( options, [ 'name' ] );
};

const ContactInformation = () => {
  const { seaman, getFieldDecorator, setFieldsValue } = useContext( SeamanContext );

  const [ selectCities, setSelectCities ] = useState( getCities( seaman.state ) );

  const handleState = ( value ) => {
    setSelectCities( getCities( value ) );
    setFieldsValue( { city: '' } );
  };

  return (
    <Card title="Contact information">
      <Row gutter={ [ 14 ] }>
        <Col md={ 8 }>
          <Form.Item label="Country">
            { getFieldDecorator( 'country', {
              rules: [ { required: true, message: "Country is required." } ],
              initialValue: seaman.country
            } )( <Select showSearch>
              <Select.Option value="Philippines">Philippines</Select.Option>
            </Select> ) }
          </Form.Item>
        </Col>
        <Col md={ 16 }>
          <Form.Item label="Address">
            { getFieldDecorator( 'address', {
              rules: [ { required: true, message: "Address is required." } ],
              initialValue: seaman.address
            } )( <Input rows={ 4 }/> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 14 ] }>
        <Col md={ 8 }>
          <Form.Item label="State">
            { getFieldDecorator( 'state', {
              rules: [ { required: true, message: "State is required." } ],
              initialValue: seaman.state
            } )( <Select showSearch style={ { width: '100%' } } onChange={ handleState }>
              { map( sortBy( states, [ 'name' ] ), ( state ) => (
                <Select.Option value={ state.name } key={ state.name }>{ state.name }</Select.Option>
              ) ) }
            </Select> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="City">
            { getFieldDecorator( 'city', {
              rules: [ { required: true, message: "City is required." } ],
              initialValue: seaman.city
            } )( <Select showSearch style={ { width: '100%' } }>
              { map( selectCities, ( city ) => (
                <Select.Option value={ city.name } key={ city.name }>{ city.name }</Select.Option>
              ) ) }
            </Select> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Zip">
            { getFieldDecorator( 'zip', {
              rules: [ { required: true, message: "Zip is required." } ],
              initialValue: seaman.zip
            } )( <Input type="number" /> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 14 ] }>
        <Col md={ 8 }>
          <Form.Item label="Tel. Number">
            { getFieldDecorator( 'tel', {
              initialValue: seaman.tel
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Phone Number">
            { getFieldDecorator( 'phone', {
              rules: [ { required: true, message: 'Phone number is required.' } ],
              initialValue: seaman.phone
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Email">
            { getFieldDecorator('email', {
              rules: [ { type: 'email', message: 'The input is not valid E-mail!' } ],
              initialValue: seaman.email
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 14 ] }>
        <Col md={ 8 }>
          <Form.Item label="Skype">
            { getFieldDecorator( 'skype', {
              initialValue: seaman.skype
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default ContactInformation;
