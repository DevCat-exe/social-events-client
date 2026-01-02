import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import Categories from "../components/home/Categories";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";
import Gallery from "../components/home/Gallery";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
      <Categories />
      <FAQ />
      <CTA />
      <Gallery />
      <Newsletter />
    </div>
  );
};

export default Home;
