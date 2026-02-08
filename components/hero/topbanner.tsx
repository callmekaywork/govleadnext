import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { FaAsterisk } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

import Image from 'next/image';
import Link from 'next/link';

import * as motion from 'motion/react-client';

export default function Topbanner() {
  return (
    <div>
      <div className="h-[120px] w-full"></div>
      <motion.div
        initial={{ scale: 0.6, opacity: 0.8 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.2,
          ease: ['easeIn', 'easeOut'],
          scale: { type: 'spring', visualDuration: 0.1, bounce: 0.2 },
        }}
        className="md:hidden  bg-[#f0f0f0] w-full pb-4"
      >
        <div className="flex flex-col-reverse h-auto w-[95%] mx-[2.5%] relative">
          {/* <Separator className="mt-3" /> */}

          {/* Background image */}
          <div className="flex justify-center items-center bg-gray-200 h-[500px] w-[100%] mt-4 rounded-2xl overflow-hidden">
            <Image
              className="w-full h-full object-cover "
              src="/Hero_1.jpg"
              alt="Hero Image optimized"
              width={2975}
              height={1960}
            />
          </div>

          <div className="absolute top-[10px] right-3 flex justify-center items-center h-[50px] w-[50px] bg-orange-400 rounded-full">
            <HiAcademicCap size={40} fill="white" />
          </div>

          {/** Absolute Text on top of Image */}

          <div className="absolute h-auto w-[100%] bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent rounded-2xl">
            <h1 className="mt-3 px-4 text-white flex flex-col">
              <span className="font-extrabold text-2xl">
                IncuVera Entrepreneur Incubation Program
              </span>{' '}
              <span className="font-light">
                Empowering Entrepreneurs, Creating Jobs”
              </span>
            </h1>

            {/* <Separator /> */}

            <div className="flex flex-col h-auto px-4 w-full bg-gradient-to-t from-[rgba(0,0,0,0.55)] to-transparent rounded-2xl">
              <span className="h-[40px] w-full flex justify-center items-center my-2 font-bold text-3xl text-green-500">
                Join us Today!
              </span>
              <span className="w-full flex justify-center items-center mb-4 ">
                <Link href="/joinnow">
                  <Button className="h-[60px] w-[250px] bg-orange-400 text-black rounded-none ">
                    Join Now
                  </Button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0.8 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.2,
          scale: { type: 'spring', visualDuration: 0.1, bounce: 0.2 },
        }}
        className="hidden md:block bg-[#f0f0f0] w-full pb-8"
      >
        <div className="flex flex-row-reverse items-center justify-center ">
          <div className="flex justify-center items-center bg-gray-200 h-[400px] w-[350px] mt-4 rounded-2xl overflow-hidden">
            {/* <div>Image placeholder</div> */}
            <Image
              className="w-full h-full object-cover "
              src="/img_2.jpeg"
              alt="Hero Image optimized"
              width={2975}
              height={1960}
            />
          </div>
          <div className="p-2 mr-2">
            <h1 className="h-[100px] flex items-center text-5xl font-bold">
              Welcome
            </h1>

            <h1 className="my-1  text-black flex flex-col w-[300px]">
              <span className="font-extrabold text-2xl">
                IncuVera Entrepreneur Incubation Program
              </span>{' '}
              <span className="font-light text-[13px] p-1 bg-[#38383b] text-white">
                Empowering Entrepreneurs, Creating Jobs”
              </span>
            </h1>
            <p className="w-[300px] text-[15px]">
              Structured Business Incubation A comprehensive six-month
              incubation programme designed to support early-stage and growing
              businesses with the tools, systems, and strategies required to
              scale sustainably.
            </p>
            <div>
              <Button className="h-[50px] w-[160px] mt-2 rounded-none bg-[#303030] text-white flex justify-center hover:cursor-pointer hover:bg-[#292833]">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
