import React, { useState} from 'react'
import { useEmployees } from '../context/EmployeeProvider'

import Modal from './Modal'
import UpdateEmployee from './UpdateEmployee'


const InfoCard = ({id, email, firstName, lastName, phone, company}) => {

  const [isEditing, setIsEditing] = useState(false)
  const { removeEmployee, updateEmployee } = useEmployees()

  const openModal = () => {
    setIsEditing(true)
  }

  const closeModal = () => {
    setIsEditing(false)
  }


  return (
    <div className='bg-white text-black py-6 mb-6 rounded-md flex flex-col justify-center items-center h-fit'>
        
        <div className='flex flex-col items-center'>
            <h2 className='mt-2 text-xl font-medium truncate max-w-48'>{firstName} {lastName}</h2>
            <p className='text-md text-gray-500'>{company}</p>
        </div>

        <div className='text-md text-gray-500 flex flex-col items-center mt-4'>
            <p className='truncate max-w-48'><span>Email: </span> {email}</p>
            <p className='truncate max-w-48'><span>Phone: </span> {phone}</p>
        </div>

        <div>
          <button 
          onClick={() => setIsEditing(true)}
          className='border p-2 rounded mt-4 mr-2'>Update</button>
          <button 
          onClick={() => removeEmployee(id)}
          className='border p-2 rounded mt-4'>Remove</button>
          </div>

          {isEditing && 
          <Modal isOpen={openModal} onClose={closeModal}>
            <UpdateEmployee employeeData={{id, email, firstName, lastName, phone, company}} closeModal={() => setIsEditing(false)}/>
          </Modal>}
    </div>
  )
}

export default InfoCard