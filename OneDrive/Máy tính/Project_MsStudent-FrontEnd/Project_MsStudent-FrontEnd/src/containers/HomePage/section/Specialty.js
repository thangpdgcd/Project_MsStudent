import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
class Specialty extends Component {
  render() {
    return (
      <div className="section-specialty  section-share">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-section">
              <FormattedMessage id="specialty.popularspecialties" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="specialty.SeeMore" />
            </button>
          </div>
          <div className="specialty-body">
            {/*props get from homepage */}
            <Slider {...this.props}>
              <div className="specialty-customize">
                <div className="bg-image" />
                <div>
                  <FormattedMessage id="specialty.musculoskeletal" />
                </div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image-2" />
                <div>
                  <FormattedMessage id="specialty.Nerve" />
                </div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image-3" />
                <div>
                  <FormattedMessage id="specialty.Digest" />
                </div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image-4" />
                <div>
                  <FormattedMessage id="specialty.Heart" />
                </div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image-5" />
                <div>
                  <FormattedMessage id="specialty.Traditionalmedicine" />
                </div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image-6" />
                <div>
                  {" "}
                  <FormattedMessage id="specialty.Pediatrics" />
                </div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
