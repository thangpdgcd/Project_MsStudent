import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomeHeader";
import { getDetailInforDoctor } from "../../../../services/userService";
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailTeacher: {},
            currentTeacherId: -1,
        }
    }
    async componentDidMount() {

        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let inputid = this.props.match.params.id;
        //     this.setState({
        //         currentTeacherId: inputid,
        //     });
        //     let res = await getDetailInforDoctor(inputid);
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             detailTeacher: res.data,
        //         });
        //     }
        //     console.log("Check detail doctor id: ", res)
        // }
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            console.log('GET ID DOCTOR', id)
            this.setState({
                currentTeacherId: id,
            });

            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailTeacher: res.data,
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { detailTeacher } = this.state;
        console.log('detaildoctor', detailTeacher)
        // console.log("check detail doctor", this.props.DetailDoctorRedux);
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
