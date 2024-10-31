'use client';
import Image from 'next/image'
import React, { useContext } from 'react'
import { UserContext } from "./UserContext";
import { useRouter } from 'next/navigation';

const Hero = () => {
  const { isLoged } = useContext(UserContext);
  const router = useRouter();

  const handleTryNow=(e)=>{
    e.preventDefault();
    if(isLoged){
      router.push('/Wardrobe');
    }else{
      router.push('/Log');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:p-20 overflow-hidden text-my_red">
      <div className="p-5 flex flex-col justify-center order-2 lg:order-1">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold md:mt-20 leading-tight" >
          Find The Best Fashion Style For You
        </h2>
        <p className="text-lg md:text-xl font-normal mt-5 md:mt-10 w-full md:w-[80%] text-my_red ">
        <span className='font-bold'>Eleanor</span> is an electronic wardrobe application that aims to organize and coordinate personal fashion. It collects all the clothes available in your closet in an organized manner, making it easier to manage and coordinate your daily look in a smooth, distinctive, and orderly style.
        </p>
        <button onClick={handleTryNow} className="text-white bg-my_dark md:w-fit md:px-12 text-lg px-8 py-3 font-bold mt-6 mb-10 lg:mb-0 md:mt-10 rounded-lg my_shadow">
          Try Now
        </button>
      </div>
      <div className="flex items-center justify-center md:py-20 p-0 mt-10 md:mt-0 order-1 lg:order-2">
        <div className="relative w-full h-[300px] md:h-[500px]">
          <Image src={'/images/image.webp'} fill alt="main" className="object-contain" />
        </div>
      </div>
    </div>

  )
  
}

export default Hero