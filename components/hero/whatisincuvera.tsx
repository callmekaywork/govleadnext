import Image from 'next/image';
import Link from 'next/link';

export default function WhatisIncuvera() {
  return (
    <div className="flex justify-center items-center md:h-2/4 w-full">
      {/* <div className="md:hidden">
        <div className="w-full bg-[#1d1d1d] h-[500px] pb-5">
          <div>
            <h1 className="text-5xl h-[100px] text-[#e9e9e9] px-4 flex justify-start items-center">
              what are we?
            </h1>
          </div>
          <div className="p-5 bg-[#373738] h-auto w-[90%] mx-[5%] md:w-[500px]">
            <span className="text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde,
              adipisci recusandae similique rerum dolorem fuga voluptatum magni
              autem nostrum ut, saepe, deleniti fugiat vel reprehenderit vero
              numquam? molestias? temporibus sint vitae velit, sapiente,
              veritatis et facilis quam maxime assumenda numquam? Laborum quod
              autem consequatur reiciendis ex blanditiis, culpa illum unde
              maxime at iure? Iste, aspernatur.
            </span>
          </div>
        </div>
      </div> */}

      {/* <div className="grid grid-cols-5 grid-rows-4 gap-4">
          {blocks.map((index, key) => (
            <span
              key={key}
              className="h-[100px] w-[100px] flex justify-center items-center bg-[#c7c7c7]"
            >
              {index}
            </span>
          ))}
        </div> */}
      <div className="md:block md:w-3/4 w-full px-2">
        <div className="h-30 w-full flex justify-start items-center mb-2 lg:justify-center">
          <h1 className="   font-semibold text-6xl p-2 ">
            What is <span className="text-green-500">IncuVera</span>?
          </h1>
        </div>
        <div className="flex flex-col md:flex md:flex-row md:justify-center w-full md:h-[400px] items-center">
          <div className="flex justify-center items-center md:mx-2">
            <div className="h-[300px] w-full mb-2 md:mb-0 md:w-[450px] bg-[#7a7a7a] relative flex justify-center items-center overflow-hidden">
              <Image
                width={980}
                height={980}
                alt=""
                src={'/img_1.jpeg'}
                className="object-fill "
              />
            </div>
          </div>

          <div className="p-5 bg-[#373738] h-[300px] md:w-[400px] flex flex-col gap-5">
            <div className="text-white flex flex-col gap-2">
              <span>
                IncuVera is a business incubation and enterprise development
                firm focused on helping entrepreneurs build, grow, and scale
                sustainable businesses.
              </span>
              <span>
                Through a structured six-month incubation programme, we provide
                strategic mentorship and professional consultancy designed to
                strengthen business foundations and drive measurable growth.
              </span>
              <Link className={`text-2xl text-green-300`} href={'/about'}>
                more...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
