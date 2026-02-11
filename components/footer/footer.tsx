import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Footer() {
  return (
    <div>
      <footer className="h-auto row-start-3 flex gap-[24px] flex-wrap items-center justify-center bg-[#2e2e2e] text-white p-4 mt-10">
        {/* <p>govern@govlead.co.za</p>
        <p>0712198630</p> */}

        <div className="h-10 w-full"></div>

        <section className="w-full flex flex-col justify-start px-2 gap-3">
          <h1 className="text-3xl">Support?</h1>
          <p className="cursor-pointer">Contact us</p>
        </section>

        {/* <Separator color="white" /> */}
        <section className="min-h-100 bg-[#2e2e2e] w-full">
          <Accordion
            type="single"
            collapsible
            defaultValue="shipping"
            className="max-w-lg"
          >
            <AccordionItem value="shipping">
              <AccordionTrigger>
                What are your shipping options?
              </AccordionTrigger>
              <AccordionContent>
                We offer standard (5-7 days), express (2-3 days), and overnight
                shipping. Free shipping on international orders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                Returns accepted within 30 days. Items must be unused and in
                original packaging. Refunds processed within 5-7 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionContent>
                Reach us via email, live chat, or phone. We respond within 24
                hours during business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          {/** Lower Footer section */}
          <div className="h-[160px] w-full flex flex-col gap-2 justify-center">
            <div className="w-full  flex items-center justify-left mx-[25px] overflow-hidden">
              <Image
                src="./Full_Logo.svg"
                alt="logo optimized"
                width={120}
                height={120}
                className="object-center"
              />
            </div>

            <p className="w-full text-center text-[10px] mt-2">
              © 2026 IncuVera pty
            </p>
          </div>
        </section>
      </footer>
    </div>
  );
}
