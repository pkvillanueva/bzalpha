/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { FormControlRepeater } from '../ui';
import { SeamanContext } from '../../store/seaman';

const SectionRefs = () => {
  const { seamanData } = useContext( SeamanContext );

  return (
    <div className="grid">
      <p className="grid-header">Refs</p>
      <div className="grid-body">
        <FormControlRepeater
          title="Ref"
          data={ seamanData.refs }
          headers={ {
            date: 'Date',
            type: 'Type',
            remarks: 'Remarks',
            user: 'User',
            file: 'File',
            actions: 'Actions'
          } }
          format={ ( item, index ) => (
            <tr key={ index }>
              <td>{ item.date }</td>
              <td>{ item.type }</td>
              <td>{ item.remarks }</td>
              <td>{ item.user }</td>
              <td>{ item.file }</td>
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

export default SectionRefs;
