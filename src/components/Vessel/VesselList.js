/**
 * External dependencies.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { map } from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Table, Popconfirm, Divider } from 'antd';
const { Search } = Input;
const { Item: FormItem } = Form;

/**
 * Internal dependencies.
 */
import Block from '~/components/Block';
import SelectFetch from '~/components/SelectFetch';
import VesselNew from './VesselNew';
import styles from './styles.less';

const columns = [
	{
		title: 'Name',
		dataIndex: 'title',
		render: ( title, { id } ) => (
			<a href={ `/vessel/${ id }` }>
				{ title || '<No Name>' }
			</a>
		),
	},
	{
		title: 'Type',
		dataIndex: 'meta.type',
		render: ( type ) => type || '-',
	},
	{
		title: 'Flag',
		dataIndex: 'meta.flag',
		align: 'center',
		render: ( flag ) => {
			if ( ! flag ) {
				return '-';
			}

			return (
				<ReactCountryFlag code={ flag } svg />
			);
		},
	},
	{
		title: 'Owner',
		dataIndex: 'owner',
		render: ( t, r ) => {
			if ( r.principal.length < 1 ) {
				return '-';
			}

			return (
				<a href={ `/principal/${ r.principal[ 0 ].id }` }>
					{ r.principal[ 0 ].name || '<No Name>' }
				</a>
			);
		},
	},
];

const VesselsList = ( { basePrincipal, customParams = {} } ) => {
	const [ isCreating, setIsCreating ] = useState( false );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ total, setTotal ] = useState( 0 );
	const [ data, setData ] = useState( [] );
	const [ filters, setFilters ] = useState( {} );

	const fetchData = ( params = {} ) => {
		const { token } = parseCookies();
		setIsLoading( true );

		axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel`, {
			headers: { Authorization: `Bearer ${ token }` },
			params: { ...filters, ...params, ...customParams },
		} )
			.then( ( res ) => {
				const newData = map( res.data, ( data ) => {
					data.key = data.id;
					return data;
				} );
				setData( newData );
				setTotal( parseInt( res.headers[ 'x-wp-total' ] ) );
			} )
			.catch( () => {
				setData( [] );
			} )
			.finally( () => {
				setFilters( { ...filters, ...params } );
				setIsLoading( false );
			} );
	};

	useEffect( () => {
		fetchData();
	}, [] );

	const handleNew = () => {
		setIsCreating( ! isCreating );
	};

	const handleChange = ( pagination ) => {
		const page = pagination.current;

		fetchData( {
			page,
		} );
	};

	const handleSearch = ( value ) => {
		fetchData( {
			search: value,
			page: 1,
		} );
	};

	const handleOwner = ( value ) => {
		fetchData( {
			principal: value,
			page: 1,
		} );
	};

	const handleDelete = ( id ) => {
		const { token } = parseCookies();

		axios.delete( `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel/${ id }`, {
			headers: { Authorization: `Bearer ${ token }` },
		} )
			.finally( () => {
				fetchData();
			} );
	};

	const actionColumn = {
		title: 'Action',
		key: 'action',
		className: 'action',
		align: 'center',
		width: 125,
		render: ( r ) => (
			<div>
				<a href={ `/vessel/${ r.id }` }>Edit</a>
				<Divider type="vertical" />
				<Popconfirm title="Sure to delete?" onConfirm={ () => handleDelete( r.id ) }>
					<Button type="link" size="small">Delete</Button>
				</Popconfirm>
			</div>
		),
	};

	if ( columns[ columns.length - 1 ].key === 'action' ) {
		columns[ columns.length - 1 ] = actionColumn;
	} else {
		columns.push( actionColumn );
	}

	return <>
		<Block>
			<Form layout="inline">
				<FormItem label="Search">
					<Search onSearch={ handleSearch } placeholder="Name..." />
				</FormItem>
				{ ! basePrincipal &&
				<FormItem label="Owner">
					<SelectFetch
						className={ styles.selectStatus }
						allowClear={ true }
						onChange={ handleOwner }
						placeholder="Select owner"
						dataKey="id"
						labelKey="name"
						action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/principal` }
					/>
				</FormItem>
				}
			</Form>
		</Block>
		<Block>
			<VesselNew
				basePrincipal={ basePrincipal }
				visible={ isCreating }
				onCancel={ handleNew }
			/>
			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={ handleNew }
			>
				New Vessel
			</Button>
		</Block>
		<Table
			loading={ isLoading }
			dataSource={ data }
			columns={ columns }
			onChange={ handleChange }
			pagination={ {
				total,
			} }
		/>
	</>;
};

export default VesselsList;
