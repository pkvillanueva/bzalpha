import { map } from 'lodash';
import moment from 'moment';
import { Row, Col, Form, Input, InputNumber, Select, Checkbox, DatePicker } from 'antd';
import { ranks } from '~/utils/ranks';
import { currencies } from '~/utils/currencies';
import styles from './styles.less';

const FormPending = ( { getFieldDecorator, order } ) => (
  <Row gutter={ 36 }>
    <Col lg={ 12 }>
      <Row gutter={ 24 }>
        <Col lg={ 16 }>
          <Form.Item label="Wage">
            { getFieldDecorator( 'wage', {
              initialValue: order.wage
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
        <Col lg={ 12 }>
          <Form.Item label="Join Date">
            { getFieldDecorator( 'sign_on', {
              initialValue: moment( order.sign_on ),
              rules: [ { required: true, message: 'Join date is required.' } ]
            } )(
              <DatePicker placeholder="YYYY-MM-DD" />
            ) }
          </Form.Item>
        </Col>
        <Col lg={ 12 }>
          <Form.Item label="Deadline">
            { getFieldDecorator( 'deadline', {
              initialValue: moment( order.deadline ),
            } )(
              <DatePicker placeholder="YYYY-MM-DD" />
            ) }
          </Form.Item>
        </Col>
      </Row>
    </Col>
    <Col lg={ 12 }>
      <Row gutter={ 24 }>
        <Col lg={ 12 }>
          <Form.Item label="Port">
            { getFieldDecorator( 'port', {
              initialValue: order.port
            } )(
              <Input />
            ) }
          </Form.Item>
        </Col>
        <Col lg={ 12 }>
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
      <Form.Item label="Contract" className={ styles.contractItem }>
        <Form.Item className={ styles.contractField }>
          { getFieldDecorator( 'contract_plus', {
            initialValue: order.contract_plus
          } )(
            <InputNumber placeholder="0" />
          ) }
        </Form.Item>
        <span className={ styles.contractUnit }>+/-</span>
        <Form.Item className={ styles.contractField }>
          { getFieldDecorator( 'contract_minus', {
            initialValue: order.contract_minus
          } )(
            <InputNumber placeholder="0" />
          ) }
        </Form.Item>
      </Form.Item>
      <Form.Item label="Remark">
        { getFieldDecorator( 'remark', {
          initialValue: order.remark
        } )(
          <Input.TextArea rows={ 6 } />
        ) }
      </Form.Item>
    </Col>
  </Row>
);

export default FormPending;
