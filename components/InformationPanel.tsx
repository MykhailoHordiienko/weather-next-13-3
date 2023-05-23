import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import CityPicker from './CityPicker';

type Props = {
  city: string;
  lat: string;
  long: string;
  result: IRoot;
};

const InformationPanel = ({ city, lat, long, result }: Props) => {
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
      <div>
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
