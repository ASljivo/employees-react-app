import React from 'react';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import FormMethods from './../shared/FormMethods';
import { getProjects } from '../../services/projectsService';
import { generateUUID, setLabelStatus } from '../../helper';

class ProjectForm extends FormMethods {
  state = {
    data: {
      id: generateUUID(),
      name: '',
      startDate: '',
      endDate: '',
      status: ''
    },
    errors: {},
    projects: []
  };

  schema = {
    id: Joi.string()
      .required()
      .label('Id'),
    name: Joi.string()
      .required()
      .label('Name'),
    startDate: Joi.string()
      .required()
      .label('Start date'),
    endDate: Joi.string()
      .required()
      .label('End date'),
    status: Joi.string()
      .required()
      .label('Status')
  };

  async componentDidMount() {
    const { data } = await getProjects();
    this.setState({ projects: data });

    if (this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.data &&
      prevProps.data &&
      this.props.data.id !== prevProps.data.id
    ) {
      this.setState({ data: this.props.data });
    }
  }

  handleSubmit = (e, updatedData) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.props.doSubmit(updatedData);
  };

  render() {
    const { data } = this.state;
    const { errors } = this.state;

    return (
      <form className="form" onSubmit={e => this.handleSubmit(e, data)}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">Name</label>
          </div>
          <div className="col-75">
            {this.props.edit ? (
              <input
                type="text"
                id="fname"
                name="name"
                value={data.name}
                onChange={this.handleChange}
                readOnly={this.props.data}
                placeholder="Project name..."
              />
            ) : (
              <span className="noedit-data text">{data.name}</span>
            )}
            {errors.name && <div className="error-msg">{errors.name}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="startDate">Start date</label>
          </div>
          <div className="col-75">
            {this.props.edit ? (
              <input
                type="date"
                id="startDate"
                value={data.startDate}
                onChange={this.handleChange}
                name="startDate"
              />
            ) : (
              <span className="noedit-data text">{data.startDate}</span>
            )}
            {errors.startDate && (
              <div className="error-msg">{errors.startDate}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="endDate">End date</label>
          </div>
          <div className="col-75">
            {this.props.edit ? (
              <input
                type="date"
                id="endDate"
                value={data.endDate}
                onChange={this.handleChange}
                name="endDate"
              />
            ) : (
              <span className="noedit-data text">{data.endDate}</span>
            )}
            {errors.endDate && (
              <div className="error-msg">{errors.endDate}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="status">Status</label>
          </div>
          <div className="col-75">
            {this.props.edit ? (
              <select
                name="status"
                id="status"
                value={data.status}
                onChange={this.handleChange}
              >
                <option value="" />
                <option value="ACTIVE">Active</option>
                <option value="PASSIVE">Passive</option>
              </select>
            ) : (
              <span
                className="noedit-data text"
                style={setLabelStatus(data.status)}
              >
                {data.status}
              </span>
            )}
            {errors.projects && (
              <div className="error-msg">{errors.projects}</div>
            )}
          </div>
        </div>

        {this.props.edit && (
          <div className="row">
            <input
              disabled={this.validateForm()}
              type="submit"
              value="Submit"
            />
          </div>
        )}
      </form>
    );
  }
}

ProjectForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }),
  edit: PropTypes.bool,
  doSubmit: PropTypes.func
};

export default ProjectForm;
