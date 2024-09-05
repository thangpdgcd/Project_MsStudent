import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
// import React from 'react';
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from "markdown-it/index.js";

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {
  //create new object

  //log ->get data in function contructor
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }
  componentDidMount = () => {
    this.props.fetchUserRedux();
  };

  //update state
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
      });
    }
  };

  handleDeleteUser = (user) => {
    this.props.DeleteUsersRedux(user.id);
    console.log("Delete user check: ", user);
  };
  handleEditUser = (user) => {
    // this.props.EditUserRedux(user.id);
    console.log("Edit user check:", user);
    this.props.handleEditUserFromParentKey(user);
  };
  render() {
    console.log("check all list users", this.props.listUsers);
    //get all user
    console.log("check state: ", this.state.userRedux);
    let arrayUser = this.state.userRedux;
    return (
      <React.Fragment>
        <table id="TableManageUser">
          <thead>
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>PhoneNumber</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayUser &&
              arrayUser.length > 0 &&
              arrayUser.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phonenumber}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    DeleteUsersRedux: (id) => dispatch(actions.DeleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
