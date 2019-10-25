/**
 * External dependencies.
 */
import React, { useState, memo } from 'react';
import classnames from 'classnames';
import { mapValues, map, find, isArray } from 'lodash';

const Tabs = ( { content, className, id } ) => {
  // Map new values.
  content = mapValues( content, ( item ) => {
    return {
      ...item,
      id: item.title.replace( /[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '' ).toLowerCase(),
      accessId: `tab-content-${ item.id }`
    };
  } );

  const [ activeTab, setActiveTab ] = useState( find( content, { active: true } ) );
  const handleClick = ( event, id ) => {
    event.preventDefault();
    setActiveTab( find( content, { id: id } ) );
  };

  return (
    <div className={ classnames( 'tab-container', `tab-container-${ id }`, className ) }>
      <ul className="nav nav-pills" role="tablist">
        { map( content, ( tab ) => (
          <li className="nav-item" key={ `tab-nav-item-${ id }-${ tab.id }` }>
            <a onClick={ ( event ) => handleClick( event, tab.id ) } className={ `nav-link ${ activeTab.id === tab.id ? 'active' : '' }` } data-toggle="tab" role="tab" href={ `#tab-content-${ id }-${ tab.id }` } aria-controls={ `tab-content-${ id }-${ tab.id }` } aria-selected="false">{ tab.title }</a>
          </li>
        ) ) }
      </ul>
      <div className="tab-content" id={ `tab-content-${ id }` }>
        { map( content, ( tab ) => (
          <div className={ classnames( 'tab-pane', { 'active': activeTab.id === tab.id } ) } id={ `tab-content-${ id }-${ tab.id }` } role="tabpanel" aria-labelledby={ `tab-content-${ id }-${ tab.id }` } key={ `tab-content-${ id }-${ tab.id }` }>
            { tab.content }
          </div>
        ) ) }
      </div>
    </div>
  );
};

export default Tabs;
