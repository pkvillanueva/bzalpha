/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Card, Input, Select } from 'antd';
import { map } from 'lodash';
import ReactCountryFlag from 'react-country-flag';

/**
 * Internal dependencies.
 */
import SelectFetch from '~/components/SelectFetch';
import { VesselContext } from '~/store/vessel';
import { countries } from '~/utils/countries';
import { vesselType } from '~/utils/vessel';

const Information = () => {
  const { vessel, getFieldDecorator, getFieldValue } = useContext( VesselContext );

  return (
    <Card>
        <Form style={ { maxWidth: '400px', margin: '0 auto' } }>
          <Form.Item label="Owner">
            { getFieldDecorator( 'principal', {
              initialValue: vessel.principal.length ? vessel.principal[0].id : '',
              rules: [ { required: true, message: 'Owner is required.' } ]
            } )(
              <SelectFetch
                dataKey="id"
                labelKey="name"
                initialData={ vessel.principal }
                action='http://bzalpha.test/wp-json/bzalpha/v1/principal'
              />
            ) }
          </Form.Item>
          <Form.Item label="Name">
            { getFieldDecorator( 'title', {
              initialValue: vessel.title.rendered,
              rules: [
                {
                  required: true,
                  message: 'Name is required!',
                },
              ],
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="Type">
            { getFieldDecorator( 'type', {
              initialValue: vessel.type
            } )(
              <Select>
                { map( vesselType, ( type ) => <Select.Option key={ type.value } value={ type.value }>{ type.name }</Select.Option> ) }
              </Select>
            ) }
          </Form.Item>
          <Form.Item label="Flag">
            { getFieldDecorator( 'flag', {
              initialValue: vessel.flag
            } )(
              <Select showSearch>
                { map( countries, ( country ) => <Select.Option key={ country.code } value={ country.code }>{ country.name }</Select.Option> ) }
              </Select>
            ) }
            { getFieldValue( 'flag' ) && <ReactCountryFlag code={ getFieldValue( 'flag' ).toLowerCase() } svg /> }
          </Form.Item>
          <Form.Item label="(IMO) International Maritime Organization">
            { getFieldDecorator( 'imo', {
              initialValue: vessel.imo
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="(MMSI) Maritime Mobile Service Identity">
            { getFieldDecorator( 'mmsi', {
              initialValue: vessel.mmsi
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="(GRT) Gross Register Tonnage">
            { getFieldDecorator( 'grt', {
              initialValue: vessel.grt
            } )(
              <Input />
            ) }
          </Form.Item>
          <Form.Item label="(DWT) Deadweight Tonnage">
            { getFieldDecorator( 'dwt', {
              initialValue: vessel.dwt
            } )(
              <Input />
            ) }
          </Form.Item>
        </Form>
      </Card>
  );
};

export default Information;
