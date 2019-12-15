import React, { useState, useEffect } from 'react';
import { Collapse, Icon, Empty } from 'antd';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { map, isEmpty } from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import Orders from './Orders';
import RankAvatar from './RankAvatar';
import styles from './styles.less';

const Vessels = ( { principalId, vesselId } ) => {
  const [ loading, setLoading ] = useState( true );
  const [ vessels, setVessels ] = useState( [] );
  const [ activeKey, setActiveKey ] = useState( [] );

  // Fetch vessels.
  useEffect( () => {
    const { token } = parseCookies();
    const params = {};
    setLoading( true );

    if ( vesselId ) {
      params.include = [ vesselId ];
    } else if ( principalId ) {
      params.posts_per_page = -1;
      params.principal = principalId;
    }

    axios.get( `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel`, {
      params: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      }
    } ).then( ( res ) => {
      setVessels( res.data );
    } ).finally( () => {
      setLoading( false );
    } );
  }, [ principalId, vesselId ] );

  if ( loading ) {
    return (
      <div className={ styles.vesselsFetching }>
        <Icon type="loading" />
      </div>
    );
  }

  if ( isEmpty( vessels ) ) {
    return <Empty />;
  }

  return (
    <Collapse
      className={ styles.vessels }
      bordered={ false }
      expandIcon={ ( { isActive } ) => <Icon type="caret-right" rotate={ isActive ? 90 : 0 } /> }
      accordion={ true }
      onChange={ ( activeKey ) => setActiveKey( activeKey ) }
    >
      { map( vessels, ( vessel, key ) => (
        <Collapse.Panel
          className={ styles.vessel }
          key={ vessel.id }
          extra={ vessel.flag && <ReactCountryFlag code={ vessel.flag } svg /> }
          header={
            <div className={ styles.vesselHeader }>
              <div className={ styles.vesselName }>
                <span className={ styles.vesselNum }>{ ++key }</span>
                <strong>{ vessel.title.rendered }</strong>
              </div>
              <div className={ styles.vesselOrders }>
                { ! isEmpty( vessel.orders ) &&
                  map( vessel.orders, ( order ) => (
                    <RankAvatar
                      style={ { fontSize: 12 } }
                      key={ order.position }
                      size={ 38 }
                      children={ order.position }
                    />
                  ) )
                }
              </div>
            </div>
          }
        >
          { parseInt( activeKey ) === parseInt( vessel.id ) &&
            <Orders vessel={ activeKey } />
          }
        </Collapse.Panel>
      ) ) }
    </Collapse>
  );
};

export default Vessels;
