import React from 'react'

const Button = ({text, openmodal}) => {
  return (
    <button onClick={openmodal} className='fixed bottom-10 right-10 bg-white py-2 px-4 text-white rounded bg-gradient-to-r from-[#833ab4] to-[#fcb045]'>
      {text}
    </button>
  )
}

export default Button