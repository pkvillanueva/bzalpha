/**
 * External dependencies.
 */
import React, { Component } from 'react';
import { Card } from 'antd';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import PrincipalList from '~/components/Principal/PrincipalList';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import withAuth from '~/utils/withAuth';

const breadcrumb = [ {
	path: '/principal',
	breadcrumbName: 'Principals List',
} ];

class Page extends Component {
	render() {
		return (
			<Layout
				title="Principals List"
				breadcrumb={ formatBreadcrumb( breadcrumb ) }
				pageHeaderContent={ <div>Page where you can view, add or edit a principal.</div> }
			>
				<Card bordered={ false }>
					<PrincipalList />
				</Card>
			</Layout>
		);
	}
}

export default withAuth( Page );
