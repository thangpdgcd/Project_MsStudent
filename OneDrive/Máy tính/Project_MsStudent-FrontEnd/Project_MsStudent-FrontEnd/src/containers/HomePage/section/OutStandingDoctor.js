import React, { Component } from "react";

import { connect } from "react-redux";

import Slider from "react-slick";

import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-outstanding section-outstanding-doctor">
        <div className="outstanding-container">
          <div className="outstanding-header">
            <span className="title-section">
              <FormattedMessage id="outstanding.Outstandingdoctorlastweek" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="outstanding.SeeMoreoutstanding" />
            </button>
          </div>
          <div className="outstanding-body">
            {/*props get from homepage */}
            <Slider {...this.props}>
              <div className="outstanding-customize">
                <div className="boder">
                  <div className="bg-image" />
                  <div className="position text-center">
                    <FormattedMessage id="outstanding.doctorlathibuoi" />
                    <p>
                      <FormattedMessage id="outstanding.musculoskeletal" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="outstanding-customize">
                <div className="boder">
                  <div className="bg-image-2" />
                  <div className="position text-center">
                    <FormattedMessage id="outstanding.doctorngoductruong" />
                    <p>
                      <FormattedMessage id="outstanding.NeurologySpineNeurosurgery" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="outstanding-customize">
                <div className="boder">
                  <div className="bg-image-3" />
                  <div className="position text-center">
                    <FormattedMessage id="outstanding.doctortranthimaithy" />
                    <p>
                      <FormattedMessage id="outstanding.nerve" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="outstanding-customize">
                <div className="boder">
                  <div className="bg-image-4" />
                  <div className="position text-center">
                    <FormattedMessage id="outstanding.doctornguyenthikimloan" />
                    <p>
                      <FormattedMessage id="outstanding.musculoskeletals" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="outstanding-customize">
                <div className="boder">
                  <div className="bg-image-5" />
                  <div className="position text-center">
                    <FormattedMessage id="outstanding.doctorlequocviet" />
                    <p>
                      <FormattedMessage id="outstanding.Medicals" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="outstanding-customize">
                <div className="boder">
                  <div className="bg-image-6" />
                  <div className="position text-center">
                    <FormattedMessage id="outstanding.doctorvongocthu" />
                    <p>
                      <FormattedMessage id="outstanding.neurologyinternalmedicine" />
                    </p>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
