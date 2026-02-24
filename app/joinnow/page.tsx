import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import * as motion from 'motion/react-client';

export default function Page() {
  return (
    <div>
      <div className="h-[120px] w-full"></div>
      <div>
        <div className="w-full h-auto">
          <h1 className="h-[100px] w-full flex justify-center items-center text-3xl font-light bg-black text-white">
            Join now page
          </h1>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
          }}
          className="w-full h-auto"
        >
          <form action="" className="px-5 flex flex-col items-center">
            <Label className="italic opacity-65 mb-2 mt-4">
              We cant wait to hear from you!
            </Label>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
              }}
            >
              <Input
                className="input-varient"
                placeholder="Enter your name..."
              />
              <Input
                className="input-varient"
                placeholder="Enter your surname..."
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
              }}
            >
              <Input
                className="input-varient"
                placeholder="Enter your email..."
              />
              <Input
                className="input-varient"
                placeholder="Enter contact email.."
              />
            </motion.div>
            <Button className="h-[60px] w-[250px]">Submit</Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
