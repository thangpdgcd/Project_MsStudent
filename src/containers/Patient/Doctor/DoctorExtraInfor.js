import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate, handleLoginApi } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        });
    }

    render() {
        let { isShowDetailInfor } = this.state
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">

                    </div >
                    <div className="name-clinic">

                    </div >
                    <div className="detail-address">

                    </div >
                </div >
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className="short-infor">
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                xxem chi tiet
                            </span>
                        </div >
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price"></div >
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left"></span >
                                    <span className="right"></span >
                                </div>
                                <div className="note">
                                </div>
                            </div >
                            <div className="payment"></div >

                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    an ban gias
                                </span>
                            </div >
                        </>
                    }
                </div >
            </div >
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
