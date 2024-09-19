import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
//import moment tiếng việt để trang có thể đọc được nn tiếng việt
import 'moment/locale/vi';
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate, handleLoginApi } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { allKeys } from "underscore";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allavailableTime: [],
        }
    }
    componentDidMount = async () => {
        let { language } = this.props;
        let allDays = this.getArrayDays(language);
        console.log("get all day", allDays)
        this.setState({
            allDays: allDays,
        })

    }
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrayDays(this.props.language);
            this.setState({
                allDays: allDays,
            })
        }

        if (this.props.doctorIdFromParents !== prevProps.doctorIdFromParents) {
            try {
                let allDays = this.getArrayDays(this.props.language);
                // Kiểm tra nếu allDays tồn tại và có ít nhất một phần tử
                if (allDays && allDays.length > 0) {
                    // Đảm bảo allDays[0] có thuộc tính value hợp lệ
                    if (allDays[0].value) {
                        let res = await getScheduleDoctorByDate(this.props.doctorIdFromParents, allDays[0].value);
                        this.setState({
                            allavailableTime: res.data ? res.data : []
                        });
                        console.log("Success", res);
                    } else {
                        console.log("allDays[0] does not have a valid 'value'");
                        this.setState({
                            allavailableTime: []
                        });
                    }
                } else {
                    console.log("allDays is empty or undefined");
                    this.setState({
                        allavailableTime: []
                    });
                }
            } catch (error) {
                this.setState({
                    allavailableTime: []
                });
                console.log("Error fetching doctor schedule", error);
            }

        }

    }
    // Viết hoa chữ cái đầu trong thứ
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrayDays = (language) => {
        let allDays = [];
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

            allDays.push(object);
        }

        this.setState({
            allDays: allDays,
        })
    }

    handleOnchangeSelect = async (e) => {
        if (this.props.doctorIdFromParents && this.props.doctorIdFromParents !== -1) {
            let doctorId = this.props.doctorIdFromParents;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
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
                                let timeDisplay = '';
                                timeDisplay = language === LANGUAGES.VI
                                    ? item.timeTypeData.valueVi
                                    : item.timeTypeData.valueEn
                                return (
                                    <button
                                        key={index}
                                    >
                                        {timeDisplay}
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
