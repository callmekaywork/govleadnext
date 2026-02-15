import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';

export default function WhatisIncuvera() {
  return (
    <div className="flex justify-center items-center min-h-180 md:h-screen  w-full md:my-10">
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

      <div className="md:flex md:flex-col md:justify-start md:w-5/6 lg:w-4/5 2xl:w-3/5 max-h-250 w-full gap-2 px-2 bg-gray-200 py-10">
        <motion.div className="h-40  md:h-40 w-full flex items-center justify-start lg:justify-center">
          <h1 className="text-black font-semibold text-6xl p-2 ">
            What is <span className="text-green-500">IncuVera</span>?
          </h1>
        </motion.div>

        <div className="w-full  min-h-100 md:grid md:grid-cols-2 md:grid-rows-2 justify-center items-center p-5 gap-4 flex flex-col">
          <div className="w-full flex justify-center">
            <div className="h-auto w-auto md:h-80 md:w-120 mb-2 md:mb-0  flex justify-center items-center overflow-hidden p-3 bg-green-700">
              <Image
                width={980}
                height={980}
                alt=""
                src={'/img_1.jpeg'}
                className="object-fit "
              />
            </div>
          </div>
          <div className="text-black flex flex-col gap-2 md:flex md:justify-center md:px-20">
            <span className="italic text-[15px] lg:text-[22px]">
              IncuVera is a
              <span className="py-0.5 px-2 bg-orange-500">
                business incubation
              </span>
              and enterprise development firm focused on helping entrepreneurs
              build, grow, and scale sustainable businesses.
            </span>
          </div>
          <div className=" md:flex md:justify-center md:px-20 text-black flex flex-col gap-2">
            <span className="italic text-[15px] lg:text-[22px]">
              "Through a structured six-month incubation programme, we provide
              strategic mentorship and professional consultancy designed to
              strengthen business foundations and drive measurable growth."
            </span>
          </div>
          <div className="w-full flex justify-center">
            <div className="h-auto w-auto md:h-80 md:w-120 mb-2 md:mb-0  flex justify-center items-center overflow-hidden p-3 bg-gray-500">
              <Image
                width={980}
                height={980}
                alt=""
                src={'/img_5.jpeg'}
                className="object-fit "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
