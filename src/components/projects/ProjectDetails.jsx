import React, { Component } from "react";
import { getProjectsDetails } from "../../services/projectsService";

class ProjectDetails extends Component {
  state = {
    project: {},
    editProject: false
  };

  async componentDidMount() {
    const { data } = await getProjectsDetails(this.props.match.params.id);
    this.setState({ project: data });
  }

  render() {
    const { project } = this.state
    return (
      <div className="content content-box">
        <h2>Project details</h2>

        <div className="row">
          {!this.state.editProject && <button className="btn-prim" onClick={() => this.setState({ editProject: true })}>Edit</button>}
          {this.state.editProject && <button className="btn-prim" onClick={() => this.setState({ editProject: false })}>Cancel</button>}
        </div>

        <table>
          <tbody>
            <tr>
              <td className="data-title">Name</td>
              <td className="data-item">{project.name}</td>
            </tr>
            <tr>
              <td className="data-title">Start date</td>
              <td className="data-item">{project.startDate}</td>
            </tr>
            <tr>
              <td className="data-title">End date</td>
              <td className="data-item">{project.endDate}</td>
            </tr>
            <tr>
              <td className="data-title">Status</td>
              <td className="data-item">{project.status}</td>
            </tr>
          </tbody>
        </table>
      </div>);
  }
}

export default ProjectDetails;