import React, { useContext } from 'react';
import { map } from 'lodash';
import { Button, Popconfirm, Icon, Divider, Select } from 'antd';
import { CandidatesContext } from '~/store/candidates';
import EditOrder from './EditOrder';

const CandidateButtons = ( { candidate, index } ) => {
  const { order, updateCandidate, deleteCandidate } = useContext( CandidatesContext );
  const { seaman, status } = candidate;
  const { order_status } = order;
  const buttons = [];

  if ( seaman.ID && status === 'approved' && order_status === 'pending' ) {
    buttons.push(
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
    );
  } else if ( seaman.ID && status === 'approved' && order_status === 'onboard' ) {
    buttons.push(
      <Button size="small" type="primary">
        Reserve
      </Button>
    );
  }

  buttons.push(
    <Select
      onChange={ ( status ) => updateCandidate( index, { status } ) }
      value={ status }
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
      icon={ <Icon type="question-circle-o" /> }
      onConfirm={ () => deleteCandidate( index ) }
    >
      <a>Delete</a>
    </Popconfirm>
  );

  return map( buttons, ( button, i ) => (
    <span key={ i }>
      { button }
      { ( i !== ( buttons.length - 1 ) ) && <Divider type="vertical" /> }
    </span>
  ) );
};

export default CandidateButtons;
