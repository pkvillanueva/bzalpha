import { Avatar } from 'antd';
import classnames from 'classnames';
import styles from './styles.less';
import { isContractExpiring } from '~/utils/orders';

const RankAvatar = ( { type, signOff, ...props } ) => {
  let setType = type;

  if ( type === 'onboard' && signOff && isContractExpiring( signOff ) ) {
    setType = 'expiring';
  }

  const className = classnames( {
    [`${ styles.rankAvatar }`]: true,
    [`${ styles[ setType ] }`]: true,
  } );

  return <Avatar { ...props } className={ className } />
};

export default RankAvatar;
