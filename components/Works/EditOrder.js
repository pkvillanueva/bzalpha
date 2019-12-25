import React, { useContext } from 'react';
import { map, merge } from 'lodash';
import { Form, Row, Col, Input, InputNumber, Select, DatePicker, Checkbox } from 'antd';
import ModalForm from '~/components/ModalForm';
import { OrdersContext } from './store/orders';
import { currencies } from '~/utils/currencies';
import { ranks } from '~/utils/ranks';
import { parseMoment } from '~/utils/api';
import styles from './styles.less';

const EditOrder = ( { title, saveValues, order, children } ) => {
  const { updateOrder, createOrder } = useContext( OrdersContext );
  const { id, meta } = order
  const { position, status } = meta;

  const handleSave = ( { values, success, error } ) => {
    if ( ! id ) {
      values = merge( order, values, saveValues );
      createOrder( { values, success, error } );
    } else {
      values = merge( values, saveValues );
      updateOrder( { values, id, success, error } );
    }
  };

  const formTitle = () => {
    let text = 'Edit Order ';

    if ( title ) {
      text = `${ title } `;
    }

    if ( position && id ) {
      text += `${ position }-${ id } `;
    }

    return text;
  };

  const isReserve = () => {
    return status === 'reserved';
  };

  const isOnboard = () => {
    return status === 'onboard';
  };

  return (
    <ModalForm
      title={ formTitle() }
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
                    { getFieldDecorator( 'meta.wage', {
                      initialValue: meta.wage,
                      rules: [ { required: true, message: 'Wage is required.' } ]
                    } )(
                      <InputNumber placeholder="960" style={ { width: '100%' } } />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 8 }>
                  <Form.Item label="Currency">
                    { getFieldDecorator( 'meta.currency', {
                      initialValue: meta.currency
                    } )(
                      <Select>
                        { map( currencies, ( currency ) => (
                          <Select.Option value={ currency.code } key={ currency.code }>
                            { `(${ currency.symbol }) ${ currency.name }` }
                          </Select.Option>
                        ) ) }
                      </Select>
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Position">
                { getFieldDecorator( 'meta.position', {
                  initialValue: meta.position,
                  rules: [ { required: true, message: 'Position is required.' } ]
                } )(
                  <Select placeholder="Select position" >
                    { map( ranks, ( rank ) => (
                      <Select.Option value={ rank.value } key={ rank.value } disabled={ ( isReserve() || isOnboard() ) }>
                        { rank.name }
                      </Select.Option>
                    ) ) }
                  </Select>
                ) }
              </Form.Item>
              <Row gutter={ 24 }>
                <Col lg={ 14 }>
                  <Form.Item label="Contract" className={ styles.contractField }>
                    <Form.Item className={ styles.item }>
                      { getFieldDecorator( 'meta.contract_plus', {
                        initialValue: meta.contract_plus
                      } )(
                        <InputNumber placeholder="0" />
                      ) }
                    </Form.Item>
                    <span className={ styles.unit }>+/-</span>
                    <Form.Item className={ styles.item }>
                      { getFieldDecorator( 'meta.contract_minus', {
                        initialValue: meta.contract_minus
                      } )(
                        <InputNumber placeholder="0" />
                      ) }
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col lg={ 10 }>
                  <Form.Item label="Uniform">
                    { getFieldDecorator( 'meta.uniform', {
                      initialValue: meta.uniform,
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
                  <Form.Item label="Join Port">
                    { getFieldDecorator( 'meta.port', {
                      initialValue: meta.port
                    } )(
                      <Input />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 12 }>
                  <Form.Item label="Return Port">
                    { getFieldDecorator( 'meta.return_port', {
                      initialValue: meta.return_port
                    } )(
                      <Input />
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={ 24 }>
                <Col lg={ 12 }>
                  <Form.Item label="Join Date">
                    { getFieldDecorator( 'meta.sign_on', {
                      initialValue: parseMoment( meta.sign_on ),
                      rules: [ { required: true, message: 'Join is required.' } ]
                    } )(
                      <DatePicker placeholder="YYYY-MM-DD" />
                    ) }
                  </Form.Item>
                </Col>
                <Col lg={ 12 }>
                  <Form.Item label="Return Date">
                    { getFieldDecorator( 'meta.sign_off', {
                      initialValue: parseMoment( meta.sign_off ),
                      rules: [ { required: true, message: 'Return date is required.' } ]
                    } )(
                      <DatePicker placeholder="YYYY-MM-DD" />
                    ) }
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Remark">
                { getFieldDecorator( 'meta.remark', {
                  initialValue: meta.remark
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
