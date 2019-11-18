/**
 * External dependencies.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { map } from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import { Form, Input, Button, Table, Popconfirm, Divider } from 'antd';
const { Search } = Input;
const { Item: FormItem } = Form;

/**
 * Internal dependencies.
 */
import Block from '~/components/Block';
import PrincipalNew from './PrincipalNew';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: ( t, r ) => (
      <a href={ `/principal/${ r.id }` }>
        { r.name || '<No Name>' }
      </a>
    )
  },
  {
    title: 'Country',
    dataIndex: 'country',
    render: ( t, r ) => ( <>
    { r.country && <ReactCountryFlag code={ r.country.toLowerCase() } svg /> }
    </> )
  },
  // {
  //   title: 'Rank',
  //   dataIndex: 'rank',
  //   render: ( t, r ) => getRankName( r.rank ) || '—'
  // },
  // {
  //   title: 'Age',
  //   dataIndex: 'age',
  //   render: ( t, r ) => getCurrentAge( r.birth_date ) || '—'
  // },
  // {
  //   title: 'Contact',
  //   dataIndex: 'contact',
  //   render: ( t, r ) => r.phone || r.email || r.skype || r.tel || '—'
  // },
  // {
  //   title: 'Address',
  //   dataIndex: 'address'
  // }
];

const PrincipalsList = () => {
  const [ isCreating, setIsCreating ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ total, setTotal ] = useState( 0 );
  const [ data, setData ] = useState( [] );
  const [ filters, setFilters ] = useState( {} );

  const fetchData = ( params = {} ) => {
    const { token } = parseCookies();
    setIsLoading( true );

    axios.get( `http://bzalpha.test/wp-json/bzalpha/v1/principal`, {
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

  const handleDelete = ( id ) => {
    const { token } = parseCookies();

    axios.delete( `http://bzalpha.test/wp-json/bzalpha/v1/principal/${ id }`, {
      headers: { 'Authorization': `Bearer ${ token }` },
      data: {
        id: id,
        force: 'true'
      }
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
        <a href={ `/principal/${ r.id }` }>Edit</a>
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
      </Form>
    </Block>
    <Block>
      <PrincipalNew
        visible={ isCreating }
        onCancel={ handleNew }
      />
      <Button
        type="primary"
        icon="plus"
        onClick={ handleNew }
      >
        New
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

export default PrincipalsList;
