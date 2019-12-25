import React, { useContext, useState, useEffect } from 'react';
import { Collapse, Icon } from 'antd';
import { map, isEmpty } from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import RankAvatar from './RankAvatar';
import Orders from './Orders';
import { OrdersProvider, OrdersContext } from './store/orders';
import withProvider from '~/utils/withProvider';
import styles from './styles.less';

const Vessel = ( { vessel, num } ) => {
  const { orders, setOrders } = useContext( OrdersContext );
  const [ expanded, setExpanded ] = useState( false );
  const { id, title, meta } = vessel;
  const { flag } = meta;

  useEffect( () => {
    setOrders( vessel.orders );
  }, [] );

  const Avatars = () => {
    if ( isEmpty( orders ) ) {
      return null;
    }

    return map( orders, ( order, key ) => {
      const { position, status, sign_off } = order.meta;

      if ( status === 'reserved' ) {
        return;
      }

      return (
        <RankAvatar
          style={ { fontSize: 12 } }
          size={ 38 }
          key={ key }
          children={ position }
          status={ status }
          date={ sign_off }
        />
      );
     } );
  };

  const Header = () => (
    <div className={ styles.header }>
      <div className={ styles.name }>
        <span className={ styles.num }>{ num }</span>
        <strong>{ title }</strong>
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
        extra={ flag && <ReactCountryFlag code={ flag } svg /> }
        header={ <Header /> }
      >
        { expanded && <Orders vessel={ id } /> }
      </Collapse.Panel>
    </Collapse>
  );
};

export default withProvider( OrdersProvider, Vessel );
