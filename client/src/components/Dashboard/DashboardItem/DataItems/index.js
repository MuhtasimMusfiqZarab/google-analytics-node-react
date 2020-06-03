import React from 'react';
import Chart from './ChartItem/ChartItem';
import Text from './TextItem/TextItem';

//not the right way to export multiple components from a single file
export const ChartItem = () => <Chart />;
export const TextItem = () => <Text />;

// export { ChartItem, TextItem };
