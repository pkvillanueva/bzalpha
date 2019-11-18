/**
 * External dependencies.
 */
import React, { Component } from 'react';
import axios from 'axios';
import { debounce, map, isEmpty, isArray } from 'lodash';
import { parseCookies } from 'nookies';
import { Select, Spin } from 'antd';
const { Option } = Select;

class SelectFetch extends Component {
  constructor(props) {
    super( props );
    this.lastFetchId = 0;
    this.fetchData = debounce( this.fetchData );
    this.dataKey = props.dataKey || 'id';
    this.labelKey = props.labelKey || 'title';
    this.action = props.action;
  }

  state = {
    data: [],
    fetching: false,
    value: {
      key: '',
      label: ''
    }
  };

  componentDidMount = () => {
    const { value, initialData } = this.props;

    if ( value && ! isEmpty( initialData ) ) {
      this.setState( { value: {
        key: initialData[0][ this.dataKey ],
        label: initialData[0][ this.labelKey ]
      } } );
    }
  }

  fetchData = ( value ) => {
    this.lastFetchId += 1;

    const fetchId = this.lastFetchId;
    const { token } = parseCookies();

    this.setState( {
      data: [],
      fetching: true
    } );

    axios.get( this.action, {
      headers: { 'Authorization': `Bearer ${ token }` },
      params: { search: value }
    } )
    .then( ( res ) => {
      if ( fetchId !== this.lastFetchId ) {
        return;
      }

      const data = map( res.data, ( d ) => ( {
        value: d[ this.dataKey ],
        text: d[ this.labelKey ]
      } ) );

      this.setState( { data } );
    } )
    .catch( () => {
      this.setState( { data: [] } );
    } )
    .finally( () => {
      this.setState( { fetching: false } );
    } );
  };

  handleChange = ( value ) => {
    this.setState( {
      value,
      data: [],
      fetching: false,
    } );

    if ( this.props.onChange ) {
      this.props.onChange( value.key );
    }
  };

  handleFocus = () => {
    this.fetchData();
  };

  render() {
    const { fetching, data, value } = this.state;
    const { placeholder } = this.props;

    return (
      <Select
        labelInValue={ true }
        value={ value }
        placeholder={ placeholder }
        notFoundContent={ fetching && <Spin size="small" /> }
        showSearch={ true }
        onFocus={ this.handleFocus }
        onSearch={ this.fetchData }
        onChange={ this.handleChange }
        style={ { width: '100%' } }
      >
        { data.map( d => (
          <Option key={ d.value }>
            { d.text }
          </Option>
        ) ) }
      </Select>
    );
  }
}

export default SelectFetch;
