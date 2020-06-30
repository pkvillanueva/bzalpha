/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Icon, Select } from 'antd';
import { map } from 'lodash';
import { ranks } from '~/utils/ranks';

/**
 * Internal dependencies.
 */
import ModalForm from '~/components/ModalForm';
import { SeamanContext } from './store/seaman';

const EditRank = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { rank } = meta;

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
			{ getFieldDecorator( 'rank', {
				initialValue: rank,
			} )(
				<Select
					style={ { width: '100%' } }
					placeholder="Select a rank"
					filterOption={ true }
					optionFilterProp="children"
					showSearch={ true }
				>
					{ map( ranks, ( rank ) => <Select.Option value={ rank.value } key={ rank.value }>{ rank.name }</Select.Option> ) }
				</Select>
			) }
		</>
	);

	return (
		<ModalForm
			title="Edit Rank"
			onSave={ handleSave }
			modalForm={ modalForm }
		>
			<Icon style={ { opacity: 0.3 } } type="edit" />
		</ModalForm>
	);
};

export default EditRank;
