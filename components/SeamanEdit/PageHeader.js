/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import {
  Avatar,
  Row,
  Col,
  PageHeader as Header,
  Button,
  Card,
  Statistic,
  Icon,
} from 'antd';

/**
 * Internal dependencies.
 */
import { SeamanContext } from '~/store/seaman';
import styles from './styles.less';

const PageHeader = ( { handleSave } ) => {
  const { seaman, isSeamanTouched, isFieldsTouched } = useContext( SeamanContext );

  const routes = [
    { path: '/', breadcrumbName: 'Dashboard' },
    { path: '/seamen', breadcrumbName: 'Seamen' },
    { path: '', breadcrumbName: 'Edit Seaman' },
  ];

  const Title = () => (
    <>
      <Icon className={ styles.star } type="star" theme="twoTone" />
      { seaman.title.rendered }
    </>
  );

  return (
    <Header
      className={ styles.pageHeader }
      title="Edit Seaman"
      breadcrumb={ { routes } }
      extra={ [
        <Button type="primary" key="2" onClick={ handleSave } disabled={ ( ! isSeamanTouched && ! isFieldsTouched() ) }>Save</Button>
      ] }
    >
      <Card className={ styles.card } title={ <Title /> }>
        <Row type="flex" gutter={ [ 24 ] }>
          <Col>
            <Avatar className={ styles.avatar } shape="square" size={ 175 } src={ seaman.avatar } />
            <div className={ styles.changePhoto }>
              <Button block>Change Photo</Button>
            </div>
            <div className={ styles.statsInfo } >
              <Statistic title="Age" value={ 54 } />
              <Statistic title="Contact" value="+639199967010" />
            </div>
          </Col>
          <Col style={ { flex: 1 } }>
            <Row className={ styles.stats } type="flex" gutter={ [ 14 ] }>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic prefix={ <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> } title="Status" value="Currently Onboard" valueStyle={ { color: '#52c41a' } } />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic title="Position" value="Chief Engineer" />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic prefix={ <Icon type="dollar" /> } title="Min. Wage" value={ seaman.min_wage } />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic title="Pool" value="Durande" formatter={ value => <a>{ value }</a>} />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic title="Total Sea Time" value="63m 28d (5y 3m 28d)" />
                </Card>
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Card type="inner">
                  <Statistic title="Total Sea Time as C/E" value="63m 28d (5y 3m 28d)" />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Header>
  );
};

export default PageHeader;
