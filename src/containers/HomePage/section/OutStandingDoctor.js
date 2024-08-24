import React, { Component } from "react";
import Slider from "react-slick";
import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import { connect } from "react-redux";

import { withRouter } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props)
    {
      this.state = {
        arrDoctors: []
      }
    }
  }

  async componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux
      })
    }
  }

  handleViewDetailDoctor = (doctor) => {
    console.log("check doctor", doctor)
    //chuyển đến trang view detail của 1 doctor khi click vào
    this.props.history.push(`/detail-doctor/${doctor.id}`)
  }
  render() {
    console.log("CHECK TOP DOCTOR REDUX", this.props.topDoctorsRedux)
    let { language } = this.props.language
    let arrDoctors = this.state.arrDoctors

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
              {arrDoctors && arrDoctors.length > 0
                && arrDoctors && arrDoctors.map((item, index) => {
                  let imageBase64 = '';
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                  }
                  let nameVi = `${item.positionData.valueVi},${item.firstName}${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn},${item.firstName}${item.lastName}`;
                  return (
                    <div className="outstanding-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                      <div className="boder">
                        <div className="bg-image"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        />
                        <div className="position text-center">
                          <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                          <div>Cơ Xương Khớp</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </Slider>
          </div>
        </div >
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () =>
      dispatch(actions.fetchTopDoctor())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
