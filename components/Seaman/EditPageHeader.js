/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Statistic, Badge, Tag, Tooltip, Icon } from 'antd';

/**
 * Internal dependencies
 */
import EditAvatar from './EditAvatar';
import Stats from '../Stats';
import { SeamanContext } from './store/seaman';
import { getStatus, getRankName, getTotalSeaTime, getRankTotalSeaTime, getCurrentAge, getContact } from '../../utils/seaman';
import styles from './styles.less';

const EditPageHeader = () => {
	const { seaman } = useContext( SeamanContext );
	const { meta } = seaman;
	const status = getStatus( seaman.job_status );

	return (
		<div className={ styles.pageHeader }>
			<div className={ styles.avatar }>
				<EditAvatar />
			</div>
			<div className={ styles.mainContent }>
				<h1 className={ styles.title }>
					<span>{ seaman.title }</span>
					{ meta.rank && <Tag color="blue">{ getRankName( meta.rank ) }</Tag> }
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
			<div className={ styles.extraContent }>
				<Stats align="right">
					<Statistic
						title="Age"
						groupSeparator=""
						value={ getCurrentAge( meta.birth_date ) }
					/>
					<Statistic
						title="Contact"
						groupSeparator=""
						value={ getContact( seaman ) }
					/>
					<Statistic
						title="Total Sea Time"
						groupSeparator=""
						value={ getTotalSeaTime( meta.experiences ) }
					/>
					{ meta.rank && <Statistic
						groupSeparator=""
						title={ `As ${ meta.rank }` }
						value={ getRankTotalSeaTime( meta.rank, meta.experiences ) }
					/> }
				</Stats>
			</div>
		</div>
	);
};

export default EditPageHeader;
