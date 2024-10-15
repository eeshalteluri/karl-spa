import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

import toast, { Toaster } from 'react-hot-toast'

import { BACKEND_URL } from '../../config'

export const EmployeeContext = createContext()

export const EmployeeProvider = ({children}) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = async () => {
        const response = await axios.get(`${BACKEND_URL}`)
        console.log(response.data.data)
        setEmployees(response.data.data)
    }

    const addEmployee = async (newEmployee) => {
        await axios.post(`${BACKEND_URL}`, newEmployee)
        await getEmployees()
        toast.success('Employee added successfully')
    }

    const removeEmployee = async (id) => {
        await axios.delete(`${BACKEND_URL}/${id}`)
        await getEmployees()
        toast.success('Employee removed successfully')
    }

    const updateEmployee = async (id, updatedEmployee) => {
        await axios.put(`${BACKEND_URL}/${id}`, updatedEmployee)
        await getEmployees()
        toast.success('Employee updated successfully')
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