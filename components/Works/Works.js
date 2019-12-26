import React, { useEffect, useContext } from 'react';
import { map, isEmpty } from 'lodash';
import { Result, Spin, Empty } from 'antd';
import Filters from './Filters';
import Vessel from './Vessel';
import { WorksProvider, WorksContext } from './store/works';
import withProvider from '~/utils/withProvider';
import styles from './styles.less';

const Works = () => {
	const { loading, principal, vessel, vessels, fetchVessels } = useContext( WorksContext );

	// Initial data fetch.
	useEffect( fetchVessels, [ principal, vessel ] );

	const Vessels = () => {
		if ( loading ) {
			return (
				<div className={ styles.vesselsLoading }>
					<Spin size="large" />
				</div>
			);
		} else if ( isEmpty( vessels ) ) {
			return <Empty />;
		}

		return map( vessels, ( vessel, num ) => (
			<div className={ styles.vesselWrapper } key={ num }>
				<Vessel vessel={ vessel } num={ ++num } />
			</div>
		) );
	};

	return (
		<>
			<Filters />
			{ ( principal.id || vessel.id ) ?
				<Vessels /> :
				<Result
					title="Select an owner or a vessel"
				/>
			}
		</>
	);
};

export default withProvider( WorksProvider, Works );
