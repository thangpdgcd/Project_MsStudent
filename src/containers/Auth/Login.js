import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
// import { userService } from '../../services/userService';
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("loging success");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      console.log("error message", e.response);
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
    console.log(this.state.showPassword);
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center login-title">Login</div>
            <div className="col-12 form-group">
              <label>Username: </label>
              <input
                type="text"
                className="form-control login-input"
                placeholder="Enter your user name"
                value={this.state.username}
                onChange={(e) => this.handleOnChangeUserName(e)}
              />
            </div>
            <div className="col-12 form-group">
              <label>Password: </label>
              <div className="login-password">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  className="form-control login-input"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(e) => this.handleOnChangePassword(e)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.showPassword
                        ? "fas fa-eye show-password"
                        : "fas fa-eye-slash show-password"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <a
                className="forgot-password"
                href="https://www.facebook.com/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0"
              >
                Forgot your password?
              </a>
              <a
                href="https://www.facebook.com/help/188157731232424"
                className="Create-newaccount"
              >
                Create New Account
              </a>
            </div>
            <div className="col-12 text-center login-with mt-3">
              <span className="">Or login with:</span>
            </div>
            <div className="col-12 social-login">
              <a href="https://www.facebook.com/profile.php?id=61553258036500">
                <i className="fab fa-facebook social-icon fb"></i>
              </a>
              <a href="https://react.dev/">
                <i className="fab fa-google-plus social-icon gg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
