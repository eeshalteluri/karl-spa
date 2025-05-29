import React, { useState } from 'react'
import { useEmployees } from '../context/EmployeeProvider'
import { toast } from 'react-hot-toast'
import Modal from './Modal'
import UpdateEmployee from './UpdateEmployee'

const InfoCard = ({ id, employeeId, index, email, firstName, lastName, phone, salary, company }) => {
  const [isEditing, setIsEditing] = useState(false)
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

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200 [&>td]:border [&>td]:border-gray-300 [&>td]:p-1 [&>td]:md:p-3 [&>last-child]:border-none">
  <td>{index + 1}</td>
  <td className="">{`EID${employeeId}`}</td>
  <td>{firstName}</td>
  <td className="hidden md:table-cell">{lastName}</td>
  <td className="hidden lg:table-cell">{email}</td>
  <td className="hidden lg:table-cell">{phone}</td>
  <td className="hidden lg:table-cell">{company}</td>
  <td>{salary}</td>
  <td className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2 py-2">
    <button
      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition duration-150 text-sm"
      onClick={openModal}
    >
      Edit
    </button>
    <button
      className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-150 text-sm"
      onClick={() => handleDelete(id)}
    >
      Delete
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
    </>
  )
}

export default InfoCard
