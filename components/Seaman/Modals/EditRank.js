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
import { SeamanContext } from '~/store/seaman';

const EditRank = () => {
  const { seaman, setSeaman, setFieldsValue, setIsSeamanTouched, getFieldDecorator } = useContext( SeamanContext );

  const handleChange = ( values ) => {
    setSeaman( { ...seaman, ...values } );
    setFieldsValue( values );
    setIsSeamanTouched( true );
  }

  getFieldDecorator( 'rank', { initialValue: seaman.rank } );

  return (
    <ModalForm
      title="Edit Rank"
      onChange={ handleChange }
      modalForm={ ( decorator ) => ( <>
        { decorator( 'rank', {
          initialValue: seaman.rank
        } )(
          <Select style={ { width: '100%' } } placeholder="Select a rank">
            { map( ranks, ( rank ) => <Select.Option value={ rank.value } key={ rank.value }>{ rank.name }</Select.Option> ) }
          </Select>
        ) }
      </> ) }
    >
      <Icon style={ { opacity: 0.3 } } type="edit" />
    </ModalForm>
  );
};

export default EditRank;