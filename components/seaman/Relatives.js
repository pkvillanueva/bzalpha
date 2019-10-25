/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { FormControlRepeater } from '../ui';
import { SeamanContext } from '../../store/seaman';

const Relatives = () => {
  const { seamanData } = useContext( SeamanContext );

  return (
    <div className="grid">
      <p className="grid-header">Relatives</p>
      <div className="grid-body">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <FormControlRepeater
              title="Person"
              data={ seamanData.relatives }
              headers={ {
                first_name: 'First Name',
                last_name: 'Last Name',
                kin: 'Kin',
                contact: 'Contact',
                actions: 'Actions'
              } }
              format={ ( item, index ) => (
                <tr key={ index }>
                  <td>{ item.first_name }</td>
                  <td>{ item.last_name }</td>
                  <td>{ item.kin }</td>
                  <td>{ item.contact }</td>
                  { item.actions }
                </tr>
              ) }
              onAdd={ () => console.log( 'Add' ) }
              onDelete={ ( item, index ) => console.log( 'Delete', item, index ) }
              onEdit={ ( item, index ) => console.log( 'Edit', item, index ) }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatives;
