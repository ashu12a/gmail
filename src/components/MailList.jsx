import React from 'react'
import { FaRegSquare, FaRegStar } from 'react-icons/fa'

export default function MailList({ name, text, index = 0 }) {
  return (
    <div className={`${index % 2 == 0 && 'bg-gray-100'} cursor-pointer hover:bg-gray-200 hover:shadow flex items-center px-4 py-1`}>
      <FaRegSquare className='mr-3 text-gray-600' />
      <FaRegStar className='mr-4 text-gray-600' />
      <h2 className='w-52 capitalize'>{name}</h2>
      <p>{text}</p>
    </div>
  )
}
