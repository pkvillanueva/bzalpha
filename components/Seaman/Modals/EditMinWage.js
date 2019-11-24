/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Icon, Input } from 'antd';

/**
 * Internal dependencies.
 */
import ModalForm from '~/components/ModalForm';
import { SeamanContext } from '~/store/seaman';

const EditMinWage = () => {
  const { seaman, setSeaman, setFieldsValue, setIsSeamanTouched, getFieldDecorator } = useContext( SeamanContext );

  const handleChange = ( values, callback ) => {
    setSeaman( { ...seaman, ...values } );
    setFieldsValue( values );
    setIsSeamanTouched( true );
    callback();
  }

  getFieldDecorator( 'min_wage', { initialValue: seaman.min_wage } );

  return (
    <ModalForm
      title="Edit Minimum Wage"
      onChange={ handleChange }
      modalForm={ ( decorator ) => ( <>
        { decorator( 'min_wage', {
          initialValue: seaman.min_wage
        } )(
          <Input />
        ) }
      </> ) }
    >
      <Icon style={ { opacity: 0.3 } } type="edit" />
    </ModalForm>
  );
};

export default EditMinWage;
