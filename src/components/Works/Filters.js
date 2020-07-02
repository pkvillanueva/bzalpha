import React, { useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Card, Button } from 'antd';
import SelectFetch from '~/components/SelectFetch';
import CreateOrder from './CreateOrder';
import { WorksContext } from './store/works';
import styles from './styles.less';

const Filters = () => {
	const { principal, setPrincipal, vessel, setVessel } = useContext( WorksContext );

	const handlePrincipal = ( value ) => {
		setPrincipal( {
			id: value && value.key || '',
			name: value && value.label || '',
		} );

		setVessel( {
			id: '',
			name: '',
		} );
	};

	const handleVessel = ( value ) => {
		setVessel( {
			id: value && value.key || '',
			name: value && value.label || '',
		} );
	};

	return (
        <Card className={ styles.filters }>
			<Form layout="inline">
				<Form.Item label="Owner">
					<SelectFetch
						withLabelValue={ true }
						value={ principal.id }
						style={ { width: 170 } }
						allowClear={ true }
						placeholder="Enter owner name"
						dataKey="id"
						labelKey="name"
						action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/principal` }
						onChange={ handlePrincipal }
					/>
				</Form.Item>
				<Form.Item label="Vessel">
					<SelectFetch
						withLabelValue={ true }
						value={ vessel.id }
						style={ { width: 170 } }
						allowClear={ true }
						placeholder="Enter vessel name"
						action={ `${ process.env.API_URL }/wp-json/bzalpha/v1/vessel` }
						onChange={ handleVessel }
						customParams={ {
							principal: principal.id,
						} }
					/>
				</Form.Item>
				<CreateOrder>
					<Button icon={<PlusOutlined />} type="primary" className={ styles.createOrder }>
						Create Order
					</Button>
				</CreateOrder>
			</Form>
		</Card>
    );
};

export default Filters;
