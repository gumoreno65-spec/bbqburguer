import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import About from '@/components/About';
import Reservations from '@/components/Reservations';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Reservations />
      </main>
      <Footer />
    </div>
  );
}
