'use client';
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
const Form = () => {
    const [mode, setMode] = useState('sign');
    const { setIsLoged } = useContext(UserContext);
    const handleSign=(e)=>{
        e.preventDefault()
        setIsLoged(true);
    }
    return (
        <form action="" className='flex flex-col items-center justify-center gap-5'>
            <h2 className='text-3xl font-bold text-black md:mb-5'>Eleanor</h2>
            <p className=''>
                {mode === 'sign' ? '' : mode === 'get' ? 'Get your password' : mode === 'create' ? 'Create your account' : ''}
            </p>
            {
                mode === 'sign' || mode === 'create' ?
                    <>
                        <div className="flex flex-col w-fit h-fit">
                            <label htmlFor="username" className=' font-bold text-md mb-2 uppercase'>username</label>
                            <input type="text" name='username' className='px-5 py-2 font-bold border-2 border-my_dark  focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                        </div>
                        <div className="flex flex-col w-fit h-fit">
                            <label htmlFor="password" className=' font-bold text-md mb-2 uppercase'>password</label>
                            <input type="password" name='password' className='px-5 py-2 font-bold border-2 border-my_dark  focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                        </div>
                    </>

                    :
                    <>
                        <div className="flex flex-col w-fit h-fit">
                            <label htmlFor="username" className=' font-bold text-md mb-2 uppercase'>username</label>
                            <input type="text" name='username' className='px-5 py-2 font-bold border-2 border-my_dark  focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                        </div>
                    </>
            }
            {
                mode === 'sign' ?
                    <p className='cursor-pointer underline font-medium' onClick={() => setMode('get')}>Forget password ?</p>
                    :
                    ''
            }
            <button className='bg-my_dark text-white px-7 py-3 font-bold text-md rounded-md ' onClick={handleSign}>

                {mode === 'sign' ? 'sign in to account' : mode === 'get' ? 'get account' : 'create account'}
            </button>
            {
                mode === 'sign' ?
                    <span className=' flex gap-3'>Don't have an account ?<p className='underline font-bold cursor-pointer' onClick={() => setMode('create')}>create one</p> </span>
                    :
                    mode === 'create' ?
                        <span className=' flex gap-3'>Already have an account ?<p className='underline font-bold cursor-pointer' onClick={() => setMode('sign')}>sign in</p> </span> : ''

            }
        </form>
    );
};

export default Form;
