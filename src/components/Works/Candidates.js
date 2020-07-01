import React, { useContext } from 'react';
import { map, isEmpty } from 'lodash';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Table, Tag, Select, Input, Popconfirm, Divider } from 'antd';
import SelectFetch from '~/components/SelectFetch';
import { candidateTypes, getCandidateType } from '~/utils/orders';
import { CandidatesProvider, CandidatesContext } from './store/candidates';
import withProvider from '~/utils/withProvider';
import EditOrder from './EditOrder';
import { getID } from '~/utils/api';

const Candidates = () => {
	const { candidates, createCandidate, fields, setFields } = useContext( CandidatesContext );

	const columns = [
		{
			title: 'Date Submitted',
			dataIndex: 'timestamp',
			key: 'timestamp',
			width: 150,
		},
		{
			title: 'Seaman',
			dataIndex: 'seaman',
			key: 'seaman',
			render: ( seaman ) => seaman && seaman && <Button type="link" size="small" target="_blank" href={ `/seaman/${ seaman.id }` }>{ seaman.title }</Button>,
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			render: ( type ) => getCandidateType( type ),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: renderStatus,
		},
		{
			title: 'Remark',
			dataIndex: 'remark',
			key: 'remark',
			render: ( remark, candidate, index ) => <Remark candidate={ { index, ...candidate } } />,
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			align: 'right',
			render: ( action, candidate, index ) => <Actions candidate={ { index, ...candidate } } />,
		},
	];

	return (
		<>
			<Form layout="inline">
				<Form.Item>
					<SelectFetch
						value={ fields.seaman }
						allowClear={ true }
						placeholder="Enter candidate name"
						style={ { width: 190 } }
						action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman` }
						onChange={ ( id ) => setFields( { ...fields, seaman: id } ) }
					/>
				</Form.Item>
				{ fields.seaman &&
				<>
					<Form.Item>
						<Select
							defaultValue={ fields.type }
							style={ { width: 110 } }
							onChange={ ( type ) => setFields( { ...fields, type } ) }
						>
							{ map( candidateTypes, ( label, value ) => (
								<Select.Option key={ value } value={ value }>
									{ label }
								</Select.Option>
							) ) }
						</Select>
					</Form.Item>
					<Form.Item>
						<Button onClick={ createCandidate } type="primary">
							Add Candidate
						</Button>
					</Form.Item>
				</>
				}
			</Form>
			{ ! isEmpty( candidates ) &&
			<Table
				size="middle"
				pagination={ false }
				columns={ columns }
				dataSource={ map( candidates, ( candidate, key ) => ( { key, ...candidate } ) ) }
			/>
			}
		</>
	);
};

const Remark = ( { candidate } ) => {
	const { updateCandidate } = useContext( CandidatesContext );
	const { seaman, remark, index } = candidate;

	return (
		<Input
			key={ getID( seaman ) }
			size="small"
			defaultValue={ remark }
			onPressEnter={ ( event ) => {
				updateCandidate( index, {
					remark: event.currentTarget.value,
				} );
			} }
		/>
	);
};

const Actions = ( { candidate } ) => {
	const { order, updateCandidate, deleteCandidate } = useContext( CandidatesContext );
	const buttons = [];

	if ( candidate.seaman && candidate.status === 'approved' && order.meta.status === 'pending' ) {
		buttons.push(
			<EditOrder
				title="Save Process Order"
				order={ order }
				saveValues={ {
					meta: {
						seaman: candidate.seaman.id,
						status: 'processing',
						candidates: [],
					},
				} }
			>
				<Button size="small" type="primary">Process</Button>
			</EditOrder>
		);
	} else if ( candidate.seaman && candidate.status === 'approved' && order.meta.status === 'onboard' ) {
		const { vessel, position, currency, sign_off, return_port } = order.meta;

		buttons.push(
			<EditOrder
				title="Save Reserve Order"
				order={ {
					meta: {
						position,
						currency,
						status: 'reserved',
						sign_on: sign_off,
						port: return_port,
						parent_order: order.id,
						seaman: candidate.seaman.id,
						vessel: vessel.id,
					},
				} }
			>
				<Button size="small" type="primary">Reserve</Button>
			</EditOrder>
		);
	}

	buttons.push(
		<Select
			onChange={ ( status ) => updateCandidate( candidate.index, { status } ) }
			value={ candidate.status }
			size="small"
		>
			<Select.Option value="waiting">Waiting</Select.Option>
			<Select.Option value="rejected">Rejected</Select.Option>
			<Select.Option value="approved">Approved</Select.Option>
		</Select>
	);

	buttons.push(
		<Popconfirm
			title="Are you sure?"
			icon={ <QuestionCircleOutlined /> }
			onConfirm={ () => deleteCandidate( candidate.index ) }
		>
			<Button type="link" size="small">Delete</Button>
		</Popconfirm>
	);

	return map( buttons, ( button, i ) => (
		<span key={ i }>
			{ button }
			{ ( i !== ( buttons.length - 1 ) ) && <Divider type="vertical" /> }
		</span>
	) );
};

const renderStatus = ( status ) => {
	let color = 'blue';

	if ( status === 'approved' ) {
		color = 'green';
	} else if ( status === 'rejected' ) {
		color = 'red';
	}

	return <Tag color={ color }>{ status }</Tag>;
};

export default withProvider( CandidatesProvider, Candidates );
