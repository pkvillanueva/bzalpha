import React, { useContext } from 'react';
import moment from 'moment';
import { mapValues, map } from 'lodash';
import { Form, Row, Col, Input, InputNumber, Select, DatePicker, Checkbox } from 'antd';
import ModalForm from '~/components/ModalForm';
import { OrdersContext } from '~/store/orders';
import { getOrderStatus } from '~/utils/orders';
import { currencies } from '~/utils/currencies';
import { ranks } from '~/utils/ranks';
import styles from './styles.less';

const EditOrder = ( { titleType, saveValues, status, order, children } ) => {
  const { updateOrder } = useContext( OrdersContext );

  const handleSave = ( { values, success, error } ) => {
    const { id } = order;

    values = mapValues( values, ( v ) => v instanceof moment ? v.format( 'YYYY-MM-DD' ) : v );
    values = { ...values, ...saveValues };
    updateOrder( { params: values, id, success, error } );
  };

  return (
    <ModalForm
      title={ `${ titleType ? titleType : 'Edit' } ${ getOrderStatus( status ) } Order ${ order.position }-${ order.id } `}
      className={ styles.editOrderModal }
      width={ '100%' }
      onSave={ handleSave }
      modalForm={ ( getFieldDecorator ) => (
        <Form>
          <Row gutter={ 36 }>
            <Col lg={ 12 }>
              <Row gutter={ 24 }>
                <Col lg={ 16 }>
                  <Form.Item label="Wage">
                    { getFieldDecorator( 'wage', {
                      initialValue: order.wage,
                      rules: [ { required: true, message: 'Wage is required.' } ]
                    } )(
                      <InputNumber placeholder="960" style={ { width: '100%' } } />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 8 }>
                  <Form.Item label="Currency">
                    { getFieldDecorator( 'currency', {
                      initialValue: order.currency
                    } )(
                      <Select>
                        { map( currencies, ( currency ) => <Select.Option value={ currency.code } key={ currency.code }>{ `(${ currency.symbol }) ${ currency.name }` }</Select.Option> ) }
                      </Select>
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Position">
                { getFieldDecorator( 'position', {
                  initialValue: order.position,
                  rules: [ { required: true, message: 'Position is required.' } ]
                } )(
                  <Select placeholder="Select position" >
                    { map( ranks, ( rank ) => <Select.Option value={ rank.value } key={ rank.value }>{ rank.name }</Select.Option> ) }
                  </Select>
                ) }
              </Form.Item>
              <Row gutter={ 24 }>
                <Col lg={ 14 }>
                  <Form.Item label="Contract" className={ styles.contractField }>
                    <Form.Item className={ styles.item }>
                      { getFieldDecorator( 'contract_plus', {
                        initialValue: order.contract_plus
                      } )(
                        <InputNumber placeholder="0" />
                      ) }
                    </Form.Item>
                    <span className={ styles.unit }>+/-</span>
                    <Form.Item className={ styles.item }>
                      { getFieldDecorator( 'contract_minus', {
                        initialValue: order.contract_minus
                      } )(
                        <InputNumber placeholder="0" />
                      ) }
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col lg={ 10 }>
                  <Form.Item label="Uniform">
                    { getFieldDecorator( 'uniform', {
                      initialValue: order.uniform,
                      valuePropName: 'checked'
                    } )(
                      <Checkbox />
                    ) }
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col lg={ 12 }>
              <Row gutter={ 24 }>
                <Col lg={ 12 }>
                  <Form.Item label="Sign On Date">
                    { getFieldDecorator( 'sign_on', {
                      initialValue: order.sign_on && moment( order.sign_on ),
                      rules: [ { required: true, message: 'Sign on date is required.' } ]
                    } )(
                      <DatePicker placeholder="YYYY-MM-DD" />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 12 }>
                  <Form.Item label="Sign Off Date">
                    { getFieldDecorator( 'sign_off', {
                      initialValue: order.sign_off && moment( order.sign_off ),
                      rules: [ { required: true, message: 'Sign off date is required.' } ]
                    } )(
                      <DatePicker placeholder="YYYY-MM-DD" />
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={ 24 }>
                <Col lg={ 12 }>
                  <Form.Item label="Join Port">
                    { getFieldDecorator( 'port', {
                      initialValue: order.port
                    } )(
                      <Input />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 12 }>
                  <Form.Item label="Return Port">
                    { getFieldDecorator( 'return_port', {
                      initialValue: order.return_port
                    } )(
                      <Input />
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Remark">
                { getFieldDecorator( 'remark', {
                  initialValue: order.remark
                } )(
                  <Input.TextArea rows={ 4 } />
                ) }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) }
    >
      { children }
    </ModalForm>
  );
};

export default EditOrder;
