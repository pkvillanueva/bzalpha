/**
 * Internal dependencies.
 */
import styles from './styles.less';

const Block = ( { children } ) => {
  return (
    <div className={ styles.block }>
      { children }
    </div>
  );
};

export default Block;
