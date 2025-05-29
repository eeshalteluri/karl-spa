import Employee from "../model/Employee.js"

export const getEmployees = async (req, res) => {
    try{
        const employees = await Employee.find()
        res.status(200).json({
            success: true,
            data: employees,
            message: "Employees fetched successfully"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            data: null,
            ErrorMesssage: error
        })
    }
}

export const addEmployee = async (req, res) => {
    console.log('Recieved request data: ',req.body)
    try{
        const employeeData = req.body

    const employee = new Employee({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        phone: employeeData.phone,
        company: employeeData.company,
        salary: employeeData.salary
    })

    await employee.save()

    res.status(201).json({
        success: true,
        data: employee,
        message: "Employee created successfully"
    })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            data: null,
            ErrorMesssage: error
        })
    }
}

export const removeEmployee = async (req, res) => {
    try{
        console.log(req.params)
        const employeeId = req.params.id
        await Employee.findByIdAndDelete(employeeId)
        res.status(204).json({
            success: true,
            data: null,
            message: "Employee deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            data: null,
            ErrorMesssage: error
        })
    }
}

export const updateEmployee = async (req, res) => {
    try{
        const employeeId = req.params.id
        const employeeData = req.body
        const employee = await Employee.findByIdAndUpdate(employeeId, employeeData, {
            new: true
        })
        res.status(200).json({
            success: true,
            data: employee,
            message: "Employee updated successfully"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            data: null,
            ErrorMesssage: error
        })
    }
}