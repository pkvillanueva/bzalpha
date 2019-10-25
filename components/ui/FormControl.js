/**
 * External dependencies.
 */
import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { map, unset } from 'lodash';

const FormControl = ( props, ref ) => {
  const {
    label,
    className,
    options = [],
    ...attrs
  } = props;

  let Component, children;

  if ( attrs.type === 'select' ) {
    Component = 'select';
    unset( attrs, 'type' );

    // Get options.
    children = map( props.options, ( label, value ) => (
      <option value={ value } key={ value }>{ label }</option>
    ) );
  } else {
    // Default component.
    Component = 'input';
  }

  if ( label ) {
    return (
      <div className="form-group row">
        <div className="col-md-3">
          <label htmlFor={ attrs.name } className="text-right d-block">{ label }</label>
        </div>
        <div className="col-md-9">
          <Component ref={ ref } className={ classnames( 'form-control', className ) } children={ children } { ...attrs } />
        </div>
      </div>
    );
  }

  return (
    <Component
      ref={ ref }
      className={ classnames( 'form-control', className ) }
      children={ children }
      { ...attrs }
    />
  );
};

export default forwardRef( FormControl );
