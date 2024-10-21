import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:p-5 overflow-hidden text-my_red  ">
      <div className="p-5 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-10 md:mt-20 leading-tight" >
          Find The Best Fashion Style For You
        </h2>
        <p className="text-lg md:text-xl font-normal mt-5 md:mt-10 w-full md:w-[80%] text-my_red ">
        <span className='font-bold'>Eleanor</span> is an electronic wardrobe application that aims to organize and coordinate personal fashion. It collects all the clothes available in your closet in an organized manner, making it easier to manage and coordinate your daily look in a smooth, distinctive, and orderly style.
        </p>
        <button className="text-white bg-my_dark md:w-fit md:px-12 text-lg px-8 py-3 font-bold mt-6 md:mt-10 rounded-lg my_shadow">
          Try Now
        </button>
      </div>
      <div className="flex items-center justify-center md:py-20 p-0 ">
        <div className="relative w-full h-[300px] md:h-[500px]  ">
          <Image src={'/images/freepik.jpeg'} fill alt="main" className="object-contain rounded-lg md:rounded-bl-[150px]" />
        </div>
      </div>
    </div>

  )
}

export default Hero