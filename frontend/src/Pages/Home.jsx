import NavBar from '../Components/NavBar';
import Hero from '../Components/Hero';
import HowItWorks from '../Components/howItWorks';
import FAQs from '../Components/FAQs';
import Footer from '../Components/Footer';

function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <HowItWorks />
      <FAQs />
      <Footer />
    </div>
  );
}

export default Home;
