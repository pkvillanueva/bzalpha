/**
 * External dependencies.
 */
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Form, Tabs } from 'antd';
const { TabPane } = Tabs;

/**
 * Internal dependencies
 */
import { SeamanContext } from '~/store/seaman';
import App from '~/components/App';
import Container from '~/components/Container';
import PageHeader from './PageHeader';
import PersonalInformation from './PersonalInformation';
import ContactInformation from './ContactInformation';
import Relatives from './Relatives';
import Educations from './Educations';
import Passports from './Passports';
import Visas from './Visas';
import Experiences from './Experiences';
import Documents from './Documents';
import BMI from './BMI';

const SeamanEdit = () => {
  const { seaman, setSeaman, getFieldDecorator, getFieldsValue, resetFields, setIsSeamanTouched } = useContext( SeamanContext );
  const { query } = useRouter();
  const [ isSaving, setIsSaving ] = useState( false );

  const handleSave = async () => {
    if ( isSaving ) {
      return;
    }

    setIsSaving( true );

    try {
      let values = getFieldsValue();

      // Format dates.
      values = {
        ...values,
        birth_date: values['birth_date'].format( 'YYYY-MM-DD' )
      };

      const cookies = parseCookies();

      const res = await axios.post( `http://bzalpha.test/wp-json/bzalpha/v1/seaman/${ query.id }`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ cookies.token }`,
        }
      } );

      setSeaman( res.data );
      resetFields();
    } catch( err ) {
      console.log( err );
    }

    setIsSaving( false );
    setIsSeamanTouched( false );
  };

  getFieldDecorator( 'relatives', { initialValue: seaman.relatives } );
  getFieldDecorator( 'educations', { initialValue: seaman.educations } );
  getFieldDecorator( 'passports', { initialValue: seaman.passports } );
  getFieldDecorator( 'visas', { initialValue: seaman.visas } );
  getFieldDecorator( 'experiences', { initialValue: seaman.experiences } );
  getFieldDecorator( 'documents', { initialValue: seaman.documents } );

  return (
    <Form>
      <PageHeader handleSave={ handleSave } />
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="General" key="general">
          <PersonalInformation />
          <ContactInformation />
        </TabPane>
        <TabPane tab="Relatives" key="relatives">
          <Relatives />
        </TabPane>
        <TabPane tab="Educations" key="educations">
          <Educations />
        </TabPane>
        <TabPane tab="Passports" key="passports">
          <Passports />
          <Visas />
        </TabPane>
        <TabPane tab="Experiences" key="experiences">
          <Experiences />
        </TabPane>
        <TabPane tab="Documents" key="documents">
          <Documents />
        </TabPane>
        <TabPane tab="BMI" key="bmi">
          <BMI />
        </TabPane>
      </Tabs>
    </Form>
  );
};

export default SeamanEdit;
