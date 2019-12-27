/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Row, Col, Statistic, Badge, Button, Card, Tag, Tooltip, Icon } from 'antd';

/**
 * Internal dependencies
 */
import Layout from '~/components/Layout';
import SeamanEdit from '../../components/Seaman/SeamanEdit';
import EditDateAvailable from '../../components/Seaman/EditDateAvailable';
import EditRank from '../../components/Seaman/EditRank';
import EditMinWage from '../../components/Seaman/EditMinWage';
import AvatarUpload from '~/components/AvatarUpload';
import Stats from '~/components/Stats';
import BlockCard from '~/components/BlockCard';
import { SeamanProvider, SeamanContext } from '../../components/Seaman/store/seaman';
import withAuth from '~/utils/withAuth';
import withProvider from '~/utils/withProvider';
import formatBreadcrumb from '~/utils/formatBreadcrumb';
import { getStatus, getRankName, getTotalSeaTime, getRankTotalSeaTime, getCurrentAge, getContact } from '~/utils/seaman';
import styles from './styles.less';
import { dateFormat, prepareValues } from '../../utils/api';

const PageHeader = () => {
	const { seaman, getFieldDecorator } = useContext( SeamanContext );
	const status = getStatus( seaman.job_status );

	return (
		<div className={ styles.pageHeaderContent }>
			<div className={ styles.pageHeaderAvatar }>
				{ getFieldDecorator( 'featured_image', {
					getValueFromEvent: ( fileId ) => {
						return fileId;
					},
				} )(
					<AvatarUpload src={ seaman.avatar } />
				) }
			</div>
			<div className={ styles.pageHeaderMainContent }>
				<h1 className={ styles.pageHeaderTitle }>
					<span className={ styles.pageHeaderName }>{ seaman.title }</span>
					{ seaman.meta.rank && <Tag color="blue">{ getRankName( seaman.meta.rank ) }</Tag> }
				</h1>
				{ seaman.job_status === 'onboard' ? (
					<p>
						<Badge status={ status.state } /> { status.name }
						<Tooltip title="Joined Oct 20, 2019 to Feb 15, 2020">
							<Icon style={ { marginLeft: 8 } } type="info-circle" />
						</Tooltip>
					</p>
				) : (
					<p><Badge status={ status.state } /> { status.name }</p>
				) }
			</div>
			<div className={ styles.pageHeaderExtraContent }>
				<Stats align="right">
					<Statistic
						title="Age"
						groupSeparator=""
						value={ getCurrentAge( seaman.meta.birth_date ) }
					/>
					<Statistic
						title="Contact"
						groupSeparator=""
						value={ getContact( seaman ) }
					/>
					<Statistic
						title="Total Sea Time"
						groupSeparator=""
						value={ getTotalSeaTime( seaman.meta.experiences ) }
					/>
					{ seaman.meta.rank && <Statistic
						groupSeparator=""
						title={ `As ${ seaman.meta.rank }` }
						value={ getRankTotalSeaTime( seaman.meta.rank, seaman.meta.experiences ) }
					/> }
				</Stats>
			</div>
		</div>
	);
};

const Page = () => {
	const {
		seaman,
		setSeaman,
		validateFields,
		isSaving,
		setIsSaving,
		getFieldDecorator,
		resetFields,
		isFieldsTouched,
		isSeamanTouched,
		setIsSeamanTouched,
	} = useContext( SeamanContext );
	const { query } = useRouter();
	const status = getStatus( seaman.job_status );

	const handleSave = () => {
		if ( isSaving ) {
			return;
		}

		validateFields( ( err, values ) => {
			if ( err ) {
				return;
			}

			setIsSaving( true );
			values = prepareValues( values );

			const cookies = parseCookies();
			axios.post( `${ process.env.API_URL }/wp-json/bzalpha/v1/seaman/${ query.id }`, values, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ cookies.token }`,
				},
			} ).then( ( res ) => {
				setSeaman( res.data );
				resetFields();
				setIsSaving( false );
				setIsSeamanTouched( false );
			} ).catch( () => {
				setIsSaving( false );
				setIsSeamanTouched( false );
			} );
		} );
	};

	const getBreadcrumb = () => {
		return [
			{ path: '/seaman', breadcrumbName: 'Seaman List' },
			{ breadcrumbName: seaman.title },
		];
	};

	return (
		<Layout
			title="Edit Seaman"
			breadcrumb={ formatBreadcrumb( getBreadcrumb() ) }
			pageHeaderContent={ <PageHeader /> }
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
								prefix={ <Badge status={ status.state } /> }
								value={ status.name }
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

export default withAuth( withProvider( SeamanProvider, Page ) );
