import React from "react";
import Joi from "joi-browser";
import PropTypes from "prop-types";
import Select from 'react-select';
import FormMethods from "../shared/FormMethods";
import { getProjects } from "../../services/projectsService";
import { generateUUID } from "../../helper";

class EmployeeForm extends FormMethods {

  state = {
    data: {
      id: generateUUID(),
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      projects: [],
      title: ""
    },
    errors: {},
    projects: [],
    submitedChanges: false
  }

  schema = {
    id: Joi.string()
      .required()
      .label("Id"),
    firstName: Joi.string()
      .required()
      .label("First name"),
    lastName: Joi.string()
      .required()
      .label("Last name"),
    dateOfBirth: Joi.string()
      .required()
      .label("Date of birth"),
    projects: Joi.array()
      .label("Projects"),
    title: Joi.string()
      .required()
      .label("Title")
  };


  async componentDidMount() {
    const { data } = await getProjects();

    this.setState({ projects: data });
    if (this.props.data) {
      this.setState({ data: this.props.data })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data && prevProps.data && (this.props.data.id !== prevProps.data.id)) {
      this.setState({ data: this.props.data });
    }
    // console.log(prevProps.edit, this.props.edit)
    // if (prevProps.edit && !this.props.edit && !this.state.submitedChanges) {
    //   this.setState({ data: this.props.data });
    // }
  }

  handleSubmit = (e, updatedData) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.props.doSubmit(updatedData);
    this.setState({ submitedChanges: true })
  };

  handleSelectChange = (selectedOption) => {
    const data = { ...this.state.data };
    data.projects = selectedOption;
    this.setState({ data: data })
  }

  render() {
    const { data } = this.state;
    const { errors } = this.state;
    return (
      <form className="form" onSubmit={(e) => this.handleSubmit(e, data)} >

        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">First Name</label>
          </div>
          <div className="col-75">
            {this.props.edit ?
              (<input type="text" id="fname" name="firstName" value={data.firstName} onChange={this.handleChange} placeholder="Your name..." />) : (
                <span className="noedit-data text">{this.state.data.firstName}</span>)}
            {errors.firstName && <div className="error-msg">{errors.firstName}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="lname">Last Name</label>
          </div>
          <div className="col-75">
            {this.props.edit ?
              (<input type="text" id="lname" name="lastName" value={data.lastName} onChange={this.handleChange} placeholder="Your last name..." />) : (
                <span className="noedit-data text">{this.state.data.lastName}</span>)}
            {errors.lastName && <div className="error-msg">{errors.lastName}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="dateOfBirth">Date of birth</label>
          </div>
          <div className="col-75">
            {this.props.edit ?
              (<input type="date" id="dateOfBirth" value={data.dateOfBirth} onChange={this.handleChange} name="dateOfBirth" />) : (
                <span className="noedit-data text">{this.state.data.dateOfBirth}</span>)}
            {errors.dateOfBirth && <div className="error-msg">{errors.dateOfBirth}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="title">Title</label>
          </div>
          <div className="col-75">
            {this.props.edit ?
              (<input type="text" id="title" name="title" value={data.title} onChange={this.handleChange} placeholder="Your title..." />) : (
                <span className="noedit-data text">{this.state.data.title}</span>)}
            {errors.title && <div className="error-msg">{errors.title}</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="projects">Projects</label>
          </div>
          <div className="col-75">
            {this.props.edit ?
              (
                <Select
                  value={data.projects}
                  onChange={this.handleSelectChange}
                  options={this.state.projects}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.name}
                  isMulti
                />) : (
                <ol className="noedit-data">
                  {data.projects.map(project => (
                    <li className="text" key={project.id}>{project.name}</li>
                  ))}
                </ol>)}
            {errors.projects && <div className="error-msg">{errors.projects}</div>}
          </div>
        </div>
        {
          this.props.edit &&
          <div className="row">
            <input disabled={this.validateForm()} type="submit" value="Submit" />
          </div>
        }
      </form >
    );
  }
}

EmployeeForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    projects: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  }),
  edit: PropTypes.bool,
  doSubmit: PropTypes.func
};

export default EmployeeForm;