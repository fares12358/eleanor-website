import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserContext';
import Image from 'next/image';
import { deleteItemNotiction, reusedNotItem } from '../db/main';

const HandleNotification = () => {
    const { isLoged, userId, VeiwHandleNot, setVeiwHandleNot, CatNamForviewNotfi, CatNamItems,reCalNotif, setreCalNotif } = useContext(UserContext);

    const HadleDeletNotItem = async (Catname, item) => {
        try {
            const response = await deleteItemNotiction(userId, Catname, item);
            if (response.success) {
                setreCalNotif(!reCalNotif);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleReUse = async (catName, item) => {
        try {
            const response = await reusedNotItem(userId, catName, item);
            if (response.success) {
                setreCalNotif(!reCalNotif);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      
    }, [reCalNotif])
    
    return (
        <div className={`w-screen h-screen absolute top-0 left-0 glass  z-50 ${VeiwHandleNot ? 'flex' : 'hidden'}  items-center justify-center`}>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 bg-my_dark w-[80%] h-[80%] relative text-my_light p-5 pt-12 overflow-y-auto no_scrollbar gap-4">
                <Image
                    src='/svgs/close-white.svg'
                    alt='close'
                    width={25}
                    height={25}
                    className='cursor-pointer z-30 absolute left-3 top-3 '
                    onClick={() => setVeiwHandleNot(false)}
                />
                <h2 className="text-xl uppercase absolute mt-10 mx-auto w-full text-center">{CatNamForviewNotfi}</h2>
                {
                    CatNamItems !== null ?
                        CatNamItems.map((item) => (
                            <div className="w-[150px] h-[250px]  mx-auto shadow-2xl flex flex-col items-center justify-start gap-4 mt-10">
                                <div className=" h-[80%] w-full">
                                    <img src={item.url} alt="image" className='w-full h-full object-contain' />
                                </div>
                                <div className="flex items-center justify-between gap-5 ">
                                    <div className="relative bg-my_light p-1 rounded-full">
                                        <Image
                                            src='/svgs/delete.svg'
                                            alt='close'
                                            width={20}
                                            height={20}
                                            className='cursor-pointer'
                                            onClick={() => HadleDeletNotItem(CatNamForviewNotfi, item)}
                                        />
                                    </div>
                                    <div className="bg-my_light px-3 y-1 rounded-sm text-my_dark uppercase text-md cursor-pointer" onClick={() => { handleReUse(CatNamForviewNotfi, item) }}> reuse it</div>
                                </div>
                            </div>
                        ))
                        :
                        ''
                }


            </div>
        </div>
    )
}

export default HandleNotification