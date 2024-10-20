import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 overflow-hidden ">
      <div className="p-5 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-10 md:mt-20 leading-tight tx_lighter" >
          Find The Best Fashion Style For You
        </h2>
        <p className="text-lg md:text-xl font-normal mt-5 md:mt-10 w-full md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa ducimus veniam tempore rerum, dicta velit minus odio eius assumenda cumque dignissimos quaerat, dolor, aperiam voluptas totam eaque deleniti exercitationem necessitatibus.
        </p>
        <button className="text-white bg-my_dark md:w-fit md:px-12 text-lg px-8 py-3 font-bold mt-6 md:mt-10 rounded-lg my_shadow">
          Try Now
        </button>
      </div>
      <div className="flex items-center justify-center p-10 md:p-20">
        <div className="relative w-full h-[300px] md:h-[500px] rounded-lg rounded-bl-[150px] overflow-hidden"style={{
          boxShadow:'5px 15px 25px #34251f'
        }}>
          <Image src={'/images/main.jpg'} fill alt="main" className="object-cover" />
        </div>
      </div>
    </div>

  )
}

export default Hero