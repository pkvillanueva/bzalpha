import api from './api';

export const userLoginQuery = async ( values ) => {
	const { data } = await api.post( '/jwt-auth/v1/token', values );
	return data;
};
