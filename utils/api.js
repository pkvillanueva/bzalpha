import { map, mapValues, isEmpty } from 'lodash';
import moment from 'moment';

export const prepareValues = ( values ) => {
  if ( typeof values !== 'object' ) {
    return values;
  }

  values = mapValues( values, ( value ) => {
    if ( value instanceof moment ) {
      return value;
    } else if ( typeof value === 'object' ) {
      let tempID = getID( value );

      if ( typeof tempID === 'object' ) {
        value = prepareValues( value );
      } else {
        value = tempID;
      }
    } else if ( typeof value === 'array' ) {
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
  return date && moment( date ).format( format || 'YYYY-MM-DD' );
};
