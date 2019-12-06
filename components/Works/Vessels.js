import React, { useState, useEffect } from 'react';
import { Collapse, Icon } from 'antd';
import { parseCookies } from 'nookies';
import axios from 'axios';
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
      params.id = vesselId;
    } else if ( principalId ) {
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
      <Icon type="loading" />
    );
  }

  console.log( vessels );

  return (
    <div className={ styles.vessels }>
      <Collapse
        bordered={ false }
        expandIcon={ ( { isActive } ) => <Icon type="caret-right" rotate={ isActive ? 90 : 0 } /> }
      >
        <Collapse.Panel header="This is panel header 1" key="1" style={ customPanelStyle }>
          <p>{ text }</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 2" key="2" style={ customPanelStyle }>
          <p>{ text }</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" key="3" style={ customPanelStyle }>
          <p>{ text }</p>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Vessels;
