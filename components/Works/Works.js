/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { Form, Card, Result } from 'antd';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies.
 */
import SelectFetch from '~/components/SelectFetch';
import BulkOrder from './BulkOrder';
import Vessels from './Vessels';
import styles from './styles.less';

const Works = () => {
  const [ principalId, setPrincipalId ] = useState( '' );
  const [ principalName, setPrincipalName ] = useState( '' );
  const [ vesselId, setVesselId ] = useState( '' );
  const [ vesselName, setVesselName ] = useState( '' );

  return (
    <>
      <Card className={ styles.filters }>
        <Form layout="inline">
          <Form.Item label="Owner">
            <SelectFetch
              withLabelValue={ true }
              value={ principalId }
              style={ { width: 170 } }
              allowClear={ true }
              placeholder="Enter owner name"
              dataKey="id"
              labelKey="name"
              action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/principal` }
              onChange={ ( value ) => {
                if ( ! isEmpty( value ) ) {
                  setPrincipalId( value.key );
                  setPrincipalName( value.label );
                } else {
                  setPrincipalId( '' );
                  setPrincipalName( '' );
                }

                setVesselId( '' );
                setVesselName( '' );
              } }
            />
          </Form.Item>
          <Form.Item label="Vessel">
            <SelectFetch
              withLabelValue={ true }
              value={ vesselId }
              style={ { width: 170 } }
              allowClear={ true }
              placeholder="Enter vessel name"
              action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel` }
              onChange={ ( value ) => {
                if ( ! isEmpty( value ) ) {
                  setVesselId( value.key );
                  setVesselName( value.label );
                } else {
                  setVesselId( '' );
                  setVesselName( '' );
                }
              } }
              customParams= { {
                principal: principalId
              } }
            />
          </Form.Item>
          <BulkOrder
            principalId={ principalId }
            principalName={ principalName }
            vesselId={ vesselId }
            vesselName={ vesselName }
          />
        </Form>
      </Card>
      { ( principalId || vesselId ) ?
        <Vessels
          principalId={ principalId }
          vesselId={ vesselId }
        /> :
        <Result
          title="Select an owner or a vessel"
        />
      }
    </>
  );
};

export default Works;
