import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import Select from 'react-select';
import "./Manageschedules.scss"
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
class Manageschedules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedOption: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllScheduleTimeRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            });

        }
        console.log("check result data", result)
        return result;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };
    handleOnChangeDatePicker = (date) => {
        console.log("check date", date)
        this.setState({
            currentDate: date[0]
        })
    }
    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("check enter", e)
        }
    }
    render() {
        console.log('check', this.props)
        let { language } = this.props;
        let { rangeTime } = this.state
        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-title">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-schedule.Name" />
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label >
                                    <FormattedMessage id="manage-schedule.Date" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate[0]}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="col-12 pick-our-container">
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button className="btn btn-schedule" key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })}
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary"><FormattedMessage id="manage-schedule.save" /></button>
                            </div>
                        </div >
                    </div >
                </div >
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn, //check user login
        allDoctorRedux: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorsStart()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduletTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manageschedules);
