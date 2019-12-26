import { find } from 'lodash';

export const currencies = [
	{
		symbol: '$',
		name: 'US Dollar',
		symbol_native: '$',
		decimal_digits: 2,
		rounding: 0,
		code: 'USD',
		name_plural: 'US dollars',
	},
];

export const getCurrencySymbol = ( code ) => {
	const currency = find( currencies, [ 'code', code ] );

	if ( currency ) {
		return currency.symbol;
	}

	return '';
};
