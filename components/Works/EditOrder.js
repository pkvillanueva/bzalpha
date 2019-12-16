import axios from 'axios';
import moment from 'moment';
import { mapValues } from 'lodash';
import { parseCookies } from 'nookies';
import { Form, message } from 'antd';
import ModalForm from '~/components/ModalForm';
import FormPending from './FormPending';
import styles from './styles.less';

const EditOrder = ( { type, order, children } ) => {
  const handleSave = ( { values }, done, error ) => {
    const { token } = parseCookies();

    // Update date values.
    values = mapValues( values, ( value ) => value instanceof moment ? value.format( 'YYYY-MM-DD' ) : value );

    axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/bz-order/${ order.id }`, values, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
    } ).then( () => {
      done();
      message.success( 'Order updated.' );
    } ).catch( () => {
      error();
      message.error( 'Failed to update order.' );
    } );
  };

  return (
    <ModalForm
      title={ `Edit Order ${ order.position }-${ order.id } `}
      className={ styles.editOrder }
      width={ '100%' }
      onSave={ handleSave }
      modalForm={ ( getFieldDecorator ) => (
        <Form>
          { type === 'pending' && <FormPending getFieldDecorator={ getFieldDecorator } order={ order } /> }
        </Form>
      ) }
    >
      { children }
    </ModalForm>
  );
};

export default EditOrder;
