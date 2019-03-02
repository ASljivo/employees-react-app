import React, { Component } from "react";
import EmployeeForm from './EmployeeForm';
import NewEmployee from "./AddNewEmployee";
import ProjectsDataTable from "./../shared/ProjectsDataTable";
import { getEmployees, updateEmployee } from "../../services/employeeService";
import "../../assets/table-style.scss"


class Employees extends Component {
  state = {
    employees: [],
    selectedEmployee: {},
    selectedTableRowIndex: -1,
    displayTab: 'info',
    editEmployee: false
  };

  async componentDidMount() {
    this.getEmployees();
  }

  async getEmployees() {
    const { data } = await getEmployees();
    this.setState({ employees: data });
  }

  getEmployeesDetails = (item, index) => {
    this.setState({ selectedEmployee: item, selectedTableRowIndex: index });
    setTimeout(() => { window.scrollTo(0, document.body.scrollHeight); }, 500);
  }

  setDisplayTab(tab) {
    this.setState({ displayTab: tab });
  }

  doSubmit = async (updatedData) => {
    try {
      const { data } = await updateEmployee(updatedData);
      this.updateEmployeesList(data);
    } catch (error) { }
    this.setState({ editEmployee: false })
  };

  updateEmployeesList = (data) => {
    if (data) {
      this.getEmployees();
    }
  }

  render() {
    return (
      <div className="content content-box">
        <h2>Employees</h2>

        <NewEmployee updateEmployeesList={this.updateEmployeesList}></NewEmployee>

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
            {this.state.employees.map((item, index) => (

              <tr className={index === this.state.selectedTableRowIndex ? "active-row" : ""} key={item.id} onClick={this.getEmployeesDetails.bind(this, item, index)}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.title}</td>
                <td>{item.dateOfBirth}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {Object.keys(this.state.selectedEmployee).length > 0 && <div>
          <div className="tabs">
            <span className={'info' === this.state.displayTab ? 'active tab' : 'tab'} onClick={this.setDisplayTab.bind(this, 'info')}>Bacic info</span>
            <span className={'projects' === this.state.displayTab ? 'active tab' : 'tab'} onClick={this.setDisplayTab.bind(this, 'projects')}>Related projects</span>
          </div>

          <br />

          {this.state.displayTab === 'info' &&
            <div className="row">
              {!this.state.editEmployee && <button className="btn-prim" onClick={() => this.setState({ editEmployee: true })}>Edit</button>}
              {this.state.editEmployee && <button className="btn-prim" onClick={() => this.setState({ editEmployee: false })}>Cancel</button>}
            </div>}

          {this.state.displayTab === 'info' &&
            <EmployeeForm data={this.state.selectedEmployee} doSubmit={this.doSubmit} edit={this.state.editEmployee}></EmployeeForm>}

          {this.state.displayTab === 'projects' &&
            <ProjectsDataTable projects={this.state.selectedEmployee.projects} getProjectDetails={this.getProjectDetails}></ProjectsDataTable>
          }
        </div>}
      </div>
    );
  }
}

export default Employees;
