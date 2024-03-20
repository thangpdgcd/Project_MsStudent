import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">

              <i className="fas fa-bars"></i>
              <div className="Header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>Chuyên Khoa</b>
                  <p>Tìm bác sĩ theo chuyên khoa</p>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>Cơ Sở Y Tế</b>
                  <p>Chọn Bệnh Viện Phòng Khám</p>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác Sĩ</b>
                  <p>Chọn Bác Sĩ Giỏi</p>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói Khám</b>
                  <p>Khám Sức Khỏe Tổng Quát</p>
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
                  Hỗ Trợ
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="title-1">Nền Tản Sức Khỏe</div>
          <div className="title-2">Chăm Sóc Sức Khỏe Toàn Diện</div>
          <div className="search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Tìm Chuyên Khoa "></input>
          </div>
          <div className="options"></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
