'use client';
import { Card, AreaChart, Title } from '@tremor/react';

type Props = {
  result: IRoot;
};

const HumidityChart = ({ result }: Props) => {
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
    'Humidity (%)': result.hourly.relativehumidity_2m[idx],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <Card>
      <Title>Humidity Levels</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={['Humidity (%)']}
        colors={['teal']}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default HumidityChart;
