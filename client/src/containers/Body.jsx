import React, { useState } from 'react'
import InfoCard from './InfoCard'
import { useEmployees } from '../context/EmployeeProvider'

const Body = () => {
  const { employees } = useEmployees()
  const [filter, setFilter] = useState('')

  // Filter logic
  const filteredEmployees = employees?.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  )

  return (
    <div className="h-full mt-4 flex flex-col justify-center items-center gap-4">
      <input
        className="max-w-2xl w-full p-2 rounded mb-3 border border-gray-300 text-black"
        placeholder="Filter by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <table className="min-w-full text-sm text-left text-gray-800 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-900">
          <tr className="[&>th]:border [&>th]:border-gray-300 [&>th]:p-3 [&>th]:font-semibold [&>th]:text-sm">
            <th>S.No</th>
            <th>Employee ID</th>
            <th>First Name</th>
            <th className="hidden md:table-cell">Last Name</th>
            <th className="hidden lg:table-cell max-w-xs overflow-hidden whitespace-nowrap truncate">Email</th>
            <th className="hidden lg:table-cell">Phone</th>
            <th className="hidden lg:table-cell">Company</th>
            <th>Salary (PLN)</th>
            <th className="text-center">Actions</th>
          </tr>

        </thead>
        <tbody>
          {filteredEmployees && filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <InfoCard
                key={employee._id}
                id={employee._id}
                employeeId={employee.employeeId}
                index={index}
                email={employee.email}
                firstName={employee.firstName}
                lastName={employee.lastName}
                salary={employee.salary}
                phone={employee.phone}
                company={employee.company}
              />
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4 text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Body
