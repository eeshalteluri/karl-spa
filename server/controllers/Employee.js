import Employee from "../model/Employee.js"

export const getEmployees = async (req, res) => {
  try {
    console.log("Connecting to Mongo...");
    const employees = await Employee.find();
    console.log("Employees fetched:", employees.length);

    res.status(200).json({
      success: true,
      data: employees,
      message: "Employees fetched successfully"
    });
  } catch (error) {
    console.error("Error in getEmployees:", error.message);
    res.status(500).json({
      success: false,
      data: null,
      errorMessage: error.message
    });
  }
};


export const addEmployee = async (req, res) => {
    console.log('Recieved request data: ',req.body)
    try{
        const employeeData = req.body

    const employee = new Employee({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        countryCode: employeeData.countryCode,
        phone: employeeData.phone,
        company: employeeData.company,
        currency: employeeData.currency,
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
        console.log("employee data to be updated: ", employeeData)
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