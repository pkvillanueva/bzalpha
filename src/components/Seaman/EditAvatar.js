/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import AvatarUpload from '../AvatarUpload';
import { SeamanContext } from './store/seaman';

const EditAvatar = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { avatar } = seaman;

	const handleSave = ( id ) => {
		updateSeaman( {
			values: {
				featured_image: id,
			},
		} );
	};

	return (
		<AvatarUpload
			onChange={ handleSave }
			src={ avatar }
		/>
	);
};

export default EditAvatar;
