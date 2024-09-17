import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        }
    }
    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            console.log('GET ID DOCTOR', id)
            // this.setState({
            //     currentTeacherId: id,
            // });

            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { detailDoctor } = this.state
        let { language } = this.props;
        let { nameEn, nameVi } = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.firstName}${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName}${detailDoctor.lastName}`;
        }

        console.log('detaildoctor', detailDoctor)
        // console.log("check detail doctor", this.props.DetailDoctorRedux);
        return (
            <Fragment>
                <HomeHeader isShowBanner />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left" style={{
                            backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`,
                        }}>
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailDoctor && detailDoctor.Markdown
                                    && detailDoctor.Markdown.description
                                    && <span>{detailDoctor.Markdown.description}</span>
                                }</div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        {/* content  */}
                        <div className="content-left">
                            <DoctorSchedule
                                doctorIdFromParents={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                            />
                        </div>
                        <div className="content-right">

                        </div>
                    </div>

                    <div className="detail-infor-doctor">
                        {
                            detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>

            </Fragment >
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
