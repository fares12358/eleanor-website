'use client';
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getData, loginUser, handleCreate, getForgetPass } from '../db/main';

const Des = () => {

    const router = useRouter();
    const [mode, setMode] = useState('sign');
    const { setIsLoged, setUserId } = useContext(UserContext);
    const [pasType, setPasType] = useState('password');
    const [viewPas, setViewPas] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [getpassResult, setGetPassResult] = useState('');
    const [isCreted, setIsCreted] = useState(false);

    const handleViewPas = () => {
        setViewPas(prev => !prev);
        setPasType(prev => prev === 'password' ? 'text' : 'password');
    };
    const validateUsername = (input) => {
        // Regex to allow only letters and no special characters
        const regex = /^[A-Za-z0-9]+$/;

        if (!input) {
            setUserError('Username is required');
            return false;
        }

        // Check if the username contains only letters
        if (!regex.test(input)) {
            setUserError('no special characters');
            return false;
        }

        setUserError('');
        return true;
    };
    const validatePassword = (input) => {
        // Check if the input is empty
        if (!input) {
            setPasswordError('Password is required');
            return false;
        }

        // Check if the password contains at least one uppercase letter
        const hasUppercase = /[A-Z]/.test(input);
        if (!hasUppercase) {
            setPasswordError('at least one uppercase letter');
            return false;
        }

        // Check if the password contains at least one special character (* or &)
        const hasSpecialChar = /[*&^%$#@!]/.test(input);
        if (!hasSpecialChar) {
            setPasswordError('one special character (*&^%$#@!)');
            return false;
        }

        // Check if the password is at least 8 characters long
        if (input.length < 8) {
            setPasswordError('at least 8 characters');
            return false;
        }

        // Clear the error if all validations pass
        setPasswordError('');
        return true;
    };

    const onChangeUser = (e) => {
        setUsername(e.target.value);
        if (mode === 'create') {
            validateUsername(e.target.value);
        }
    }
    const onChangePas = (e) => {
        setPassword(e.target.value);
        if (mode === 'create') {
            validatePassword(e.target.value);
        }
    }
    const handleSign = async (e) => {
        e.preventDefault();
        // Validation checks for both modes
        const validateInputs = () => {
            const isUsernameValid = validateUsername(username);
            const isPasswordValid = validatePassword(password);

            if (!isUsernameValid) {
                return false;
            }

            if (!isPasswordValid) {
                return false;
            }

            return true;
        };
        // Handle user creation 
        const handleCreateAccount = async () => {
            if (validateInputs()) {
                try {
                    const reuslt = await handleCreate(username, password);
                    if (reuslt) {
                        setIsCreted(true);
                        setUsername('');
                        setPassword('');
                        setTimeout(() => {
                            setIsCreted(false);
                        }, 2000); // 3 seconds timeout
                    } else {
                        setIsCreted(false);
                    }
                } catch (error) {
                    console.error('Error creating account:', error);
                    // Handle error (e.g., show an error message to the user)
                }
            }
        };
        // Handle user login
        const handleLogin = async () => {
            if (username === '') {
                setUserError('Username is required');
                return;
            } else if (password === '') {
                setPasswordError('Password is required');
                return;
            }
            try {
                const response = await loginUser(username, password);
                if (response) {
                    console.log(response);
                    setUserId(response.data);
                    setUserError('');
                    setIsLoged(true);
                    router.push('/');
                } else {
                    setUserError(response.message || 'Login failed');
                }
            } catch (error) {

                setUserError('Login failed');
            }
        };
        // Handle forgot password
        const handleForgotPassword = async () => {
            if (username === '') {
                setUserError('Username is required');
            } else {
                try {
                    const response = await getForgetPass(username);
                    console.log(response);
                    setGetPassResult(response);
                    setUsername('');
                } catch (error) {
                    console.error('Error fetching password:', error);
                }
            }
        };
        if (mode === 'sign') {
            handleLogin();
        }
        if (mode === 'get') {
            handleForgotPassword();
        }
        if (mode === 'create') {
            handleCreateAccount();
        }
    };
    return (
        <form action="" className='flex flex-col items-center justify-center gap-5'>
            <h2 className='text-3xl font-bold text-my_red md:mb-5'>Eleanor</h2>
            <p className='text-my_red font-medium'>
                {mode === 'sign' ? '' : mode === 'get' ? 'Get your password' : mode === 'create' ? (isCreted) ? <span className='text-green-600 font-bold'>Your Acount is Created</span> : 'Create your account' : ''}
            </p>
            {
                (mode === 'sign' || mode === 'create') ?
                    <>
                        <div className="flex flex-col  w-fit h-fit text-my_red ">
                            <label htmlFor="username" className='font-bold text-md mb-2 uppercase'>Username</label>
                            <div className="relative h-fit w-fit flex justify-center flex-col">
                                <input type="text" value={username} name='username' onChange={onChangeUser} className='pl-10 pr-10 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                                <Image src={'/svgs/username.svg'} alt='account' width={25} height={25} className='absolute left-2' />
                            </div>
                            <div className="username-state text-red-700 font-bold mt-2 lg:text-lg text-xs">{userError}</div>
                        </div>

                        <div className="flex flex-col w-fit h-fit text-my_red">
                            <label htmlFor="password" className='font-bold text-md mb-2 uppercase'>Password</label>
                            <div className="relative h-fit w-fit flex justify-center flex-col">
                                <input type={pasType} value={password} name='password' onChange={onChangePas} className='pl-10 pr-10 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                                <Image src={'/svgs/password.svg'} alt='account' width={25} height={25} className='absolute left-2' />
                                <Image src={`/svgs/${viewPas ? 'show_pas' : 'hide_pas'}.svg`} onClick={handleViewPas} alt='toggle password visibility' width={25} height={25} className='absolute right-2 cursor-pointer' />
                            </div>
                            <div className="password-state text-red-700 font-bold mt-2 lg:text-lg text-xs">{passwordError}</div>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex flex-col w-fit h-fit text-my_red relative">
                            <label htmlFor="username" className='font-bold text-md mb-2 uppercase'>Username</label>
                            <div className="relative h-fit w-fit flex justify-center flex-col">
                                <input type="text" value={username} name='username' onChange={onChangeUser} className='pl-10 pr-2 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full' />
                                <Image src={'/svgs/username.svg'} alt='account' width={25} height={25} className='absolute left-2' />
                            </div>
                            <div className="username-state text-red-700 font-bold mt-2 lg:text-lg text-xs">{userError}</div>
                        </div>
                        {
                            getpassResult !== ''  ?
                                <div className="text-my_red">your password is <span className='font-medium underline mx-4'>{getpassResult}</span></div> : ""
                        }
                        <div className="text-my_red">Did you got your password? <span className='font-medium underline cursor-pointer' onClick={() => { setMode('sign') }}>Login</span></div>
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

export default Des;
