'use client';
import { Card, AreaChart, Title } from '@tremor/react';

type Props = {
  result: IRoot;
};

const TempChart = ({ result }: Props) => {
  const hourly = result?.hourly.time
    .map(time =>
      new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        hour12: false,
      })
    )
    .slice(1, 25);

  const data = hourly.map((hour, idx) => ({
    time: Number(hour),
    'UV Index': result.hourly.uv_index[idx],
    'Temperature (C)': result.hourly.temperature_2m[idx],
  }));

  const dataFormatter = (number: number) => `${number}`;

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={['Temperature (C)', 'UV Index']}
        colors={['yellow', 'rose']}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default TempChart;
