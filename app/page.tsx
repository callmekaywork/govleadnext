import Footer from '@/components/footer/footer';
import Topbanner from '@/components/hero/welcomescreen';

// import Middle from '@/components/hero/middle';
// import Whocanapply from '@/components/hero/whocanapply';
// import Rowsection from '@/components/hero/rowsection';
// import Image_1 from '@/components/hero/image_1';
// import Proposition from '@/components/hero/proposition';

import What from '@/components/hero/whatisincuvera';
import Rowsection from '@/components/hero/rowsection';
import Packages from '@/components/hero/packages';
import Whatisincuvera from '@/components/hero/whatisincuvera';
import Aboutustab from '@/components/hero/aboutustab';
import Welcomescreen from '@/components/hero/welcomescreen';
import InformationSlider from '@/components/hero/info-slider';
import HeroModern from '@/components/hero/mordenhero';
import CustomCursor from '@/components/custom-cursor';
import MinimalConcept from '@/components/hero/aboutustab';
import React from 'react';

import { useScrollTo } from '@/hooks/useScrollto';

export default function Home() {
  const scrollTo = useScrollTo();

  const handleNavigate = (newPage: number) => {
    // Scroll to top of container when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="h-auto relative">
      <CustomCursor />
      <HeroModern />
      {/* <Welcomescreen /> */}
      <Whatisincuvera />
      <MinimalConcept />
      <InformationSlider />

      <Footer />
    </div>
  );
}
