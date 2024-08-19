import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomeHeader";
import { getDetailInforDoctor } from "../../../../services/userService";
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let inputid = this.props.match.params.id;
            let res = await getDetailInforDoctor(2);
            console.log("Check detai doctor id: ", res)
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        // console.log("check detail doctor", this.props.DetailDoctorRedux);
        console.log("Id: ", this.props.match.params.id)
        return (
            <Fragment>
                <HomeHeader isShowBanner />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left"></div>
                        <div className="content-right">
                            <div className="up">Phó giáo sư</div>
                            <div className="down">code</div>
                        </div>
                    </div>
                    <div className="schedule-doctor">

                    </div>
                    <div className="detail-infor-doctor">

                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>

            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // DetailDoctorRedux: state.admin.DetailDoctors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
