import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService } from "../../services/userService";
import ModalConfirmUser from "./ModalConfirmUser";

class UserManage extends Component {
  //create new object

  //log ->get data in function contructor
  constructor(props) {
    super(props);
    this.state = {
      arrayUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    await this.getAllUserFormReact();
  }

  getAllUserFormReact = async () => {
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
  handleAddNewUser = () => {//setstate for isopenmodal if hidden formmodal
    this.setState({
      isOpenModalUser: true,
    })
  }
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }
  createNewuser = async (data) => {
    try {
      let response = await createNewUserService(data)
      if (response && response.errCode != 0) {
        alert(response.errMessage)
      } else {
        await this.getAllUserFormReact()
      }
    } catch (error) {
      console.log("Error:", error)
    }
    // console.log("check data form child", data)
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
    //properties, nested -> prop get components  
    return (

      <div className="user-container">
        <ModalConfirmUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal} //truyen  tu thang cha toggle vao
          createNewuser={this.createNewuser} //truyen tu functioncreate
        />
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
              <th>Action</th>
            </tr>

            {/* for map of javascript */}
            {arrayUsers &&
              arrayUsers.map((item, index) => {
                console.log("check map get data from backend -> api", item, index);
                return (
                  <table>
                    <tbody>
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.Action}
                          <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                          <button className="btn-delete"><i className="fas fa-trash-alt"></i></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                );
              })}
          </table>
        </div >

      </div >
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