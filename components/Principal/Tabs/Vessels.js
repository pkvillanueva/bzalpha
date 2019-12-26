/**
 * External dependencies.
 */
import { Card } from 'antd';
import { useRouter } from 'next/router';

/**
 * Internal dependencies.
 */
import VesselList from '~/components/Vessel/VesselList';

const Vessels = () => {
	const { query } = useRouter();

	return (
		<Card>
			<VesselList
				basePrincipal={ query.id }
				customParams={ {
					principal: query.id,
				} }
			/>
		</Card>
	);
};

export default Vessels;
