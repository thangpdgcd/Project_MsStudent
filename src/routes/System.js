import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/Admin/UserManage";
import ProductManage from "../containers/System/Admin/ProductManage";
import Header from "../containers/Header/Header";
import UsersRedux from "../containers/System/Admin/UsersRedux";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/product-manage" component={ProductManage} />
              <Route path="/system/user-redux" component={UsersRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn, //check user login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
