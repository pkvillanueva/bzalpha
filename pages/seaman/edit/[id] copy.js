/**
 * External dependencies.
 */
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { map, filter } from 'lodash';
import {
  Form,
  Input,
  Select,
  Card,
  DatePicker,
  Avatar,
  Row,
  Col,
  Typography,
  Breadcrumb,
  Icon
} from 'antd';

/**
 * Internal dependencies
 */
import App from '../../../components/layout/App';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/layout/PageHeader';
import SeamanTabs from '../../../components/seaman/SeamanTabs';
import { SeamanContext, SeamanProvider } from '../../../store/seaman';
import withAuth from '../../../utils/withAuth';
import { nationalities, provinces, cities } from '../../../utils/options';
import styles from './style.less';

const Edit = Form.create()( ( { form } ) => {
  const { getFieldDecorator, setFieldsValue } = form;
  const { query } = useRouter();
  const [ isSaving, setIsSaving ] = useState( false );
  const [ selectedProvince, setSelectedProvince ] = useState( {} );
  const { seamanData, setSeamanData, handleSubmit, formState, reset } = useContext( SeamanContext );
  console.log( seamanData );
  const saveClass = classnames(
    'btn',
    { 'btn-success': formState.dirty },
    { 'btn-dark disabled': ! formState.dirty }
  );

  const handleSave = async ( newData ) => {
    // Blocks multiple saving.
    if ( isSaving || ! formState.dirty ) {
      return;
    }

    // Set saving.
    setIsSaving( true );

    try {
      const cookies = parseCookies();

      // Start save.
      const res = await axios.post( `http://bzalpha.test/wp-json/bzalpha/v1/seaman/${ query.id }`, newData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ cookies.token }`,
        }
      } );

      // Done saving, reset form.
      setSeamanData( res.data );
      reset( res.data );
      setIsSaving( false );
    } catch( err ) {
      console.log( err );
      setIsSaving( false );
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const handleProvince = ( value ) => {
    const province = filter( provinces, [ 'name', value ] );
    setSelectedProvince( province.length ? province[0] : {} );
    setFieldsValue( { city: '' } );
  };

  return (
    <>
      <PageHeader>
        <Typography.Title level={ 3 }>Edit Seaman</Typography.Title>
        <Card>
          <Row>
            <Col span={ 12 }>
              <Avatar shape="square" size={ 150 } icon="user" src={ seamanData.avatar } />
            </Col>
            <Col span={ 12 }>
              <Typography.Title level={ 3 }>{ seamanData.title.rendered } <Icon type="home" /></Typography.Title>
            </Col>
          </Row>
        </Card>
      </PageHeader>
      <Card>
        <Form { ...formItemLayout } onSubmit={ handleSubmit }>
          <Form.Item label="First Name">{ getFieldDecorator( 'first_name', {} )( <Input /> ) }</Form.Item>
          <Form.Item label="Middle Name">{ getFieldDecorator( 'middle_name', {} )( <Input /> ) }</Form.Item>
          <Form.Item label="Last Name">{ getFieldDecorator( 'last_name', {} )( <Input /> ) }</Form.Item>
          <Form.Item label="Gender">
            { getFieldDecorator( 'gender', { initialValue: 'male' } )( <Select showSearch style={ { width: '174px' } }>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">female</Select.Option>
            </Select> ) }
          </Form.Item>
          <Form.Item label="Nationality">
            { getFieldDecorator( 'nationalityy', { initialValue: 'filipino' } )( <Select showSearch style={ { width: '174px' } }>
              { map( nationalities, ( label, value ) => (
                <Select.Option value={ value } key={ value }>{ label }</Select.Option>
              ) ) }
            </Select> ) }
          </Form.Item>
          <Form.Item label="Date of Birth">{ getFieldDecorator( 'birth_date', {} )( <DatePicker /> ) }</Form.Item>
          <Form.Item label="Place of Birth">{ getFieldDecorator( 'birth_place', {} )( <Input /> ) }</Form.Item>
          <Form.Item label="Country">
            { getFieldDecorator( 'country', { initialValue: 'PH' } )( <Select showSearch style={ { width: '174px' } }>
              <Select.Option value="PH">Philippines</Select.Option>
            </Select> ) }
          </Form.Item>
          <Form.Item label="Address">{ getFieldDecorator( 'address', {} )( <Input.TextArea rows={ 4 }/> ) }</Form.Item>
          <Form.Item label="City">
            { getFieldDecorator( 'city', {} )( <Select showSearch style={ { width: '174px' } }>
              { map( filter( cities, [ 'province', selectedProvince.key ] ), ( city ) => (
                <Select.Option value={ city.name } key={ city.name }>{ city.name }</Select.Option>
              ) ) }
            </Select> ) }
          </Form.Item>
          <Form.Item label="State">
            { getFieldDecorator( 'state', {} )( <Select showSearch style={ { width: '174px' } } onChange={ handleProvince }>
              { map( provinces, ( province ) => (
                <Select.Option value={ province.name } key={ province.name }>{ province.name }</Select.Option>
              ) ) }
            </Select> ) }
          </Form.Item>
          <Form.Item label="Zip">{ getFieldDecorator( 'zip', {} )( <Input /> ) }</Form.Item>
        </Form>
      </Card>
    </>
  );
} );

const SeamanEdit = ( { data } ) => {
  return (
    <div className={ styles.page }>
      <SeamanProvider data={ data }>
        <App>
          <Container>
            <Edit />
          </Container>
        </App>
      </SeamanProvider>
    </div>
  );
};
``
SeamanEdit.getInitialProps = async ( ctx ) => {
  const { id } = ctx.query;

  // Get cookies.
  const cookies = parseCookies( ctx );

  // Get initial data.
  const res = await axios.get( `http://bzalpha.test/wp-json/bzalpha/v1/seaman/${ id }`, {
    headers: {
      'Authorization': `Bearer ${ cookies.token }`
    }
  } );

  return {
    data: res.data
  };
}

export default withAuth( SeamanEdit );
