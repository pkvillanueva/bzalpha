/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';

/**
 * Internal dependencies.
 */
import ModalForm from '~/components/ModalForm';
import { SeamanContext } from './store/seaman';
import { parseMoment } from '~/utils/api';

const EditDateAvailable = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { date_available } = meta;

	const handleSave = ( { values, success, error } ) => {
		updateSeaman( {
			success,
			error,
			values: {
				meta: {
					...values,
				},
			},
		} );
	};

	const modalForm = ( { getFieldDecorator } ) => (
		<>
			{ getFieldDecorator( 'date_available', {
				initialValue: parseMoment( date_available ),
			} )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
		</>
	);

	return (
        <ModalForm
			title="Edit Date Available"
			onSave={ handleSave }
			modalForm={ modalForm }
		>
			<EditOutlined style={ { opacity: 0.3 } } />
		</ModalForm>
    );
};

export default EditDateAvailable;
