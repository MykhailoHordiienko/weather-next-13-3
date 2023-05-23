import { getClient } from '@/apollo-client';
import fetchWeatherQueries from '../../../../../graphql/queries/fetchWeatherQueries';
import CallOutCard from '@/components/CallOutCard';
import StatCard from '@/components/StatCard';

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
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
    <div>
      {/* information panel */}
      <div>
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:
              {new Date(result.current_weather.time).toLocaleString()}(
              {result.timezone})
            </p>
          </div>
          <div>
            <CallOutCard message="This GPT" />
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
