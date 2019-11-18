/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { map } from 'lodash';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import DataCollection from '~/components/DataCollection';
import { ranks } from '~/utils/ranks';
import { getRankName } from '~/utils/seaman';
import countries from '~/utils/countries';

const Experiences = () => {
  const { seaman, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );

  const columns = [
    { title: 'Date Start', dataIndex: 'date_start', key: 'date_start' },
    { title: 'Date End', dataIndex: 'date_end', key: 'date_end' },
    { title: 'Rank', dataIndex: 'rank', key: 'rank', render: ( r ) => getRankName( r ) },
    { title: 'Vessel', dataIndex: 'vessel', key: 'vessel' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'IMO', dataIndex: 'imo', key: 'imo' },
    { title: 'MMSI', dataIndex: 'mmsi', key: 'mmsi' },
    { title: 'GRT', dataIndex: 'grt', key: 'grt' },
    { title: 'DWT', dataIndex: 'dwt', key: 'dwt' },
    { title: 'Flag', dataIndex: 'flag', key: 'flag' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
  ];

  const handleSave = ( records ) => {
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
      data={ seaman.experiences }
      modalTitle="Experience"
      onChange={ handleSave }
      formatRecord={ handleFormatRecord }
      modalForm={ ( getFieldDecorator, initialValues ) => [
        <Form.Item key="date_start" label="Issue Date">
          { getFieldDecorator( 'date_start', {
            initialValue: moment( initialValues.date_start )
          } )( <DatePicker style={ { width: '100%' } } /> ) }
        </Form.Item>,
        <Form.Item key="date_end" label="Valid Till">
          { getFieldDecorator( 'date_end', {
            initialValue: moment( initialValues.date_end )
          } )( <DatePicker style={ { width: '100%' } } /> ) }
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
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="imo" label="IMO">
          { getFieldDecorator( 'imo', {
            initialValue: initialValues.imo
          } )( <Input /> ) }
        </Form.Item>,
        <Form.Item key="mmsi" label="MMSI">
          { getFieldDecorator( 'mmsi', {
            initialValue: initialValues.mmsi
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
        <Form.Item key="flag" label="Flag">
          { getFieldDecorator( 'flag', {
            initialValue: initialValues.flag
          } )( <Select style={ { width: '100%' } }>
            { map( countries, ( country ) => <Select.Option value={ country.code } key={ country.code }>{ country.name }</Select.Option> ) }
          </Select> ) }
        </Form.Item>,
        <Form.Item key="owner" label="Owner">
          { getFieldDecorator( 'owner', {
            initialValue: initialValues.owner
          } )( <Input /> ) }
        </Form.Item>
      ] }
    />
  );
};

export default Experiences;
