import React, { useEffect, useContext } from 'react';
import { Table, Tag } from 'antd';
import { map, isEmpty } from 'lodash';
import RankAvatar from './RankAvatar';
import Candidates from './Candidates';
import OrderButtons from './OrderButtons';
import { OrdersContext } from '~/store/orders';
import { getOrderDetails, isOrderExpiring } from '~/utils/orders';
import styles from './styles.less';

const Orders = ( { vessel } ) => {
  const { loading, updating, orders, getOrders } = useContext( OrdersContext );

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
  };

  const columnOrderStatusRender = ( order_status, order ) => {
    let color = '';

    if ( isOrderExpiring( order ) ) {
      color = 'volcano';
    } else if ( order_status === 'onboard' ) {
      color = 'green';
    } else if ( order_status === 'processing' ) {
      color = 'blue';
    }

    return <Tag color={ color }>{ order_status }</Tag>
  };

  const columns = [
    {
      dataIndex: 'position',
      key: 'position',
      width: 65,
      render: ( position, { order_status, sign_off } ) => (
        <RankAvatar status={ order_status } date={ sign_off }>{ position }</RankAvatar>
      )
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: styles.compactColumn,
      width: '1%',
      render( id, { position } ) {
        return `${ position && `${ position }-` }${ id }`;
      }
    },
    {
      title: 'Seaman',
      dataIndex: 'seaman',
      key: 'seaman',
      className: styles.compactColumn,
      render: ( seaman ) => (
        seaman && <a>{ seaman.post_title }</a>
      )
    },
    {
      title: 'Status',
      dataIndex: 'order_status',
      key: 'order_status',
      className: styles.compactColumn,
      render: columnOrderStatusRender
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render( details, order ) {
        return getOrderDetails( order );
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      className: styles.compactColumn,
      render: ( actions, order ) => <OrderButtons order={ order } />
    }
  ];

  const expandedRowRender = ( order ) => {
    const { order_status } = order;

    if ( order_status === 'onboard' && order.bind_order ) {
      return <>Reserved!</>;
    } else if ( order_status === 'pending' || isOrderExpiring( order ) ) {
      return <Candidates order={ order } />;
    }

    return null;
  };

  const rowClassName = ( order ) => {
    const { order_status } = order;

    if ( isOrderExpiring( order ) ) {
      return styles.expiring;
    } else if ( order_status !== 'pending' ) {
      return `${ styles.noExpand } ${ styles[ order_status ] }`;
    }

    return '';
  };

  return (
    <Table
      dataSource={ map( orders, ( order ) => ( { key: order.id, ...order } ) ) }
      expandedRowRender={ expandedRowRender }
      rowClassName={ rowClassName }
      loading={ updating }
      className={ styles.orders }
      columns={ columns }
      defaultExpandAllRows={ true }
      pagination={ false }
    />
  )
};

export default Orders;
