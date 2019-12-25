/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Icon, DatePicker } from 'antd';

/**
 * Internal dependencies.
 */
import ModalForm from '~/components/ModalForm';
import { SeamanContext } from '~/store/seaman';
import { parseMoment } from '~/utils/api';
import { merge } from 'lodash';

const EditDateAvailable = () => {
  const { seaman, setSeaman, setFieldsValue, setIsSeamanTouched, getFieldDecorator } = useContext( SeamanContext );

  const handleChange = ( values, callback ) => {
    setSeaman( merge( seaman, values ) );
    setFieldsValue( values );
    setIsSeamanTouched( true );
    callback();
  }

  getFieldDecorator( 'meta.date_available', { initialValue: seaman.meta.date_available } );

  return (
    <ModalForm
      title="Edit Date Available"
      onChange={ handleChange }
      modalForm={ ( decorator ) => ( <>
        { decorator( 'meta.date_available', {
          initialValue: parseMoment( seaman.meta.date_available )
        } )(
          <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } />
        ) }
      </> ) }
    >
      <Icon style={ { opacity: 0.3 } } type="edit" />
    </ModalForm>
  );
};

export default EditDateAvailable;
