/**
 * Internal dependencies.
 */
import App from '../components/layout/App';
import withAuth from '../utils/withAuth';

const Dashboard = () => (
  <App>Dashboard!</App>
);

export default withAuth( Dashboard );
