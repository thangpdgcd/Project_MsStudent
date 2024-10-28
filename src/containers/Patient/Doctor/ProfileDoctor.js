import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
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

        }
    }

    render() {
        let { dataprofile } = this.state;
        let { language } = this.props;
        console.log("Check state profile: ", this.state);
        let { nameEn, nameVi } = '';
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
                            {dataprofile && dataprofile.Markdown
                                && dataprofile.Markdown.description
                                && <span>{dataprofile.Markdown.description}</span>
                            }</div>
                    </div>
                </div>
                <div className="price">
                    Giá Khám
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