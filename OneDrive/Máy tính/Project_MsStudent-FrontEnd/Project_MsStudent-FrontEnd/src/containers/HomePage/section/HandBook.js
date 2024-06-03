import React, { Component } from "react";

import { connect } from "react-redux";

import "./HandBook.scss";
import Slider from "react-slick";

import { FormattedMessage } from "react-intl";
class HandBook extends Component {
  render() {
    return (
      <div className="section-HandBook  section-share">
        <div className="HandBook-container">
          <div className="HandBook-header">
            <span className="HandBook-section">
              <FormattedMessage id="HandBook.HandBooks" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="HandBook.SeeMoreHandBooks" />
            </button>
          </div>
          <div className="HandBook-body">
            {/*props get from homepage */}
            <Slider {...this.props}>
              <div className="HandBook-customize">
                <div className="bg-image" />
                <div>
                  <FormattedMessage id="HandBook.porcelainteethpricelist" />
                </div>
              </div>
              <div className="HandBook-customize">
                <div className="bg-image-2" />
                <div>
                  <FormattedMessage id="HandBook.dentalreview" />
                </div>
              </div>
              <div className="HandBook-customize">
                <div className="bg-image-3" />
                <div>
                  <FormattedMessage id="HandBook.dentaltop" />
                </div>
              </div>
              <div className="HandBook-customize">
                <div className="bg-image-4" />
                <div>
                  <FormattedMessage id="HandBook.dentalbraces" />
                </div>
              </div>
              <div className="HandBook-customize">
                <div className="bg-image-5" />
                <div>
                  <FormattedMessage id="HandBook.7VungTaudentalclinics" />
                </div>
              </div>
              <div className="HandBook-customize">
                <div className="bg-image-6" />
                <div>
                  <FormattedMessage id="HandBook.Hepatitisexamination" />
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
