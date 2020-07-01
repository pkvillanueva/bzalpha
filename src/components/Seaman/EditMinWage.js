/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';

/**
 * Internal dependencies.
 */
import ModalForm from '~/components/ModalForm';
import { SeamanContext } from './store/seaman';

const EditMinWage = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { min_wage } = meta;

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
			{ getFieldDecorator( 'min_wage', {
				initialValue: min_wage,
			} )( <InputNumber style={ { width: '100%' } } /> ) }
		</>
	);

	return (
        <ModalForm
			title="Edit Minimum Wage"
			onSave={ handleSave }
			modalForm={ modalForm }
		>
			<EditOutlined style={ { opacity: 0.3 } } />
		</ModalForm>
    );
};

export default EditMinWage;
