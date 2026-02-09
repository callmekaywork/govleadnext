import { Header } from '@/components/header/header';

import Footer from '@/components/footer/footer';
import Topbanner from '@/components/hero/topbanner';

// import Middle from '@/components/hero/middle';
// import Whocanapply from '@/components/hero/whocanapply';
// import Rowsection from '@/components/hero/rowsection';
// import Image_1 from '@/components/hero/image_1';
// import Proposition from '@/components/hero/proposition';

import What from '@/components/hero/what';

export default function Home() {
  return (
    <div className="h-screen relative">
      <Header />

      <Topbanner />
      <br />
      <What />
      <br />
      {/* <Rowsection />
      <Middle />
      <br />
      <Whocanapply />
      <Image_1 />
      <Proposition /> */}
      {/* <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[12px] row-start-2 items-center sm:items-start"></main>
      </div> */}
      <Footer />
    </div>
  );
}
