import React from "react";
import "../../assets/table-style.scss"


const EmployeesDataTable = (props) => {
  return (
    <table className="common-table">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Date of birth</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.employees.map((item, index) => (

          <tr className={index === props.selectedTableRowIndex ? "active-row" : ""} key={item.id} onClick={props.getEmployeesDetails.bind(this, item, index)}>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.title}</td>
            <td>{item.dateOfBirth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeesDataTable;
