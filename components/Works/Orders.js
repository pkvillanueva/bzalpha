import React, { useEffect, useContext } from 'react';
import { Table, Tag } from 'antd';
import { map, isEmpty } from 'lodash';
import RankAvatar from './RankAvatar';
import Candidates from './Candidates';
import ReservedCandidate from './ReservedCandidate';
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

  const columnOrderStatusRender = ( status, order ) => {
    let color = '';

    if ( isOrderExpiring( order ) ) {
      color = 'volcano';
    } else if ( status === 'onboard' ) {
      color = 'green';
    } else if ( status === 'processing' ) {
      color = 'blue';
    }

    return <Tag color={ color }>{ status }</Tag>
  };

  const columns = [
    {
      dataIndex: 'position',
      key: 'position',
      width: 65,
      render: ( position, { status, sign_off } ) => (
        <RankAvatar status={ status } date={ sign_off }>{ position }</RankAvatar>
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
        seaman && <a>{ seaman.title }</a>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
    const { status, id, child_order } = order;

    if ( status === 'onboard' && child_order ) {
      return <ReservedCandidate parentId={ id } order={ child_order } />;
    } else if ( status === 'pending' || isOrderExpiring( order ) ) {
      return <Candidates order={ order } />;
    }

    return null;
  };

  const rowClassName = ( order ) => {
    const { status } = order;

    if ( isOrderExpiring( order ) ) {
      return styles.expiring;
    } else if ( status !== 'pending' ) {
      return `${ styles.noExpand } ${ styles[ status ] }`;
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
