import React, { Component } from 'react';
import ModalShowingContext from '../shared/ModalShowingContext'
import Modal from '../shared/Modal';
import ProjectForm from './ProjectForm'
import { saveProject } from '../../services/projectsService';
import "../../assets/new-employee-modal.scss"

class NewProject extends Component {

    setDisplayModal = value => {
        this.setState({ displayModal: value });
    };

    state = {
        displayModal: false,
        setDisplayModal: this.setDisplayModal
    };

    doSubmit = async (employeeData) => {
        try {
            const { data } = await saveProject(employeeData);
            this.props.updateProjectsList(data);
            this.setState({ displayModal: false })
        } catch (error) { }
    };

    render() {
        return (
            <ModalShowingContext.Provider value={this.state} >
                <Modal title="Add new project">
                    <ProjectForm doSubmit={this.doSubmit} edit={true} ></ProjectForm>
                </Modal>
            </ModalShowingContext.Provider>

        );
    }
}

export default NewProject;