import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Branches from "./components/Branches";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InstagramButton from "./components/InstagramButton";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Products />
        <Branches />
        <Contact />
      </main>

      <Footer />

      <InstagramButton />
    </>
  );
}

export default App;