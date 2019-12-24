import React, { useContext, useState, useEffect } from 'react';
import { Collapse, Icon } from 'antd';
import { map, isEmpty } from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import RankAvatar from './RankAvatar';
import Orders from './Orders';
import { OrdersProvider, OrdersContext } from '~/store/orders';
import withProvider from '~/utils/withProvider';
import styles from './styles.less';

const VesselOrders = ( { vessel, num } ) => {
  const { orders, setOrders } = useContext( OrdersContext );
  const [ expanded, setExpanded ] = useState( false );

  useEffect( () => {
    setOrders( vessel.orders );
  }, [] );

  const Avatars = () => {
    if ( isEmpty( orders ) ) {
      return null;
    }

    return map( orders, ( { position, status, sign_off }, key ) => (
      <RankAvatar
        style={ { fontSize: 12 } }
        size={ 38 }
        key={ key }
        children={ position }
        status={ status }
        date={ sign_off }
      />
    ) );
  };

  const Header = () => (
    <div className={ styles.header }>
      <div className={ styles.name }>
        <span className={ styles.num }>{ num }</span>
        <strong>{ vessel.title }</strong>
      </div>
      <div className={ styles.orders }>
        <Avatars />
      </div>
    </div>
  );

  return (
    <Collapse
      className={ styles.vessel }
      bordered={ false }
      expandIcon={ ( { isActive } ) => <Icon type="caret-right" rotate={ isActive ? 90 : 0 } /> }
      accordion={ true }
      onChange={ ( expanded ) => setExpanded( expanded || '' ) }
    >
      <Collapse.Panel
        extra={ vessel.flag && <ReactCountryFlag code={ vessel.flag } svg /> }
        header={ <Header /> }
      >
        { expanded && <Orders vessel={ vessel.id } /> }
      </Collapse.Panel>
    </Collapse>
  );
};

export default withProvider( OrdersProvider, VesselOrders );
