import React, { useRef, useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loginUser } from '../utils/api'
import { app_url } from '../config/constants';

export default function Login() {
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();

    // Creating an user
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleEmailCheck(emailRef.current.value)) return

        setLoading(true);
        const response = await loginUser(emailRef.current.value, passwordRef.current.value);
        if (!response?.success) toast.warn(response.message);
        if (response?.success) {
            toast.success(response.message);
            setTimeout(() => {
                navigate('/');
            }, 500);
        }
        setLoading(false);
    }

    const handleEmailCheck = (email) => {
        if (!email.includes(`@${app_url}`)) {
            setError(`Email must have @${app_url}`);
            return true
        } else {
            setError();
            return false
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm"> <ToastContainer />
                <img className='w-27 m-auto' src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Gmail Logo" />
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" ref={emailRef} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-inset focus:ring-indigo-400 outline-none px-2 sm:text-sm sm:leading-6" />
                            {
                                error && <span className='text-red-600 font-semibold text-xs'> {error}  </span>
                            }
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2 relative bg-green-200">
                            <input name="password" ref={passwordRef} type={eye ? 'text' : 'password'} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-inset focus:ring-indigo-400 outline-none px-2 sm:text-sm sm:leading-6" />
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
                    Not a member?
                    <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mx-2">Create an account</Link>
                </p>
            </div>
        </div>
    )
}
