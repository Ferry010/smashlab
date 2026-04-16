import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OutfitPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="text-center">
        <h1 className="font-display text-5xl text-foreground lg:text-7xl">OUTFIT</h1>
        <p className="mt-4 font-body text-lg text-muted">Binnenkort beschikbaar</p>
      </div>
    </section>
    <Footer />
  </div>
);

export default OutfitPage;
