import React from 'react';
import * as motion from 'motion/react-client';

export default function Aboutustab() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="w-3/4 h-30 flex items-center mt-5 mb-2 hover:bg-gray-300 px-2 lg:justify-center">
        <h1 className="text-6xl">About Incuvera</h1>
      </div>
      <div className="w-3/4 flex flex-col gap-10 justify-center items-center h-full">
        {/* <p className="flex min-h-30 bg-amber-600 text-white p-15 w-160 hover:shadow-md cursor-pointer">
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
        </p> */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.1,
            scale: { type: 'spring', visualDuration: 0.2, bounce: 0.3 },
          }}
        >
          <p>
            IncuVera is a dynamic business incubation company dedicated to
            supporting entrepreneurs and growing businesses through structured
            development, strategic guidance, and practical resources.
          </p>
          <br />
          <p>
            Our mission is to empower founders to build sustainable, scalable,
            and market-ready enterprises by providing end-to-end support at
            every stage of their journey. We specialize in business audits,
            strategic planning, asset building through professional branding and
            digital presence, training and coaching, and performance monitoring.
            By combining these services, we equip businesses with the tools,
            knowledge, and confidence needed to thrive in competitive markets.
          </p>
          <br />
          <p>
            At IncuVera, we believe that every business has the potential to
            make a lasting impact. Through mentorship, skills development, and
            access to valuable networks, we help entrepreneurs transform ideas
            into tangible results, strengthen operational systems,
          </p>
          <br />
          <p>
            and establish strong brand identities that resonate with their
            target audience. Our comprehensive approach ensures that businesses
            are not only prepared to grow but are positioned to succeed
            long-term. IncuVera is more than an incubation company. We are a
            partner in your business journey, committed to helping you build,
            scale, and sustain enterprises that leave a meaningful mark.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
