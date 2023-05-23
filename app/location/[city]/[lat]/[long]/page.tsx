import { getClient } from '@/apollo-client';
import StatCard from '@/components/StatCard';
import CallOutCard from '@/components/CalloutCard';
import fetchWeatherQueries from '@/graphql/queries/fetchWeatherQueries';
import InformationPanel from '@/components/InformationPanel';
import TempChart from '@/components/TempChart';
import RainChart from '@/components/RainChart';
import HumidityChart from '@/components/HumidityChart';

export const revalidate = 60;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
  searchParams: {
    timezone: string;
  };
};

async function WeatherPage({
  params: { city, lat, long },
  searchParams: { timezone },
}: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQueries,
    variables: {
      current_weather: 'true',
      longitude: long,
      latitude: lat,
      timezone: 'GMT',
    },
  });

  const result: IRoot = data.myQuery;
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel
        city={city}
        result={result}
        lat={lat}
        long={long}
        timezone={timezone}
      />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:
              {new Date(result.current_weather.time).toLocaleString()}(
              {result.timezone})
            </p>
          </div>
          <div className="m-2 mb-10">
            <CallOutCard message="This GPT" />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Max Temp"
              metric={`${result.daily.temperature_2m_max[0].toFixed(1)}°`}
              color="yellow"
            />
            <StatCard
              title="Min Temp"
              metric={`${result.daily.temperature_2m_min[0].toFixed(1)}°`}
              color="green"
            />
            <div>
              <StatCard
                title="UV Index"
                metric={result.daily.uv_index_max[0].toFixed(1)}
                color="rose"
              />
              {Number(result.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CallOutCard
                  message={'The UV is to hight today, be sure to wear SPF!'}
                  warning
                />
              )}
            </div>
            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${result.current_weather.windspeed.toFixed(1)}m/s`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${result.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
        </div>
        <hr className="mb-5" />
        <div className="space-y-3">
          <TempChart result={result} />
          <RainChart result={result} />
          <HumidityChart result={result} />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
