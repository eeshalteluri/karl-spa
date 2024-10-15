import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InfoCard from './InfoCard'


import { useEmployees } from '../context/EmployeeProvider'

const Body = () => {
const { employees} = useEmployees()

  return (
    <div className='h-full mt-4 grid grid-cols-1 md:grid md:grid-cols-4 md:gap-4'>
      {employees && employees.map((employee) => (
        <InfoCard 
        key={employee._id} 
        id={employee._id}
        email={employee.email} 
        firstName={employee.firstName} 
        lastName={employee.lastName} 
        phone={employee.phone} 
        company={employee.company} />
      ))}
    </div>
  )
}

export default Body