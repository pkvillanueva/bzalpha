import React, { useState } from 'react';
import { map, isEmpty, filter } from 'lodash';
import moment from 'moment';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Form, Button, Popconfirm, Icon, Table, Tag, Divider, Select, Input, message } from 'antd';
import SelectFetch from '~/components/SelectFetch';
import { orderTypes } from '~/utils/orders';
import EditOrder from './EditOrder';
import styles from './styles.less';

const EditCandidates = ( { order } ) => {
  const [ seamanId, setSeamanId ] = useState( '' );
  const [ type, setType ] = useState( 'proposed' );
  const [ candidates, setCandidates ] = useState( order.candidates || [] );
  const [ loading, setLoading ] = useState( false );
  const columns = [
    {
      title: 'Date Submitted',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150
    },
    {
      title: 'Seaman',
      dataIndex: 'seaman',
      key: 'seaman',
      render: ( seaman ) => seaman && seaman.post_title
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: ( type ) => orderTypes[ type ] && orderTypes[ type ]
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: ( status ) => {
        let color = 'blue';

        if ( status === 'approved' ) {
          color = 'green';
        } else if ( status === 'rejected' ) {
          color = 'red';
        }

        return <Tag color={ color }>{ status }</Tag>
      }
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      render: ( remark, candidate, index ) => {
        return (
          <Input
            size="small"
            defaultValue={ remark }
            onPressEnter={ ( event ) => {
              handleCandidates( 'update', index, { remark: event.currentTarget.value } )
            } }
          />
        );
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: ( action, candidate, index ) => {
        return (
          <>
            { candidate.status === 'approved' &&
              <>
                <Button size="small" type="primary">Process</Button>
                <Divider type="vertical" />
              </>
            }
            <Select
              onChange={ ( status ) => handleCandidates( 'update', index, { status } ) }
              value={ candidate.status }
              size="small"
            >
              <Select.Option value="waiting">Waiting</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
            </Select>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure?"
              icon={ <Icon type="question-circle-o" /> }
              onConfirm={ () => handleCandidates( 'delete', index ) }
            >
              <a>Delete</a>
            </Popconfirm>
          </>
        );
      }
    }
  ];

  const handleCandidates = ( action, index, record ) => {
    let records = [];

    if ( action === 'delete' ) {
      records = filter( candidates, ( candidate, id ) => id !== index );
    } else if ( action === 'update' ) {
      records = [ ...candidates ];
      records[ index ] = { ...records[ index ], ...record }
    } else {
      const currentDate = moment().format( 'YYYY-MM-DD' );
      records = [ ...candidates ];
      records.push( {
        seaman: seamanId,
        status: 'waiting',
        type: type,
        timestamp: currentDate
      } );
    }

    const { token } = parseCookies();
    const params = {
      candidates: records
    };

    setLoading( true );

    axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/${ order.id } `, params, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      }
    } ).then( ( res ) => {
      setCandidates( res.data.candidates || [] );
      message.success( 'Updated.' );
    } ).catch( () => {
      message.error( 'Error updating.' );
    } ).finally( () => {
      setSeamanId( '' );
      setType( 'proposed' );
      setLoading( false );
    } );
  }

  return (
    <div className={ styles.orderPending }>
      <Form layout="inline">
        <Form.Item>
          <SelectFetch
            value={ seamanId }
            allowClear={ true }
            placeholder="Enter candidate name"
            style={ { width: 190 } }
            action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman` }
            onChange={ ( id ) => setSeamanId( id ) }
          />
        </Form.Item>
        { seamanId &&
          <>
            <Form.Item>
              <Select
                defaultValue={ type }
                style={ { width: 110 } }
                onChange={ ( type ) => setType( type ) }
              >
                { map( orderTypes, ( label, value ) => (
                  <Select.Option key={ value } value={ value }>
                    { label }
                  </Select.Option>
                ) ) }
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={ handleCandidates }
                type="primary"
                loading={ loading }
              >
                Add Candidate
              </Button>
            </Form.Item>
          </>
        }
      </Form>
      { ! isEmpty( candidates ) &&
        <Table
          loading={ loading }
          size="middle"
          pagination={ false }
          className={ styles.orderPendingTable }
          columns={ columns }
          dataSource={ map( candidates, ( order, key ) => ( { key: key, ...order } ) ) }
        />
      }
    </div>
  );
};

export default EditCandidates;
