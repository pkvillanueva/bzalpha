/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { nationalities } from '../../utils/options';
import { FormControl, FormControlRepeater } from '../ui';
import { SeamanContext } from '../../store/seaman';

const General = () => {
  const { seamanData, register } = useContext( SeamanContext );

  return (
    <>
      <div className="grid">
        <p className="grid-header">Personal Information</p>
        <div className="grid-body">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">First Name</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.first_name } name="first_name" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Middle Name</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.middle_name } name="middle_name" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Last Name</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.last_name } name="last_name" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Date of Birth</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="date" defaultValue={ seamanData.birth_date } name="birth_date" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Place of Birth</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.birth_place } name="birth_place" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Nationality</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="select" defaultValue={ seamanData.nationality } options={ nationalities } name="nationality" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Address</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.address } name="address" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">City</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.city } name="city" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">State</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.state } name="state" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Zip</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.zip } name="zip" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Country</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.country } name="country" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Mother's Name</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.mothers_name } name="mothers_name" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Father's Name</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.fathers_name } name="fathers_name" ref={ register } />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <p className="grid-header">Employment Information</p>
        <div className="grid-body">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Job Status</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.job_status } name="job_status" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Branch</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.branch } name="branch" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Rank</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.rank } name="rank" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Previous Rank</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.prev_rank } name="prev_rank" ref={ register } />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <label htmlFor="first_name" className="text-right d-block">Min Wage</label>
                </div>
                <div className="col-md-9">
                  <FormControl type="input" defaultValue={ seamanData.min_wage } name="min_wage" ref={ register } />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <p className="grid-header">Contacts</p>
        <div className="grid-body">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <FormControlRepeater
                title="Contact"
                data={ seamanData.contacts }
                headers={ {
                  type: 'Type',
                  contact: 'Contact',
                  main: 'Main',
                  actions: 'Actions'
                } }
                format={ ( item, index, actions ) => (
                  <tr key={ index }>
                    <td>{ item.type }</td>
                    <td>{ item.contact }</td>
                    <td>{ item.main && 'Yes' }</td>
                    { actions( item, index ) }
                  </tr>
                ) }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <p className="grid-header">Educations</p>
        <div className="grid-body">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <FormControlRepeater
                title="Education"
                data={ seamanData.educations }
                headers={ {
                  school: 'School',
                  stage: 'Stage',
                  from: 'From',
                  to: 'To',
                  actions: 'Actions'
                } }
                format={ ( item, index ) => (
                  <tr key={ index }>
                    <td>{ item.school }</td>
                    <td>{ item.stage }</td>
                    <td>{ item.from }</td>
                    <td>{ item.to }</td>
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

export default General;
