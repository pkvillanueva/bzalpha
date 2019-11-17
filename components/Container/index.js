/**
 * Internal dependencies.
 */
import styles from './styles.less';

const Container = ( { children } ) => (
  <div className={ styles.container }>
    { children }
  </div>
);

export default Container;
