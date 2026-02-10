import React from 'react';

export default function Bottomtab() {
  return (
    <div className="h-3/4 w-full flex flex-col justify-center items-center">
      <div className="w-3/4 h-30 flex items-center mt-5 bg-blue-500">
        <h1 className="text-6xl">About Incuvera</h1>
      </div>
      <div className="w-3/4 flex flex-col gap-10 justify-center items-center h-full">
        <p className="flex min-h-30 bg-amber-600 text-white p-15 w-160 hover:shadow-md cursor-pointer">
          At IncuVera Networks, we recognise that relationships are a critical
          driver of business success. Access to the right networks, insights,
        </p>
        <p className="flex min-h-30 bg-amber-800 text-white p-15 w-180 hover:shadow-md cursor-pointer">
          and opportunities can significantly accelerate growth. Our platforms
          are intentionally designed to foster collaboration, knowledge
          exchange, and strategic partnerships that enable entrepreneurs to
          expand their reach and strengthen their businesses.
        </p>
        <p className="flex min-h-30 bg-amber-500 text-white p-15 w-150 hover:shadow-md cursor-pointer">
          Through IncuVera Networks,entrepreneurs gain more than connections,
          they gain access to an ecosystem that supports learning, visibility,
          and long-term business growth.
        </p>
      </div>
    </div>
  );
}
