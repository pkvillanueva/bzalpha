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
import { PrincipalContext } from '~/store/principal';
import { countries } from '~/utils/countries';

const BasicInformation = () => {
  const { principal, getFieldDecorator, getFieldValue } = useContext( PrincipalContext );

  return (
    <Card>
      <Form style={ { maxWidth: '400px', margin: '0 auto' } }>
        <Form.Item label="Name">
          { getFieldDecorator( 'name', {
            initialValue: principal.name,
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
        <Form.Item label="Country">
          { getFieldDecorator( 'country', {
            initialValue: principal.country
          } )(
            <Select showSearch>
              { map( countries, ( country ) => <Select.Option key={ country.code } value={ country.code }>{ country.name }</Select.Option> ) }
            </Select>
          ) }
          { getFieldValue( 'country' ) && <ReactCountryFlag code={ getFieldValue( 'country' ).toLowerCase() } svg /> }
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BasicInformation;
