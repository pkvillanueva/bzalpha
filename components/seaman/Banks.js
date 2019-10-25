/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { FormControlRepeater } from '../ui';
import { SeamanContext } from '../../store/seaman';

const Banks = () => {
  const { seamanData } = useContext( SeamanContext );

  return (
    <div className="grid">
      <p className="grid-header">Banks</p>
      <div className="grid-body">
        <FormControlRepeater
          title="Account"
          data={ seamanData.banks }
          headers={ {
            name: 'Name',
            address: 'Address',
            account_name: 'Acc. Name',
            account_address: 'Acc. Address',
            account_num: 'Acc. Number',
            currency: 'Currency',
            kin: 'Kin',
            additional_info: 'Additional Info',
            main: 'Main',
            actions: 'Actions'
          } }
          format={ ( item, index ) => (
            <tr key={ index }>
              <td>{ item.name }</td>
              <td>{ item.address }</td>
              <td>{ item.account_name }</td>
              <td>{ item.account_address }</td>
              <td>{ item.account_num }</td>
              <td>{ item.currency }</td>
              <td>{ item.kin }</td>
              <td>{ item.additional_info }</td>
              <td>{ item.main && 'Yes' }</td>
              { item.actions }
            </tr>
          ) }
          onAdd={ () => console.log( 'Add' ) }
          onDelete={ ( item, index ) => console.log( 'Delete', item, index ) }
          onEdit={ ( item, index ) => console.log( 'Edit', item, index ) }
        />
      </div>
    </div>
  );
};

export default Banks;
