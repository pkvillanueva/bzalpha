/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Row, Col, Statistic, Badge, Button, Card, message } from 'antd';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import SeamanEdit from '../../components/Seaman/SeamanEdit';
import EditPageHeader from '../../components/Seaman/EditPageHeader';
import EditDateAvailable from '../../components/Seaman/EditDateAvailable';
import EditRank from '../../components/Seaman/EditRank';
import EditMinWage from '../../components/Seaman/EditMinWage';
import BlockCard from '~/components/BlockCard';
import { SeamanProvider, SeamanContext } from '../../components/Seaman/store/seaman';
import withAuth from '~/utils/withAuth';
import withProvider from '~/utils/withProvider';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import { getRankName } from '~/utils/seaman';
import { dateFormat } from '../../utils/api';
import { getOrderStatus, getOrderStatusColor } from '../../utils/orders';

const SeamanPage = () => {
	const { seaman, validateFieldsAndScroll, isSaving, setIsSaving, resetFields, isFieldsTouched, isSeamanTouched, setIsSeamanTouched, updateSeaman } = useContext( SeamanContext );

	const breadcrumb = [
		{ path: '/seaman', breadcrumbName: 'Seaman List' },
		{ breadcrumbName: seaman.title },
	];

	const handleSave = () => {
		if ( isSaving ) {
			return;
		}

		validateFieldsAndScroll( ( err, values ) => {
			if ( err ) {
				message.error( 'Error while saving, please check the fields.' );
				return;
			}

			setIsSaving( true );

			updateSeaman( {
				values,
				success() {
					resetFields();
				},
				done() {
					setIsSaving( false );
					setIsSeamanTouched( false );
				},
			} );
		} );
	};

	return (
		<Layout
			title="Edit Seaman"
			breadcrumb={ formatBreadcrumb( breadcrumb ) }
			pageHeaderContent={ <EditPageHeader /> }
			extra={ [
				<Button type="primary" key="save" onClick={ handleSave } disabled={ ( ! isSeamanTouched && ! isFieldsTouched() ) } loading={ isSaving }>Save</Button>,
			] }
		>
			<BlockCard>
				<Row type="flex" gutter={ 24 }>
					<Col md={ 6 } xs={ 24 }>
						<Card>
							<Statistic
								title="Status"
								prefix={ <Badge status={ getOrderStatusColor( seaman.order ) } /> }
								value={ getOrderStatus( seaman.order ) }
							/>
						</Card>
					</Col>
					<Col md={ 6 } xs={ 24 }>
						<Card>
							<Statistic
								title="Date Available"
								value={ dateFormat( seaman.meta.date_available, 'll' ) || 'N/A' }
								suffix={ <EditDateAvailable /> }
							/>
						</Card>
					</Col>
					<Col md={ 6 } xs={ 24 }>
						<Card>
							<Statistic
								title="Rank"
								value={ getRankName( seaman.meta.rank ) || 'N/A' }
								suffix={ <EditRank /> }
							/>
						</Card>
					</Col>
					<Col md={ 6 } xs={ 24 }>
						<Card>
							<Statistic
								prefix="$"
								title="Min. Wage"
								value={ seaman.meta.min_wage }
								suffix={ <EditMinWage /> }
							/>
						</Card>
					</Col>
				</Row>
			</BlockCard>
			<SeamanEdit />
		</Layout>
	);
};

export default withAuth( withProvider( SeamanProvider, SeamanPage ) );
