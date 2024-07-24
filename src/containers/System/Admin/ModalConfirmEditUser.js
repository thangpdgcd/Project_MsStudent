import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "./ModalConfirmEditUser.scss";
import _ from "lodash";
import { emitter } from "../../../utils/emitter";
class ModalConfirmEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      lastName: "",
      firstName: "",
      password: "",
      address: "",
      phonenumber: "",
    };

    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        email: "",
        lastName: "",
        firstName: "",
        password: "",
        address: "",
        phonenumber: "",
      });
    });
  }
  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "harcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phonenumber: user.phonenumber,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };
  //log input email
  handleOnchangeInputFormModal = (event, id) => {
    //good code
    let coppyState = { ...this.state }; // gan all data cho coppystate
    coppyState[id] = event.target.value;
    this.setState({
      ...coppyState,
    });
    console.log("event1:", event.target.value, id);
  };
  checkValidaInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return true;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidaInput();
    if (isValid === true) {
      //call api edit user function
      this.props.editUser(this.state);
      console.log(this.props.editUser(this.state));
    }
  };

  render() {
    console.log("check props parent:", this.props);
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
          Edit User
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6  from-group">
                <label>
                  Email <i className="icon">*</i>
                </label>
                <input
                  type="email"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "email");
                  }}
                  value={this.state.email}
                  disabled //can not edit
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  FirstName<i className="icon">*</i>
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
                  LastName<i className="icon">*</i>
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
                  Password<i className="icon">*</i>
                </label>
                <input
                  type="password"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "password");
                  }}
                  value={this.state.password}
                  disabled //can not edit
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  Address<i className="icon">*</i>
                </label>
                <input
                  type="address"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "address");
                  }}
                  value={this.state.address}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  Phone Number<i className="icon">*</i>
                </label>
                <input
                  type="phonenumber"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "phonenumber");
                  }}
                  value={this.state.phonenumber}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleSaveUser();
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalConfirmEditUser);
