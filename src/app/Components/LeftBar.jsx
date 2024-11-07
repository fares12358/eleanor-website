'useClient'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';
import { getCategories, getItemByCat } from '../db/main';
import LoadingSpinner from './LoadingSpinner';

const LeftBar = () => {
    const { isLoged, userId, setViewUpCat, setItems, setItemLoader, REF, setREF, viewUplImg, viewUpCat, Resfetch, ViewLeft, setViewLeft, setViewRht, ViewDetailesBar, setViewDetailesBar, ViewUsedBar, setViewUsedBar,setSelectedItem,dataText ,Lang } = useContext(UserContext);
    const [Categories, setCategories] = useState([]);
    const [Loader, setLoader] = useState(false);

    const HandleAddCat = () => {
        if (isLoged && userId) setViewUpCat(true);
    }

    const HandleGetCategories = async () => {
        if (!userId) return; // Ensure userId is present

        try {
            setLoader(true); // Start loading state
            const response = await getCategories(userId); // Fetch categories from the API
            if (response.success) {
                setCategories(response.cat); // Use the correct property from the response
            } else {
                console.error("Error fetching categories:", response.message); // Log any error message received from the server
            }
        } catch (error) {
            console.error("Error fetching categories:", error); // Log the error for debugging
        } finally {
            setLoader(false); // End loading state
        }
    };
    useEffect(() => {
        HandleGetCategories();
    }, [userId, viewUpCat]);

    const fetchItemsByCategore = async (refOfCat) => {
        try {
            setViewDetailesBar(false);
            setViewUsedBar(false);
            setItemLoader(true);
            setViewRht(true);
            setViewLeft(false);
            const response = await getItemByCat(userId, refOfCat);
            if (response.success) {
                setREF(refOfCat);
                setItems(response.items);
            }
        } catch (error) {
        } finally {
            setItemLoader(false);
        }
    };

    useEffect(() => {
        if (REF !== null)
            fetchItemsByCategore(REF);
    }, [viewUplImg, Resfetch])

    const HandleViewUsedBer = () => {
        setViewLeft(false);
        setViewUsedBar(true);
        setViewDetailesBar(false);
        setSelectedItem(null);
    };
    const HandleViewDetailsBar = () => {
        setViewLeft(false);
        setViewDetailesBar(true);
        setViewUsedBar(false);
        setSelectedItem(null);

    };


    

  if (!dataText) {
    return <div >
      <LoadingSpinner />
    </div>;
  }


    return (
        <div
            className={` py-5 z-30 lg:static my_transition absolute  ${ViewLeft ? 'left-0' : '-left-full'}  top-80px  w-[150px] sm:w-[200px] lg:w-[250px] bg-my_red text-my_light h-full flex flex-col items-start justify-start font-bold pt-5 rounded-tr-3xl shadow-2xl  p-2`}>
            <Image
                src='/svgs/close-white.svg'
                alt='close'
                width={25}
                height={25}
                className='cursor-pointer z-30 absolute right-3 top-3 lg:hidden'
                onClick={() => setViewLeft(false)}
                dir={ Lang === 'en'? 'ltr' :'rtl'}
            />

            <h2 className='text-lg sm:text-2xl self-center my-4 lg:mt-0 mt-8'>{dataText.Category}</h2>

            <div className="w-full cursor-pointer flex items-center justify-center gap-2  text-my_red bg-my_light uppercase px-3 py-2 my-4" onClick={HandleAddCat}>
                <Image src='/svgs/add.svg' alt='add' width={15} height={15} />
                <span className='text-[10px]'>{dataText.AddCategory}</span>
            </div>

            <div className="w-full text-xs  font-bold text-my_red bg-my_light cursor-pointer py-2 px-2 md:px-5 uppercase flex items-center justify-start gap-2" onClick={HandleViewDetailsBar}>
                <Image src='/svgs/details.svg' alt='stare' width={15} height={15} />
                <span>{dataText.Details}</span>
            </div>


            <div className="w-full text-xs  font-bold text-my_red bg-my_light cursor-pointer py-2 px-2 md:px-5  uppercase flex items-center justify-start gap-2 mt-2" onClick={HandleViewUsedBer}>
                <Image src='/svgs/used.svg' alt='used' width={15} height={15} />
                <span>{dataText.Used}</span>
            </div>

            <ul className='flex flex-col gap-2 h-full w-full overflow-auto no_scrollbar list-none cursor-pointer py-5 my-5 border-y border-my_light'>
                {Loader ? (
                    <div className="w-full h-[40px] bg-my_light flex items-center justify-center relative">
                        <LoadingSpinner />
                    </div>
                ) : (
                    Array.isArray(Categories) && Categories.length !== 0 ? (
                        Categories.map((item) => (
                            <li
                                key={item.ref}
                                className='text-xs lg:text-md font-bold py-2 pl-5 uppercase text-my_red bg-my_light'
                                onClick={() => fetchItemsByCategore(item.ref)} // Make sure this is an arrow function
                            >
                                {item.name}
                            </li>
                        ))
                    ) : (
                        <li className='text-[10px] sm:text-sm lg:text-md font-bold py-2 text-my_light self-center'>
                            {dataText.NoCat}
                        </li>
                    )
                )}
            </ul>



        </div>

    )
}

export default LeftBar