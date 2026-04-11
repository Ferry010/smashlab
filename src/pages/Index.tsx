import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import VrijeBanen from '@/components/VrijeBanen';
import Categories from '@/components/Categories';
import Blogs from '@/components/Blogs';
import Niveau from '@/components/Niveau';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Marquee />
      <VrijeBanen />
      <Categories />
      <Blogs />
      <Niveau />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
