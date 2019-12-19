import { Avatar } from 'antd';
import classnames from 'classnames';
import styles from './styles.less';
import { isOrderExpiring } from '~/utils/orders';

const RankAvatar = ( { status, date, ...props } ) => {
  let typeClass = status;

  if ( isOrderExpiring( status, date ) ) {
    typeClass = 'expiring';
  }

  const className = classnames( {
    [`${ styles.rankAvatar }`]: true,
    [`${ styles[ typeClass ] }`]: true,
  } );

  return <Avatar { ...props } className={ className } />
};

export default RankAvatar;
