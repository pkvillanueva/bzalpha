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
import Information from '~/components/Vessel/Tabs/Information';
import { VesselProvider, VesselContext } from '~/components/Vessel/store/vessel';
import withAuth from '~/utils/withAuth';
import withProvider from '~/utils/withProvider';
import formatBreadcrumb from '~/utils/formatBreadcrumb';

const tabContent = {
	information: <Information />,
};

const PageHeaderFooter = ( { onChange } ) => {
	return (
		<Tabs defaultActiveKey="information" onChange={ onChange }>
			<TabPane tab="Information" key="information" />
		</Tabs>
	);
};

const Page = () => {
	const {
		vessel,
		setVessel,
		validateFields,
		isSaving,
		setIsSaving,
		resetFields,
		isFieldsTouched,
		isVesselTouched,
		setIsVesselTouched,
	} = useContext( VesselContext );
	const { query } = useRouter();
	const [ tab, setTab ] = useState( 'information' );

	const getBreadcrumb = () => {
		return [
			{ path: '/vessel', breadcrumbName: 'Vessels List' },
			{ breadcrumbName: vessel.title },
		];
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
			axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel/${ query.id }`, values, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ cookies.token }`,
				},
			} ).then( ( res ) => {
				setTimeout( () => {
					setVessel( res.data );
					resetFields();
					setIsSaving( false );
					setIsVesselTouched( false );
				}, 1500 );
			} ).catch( () => {
				setTimeout( () => {
					setIsSaving( false );
					setIsVesselTouched( false );
				}, 1500 );
			} );
		} );
	};

	const handleTabChange = ( value ) => {
		setTab( value );
	};

	return (
		<Layout
			title={ vessel.title }
			breadcrumb={ formatBreadcrumb( getBreadcrumb() ) }
			extra={ [
				<Button type="primary" key="save" onClick={ handleSave } disabled={ ( ! isVesselTouched && ! isFieldsTouched() ) } loading={ isSaving }>Save</Button>,
			] }
			footer={ <PageHeaderFooter onChange={ handleTabChange } /> }
		>
			{ tabContent[ tab ] }
		</Layout>
	);
};

export default withAuth( withProvider( VesselProvider, Page ) );
