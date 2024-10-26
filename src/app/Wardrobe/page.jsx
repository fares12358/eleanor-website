'use client';
import Image from 'next/image';
import React, { useState } from 'react'
import ListeItems from '../Components/ListeItems';
const page = () => {
    const items = [1, 2, 3, 5]
    const catetory = ['T-shirt', 'Pantes', 'Merch'];
    const [view, setView] = useState(true);
    const handleCatView = () => {
        view ? setView(false) : setView(true);
    }
    return (
        <div className=' w-full h-[calc(100vh-80px)] relative font-mono flex pt-4 overflow-hidden'>
            <div className={` sidebar z-30 lg:static my_transition absolute ${view ? 'left-0' : '-left-full  '} w-[150px] sm:w-[200px] lg:w-[250px]
              bg-my_red  text-my_light h-full flex  flex-col items-start justify-start gap-4 font-bold py-5 rounded-tr-3xl shadow-2xl`}>
                <Image src={'/svgs/close-white.svg'} alt='close' width={25} height={25} className='cursor-pointer z-30  absolute right-3 top-3 lg:hidden' onClick={handleCatView} />

                <ul className='flex flex-col  h-full w-full overflow-auto no_scrollbar list-none cursor-pointer'>
                    <div className=" text-sm lg:text-lg font-bold py-2 lg:py-4  px-2 md:px-5 mt-8 lg:mt-0 border-my_light uppercase flex items-center justify-between">
                        <span>Favoraite</span>
                        <Image src={'/svgs/stare.svg'} alt='stare' width={20} height={20} />
                    </div>
                    <div className=" text-sm lg:text-lg font-bold py-2 lg:py-4 px-2 md:px-5 border-t border-my_light uppercase flex items-center justify-between">
                        <span>used</span>
                        <Image src={'/svgs/used.svg'} alt='stare' width={20} height={20} />
                    </div>

                    <div className=" text-sm lg:text-lg font-bold py-2 lg:py-4 px-2 md:px-5 border-y border-my_light uppercase flex flex-nowrap items-center justify-between">
                        <span>add Category</span>
                        <Image src={'/svgs/add.svg'} alt='stare' width={20} height={20} />
                    </div>
                    <h2 className='text-lg sm:text-2xl self-center my-4'>Category</h2>

                    {
                        catetory.map((item, index) => (
                            <li key={index} className={` text-sm lg:text-lg font-bold py-2 lg:py-4 pl-5 border-b border-my_light ${index == 0 ? ' border-t' : ''}`}>{item}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="viewer h-full w-full flex flex-col items-center justify-start gap-10 p-5 overflow-y-scroll no_scrollbar relative">
                 <div className={` my_transition  absolute top-0 left-0 p-2 bg-my_red rounded-r-2xl lg:hidden ${view ? "hidden" : 'block'}  `} onClick={handleCatView}>
                    <Image src={'/svgs/left_errow.svg'} alt='arrow-view' width={15} height={15} />
                </div>{/*
                <div className="rounded-xl p-5 shadow-2xl gap-2 flex flex-col">
                    <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px]  relative">
                        <Image src={'/svgs/close.svg'} alt='close' width={30} height={30} className='cursor-pointer relative z-10' />
                        <Image src={'/svgs/T-shit.svg'} alt='imge' fill className='object-contain' />
                    </div>
                    <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px] relative">
                        <Image src={'/svgs/close.svg'} alt='close' width={30} height={30} className='cursor-pointer relative z-10' />
                        <Image src={'/svgs/Pants.svg'} alt='imge' fill className='object-contain' />
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-center">
                    <button className='text-xl bg-my_dark px-4 sm:px-10 py-2 text-my_light rounded-lg'>use it</button>
                    <button className='text-xl bg-my_dark px-4 sm:px-10 py-2 text-my_light rounded-lg'>clear</button>
                </div> */}
            </div>
            {/* {
                items.length > 0 ?
                    <div className="w-[250px] h-full relative flex flex-col  bg-my_red z-40 rounded-tl-3xl p-5">
                        <Image src={'/svgs/close-white.svg'} alt='close' width={30} height={30} className='cursor-pointer z-30  absolute left-4 lg:hidden' onClick={handleCatView} />
                        <div className="add mt-10 sm:mt-5 border-2 border-my_light rounded-lg flex items-center justify-center w-fit self-center p-2 cursor-pointer ">
                            <Image src={'/svgs/add.svg'} alt='add' width={40} height={40} className='' />
                        </div>
                        <ul className='h-full w-full mt-10 grid grid-cols-1 gap-y-5  overflow-scroll no_scrollbar py-10 sm:py-0'>
                            {
                                items.map((item) => (
                                    <li className='bg-my_light h-[150px] w-[150px] flex items-center justify-center rounded-xl'>{item}</li>
                                ))
                            }

                        </ul>
                    </div>
                    : ''
            } */}
        </div>
    )
}

export default page