import React, { useContext } from 'react';
import { Modal, Icon, Divider, Button } from 'antd';
import { map } from 'lodash';
import EditOrder from './EditOrder';
import { OrdersContext } from '~/store/orders';

const OrderButtons = ( { order } ) => {
  const { deleteOrder, updateOrder } = useContext( OrdersContext );
  const { id, status } = order;
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

  const handleOnboard = () => {
    Modal.confirm( {
      title: 'Are you sure to onboard this order?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => updateOrder( { id, values: { status: 'onboard' } } )
    } );
  };

  const handleSignOff = () => {
    Modal.confirm( {
      title: 'Are you sure to close this order?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => updateOrder( { id, values: { status: 'processing' } } )
    } );
  };

  if ( status === 'processing' ) {
    buttons.push(
      <Button size="small" type="primary" onClick={ () => handleOnboard( order.id ) }>
        Onboard
      </Button>
    );
  } else if ( status === 'onboard' && order.child_order ) {
    buttons.push(
      <Button size="small" type="primary">
        Switch
      </Button>
      );
  } else if ( status === 'onboard' ) {
    buttons.push(
      <Button size="small" type="default" onClick={ () => handleSignOff( order.id ) }>
        Close
      </Button>
    );
  }

  buttons.push(
    <EditOrder order={ order }>
      <Icon type="edit" />
    </EditOrder>
  );

  buttons.push(
    <Icon type="delete" onClick={ () => handleDelete( order.id ) } />
  );

  return map( buttons, ( button, i ) => (
    <span key={ i }>
      { button }
      { ( i !== ( buttons.length - 1 ) ) && <Divider type="vertical" /> }
    </span>
  ) );
};

export default OrderButtons;
