/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import styles from './styles.less';

const Stats = ( props ) => {
	const {
		className,
		align,
		...restProps
	} = props;
	const classes = classnames( [
		styles.stats,
		className,
	], {
		[ `${ styles.alignRight }` ]: align === 'right',
		[ `${ styles.alignCenter }` ]: align === 'center',
	} );

	return (
		<div className={ classes } { ...restProps } />
	);
};

export default Stats;
