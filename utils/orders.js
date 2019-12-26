import moment from 'moment';
import { getCurrencySymbol } from '~/utils/currencies';

export const candidateTypes = {
	proposed: 'Proposed',
	requested: 'Requested',
};

export const orderStatus = {
	pending: 'Pending',
	processing: 'Processing',
	onboard: 'Onboard',
	completed: 'Completed',
	cancelled: 'Cancelled',
	reserved: 'Reserved',
};

export const getCandidateType = ( type ) => {
	return candidateTypes[ type ] || '';
};

export const getOrderStatus = ( status ) => {
	return orderStatus[ status ] || '';
};

export const getOrderDetails = ( order ) => {
	const {
		status,
		deadline,
		sign_on,
		sign_off,
		port,
		return_port,
		wage,
		currency,
		contract_plus,
		contract_minus,
		remark,
	} = order.meta;
	let text = '';

	if ( status === 'pending' ) {
		text += `${ sign_on ? `Join Date: ${ moment( sign_on ).format( 'MMM D YY' ) } ` : '' }`;
		text += `${ deadline ? `/ Deadline: ${ moment( deadline ).format( 'MMM D YY' ) } ` : '' }`;
		text += `${ remark ? `(Remark: ${ remark })` : '' }`;
		return text;
	}

	text += `${ sign_on ? `${ status === 'processing' ? 'Join Date:' : 'Joined Date:' } ${ moment( sign_on ).format( 'MMM D YY' ) } ` : '' }`;
	text += `${ port ? `@ ${ port } ` : '' }`;
	text += `${ wage ? `[${ getCurrencySymbol( currency ) }${ wage }] ` : '' }`;
	text += `${ contract_plus ? `${ contract_plus } +/- ` : '' }`;
	text += `${ contract_plus && contract_minus ? `${ contract_minus } ` : '' }`;
	text += `${ sign_off ? `Until: ${ moment( sign_off ).format( 'MMM D YY' ) } ` : '' }`;
	text += `${ return_port ? `@ ${ return_port } ` : '' }`;
	text += `${ remark ? `(Remark: ${ remark })` : '' }`;
	return text;
};

export const isOrderExpiring = ( order, date ) => {
	if ( typeof order === 'object' ) {
		date = order.meta.sign_off;
		order = order.meta.status;
	}

	if ( ! date || order !== 'onboard' ) {
		return false;
	}

	date = moment( date );
	const today = moment();
	const days = date.diff( today, 'days' );
	return days < 60;
};
