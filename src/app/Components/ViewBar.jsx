import Image from 'next/image'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner';
import { UserContext } from './UserContext';
import { addToUsed, deleteItem } from '../db/main';

const ViewBar = () => {
    // SelectedBottom, setSelectedBottom, SelectedTop, setSelectedTop,
    const { userId, selectedItem, viewBoth, setviewBoth, setREF, Resfetch, setResfetch ,ViewLeft, setViewLeft} = useContext(UserContext);
    const [SelectedTop, setSelectedTop] = useState(null);
    const [SelectedBottom, setSelectedBottom] = useState(null);
    const [SelcetedBoth, setSelcetedBoth] = useState(null);
    const [ItISUsed, setItISUsed] = useState(false);
    const viewItems = (data) => {
        if (data.type === 'top') {
            setSelectedTop(data)
        } else if (data.type === 'bottom') {
            setSelectedBottom(data)
        }
        else if (data.type === 'both') {
            setSelcetedBoth(data);
        }
    }
    useEffect(() => {
        if (selectedItem !== null) {
            viewItems(selectedItem);
        }
    }, [selectedItem]);

    const HandleDeleteItem = async (item) => {
        try {
            const response = await deleteItem(userId, item.itemIndex, item.catIndex);

            if (response.success) {
                if (selectedItem.type === 'top') {
                    setSelectedTop(null);
                } else if (selectedItem.type === 'bottom') {
                    setSelectedBottom(null);
                } else if (selectedItem.type === 'both') {
                    setSelcetedBoth(null);
                }
                setResfetch((prev) => !prev);
            }
        } catch (error) {
        };
    }

    const HandleUseItems = async () => {
        try {
            if (viewBoth) {
                const mode = true;
                const response = await addToUsed(userId, SelcetedBoth, mode);
                if (response.success) {
                }
            } else {
                const mode = false;
                const items = [SelectedTop, SelectedBottom];
                const response = await addToUsed(userId, items, mode);
                if (response.success) {
                    setItISUsed(true);
                    setResfetch((prev) => !prev);
                    setTimeout(() => {
                        setSelcetedBoth(null)
                        setSelectedTop(null)
                        setSelectedBottom(null)
                    }, 1500);
                }
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        setItISUsed(false);
    }, [SelectedTop, SelectedBottom, SelcetedBoth])

    return (
        <div className='h-full w-full overflow-hidden no_scrollbar flex items-center justify-center relative'>
            <div className={`my_transition absolute top-0 left-0 p-2 bg-my_red rounded-r-2xl lg:hidden`} onClick={()=>setViewLeft(true)}>
                <Image src='/svgs/left_errow.svg' alt='arrow-view' width={15} height={15} />
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
                {(SelectedTop !== null && SelectedBottom !== null) || SelcetedBoth !== null ?
                    <div className="flex flex-col md:flex-row items-center justify-around gap-3 w-full my-5">
                        {
                            ItISUsed ?
                                <div className="flex items-center justify-start md:justify-center gap-2 bg-[#741e20] rounded-[5px] cursor-pointer w-full h-full py-1 pl-3 md:pl-0 opacity-0 translate-y-3 anim-view"
                                    style={{ animationDelay: "0.1s" }}>
                                    <Image src={'/svgs/used-white.svg'} alt='add' width={20} height={20} title='add to used' />
                                    <span className='text-xs text-my_light'>added to used item</span>
                                </div>
                                :
                                <div className="flex items-center justify-start md:justify-center gap-2 bg-my_dark rounded-[5px] cursor-pointer w-full h-full py-1 pl-3 md:pl-0" onClick={HandleUseItems}>
                                    <Image src={'/svgs/add-used-white.svg'} alt='add' width={20} height={20} title='add to used' />
                                    <span className='text-xs text-my_light'>use it</span>
                                </div>
                        }
                    </div>
                    :
                    ''
                }
                {
                    viewBoth ?

                        <div className="md:w-[300px] w-[200px] h-[400px] md:h-[600px] relative flex flex-col  items-center justify-center shadow-xl">
                            {
                                SelcetedBoth === null ?
                                    <Image src={'/svgs/dress.svg'} alt='image' width={200} height={200} className='object-contain ' />
                                    :
                                    <>
                                        <div className="list flex flex-col items-center justify-start gap-2 absolute top-0 left-0  z-20">
                                            <Image src='/svgs/close.svg' alt='close' width={25} height={25} className='cursor-pointer z-20 ' onClick={() => { setSelcetedBoth(null) }} />
                                            <Image src='/svgs/delete.svg' alt='close' width={25} height={25} className='cursor-pointer z-20 ' onClick={() => { HandleDeleteItem(SelcetedBoth) }} />
                                        </div>

                                        <Suspense fallback={<LoadingSpinner />}>
                                            <Image src={SelcetedBoth.url} alt='image' fill className='object-contain' />
                                        </Suspense>
                                    </>
                            }
                        </div>
                        :
                        <>
                            <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px] relative flex flex-col  items-center justify-center shadow-xl">
                                {
                                    SelectedTop === null ?
                                        <Image src={'/svgs/T-shit.svg'} alt='image' width={200} height={200} className='object-contain ' />
                                        :
                                        <>
                                            <div className="list flex flex-col items-center justify-start gap-2 absolute top-0 left-0  z-20">
                                                <Image src='/svgs/close.svg' alt='close' width={25} height={25} className='cursor-pointer z-20 ' onClick={() => { setSelectedTop(null) }} />
                                                <Image src='/svgs/delete.svg' alt='close' width={25} height={25} className='cursor-pointer z-20 ' onClick={() => { HandleDeleteItem(SelectedTop) }} />
                                            </div>

                                            <Suspense fallback={<LoadingSpinner />}>
                                                <Image src={SelectedTop.url} alt='image' fill className='object-contain' />
                                            </Suspense>
                                        </>
                                }
                            </div>
                            <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px] relative flex flex-col  items-center justify-center shadow-xl ">
                                {
                                    SelectedBottom === null ?
                                        <Image src={'/svgs/pants2.svg'} alt='image' width={250} height={250} className='object-contain ' />
                                        :
                                        <>
                                            <div className="list flex flex-col items-center justify-start gap-2 absolute top-0 left-0  z-20">
                                                <Image src='/svgs/close.svg' alt='close' width={25} height={25} className='cursor-pointer z-10' onClick={() => { setSelectedBottom(null) }} />
                                                <Image src='/svgs/delete.svg' alt='close' width={25} height={25} className='cursor-pointer z-20' onClick={() => { HandleDeleteItem(SelectedBottom) }} />
                                            </div>
                                            <Suspense fallback={<LoadingSpinner />}>
                                                <Image src={SelectedBottom.url} alt='image' fill className='object-contain ' />
                                            </Suspense>
                                        </>
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default ViewBar