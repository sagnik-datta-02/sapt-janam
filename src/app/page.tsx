import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero-Section";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Features/>
    <Testimonials/>
    <Footer/>
    </>
    
  );
}
