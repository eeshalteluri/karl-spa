import React, { useState } from 'react'
import InfoCard from './InfoCard'
import { useEmployees } from '../context/EmployeeProvider'
import EmployeeFilters from '../components/EmployeeFilters'

const Body = () => {
  const { employees } = useEmployees();
  const [filter, setFilter] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [endDate, setEndDate] = useState(null);



 const filteredEmployees = employees
  ?.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const matchesName = fullName.includes(filter.toLowerCase());

    const salary = employee.salary ?? 0;
    const salaryMin = Number(minSalary) || 0;
    const salaryMax = Number(maxSalary) || Infinity;
    const matchesSalary = salary >= salaryMin && salary <= salaryMax;

    let matchesDate = true;
    if (endDate) {
      const updatedAt = new Date(employee.updatedAt);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include entire day
      matchesDate = updatedAt <= end;
    }

    return matchesName && matchesSalary && matchesDate;
  })
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Use updatedAt not lastUpdated



  return (
    <div className="h-full mt-4 flex flex-col justify-center items-center gap-4">
      
       <EmployeeFilters
        filter={filter}
        setFilter={setFilter}
        minSalary={minSalary}
        maxSalary={maxSalary}
        setMinSalary={setMinSalary}
        setMaxSalary={setMaxSalary}
        endDate={endDate}
        setEndDate={setEndDate}
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
            <th>Salary</th>
            <th className="text-center">Actions</th>
          </tr>

        </thead>
        <tbody className="overflow-y-auto max-h-[300px]">
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
                currency={employee.currency}
                salary={employee.salary}
                countryCode={employee.countryCode}
                phone={employee.phone}
                company={employee.company}
                lastUpdated={employee.updatedAt}
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
