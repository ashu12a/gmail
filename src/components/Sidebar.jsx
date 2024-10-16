import React from 'react'
import { IoMdStar } from 'react-icons/io';
import { LuPencil } from 'react-icons/lu'
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from 'react-icons/md';
import { TbSend2 } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setOpen } from '../store/reducers/NewMailPopup';

const sidebarItems = [
  {
    icon: <LuPencil size={'18px'} />,
    text: 'Inbox',
    current: true
  },
  {
    icon: <IoMdStar size={'20px'} />,
    text: 'Starred',
    current: false
  },
  {
    icon: <MdOutlineWatchLater size={'20px'} />,
    text: 'Snoozed',
    current: false
  },
  {
    icon: <TbSend2 size={'20px'} />,
    text: 'Sent',
    current: false
  },
  {
    icon: <MdOutlineDrafts size={'20px'} />,
    text: 'Drafts',
    current: false
  },
  {
    icon: <MdOutlineKeyboardArrowDown size={'20px'} />,
    text: 'More',
    current: false
  }
]

export default function Sidebar() {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setOpen());
  };
  return (
    <div className='w-[15%]'>
      <div className="p-3">
        <button onClick={handleOpen} className='flex items-center text-gray-600 justify-center gap-4 px-6 py-2 rounded-2xl hover:shadow-md bg-[#C2E7FF]'>
          <LuPencil size={"18px"} />
          <p className='text-lg'>Compose</p>
        </button>
      </div>
      <div className='text-gray-500 pr-2'>
        {
          sidebarItems.map(item => (
            <p key={item.text} className={`${item.current ? 'bg-blue-200 text-black' : 'hover:bg-gray-200'} flex items-center gap-4 pl-6 my-1  rounded-e-full cursor-pointer`}>
              {item.icon}
              {item.text}
            </p>
          ))
        }

      </div>
    </div>
  )
}
