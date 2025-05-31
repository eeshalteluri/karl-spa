import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

import toast, { Toaster } from 'react-hot-toast'

import { BACKEND_URL } from '../../config'

export const EmployeeContext = createContext()

export const EmployeeProvider = ({children}) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/employees`)
        console.log(response.data.data)
        setEmployees(response.data.data)
    }

    const addEmployee = async (newEmployee) => {
        await axios.post(`${BACKEND_URL}/api/employees`, newEmployee)
        await getEmployees()
    }

    const removeEmployee = async (id) => {
        await axios.delete(`${BACKEND_URL}/api/employees/${id}`)
        await getEmployees()
    }

    const updateEmployee = async (id, updatedEmployee) => {
        await axios.put(`${BACKEND_URL}/api/employees/${id}`, updatedEmployee)
        await getEmployees()
    }

    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, removeEmployee, updateEmployee }}>
            {children}
            <Toaster />
        </EmployeeContext.Provider>
    )
}

export const useEmployees = () => useContext(EmployeeContext)