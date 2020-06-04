import React from 'react';
import Chart from './ChartItem/ChartItem';
import Text from './TextItem/TextItem';
import RealTime from './RealTimeItem/RealTimeItem';

//not the right way to export multiple components from a single file
export const ChartItem = () => <Chart />;
export const TextItem = () => <Text />;
export const RealTimeItem = () => <RealTime />;

// export { ChartItem, TextItem };
