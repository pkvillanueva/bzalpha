/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { map } from 'lodash';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Row, Col, Form, Card, Button, Input, InputNumber, Select, Checkbox, DatePicker, message } from 'antd';

/**
 * Internal dependencies.
 */
import { ranks } from '~/utils/ranks';
import { currencies } from '~/utils/currencies';
import SelectFetch from '~/components/SelectFetch';
import ModalForm from '~/components/ModalForm';
import styles from './styles.less';

const BulkOrder = () => {
  const handleSave = ( { values }, done, error ) => {
    const { token } = parseCookies();

    axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/bulk`, values, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
    } ).then( () => {
      done();
      message.success( 'Order created.' );
    } ).catch( () => {
      error();
      message.error( 'Failed to create an order.' );
    } );
  };

  return (
    <ModalForm
      title="Add New Order"
      className={ styles.bulkOrder }
      width={ '100%' }
      onSave={ handleSave }
      modalForm={ ( getFieldDecorator ) => (
        <Form>
          <Row gutter={ 36 }>
            <Col lg={ 12 }>
              <Form.Item label="Owner">
                <SelectFetch
                  allowClear={ true }
                  placeholder="Select owner"
                  dataKey="id"
                  labelKey="name"
                  action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/principal` }
                />
              </Form.Item>
              <Form.Item label="Vessel">
                { getFieldDecorator( 'vessel', {
                  rules: [ { required: true, message: 'Vessel is required.' } ],
                } )(
                  <SelectFetch
                    allowClear={ true }
                    placeholder="Enter vessel name"
                    action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel` }
                  />
                ) }
              </Form.Item>
              <Row gutter={ 24 }>
                <Col lg={ 16 }>
                  <Form.Item label="Wage">
                    { getFieldDecorator( 'wage', {} )(
                      <InputNumber placeholder="960" style={ { width: '100%' } } />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 8 }>
                  <Form.Item label="Currency">
                    { getFieldDecorator( 'currency', {
                      initialValue: 'USD'
                    } )(
                      <Select>
                        { map( currencies, ( currency ) => <Select.Option value={ currency.code } key={ currency.code }>{ `(${ currency.symbol }) ${ currency.name }` }</Select.Option> ) }
                      </Select>
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Positions">
                { getFieldDecorator( 'positions', {
                  rules: [ { required: true, message: 'Position is required.' } ]
                } )(
                  <Select
                    mode="multiple"
                    placeholder="Select positions"
                    showSearch={ true }
                  >
                    { map( ranks, ( rank ) => <Select.Option value={ rank.value } key={ rank.value }>{ rank.name }</Select.Option> ) }
                  </Select>
                ) }
              </Form.Item>
            </Col>
            <Col lg={ 12 }>
              <Row gutter={ 24 }>
                <Col lg={ 12 }>
                  <Form.Item label="Port">
                    { getFieldDecorator( 'port', {} )(
                      <Input />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 12 }>
                  <Form.Item label="Uniform">
                    { getFieldDecorator( 'uniform', {} )(
                      <Checkbox />
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={ 24 }>
                <Col lg={ 12 }>
                  <Form.Item label="Join Date">
                    { getFieldDecorator( 'sign_on', {
                      rules: [ { required: true, message: 'Join date is required.' } ]
                    } )(
                      <DatePicker placeholder="YYYY-MM-DD" />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 12 }>
                  <Form.Item label="Deadline">
                    { getFieldDecorator( 'deadline', {} )(
                      <DatePicker placeholder="YYYY-MM-DD" />
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Contract" className={ styles.contractItem }>
                <Form.Item className={ styles.contractField }>
                  { getFieldDecorator( 'contract_plus', {} )(
                    <InputNumber placeholder="0" />
                  ) }
                </Form.Item>
                <span className={ styles.contractUnit }>+/-</span>
                <Form.Item className={ styles.contractField }>
                  { getFieldDecorator( 'contract_minus', {} )(
                    <InputNumber placeholder="0" />
                  ) }
                </Form.Item>
              </Form.Item>
              <Form.Item label="Remark">
                { getFieldDecorator( 'remark', {} )(
                  <Input.TextArea rows={ 6 } />
                ) }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) }
    >
      <Button icon="plus" type="primary" className={ styles.newBulkOrder }>Create Order</Button>
    </ModalForm>
  );
};

export default BulkOrder;
