/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Icon, InputNumber } from 'antd';

/**
 * Internal dependencies.
 */
import ModalForm from '~/components/ModalForm';
import { SeamanContext } from '../store/seaman';
import { merge } from 'lodash';

const EditMinWage = () => {
	const { seaman, setSeaman, setFieldsValue, setIsSeamanTouched, getFieldDecorator } = useContext( SeamanContext );

	const handleChange = ( { values, done } ) => {
		setSeaman( merge( seaman, values ) );
		setFieldsValue( values );
		setIsSeamanTouched( true );
		done();
	};

	getFieldDecorator( 'meta.min_wage', { initialValue: seaman.meta.min_wage } );

	return (
		<ModalForm
			title="Edit Minimum Wage"
			onChange={ handleChange }
			modalForm={ ( { getFieldDecorator } ) => ( <>
				{ getFieldDecorator( 'meta.min_wage', {
					initialValue: seaman.meta.min_wage,
				} )(
					<InputNumber style={ { width: '100%' } } />
				) }
			</> ) }
		>
			<Icon style={ { opacity: 0.3 } } type="edit" />
		</ModalForm>
	);
};

export default EditMinWage;
