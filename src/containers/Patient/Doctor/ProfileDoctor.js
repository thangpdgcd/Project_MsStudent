import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment/moment";
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataprofile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataprofile: data
        })
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
                console.log("check resssss,", res)
            }

        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {

        };
    }
    RenderTimeBooking = (dataTime) => {
        let { language } = this.props;
        console.log("check Time booking: ", dataTime);

        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI
                ? moment(new Date(dataTime.date)).format("ddd - DD/MM/YYYY")
                : moment(new Date(dataTime.date)).format("ddd - MM/DD/YYYY");
            return (
                <>
                    <div>
                        code
                    </div>
                </>
            )

        }
        return <></>
    }
    render() {
        let { dataprofile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime } = this.props;
        console.log("Check state dataTime: ", dataTime);
        // console.log("Check state profile: ", this.state);
        let nameEn, nameVi = '';
        if (dataprofile && dataprofile.positionData) {
            nameVi = `${dataprofile.positionData.valueVi},${dataprofile.firstName}${dataprofile.lastName}`;
            nameEn = `${dataprofile.positionData.valueEn},${dataprofile.firstName}${dataprofile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left" style={{
                        backgroundImage: `url(${dataprofile && dataprofile.image ? dataprofile.image : ''})`,
                    }}>
                    </div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor && isShowDescriptionDoctor == true ?
                                <>
                                    {dataprofile && dataprofile.Markdown
                                        && dataprofile.Markdown.description
                                        &&
                                        <span>{dataprofile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.RenderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="price">
                    Giá Khám:
                    {dataprofile && dataprofile.Doctor_infor &&
                        language === LANGUAGES.VI ?
                        < NumberFormat
                            className="currency"
                            value={dataprofile.Doctor_infor.priceTypeData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={`VND`} />
                        : ''
                    }

                    {dataprofile && dataprofile.Doctor_infor &&
                        language === LANGUAGES.EN ?
                        < NumberFormat
                            className="currency"
                            value={dataprofile.Doctor_infor.priceTypeData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={`$`} />
                        : ''
                    }
                </div>
            </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);