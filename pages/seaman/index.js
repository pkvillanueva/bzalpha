/**
 * External dependencies.
 */
import React, { Component } from 'react';
import { Card } from 'antd';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import SeamenList from '~/components/Seaman/SeamanList';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import withAuth from '~/utils/withAuth';

class Page extends Component {
  breadcrumb = [
    {
      path: '/seaman',
      breadcrumbName: 'Seaman List'
    }
  ];

  render() {
    return (
      <Layout
        title="Seaman List"
        breadcrumb={ formatBreadcrumb( this.breadcrumb ) }
        pageHeaderContent={ <div>Page where you can view, add or edit a seaman.</div> }
      >
        <Card bordered={ false }>
          <SeamenList />
        </Card>
      </Layout>
    );
  }
}

export default withAuth( Page );
