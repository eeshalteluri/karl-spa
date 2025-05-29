import React from 'react'

const Button = ({text, openmodal}) => {
  return (
    <button onClick={openmodal} className='fixed bottom-10 right-10 bg-white hover:bg-opacity-70 py-2 px-4 text-black rounded'>
      {text}
    </button>
  )
}

export default Button