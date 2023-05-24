'use client';
import { Country, City } from 'country-state-city';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import { GlobeIcon, SunIcon } from '@heroicons/react/solid';

type CountryType = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type CityType = {
  value: {
    longitude: string;
    latitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const CityPicker = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(null);
  const [selectedCity, setSelectedCity] = useState<CityType>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const optionsCountry = Country.getAllCountries().map(country => ({
    value: {
      latitude: country.latitude,
      longitude: country.longitude,
      isoCode: country.isoCode,
    },
    label: country.name,
  }));

  const optionsCity = () => {
    if (selectedCountry) {
      const options = City.getCitiesOfCountry(
        selectedCountry.value.isoCode
      )?.map(city => ({
        value: {
          latitude: city.latitude!,
          longitude: city.longitude!,
          countryCode: city.countryCode,
          name: city.name,
          stateCode: city.stateCode,
        },
        label: city.name,
      }));
      return options;
    }
    console.log('missing options');
  };

  const handleCountryChange = (country: CountryType) => {
    setSelectedCountry(country);
    setSelectedCity(null);
  };

  const handleCityChange = (city: CityType) => {
    setLoading(true);
    setSelectedCity(city);

    router.push(
      `/location/${city?.value.name}/${city?.value.latitude}/${
        city?.value.longitude
      }?timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`
    );
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <SunIcon
            className="h-24 w-24 animate-bounce text-yellow-500"
            color="yellow"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white/80">
              <GlobeIcon className="h-5 w-5 text-white" />
              <label htmlFor="country">Country</label>
            </div>
            <Select
              className="text-black"
              value={selectedCountry}
              onChange={handleCountryChange}
              options={optionsCountry}
            />
          </div>

          {selectedCountry && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/80">
                <GlobeIcon className="h-5 w-5 text-white" />
                <label htmlFor="country">City</label>
              </div>
              <Select
                className="text-black"
                value={selectedCity}
                onChange={handleCityChange}
                options={optionsCity()}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CityPicker;
