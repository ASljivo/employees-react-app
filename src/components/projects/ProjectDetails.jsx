import React, { Component } from 'react';
import {
  getProjectsDetails,
  updateProject
} from '../../services/projectsService';
import ProjectForm from './ProjectForm';

class ProjectDetails extends Component {
  state = {
    project: {},
    editProject: false
  };

  async componentDidMount() {
    const { data } = await getProjectsDetails(this.props.match.params.id);
    this.setState({ project: data });
  }

  doSubmit = async updatedData => {
    try {
      const { data } = await updateProject(updatedData);
      this.setState({ project: data });
    } catch (error) {}
    this.setState({ editProject: false });
  };

  render() {
    return (
      <div className="content content-box">
        <h2>Project details</h2>

        <div className="row">
          {!this.state.editProject && (
            <button
              className="btn-prim"
              onClick={() => this.setState({ editProject: true })}
            >
              Edit
            </button>
          )}
          {this.state.editProject && (
            <button
              className="btn-prim"
              onClick={() => this.setState({ editProject: false })}
            >
              Cancel
            </button>
          )}
        </div>

        {this.state.project.id && (
          <ProjectForm
            data={this.state.project}
            doSubmit={this.doSubmit}
            edit={this.state.editProject}
          />
        )}
      </div>
    );
  }
}

export default ProjectDetails;
