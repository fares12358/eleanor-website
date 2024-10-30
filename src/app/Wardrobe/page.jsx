'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { getCategories, getItemByCat } from '../db/main';
import { UserContext } from '../Components/UserContext';
import { useSearchParams } from 'next/navigation';
import ImageUpload from '../Components/ImageUpload';
import Link from 'next/link';
import AddCategory from '../Components/AddCategory';

const Page = () => {
    const { isLoged, userId, viewUplImg, setViewUplImg, viewUpCat, setViewUpCat } = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [KeyCATegory, setKeyCATegory] = useState('')
    const [view, setView] = useState(false);
    const [viewItem, setViewItem] = useState(false);
    const api = process.env.NEXT_PUBLIC_API_KEY; //back end api
    const toggleCategoryView = () => setView((prev) => !prev);

    const fetchCategories = async () => {
        if (userId) {
            try {
                const response = await getCategories(userId);
                if (response.success) {
                    setCategories(response.cat);
                } else {
                    console.error('Failed to fetch categories:', response.message);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
    };

    const fetchItemsByCategory = async (catKey) => {
        try {
            setView(false); ////////////////////////////////
            setViewItem(true);
            setKeyCATegory(catKey);
            const response = await getItemByCat(userId, catKey);
            
            if (response.success) {
                setItems(response.items);
            } else {
                console.error('Failed to fetch items:', response.message);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    const handleAddItem = async () => {
        if (KeyCATegory !== '') {
            setViewUplImg(true);
        }
    }
    const handleAddCat = async () => {
        if (isLoged && userId !== '') {
            setViewUpCat(true);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, [userId, viewUpCat]);


    return (
        !isLoged ?
            <div className="h-[calc(100vh-80px)]  w-full flex items-center justify-center">
                <Link href={'/Log'} className='bg-my_dark text-my_light rounded-md p-5 uppercase font-bold'>login to start</Link>
            </div>
            :
            <div className='w-full h-[calc(100vh-80px)] relative font-Frank flex pt-4 overflow-hidden'>
                <div className={`sidebar py-5 z-30 lg:static my_transition absolute top-80px ${view ? 'left-0' : '-left-full'} w-[150px] sm:w-[200px] lg:w-[250px] bg-my_red text-my_light h-full flex flex-col items-start justify-start font-bold pt-5 rounded-tr-3xl shadow-2xl  p-2`}>
                    <Image
                        src='/svgs/close-white.svg'
                        alt='close'
                        width={25}
                        height={25}
                        className='cursor-pointer z-30 absolute right-3 top-3 lg:hidden'
                        onClick={toggleCategoryView}
                    />
                    <h2 className='text-lg sm:text-2xl self-center my-4 lg:mt-0 mt-8'>Category</h2>
                    <div className="w-full cursor-pointer flex items-center justify-center gap-2  text-my_red bg-my_light uppercase px-3 py-2 my-4" onClick={handleAddCat}>
                        <Image src='/svgs/add.svg' alt='add' width={15} height={15} />
                        <span className='text-[10px]'>Add Category</span>
                    </div>

                    <div className="w-full text-xs  font-bold text-my_red bg-my_light cursor-pointer py-2 px-2 md:px-5 uppercase flex items-center justify-start gap-2">
                        <Image src='/svgs/stare.svg' alt='stare' width={15} height={15} />
                        <span>Favorite</span>
                    </div>
                    <div className="w-full text-xs  font-bold text-my_red bg-my_light cursor-pointer py-2 px-2 md:px-5  uppercase flex items-center justify-start gap-2 mt-2">
                        <Image src='/svgs/used.svg' alt='used' width={15} height={15} />
                        <span>Used</span>
                    </div>
                    <ul className='flex flex-col gap-2 h-full w-full  overflow-auto no_scrollbar list-none cursor-pointer py-5 my-5 border-y border-my_light'>
                        {categories.map((item, index) => (
                            <li
                                key={index}
                                className='text-xs lg:text-md font-bold py-2 pl-5 uppercase  text-my_red bg-my_light '
                                onClick={() => fetchItemsByCategory(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>

                </div>

                <div className=" h-full w-full flex flex-col items-center justify-start gap-10 p-5 overflow-y-scroll no_scrollbar relative">
                    <div className={`my_transition absolute top-0 left-0 p-2 bg-my_red rounded-r-2xl lg:hidden ${view ? 'hidden' : 'block'}`} onClick={toggleCategoryView}>
                        <Image src='/svgs/left_errow.svg' alt='arrow-view' width={15} height={15} />
                    </div>

                    <div className="rounded-xl p-5 pt-10 md:pt-5 gap-2 flex flex-col">
                        <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px] relative">
                            <Image src='/svgs/close.svg' alt='close' width={30} height={30} className='cursor-pointer relative z-10' />
                            <Image src={'/svgs/T-shit.svg'} alt='image' fill className='object-contain' />
                        </div>
                        <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px] relative">
                            <Image src='/svgs/close.svg' alt='close' width={30} height={30} className='cursor-pointer relative z-10' />
                            <Image src={'/svgs/pants.svg'} alt='image' fill className='object-contain' />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
                        <button className='text-sm bg-my_dark px-4 sm:px-10 py-2 text-my_light rounded-lg'>Use it</button>
                        <button className='text-sm bg-my_dark px-4 sm:px-10 py-2 text-my_light rounded-lg'>Clear</button>
                    </div>

                </div>
                <div
                    className={`transform ${viewItem ? 'translate-x-0' : 'translate-x-full'} my_transition w-[100px] sm:w-[200px] lg:w-[250px] h-full absolute top-80px right-0 flex flex-col bg-my_red z-40 rounded-tl-3xl md:p-5`}
                >
                    <Image
                        src='/svgs/close-white.svg'
                        alt='close'
                        width={25}
                        height={25}
                        className='cursor-pointer z-30 absolute left-3 top-3'
                        onClick={() => setViewItem(false)}
                    />
                    <h2 className="text-sm lg:text-xl text-my_light text-center py-3 mt-8 sm:mt-0 uppercase font-semibold">Items</h2>

                    <div
                        className="py-2 cursor-pointer flex items-center justify-center gap-2 text-my_red bg-my_light uppercase mx-2 "
                        onClick={handleAddItem}
                    >
                        <Image src='/svgs/add.svg' alt='Add item' width={15} height={15} />
                        <span className='text-[10px]'>Add Items</span>
                    </div>

                    {items.length > 0 ? (
                        <div className='flex flex-col gap-2 items-start h-full w-full overflow-auto no_scrollbar list-none cursor-pointer py-5 my-5 border-y border-my_light'>
                            {items.map((item, index) => (
                                <span
                                    key={item.id || index}
                                    className='relative mx-auto bg-my_light lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px] cursor-pointer rounded-xl'
                                >
                                    <img
                                        src={item}
                                        alt={`User Image ${index + 1}`}
                                        className="object-contain w-full h-full"
                                    />
                                </span>
                            ))}
                        </div>
                    ) : (
                        <h2 className='text-md text-my_light m-auto'>No items</h2>
                    )}


                </div>

                {
                    viewUplImg ?
                        <ImageUpload catKey={KeyCATegory} /> : ''
                }
                {
                    viewUpCat ?
                        <AddCategory />
                        : ''
                }




            </div>
    );
};

export default Page;
