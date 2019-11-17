/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
const { TabPane } = Tabs;

/**
 * Internal dependencies.
 */
import BlockCard from '~/components/BlockCard';
import PersonalInformation from './tabs/PersonalInformation';
import ContactInformation from './tabs/ContactInformation';
import Relatives from './tabs/Relatives';
import Educations from './tabs/Educations';
import Passports from './tabs/Passports';
import Visas from './tabs/Visas';
import Experiences from './tabs/Experiences';
import Documents from './tabs/Documents';
import BMI from './tabs/BMI';

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
      <TabPane tab="Relatives" key="relatives">
        <BlockCard>
          <Relatives />
        </BlockCard>
      </TabPane>
      <TabPane tab="Educations" key="educations">
        <BlockCard>
          <Educations />
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
      <TabPane tab="Experiences" key="experiences">
        <BlockCard>
          <Experiences />
        </BlockCard>
      </TabPane>
      <TabPane tab="Documents" key="documents">
        <BlockCard>
          <Documents />
        </BlockCard>
      </TabPane>
      <TabPane tab="BMI" key="bmi">
        <BlockCard>
          <BMI />
        </BlockCard>
      </TabPane>
    </Tabs>
  );
}

export default SeamanEdit;
