import Hero from "./components/Hero";
import Featured from "./components/Featured";

export default function Home() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <Featured />
    </div>    
  );
}
