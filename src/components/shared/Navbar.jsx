import React from 'react'
import { useDispatch } from 'react-redux'
import { CiCircleQuestion } from 'react-icons/ci';
import { IoMdSettings } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { logout } from '../../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Mailbox from '../Mailbox';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await logout();
        if (response?.success) toast.success(response.message)
        navigate('/login');
    }

    return (
        <div className='flex items-center justify-between mx-3 h-16'><ToastContainer />
            <div className='flex items-center'>
                <div className='flex items-center gap-2'>
                    <div className='rounded-full hover:bg-gray-100 cursor-pointer'>
                        <RxHamburgerMenu size={"19px"} className=" -ml-10 text-gray-600" strokeWidth="0.4" />
                    </div>
                    <img className='w-27' src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Gmail Logo" />
                </div>
            </div>
            <div className='md:block hidden w-[50%] mr-60'>
                <div className='flex items-center bg-[#EAF1FB]  px-5 py-3 rounded-full'>
                    <IoSearch size={"20px"} className='text-gray-700 mr-2' />
                    <input
                        type="text"
                        placeholder='Search Mail'
                        className=' w-full bg-transparent outline-none px-1 text-md text-gray-800 placeholder-gray-700'
                    />
                </div>
            </div>
            <div className='md:block hidden'>
                <div className='flex items-center gap-2'>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <CiCircleQuestion size={"30px"} strokeWidth="0.4" className='text-gray-700' />
                    </div>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoMdSettings size={"30px"} strokeWidth="0.4" className='text-gray-600 hover:rotate-90 hover:text-blue-600 duration-700 transition' />
                    </div>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <RxAvatar size={"30px"} strokeWidth="0.4" className='text-gray-600 cursor-pointer' onClick={() => handleLogout()} />
                    </div>
                </div>
            </div>
            <Mailbox  toast={toast}/>

            {console.log(new Date().toLocaleString())}
        </div>
    )
}
