/**
 * External dependencies.
 */
import {
  Avatar,
  Row,
  Col,
  PageHeader as Header,
  Button,
  Card,
  Tag,
  Statistic,
  Icon,
  Tooltip,
  Divider,
  List,
  Timeline,
  Input
} from 'antd';
import { map } from 'lodash'

/**
 * Internal dependencies.
 */
import styles from './style.less';

const PageHeader = ( { data } ) => {
  const routes = [
    { path: '/', breadcrumbName: 'Dashboard' },
    { path: '/seamen', breadcrumbName: 'Seamen' },
    { path: '', breadcrumbName: 'Edit Seaman' },
  ];

  const remarks = [
    { user: { name: 'SV' }, date: '07-01-2019', text: '"DURANDE" - short contract due to mother illness' },
    { user: { name: 'SV' }, date: '25-08-2017', text: 'good passed interview' },
    { user: { name: 'SV' }, date: '09-10-2017', text: 'didn\'t pass interview with Borysenko' },
    { user: { name: 'SV' }, date: '09-06-2016', text: 'inteview with SI' },
  ];

  return (
    <Header
      className={ styles.pageHeader }
      title="Edit Seaman"
      breadcrumb={ { routes } }
      extra={ [
        <Button type="primary" key="2">Save</Button>
      ] }
    >
      <Card className={ styles.card } title={
        <>
          <Icon className={ styles.nameStar } type="star" theme="twoTone" />
          { data.title.rendered }
        </>
      }>
        <Row type="flex" gutter={ [ 38 ] }>
          <Col>
            <Avatar className={ styles.avatar } shape="square" size={ 175 } src={ data.avatar } />
            <div className={ styles.avatarUploader }>
              <Button block>Change Photo</Button>
            </div>
            <Statistic className={ styles.quickStat } title="Age" value={ 54 } />
            <Statistic className={ styles.quickStat } title="Contact" value="+639199967010" />
          </Col>
          <Col style={ { flex: 1 } }>
            {/* <div className={ styles.tags }>
              <Tag color="#87d068">Joined Durande vessel last October 19, 2019</Tag>
            </div> */}
            <Row className={ styles.statsContainer } type="flex" gutter={ [ 14 ] }>
              <Col md={ 8 } xs={ 24 }>
                <Statistic title="Status" value="Currently Onboard" />
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Statistic title="Position" value="Chief Engineer" />
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Statistic title="Min. Wage" value={ `$${data.min_wage}` } />
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Statistic title="Total Sea Time" value="63m 28d (5y 3m 28d)" />
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Statistic title="Total Sea Time as C/E" value="63m 28d (5y 3m 28d)" />
              </Col>
              <Col md={ 8 } xs={ 24 }>
                <Statistic title="Pool" value="Durande" formatter={ value => <a>{ value }</a>} />
              </Col>
            </Row>
            <Statistic
              title="Remarks"
              formatter={ () => (
                <List
                  className={ styles.remarks }
                  size="small"
                  dataSource={ remarks }
                  renderItem={ item => <List.Item><Tag>{ `${ item.date }` }</Tag>{ item.text }</List.Item> }
                />
                // <Timeline className={ styles.remarks }>
                //   { remarks.map( ( item, i ) => <Timeline.Item color="gray" key={ i }>{ item }</Timeline.Item> ) }
                // </Timeline>
              ) }
            />
          </Col>
        </Row>
      </Card>
    </Header>
  );
};

export default PageHeader;
