/**
 * External dependencies.
 */
import React, { useContext, useState } from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { map } from 'lodash';
import ReactCountryFlag from 'react-country-flag';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import DataCollection from '~/components/DataCollection';
import { ranks } from '~/utils/ranks';
import { getRankName, getTotalTime, endOfContract } from '~/utils/seaman';
import { countries } from '~/utils/countries';
import { vesselType } from '~/utils/vessel';

const Experiences = () => {
  const { seaman, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );

  const [ experiences, setExperiences ] = useState( seaman.experiences || [] );

  const columns = [
    { title: 'Date Start', dataIndex: 'date_start', key: 'date_start' },
    { title: 'Date End', dataIndex: 'date_end', key: 'date_end' },
    {
      title: 'Sea Time',
      dataIndex: 'seatime',
      key: 'seatime',
      render: ( t, r, i ) => {
        const index = i;
        const prevIndex = index - 1;
        const seaTime = getTotalTime( r.date_start, r.date_end );
        const vacantTime = getTotalTime( r.date_end, i === 0 ? moment() : experiences[ prevIndex ].date_start );
        return `${ seaTime }${ vacantTime ? `/ ${ vacantTime }` : '' }`;
      }
    },
    { title: 'Rank', dataIndex: 'rank', key: 'rank', render: ( r ) => getRankName( r ) },
    { title: 'Vessel', dataIndex: 'vessel', key: 'vessel' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Flag', dataIndex: 'flag', key: 'flag', render: ( r ) => r && <ReactCountryFlag code={ r.toLowerCase() } svg /> },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'CA', dataIndex: 'ca', key: 'ca' },
    { title: 'IMO', dataIndex: 'imo', key: 'imo' },
    { title: 'GRT', dataIndex: 'grt', key: 'grt' },
    { title: 'DWT', dataIndex: 'dwt', key: 'dwt' },
    { title: 'HP', dataIndex: 'hp', key: 'hp' },
    { title: 'KW', dataIndex: 'kw', key: 'kw' },
    { title: 'Engine', dataIndex: 'engine', key: 'engine' },
    { title: 'EOC', dataIndex: 'end_of_contract', key: 'end_of_contract' },
  ];

  const handleSave = ( records ) => {
    // Sort before save.
    records = records.sort( ( a, b ) => {
      return moment( b.date_start ).unix() - moment( a.date_start ).unix();
    } );

    setExperiences( records );
    setFieldsValue( { experiences: records } );
    setIsSeamanTouched( true );
  };

  const handleFormatRecord = ( record ) => {
    return {
      ...record,
      date_start: record['date_start'].format( 'YYYY-MM-DD' ),
      date_end: record['date_end'].format( 'YYYY-MM-DD' )
    }
  };

  return (
    <DataCollection
      title="Experiences"
      columns={ columns }
      data={ experiences }
      modalTitle="Experience"
      onChange={ handleSave }
      formatRecord={ handleFormatRecord }
      modalForm={ ( getFieldDecorator, initialValues, { getFieldValue } ) => [
        <Form.Item key="date_start" label="Date Start">
          { getFieldDecorator( 'date_start', {
            initialValue: initialValues.date_start && moment( initialValues.date_start )
          } )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
        </Form.Item>,
        <Form.Item key="date_end" label="Date End">
          { getFieldDecorator( 'date_end', {
            initialValue: initialValues.date_end && moment( initialValues.date_end )
          } )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
        </Form.Item>,
        <Form.Item key="rank" label="Rank">
          { getFieldDecorator( 'rank', {
            initialValue: initialValues.rank
          } )( <Select style={ { width: '100%' } }>
            { map( ranks, ( rank ) => <Select.Option value={ rank.value } key={ rank.value }>{ rank.name }</Select.Option> ) }
          </Select> ) }
        </Form.Item>,
        <Form.Item key="vessel" label="Vessel">
          { getFieldDecorator( 'vessel', {
            initialValue: initialValues.vessel
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="type" label="Type">
          { getFieldDecorator( 'type', {
            initialValue: initialValues.type
          } )(
            <Select style={ { width: '100%' } }>
              { map( vesselType, ( type ) => <Select.Option key={ type.value } value={ type.value }>{ type.name }</Select.Option> ) }
            </Select>
          ) }
        </Form.Item>,
        <Form.Item key="flag" label="Flag">
          { getFieldDecorator( 'flag', {
            initialValue: initialValues.flag
          } )( <Select style={ { width: '100%' } }>
            { map( countries, ( country ) => <Select.Option value={ country.code } key={ country.code }>{ country.name }</Select.Option> ) }
          </Select> ) }
          { getFieldValue( 'flag' ) && <ReactCountryFlag code={ getFieldValue( 'flag' ).toLowerCase() } svg /> }
        </Form.Item>,
        <Form.Item key="owner" label="Owner">
          { getFieldDecorator( 'owner', {
            initialValue: initialValues.owner
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="ca" label="CA">
          { getFieldDecorator( 'ca', {
            initialValue: initialValues.ca
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="imo" label="IMO">
          { getFieldDecorator( 'imo', {
            initialValue: initialValues.imo
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="grt" label="GRT">
          { getFieldDecorator( 'grt', {
            initialValue: initialValues.grt
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="dwt" label="DWT">
          { getFieldDecorator( 'dwt', {
            initialValue: initialValues.dwt
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="hp" label="HP">
          { getFieldDecorator( 'hp', {
            initialValue: initialValues.hp
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="kw" label="KW">
          { getFieldDecorator( 'kw', {
            initialValue: initialValues.kw
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="engine" label="Engine">
          { getFieldDecorator( 'engine', {
            initialValue: initialValues.engine
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="end_of_contract" label="End of Contract">
          { getFieldDecorator( 'end_of_contract', {
            initialValue: initialValues.end_of_contract
          } )(
            <Select showSearch={ true } style={ { width: '100%' } }>
              { map( endOfContract, ( text, key ) => (
                <Select.Option value={ text } key={ key }>
                  { text }
                </Select.Option>
              ) ) }
            </Select>
          ) }
        </Form.Item>,
      ] }
    />
  );
};

export default Experiences;
