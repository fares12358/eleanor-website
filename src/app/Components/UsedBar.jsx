import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';
import { getUsedItems, ReUsedItems } from '../db/main';
import LoadingSpinner from './LoadingSpinner';
import Image from 'next/image';
const UsedBar = () => {
  const { isLoged, userId, setViewLeft } = useContext(UserContext);
  const [UsedItem, setUsedItem] = useState(null);
  const [Loader, setLoader] = useState(false);
  const [ReuseLoader, setReuseLoader] = useState(false)
  const FetchUsedItem = async () => {
    try {
      setLoader(true);
      const response = await getUsedItems(userId);
      if (response.success) {
        console.log(response.data.items);
        setUsedItem(response.data.items)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    if (isLoged && userId !== null) {
      FetchUsedItem();
    }
  }, [])

  const handleReuseItem = async (item, index) => {
    try {
      setReuseLoader(true);
      const response = await ReUsedItems(userId, item, index);
      if (response.success) {
        console.log(response);
        FetchUsedItem();

      }
    } catch (error) {
      console.log(error);
    } finally {
      setReuseLoader(false);
    }
  }

  return (
    ReuseLoader ?
      <div className="w-full h-full bg-my_light relative flex items-center justify-center">
        <LoadingSpinner />
      </div>
      :
      <div className=' w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-5 overflow-y-auto items-start justify-center'>
        <div className={`my_transition absolute top-0 left-0 p-2 bg-my_red rounded-r-2xl lg:hidden mt-5`} onClick={() => setViewLeft(true)}>
          <Image src='/svgs/left_errow.svg' alt='arrow-view' width={15} height={15} />
        </div>
        {Loader ?
          <div className="shadow-2xl  rounded-md h-[400px] w-[250px] mx-auto flex flex-col justify-center items-center p-3 gap-2 bg-my_dark animate-pulse ">
          </div>
          :
          UsedItem !== null && UsedItem.length !== 0 ?
            UsedItem.map((item, index) => (
              <div className="shadow-2xl rounded-md h-[400px] w-[250px] mx-auto flex flex-col justify-center items-center p-3 gap-2">
                <div className=" w-full h-[80%] relative">
                  <img src={item.item.url} alt="image not found" className='object-contain h-full w-full' />
                </div>
                <div className="bg-my_dark text-my_light sm:text-md text-sm py-2 rounded-md flex items-center justify-center uppercase w-[80%] cursor-pointer"
                  onClick={() => handleReuseItem(item, index)}>re use this item
                </div>
              </div>
            )) :
            <h2 className=" text-my_dark font-bold text-xl mx-auto">No Items To View</h2>
        }
      </div>

  )
}

export default UsedBar