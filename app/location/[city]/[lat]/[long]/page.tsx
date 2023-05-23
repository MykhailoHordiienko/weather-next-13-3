import { getClient } from '@/apollo-client';
import fetchWeatherQueries from '../../../../../graphql/queries/fetchWeatherQueries';

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
  console.log(result);
  return (
    <div>
      WeatherPage {city}
      {lat}
      {long}
    </div>
  );
}

export default WeatherPage;
