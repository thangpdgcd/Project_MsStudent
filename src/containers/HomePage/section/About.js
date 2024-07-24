import React, { Component } from "react";

import { connect } from "react-redux";

import "./About.scss";

import { FormattedMessage } from "react-intl";
class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          <FormattedMessage id="About.booking" />
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="1051"
              height="591"
              src="https://www.youtube.com/embed/CdHgOEHkTlk"
              title="Chăm sóc sức khỏe tinh thần cho học sinh | VTV24"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <div className="list-video">
              <iframe
                width="1051"
                height="591"
                src="https://www.youtube.com/embed/8R8AHChFPL4"
                title='Những lầm tưởng về sức khỏe tinh thần | Kế "Sách"'
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <iframe
                width="1051"
                height="591"
                src="https://www.youtube.com/embed/96pywFfL02U"
                title='Tất tần tật về lối sống thuần chay | Kế "Sách"'
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <iframe
                width="1051"
                height="591"
                src="https://www.youtube.com/embed/0eiBSuFBhtI"
                title="Chăm sóc sức khỏe người cao tuổi | VTV24"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
