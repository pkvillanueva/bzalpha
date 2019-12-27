/**
 * External dependencies.
 */
import { Tabs, Card } from 'antd';
const { TabPane } = Tabs;

/**
 * Internal dependencies.
 */
import BlockCard from '~/components/BlockCard';
import PersonalInformation from './Tabs/PersonalInformation';
import ContactInformation from './Tabs/ContactInformation';
import EditRelatives from './EditRelatives';
import EditEducations from './EditEducations';
import EditPassports from './EditPassports';
import EditVisas from './EditVisas';
import EditExperiences from './EditExperiences';
import Licenses from './Tabs/Licenses';
import BMI from './Tabs/BMI';

const SeamanEdit = () => (
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
			<Card title="Experiences">
				<EditExperiences />
			</Card>
		</TabPane>
		<TabPane tab="Passports" key="passports">
			<BlockCard>
				<Card title="Passports">
					<EditPassports />
				</Card>
			</BlockCard>
			<BlockCard>
				<Card title="VISAS">
					<EditVisas />
				</Card>
			</BlockCard>
		</TabPane>
		<TabPane tab="Licenses" key="documents">
			<BlockCard>
				<Licenses />
			</BlockCard>
		</TabPane>
		<TabPane tab="Educations" key="educations">
			<Card title="Educations">
				<EditEducations />
			</Card>
		</TabPane>
		<TabPane tab="Relatives" key="relatives">
			<Card title="Relatives">
				<EditRelatives />
			</Card>
		</TabPane>
		<TabPane tab="BMI" key="bmi">
			<BlockCard>
				<BMI />
			</BlockCard>
		</TabPane>
	</Tabs>
);

export default SeamanEdit;
