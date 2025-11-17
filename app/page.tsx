'use client';

import { Element } from 'react-scroll';

import { FloatingNavbar } from '@/components/layout/FloatingNavbar';
import { Footer } from '@/components/layout/Footer';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';

export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      <FloatingNavbar />
      <main>
        <Element name='hero'>
          <Hero />
        </Element>
        <Element name='work'>
          <Projects />
        </Element>
        <Element name='about'>
          <About />
        </Element>
        <Element name='experience'>
          <Experience />
        </Element>
        <Element name='contact'>
          <Contact />
        </Element>
      </main>
      <Footer />
    </div>
  );
}
