import React, { useEffect, useContext } from 'react';
import { map, isEmpty } from 'lodash';
import { Result, Spin, Empty } from 'antd';
import Filters from './Filters';
import Vessel from './Vessel';
import { WorksProvider, WorksContext } from '~/store/works';
import withProvider from '~/utils/withProvider';
import styles from './styles.less';

const Works = () => {
  const { loading, principalId, vesselId, vessels, getVessels, fetchVesselId } = useContext( WorksContext );

  // Initial data fetch.
  useEffect( getVessels, [ principalId, vesselId ] );

  const Vessels = () => {
    if ( loading ) {
      return (
        <div className={ styles.vesselsLoading }>
          <Spin size="large" />
        </div>
      );
    } else if ( isEmpty( vessels ) ) {
      return <Empty />;
    }

    return map( vessels, ( vessel, num ) => (
      <div className={ styles.vesselWrapper } key={ num }>
        <Spin spinning={ fetchVesselId === vessel.id } tip="Loading...">
          <Vessel
            vessel={ vessel }
            num={ ++num }
          />
        </Spin>
      </div>
    ) );
  };

  return (
    <>
      <Filters />
      { ( principalId || vesselId ) ?
        <Vessels /> :
        <Result
          title="Select an owner or a vessel"
        />
      }
    </>
  );
};

export default withProvider( WorksProvider, Works );
