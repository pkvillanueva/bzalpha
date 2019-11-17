/**
 * Internal dependencies.
 */
import Layout from '~/components/Layout';
import withAuth from '~/utils/withAuth';

const Dashboard = () => (
  <Layout>
    Dashboard!
  </Layout>
);

export default withAuth( Dashboard );
