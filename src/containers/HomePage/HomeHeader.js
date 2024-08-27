import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returntoHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  }
  render() {
    // console.log("check prop", this.props)
    let language = this.props.language;
    let userInfo = this.props;

    console.log("userInfo", userInfo);

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="Header-logo"
                title="Uy Tín Chất Lượng Hàng Đầu"
                onClick={() => this.returntoHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.speaciality" />
                  </b>
                  <p>
                    {" "}
                    <FormattedMessage id="homeheader.searchdoctor" />
                  </p>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                  <p>
                    {" "}
                    <FormattedMessage id="homeheader.select-room" />
                  </p>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                  <p>
                    {" "}
                    <FormattedMessage id="homeheader.select-doctor" />
                  </p>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                  <p>
                    <FormattedMessage id="homeheader.check-health" />
                  </p>
                </div>
              </div>
            </div>

            <div className="right-content">
              <div className="child-right-content">
                <a
                  className="content-right"
                  href="https://mail.google.com/mail/u/0/?pli=1#inbox"
                >
                  {" "}
                  <i className="fas fa-question-circle"></i>
                  <FormattedMessage id="homeheader.support" />
                </a>
              </div>
            </div>
            <div className="language-code">
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi action"
                    : "language-vi"
                }
              >
                {/* ///toan tu ngoi 3 */}
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en action"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true &&
          <div className="home-header-banner">
            <div className="title-1">
              <FormattedMessage id="headercontent.Health-Foundation" />
            </div>
            <div className="title-2">
              <FormattedMessage id="headercontent.Health-Care" />
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                media="screen"
                placeholder="Tìm Chuyên Khoa"
              ></input>
            </div>
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="headercontent.Specialized" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="headercontent.examination-remote" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-procedures"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="headercontent.GeneralExamination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-microphone"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="headercontent.Medical-Tests" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="headercontent.health-spirit" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="headercontent.Dental-Examination" />
                </div>
              </div>
            </div>
          </div>
        }
      </React.Fragment>
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
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
