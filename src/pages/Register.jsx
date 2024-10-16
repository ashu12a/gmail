import React, { useEffect, useRef, useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { emailDupliCheck, registerUser } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import { app_url } from '../config/constants';


export default function Register() {
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const debounceTimeoutRef = useRef(null);

    // Creating an user
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await registerUser(nameRef.current.value, `${emailRef.current.value}@${app_url}`, passwordRef.current.value);
        if (!response?.success) toast.warn(response.message);
        if (response?.success) {
            toast.success(response.message);
            setTimeout(() => {
                navigate('/');
            }, 500);
        }
        setLoading(false);
    }

    // live check email exist
    const emailcheck = async (value) => {
        if (value.length < 2) {
            setCheckEmail([]);
            return
        };
        if (/[^a-zA-Z0-9]/.test(value)) {
            setCheckEmail({
                success: false,
                message: 'Email can not contain any speacial character'
            })
            return
        }
        const response = await emailDupliCheck(`${value}@${app_url}`);
        setCheckEmail(response);
    }

    // Implement debouncing feature
    const handleEmailChange = (e) => {
        const value = e.target.value;
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(() => {
            emailcheck(value);
        }, 300); // Adjust the delay as needed (300 ms in this case)
    };

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <ToastContainer />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className='w-27 m-auto' src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Gmail Logo" />
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an email account</h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <div className="mt-2">
                            <input ref={nameRef} name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-inset focus:ring-indigo-400 outline-none px-2 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2 relative">
                            <input ref={emailRef} onChange={handleEmailChange} name="email" type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-inset focus:ring-indigo-400 outline-none px-2 sm:text-sm sm:leading-6" />
                            <span className='bg-gray-100 absolute right-0 top-0 rounded h-full w-28 text-center py-1 ring-1 ring-inset ring-indigo-400'>@{app_url}</span>
                        </div>
                        <div>
                            {
                                checkEmail?.success && <span className='text-green-600 font-semibold text-xs'> {checkEmail?.message}  </span>
                            }
                            {
                                !checkEmail?.success && <span className='text-red-500 font-semibold text-xs'> {checkEmail?.message}  </span>
                            }
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2 relative">
                            <input ref={passwordRef} name="password" type={eye ? 'text' : 'password'} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-inset focus:ring-indigo-400 outline-none px-2 sm:text-sm sm:leading-6" />
                            <p className='absolute right-3 top-[25%] cursor-pointer' onClick={() => setEye(!eye)}>
                                {
                                    eye
                                        ? <IoEye size={'18px'} />
                                        : <IoEyeOff size={'18px'} />
                                }
                            </p>
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {
                                loading
                                    ? 'Loading...'
                                    : 'Sign in'
                            }
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?
                    <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mx-2">Login here</Link>
                </p>
            </div>
        </div>
    )
}
