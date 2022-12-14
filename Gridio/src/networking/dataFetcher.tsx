import React from 'react';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {Data} from '../types';

export function useDataFetcher() {
  const [lineChartData, setLineChartData] =
    React.useState<LineChartData | null>(null);
  const [loading, setLoading] = React.useState(false);

  const start = React.useMemo(() => {
    return new Date();
  }, []);
  const end = React.useMemo(() => {
    return new Date();
  }, []);

  const now = new Date();
  start.setDate(now.getDate() - 1);
  end.setDate(now.getDate() + 1);

  const prepareChartData = (data: Data[]): void => {
    const chartData = {
      labels: data.map(item => {
        var date = new Date(item.timestamp * 1000);
        var hours = date.getHours();
        return String(hours);
      }),
      datasets: [
        {
          data: data.map(item => {
            return item.production;
          }),
        },
      ],
    };

    setLineChartData(chartData);
  };

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const formattedStartDate = start.toISOString();
      const formattedEndDate = end.toISOString();

      const response = await fetch(
        `https://dashboard.elering.ee/api/system/with-plan?start=${formattedStartDate}&end=${formattedEndDate}`,
      );
      const json = await response.json();

      prepareChartData(json.data.real);
    } finally {
      setLoading(false);
    }
  }, [end, start]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {lineChartData, loading};
}
