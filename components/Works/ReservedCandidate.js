import { Table, Tag } from 'antd';
import { map } from 'lodash';
import { getOrderDetails } from '~/utils/orders';
import ReservedButtons from './ReservedButtons';
import styles from './styles.less';

const ReservedCandidate = ( { parentId, order } ) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: styles.compactColumn,
      width: '1%',
      render( id, { position, ID } ) {
        return `${ position && `${ position }-` }${ id || ID }`;
      }
    },
    {
      title: 'Seaman',
      dataIndex: 'seaman',
      key: 'seaman',
      className: styles.compactColumn,
      render: ( seaman ) => (
        seaman && <>{ seaman.title }</>
      )
    },
    {
      title: 'Status',
      dataIndex: 'order_status',
      key: 'order_status',
      className: styles.compactColumn,
      render: ( order_status ) => (
        <Tag color="purple">{ order_status }</Tag>
      )
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
      render: ( actions, order ) => <ReservedButtons order={ order } />
    }
  ];

  return (
    <>
      <Table
        dataSource={ map( [ order ], ( order ) => ( { key: order.ID, ...order } ) ) }
        columns={ columns }
        pagination={ false }
      />
    </>
  )
};

export default ReservedCandidate;
