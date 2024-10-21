'use client';
import Image from 'next/image';
import React, { useState } from 'react'
const page = () => {

    const catetory = ['T-shirt', 'Pantes', 'Merch'];
    const [view, setView] = useState(false);
    const handleCatView = () => {
        view ? setView(false) : setView(true);
    }
    return (
        <div className=' w-full h-[calc(100vh-80px)] relative font-mono flex'>
            <div className={`sidebar z-30 sm:static absolute ${view ? 'left-0' : '-left-full  '} w-[150px] sm:w-[250px]  bg-my_red  text-my_light h-full flex  flex-col items-start justify-start gap-5 font-bold p-5 rounded-tr-3xl shadow-2xl`}>
                <Image src={'/svgs/close-white.svg'} alt='close' width={30} height={30} className='cursor-pointer z-30  absolute right-4 sm:hidden' onClick={handleCatView} />
                <h2 className='text-xl sm:text-2xl self-center mt-10'>Wardrobe</h2>
                <p className='text-md sm:text-xl'>Category</p>
                <ul className='flex flex-col gap-5 h-full w-full overflow-auto no_scrollbar list-none cursor-pointer'>
                    {
                        catetory.map((item, index) => (
                            <li key={index} className='text-md font-bold p-2 shadow-xl'>{item}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="viewer h-full w-full flex flex-col items-center justify-start gap-10 p-5 overflow-y-scroll no_scrollbar relative">
                <div className={`absolute top-0 left-0 p-5 bg-my_red rounded-r-2xl sm:hidden ${view ? "hidden" : 'block'}  `} onClick={handleCatView}></div>
                <div className="rounded-xl p-5 shadow-2xl gap-2 flex flex-col">
                    <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px]  relative">
                        <Image src={'/svgs/close.svg'} alt='close' width={30} height={30} className='cursor-pointer relative z-10' />
                        <Image src={'/images/Ho-1.png'} alt='imge' fill className='object-contain' />
                    </div>
                    <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px] relative">
                        <Image src={'/svgs/close.svg'} alt='close' width={30} height={30} className='cursor-pointer relative z-10' />
                        <Image src={'/images/Pant-2.png'} alt='imge' fill className='object-contain' />
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-center">
                    <button className='text-xl bg-my_dark px-4 sm:px-10 py-2 text-my_light rounded-lg'>use it</button>
                    <button className='text-xl bg-my_dark px-4 sm:px-10 py-2 text-my_light rounded-lg'>clear</button>
                </div>
            </div>
        </div>
    )
}

export default page