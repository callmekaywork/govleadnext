import Whatisincuvera from '@/components/hero/whatisincuvera';
import InformationSlider from '@/components/hero/info-slider';
import HeroModern from '@/components/hero/mordenhero';
import MinimalConcept from '@/components/hero/aboutustab';
import React from 'react';

import { useScrollTo } from '@/hooks/useScrollto';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import IdeaOne from '@/components/hero/ideaone';
import Testimonials from '@/components/contacts/testimonials';
import Socials from '@/components/contacts/socials';

export default function Home() {
  const scrollTo = useScrollTo();

  const handleNavigate = (newPage: number) => {
    // Scroll to top of container when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="h-auto relative">
      <Header />
      <HeroModern />
      {/* <Welcomescreen /> */}
      <IdeaOne />
      <MinimalConcept />
      <InformationSlider />
      <Testimonials />
      <Socials />
      <Footer />
    </div>
  );
}
