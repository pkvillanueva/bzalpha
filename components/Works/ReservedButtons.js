import React, { useContext } from 'react';
import { Modal, Icon, Divider, Button } from 'antd';
import { map } from 'lodash';
import EditOrder from './EditOrder';
import { OrdersContext } from '~/store/orders';

const ReservedButtons = ( { order } ) => {
  const { deleteOrder } = useContext( OrdersContext );
  const { id } = order;
  const buttons = [];

  const handleDelete = () => {
    Modal.confirm( {
      title: 'Are you sure delete this order?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => deleteOrder( id )
    } );
  };

  buttons.push(
    <EditOrder title="Edit Reserve Order" order={ order }>
      <a>Edit</a>
    </EditOrder>
  );

  buttons.push(
    <a onClick={ handleDelete }>Delete</a>
  );

  return map( buttons, ( button, i ) => (
    <span key={ i }>
      { button }
      { ( i !== ( buttons.length - 1 ) ) && <Divider type="vertical" /> }
    </span>
  ) );
};

export default ReservedButtons;
