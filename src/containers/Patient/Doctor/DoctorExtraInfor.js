import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { getExtraInforDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParents !== prevProps.doctorIdFromParents) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParents);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    console.log("checkssss dataaaaasss", this.state);
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address"></div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {/* component NumberFormat định giá cho price */}
          {isShowDetailInfor === false && (
            <div className="short-infor">
              <FormattedMessage id="patient.doctor-extra-infor.content-down.short-infor" />
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className="currency"
                    value={extraInfor.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={`VND`}
                  />
                )}
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    className="currency"
                    value={extraInfor.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={`$`}
                  />
                )}
              <span
                className="detail"
                onClick={() => this.showHideDetailInfor(true)}
              >
                <FormattedMessage id="patient.doctor-extra-infor.content-down.detail" />
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="title-price"></div>
              <div className="detail-infor">
                <div className="price">
                  <FormattedMessage id="patient.doctor-extra-infor.content-down.short-infor" />
                  <span className="left">
                    <FormattedMessage id="patient.doctor-extra-infor.content-down.short-infor" />
                    :{" "}
                  </span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          className="currency"
                          value={extraInfor.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={`VND`}
                        />
                      )}
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          className="currency"
                          value={extraInfor.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={`$`}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  <FormattedMessage id="patient.doctor-extra-infor.content-down.note" />
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.doctor-extra-infor.content-down.payment" />

                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfor.paymentTypeData.valueVi
                  : ""}
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.EN
                  ? extraInfor.paymentTypeData.valueEn
                  : ""}
              </div>

              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  <FormattedMessage id="patient.doctor-extra-infor.content-down.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
