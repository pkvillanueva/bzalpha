import React, { useContext } from 'react';
import { Table, Tag, Divider, Modal, Button } from 'antd';
import { map } from 'lodash';
import { getOrderDetails } from '~/utils/orders';
import EditOrder from './EditOrder';
import { OrdersContext } from './store/orders';
import styles from './styles.less';

const Reserved = ( { order } ) => {
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			className: styles.compactColumn,
			width: '1%',
			render( id, order ) {
				const { position } = order.meta;
				return `${ position && `${ position }-` }${ id }`;
			},
		},
		{
			title: 'Seaman',
			dataIndex: 'meta.seaman',
			key: 'seaman',
			className: styles.compactColumn,
			render: ( seaman ) => seaman && seaman.title,
		},
		{
			title: 'Status',
			dataIndex: 'meta.status',
			key: 'status',
			className: styles.compactColumn,
			render: ( status ) => <Tag color="purple">{ status }</Tag>,
		},
		{
			title: 'Details',
			dataIndex: 'details',
			key: 'details',
			render: ( details, order ) => getOrderDetails( order ),
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			align: 'right',
			className: styles.compactColumn,
			render: ( actions, order ) => <Actions order={ order } />,
		},
	];

	return (
		<Table
			dataSource={ map( [ order ], ( order ) => ( { key: order.id, ...order } ) ) }
			columns={ columns }
			pagination={ false }
		/>
	);
};

const Actions = ( { order } ) => {
	const { deleteOrder } = useContext( OrdersContext );

	const buttons = [];

	const handleDelete = () => {
		Modal.confirm( {
			title: 'Are you sure delete this order?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => deleteOrder( {
				id: order.id,
			} ),
		} );
	};

	buttons.push(
		<EditOrder title="Edit Reserve Order" order={ order }>
			<Button type="link" size="small">Edit</Button>
		</EditOrder>
	);

	buttons.push(
		<Button type="link" size="small" onClick={ handleDelete }>Delete</Button>
	);

	return map( buttons, ( button, i ) => (
		<span key={ i }>
			{ button }
			{ ( i !== ( buttons.length - 1 ) ) && <Divider type="vertical" /> }
		</span>
	) );
};

export default Reserved;
