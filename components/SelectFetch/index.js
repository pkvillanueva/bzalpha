/**
 * External dependencies.
 */
import React, { Component } from 'react';
import axios from 'axios';
import { debounce, map, isEmpty, isArray, isPlainObject } from 'lodash';
import { parseCookies } from 'nookies';
import { Select, Spin } from 'antd';
const { Option } = Select;

class SelectFetch extends Component {
  constructor( props ) {
    super( props );
    this.fetchData = debounce( this.fetchData );
    this.dataKey = props.dataKey || 'id';
    this.labelKey = props.labelKey || 'title';
  }

  state = {
    value: [],
    data: [],
    fetching: false,
    loading: false
  };

  static getDerivedStateFromProps = ( nextProps, prevState ) => {
    // Allow clear value from props.
    if ( isPlainObject( prevState.value ) && ! isEmpty( prevState.value ) && ! nextProps.value ) {
      return {
        value: undefined
      };
    }

    return null;
  };

  componentDidMount = () => {
    this.setState( { loading: false } );

    const { value, initialData } = this.props;
    if ( ! value || isEmpty( initialData ) ) {
      return;
    }

    let data = {};
    if ( isArray( initialData ) ) {
      data = initialData[0];
    } else {
      data = initialData;
    }

    this.setState( { value: {
      key: data[ this.dataKey ],
      label: data[ this.labelKey ]
    } } );
  };

  fetchData = ( params = {} ) => {
    const { token } = parseCookies();

    this.setState( {
      fetching: true,
      data: []
    } );

    axios.get( this.props.action, {
      headers: { 'Authorization': `Bearer ${ token }` },
      params: { ...params, ...this.props.customParams }
    } )
    .then( ( res ) => {
      const data = map( res.data, ( d ) => ( {
        value: d[ this.dataKey ],
        text: this.labelKey === 'title' ? d[ this.labelKey ].rendered : d[ this.labelKey ]
      } ) );

      this.setState( { data: data, fetching: false } );
    } )
    .catch( () => {
      this.setState( { data: [], fetching: false } );
    } );
  };

  handleSearch = ( value ) => {
    this.fetchData( {
      search: value
    } );
  };

  handleChange = ( value ) => {
    this.setState( {
      value,
      fetching: false
    } );

    if ( this.props.onChange ) {
      if ( this.props.withLabelValue ) {
        this.props.onChange( value );
      } else {
        this.props.onChange( value ? value.key : '' );
      }
    }
  };

  handleDropdownVisibleChange = ( open ) => {
    if ( open ) {
      this.fetchData();
    }
  };

  render() {
    const { placeholder, allowClear, className, style, disabled } = this.props;

    return (
      <Select
        notFoundContent={ this.state.fetching && <Spin size="small" /> }
        value={ this.state.value }
        loading={ this.state.loading }
        onDropdownVisibleChange={ this.handleDropdownVisibleChange }
        onSearch={ this.handleSearch }
        onChange={ this.handleChange }
        className={ className }
        allowClear={ allowClear }
        placeholder={ placeholder }
        style={ style }
        disabled={ disabled }
        showSearch={ true }
        labelInValue={ true }
        filterOption={ false }
      >
        { this.state.data.map( d => (
          <Option key={ d.value }>
            { d.text }
          </Option>
        ) ) }
      </Select>
    );
  }
}

export default SelectFetch;
