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
  DatePicker,
  Row,
  Col,
  Tabs,
  Card,
} from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;

/**
 * Internal dependencies
 */
import App from '../../../components/layout/App';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/seaman/PageHeader';
import { SeamanContext, SeamanProvider } from '../../../store/seaman';
import withAuth from '../../../utils/withAuth';
import { nationalities, provinces, cities } from '../../../utils/options';

const Edit = Form.create()( ( { form } ) => {
  const { getFieldDecorator, setFieldsValue } = form;
  const { query } = useRouter();
  const [ isSaving, setIsSaving ] = useState( false );
  const [ selectedProvince, setSelectedProvince ] = useState( {} );
  const { seamanData, setSeamanData, handleSubmit, formState, reset } = useContext( SeamanContext );
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

  const prefixSelector = getFieldDecorator( 'prefix', {
    initialValue: '63',
  } )(
    <Select style={ { width: 70 } }>
      <Option value="63">+63</Option>
    </Select>,
  );

  return (
    <>
      <Form onSubmit={ handleSubmit } colon={ false }>
        <PageHeader data={ seamanData } />
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="General" key="general">
            <Card title="Personal Information" style={ { marginBottom: 24 } }>
              <Row gutter={ [ 14 ] }>
                <Col md={ 8 }>
                  <Form.Item label="First Name">{ getFieldDecorator( 'first_name', { rules: [ { required: true, message: "First name is required." } ] } )( <Input /> ) }</Form.Item>
                </Col>

                <Col md={ 8 }>
                  <Form.Item label="Middle Name">{ getFieldDecorator( 'middle_name', {} )( <Input /> ) }</Form.Item>
                </Col>

                <Col md={ 8 }>
                  <Form.Item label="Last Name">{ getFieldDecorator( 'last_name', { rules: [ { required: true, message: "Last name is required." } ] } )( <Input /> ) }</Form.Item>
                </Col>
              </Row>

              <Row gutter={ [ 14 ] }>
                <Col md={ 8 }>
                  <Form.Item label="Gender">
                    { getFieldDecorator( 'gender', { rules: [ { required: true, message: "Gender is required." } ] } )( <Select showSearch style={ { width: '100%' } }>
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                    </Select> ) }
                  </Form.Item>
                </Col>

                <Col md={ 8 }>
                  <Form.Item label="Nationality">
                    { getFieldDecorator( 'nationalityy', { rules: [ { required: true, message: "Nationality is required." } ] } )( <Select showSearch style={ { width: '100%' } }>
                      { map( nationalities, ( label, value ) => (
                        <Select.Option value={ value } key={ value }>{ label }</Select.Option>
                      ) ) }
                    </Select> ) }
                  </Form.Item>
                </Col>

                <Col md={ 8 }>
                  <Form.Item label="Date of Birth">{ getFieldDecorator( 'birth_date', { rules: [ { required: true, message: "Date of birth is required." } ] } )( <DatePicker style={ { width: '100%' } } /> ) }</Form.Item>
                </Col>
              </Row>

              <Row gutter={ [ 14 ] }>
                <Col md={ 8 }>
                  <Form.Item label="Place of Birth">{ getFieldDecorator( 'birth_place', { rules: [ { required: true, message: "Place of birth is required." } ] } )( <Input /> ) }</Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title="Contact information">
              <Row gutter={ [ 14 ] }>
                <Col md={ 8 }>
                  <Form.Item label="Country">
                    { getFieldDecorator( 'country', { rules: [ { required: true, message: "Country is required." } ] } )( <Select showSearch style={ { width: '100%' } }>
                      <Select.Option value="PH">Philippines</Select.Option>
                    </Select> ) }
                  </Form.Item>
                </Col>

                <Col md={ 16 }>
                  <Form.Item label="Address">{ getFieldDecorator( 'address', { rules: [ { required: true, message: "Address is required." } ] } )( <Input rows={ 4 }/> ) }</Form.Item>
                </Col>
              </Row>

              <Row gutter={ [ 14 ] }>
                <Col md={ 8 }>
                  <Form.Item label="State">
                    { getFieldDecorator( 'state', { rules: [ { required: true, message: "Province is required." } ] } )( <Select showSearch style={ { width: '100%' } } onChange={ handleProvince }>
                      { map( provinces, ( province ) => (
                        <Select.Option value={ province.name } key={ province.name }>{ province.name }</Select.Option>
                      ) ) }
                    </Select> ) }
                  </Form.Item>
                </Col>

                <Col md={ 8 }>
                  <Form.Item label="City">
                    { getFieldDecorator( 'city', { rules: [ { required: true, message: "City is required." } ] } )( <Select showSearch style={ { width: '100%' } }>
                      { map( filter( cities, [ 'province', selectedProvince.key ] ), ( city ) => (
                        <Select.Option value={ city.name } key={ city.name }>{ city.name }</Select.Option>
                      ) ) }
                    </Select> ) }
                  </Form.Item>
                </Col>

                <Col md={ 8 }>
                  <Form.Item label="Zip">{ getFieldDecorator( 'zip', { rules: [ { required: true, message: "Zip is required." } ] } )( <Input type="number" /> ) }</Form.Item>
                </Col>
              </Row>

              <Row gutter={ [ 14 ] }>
                <Col md={ 8 }>
                  <Form.Item label="Tel. Number">
                    {getFieldDecorator('telephone', {})(<Input />)}
                  </Form.Item>
                </Col>

                <Col md={ 8 }>
                  <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                      rules: [ { required: true, message: 'Phone number is required.' } ],
                    })(<Input />)}
                  </Form.Item>
                </Col>

                <Col md={ 8 }>
                  <Form.Item label="Email">
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        }
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={ [ 14 ] }>
                <Col md={ 8 }>
                  <Form.Item label="Skype">{ getFieldDecorator( 'zip', {} )( <Input type="number" /> ) }</Form.Item>
                </Col>
              </Row>
            </Card>
          </TabPane>
          <TabPane tab="Relatives" key="relatives">s</TabPane>
          <TabPane tab="Educations" key="educations">s</TabPane>
          <TabPane tab="Documents" key="documents">s</TabPane>
          <TabPane tab="Passports" key="passports">s</TabPane>
          <TabPane tab="Experiences" key="experiences">s</TabPane>
          <TabPane tab="BMI" key="bmi">s</TabPane>
        </Tabs>
      </Form>
    </>
  );
} );

const SeamanEdit = ( { data } ) => {
  return (
    <div>
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
