/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Row, Col, Statistic, Badge, Button, Card, Tag, Tooltip, Icon } from 'antd';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import SeamanEdit from '~/components/Seaman/SeamanEdit';
import EditRank from '~/components/Seaman/Modals/EditRank';
import EditMinWage from '~/components/Seaman/Modals/EditMinWage';
import AvatarUpload from '~/components/AvatarUpload';
import Stats from '~/components/Stats';
import BlockCard from '~/components/BlockCard';
import { SeamanProvider, SeamanContext } from '~/store/seaman';
import withAuth from '~/utils/withAuth';
import withProvider from '~/utils/withProvider';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import { getStatus, getRankName, getTotalSeaTime, getRankTotalSeaTime, getCurrentAge, getContact } from '~/utils/seaman';
import styles from './styles.less';

const PageHeader = () => {
  const { seaman, getFieldDecorator } = useContext( SeamanContext );
  const status = getStatus( seaman.job_status );

  return (
    <div className={ styles.pageHeaderContent }>
      <div className={ styles.pageHeaderAvatar }>
        { getFieldDecorator( 'featured_image', {
          getValueFromEvent: ( fileId ) => {
            return fileId;
          },
        } )(
          <AvatarUpload src={ seaman.avatar } />
        ) }
      </div>
      <div className={ styles.pageHeaderMainContent }>
        <h1 className={ styles.pageHeaderTitle }>
          <span className={ styles.pageHeaderName }>{ seaman.title.rendered }</span>
          { seaman.rank && <Tag color="blue">{ getRankName( seaman.rank ) }</Tag> }
        </h1>
        { seaman.job_status === 'onboard' ? (
          <p>
            <Badge status={ status.state } /> { status.name } - <a>Durande</a>
            <Tooltip title="Joined Oct 20, 2019 to Feb 15, 2020">
              <Icon style={ { marginLeft: 8 } } type="info-circle" />
            </Tooltip>
          </p>
        ) : (
          <p><Badge status={ status.state } /> { status.name }</p>
        ) }
      </div>
      <div className={ styles.pageHeaderExtraContent}>
        <Stats align="right">
          <Statistic
            title="Age"
            groupSeparator=""
            value={ getCurrentAge( seaman.birth_date ) }
          />
          <Statistic
            title="Contact"
            groupSeparator=""
            value={ getContact( seaman ) }
          />
          <Statistic
            title="Total Sea Time"
            groupSeparator=""
            value={ getTotalSeaTime( seaman.experiences ) }
          />
          { seaman.rank && <Statistic
            groupSeparator=""
            title={ `As ${ getRankName( seaman.rank ) }` }
            value={ getRankTotalSeaTime( seaman.rank, seaman.experiences ) }
          /> }
        </Stats>
      </div>
    </div>
  );
};

const Page = () => {
  const {
    seaman,
    setSeaman,
    validateFields,
    isSaving,
    setIsSaving,
    getFieldDecorator,
    getFieldsValue,
    resetFields,
    isFieldsTouched,
    isSeamanTouched,
    setIsSeamanTouched
  } = useContext( SeamanContext );
  const { query } = useRouter();
  const status = getStatus( seaman.job_status );

  const handleSave = () => {
    if ( isSaving ) {
      return;
    }

    validateFields( ( err, values ) => {
      if ( err ) {
        return;
      }

      setIsSaving( true );
      values = {
        ...values,
        birth_date: values['birth_date'] && values['birth_date'].format( 'YYYY-MM-DD' ),
        documents: values.documents && values.documents.map( ( d ) => ( { ...d, file: ( d.file && d.file.id ) ? d.file.id : null } ) ),
        visas: values.visas && values.visas.map( ( d ) => ( { ...d, file: ( d.file && d.file.id ) ? d.file.id : null } ) ),
        passports: values.passports && values.passports.map( ( d ) => ( { ...d, file: ( d.file && d.file.id ) ? d.file.id : null } ) ),
      };

      const cookies = parseCookies();
      axios.post( `http://bzalpha.test/wp-json/bzalpha/v1/seaman/${ query.id }`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ cookies.token }`,
        }
      } ).then( ( res ) => {
        setTimeout( () => {
          setSeaman( res.data );
          resetFields();
          setIsSaving( false );
          setIsSeamanTouched( false );
        }, 1500 );
      } ).catch( () => {
        setTimeout( () => {
          setIsSaving( false );
          setIsSeamanTouched( false );
        }, 1500 );
      } );
    } );
  };

  const getBreadcrumb = () => {
    return [
      { path: '/seaman', breadcrumbName: 'Seaman List' },
      { breadcrumbName: seaman.title.rendered }
    ]
  };

  getFieldDecorator( 'relatives', { initialValue: seaman.relatives } );
  getFieldDecorator( 'educations', { initialValue: seaman.educations } );
  getFieldDecorator( 'passports', { initialValue: seaman.passports } );
  getFieldDecorator( 'visas', { initialValue: seaman.visas } );
  getFieldDecorator( 'experiences', { initialValue: seaman.experiences } );
  getFieldDecorator( 'documents', { initialValue: seaman.documents } );

  return (
    <Layout
      title="Edit Seaman"
      breadcrumb={ formatBreadcrumb( getBreadcrumb() ) }
      pageHeaderContent={ <PageHeader /> }
      extra={ [
        <Button type="primary" key="save" onClick={ handleSave } disabled={ ( ! isSeamanTouched && ! isFieldsTouched() ) } loading={ isSaving }>Save</Button>
      ] }
    >
      <BlockCard>
        <Row type="flex" gutter={ 24 }>
          <Col md={ 6 } xs={ 24 }>
            <Card>
            <Statistic
              title="Status"
              prefix={ <Badge status={ status.state } /> }
              value={ status.name }
            />
            </Card>
          </Col>
          <Col md={ 6 } xs={ 24 }>
            <Card>
            <Statistic
              title="Vessel"
              value="Durande"
            />
            </Card>
          </Col>
          <Col md={ 6 } xs={ 24 }>
            <Card>
            <Statistic
              title="Rank"
              value={ getRankName( seaman.rank ) || 'N/A' }
              suffix={ <EditRank /> }
            />
            </Card>
          </Col>
          <Col md={ 6 } xs={ 24 }>
            <Card>
            <Statistic
              prefix="$"
              title="Min. Wage"
              value={ seaman.min_wage || '0' }
              suffix={ <EditMinWage /> }
            />
            </Card>
          </Col>
        </Row>
      </BlockCard>
      <SeamanEdit />
    </Layout>
  );
};

export default withAuth( withProvider( SeamanProvider, Page ) );
