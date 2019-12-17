/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
} from 'antd';
import { map } from 'lodash';
import moment from 'moment';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import nationalities from '~/utils/nationalities';

const PersonalInformation = () => {
  const { seaman, getFieldDecorator } = useContext( SeamanContext );

  return (
    <Card title="Personal Information" style={ { marginBottom: 32 } }>
      <Row gutter={ [ 32 ] }>
        <Col md={ 8 }>
          <Form.Item label="First Name">
            { getFieldDecorator( 'first_name', {
              rules: [ { required: true, message: "First name is required." } ],
              initialValue: seaman.first_name
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Middle Name">
            { getFieldDecorator( 'middle_name', {
              initialValue: seaman.middle_name
            } )( <Input /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Last Name">
            { getFieldDecorator( 'last_name', {
              rules: [ { required: true, message: "Last name is required." } ],
              initialValue: seaman.last_name
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 32 ] }>
        <Col md={ 8 }>
          <Form.Item label="Gender">
            { getFieldDecorator( 'gender', {
              rules: [ { required: true, message: "Gender is required." } ],
              initialValue: seaman.gender
            } )( <Select showSearch style={ { width: '100%' } }>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Nationality">
            { getFieldDecorator( 'nationality', {
              rules: [ { required: true, message: "Nationality is required." } ],
              initialValue: seaman.nationality
            } )( <Select showSearch style={ { width: '100%' } }>
              { map( nationalities, ( label ) => <Select.Option value={ label } key={ label }>{ label }</Select.Option> ) }
            </Select> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Marital Status">
            { getFieldDecorator( 'marital_status', {
              rules: [ { required: true, message: "Marital status is required." } ],
              initialValue: seaman.marital_status
            } )( <Select showSearch style={ { width: '100%' } }>
              <Select.Option value="Single">Single</Select.Option>
              <Select.Option value="Married">Married</Select.Option>
              <Select.Option value="Engaged">Engaged</Select.Option>
              <Select.Option value="Widowed">Widowed</Select.Option>
              <Select.Option value="Divorced">Divorced</Select.Option>
            </Select> ) }
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={ [ 32 ] }>
        <Col md={ 8 }>
          <Form.Item label="Date of Birth">
            { getFieldDecorator( 'birth_date', {
              rules: [ { required: true, message: "Date of birth is required." } ],
              initialValue: seaman.birth_date && moment( seaman.birth_date )
            } )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
          </Form.Item>
        </Col>
        <Col md={ 8 }>
          <Form.Item label="Place of Birth">
            { getFieldDecorator( 'birth_place', {
              rules: [ { required: true, message: "Place of birth is required." } ],
              initialValue: seaman.birth_place
            } )( <Input /> ) }
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default PersonalInformation;
