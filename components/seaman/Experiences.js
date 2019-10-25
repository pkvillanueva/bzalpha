/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { FormControlRepeater } from '../ui';
import { SeamanContext } from '../../store/seaman';

const SectionExperiences = () => {
  const { seamanData } = useContext( SeamanContext );

  return (
    <div className="grid">
      <p className="grid-header">Experiences</p>
      <div className="grid-body">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <FormControlRepeater
              title="Experience"
              data={ seamanData.experiences }
              headers={ {
                from: 'From',
                until: 'Until',
                rank: 'Rank',
                vessel: 'Vessel',
                actions: 'Actions'
              } }
              format={ ( item, index ) => (
                <tr key={ index }>
                  <td>{ item.from }</td>
                  <td>{ item.until }</td>
                  <td>{ item.rank }</td>
                  <td>{ item.vessel }</td>
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

export default SectionExperiences;
