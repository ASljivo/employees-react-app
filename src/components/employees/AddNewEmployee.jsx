import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';
import { saveEmployee } from "../../services/employeeService";
import ModalShowingContext from '../shared/ModalShowingContext'
import Modal from '../shared/Modal';
import "../../assets/new-employee-modal.scss"

class NewEmployee extends Component {

    setDisplayModal = value => {
        this.setState({ displayModal: value });
    };

    state = {
        displayModal: false,
        setDisplayModal: this.setDisplayModal
    };

    doSubmit = async (employeeData) => {
        try {
            const { data } = await saveEmployee(employeeData);
            this.props.updateEmployeesList(data);
            this.setState({ displayModal: false })
        } catch (error) { }
    };

    render() {
        return (
            <ModalShowingContext.Provider value={this.state} >
                <Modal title="Add new employee">
                    <EmployeeForm doSubmit={this.doSubmit} edit={true} ></EmployeeForm>
                </Modal>
            </ModalShowingContext.Provider>
        );
    }
}

export default NewEmployee;