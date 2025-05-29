import React, { useState } from 'react'
import { useEmployees } from '../context/EmployeeProvider'
import { toast } from 'react-hot-toast'
import Modal from './Modal'
import UpdateEmployee from './UpdateEmployee'

import { FaRegEye } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";
import EmployeeCard from './EmployeeCard'


const InfoCard = ({ id, employeeId, index, email, firstName, lastName, countryCode, phone, currency, salary, company, lastUpdated }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isViewed, setIsViewed] = useState(false)
  const { removeEmployee } = useEmployees()

  const handleDelete = (id) => {
    toast.promise(removeEmployee(id), {
      loading: 'Removing employee...',
      success: 'Employee removed successfully',
      error: 'Error removing employee',
    })
  }

  const openModal = () => setIsEditing(true)
  const closeModal = () => setIsEditing(false)
  
  const openViewModal = () => setIsViewed(true)
  const closeViewModal = () => setIsViewed(false)

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200 [&>td]:border [&>td]:border-gray-300 [&>td]:p-1 [&>td]:md:p-3 [&>last-child]:border-none">
  <td>{index + 1}</td>
  <td className="">{`EID${employeeId}`}</td>
  <td>{firstName}</td>
  <td className="hidden md:table-cell">{lastName}</td>
  <td className="hidden lg:table-cell">{email}</td>
  <td className="hidden lg:table-cell">+{countryCode}{phone}</td>
  <td className="hidden lg:table-cell">{company}</td>
  <td>{salary} {currency}</td>
  <td className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2 py-2">
    <button
      onClick={openViewModal}
    >
      <FaRegEye size={28} />
    </button>
    <button
      onClick={openModal}
    >
      <VscEdit size={28} />
    </button>
    <button
      onClick={() => handleDelete(id)}
    >
      <AiOutlineDelete size={28}/>
    </button>
  </td>
</tr>


      {isEditing && (
        <Modal isOpen={openModal} onClose={closeModal}>
          <UpdateEmployee
            employeeData={{ id, email, firstName, lastName, phone, company, salary }}
            closeModal={closeModal}
          />
        </Modal>
      )}

      {isViewed && (
        <Modal isOpen={openViewModal} onClose={closeViewModal}>
          <EmployeeCard
            employeeData={{ id, employeeId, email, firstName, lastName, countryCode, phone, company, currency, salary, lastUpdated }}
            closeModal={closeViewModal}
          />
        </Modal>
      )}
    </>
  )
}

export default InfoCard
