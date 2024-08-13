import React, { Component } from "react";

import { connect } from "react-redux";

import HomeHeader from "./HomeHeader";

import Specialty from "./section/Specialty";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./HomePage.scss";
import "../../containers/HomePage/Homefooter";
import MedicalFaciliti from "./section/MedicalFaciliti";
import OutStandingDoctor from "./section/OutStandingDoctor";
import HandBook from "./section/HandBook";
import About from "./section/About";
import Homefooter from "../../containers/HomePage/Homefooter";
class HomePage extends Component {

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        {" "}
        <HomeHeader />
        <Specialty {...settings} />
        <MedicalFaciliti {...settings} />
        <OutStandingDoctor {...settings} />
        <HandBook {...settings} />
        <About />
        <Homefooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
