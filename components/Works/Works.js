/**
 * External dependencies.
 */
import { Form, Card } from 'antd';

/**
 * Internal dependencies.
 */
import SelectFetch from '~/components/SelectFetch';
import BulkOrder from './BulkOrder';
import styles from './styles.less';

const Works = () => {
  return (
    <Card>
      <Form layout="inline">
        <Form.Item label="Owner">
          <SelectFetch
            style={ { width: 170 } }
            allowClear={ true }
            placeholder="Select owner"
            dataKey="id"
            labelKey="name"
            action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/principal` }
          />
        </Form.Item>
        <Form.Item label="Vessel">
          <SelectFetch
            style={ { width: 170 } }
            allowClear={ true }
            placeholder="Enter vessel name"
            action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel` }
          />
        </Form.Item>
        <BulkOrder />
      </Form>
    </Card>
  );
};

export default Works;
