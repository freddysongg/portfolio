import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';

export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
