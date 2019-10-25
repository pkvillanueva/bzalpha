/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { FormControlRepeater, FormControl } from '../ui';
import { SeamanContext } from '../../store/seaman';

const SectionPassports = () => {
  const { seamanData, setValue, register } = useContext( SeamanContext );

  // Passports.
  register( { name: 'passports', type: 'custom', defaultValue: seamanData.passports } );

  return (
    <>
      <div className="grid">
        <p className="grid-header">Passports</p>
        <div className="grid-body">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <FormControlRepeater
                title="Passport"
                data={ seamanData.passports }
                onChange={ ( newData ) => {
                  setValue( 'passports', newData );
                } }
                headers={ {
                  type: 'Type',
                  num: 'Number',
                  issue_date: 'Issue Date',
                  valid_till: 'Valid Till',
                  issued_by: 'Issued By',
                  actions: 'Actions'
                } }
                format={ ( item, index, actions ) => (
                  <tr key={ index }>
                    <td>{ item.type }</td>
                    <td>{ item.num }</td>
                    <td>{ item.issue_date }</td>
                    <td>{ item.valid_till }</td>
                    <td>{ item.issued_by }</td>
                    { actions( index ) }
                  </tr>
                ) }
                form={ ( data, register ) => (
                  <>
                    <FormControl label="Type" type="text" defaultValue={ data.type } name="type" ref={ register } />
                    <FormControl label="Number" type="num" defaultValue={ data.num } name="num" ref={ register } />
                    <FormControl label="Issue Date" type="date" defaultValue={ data.issue_date } name="issue_date" ref={ register } />
                    <FormControl label="Valid Till" type="date" defaultValue={ data.valid_till } name="valid_till" ref={ register } />
                    <FormControl label="Issued By" type="text" defaultValue={ data.issued_by } name="birth_place" ref={ register } />
                  </>
                ) }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <p className="grid-header">VISA</p>
        <div className="grid-body">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <FormControlRepeater
                title="VISA"
                data={ seamanData.visas }
                headers={ {
                  type: 'Type',
                  num: 'Number',
                  issue_date: 'Issue Date',
                  valid_till: 'Valid Till',
                  issued_by: 'Issued By',
                  actions: 'Actions'
                } }
                format={ ( item, index ) => (
                  <tr key={ index }>
                    <td>{ item.type }</td>
                    <td>{ item.num }</td>
                    <td>{ item.issue_date }</td>
                    <td>{ item.valid_till }</td>
                    <td>{ item.issued_by }</td>
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
    </>
  );
};

export default SectionPassports;
