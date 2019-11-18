/**
 * External dependencies.
 */
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Button, Tabs } from 'antd';
const { TabPane } = Tabs;

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import BasicInformation from '~/components/Principal/Tabs/BasicInformation';
import Vessels from '~/components/Principal/Tabs/Vessels';
import { PrincipalProvider, PrincipalContext } from '~/store/principal';
import withAuth from '~/utils/withAuth';
import withProvider from '~/utils/withProvider';
import formatBreadcrumb from '~/utils/formatBreadcrumb';

const tabContent = {
  information: <BasicInformation />,
  vessels: <Vessels />
};

const PageHeaderFooter = ( { onChange } ) => {
  return (
    <Tabs defaultActiveKey="information" onChange={ onChange }>
    <TabPane tab="Information" key="information" />
      <TabPane tab="Vessels" key="vessels" />
    </Tabs>
  );
};

const Page = () => {
  const {
    principal,
    setPrincipal,
    validateFields,
    isSaving,
    setIsSaving,
    resetFields,
    isFieldsTouched,
    isPrincipalTouched,
    setIsPrincipalTouched,
  } = useContext( PrincipalContext );
  const [ tab, setTab ] = useState( 'information' );
  const { query } = useRouter();

  const getBreadcrumb = () => {
    return [
      { path: '/principal', breadcrumbName: 'Principals List' },
      { breadcrumbName: principal.name }
    ]
  };

  const handleSave = () => {
    if ( isSaving ) {
      return;
    }

    validateFields( ( err, values ) => {
      if ( err ) {
        return;
      }

      setIsSaving( true );
      const cookies = parseCookies();
      axios.post( `http://bzalpha.test/wp-json/bzalpha/v1/principal/${ query.id }`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ cookies.token }`,
        }
      } ).then( ( res ) => {
        setTimeout( () => {
          setPrincipal( res.data );
          resetFields();
          setIsSaving( false );
          setIsPrincipalTouched( false );
        }, 1500 );
      } ).catch( () => {
        setTimeout( () => {
          setIsSaving( false );
          setIsPrincipalTouched( false );
        }, 1500 );
      } );
    } );
  };

  const handleTabChange = ( value ) => {
    setTab( value );
  };

  return (
    <Layout
      title={ principal.name }
      breadcrumb={ formatBreadcrumb( getBreadcrumb() ) }
      extra={ [
        <Button type="primary" key="save" onClick={ handleSave } disabled={ ( ! isPrincipalTouched && ! isFieldsTouched() ) } loading={ isSaving }>Save</Button>
      ] }
      footer={ <PageHeaderFooter onChange={ handleTabChange } /> }
    >
      { tabContent[ tab ] }
    </Layout>
  );
};

export default withAuth( withProvider( PrincipalProvider, Page ) );
