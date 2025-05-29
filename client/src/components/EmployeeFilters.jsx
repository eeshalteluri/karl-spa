// components/EmployeeFilters.tsx
import React from 'react';
import DatePicker from 'react-datepicker';

const EmployeeFilters = ({
  filter,
  setFilter,
  minSalary,
  maxSalary,
  setMinSalary,
  setMaxSalary,
  endDate,
  setEndDate
}) => {

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-center md:items-end gap-4 mx-auto mb-6">
      <input
        className="p-2 h-fit border border-gray-300 text-black rounded"
        placeholder="Filter by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label>Min Salary</label>
          <input
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="w-full p-2  rounded border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none"
          />
        </div>

        <div className="flex-1">
          <label>Max Salary</label>
          <input
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            className="w-full p-2  rounded border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none"
          />
        </div>
      </div>

      <div className='flex flex-col'>
        <label>Last Updated Before</label>
        <DatePicker
        selected={endDate ? new Date(endDate) : null}
        onChange={(date) => { console.log(date?.toISOString()); setEndDate(date?.toISOString())}}
        isClearable
        className="w-full p-2 rounded border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholderText="Select end date and time"
      />
      </div>
    </div>
  );
};

export default EmployeeFilters;
