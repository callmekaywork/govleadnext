import * as motion from 'motion/react-client';

export default function Whocanapply() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0.8 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.2,
        scale: { type: 'spring', visualDuration: 0.2, bounce: 0.3 },
      }}
      className=""
    >
      <div className="h-auto w-[90%] mx-[5%] mt-4 mb-4 bg-gray-200 rounded-2xl md:hidden">
        {/* <Separator /> */}
        <div className="h-auto px-4 pt-4">
          <h1 className="text-3xl font-bold">Who can apply</h1>
        </div>

        <ul className="px-4 h-[300px] mt-4">
          <li className="h-auto w-full p-4 rounded-2xl">
            <span>Age:</span> <span>18–45</span>
          </li>
          <li className="h-auto w-full p-4 rounded-2xl bg-[#dbdbdb]">
            {/* <span>Stages:</span>{' '} */}
            <span>
              Idea stage, early-stage entrepreneurs (0–2 years), small & growing
              businesses (2–5 years)
            </span>
          </li>

          <li className="h-auto w-full p-4 rounded-2xl">
            {/* <span>Sectors:</span>{' '} */}
            <span>
              Service-based businesses, small-scale manufacturing, agriculture,
              tech startups, community-based enterprises
            </span>
          </li>
        </ul>
      </div>

      <div className="hidden md:block">Media on large screen</div>
    </motion.div>
  );
}
