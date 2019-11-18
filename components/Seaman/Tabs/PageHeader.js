/**
 * External dependencies.
 */
import React, { useContext, useState, useRef } from 'react';
import {
  Avatar,
  Row,
  Col,
  PageHeader as Header,
  Button,
  Card,
  Statistic,
  Icon,
  Popover,
  Input,
  Select
} from 'antd';

/**
 * Internal dependencies.
 */
import { isEmpty, map } from 'lodash';
import moment from 'moment';
import { SeamanContext } from '~/store/seaman';
import FileUpload from '~/components/FileUpload';
import { ranks } from '~/utils/ranks';
import { getTotalSeaTime, getRankTotalSeaTime, getRankName } from '~/utils/seaman';
import styles from './styles.less';

/**
 * Title component.
 */
const Title = () => {
  const { seaman } = useContext( SeamanContext );

  return ( <>
    <Icon className={ styles.star } type="star" theme="twoTone" />
    { seaman.title.rendered }
  </> );
};

/**
 * Avatar component.
 */
const EditAvatar = () => {
  const { seaman, getFieldDecorator } = useContext( SeamanContext );
  const [ avatar, setAvatar ] = useState( seaman.avatar );

  return ( <>
    <Avatar className={ styles.avatar } shape="square" size={ 175 } src={ avatar } />
    <div className={ styles.changePhoto }>
      { getFieldDecorator( 'featured_image', {
        initialValue: seaman.featured_image,
        valuePropName: 'file',
        getValueFromEvent: ( file ) => {
          if ( isEmpty( file ) ) {
            return undefined;
          } else {
            setAvatar( file.url );
            return file.id;
          }
        },
      } )(
        <FileUpload block={ true } showUploadList={ false } text="Change Photo" />
      ) }
    </div>
  </> );
};

/**
 * Rank component.
 */
const EditRank = () => {
  const { seaman, setSeaman, getFieldDecorator, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );
  const [ editRank, setEditRank ] = useState( false );
  const rank = useRef( null );
  getFieldDecorator( 'rank', { initialValue: seaman.rank } );

  return (
    <Popover
      visible={ editRank }
      title="Edit Rank"
      content={ <>
        <Select ref={ rank } style={ { width: '270px', display: 'block' } } placeholder="Select a rank">
          { map( ranks, ( rank ) => <Select.Option value={ rank.value } key={ rank.value }>{ rank.name }</Select.Option> ) }
        </Select>
        <Button
          style={ { marginTop: 10 } }
          type="primary"
          size="small"
          onClick={ () => {
            const value = rank.current.rcSelect.state.value.length ? rank.current.rcSelect.state.value[0] : '';
            setSeaman( { ...seaman, 'rank': value } );
            setFieldsValue( { 'rank': value } );
            setIsSeamanTouched( true );
            setEditRank( false );
            rank.current.rcSelect.state.value = '';
          } }
        >OK</Button>
        <Button
          style={ { marginTop: 10, marginLeft: 5 } }
          type="default"
          size="small"
          onClick={ () => {
            setEditRank( false );
            rank.current.rcSelect.state.value = '';
          } }
        >Cancel</Button>
      </> }
    >
      <Icon style={ { opacity: 0.3 } } type="edit" onClick={ () => setEditRank( ! editRank ) } />
    </Popover>
  );
};

/**
 * Min wage component.
 */
const EditMinWage = () => {
  const { seaman, setSeaman, getFieldDecorator, setFieldsValue, setIsSeamanTouched } = useContext( SeamanContext );
  const [ editMinWage, setEditMinWage ] = useState( false );
  const minWage = useRef( null );
  getFieldDecorator( 'min_wage', { initialValue: seaman.min_wage } );

  return (
    <Popover
      visible={ editMinWage }
      title="Edit Min. Wage"
      content={ <>
        <Input ref={ minWage } />
        <Button
          style={ { marginTop: 10 } }
          type="primary"
          size="small"
          onClick={ () => {
            setSeaman( { ...seaman, 'min_wage': minWage.current.state.value } );
            setFieldsValue( { 'min_wage': minWage.current.state.value } );
            setIsSeamanTouched( true );
            setEditMinWage( false );
            minWage.current.input.value = '';
            minWage.current.state.value = '';
          } }
        >
          Ok
        </Button>
        <Button
          style={ { marginTop: 10, marginLeft: 5 } }
          type="default"
          size="small"
          onClick={ () => {
            setEditMinWage( false );
            minWage.current.input.value = '';
            minWage.current.state.value = '';
          } }
        >
          Cancel
        </Button>
      </> }
    >
      <Icon style={ { opacity: 0.3 } } type="edit" onClick={ () => setEditMinWage( ! editMinWage ) } />
    </Popover>
  );
};

/**
 * Page header component.
 */
const PageHeader = ( { handleSave } ) => {
  const { seaman, isSaving, isSeamanTouched, isFieldsTouched } = useContext( SeamanContext );
  const age = moment().diff( seaman.birth_date, 'years' ) || 'N/A';
  const contact = seaman.phone || seaman.email || seaman.skype || seaman.tel || 'N/A';
  const routes = [
    { path: '/', breadcrumbName: 'Dashboard' },
    { path: '/seamen', breadcrumbName: 'Seamen' },
    { path: '', breadcrumbName: 'Edit Seaman' },
  ];

  return (
    <Header
      className={ styles.pageHeader }
      title="Edit Seaman"
      breadcrumb={ { routes } }
      extra={ [
        <Button type="primary" key="save" onClick={ handleSave } disabled={ ( ! isSeamanTouched && ! isFieldsTouched() ) } loading={ isSaving }>Save</Button>
      ] }
    >
      <Card className={ styles.card } title={ <Title /> }>
        <Row type="flex" gutter={ [ 24 ] }>
          <Col>
            <EditAvatar />
            <div className={ styles.statsInfo } >
              <Statistic title="Age" value={ age } />
              <Statistic title="Contact" value={ contact } />
            </div>
          </Col>
          <Col style={ { flex: 1 } }>
            <Row className={ styles.stats } type="flex" gutter={ [ 14 ] }>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic prefix={ <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> } title="Status" value="Currently Onboard" valueStyle={ { color: '#52c41a' } } />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic
                    title="Rank"
                    value={ getRankName( seaman.rank ) }
                    suffix={ <EditRank /> }
                  />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic
                    prefix={ <Icon type="dollar" /> }
                    title="Min. Wage"
                    value={ seaman.min_wage }
                    suffix={ <EditMinWage /> }
                  />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic title="Pool" value="Durande" formatter={ value => <a>{ value }</a>} />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic title="Total Sea Time" value={ getTotalSeaTime( seaman.experiences ) } />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic title={ `Total Sea Time as ${ seaman.rank }` } value={ getRankTotalSeaTime( seaman.rank, seaman.experiences ) } />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Header>
  );
};

export default PageHeader;
