import moment from 'moment';
import { isPlainObject, isEmpty } from 'lodash';
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

export const orderStatusColor = {
	processing: 'blue',
	onboard: 'green',
};

export const getCandidateType = ( type ) => {
	return candidateTypes[ type ] || '';
};

export const getOrderStatus = ( status ) => {
	if ( isEmpty( status ) ) {
		return 'Stand By';
	} else if ( isPlainObject( status ) && status.meta ) {
		status = status.meta.status;
	}

	return orderStatus[ status ] || 'Stand By';
};

export const getOrderStatusColor = ( status ) => {
	if ( isEmpty( status ) ) {
		return 'default';
	} else if ( isPlainObject( status ) && status.meta ) {
		status = status.meta.status;
	}

	return orderStatusColor[ status ] || 'default';
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
		text += `${ sign_on ? `Join Date: ${ moment( sign_on ).format( 'll' ) } ` : '' }`;
		text += `${ deadline ? `/ Deadline: ${ moment( deadline ).format( 'll' ) } ` : '' }`;
		text += `${ remark ? `(Remark: ${ remark })` : '' }`;
		return text;
	}

	text += `${ sign_on ? `${ status === 'processing' ? 'Join Date:' : 'Joined Date:' } ${ moment( sign_on ).format( 'll' ) } ` : '' }`;
	text += `${ port ? `@ ${ port } ` : '' }`;
	text += `${ wage ? `[${ getCurrencySymbol( currency ) }${ wage }] ` : '' }`;
	text += `${ contract_plus ? `${ contract_plus } +/- ` : '' }`;
	text += `${ contract_plus && contract_minus ? `${ contract_minus } ` : '' }`;
	text += `${ sign_off ? `Until: ${ moment( sign_off ).format( 'll' ) } ` : '' }`;
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
