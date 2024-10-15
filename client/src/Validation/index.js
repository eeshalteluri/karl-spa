import z from "zod"

const employeeSchema = z.object({
    firstName: 
    z.string()
    .trim()
    .min(2, {message: "First name must be atleast 2 characters."})
    .max(20, {message: "Username must be atmost 20 characters."})
    .regex(/^[a-zA-Z]+$/, {message: "Only letters are allowed"}),

    lastName: 
    z.string()
    .trim()
    .min(2, {message: "Last name must be atleast 2 characters."})
    .max(20, {message: "Username must be atmost 20 characters."})
    .regex(/^[a-zA-Z]+$/, {message: "Only letters are allowed"}),

    email: 
    z.string()
    .trim()
    .email({message: "Invalid email address."}),

    phone: 
    z.string()
    .trim()
    .length(10, 'Phone number must be 10 digits')
    .regex(/^\d+$/, {message: "Phone number must contain only digits"}),

    company: 
    z.string()
    .trim()
    .min(2, {message: "Company name must be atleast 2 characters."})
    .max(20, {message: "Company name must be atmost 20 characters."}),
  })

export default employeeSchema