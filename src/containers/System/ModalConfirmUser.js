import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../System/ModalConfirmUser.scss";
class ModalConfirmUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      address: '',
    };
  }

  componentDidMount() { }

  toggle = () => {
    this.props.toggleFromParent();
  };
  //log input email
  handleOnchangeInputFormModal = (event, id) => {
    //badcode.modify state
    this.state[id] = event.target.value;
    /**
     * {
     * email:''
     * password:''
     * firstname:''
     * lastname:''
     * address:''}
     */
    //luu vao object nhu tren 
    this.setState({
      ...this.state
    }, () => {
      console.log('check bad state: ', this.state)
    });
    //good code
    let coppyState = { ...this.state };
    coppyState[id] = event.target.value;
    this.setState({
      ...coppyState
    })
    console.log('event1:', event.target.value, id)
  }
  checkValidInput = () => {
    let isValid = true;
    let arrayinput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for (let i = 0; i < arrayinput.length; i++) {
      console.log('check inside loop', this.state[arrayinput[i]], arrayinput[i])
      if (!this.state[arrayinput[i]]) {
        isValid = false;
        alert('missing parameter' + arrayinput[i])
        break;
      }
    }
    return isValid;
  }
  handleAddnewUser = () => {
    //check validate
    let isValid = this.checkValidInput();
    if (isValid === true) {
      //call api create modal
      // console.log("checkprop", this.props) //truyen tu ben cha qua
      this.props.createNewuser();
      // console.log("data model", this.state);
    }
  }
  render() {
    console.log("check props", this.props);
    console.log("check props open modal", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"classname"}
        size="sm"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          {" "}
          Sign Up
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6  from-group">
                <label>
                  Email <i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "email");
                  }}
                  value={this.state.email}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  Password<i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "password");
                  }}
                  value={this.state.password}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  First Name<i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "firstName");
                  }}
                  value={this.state.firstName}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  Last Name<i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "lastName");
                  }}
                  value={this.state.lastName}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  Address<i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "address");
                  }}
                  value={this.state.address}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleAddnewUser();
            }}
          >
            Add New
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmUser);
