import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../System/ModalConfirmUser.scss";
class ModalConfirmUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      address: "",
    };
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };
  //log input email
  handleOnchangeInputFormModal = (event, id) => {
    console.log(event.target.value, id);
  };
  //   //log input password
  //   handleOnchangeInputPassword = (eventpassword) => {
  //     console.log(eventpassword.target.value);
  //   };
  //   //log input firstname
  //   handleOnchangeInputFirstname = (eventfirstname) => {
  //     console.log(eventfirstname.target.value);
  //   };
  //   //lop input lastname
  //   handleOnchangeInputLastname = (eventlastname) => {
  //     console.log(eventlastname.target.value);
  //   };
  //   //log input address
  //   handleOnchangeInputAddress = (eventaddress) => {
  //     console.log(eventaddress.target.value);
  //   };

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
                    this.handleOnchangeInputFormModal(event, "EMAIL");
                  }}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  Password<i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "PASSWORD");
                  }}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  First Name<i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "FIRSTNAME");
                  }}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  Last Name<i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "LASTNAME");
                  }}
                />
              </div>
              <div className="col-6  from-group">
                <label>
                  Address<i className="icon">*</i>
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeInputFormModal(event, "ADDRESS");
                  }}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggle();
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
