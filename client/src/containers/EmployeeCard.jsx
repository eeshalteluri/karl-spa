import React from "react";

const EmployeeCard = ({ closeModal, employeeData }) => {
  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-primary">{employeeData.firstName}</h2>
      
      <ul className="space-y-2 text-gray-800">
        <li><strong>ID:</strong> {employeeData.employeeId}</li>
        <li><strong>Name:</strong> {employeeData.firstName} {employeeData.lastName}</li>
        <li><strong>Salary:</strong> {employeeData.salary.toLocaleString()} {employeeData.currency}</li>
        <li><strong>Company:</strong> {employeeData.company}</li>
        {employeeData.email && <li><strong>Email:</strong> {employeeData.email}</li>}
        {employeeData.phone && <li><strong>Phone:</strong> +{employeeData.countryCode} {employeeData.phone}</li>}
        <li>
        <strong>Last Updated:</strong>{" "}
        {employeeData.lastUpdated
            ? `${employeeData.lastUpdated.split("T")[0]} ${employeeData.lastUpdated.split("T")[1].split(".")[0]}`
            : "N/A"}
        </li>
      </ul>

        <div className='flex justify-end'>
          <button type='button' onClick={ closeModal } className='font-bold text-[#ef4444] p-2 rounded mt-4 mr-2'>CLOSE</button>
        </div>
    </div>
  );
};

export default EmployeeCard;
