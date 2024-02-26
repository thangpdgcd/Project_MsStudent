
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../System/ModalConfirmUser.scss'
class ModalConfirmUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        console.log("check props", this.props);
        console.log("check props open modal", this.props.isOpen)
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"classname"}
                size="sm"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}> Sign Up</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-6  from-group">
                                <label>Email <i className='icon'>*</i></label>
                                <input type="text" />
                            </div>
                            <div className="col-6  from-group">
                                <label>Password<i className='icon'>*</i></label>
                                <input type="text" />
                            </div>
                            <div className="col-6  from-group">
                                <label>First Name<i className='icon'>*</i></label>
                                <input type="text" />
                            </div>
                            <div className="col-6  from-group">
                                <label>Last Name<i className='icon'>*</i></label>
                                <input type="text" />
                            </div>
                            <div className="col-6  from-group">
                                <label>Address<i className='icon'>*</i></label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.toggle() }}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle(false) }}>Cancel</Button>
                </ModalFooter>
            </Modal>)
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmUser);