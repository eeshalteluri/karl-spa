import React from 'react'

const SalaryFilter = () => {
  return (
    <div>
        <label htmlFor="minSalary" className="block">Minimum Salary</label>
        <input
            type="number"
            id="minSalary"
            {...register("minSalary", { valueAsNumber: true })}
            onChange={handleChange}
            className="block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none"
        />
        {errors.minSalary && <p className="text-red-500 mt-2">{errors.minSalary.message}</p>}

        <label htmlFor="maxSalary" className="block mt-4">Maximum Salary</label>
        <input
            type="number"
            id="maxSalary"
            {...register("maxSalary", { valueAsNumber: true })}
            onChange={handleChange}
            className="block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none"
        />
        {errors.maxSalary && <p className="text-red-500 mt-2">{errors.maxSalary.message}</p>}
</div>

  )
}

export default SalaryFilter