import React, { useEffect } from 'react'
 
const Modal = ({ isOpen, onClose, children }) => {
    if(!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  }

export default Modal