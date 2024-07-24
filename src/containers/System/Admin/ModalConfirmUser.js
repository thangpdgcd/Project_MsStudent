import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalConfirmUser.scss";
import { emitter } from "../../../utils/emitter";
class ModalConfirmUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log("check modal");
  }

  //open
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
        console.log(isValid);
        break;
      }
    }
    return true;
  };
  handleAddnewUser = () => {
    //check validateq
    let isValid = this.checkValidaInput();
    if (isValid === true) {
      //call api create modal
      // console.log("checkprop", this.props) //truyen tu ben cha qua
      this.props.createNewuser(this.state, "code");
    }
  };
  render() {
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
                  type="email"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "email");
                  }}
                  value={this.state.email}
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
