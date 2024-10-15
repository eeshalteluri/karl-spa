import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const EmployeeContext = createContext()

export const EmployeeProvider = ({children}) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = async () => {
        const response = await axios.get('http://localhost:5005/api/employees')
        console.log(response.data.data)
        setEmployees(response.data.data)
    }

    const addEmployee = async (newEmployee) => {
        await axios.post('http://localhost:5005/api/employees', newEmployee)
        await getEmployees()
    }

    const removeEmployee = async (id) => {
        await axios.delete(`http://localhost:5005/api/employees/${id}`)
        await getEmployees()
    }

    const updateEmployee = async (id, updatedEmployee) => {
        await axios.put(`http://localhost:5005/api/employees/${id}`, updatedEmployee)
        await getEmployees()
    }

    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, removeEmployee, updateEmployee }}>
            {children}
        </EmployeeContext.Provider>
    )
}

export const useEmployees = () => useContext(EmployeeContext)