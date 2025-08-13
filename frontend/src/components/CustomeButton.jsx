import React from 'react'

const CustomButton = ({children, onClick,type="button",className=""}) => {
  return (
    <button type={type} className={` text-lg py-2 px-6 rounded-lg font-semibold hover:cursor-pointer hover:scale-105 duration-200 transition-all ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton