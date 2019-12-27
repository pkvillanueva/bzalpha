import { map, mapValues, isEmpty, isPlainObject, isNull, isArray, isString } from 'lodash';
import moment from 'moment';

export const prepareValues = ( values ) => {
	if ( ! isPlainObject( values ) ) {
		return values;
	}

	values = mapValues( values, ( value ) => {
		if ( isNull( value ) || value instanceof moment ) {
			return value;
		} else if ( isPlainObject( value ) ) {
			const tempID = getID( value );

			if ( isPlainObject( tempID ) ) {
				value = prepareValues( value );
			} else {
				value = tempID;
			}
		} else if ( isArray( value ) ) {
			value = map( value, ( item ) => prepareValues( item ) );
		}

		return value;
	} );

	return values;
};

export const getID = ( value ) => {
	if ( typeof value !== 'object' ) {
		return value;
	} else if ( value.id ) {
		return value.id;
	}

	return value;
};

export const parseMoment = ( value ) => {
	if ( isEmpty( value ) ) {
		return undefined;
	}

	return moment( value );
};

export const dateFormat = ( date, format ) => {
	if ( ! format || ! isString( format ) ) {
		format = 'YYYY-MM-DD';
	}

	return date && moment( date ).format( format );
};
