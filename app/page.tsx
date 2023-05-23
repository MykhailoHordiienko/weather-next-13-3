'use client';

import CityPicker from '@/components/CityPicker';
import { Card, Divider, Subtitle, Text } from '@tremor/react';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-10 min-h-screen bg-gradient-to-br from-[#1e8aae] to-[#1c549d]">
      <Card className="max-w-7xl">
        <Text className="text-6xl font-bold text-center mb-10">
          Weather APP
        </Text>
        <Subtitle className="text-xl text-center">
          Next.js 13.3 React Tremor 2.0 StepZen GraphQL
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gradient-to-br from-[#56CCF2] to-[#2F80ED]">
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}
