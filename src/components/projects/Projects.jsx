import React, { Component } from "react";
import { getProjects } from "../../services/projectsService";
import ProjectsDataTable from "./../shared/ProjectsDataTable";
import NewProject from './AddNewProject'

class Projects extends Component {
  state = {
    projects: [],
    selectedProject: {}
  };

  componentDidMount() {
    this.getProjects();
  }

  async getProjects() {
    const { data } = await getProjects();
    this.setState({ projects: data });
  }

  getProjectDetails = (item) => {
    this.selectedProject = item;
    this.setState({ selectedProject: item });
    this.props.history.push(`project/${item.id}`)
  }

  updateProjectsList = (data) => {
    if (data) {
      this.getProjects();
    }
  }

  render() {
    return (
      <div className="content content-box">
        <h2>Projects</h2>

        <NewProject updateProjectsList={this.updateProjectsList}></NewProject>

        <ProjectsDataTable projects={this.state.projects} getProjectDetails={this.getProjectDetails}></ProjectsDataTable>
      </div>

    );
  }
}

export default Projects;
