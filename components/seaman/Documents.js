/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { FormControlRepeater } from '../ui';
import { SeamanContext } from '../../store/seaman';

const Documents = () => {
  const { seamanData } = useContext( SeamanContext );

  return (
    <div className="grid">
      <p className="grid-header">Documents</p>
      <div className="grid-body">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <FormControlRepeater
              title="Document"
              data={ seamanData.documents }
              headers={ {
                name: 'Name',
                num: 'Number',
                issue_date: 'Issue Date',
                valid_until: 'Valid Until',
                issued_by: 'Issued By',
                file: 'File',
                actions: 'Actions'
              } }
              format={ ( item, index ) => (
                <tr key={ index }>
                  <td>{ item.name }</td>
                  <td>{ item.num }</td>
                  <td>{ item.issue_date }</td>
                  <td>{ item.valid_until }</td>
                  <td>{ item.issued_by }</td>
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
      </div>
    </div>
  );
};

export default Documents;
