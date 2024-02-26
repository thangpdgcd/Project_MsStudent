import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalConfirmUser from "./ModalConfirmUser";

class UserManage extends Component {
  //create new object
  constructor(props) {
    super(props);
    this.state = {
      arrayUsers: [],
    };
  }

  async componentDidMount() {
    //get from nodejs go to Reacjs and testing postman
    let response = await getAllUsers("All");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrayUsers: response.users,
        }
        // () => {
        //   console.log("check state user ", this.state.arrayUsers);
        // } //callback -> function 1 run after to function callback
      );
      console.log("check state user 1", this.state.arrayUsers); //[]
    }
  }

  handleAddNewUser = () => {
    alert("click me")
  }
  /**
   * life cycle
   * run component:
   *1. run contructor => init state
  2. Did mount set (state)
  3. Render
   */
  render() {
    console.log("check render", this.state);
    let arrayUsers = this.state.arrayUsers;
    return (

      <div className="user-container">
        <ModalConfirmUser></ModalConfirmUser>
        <div className="title text-center"> Manage Users With Dev</div>
        <div className="mx-1 px3">
          <button
            onClick={() => this.handleAddNewUser()}
            className="btn btn-primary px-3">
            <i className="fas fa-plus">
            </i>Add new users</button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>PhoneNumber</th>
              <th>Gender</th>
              <th>RoleId</th>
              <th>Action</th>
            </tr>

            {/* for map of javascript */}
            {arrayUsers &&
              arrayUsers.map((item, index) => {
                console.log("check map", item, index);
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.gender}</td>
                    <td>{item.roleId}</td>
                    <td>{item.Action}</td>
                  </tr>
                );
              })}
          </table>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);