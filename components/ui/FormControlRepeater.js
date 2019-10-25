/**
 * External dependencies.
 */
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import classnames from 'classnames';
import { map, filter, isEmpty, size } from 'lodash';

const FormControlRepeater = ( { className, title, data, headers, format, form, onChange } ) => {
  const [ editing, setEditing ] = useState( -1 );

  const [ isEditing, setIsEditing ] = useState( false );

  const [ value, setValue ] = useState( data );

  const { register, getValues } = useForm();

  const handleSave = ( event ) => {
    event.preventDefault();

    const formValue = getValues();

    console.log( formValue );
  };

  const handleNew = ( event ) => {
    event.preventDefault();
  };

  const handleDelete = ( event, index ) => {
    event.preventDefault();

    if ( confirm( 'Are you sure you want to remove this item?' ) ) {
      const newData = filter( value, ( data, itemIndex ) => itemIndex !== index );
      setValue( newData );
      onChange( newData );
    }
  };

  const handleEdit = ( event, index ) => {
    event.preventDefault();

    setEditing( index );
    setIsEditing( true );
  };

  const actions = ( index ) => (
    <td className="actions">
      <div className="buttons">
        <button className="delete" title={ `Delete ${ title }` } onClick={ ( event ) => handleDelete( event, index ) }>
          <i className="mdi mdi-delete"></i>
        </button>
        <button className="edit" title={ `Edit ${ title }` } onClick={ ( event ) => handleEdit( event, index ) }>
          <i className="mdi mdi-pencil"></i>
          </button>
      </div>
    </td>
  );

  className = classnames( [
    'table',
    { 'table-bordered': ! className },
    className && className,
    headers.actions && 'actions-table'
  ] );

  return (
    <>
      <div className="repeater-table">
        <div className="text-right mb-4">
          <button className="btn btn-primary btn-sm" onClick={ ( event ) => handleNew( event ) }>{ `Add ${ title }` }</button>
        </div>
        <div className="table-responsive">
          <table className={ className }>
            <thead>
              <tr>
                { map( headers, ( label, index ) => <th key={ index }>{ label }</th> ) }
              </tr>
            </thead>
            <tbody>
              {
                ! isEmpty( value ) ?
                map( value, ( item, index ) => format( item, index, actions ) ) :
                <tr><td className="empty-table" colSpan={ size( headers ) }>No data found.</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FormControlRepeater;
