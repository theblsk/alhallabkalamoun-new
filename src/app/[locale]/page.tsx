import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MenuGrid from '@/components/MenuGrid';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MenuGrid />
      <Contact />
    </main>
  );
}
