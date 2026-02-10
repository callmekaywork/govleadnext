import Image from 'next/image';

export default function Footer() {
  return (
    <div>
      <footer className="h-auto row-start-3 flex gap-[24px] flex-wrap items-center justify-center bg-[#2e2e2e] text-white p-4">
        {/* <p>govern@govlead.co.za</p>
        <p>0712198630</p> */}

        {/* <Separator color="white" /> */}
        <section className="min-h-100 bg-[#2e2e2e] w-full"></section>

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
