/**
 * Internal dependencies.
 */
import { Tabs } from '../ui'
import Banks from './Banks';
import BMI from './BMI';
import Documents from './Documents';
import Experiences from './Experiences';
import General from './General';
import Relatives from './Relatives';
import Passports from './Passports';
import Refs from './Refs';

const SeamanTabs = () => {
  const tabs = [
    { active: true, title: 'General', content: <General /> },
    { title: 'Experiences', content: <Experiences /> },
    { title: 'Passports', content: <Passports /> },
    { title: 'Documents', content: <Documents /> },
    { title: 'Relatives', content: <Relatives /> },
    { title: 'Banks', content: <Banks /> },
    { title: 'BMI', content: <BMI /> },
    { title: 'Refs', content: <Refs /> }
  ];

  return (
    <Tabs
      id="seaman"
      content={ tabs }
    />
  );
};

export default SeamanTabs;
