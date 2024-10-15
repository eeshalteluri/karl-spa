import express from 'express'
import { getEmployees, addEmployee, removeEmployee, updateEmployee } from '../controllers/Employee.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' })
})

router.get('/api/employees', getEmployees)

router.post('/api/employees', addEmployee)

router.delete('/api/employees/:id', removeEmployee)

router.put('/api/employees/:id', updateEmployee)

export default router