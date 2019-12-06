/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { Form, Card } from 'antd';

/**
 * Internal dependencies.
 */
import SelectFetch from '~/components/SelectFetch';
import BulkOrder from './BulkOrder';
import Vessels from './Vessels';
import styles from './styles.less';

const Works = () => {
  const [ principalId, setPrincipalId ] = useState( '' );
  const [ vesselId, setVesselId ] = useState( '' );

  return (
    <>
      <Card>
        <Form layout="inline">
          <Form.Item label="Owner">
            <SelectFetch
              value={ principalId }
              style={ { width: 170 } }
              allowClear={ true }
              placeholder="Enter owner name"
              dataKey="id"
              labelKey="name"
              action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/principal` }
              onChange={ ( value ) => {
                setPrincipalId( value )
                setVesselId( '' )
              } }
            />
          </Form.Item>
          <Form.Item label="Vessel">
            <SelectFetch
              value={ vesselId }
              style={ { width: 170 } }
              allowClear={ true }
              placeholder="Enter vessel name"
              action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel` }
              onChange={ ( value ) => setVesselId( value ) }
            />
          </Form.Item>
          <BulkOrder />
        </Form>
      </Card>
      { ( principalId || vesselId ) ? <Vessels principalId={ principalId } vesselId={ vesselId } /> : null }
    </>
  );
};

export default Works;
