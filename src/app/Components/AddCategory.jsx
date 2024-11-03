'use client';
import React, { useContext, useState } from 'react'
import { UserContext } from './UserContext';
import Image from 'next/image';
import { addCategory } from '../db/main';
import LoadingSpinner from './LoadingSpinner';

const AddCategory = () => {
    const { userId, viewUpCat, setViewUpCat } = useContext(UserContext);
    const [catNamIN, setCatNamIN] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [Error, setError] = useState('')
    const [Loader, setLoader] = useState(false)
    const handleChange = (e) => {
        setCatNamIN(e.target.value);
    }
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleAddCategory = async () => {
        try {
            setLoader(true)
            const response = await addCategory(userId, catNamIN,selectedOption);
            if (response.success) {
                setError('Category added successfully!'); // Display success message
                // Optionally, clear the input field or update state
                setCatNamIN('');
                setSelectedOption('');
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('Error adding category');
        } finally {
            setLoader(false);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!catNamIN) {
            setError('Category name is required');
        }  else if (!selectedOption) {
            setError('Please select an option');
        } else {
            handleAddCategory();
        }
    };

    return (
        <div className={`${viewUpCat ? 'flex' : 'hidden'} w-full h-full absolute top-0 left-0 items-center justify-center glass z-50`}>
            <div className=" bg-my_dark w-fit max-w-[90%] p-5 rounded-xl flex flex-col items-center justify-center gap-4 text-my_light relative">
                <Image src={'/svgs/close-white.svg'} alt='close' width={25} height={25} className='cursor-pointer z-30  absolute right-3 top-3 ' onClick={() => setViewUpCat(false)} />
                <div className="flex  flex-col items-start justify-center gap-2 mt-5">
                    <label htmlFor="catName" className='font-bold'>your category name</label>
                    <input onChange={handleChange} value={catNamIN} type="text" name='catName' className='bg-transparent border-2 border-my_light px-2 py-1 focus:outline-none outline-none  rounded-md ' />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="font-bold">Select an option</label>
                    <div className="flex gap-4">
                        <label>
                            <input type="radio" value="top" checked={selectedOption === 'top'} onChange={handleOptionChange} />
                            Top
                        </label>
                        <label>
                            <input type="radio" value="bottom" checked={selectedOption === 'bottom'} onChange={handleOptionChange} />
                            Bottom
                        </label>
                        <label>
                            <input type="radio" value="both" checked={selectedOption === 'both'} onChange={handleOptionChange} />
                            Both
                        </label>
                    </div>
                </div>
                {
                    Loader ?
                        <div className="bg-my_light relative h-[40px] w-[100px] rounded-md ">
                            <LoadingSpinner />
                        </div>
                        :
                        <>
                            {Error}
                            <button onClick={handleSubmit} className="bg-my_light w-fit text-my_dark font-bold px-8 py-1 rounded-md uppercase">add</button>
                        </>
                }
            </div>
        </div>
    )
}

export default AddCategory