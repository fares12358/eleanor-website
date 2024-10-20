import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full container mx-auto  bg-[#EEDDCC] overflow-scroll no_scrollbar">
      <nav className=" flex justify-between items-center h-[80px] px-5">
        <h1 className="text-black font-bold text-3xl uppercase">eleanor</h1>
        <ul className="flex items-center justify-center  gap-20 text-xl text-black font-bold">
          <li className="cursor-pointer uppercase">Home</li>
          <li className="cursor-pointer uppercase">collection</li>
          <li className="cursor-pointer uppercase">wardrobe</li>
        </ul>
        <button className="font-medium border border-black px-10 py-2">login</button>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100%-80px)] p-5">
        <div className=" p-5">
          <h2 className="w-[80%]  text-7xl font-bold mt-20">Find The Best Fashion Style For You</h2>
          <p className="w-[80%]  text-xl font-normal mt-10">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa ducimus veniam tempore rerum, dicta velit minus odio eius assumenda cumque dignissimos quaerat, dolor, aperiam voluptas totam eaque deleniti exercitationem necessitatibus.</p>
          <button className="text-white bg-[#34251f] text-lg px-12 py-3 font-bold mt-10 my_shadow">try now</button>
        </div>
        <div className=" flex items-center justify-center px-28 p-20">
          <div className=" w-full h-full relative rounded-lg rounded-bl-[250px] overflow-hidden">
            <Image src={'/images/main.jpg'} fill alt="main" className="object-cover" />
          </div>
        </div>
      </div>
      
    </main>
  );
}
