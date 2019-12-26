/**
 * External dependencies.
 */
import { Tabs } from 'antd';
const { TabPane } = Tabs;

/**
 * Internal dependencies.
 */
import BlockCard from '~/components/BlockCard';
import PersonalInformation from './Tabs/PersonalInformation';
import ContactInformation from './Tabs/ContactInformation';
import Relatives from './Tabs/Relatives';
import Educations from './Tabs/Educations';
import Passports from './Tabs/Passports';
import Visas from './Tabs/Visas';
import Experiences from './Tabs/Experiences';
import Licenses from './Tabs/Licenses';
import BMI from './Tabs/BMI';

const SeamanEdit = () => {
	return (
		<Tabs defaultActiveKey="general">
			<TabPane tab="General" key="general">
				<BlockCard>
					<PersonalInformation />
				</BlockCard>
				<BlockCard>
					<ContactInformation />
				</BlockCard>
			</TabPane>
			<TabPane tab="Experiences" key="experiences">
				<BlockCard>
					<Experiences />
				</BlockCard>
			</TabPane>
			<TabPane tab="Passports" key="passports">
				<BlockCard>
					<Passports />
				</BlockCard>
				<BlockCard>
					<Visas />
				</BlockCard>
			</TabPane>
			<TabPane tab="Licenses" key="documents">
				<BlockCard>
					<Licenses />
				</BlockCard>
			</TabPane>
			<TabPane tab="Educations" key="educations">
				<BlockCard>
					<Educations />
				</BlockCard>
			</TabPane>
			<TabPane tab="Relatives" key="relatives">
				<BlockCard>
					<Relatives />
				</BlockCard>
			</TabPane>
			<TabPane tab="BMI" key="bmi">
				<BlockCard>
					<BMI />
				</BlockCard>
			</TabPane>
		</Tabs>
	);
};

export default SeamanEdit;
