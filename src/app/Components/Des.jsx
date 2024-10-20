import Image from 'next/image'
import React from 'react'

const Des = () => {
  return (
    <div className="border border-black h-full w-full p-5 grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center px-28 p-20">
        <div className=" w-full h-full relative rounded-lg rounded-bl-[250px] overflow-hidden">
            <Image src={'/images/main.jpg'} fill alt="main" className="object-cover" />
          </div>
        </div>
        <div className="border border-black">
          <h2>try Best Fashion with eleanor</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis maiores quos natus cum quaerat. Sunt quaerat, eos dolores, in nobis pariatur tempora sequi quisquam distinctio neque eius natus libero iure?</p>
          <div className=""></div>
        </div>
      </div>
  )
}

export default Des