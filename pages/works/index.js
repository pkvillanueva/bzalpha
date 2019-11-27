/**
 * External dependencies.
 */
import React, { Component } from 'react';
import { Row, Col, Button, DatePicker, Form } from 'antd';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import ModalForm from '~/components/ModalForm';
import SelectFetch from '~/components/SelectFetch';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import withAuth from '~/utils/withAuth';

class Page extends Component {
  breadcrumb = [
    {
      path: '/works',
      breadcrumbName: 'BZ Works'
    }
  ];

  render() {
    return (
      <Layout
        title="BZ Works"
        breadcrumb={ formatBreadcrumb( this.breadcrumb ) }
        pageHeaderContent={ <div>Page to manage vessel's pool.</div> }
      >
        <Row gutter={ 24 }>
          <Col xs={ 8 }>
            <ModalForm
              title="Create new pool"
              onChange={ ( values ) => {
                values = {
                  ...values,
                  sign_on: values['sign_on'].format( 'YYYY-MM-DD' ),
                  sign_off: values['sign_off'].format( 'YYYY-MM-DD' )
                };

                console.log( values );
              } }
              modalForm={ ( decorator ) => ( <>
                <Form layout="vertical">
                  <Form.Item label="Vessel">
                    { decorator( 'vessel', {
                      rules: [ { required: true, message: 'Vessel is required.' } ],
                    } )(
                      <SelectFetch
                        placeholder="Select vessel"
                        action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel` }
                      />
                    ) }
                  </Form.Item>
                  <Form.Item label="Pool">
                    { decorator( 'pool', {
                      rules: [ { required: true, message: 'Pool is required.' } ],
                    } )(
                      <SelectFetch
                        multiple={ true }
                        placeholder="Select seaman"
                        action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman` }
                        customParams={ {
                          job_status: 'standby'
                        } }
                      />
                    ) }
                  </Form.Item>
                  <Form.Item label="Sign On Date">
                    { decorator( 'sign_on', {
                      rules: [ { required: true, message: 'Sign on date is required.' } ],
                    } )(
                      <DatePicker />
                    ) }
                  </Form.Item>
                  <Form.Item label="Sign Off Date">
                    { decorator( 'sign_off', {
                      rules: [ { required: true, message: 'Sign off date is required.' } ],
                    } )(
                      <DatePicker />
                    ) }
                  </Form.Item>
                </Form>
              </> ) }
            >
              <Button type="dashed" icon="plus" style={ { height: 188 } } block>
                Create Pool
              </Button>
            </ModalForm>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default withAuth( Page );
