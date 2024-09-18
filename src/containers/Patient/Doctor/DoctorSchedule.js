import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
//import moment tiếng việt để trang có thể đọc được nn tiếng việt
import 'moment/locale/vi';
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate, handleLoginApi } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allavailableTime: [],
        }
    }
    componentDidMount = () => {
        let { language } = this.props;
        console.log("moment vi", moment(new Date()).locale('vi').format("dddd - DD/MM"))
        console.log("moment en", moment(new Date()).locale('en').format("ddd - DD/MM"));
        this.setArrayDays(language)
    }
    // Viết hoa chữ cái đầu trong thứ
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setArrayDays = (language) => {
        let allDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                //chuyển đổi chữ cái đầu từ thường thành hoa
                let labelVi = object.label = moment(new Date()).add(i, 'days').locale('vi').format('dddd - DD / MM');
                object.label = this.capitalizeFirstLetter(labelVi)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDate.push(object);
        }

        this.setState({
            allDays: allDate,
        })
        console.log("arrDate", allDate)
    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            this.setArrayDays(this.props.language)
        }
    }
    handleOnchangeSelect = async (e) => {
        if (this.props.doctorIdFromParents && this.props.doctorIdFromParents !== -1) {
            let doctorId = this.props.doctorIdFromParents;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            let alltime = [];
            if (res && res.errCode === 0) {
                alltime = res.data;
                this.setState
                    ({
                        allavailableTime: res.data ? res.data : []
                    })
            }

            console.log("Check res RES", res);
        }
    }
    render() {
        let { allDays, allavailableTime } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(e) => this.handleOnchangeSelect(e)}>
                        {allDays && allDays.length > 0
                            && allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                );
                            })}

                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <span>
                            <i className="fas fa-calendar-alt"><span>Lịch Khám Bệnh</span></i>
                        </span>
                    </div>
                    <div className="time-content">
                        {allavailableTime && allavailableTime.length > 0 ?
                            allavailableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeType.valueEn
                                return (
                                    <button
                                        key={index}
                                    >
                                        {item.timeDisplay}
                                    </button>
                                );
                            })
                            : <div><FormattedMessage id="time-content.messages" /></div>
                        }
                    </div>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
