import React from 'react';
import ModalShowingContext from '../shared/ModalShowingContext'
import "../../assets/new-employee-modal.scss"

function Modal(props) {

    return (
        <ModalShowingContext.Consumer>
            {({ displayModal, setDisplayModal }) => (
                <div>
                    <div className="row"><button className="btn-prim" onClick={setDisplayModal.bind(this, true)}> {props.title}</button></div>
                    {displayModal &&
                        <div id="popup1" className="overlay">
                            <div className="popup">
                                <h2>{props.title}</h2>
                                <span className="close" onClick={setDisplayModal.bind(this, false)}>&times;</span>
                                <div className="content">
                                    {props.children}
                                </div>
                            </div>
                        </div>}
                </div>

            )}
        </ModalShowingContext.Consumer >
    );
}
export default Modal;


// class Modal extends Component {

//     render() {
//         return (
//             <div>
//                 <div className="row"><button className="btn-prim" onClick={this.context.setDisplayModal.bind(this, true)}> Add new employee</button></div>

//                 {this.context.displayModal &&
//                     <div id="popup1" className="overlay">
//                         <div className="popup">
//                             <h2>Add new employee</h2>
//                             <span className="close" onClick={this.context.setDisplayModal.bind(this, false)}>&times;</span>
//                             <div className="content">
//                                 {this.props.children}
//                             </div>
//                         </div>
//                     </div>}
//             </div>
//         );
//     }
// }
// Modal.contextType = ModalShowingContext;
// export default Modal;