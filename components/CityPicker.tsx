'use client';
import { Country, City } from 'country-state-city';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import { GlobeIcon } from '@heroicons/react/solid';

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

const options = Country.getAllCountries().map(country => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

type Props = {};

const CityPicker = (props: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(null);
  const [selectedCity, setSelectedCity] = useState<CityType>(null);

  const router = useRouter();

  const handleCountryChange = (country: CountryType) => {
    setSelectedCountry(country);
    setSelectedCity(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-white/80">
        <GlobeIcon className="h-5 w-5 text-white" />
        <label htmlFor="country">Country</label>
      </div>
      <Select
        className="text-black"
        value={selectedCountry}
        onChange={handleCountryChange}
        options={options}
      />
    </div>
  );
};

export default CityPicker;
