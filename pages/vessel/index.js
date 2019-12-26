/**
 * External dependencies.
 */
import React, { Component } from 'react';
import { Card } from 'antd';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import VesselList from '~/components/Vessel/VesselList';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import withAuth from '~/utils/withAuth';

class Page extends Component {
	breadcrumb = [ {
		path: '/vessel',
		breadcrumbName: 'Vessels List',
	} ];

	render() {
		return (
			<Layout
				title="Vessels List"
				breadcrumb={ formatBreadcrumb( this.breadcrumb ) }
				pageHeaderContent={ <div>Page where you can view, add or edit a vessel.</div> }
			>
				<Card bordered={ false }>
					<VesselList />
				</Card>
			</Layout>
		);
	}
}

export default withAuth( Page );
