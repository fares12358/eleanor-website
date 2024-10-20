import Image from "next/image";
import Hero from "./Components/Hero";
import Nav from "./Components/Nav";
import Des from "./Components/Des";

export default function Home() {
  return (
    <main className="w-full h-full container mx-auto  bg-[#EEDDCC] overflow-scroll no_scrollbar ">
      <Nav/>
      <Hero/>
    </main>
  );
}
