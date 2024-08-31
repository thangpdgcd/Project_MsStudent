import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../../Header/Header";
import "./ManageSchedule.scss"
import { FormattedMessage } from "react-intl";
class ManageSchedule extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label>Choose doctor</label>
                            <input></input>
                        </div>
                        <div className="col-4 form-group">
                            <label>choose doctor</label>
                            <input></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn, //check user login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
