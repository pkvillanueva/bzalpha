import React, { useContext } from 'react';
import { isEmpty } from 'lodash';
import { Form, Card, Button } from 'antd';
import SelectFetch from '~/components/SelectFetch';
import EditOrders from './EditOrders';
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
    setVesselName
  } = useContext( WorksContext );

  const handlePrincipal = ( value ) => {
    setPrincipalId( ! isEmpty( value ) ? value.key : '' );
    setPrincipalName( ! isEmpty( value ) ? value.label : '' );
    setVesselId( '' );
    setVesselName( '' );
  };

  const handleVessel = ( value ) => {
    setVesselId( ! isEmpty( value ) ? value.key : '' );
    setVesselName( ! isEmpty( value ) ? value.label : '' );
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
            onChange={ handlePrincipal }
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
            onChange={ handleVessel }
            customParams= { {
              principal: principalId
            } }
          />
        </Form.Item>
        <EditOrders
          principalId={ principalId }
          principalName={ principalName }
          vesselId={ vesselId }
          vesselName={ vesselName }
        >
          <Button icon="plus" type="primary" className={ styles.bulkOrder }>
            Create Order
          </Button>
        </EditOrders>
      </Form>
    </Card>
  );
};

export default Filters;
