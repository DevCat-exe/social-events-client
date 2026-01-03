import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import Categories from "../components/home/Categories";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";
import Newsletter from "../components/home/Newsletter";
import Partners from "../components/home/Partners";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <Categories />
      <Statistics />
      <Testimonials />
      <Partners />
      <CTA />
      <Newsletter />
      <FAQ />
    </div>
  );
};

export default Home;