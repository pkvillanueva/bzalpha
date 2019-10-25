/**
 * External dependencies.
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { FormControl } from '../ui';
import { SeamanContext } from '../../store/seaman';

const BMI = () => {
  const { seamanData, register } = useContext( SeamanContext );

  return (
    <div className="grid">
      <p className="grid-header">BMI</p>
      <div className="grid-body">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="first_name" className="text-right d-block">Hair Color</label>
              </div>
              <div className="col-md-9">
                <FormControl type="input" defaultValue={ seamanData.hair_color } name="hair_color" ref={ register } />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="first_name" className="text-right d-block">Eyes Color</label>
              </div>
              <div className="col-md-9">
                <FormControl type="input" defaultValue={ seamanData.eyes_color } name="eyes_color" ref={ register } />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="first_name" className="text-right d-block">Height (cm)</label>
              </div>
              <div className="col-md-9">
                <FormControl type="input" defaultValue={ seamanData.height } name="height" ref={ register } />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="first_name" className="text-right d-block">Collar Size (cm)</label>
              </div>
              <div className="col-md-9">
                <FormControl type="input" defaultValue={ seamanData.collar_size } name="collar_size" ref={ register } />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="first_name" className="text-right d-block">Shoes Size (in)</label>
              </div>
              <div className="col-md-9">
                <FormControl type="input" defaultValue={ seamanData.shoes_size } name="shoes_size" ref={ register } />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="first_name" className="text-right d-block">Weight (kg)</label>
              </div>
              <div className="col-md-9">
                <FormControl type="input" defaultValue={ seamanData.weight } name="weight" ref={ register } />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="first_name" className="text-right d-block">Waist Size (cm)</label>
              </div>
              <div className="col-md-9">
                <FormControl type="input" defaultValue={ seamanData.waist_size } name="waist_size" ref={ register } />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMI;
