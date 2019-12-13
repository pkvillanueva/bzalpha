import React, { useState, useEffect } from 'react';
import { Collapse, Icon, Avatar } from 'antd';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { map } from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import styles from './styles.less';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

const Vessels = ( { principalId, vesselId } ) => {
  const [ loading, setLoading ] = useState( true );
  const [ vessels, setVessels ] = useState( [] );

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
      <div className={ styles.vesselsLoading }>
        <Icon type="loading" />
      </div>
    );
  }

  return (
    <div className={ styles.vessels }>
      <Collapse
        bordered={ false }
        expandIcon={ ( { isActive } ) => <Icon type="caret-right" rotate={ isActive ? 90 : 0 } /> }
      >
        { map( vessels, ( vessel, key ) => (
          <Collapse.Panel
            className={ styles.vessel }
            header={ <>
              <div className={ styles.vesselName }>
                <span className={ styles.vesselNumber }>{ ++key }</span>
                <strong>{ vessel.title.rendered }</strong>
              </div>
              <div className={ styles.vesselPositions }>
                { map( vessel.orders, ( order ) => <Avatar size={ 36 }>{ order.position }</Avatar> ) }
              </div>
            </> }
            key={ key }
            extra={ <span className={ styles.vesselFlag }><ReactCountryFlag code={ vessel.flag } svg /></span> }
          >
            <p>{ text }</p>
          </Collapse.Panel>
        ) ) }
      </Collapse>
    </div>
  );
};

export default Vessels;
