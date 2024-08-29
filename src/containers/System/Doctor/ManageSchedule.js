import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../../Header/Header";
class ManageSchedule extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="code"> manage schedule</div>
            </React.Fragment>
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
