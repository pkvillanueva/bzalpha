import React, { useEffect, useContext } from 'react';
import { Table, Tag, Button, Divider, Icon, Modal } from 'antd';
import { map, filter, isEmpty } from 'lodash';
import RankAvatar from './RankAvatar';
import Candidates from './Candidates';
import Reserved from './Reserved';
import EditOrder from './EditOrder';
import { OrdersContext } from './store/orders';
import { getOrderDetails, isOrderExpiring } from '~/utils/orders';
import styles from './styles.less';

const Orders = ( { vessel } ) => {
	const { loading, updating, orders, fetchOrders } = useContext( OrdersContext );

	// Initial orders fetch.
	useEffect( () => fetchOrders( vessel ), [] );

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

	const columns = [
		{
			dataIndex: 'meta.position',
			key: 'position',
			className: styles.compactColumn,
			render: renderPosition,
		},
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			className: styles.compactColumn,
			render: ( id, { meta } ) => `${ meta.position && `${ meta.position }-` }${ id }`,
		},
		{
			title: 'Seaman',
			dataIndex: 'meta.seaman',
			key: 'seaman',
			className: styles.compactColumn,
			render: ( seaman ) => seaman && <Button type="link" size="small">{ seaman.title }</Button>,
		},
		{
			title: 'Status',
			dataIndex: 'meta.status',
			key: 'status',
			className: styles.compactColumn,
			render: renderStatus,
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

	const expandedRowRender = ( order ) => (
		<ExpandedRow order={ order } />
	);

	const dataSource = filter(
		map( orders, ( order ) => ( { key: order.id, ...order } ) ),
		( { meta } ) => meta.status !== 'reserved'
	);

	return (
		<Table
			dataSource={ dataSource }
			expandedRowRender={ expandedRowRender }
			rowClassName={ rowClassName }
			loading={ updating }
			className={ styles.orders }
			columns={ columns }
			defaultExpandAllRows={ true }
			pagination={ false }
		/>
	);
};

const Actions = ( { order } ) => {
	const { deleteOrder, updateOrder, closeOrder, getOrder } = useContext( OrdersContext );
	const { status, child_order } = order.meta;
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

	const handleOnboard = () => {
		Modal.confirm( {
			title: 'Are you sure to onboard this order?',
			okText: 'Yes',
			cancelText: 'No',
			onOk: () => updateOrder( {
				id: order.id,
				values: {
					meta: {
						status: 'onboard',
					},
				},
			} ),
		} );
	};

	const handleClose = () => {
		Modal.confirm( {
			title: 'Are you sure to close this order?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => closeOrder( {
				id: order.id,
			} ),
		} );
	};

	if ( status === 'processing' ) {
		buttons.push(
			<Button size="small" type="primary" onClick={ handleOnboard }>
        Onboard
			</Button>
		);
	} else if ( status === 'onboard' && child_order && getOrder( child_order ) ) {
		buttons.push(
			<Button size="small" type="primary" onClick={ handleClose }>
        Switch
			</Button>
		);
	} else if ( status === 'onboard' ) {
		buttons.push(
			<Button size="small" type="default" onClick={ handleClose }>
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
		<Icon type="delete" onClick={ handleDelete } />
	);

	return map( buttons, ( button, i ) => (
		<span key={ i }>
			{ button }
			{ ( i !== ( buttons.length - 1 ) ) && <Divider type="vertical" /> }
		</span>
	) );
};

const ExpandedRow = ( { order } ) => {
	const { getOrder } = useContext( OrdersContext );

	const { status, child_order } = order.meta;

	if ( status === 'onboard' && child_order ) {
		const reserved = getOrder( child_order );

		if ( reserved ) {
			return <Reserved order={ reserved } />;
		}
	}

	if ( status === 'pending' || isOrderExpiring( order ) ) {
		return <Candidates order={ order } />;
	}

	return null;
};

const renderPosition = ( position, { meta } ) => {
	const { status, sign_off } = meta;

	return (
		<RankAvatar status={ status } date={ sign_off }>
			{ position }
		</RankAvatar>
	);
};

const renderStatus = ( status, order ) => {
	let color = '';

	if ( isOrderExpiring( order ) ) {
		color = 'volcano';
	} else if ( status === 'onboard' ) {
		color = 'green';
	} else if ( status === 'processing' ) {
		color = 'blue';
	}

	return <Tag color={ color }>{ status }</Tag>;
};

const rowClassName = ( order ) => {
	const { status } = order.meta;

	if ( isOrderExpiring( order ) ) {
		return styles.expiring;
	} else if ( status !== 'pending' ) {
		return `${ styles.noExpand } ${ styles[ status ] }`;
	}

	return '';
};

export default Orders;
