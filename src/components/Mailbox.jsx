import React, { useEffect, useRef, useState } from 'react'
import { TiMinus } from 'react-icons/ti';
import { FaArrowsAltV } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { setClose } from '../store/reducers/NewMailPopup';
import { getUserByEmail, sendMail } from '../utils/api';
import { useAuth } from '../store/context/AuthContextProvider';


const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
];

export default function Mailbox({ toast }) {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const debounceTimeoutRef = useRef(null);
    const [users, setUsers] = useState(null);
    const [emailExist, setEmailExist] = useState();
    const openNewMailBox = useSelector((state) => state.newMailPopup.isOpen);

    const emailRef = useRef();
    const subjectRef = useRef();
    const messageRef = useRef();


    const handleClose = () => {
        dispatch(setClose());
    };

    const handleSubmit = async () => {
        const users = await getUserByEmail(emailRef.current.value);
        const filteredData = users.data.filter(f => f.email === emailRef.current.value)
        if (filteredData.length < 1) {
            setEmailExist('Email not exist');
            return
        }

        const data = {
            from: user.email,
            fromName: user.displayName,
            to: emailRef.current.value,
            subjct: subjectRef.current.value,
            message: messageRef.current.value
        }

        const response = await sendMail(data);

        if (response?.success) toast.success(response.message);
        if (!response?.success) toast.warn(response.message);

        emailRef.current.value = '';
        subjectRef.current.value = '';
        messageRef.current.value = '';

        handleClose();
    }

    const checkEmailExist = async (email) => {
        if (email.length < 3) {
            setUsers();
            return
        }
        const response = await getUserByEmail(email);
        const filteredData = response.data.filter(f => f.email !== user.email)
        if (response.success) setUsers(filteredData);
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmailExist();
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(() => {
            checkEmailExist(value);
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
        <div className={`${!openNewMailBox && 'hidden'} absolute right-5 w-[40vw] bottom-0 rounded bg-white shadow-2xl border border-gray-300`}>
            <div className='bg-gray-100 font-semibold text-gray-700 px-4 py-1 flex items-center justify-between'>
                New Message
                <div className='flex gap-2 items-center text-gray-600'>
                    <TiMinus />
                    <FaArrowsAltV style={{ rotate: '45deg' }} />
                    <ImCross size={'12px'} className='cursor-pointer' onClick={handleClose} />
                </div>
            </div>
            <div className='px-4 flex py-1 border-b border-gray-200 text-gray-700'>
                <span style={{ fontWeight: '500' }} className='text-gray-600'>From</span> <span className='mx-2'><span className='capitalize'>{user.displayName} </span>&lt;{user.email}&gt;</span>
            </div>
            <div className='relative'>
                <div className={`${emailExist ? 'border-2 border-red-500' : 'border-b border-gray-200'} px-4 flex py-1  text-gray-700 relative`}>
                    <span style={{ fontWeight: '500' }} className='mr-2 text-gray-600'>To</span> <input type="email" ref={emailRef} onChange={handleEmailChange} className='outline-none w-full' />
                    {
                        emailExist &&
                        <span className='absolute bg-red-500 text-white px-4 py-1 rounded-full right-5 top-[10%] font-bold text-xs'>{emailExist}</span>
                    }
                </div>
                <div className='absolute mx-2 bg-white shadow w-[80%]'>
                    {
                        users?.length > 0 && users.slice(0, 4).map((item, index) => (
                            <p
                                className={`${index % 2 == 0 && 'bg-gray-100'} text-gray-700 rounded mx-1 my-2 w-full px-4 hover:bg-gray-200 cursor-pointer`}
                                key={item.email}
                                onClick={() => {
                                    emailRef.current.value = item.email;
                                    setUsers();
                                }}
                            >
                                <span className={`uppercase rounded-full px-[6px] py-[5px] mx-2 text-xs text-white ${colors[Math.floor(Math.random() * colors.length)]}`}>
                                    {item.name.slice(0, 2)}
                                </span>
                                {item.email}
                            </p>
                        ))
                    }
                </div>
            </div>

            <div className='px-4 flex py-1 border-b border-gray-200 text-gray-700'>
                <input type="text" ref={subjectRef} className='outline-none w-full h-8' placeholder='Subject' />
            </div>
            <textarea name="message" ref={messageRef} className='outline-none p-2 w-full h-[250px] text-sm' style={{ resize: 'none' }} placeholder='Type here...'>

            </textarea>
            <div className='bg-white w-full -mt-2 px-4 py-2'>
                <button onClick={handleSubmit} className='bg-blue-500 rounded-full px-8 py-1 text-white'  >Send</button>
            </div>
        </div>
    )
}

