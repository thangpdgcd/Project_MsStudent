import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homefooter.scss";
class Homefooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="footer-right">
          <a href="https://bookingcare.vn/">©2024 BookingCare.</a>
        </div>
        <div className="footer-content"></div>
        <div className="footer-left">
          <div className="facebook">
            <a href="https://www.facebook.com/"></a>
          </div>
          <div className="tiktok">
            <a href="https://www.tiktok.com/fr/"></a>
          </div>
          <div className="youtube">
            <a href="https://www.youtube.com/"></a>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Homefooter);
