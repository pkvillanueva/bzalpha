import { parseFullName as _parseFullName } from 'parse-full-name';

export const parseFullName = ( name ) => {
	const fullName = _parseFullName( name );

	const middle = fullName.middle.split( ' ' );
	if ( middle.length > 1 ) {
		fullName.middle = middle[ middle.length - 1 ];
		middle.pop();
		fullName.first = `${ fullName.first } ${ middle.join( ' ' ) }`;
	}

	return fullName;
};
