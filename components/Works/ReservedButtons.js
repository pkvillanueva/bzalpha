import React, { useContext } from 'react';
import { Modal, Icon, Divider, Button } from 'antd';
import { map } from 'lodash';
import EditOrder from './EditOrder';
import { OrdersContext } from '~/store/orders';

const ReservedButtons = ( { order } ) => {
  const { id, order_status } = order;
  const buttons = [];

  buttons.push(
    <a>Edit</a>
  );

  buttons.push(
    <a>Delete</a>
  );

  return map( buttons, ( button, i ) => (
    <span key={ i }>
      { button }
      { ( i !== ( buttons.length - 1 ) ) && <Divider type="vertical" /> }
    </span>
  ) );
};

export default ReservedButtons;
