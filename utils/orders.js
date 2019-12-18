import moment from 'moment';

export const candidateTypes = {
  proposed: 'Proposed',
  requested: 'Requested'
};

export const orderStatus = {
  pending: 'Pending',
  processing: 'Processing',
  onboard: 'Onboard',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export const getCandidateType = ( type ) => {
  return candidateTypes[ type ] || '';
};

export const getOrderStatus = ( status ) => {
  return orderStatus[ status ] || '';
};

export const isContractExpiring = ( date ) => {
  if ( ! date ) {
    return false;
  }

  date = moment( date );
  const today = moment();
  const days = date.diff( today, 'days' );
  return days < 60;
}
