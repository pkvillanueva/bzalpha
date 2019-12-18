import React, { useContext } from 'react';
import { isEmpty } from 'lodash';
import { Form, Card, Button } from 'antd';
import SelectFetch from '~/components/SelectFetch';
import EditBulkOrder from './EditBulkOrder';
import { WorksContext } from '~/store/works';
import styles from './styles.less';

const Filters = () => {
  const {
    principalId,
    setPrincipalId,
    principalName,
    setPrincipalName,
    vesselId,
    setVesselId,
    vesselName,
    setVesselName,
    updateVessel
  } = useContext( WorksContext );

  const onSave = ( id ) => {
    updateVessel( parseInt( id ) );
  };

  return (
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
        <EditBulkOrder
          principalId={ principalId }
          principalName={ principalName }
          vesselId={ vesselId }
          vesselName={ vesselName }
          onSave={ onSave }
        >
          <Button icon="plus" type="primary" className={ styles.bulkOrder }>Create Order</Button>
        </EditBulkOrder>
      </Form>
    </Card>
  );
};

export default Filters;
