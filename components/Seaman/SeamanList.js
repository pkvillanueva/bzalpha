/**
 * External dependencies.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { map } from 'lodash';
import { Form, Input, Select, Button, Table, Popconfirm, Divider, Badge, Avatar } from 'antd';
const { Search } = Input;
const { Option } = Select;
const { Item: FormItem } = Form;

/**
 * Internal dependencies.
 */
import Block from '~/components/Block';
import { getCurrentAge, getRankName } from '~/utils/seaman';
import SeamanNew from './SeamanNew';
import styles from './styles.less';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: ( t, r ) => (
      <>
        <Avatar className={ styles.tableAvatar } src={ r.avatar } shape="square" icon="user" />
        <a href={ `/seaman/${ r.id }` }>
          { r.first_name || r.last_name ? `${ r.first_name } ${ r.last_name }` : '<No Name>' }
        </a>
      </>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: ( t, r ) => {
      let status = {};

      switch ( r.job_status ) {
        case 'onboard': status = { status: 'success', name: 'On Board' }; break;
        default: status = { status: 'default', name: 'Stand By' }; break;
      }

      return ( <>
        <Badge status={ status.status } /> { status.name }
      </> );
    }
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    render: ( t, r ) => getRankName( r.rank ) || '—'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    render: ( t, r ) => getCurrentAge( r.birth_date ) || '—'
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    render: ( t, r ) => r.phone || r.email || r.skype || r.tel || '—'
  }
];

const SeamenList = () => {
  const [ isCreating, setIsCreating ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ total, setTotal ] = useState( 0 );
  const [ data, setData ] = useState( [] );
  const [ filters, setFilters ] = useState( {} );

  const fetchData = ( params = {} ) => {
    const { token } = parseCookies();
    setIsLoading( true );

    axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman`, {
      headers: { 'Authorization': `Bearer ${ token }` },
      params: { ...filters, ...params }
    } )
    .then( ( res ) => {
      const newData = map( res.data, ( data ) => {
        data.key = data.id;
        return data;
      } );
      setData( newData );
      setTotal( parseInt( res.headers['x-wp-total'] ) );
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
      page: page
    } );
  };

  const handleSearch = ( value ) => {
    fetchData( {
      search: value,
      page: 1
    } );
  };

  const handleStatus = ( value ) => {
    fetchData( {
      job_status: value,
      page: 1
    } );
  };

  const handleDelete = ( id ) => {
    const { token } = parseCookies();

    axios.delete( `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman/${ id }`, {
      headers: { 'Authorization': `Bearer ${ token }` }
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
        <a href={ `/seaman/${ r.id }` }>Edit</a>
        <Divider type="vertical" />
        <Popconfirm title="Sure to delete?" onConfirm={ () => handleDelete( r.id ) }>
          <a>Delete</a>
        </Popconfirm>
      </div>
    )
  };

  if ( columns[ columns.length - 1 ].key === 'action' ) {
    columns[ columns.length - 1 ] = actionColumn;
  } else {
    columns.push( actionColumn );
  }

  return ( <>
    <Block>
      <Form layout="inline">
        <FormItem label="Search">
          <Search onSearch={ handleSearch } placeholder="Name..." />
        </FormItem>
        <FormItem label="Status">
          <Select className={ styles.selectStatus } allowClear={ true } onChange={ handleStatus } placeholder="Select status">
            <Option value="onboard">On Board</Option>
            <Option value="standby">Stand By</Option>
          </Select>
        </FormItem>
      </Form>
    </Block>
    <Block>
      <SeamanNew
        visible={ isCreating }
        onCancel={ handleNew }
      />
      <Button
        type="primary"
        icon="plus"
        onClick={ handleNew }
      >
        New Seaman
      </Button>
    </Block>
    <Table
      loading={ isLoading }
      dataSource={ data }
      columns={ columns }
      onChange={ handleChange }
      pagination={ {
        total: total
      } }
    />
  </> );
};

export default SeamenList;
