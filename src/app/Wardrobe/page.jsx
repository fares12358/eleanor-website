'use client';
import Image from 'next/image';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { addToUsed, deleteItem, deleteUsedItems, getCategories, getItemByCat, getUsedItems } from '../db/main';
import { UserContext } from '../Components/UserContext';
import { useSearchParams } from 'next/navigation';
import ImageUpload from '../Components/ImageUpload';
import Link from 'next/link';
import AddCategory from '../Components/AddCategory';
import LoadingSpinner from '../Components/LoadingSpinner';

const Page = () => {
    const { isLoged, userId, viewUplImg, setViewUplImg, viewUpCat, setViewUpCat } = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [KeyCATegory, setKeyCATegory] = useState('');
    const [view, setView] = useState(false);
    const [viewItem, setViewItem] = useState(false);
    const [SelectView, setSelectView] = useState(false);
    const [SelectedURl, setSelectedURl] = useState('');
    const [SelectedTop, setSelectedTop] = useState('');
    const [SelectedBottom, setSelectedBootom] = useState('');
    const [viewUsedItems, setViewUsedItems] = useState(false);
    // loaders
    const [catLoader, setCatLoader] = useState(false)
    const [ItemLoader, setItemLoader] = useState(false)
    // Toggle visibility of the category list
    const toggleCategoryView = () => setView((prev) => !prev);
    // Fetch categories for the user if userId is available
    const fetchCategories = async () => {
        if (!userId) return;

        try {
            setCatLoader(true);
            const response = await getCategories(userId);
            if (response.success) {
                setCategories(response.cat);
            }
        } catch (error) {
        } finally {
            setCatLoader(false);
        }
    };
    // Fetch items for a selected category and toggle item view
    const fetchItemsByCategory = async (catKey) => {
        try {
            setItemLoader(true);
            setViewUsedItems(false)
            setView(false);
            setKeyCATegory(catKey);
            const response = await getItemByCat(userId, catKey);
            if (response.success) {
                setViewItem(true);
                setItems(response.items);
            }
        } catch (error) {
        } finally {
            setItemLoader(false);
        }
    };
    // Show upload item view if a category is selected
    const handleAddItem = () => {
        if (KeyCATegory) setViewUplImg(true);
    };
    // Show upload category view if the user is logged in
    const handleAddCat = () => {
        if (isLoged && userId) setViewUpCat(true);
    };
    // Fetch categories whenever userId or viewUpCat changes
    useEffect(() => {
        fetchCategories();
    }, [userId, viewUpCat]);
    // Fetch items whenever userId or viewUplImg changes
    useEffect(() => {
        if (KeyCATegory) fetchItemsByCategory(KeyCATegory);
    }, [userId, viewUplImg]);
    // Handle selected item URL and display in specified position
    const HandleSelectedItem = (urlItem) => {
        setSelectView(true);
        setSelectedURl(urlItem);
    };
    const handleviewSelctedItems = (place) => {
        if (place === 'top') {
            setSelectedTop(SelectedURl);
        } else {
            setSelectedBootom(SelectedURl);
        }
        setSelectView(false);
    };
    const handleDeleteItem = async (url) => {
        try {
            const response = await deleteItem(userId, KeyCATegory, url);

            if (response.success) {
                fetchItemsByCategory(KeyCATegory);
            }
        } catch (error) {
        }
    };
    const handleAddToUse = async (topUrl, BottomUrl) => {
        try {
            const date = new Date();
            const response = await addToUsed(userId, topUrl, BottomUrl, date);
            if (response.success) {
                fetchItemsByCategory(KeyCATegory);
            } else {
            }
        } catch (error) {
            console.error("Error in handleAddToUse:", error.message);
        }
    };
    const fetchUsedItems = async () => {
        try {
            setItemLoader(true);
            const response = await getUsedItems(userId); // Make sure userId is defined in the context
            if (response.success) {
                setViewUsedItems(true);
                setViewItem(true);
                setView(false);
                setItems(response.data.items); // Assuming `response.data` contains the items
            } else {
            }
        } catch (error) {
        } finally {
            setItemLoader(false);
        }
    };
    const [DateUsed, setDateUsed] = useState('');
    const HandleViewUsed = (topUrl, btmUrl, date) => {
        setSelectedTop(topUrl);
        setSelectedBootom(btmUrl);
        setDateUsed(date);
    }
    const [daysAgo, setDaysAgo] = useState('');
    useEffect(() => {
        // Function to calculate the difference in days
        const calculateDaysAgo = () => {
            const usedDate = new Date(DateUsed); // Convert the stored date to a Date object
            const currentDate = new Date(); // Get the current date
            const timeDifference = currentDate - usedDate; // Calculate time difference in milliseconds
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

            setDaysAgo(daysDifference);
        };

        calculateDaysAgo(); // Call the function to perform the calculation
    }, [DateUsed]);
    const [usedItems, setUsedItems] = useState([]);
    const getIsUsedItemsCheck = async () => {
        try {
            const response = await getUsedItems(userId); // Make sure userId is defined in the context
            if (response.success) {
                setUsedItems(response.data.items); // Assuming `response.data` contains the items
            } else {
            }
        } catch (error) {
        };
    }
    
    const CheckIsUsed = (urlTop, urlBtm) => {
        getIsUsedItemsCheck();
        const item = [urlTop, urlBtm];
        return usedItems.some(subArray => subArray[0] === item[0] && subArray[1] === item[1]);
    }
    const handleDeleteUsedItem = async (urlTop, urlBtm) => {
        try {
            const reponse = await deleteUsedItems(userId, urlTop, urlBtm);
            if (reponse) {
                setSelectedTop('');
                setSelectedBootom('');
                fetchUsedItems();
            }
        } catch (error) {
            console.log(error);

        }
    }

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

                    <div className="w-full text-xs  font-bold text-my_red bg-my_light cursor-pointer py-2 px-2 md:px-5 uppercase flex items-center justify-start gap-2" >
                        <Image src='/svgs/stare.svg' alt='stare' width={15} height={15} />
                        <span>Favorite</span>
                    </div>
                    <div className="w-full text-xs  font-bold text-my_red bg-my_light cursor-pointer py-2 px-2 md:px-5  uppercase flex items-center justify-start gap-2 mt-2" onClick={fetchUsedItems}>
                        <Image src='/svgs/used.svg' alt='used' width={15} height={15} />
                        <span>Used</span>
                    </div>
                    <ul className='flex flex-col gap-2 h-full w-full  overflow-auto no_scrollbar list-none cursor-pointer py-5 my-5 border-y border-my_light'>
                        {catLoader ?
                            <div className=" w-full h-[40px] bg-my_light flex items-center justify-center relative">
                                <LoadingSpinner />
                            </div>
                            :
                            categories.length !== 0 ?
                                categories.map((item, index) => (
                                    <li
                                        key={index}
                                        className='text-xs lg:text-md font-bold py-2 pl-5 uppercase  text-my_red bg-my_light '
                                        onClick={() => fetchItemsByCategory(item)}
                                    >
                                        {item}
                                    </li>
                                ))
                                :
                                <li
                                    className='text-xs lg:text-md font-bold py-2 pl-5 text-my_light'
                                >
                                    No Category Add One
                                </li>

                        }
                    </ul>

                </div>


                <div className=" h-full w-full flex flex-col items-center justify-start gap-10 p-5 overflow-y-scroll  no_scrollbar relative">
                    <div className={`my_transition absolute top-0 left-0 p-2 bg-my_red rounded-r-2xl lg:hidden ${view ? 'hidden' : 'block'}`} onClick={toggleCategoryView}>
                        <Image src='/svgs/left_errow.svg' alt='arrow-view' width={15} height={15} />
                    </div>

                    <div className="rounded-xl p-5 pt-10 md:pt-5 gap-2 flex flex-col items-center justify-center">
                        {SelectedTop !== '' && SelectedBottom !== '' ?
                            <div className="flex flex-col md:flex-row items-center justify-around gap-3 w-full my-5">
                                {
                                    viewUsedItems ?
                                        <div className='flex flex-col md:flex-row gap-2 h-full w-full'>
                                            <div className="flex items-center justify-start md:justify-center gap-2 bg-my_dark rounded-[5px] cursor-pointer w-full h-full py-1 pl-3 md:pl-0">
                                                <Image src={'/svgs/used-white.svg'} alt='add' width={20} height={20} title='add to used' />
                                                <span className='sm:text-md text-xs text-my_light'>used {daysAgo} days ago</span>
                                            </div>
                                            <div className="flex items-center justify-start md:justify-center gap-2 bg-my_dark rounded-[5px] cursor-pointer w-full h-full py-1 pl-3 md:pl-0" onClick={() => { handleDeleteUsedItem(SelectedTop, SelectedBottom) }}>
                                                <Image src={'/svgs/delete-white.svg'} alt='add' width={20} height={20} title='add to used' />
                                                <span className='sm:text-md text-xs text-my_light'>delete</span>
                                            </div>
                                        </div>
                                        :
                                        (CheckIsUsed(SelectedTop, SelectedBottom)) ?
                                            <div className="flex items-center justify-start md:justify-center gap-2 bg-[#741e20] rounded-[5px] cursor-pointer w-full h-full py-1 pl-3 md:pl-0">
                                                <Image src={'/svgs/used-white.svg'} alt='add' width={20} height={20} title='add to used' />
                                                <span className='text-xs text-my_light'>used item</span>
                                            </div>
                                            :
                                            <div className="flex items-center justify-start md:justify-center gap-2 bg-my_dark rounded-[5px] cursor-pointer w-full h-full py-1 pl-3 md:pl-0" onClick={() => { handleAddToUse(SelectedTop, SelectedBottom) }}>
                                                <Image src={'/svgs/add-used-white.svg'} alt='add' width={20} height={20} title='add to used' />
                                                <span className='text-xs text-my_light'>use it</span>
                                            </div>
                                }
                                {
                                    viewUsedItems ? '' :
                                        <div className="flex items-center justify-start md:justify-center gap-2 bg-my_dark rounded-[5px] cursor-pointer w-full h-full py-1 pl-3 md:pl-0">
                                            <Image src={'/svgs/isFav.svg'} alt='add' width={20} height={20} title='add to favourite' />
                                            <span className='text-xs  text-my_light'>add favourite</span>
                                        </div>
                                }
                            </div>
                            :
                            ''
                        }
                        <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px] relative flex flex-col  items-center justify-center shadow-xl">
                            {
                                SelectedTop === '' ?
                                    <Image src={'/svgs/T-shit.svg'} alt='image' width={200} height={200} className='object-contain ' />
                                    :
                                    <>
                                        {
                                            viewUsedItems ?
                                                ''
                                                :
                                                <div className="list flex flex-col items-center justify-start gap-2 absolute top-0 left-0  z-20">
                                                    <Image src='/svgs/close.svg' alt='close' width={25} height={25} className='cursor-pointer z-20 ' onClick={() => { setSelectedTop('') }} />
                                                    <Image src='/svgs/delete.svg' alt='close' width={25} height={25} className='cursor-pointer z-20 ' onClick={() => { handleDeleteItem(SelectedTop); setSelectedTop('') }} />
                                                </div>
                                        }


                                        <Suspense fallback={<LoadingSpinner />}>
                                            <Image src={SelectedTop} alt='image' fill className='object-contain' />
                                        </Suspense>
                                    </>
                            }
                            {
                                SelectView ?
                                    <div className="text-my_red text-sm font-bold bg-my_light py-1 px-2 absolute rounded-sm cursor-pointer" onClick={() => handleviewSelctedItems('top')}>view here</div>
                                    :
                                    ""
                            }
                        </div>
                        <div className="md:w-[300px] w-[200px] h-[200px] md:h-[300px] relative flex flex-col  items-center justify-center shadow-xl ">
                            {
                                SelectedBottom === '' ?
                                    <Image src={'/svgs/pants2.svg'} alt='image' width={250} height={250} className='object-contain ' />
                                    :
                                    <>
                                        {
                                            viewUsedItems ?
                                                ''
                                                :
                                                <div className="list flex flex-col items-center justify-start gap-2 absolute top-0 left-0  z-20">
                                                    <Image src='/svgs/close.svg' alt='close' width={25} height={25} className='cursor-pointer z-10' onClick={() => { setSelectedBootom('') }} />
                                                    <Image src='/svgs/delete.svg' alt='close' width={25} height={25} className='cursor-pointer z-20' onClick={() => { handleDeleteItem(SelectedBottom); setSelectedBootom('') }} />
                                                </div>
                                        }


                                        <Suspense fallback={<LoadingSpinner />}>
                                            <Image src={SelectedBottom} alt='image' fill className='object-contain ' />
                                        </Suspense>
                                    </>
                            }
                            {
                                SelectView ?
                                    <div className="text-my_red text-sm font-bold bg-my_light py-1 px-2 absolute rounded-sm cursor-pointer" onClick={() => handleviewSelctedItems('bottom')}>view here</div>
                                    :
                                    ""
                            }
                        </div>
                    </div>


                </div>



                <div
                    className={`transform ${viewItem ? 'translate-x-0' : 'translate-x-full'}  my_transition w-[100px] sm:w-[200px] lg:w-[250px] h-full absolute md:static top-80px right-0 flex flex-col bg-my_red z-40 rounded-tl-3xl md:p-5`}
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
                    {
                        viewUsedItems ?
                            ''
                            :
                            <div
                                className="py-2 cursor-pointer flex items-center justify-center gap-2 text-my_red bg-my_light uppercase mx-2 "
                                onClick={handleAddItem}
                            >
                                <Image src='/svgs/add.svg' alt='Add item' width={15} height={15} />
                                <span className='text-[10px]'>Add Items</span>
                            </div>
                    }



                    <div className='flex flex-col gap-2 items-start h-full w-full overflow-auto no_scrollbar list-none cursor-pointer py-5 my-5 border-y border-my_light'>
                        {ItemLoader ?
                            <div className=" lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px] mx-auto bg-my_light flex items-center justify-center relative rounded-xl">
                                <LoadingSpinner />
                            </div>
                            :

                            items.length > 0 ? (
                                viewUsedItems ?

                                    items.map((item, index) => (
                                        <div className="flex flex-col items-center justify-center self-center" onClick={() => HandleViewUsed(item[0], item[1], item[2])} >
                                            <span
                                                key={index}
                                                className='relative mx-auto bg-my_light lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px] cursor-pointer rounded-t-xl'
                                            >
                                                <Suspense fallback={<LoadingSpinner />}>
                                                    <img
                                                        src={item[0]}
                                                        alt={`User Image ${index + 1}`}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </Suspense>
                                            </span>
                                            <span
                                                key={index + 1}
                                                className='relative mx-auto bg-my_light lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px] cursor-pointer rounded-b-xl'
                                            >
                                                <Suspense fallback={<LoadingSpinner />}>
                                                    <img
                                                        src={item[1]}
                                                        alt={`User Image ${index + 1}`}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </Suspense>
                                            </span>
                                        </div>

                                    ))


                                    :

                                    items.map((item, index) => (
                                        <span
                                            key={item.id || index}
                                            className='relative mx-auto bg-my_light lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px] cursor-pointer rounded-xl'
                                        >
                                            <Suspense fallback={<LoadingSpinner />}>
                                                <img
                                                    src={item}
                                                    alt={`User Image ${index + 1}`}
                                                    className="object-contain w-full h-full"
                                                    onClick={() => { HandleSelectedItem(item) }}
                                                />
                                            </Suspense>
                                        </span>
                                    ))

                            ) : (
                                <h2 className='text-md text-my_light m-auto'>No items</h2>
                            )
                        }
                    </div>



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
