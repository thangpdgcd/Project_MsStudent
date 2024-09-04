import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { isEmpty } from "lodash";
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuApp: []
    }
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  Backtohome = () => {
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };
  componentDidMount() {
    let menu = [];
    let { userInfo } = this.props;
    if (userInfo && !isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      else if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu
    })
  }
  render() {
    let userInfo = this.props.userInfo;
    let language = this.props.language;
    console.log("check Userinfo", userInfo);
    console.log("check language", language);
    const { processLogout } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="welcome">
          <span title="Admin aways welcome for people">
            <FormattedMessage id="homeheader.welcome" />
            {userInfo && userInfo.fisrtName ? userInfo.fisrtName : ""}
          </span>
        </div>
        <div className="languages">
          <div
            className={
              language === LANGUAGES.VI ? "language-vi action" : "language-vi"
            }
          >
            {/* ///toan tu ngoi 3 */}
            <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
          </div>
          <div
            className={
              language === LANGUAGES.EN ? "language-en action" : "language-en"
            }
          >
            <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
          </div>
        </div>
        <div
          className="btn btn-logout"
          onClick={processLogout}
          title="Log out"
        >
          <i className="fas fa-sign-out-alt">
            <FormattedMessage id="homeheader.logout" />
          </i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => {
      dispatch(actions.changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
