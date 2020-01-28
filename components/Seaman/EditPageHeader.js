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
import { getRankName, getTotalSeaTime, getRankTotalSeaTime, getCurrentAge, getContact } from '../../utils/seaman';
import { getOrderStatus, getOrderStatusColor } from '../../utils/orders';
import styles from './styles.less';

const EditPageHeader = () => {
	const { seaman } = useContext( SeamanContext );
	const { meta } = seaman;

	return (
		<div className={ styles.pageHeader }>
			<div className={ styles.avatar }>
				<EditAvatar />
			</div>
			<div className={ styles.mainContent }>
				<h1 className={ styles.title }>
					<span>{ `${ meta.first_name } ${ meta.middle_name } ${ meta.last_name }` }</span>
					{ meta.rank && <Tag color="blue">{ getRankName( meta.rank ) }</Tag> }
				</h1>
				<p>
					<Badge status={ getOrderStatusColor( seaman.order ) } />
					{ getOrderStatus( seaman.order ) }
				</p>
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
