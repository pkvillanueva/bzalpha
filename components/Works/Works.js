/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { Form, Card, Result } from 'antd';

/**
 * Internal dependencies.
 */
import SelectFetch from '~/components/SelectFetch';
import BulkOrder from './BulkOrder';
import Vessels from './Vessels';
import styles from './styles.less';

const Works = () => {
  const [ principal, setPrincipal ] = useState( {} );
  const [ vessel, setVessel ] = useState( {} );

  return (
    <>
      <Card className={ styles.filters }>
        <Form layout="inline">
          <Form.Item label="Owner">
            <SelectFetch
              withLabelValue={ true }
              value={ principal.key }
              style={ { width: 170 } }
              allowClear={ true }
              placeholder="Enter owner name"
              dataKey="id"
              labelKey="name"
              action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/principal` }
              onChange={ ( value ) => {
                setPrincipal( value || {} );
                setVessel( {} );
              } }
            />
          </Form.Item>
          <Form.Item label="Vessel">
            <SelectFetch
              withLabelValue={ true }
              value={ vessel.key }
              style={ { width: 170 } }
              allowClear={ true }
              placeholder="Enter vessel name"
              action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel` }
              onChange={ ( value ) => setVessel( value || {} ) }
              customParams= { {
                principal: principal.key
              } }
            />
          </Form.Item>
          <BulkOrder
            principal={ principal }
            vessel={ vessel }
          />
        </Form>
      </Card>
      { ( principal.key || vessel.key ) ?
        <Vessels
          principalId={ principal.key }
          vesselId={ vessel.key }
        /> :
        <Result
          title="Select an owner or a vessel"
        />
      }
    </>
  );
};

export default Works;
