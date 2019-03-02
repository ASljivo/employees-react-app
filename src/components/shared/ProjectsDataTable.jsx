import React from "react";

const ProjectsDataTable = (props) => {
  return (

    <table className="common-table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Status</th>

        </tr>
      </thead>
      <tbody>
        {props.projects.map(item => (
          <tr key={item.id} onClick={props.getProjectDetails ? props.getProjectDetails.bind(this, item) : undefined}>
            <td>{item.name}</td>
            <td>{item.startDate}</td>
            <td>{item.endDate}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProjectsDataTable;

