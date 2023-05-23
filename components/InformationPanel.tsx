import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import CityPicker from './CityPicker';
import weatherCodeToString from '@/helpers/weatherCodeToString';
import Image from 'next/image';

type Props = {
  city: string;
  lat: string;
  long: string;
  result: IRoot;
  timezone: string;
};

const InformationPanel = ({ city, lat, long, result, timezone }: Props) => {
  return (
    <div className="bg-gradient-to-br from-[#1e8aae] to-[#1c549d] text-white p-10">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        <p className="text-xs text-gray-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>
      <CityPicker />
      <hr className="my-10" />
      <div className="mt-5 mb-5 flex items-center justify-between space-x-10">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="font-extralight">Timezone: {timezone}</p>
        </div>
        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleDateString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        </p>
      </div>
      <hr className="mt-10 mb-5" />
      <div className="flex items-center justify-between">
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[result.current_weather.weathercode].icon
            }.png`}
            alt={weatherCodeToString[result.current_weather.weathercode].label}
            width={75}
            height={75}
          />
        </div>
        <div className="flex items-center justify-between space-x-10">
          <p className="text-6xl font-semibold">
            {result.current_weather.temperature.toFixed(1)}°C
          </p>
          <p className="text-right font-extralight text-lg">
            {weatherCodeToString[result.current_weather.weathercode].label}
          </p>
        </div>
      </div>
      <div className="space-y-2 py-5">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6f90cd] rounded-md bg-[#405885]">
          <SunIcon className="h-10 w-10 text-gray-400" />
          <div className="flex flex-1 justify-between items-center">
            <p className="font-extralight">Sunrise</p>
            <p className="text-2xl uppercase">
              {new Date(result.daily.sunrise[0]).toLocaleTimeString('en-GB', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6f90cd] rounded-md bg-[#405885]">
          <MoonIcon className="h-10 w-10 text-gray-400" />
          <div className="flex flex-1 justify-between items-center">
            <p className="font-extralight">Sunset</p>
            <p className="text-2xl uppercase">
              {new Date(result.daily.sunset[0]).toLocaleTimeString('en-GB', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
