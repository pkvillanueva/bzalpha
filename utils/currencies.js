import { find } from 'lodash';

export const currencies = {
	USD: {
		symbol: '$',
		name: 'US Dollar',
		symbol_native: '$',
		decimal_digits: 2,
		rounding: 0,
		code: 'USD',
		name_plural: 'US dollars',
	},
	EUR: {
		symbol: '€',
		name: 'Euro',
		symbol_native: '€',
		decimal_digits: 2,
		rounding: 0,
		code: 'EUR',
		name_plural: 'euros',
	},
	PHP: {
		symbol: '₱',
		name: 'Philippine Peso',
		symbol_native: '₱',
		decimal_digits: 2,
		rounding: 0,
		code: 'PHP',
		name_plural: 'Philippine pesos',
	},
};

export const getCurrencySymbol = ( code ) => {
	const currency = find( currencies, [ 'code', code ] );

	if ( currency ) {
		return currency.symbol;
	}

	return '';
};
