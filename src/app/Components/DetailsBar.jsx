import React, { useContext } from 'react'
import { UserContext } from './UserContext';
import Image from 'next/image';

const DetailsBar = () => {
  const { isLoged, userId ,setViewLeft} = useContext(UserContext);

  return (
    <div className='border border-black  w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-5 overflow-y-auto items-start justify-center'>
      <div className={`my_transition absolute top-0 left-0 p-2 bg-my_red rounded-r-2xl lg:hidden mt-5`} onClick={() => setViewLeft(true)}>
        <Image src='/svgs/left_errow.svg' alt='arrow-view' width={15} height={15} />
      </div>
      <div className="shadow-2xl rounded-md h-[400px] w-[250px] mx-auto flex flex-col justify-center items-center p-3 gap-2">
        <div className=" w-full h-[80%] relative">
          <img src="https://storage.googleapis.com/eleanor-3aa19.appspot.com/images/1730678693645_Ho-2.webp" alt="image not found" className='object-contain h-full w-full' />
        </div>
        <div className="bg-my_dark text-my_light py-2 rounded-md flex items-center justify-center uppercase w-[80%] cursor-pointer">view Details</div>
      </div>

    </div>
  )
}

export default DetailsBar