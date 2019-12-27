import { filter } from 'lodash';
import moment from 'moment';
import { ranks } from './ranks';

export const endOfContract = [
	'At Sea',
	'Compassionate Leave',
	'Demotion',
	'Dismissed',
	'Documents Lacking',
	'Drug or Alcohol Abuse',
	'Dry Dock Supervision',
	'End of Contract',
	'Management Change',
	'Medical Ground',
	'Promotion',
	'Resign',
	'Superintendent Visit',
	'Transfer',
	'Vessel Lay Up',
];

export const getContact = ( seaman ) => {
	return seaman.phone || seaman.email || seaman.skype || seaman.tel || '';
};

export const getCurrentAge = ( birthDate ) => {
	return moment().diff( birthDate, 'years' ) || '';
};

export const getDateDuration = ( start, end ) => {
	if ( ! start || ! end ) {
		return 0;
	}

	let total = 0;

	start = moment( start );
	end = moment( end );
	total += end.diff( start, 'days' );

	if ( ! total || total < 0 ) {
		return 0;
	}

	const years = Math.floor( total / 365 );
	total = total - ( years * 365 );
	const months = Math.floor( total / 30 );
	total = total - ( months * 30 );
	const days = Math.floor( total );

	return `
		${ years ? `${ years }y ` : '' }
		${ months ? `${ months }m ` : '' }
		${ days ? `${ days }d ` : '' }
	`;
};

export const getTotalSeaTime = ( exp ) => {
	let total = 0;

	if ( exp && exp.length ) {
		exp.forEach( ( x ) => {
			if ( x.date_start && x.date_end ) {
				const start = moment( x.date_start );
				const end = moment( x.date_end );
				total += end.diff( start, 'days' );
			}
		} );
	}

	if ( ! total || total < 0 ) {
		return 0;
	}

	const years = Math.floor( total / 365 );
	total = total - ( years * 365 );
	const months = Math.floor( total / 30 );
	total = total - ( months * 30 );
	const days = Math.floor( total );

	return `
    ${ years ? `${ years }y ` : '' }
    ${ months ? `${ months }m ` : '' }
    ${ days }d
  `;
};

export const getRankTotalSeaTime = ( rank, exp ) => {
	const rankExp = [];

	if ( exp && exp.length ) {
		exp.forEach( ( x ) => {
			if ( x.rank === rank ) {
				rankExp.push( x );
			}
		} );
	}

	return getTotalSeaTime( rankExp );
};

export const getStatus = ( jobStatus ) => {
	let status = {};

	switch ( jobStatus ) {
		case 'onboard': status = { state: 'success', name: 'On Board' }; break;
		default: status = { state: 'default', name: 'Stand By' }; break;
	}

	return status;
};

export const getRankName = ( value ) => {
	const rank = filter( ranks, [ 'value', value ] );

	if ( rank.length ) {
		return rank[ 0 ].name;
	}
	return '';
};
