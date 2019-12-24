import React, { useContext } from 'react';
import { map } from 'lodash';
import { Button, Popconfirm, Icon, Divider, Select } from 'antd';
import { CandidatesContext } from '~/store/candidates';
import EditOrder from './EditOrder';

const CandidateButtons = ( { candidate } ) => {
  const { order, updateCandidate, deleteCandidate } = useContext( CandidatesContext );
  const buttons = [];

  if ( candidate.seaman.id && candidate.status === 'approved' && order.meta.status === 'pending' ) {
    buttons.push(
      <EditOrder
          title="Save Process Order"
          order={ order }
          saveValues={ {
            seaman: candidate.seaman.id,
            status: 'processing',
            candidates: []
          } }
        >
        <Button size="small" type="primary">Process</Button>
      </EditOrder>
    );
  } else if ( candidate.seaman.id && candidate.status === 'approved' && order.meta.status === 'onboard' ) {
    const { vessel, position, currency, sign_off, return_port } = order.meta;

    buttons.push(
      <EditOrder
          title="Save Reserve Order"
          order={ {
            position,
            currency,
            sign_on: sign_off,
            port: return_port
          } }
          saveValues={ {
            status: 'reserved',
            seaman: candidate.seaman.id,
            vessel: vessel.id,
            parent_order: order.id
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
      icon={ <Icon type="question-circle-o" /> }
      onConfirm={ () => deleteCandidate( candidate.index ) }
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
