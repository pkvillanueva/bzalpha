/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Form, Input, DatePicker, Select, InputNumber, Row, Col } from 'antd';
import moment from 'moment';
import { map } from 'lodash';
import ReactCountryFlag from 'react-country-flag';

/**
 * Internal dependencies.
 */
import { SeamanContext } from './store/seaman';
import DataCollection from '~/components/DataCollection';
import { ranks } from '~/utils/ranks';
import { getRankName, getDateDuration, endOfContract } from '~/utils/seaman';
import { countries } from '~/utils/countries';
import { currencies } from '~/utils/currencies';
import { vesselType } from '~/utils/vessel';
import { dateFormat, parseMoment } from '~/utils/api';

const Experiences = () => {
	const { seaman, updateSeaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const { experiences } = meta;

	const columns = [
		{
			title: 'Date Start',
			dataIndex: 'date_start',
			key: 'date_start',
			render: dateFormat,
		},
		{
			title: 'Date End',
			dataIndex: 'date_end',
			key: 'date_end',
			render: dateFormat,
		},
		{
			title: 'Sea Time',
			dataIndex: 'seatime',
			key: 'seatime',
			render: renderSeatime,
		},
		{
			title: 'Rank',
			dataIndex: 'rank',
			key: 'rank',
			render: getRankName,
		},
		{
			title: 'Wage',
			dataIndex: 'wage',
			key: 'wage',
			render: renderWage,
		},
		{
			title: 'EOC',
			dataIndex: 'end_of_contract',
			key: 'end_of_contract',
		},
		{
			title: 'Owner',
			dataIndex: 'owner',
			key: 'owner',
		},
		{
			title: 'Vessel',
			dataIndex: 'vessel',
			key: 'vessel',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Flag',
			dataIndex: 'flag',
			key: 'flag',
			render: renderFlag,
		},
		{
			title: 'IMO',
			dataIndex: 'imo',
			key: 'imo',
		},
		{
			title: 'GRT',
			dataIndex: 'grt',
			key: 'grt',
		},
		{
			title: 'DWT',
			dataIndex: 'dwt',
			key: 'dwt',
		},
		{
			title: 'HP',
			dataIndex: 'hp',
			key: 'hp',
		},
		{
			title: 'KW',
			dataIndex: 'kw',
			key: 'kw',
		},
		{
			title: 'Engine',
			dataIndex: 'engine',
			key: 'engine',
		},
	];

	const handleSave = ( { values, success, error } ) => {
		updateSeaman( {
			success,
			error,
			values: {
				meta: {
					experiences: sortExperiences( values ),
				},
			},
		} );
	};

	return (
		<DataCollection
			columns={ columns }
			dataSource={ sortExperiences( experiences ) }
			onSave={ handleSave }
			modalProps={ {
				width: '100%',
				style: { maxWidth: 960 },
				title: 'Experience',
				form: modalForm,
			} }
		/>
	);
};

const modalForm = ( { getFieldDecorator }, initialValues ) => (
	<>
		<Row gutter={ 36 }>
			<Col lg={ 12 }>
				<Row gutter={ 36 }>
					<Col lg={ 12 }>
						<Form.Item label="Date Start">
							{ getFieldDecorator( 'date_start', {
								rules: [ { required: true, message: 'Date start is required.' } ],
								initialValue: parseMoment( initialValues.date_start ),
							} )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
						</Form.Item>
					</Col>
					<Col lg={ 12 }>
						<Form.Item label="Date End">
							{ getFieldDecorator( 'date_end', {
								rules: [ { required: true, message: 'Date end is required.' } ],
								initialValue: parseMoment( initialValues.date_end ),
							} )( <DatePicker placeholder="YYYY-MM-DD" style={ { width: '100%' } } /> ) }
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col lg={ 12 }>
				<Row gutter={ 36 }>
					<Col lg={ 12 }>
						<Form.Item label="Rank">
							{ getFieldDecorator( 'rank', {
								rules: [ { required: true, message: 'Rank is required.' } ],
								initialValue: initialValues.rank,
							} )( <Select style={ { width: '100%' } }>
								{ map( ranks, ( rank ) => <Select.Option value={ rank.value } key={ rank.value }>{ rank.name }</Select.Option> ) }
							</Select> ) }
						</Form.Item>
					</Col>
					<Col lg={ 12 }>
						<Form.Item label="End of Contract">
							{ getFieldDecorator( 'end_of_contract', {
								rules: [ { required: true, message: 'Field is required.' } ],
								initialValue: initialValues.end_of_contract,
							} )(
								<Select showSearch={ true } style={ { width: '100%' } }>
									{ map( endOfContract, ( text, key ) => (
										<Select.Option value={ text } key={ key }>
											{ text }
										</Select.Option>
									) ) }
								</Select>
							) }
						</Form.Item>
					</Col>
				</Row>
			</Col>
		</Row>
		<Row gutter={ 36 }>
			<Col lg={ 12 }>
				<Row gutter={ 36 }>
					<Col lg={ 12 }>
						<Form.Item label="Currency">
							{ getFieldDecorator( 'currency', {
								initialValue: initialValues.currency,
							} )(
								<Select style={ { width: '100%' } }>
									{ map( currencies, ( currency ) => (
										<Select.Option value={ currency.code } key={ currency.code }>
											{ `(${ currency.symbol }) ${ currency.name }` }
										</Select.Option>
									) ) }
								</Select>
							) }
						</Form.Item>
					</Col>
					<Col lg={ 12 }>
						<Form.Item label="Wage">
							{ getFieldDecorator( 'wage', {
								initialValue: initialValues.wage,
							} )( <InputNumber style={ { width: '100%' } } /> ) }
						</Form.Item>
					</Col>
				</Row>
			</Col>
		</Row>
		<Row gutter={ 36 }>
			<Col lg={ 12 }>
				<Row gutter={ 36 }>
					<Col lg={ 12 }>
						<Form.Item label="Vessel">
							{ getFieldDecorator( 'vessel', {
								rules: [ { required: true, message: 'Vessel is required.' } ],
								initialValue: initialValues.vessel,
							} )( <Input /> ) }
						</Form.Item>
					</Col>
					<Col lg={ 12 }>
						<Form.Item label="Owner">
							{ getFieldDecorator( 'owner', {
								initialValue: initialValues.owner,
							} )( <Input /> ) }
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col lg={ 12 }>
				<Row gutter={ 36 }>
					<Col lg={ 12 }>
						<Form.Item label="Type">
							{ getFieldDecorator( 'type', {
								initialValue: initialValues.type,
							} )(
								<Select style={ { width: '100%' } }>
									{ map( vesselType, ( type ) => <Select.Option key={ type.value } value={ type.value }>{ type.name }</Select.Option> ) }
								</Select>
							) }
						</Form.Item>
					</Col>
					<Col lg={ 12 }>
						<Form.Item label="Flag">
							{ getFieldDecorator( 'flag', {
								initialValue: initialValues.flag,
							} )( <Select style={ { width: '100%' } }>
								{ map( countries, ( country ) => <Select.Option value={ country.code } key={ country.code }>{ country.name }</Select.Option> ) }
							</Select> ) }
						</Form.Item>
					</Col>
				</Row>
			</Col>
		</Row>
		<Row gutter={ 36 }>
			<Col lg={ 12 }>
				<Row gutter={ 36 }>
					<Col lg={ 12 }>
						<Form.Item label="IMO">
							{ getFieldDecorator( 'imo', {
								initialValue: initialValues.imo,
							} )( <Input /> ) }
						</Form.Item>
					</Col>
					<Col lg={ 12 }>
						<Form.Item label="GRT">
							{ getFieldDecorator( 'grt', {
								initialValue: initialValues.grt,
							} )( <Input /> ) }
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col lg={ 12 }>
				<Row gutter={ 36 }>
					<Col lg={ 12 }>
						<Form.Item label="DWT">
							{ getFieldDecorator( 'dwt', {
								initialValue: initialValues.dwt,
							} )( <Input /> ) }
						</Form.Item>
					</Col>
					<Col lg={ 12 }>
						<Form.Item label="KW">
							{ getFieldDecorator( 'kw', {
								initialValue: initialValues.kw,
							} )( <Input /> ) }
						</Form.Item>
					</Col>
				</Row>
			</Col>
		</Row>
		<Row gutter={ 36 }>
			<Col lg={ 12 }>
				<Row gutter={ 36 }>
					<Col lg={ 12 }>
						<Form.Item label="HP">
							{ getFieldDecorator( 'hp', {
								initialValue: initialValues.hp,
							} )( <Input /> ) }
						</Form.Item>
					</Col>
					<Col lg={ 12 }>
						<Form.Item label="Engine">
							{ getFieldDecorator( 'engine', {
								initialValue: initialValues.engine,
							} )( <Input /> ) }
						</Form.Item>
					</Col>
				</Row>
			</Col>
		</Row>
	</>
);

const sortExperiences = ( experiences ) => {
	return experiences.sort( ( a, b ) => {
		return moment( b.date_start ).unix() - moment( a.date_start ).unix();
	} );
};

const renderSeatime = ( seatime, experience, index, experiences ) => {
	const duration = getDateDuration( experience.date_start, experience.date_end );

	if ( ! duration ) {
		return;
	}

	let vacant = '';

	if ( experiences[ index - 1 ] && experiences[ index - 1 ].date_end ) {
		vacant = getDateDuration( experience.date_end, experiences[ index - 1 ].date_end );
	} else {
		vacant = getDateDuration( experience.date_end, moment() );
	}

	return (
		<>
			{ duration }
			{ vacant ? ' / ' : '' }
			{ vacant ? <span style={ { color: '#aaa' } }>{ vacant }</span> : '' }
		</>
	);
};

const renderFlag = ( flag ) => {
	return flag && <ReactCountryFlag code={ flag } svg />;
};

const renderWage = ( wage, { currency } ) => {
	if ( ! currency && ! wage ) {
		return '';
	}

	return `${ currency ? `[${ currency }] ` : '' }${ wage || '' }`;
};

export default Experiences;
