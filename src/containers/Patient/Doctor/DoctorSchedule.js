import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate, handleLoginApi } from "../../../services/userService";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        }
    }
    componentDidMount = () => {
        let { language } = this.props;
        console.log("moment vi", moment(new Date()).format("dddd - DD/MM"))
        console.log("moment en", moment(new Date()).locale('en').format("ddd - DD/MM"));
        this.setArrayDays(language)
    }
    setArrayDays = (language) => {
        let allDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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
            console.log("Check res react", res);
        }
    }
    render() {
        let { allDays } = this.state;
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
