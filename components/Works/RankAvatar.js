import { Avatar } from 'antd';
import styles from './styles.less';

const RankAvatar = ( { type, ...props } ) => {
  return <Avatar { ...props } className={ styles.rankAvatar } />
};

export default RankAvatar;
