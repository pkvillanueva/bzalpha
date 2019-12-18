import React, { useEffect, useContext } from 'react';
import { Table, Tag, Modal, Icon, Divider, Button } from 'antd';
import { map, isEmpty } from 'lodash';
import moment from 'moment';
import RankAvatar from './RankAvatar';
import EditCandidates from './EditCandidates';
import EditOrder from './EditOrder';
import { getCurrencySymbol } from '~/utils/currencies';
import { OrdersContext } from '~/store/orders';
import { isContractExpiring } from '~/utils/orders';
import styles from './styles.less';

const Orders = ( { vessel } ) => {
  const { loading, updating, orders, getOrders, deleteOrder, updateOrder } = useContext( OrdersContext );

  // Initial orders fetch.
  useEffect( () => getOrders( vessel ), [] );

  if ( loading || isEmpty( orders ) ) {
    return (
      <div>
        <Table
          loading={ loading }
          dataSource={ [] }
        />
      </div>
    );
  }

  const handleDelete = ( id ) => {
    Modal.confirm( {
      title: 'Are you sure delete this order?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => deleteOrder( id )
    } );
  }

  const handleOnboard = ( id ) => {
    Modal.confirm( {
      title: 'Are you sure to onboard this order?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => updateOrder( { id, params: { order_status: 'onboard' } } )
    } );
  }

  const handleSignOff = ( id ) => {
    Modal.confirm( {
      title: 'Are you sure to close this order?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => updateOrder( { id, params: { order_status: 'processing' } } )
    } );
  }

  const columns = [
    {
      dataIndex: 'position',
      key: 'position',
      width: 65,
      render: ( position, { order_status, sign_off } ) => <RankAvatar type={ order_status } signOff={ sign_off }>{ position }</RankAvatar>
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: styles.compactColumn,
      width: '1%',
      render: ( id, { position } ) => {
        return `${ position && `${ position }-` }${ id }`;
      }
    },
    {
      title: 'Seaman',
      dataIndex: 'seaman',
      key: 'seaman',
      className: styles.compactColumn,
      render: ( seaman ) => {
        return seaman && <a>{ seaman.post_title }</a>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'order_status',
      key: 'order_status',
      className: styles.compactColumn,
      render: ( order_status, { sign_off } ) => {
        if ( order_status === 'onboard' && isContractExpiring( sign_off ) ) {
          return <Tag color="volcano">{ order_status }</Tag>;
        }

        switch ( order_status ) {
          case 'processing': return <Tag color="blue">{ order_status }</Tag>;
          case 'onboard': return <Tag color="green">{ order_status }</Tag>;
          default: return <Tag>{ order_status }</Tag>
        }
      }
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: ( details, { order_status, deadline, sign_on, sign_off, port, wage, currency, contract_plus, contract_minus } ) => {
        let text = '';

        switch ( order_status ) {
          case 'pending':
            text += `${ sign_on ? `Join Date: ${ moment( sign_on ).format( 'MMM D YY' ) } ` : '' }`;
            text += `${ deadline ? `/ Deadline: ${ moment( deadline ).format( 'MMM D YY' ) } ` : '' }`;
            return text;
          case 'processing':
            text += `${ sign_on ? `Join Date: ${ moment( sign_on ).format( 'MMM D YY' ) } ` : '' }`;
            text += `${ port ? `@ ${ port } ` : '' }`;
            text += `${ wage ? `[${ getCurrencySymbol( currency ) }${ wage }] ` : '' }`;
            text += `${ contract_plus ? `${ contract_plus } +/- ` : '' }`;
            text += `${ contract_plus && contract_minus ? `${ contract_minus } ` : '' }`;
            text += `${ sign_off ? `Until: ${ moment( sign_off ).format( 'MMM D YY' ) } ` : '' }`;
            return text;
          default:
            text += `${ sign_on ? `Joined: ${ moment( sign_on ).format( 'MMM D YY' ) } ` : '' }`;
            text += `${ port ? `@ ${ port } ` : '' }`;
            text += `${ wage ? `[${ getCurrencySymbol( currency ) }${ wage }] ` : '' }`;
            text += `${ contract_plus ? `${ contract_plus } +/- ` : '' }`;
            text += `${ contract_plus && contract_minus ? `${ contract_minus } ` : '' }`;
            text += `${ sign_off ? `Until: ${ moment( sign_off ).format( 'MMM D YY' ) } ` : '' }`;
            return text;
        }
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      className: styles.compactColumn,
      render: ( actions, order ) => {
        const { order_status, id } = order;

        return (
          <>
            { order_status === 'processing' &&
              <>
                <Button size="small" type="primary" onClick={ () => handleOnboard( id ) }>Onboard</Button>
                <Divider type="vertical" />
              </>
            }
            { order_status === 'onboard' &&
              <>
                <Button size="small" type="default" onClick={ () => handleSignOff( id ) }>Close</Button>
                <Divider type="vertical" />
              </>
            }
            <EditOrder status={ order_status } order={ order }>
              <Icon type="edit" />
            </EditOrder>
            <Divider type="vertical" />
            <Icon type="delete" onClick={ () => handleDelete( id ) } />
          </>
        );
      }
    }
  ];

  const expandedRowRender = ( order ) => {
    const { order_status, sign_off } = order;

    if ( order_status === 'pending' || order_status === 'onboard' && isContractExpiring( sign_off ) ) {
      return <EditCandidates order={ order } />;
    }

    return null;
  };

  const rowClassName = ( { order_status, sign_off } ) => {
    if ( order_status === 'onboard' && isContractExpiring( sign_off ) ) {
      return '';
    } else if ( order_status !== 'pending' ) {
      return styles.noExpand;
    } else {
      return '';
    }
  };

  return (
    <Table
      loading={ updating }
      className={ styles.orders }
      pagination={ false }
      columns={ columns }
      defaultExpandAllRows={ true }
      expandedRowRender={ expandedRowRender }
      rowClassName={ rowClassName }
      dataSource={ map( orders, ( order ) => ( { key: order.id, ...order } ) ) }
    />
  )
};

export default Orders;
