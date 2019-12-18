import React, { useState, useContext } from 'react';
import { map, isEmpty, filter } from 'lodash';
import moment from 'moment';
import { Form, Button, Popconfirm, Icon, Table, Tag, Divider, Select, Input } from 'antd';
import SelectFetch from '~/components/SelectFetch';
import { candidateTypes, getCandidateType, isContractExpiring } from '~/utils/orders';
import { OrdersContext } from '~/store/orders';
import EditOrder from './EditOrder';

const EditCandidates = ( { order } ) => {
  const { updateOrder } = useContext( OrdersContext );
  const [ seamanId, setSeamanId ] = useState( '' );
  const [ type, setType ] = useState( 'proposed' );
  const [ candidates, setCandidates ] = useState( order.candidates || [] );

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
        status: type === 'requested' ? 'approved' : 'waiting',
        type: type,
        timestamp: currentDate
      } );
    }

    updateOrder( {
      id: order.id,
      params: {
        candidates: records
      },
      success( res ) {
        setCandidates( res.data.candidates || [] );
      },
      done() {
        setSeamanId( '' );
        setType( 'proposed' );
      }
    } );
  };

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
      render: ( type ) => getCandidateType( type )
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
        const { seaman } = candidate;

        return (
          <>
            { ( candidate.status === 'approved' && order.order_status === 'pending' ) &&
              <>
                <EditOrder
                  titleType="Save"
                  status="processing"
                  order={ order }
                  saveValues={ {
                    seaman: seaman.ID,
                    order_status: 'processing',
                    candidates: []
                  } }
                >
                  <Button size="small" type="primary">Process</Button>
                </EditOrder>
                <Divider type="vertical" />
              </>
            }
            { ( candidate.status === 'approved' && order.order_status === 'onboard' ) &&
              <>
                <Button size="small" type="primary">Reserve</Button>
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

  return (
    <>
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
                { map( candidateTypes, ( label, value ) => (
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
              >
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
          dataSource={ map( candidates, ( order, key ) => ( { key: key, ...order } ) ) }
        />
      }
    </>
  );
};

export default EditCandidates;
