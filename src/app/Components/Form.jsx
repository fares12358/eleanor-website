'use client';
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Form = () => {
    const router = useRouter();
    const [mode, setMode] = useState('sign');
    const { setIsLoged } = useContext(UserContext);
    const [pasType, setPasType] = useState('password');
    const [viewPas, setViewPas] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleViewPas = () => {
        setViewPas(prev => !prev);
        setPasType(prev => prev === 'password' ? 'text' : 'password');
    };

    const validateUsername = (input) => {
        const regex = /^[A-Za-z]+$/;
        if (!input) {
            setUserError('Username is required');
            return false;
        }
        if (!regex.test(input)) {
            setUserError('Only letters are allowed');
            return false;
        }
        setUserError('');
        return true;
    };

    const validatePassword = (input) => {
        if (!input) {
            setPasswordError('Password is required');
            return false;
        }
        if (input.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSign = (e) => {
        e.preventDefault();
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);

        if (isUsernameValid && isPasswordValid) {
            // call api
            setUsername('');
            setPassword('');
            setIsLoged(true);
            router.push('/');
        }
    };

    return (
        <form action="" className='flex flex-col items-center justify-center gap-5'>
            <h2 className='text-3xl font-bold text-my_red md:mb-5'>Eleanor</h2>
            <p className=''>
                {mode === 'sign' ? '' : mode === 'get' ? 'Get your password' : mode === 'create' ? 'Create your account' : ''}
            </p>
            {
                (mode === 'sign' || mode === 'create') ?
                    <>
                        <div className="flex flex-col w-fit h-fit text-my_red ">
                            <label htmlFor="username" className='font-bold text-md mb-2 uppercase'>Username</label>
                            <div className="relative h-fit w-fit flex justify-center flex-col">
                                <input type="text" value={username} name='username' onChange={(e) => { setUsername(e.target.value); validateUsername(e.target.value); }} className='pl-10 pr-10 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                                <Image src={'/svgs/username.svg'} alt='account' width={25} height={25} className='absolute left-2' />
                            </div>
                            <div className="username-state text-red-700 font-bold mt-2">{userError}</div>
                        </div>

                        <div className="flex flex-col w-fit h-fit text-my_red">
                            <label htmlFor="password" className='font-bold text-md mb-2 uppercase'>Password</label>
                            <div className="relative h-fit w-fit flex justify-center flex-col">
                                <input type={pasType} value={password} name='password' onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }} className='pl-10 pr-10 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                                <Image src={'/svgs/password.svg'} alt='account' width={25} height={25} className='absolute left-2' />
                                <Image src={`/svgs/${viewPas ? 'show_pas' : 'hide_pas'}.svg`} onClick={handleViewPas} alt='toggle password visibility' width={25} height={25} className='absolute right-2 cursor-pointer' />
                            </div>
                            <div className="password-state text-red-700 font-bold mt-2">{passwordError}</div>
                        </div>
                    </>
                    :
                    <>
                    <div className="flex flex-col w-fit h-fit text-my_red relative">
                        <label htmlFor="username" className='font-bold text-md mb-2 uppercase'>Username</label>
                        <div className="relative h-fit w-fit flex justify-center flex-col">
                            <input type="text" value={username} name='username' onChange={(e) => { setUsername(e.target.value); validateUsername(e.target.value); }} className='pl-10 pr-2 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                            <Image src={'/svgs/username.svg'} alt='account' width={25} height={25} className='absolute left-2' />
                        </div>
                        <div className="username-state text-red-700 font-bold mt-2">{userError}</div>
                    </div>
                    <div className="text-my_red">Did you got your password? <span className='font-medium underline cursor-pointer' onClick={()=>{setMode('sign')}}>Login</span></div>
                    </>
            }
            {
                mode === 'sign' &&
                <p className='cursor-pointer underline font-medium text-my_red' onClick={() => setMode('get')}>Forget password?</p>
            }
            <button className='bg-my_dark text-white px-7 py-3 font-bold text-md rounded-md ' onClick={handleSign}>
                {mode === 'sign' ? 'Sign in to account' : mode === 'get' ? 'Get account' : 'Create account'}
            </button>
            {
                mode === 'sign' ?
                    <span className='text-my_red flex gap-3'>Don't have an account? <p className='underline font-bold cursor-pointer' onClick={() => setMode('create')}>Create one</p></span>
                    :
                    mode === 'create' &&
                    <span className='text-my_red flex gap-3'>Already have an account? <p className='underline font-bold cursor-pointer' onClick={() => setMode('sign')}>Sign in</p></span>
            }
        </form>
    );
};

export default Form;
