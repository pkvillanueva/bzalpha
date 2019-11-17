/**
 * Internal dependencies.
 */
import styles from './styles.less';

const BlockCard = ( { children } ) => {
  return (
    <div className={ styles.blockCard }>
      { children }
    </div>
  );
};

export default BlockCard;
