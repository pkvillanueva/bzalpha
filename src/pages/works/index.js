/**
 * External dependencies.
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import Works from '~/components/Works/Works';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import withAuth from '~/utils/withAuth';

class Page extends Component {
	breadcrumb = [ {
		path: '/works',
		breadcrumbName: 'BZ Works',
	} ];

	render() {
		return (
			<Layout
				title="BZ Works"
				breadcrumb={ formatBreadcrumb( this.breadcrumb ) }
				pageHeaderContent={ <div>Page to manage vessel&rsquo;s pool.</div> }
			>
				<Works />
			</Layout>
		);
	}
}

export default withAuth( Page );
