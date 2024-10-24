import React from 'react'

const ReqLoader = () => {
    return (
        <div className='h-screen w-screen z-50 absolute top-0 left-0 flex items-center justify-center bg-white glass '>
            <div className="bg-my_dark lg:w-[250px] lg:h-[100px] w-[150px] h-[60px] lg:rounded-2xl rounded-lg shadow-2xl">
                <section className="flex items-center justify-center h-full w-full">
                    <div className="dot animation-delay-0 lg:w-[20px] w-[10px] h-[10px] lg:h-[20px]"></div>
                    <div className="dot animation-delay-100 lg:w-[20px] w-[10px] h-[10px] lg:h-[20px]"></div>
                    <div className="dot animation-delay-200 lg:w-[20px] w-[10px] h-[10px] lg:h-[20px]"></div>
                    <div className="dot animation-delay-300 lg:w-[20px] w-[10px] h-[10px] lg:h-[20px]"></div>
                    <div className="dot animation-delay-400 lg:w-[20px] w-[10px] h-[10px] lg:h-[20px]"></div>
                </section>

            </div>
        </div>
    )
}

export default ReqLoader