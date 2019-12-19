import React, { useContext } from 'react';
import { map, isEmpty } from 'lodash';
import { Form, Button, Table, Tag, Select, Input } from 'antd';
import SelectFetch from '~/components/SelectFetch';
import CandidateButtons from './CandidateButtons';
import { candidateTypes, getCandidateType } from '~/utils/orders';
import { CandidatesProvider, CandidatesContext } from '~/store/candidates';
import withProvider from '~/utils/withProvider';

const Candidates = () => {
  const {
    candidates,
    createCandidate,
    updateCandidate,
    seamanId,
    setSeamanId,
    type,
    setType
  } = useContext( CandidatesContext );

  const columnStatusRender = ( status ) => {
    let color = 'blue';

    if ( status === 'approved' ) {
      color = 'green';
    } else if ( status === 'rejected' ) {
      color = 'red';
    }

    return <Tag color={ color }>{ status }</Tag>
  };

  const columnRemarkRender = ( remark, candidate, index ) => (
    <Input
      key={ candidate.seaman.ID }
      size="small"
      defaultValue={ remark }
      onPressEnter={ ( event ) => {
        updateCandidate( index, {
          remark: event.currentTarget.value
        } );
      } }
    />
  );

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
      render: columnStatusRender
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      render: columnRemarkRender
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: ( action, candidate, index ) => <CandidateButtons candidate={ candidate } index={ index } />
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
          dataSource={ map( candidates, ( candidate, key ) => ( { key: key, ...candidate } ) ) }
        />
      }
    </>
  );
};

export default withProvider( CandidatesProvider, Candidates );
