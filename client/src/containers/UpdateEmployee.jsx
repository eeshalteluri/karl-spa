import React, { useState, useEffect } from 'react'
import employeeSchema from '../Validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'

import { useEmployees } from '../context/EmployeeProvider'

const UpdateEmployee = ({closeModal, employeeData}) => {
    const { updateEmployee } = useEmployees()
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const { register, handleSubmit , setError, formState: { errors }} = useForm({resolver: zodResolver(employeeSchema)})

    const [employee, setEmployee] = useState({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        phone: employeeData.phone,
        company: employeeData.company,
        salary: employeeData.salary
})

    useEffect(() => {
        document.body.style.overflow = 'hidden'

    return () => {
        document.body.style.overflow = 'scroll'
    }
    }, [])

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee(prev => ({
        ...prev,
        [name]: name === "salary" ? (value === "" ? null : Number(value)) : value,
      }));
    };


    const submitHandler = async (e) => {
        setIsSubmitting(true)
        
        try{
            console.log('updated employee data before sending: ', employee)
        toast.promise(updateEmployee(employeeData.id,employee), {
          loading: 'updating employee...',
          success: 'Employee updated successfully',
          error: 'Error updating employee'
      })

        console.log('submitted')
        console.log("Updated Employee added: ", employee)
        closeModal()

        }catch(error){
            console.log('Error adding employee:', error)
        }finally{
            setIsSubmitting(false)
        }
    }

    
  return (
    <div className='bg-white text-black py-6 rounded-md flex flex-col justify-center items-center h-fit max-w-2xl'>
    <h2 className='w-full text-3xl text-center pb-4 border-b m-4 font-bold'>Fill up the details below</h2>

    <form onSubmit={handleSubmit(submitHandler)} type="submit"  className='w-full [&>div]:mx-4'>
        <div>  
          <label htmlFor="email" className=''>Email address
            <input 
            type="email" 
            name="email" 
            id="email"
            {...register("email")}
            value={employee.email || ''}
            onChange={handleChange} 
            required 
            className='block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
            {errors.email && <p className='text-red-500 mb-2'>{errors.email.message}</p>}
          </label>
        </div>

        <div className='flex flex-col md:flex-row md:items-center'>
          <label className='w-full md:w-1/2 md:mr-4' htmlFor="firstName">First Name
            <input 
            type="text" 
            name="firstName" 
            id="firstName"
            {...register("firstName")}  
            value={employee.firstName || ''}
            onChange={handleChange}
            required 
            className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
            {errors.firstName && <p className='text-red-500 mb-2'>{errors.firstName.message}</p>}
          </label>
          <label className='w-full md:w-1/2' htmlFor="lastName">Last Name
            <input 
            type="text" 
            name="lastName" 
            id="lastName"
            {...register("lastName")}
            value={employee.lastName || ''} 
            onChange={handleChange}
            required 
            className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
            {errors.lastName && <p className='text-red-500 mb-2'>{errors.lastName.message}</p>}
          </label>
        </div>

        <div className='flex flex-col md:flex-row'>
          <label className='w-full md:w-1/2 md:mr-4' htmlFor="phone">Phone number
            <input 
            type='phone' 
            name="phone" 
            id="phone" 
            {...register("phone")}
            value={employee.phone || ''}
            onChange={handleChange}
            required 
            className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
            {errors.phone && <p className='text-red-500 mb-2'>{errors.phone.message}</p>}
          </label>
          <label className='w-full md:w-1/2' htmlFor="company">Company
            <input 
            type='text' 
            name="company" 
            id="company"
            {...register("company")}
            value={employee.company || ''}
            onChange={handleChange}
            required 
            className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
            {errors.company && <p className='text-red-500 mb-2'>{errors.company.message}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="salary" className=''>Salary
            <input 
            type='number' 
            name="salary" 
            id="salary"
            {...register("salary")}
            value={employee.salary || null}
            onChange={handleChange} 
            required 
            className='block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
            {errors.salary && <p className='text-red-500 mt-2'>{errors.salary.message}</p>}
          </label>
        </div>

        <div className='flex justify-end'>
        <button type='button' onClick={ closeModal } className='font-bold text-[#ef4444] p-2 rounded mt-4 mr-2'>CLOSE</button>
        <button 
        type='submit' 
        className={isSubmitting? 'border py-2 px-6 rounded mt-4 bg-primary text-white font-bold cursor-not-allowed': 'border py-2 px-6 rounded mt-4 bg-primary text-white font-bold'}>{ isSubmitting? 'Saving...' : 'SAVE CHANGES'}</button>
        </div>
    </form>
  </div>
  )
}

export default UpdateEmployee