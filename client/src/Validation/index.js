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

    countryCode:
    z.string().trim(),

    phone: 
    z.string()
    .trim()
    .min(10, 'Phone number must be min 10 digits')
    .max(12, 'Phone number must be max 12 digits')
    .regex(/^\d+$/, {message: "Phone number must contain only digits"}),

    company: 
    z.string()
    .trim()
    .min(2, {message: "Company name must be atleast 2 characters."})
    .max(20, {message: "Company name must be atmost 20 characters."}),

    currency: z.string().trim(),

    salary: z
    .string()
    .transform((val) => {
      const num = Number(val);
      if (isNaN(num)) throw new Error("Salary must be a number");
      return num;
    })
    .refine((val) => val >= 10000, { message: "Salary must be at least 10,000" })
    .refine((val) => val <= 1000000, { message: "Salary must not exceed 1,000,000" }),
  })

export default employeeSchema